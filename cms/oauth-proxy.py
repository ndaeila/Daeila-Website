#!/usr/bin/env python3
"""
Zero-dependency OAuth proxy for Sveltia/Decap CMS (GitHub backend).

Implements the Decap "external OAuth" protocol:
  GET /auth       -> 302 redirect to GitHub authorize
  GET /callback   -> exchange code for token, postMessage it to the CMS popup

Env:
  OAUTH_CLIENT_ID      (required)
  OAUTH_CLIENT_SECRET  (required)
  BASE_URL             default https://www.daeila.com/cms
  PORT                 default 54321

Run behind Caddy:  handle_path /cms/* { reverse_proxy 127.0.0.1:54321 }
Only listens on 127.0.0.1 (never exposed directly).
"""
from __future__ import annotations
import http.server, os, json, secrets, urllib.parse, urllib.request

CLIENT_ID = os.environ.get("OAUTH_CLIENT_ID", "")
CLIENT_SECRET = os.environ.get("OAUTH_CLIENT_SECRET", "")
BASE_URL = os.environ.get("BASE_URL", "https://www.daeila.com/cms").rstrip("/")
PORT = int(os.environ.get("PORT", "54321"))
REDIRECT_URI = f"{BASE_URL}/callback"
SCOPES = "repo"

GITHUB_AUTHORIZE = "https://github.com/login/oauth/authorize"
GITHUB_TOKEN = "https://github.com/login/oauth/access_token"


class Handler(http.server.BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, fmt, *args):
        return  # silence; supervised, logs go to stderr file

    def _text(self, body: str, status: int = 200, ctype: str = "text/plain; charset=utf-8"):
        b = body.encode()
        self.send_response(status)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(b)))
        self.end_headers()
        self.wfile.write(b)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path.rstrip("/") or "/"
        if path == "/" or path == "/health":
            if not CLIENT_ID or not CLIENT_SECRET:
                self._text("oauth-proxy: NOT CONFIGURED (set OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET in ~/cms/secrets.env)\n", 503)
            else:
                self._text("oauth-proxy: ok\n")
            return
        if path == "/auth":
            self._begin_auth()
            return
        if path == "/callback":
            self._callback(parsed.query)
            return
        self._text("not found", 404)

    # --- /auth: send user to GitHub ------------------------------------
    def _begin_auth(self):
        state = secrets.token_urlsafe(24)
        params = {
            "client_id": CLIENT_ID,
            "redirect_uri": REDIRECT_URI,
            "scope": SCOPES,
            "state": state,
            "allow_signup": "false",
        }
        url = f"{GITHUB_AUTHORIZE}?{urllib.parse.urlencode(params)}"
        self.send_response(302)
        self.send_header("Location", url)
        self.send_header("Set-Cookie", f"oauth_state={state}; Path=/; HttpOnly; SameSite=Lax; Secure")
        self.send_header("Content-Length", "0")
        self.end_headers()

    # --- /callback: exchange code, postMessage token -------------------
    def _callback(self, query: str):
        q = urllib.parse.parse_qs(query)
        code = (q.get("code") or [""])[0]
        state = (q.get("state") or [""])[0]
        cookie_state = ""
        for c in self.headers.get("Cookie", "").split(";"):
            if "=" in c:
                k, v = c.strip().split("=", 1)
                if k == "oauth_state":
                    cookie_state = v
        if not code or state != cookie_state or not state:
            return self._render("error", {"message": "invalid state or missing code"})
        data = urllib.parse.urlencode({
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "code": code,
            "redirect_uri": REDIRECT_URI,
        }).encode()
        req = urllib.request.Request(GITHUB_TOKEN, data=data, headers={"Accept": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=15) as r:
                payload = json.loads(r.read().decode())
        except Exception as e:
            return self._render("error", {"message": f"token exchange failed: {e}"})
        token = payload.get("access_token")
        if not token:
            return self._render("error", {"message": payload.get("error_description", "no token")})
        self._render("success", {"token": token, "provider": "github"})

    def _render(self, kind: str, obj: dict):
        # Decap postMessage protocol:  authorization:github:<kind>:<json>
        msg = f"authorization:github:{kind}:{json.dumps(obj, separators=(',', ':'))}"
        # escape for safe embedding in a JS string
        msg_js = json.dumps(msg)
        html = (
            "<!doctype html><html><head><meta charset='utf-8'>"
            "<title>Authenticating…</title></head><body style='font-family:sans-serif'>"
            "<p>Authenticating… you can close this window.</p>"
            "<script>\n"
            "(function(){\n"
            f"  var msg = {msg_js};\n"
            "  if (window.opener) { window.opener.postMessage(msg, '*'); }\n"
            "  setTimeout(function(){ window.close(); }, 300);\n"
            "})();\n"
            "</script></body></html>"
        )
        self._text(html, ctype="text/html; charset=utf-8")


class ThreadingHTTPD(http.server.ThreadingHTTPServer):
    daemon_threads = True


if __name__ == "__main__":
    if not CLIENT_ID or not CLIENT_SECRET:
        print("oauth-proxy: WARNING — OAUTH_CLIENT_ID/OAUTH_CLIENT_SECRET not set; /auth will 500 until ~/cms/secrets.env is filled")
    srv = ThreadingHTTPD(("127.0.0.1", PORT), Handler)
    print(f"oauth-proxy listening on 127.0.0.1:{PORT} (redirect_uri={REDIRECT_URI})")
    srv.serve_forever()
