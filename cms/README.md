# Sveltia CMS — daeila.com

Browser-based editor at **https://www.daeila.com/admin/**. Edits commit to
`main` on GitHub, which triggers the self-hosted runner to rebuild + deploy.

## How it fits together

```
browser -> /admin/ (Sveltia, static, served by Caddy)
                |  GitHub OAuth (popup)
                v
          /cms/auth  /cms/callback   <-- Python OAuth proxy (this dir)
                |  exchanges code for token using CLIENT_SECRET
                v
          github.com  (commits content) -> Actions runner -> Caddy
```

## One-time setup (the only manual part)

GitHub requires a human to create an OAuth App. Do this once:

1. https://github.com/settings/developers -> **New OAuth App**
   - Application name: `daeila CMS`
   - Homepage URL: `https://www.daeila.com`
   - Authorization callback URL: `https://www.daeila.com/cms/callback`
2. Copy the **Client ID** and generate a **Client Secret**.
3. On the server, put them in `~/cms/secrets.env` (see `secrets.env.example`).
4. Restart the supervisor or reboot. Verify: `curl localhost:54321/health` -> `ok`.

## Recreate if the server is wiped

Everything below is in this repo except the 2 secrets.

1. Repo must contain: `static/admin/`, `cms/oauth-proxy.py`, this README.
2. On the server: `mkdir -p ~/cms && cp cms/oauth-proxy.py cms/secrets.env.example ~/cms/`
3. Fill `~/cms/secrets.env` (Client ID/Secret — the OAuth App still exists in your GitHub).
4. Caddy `:1313` block must include `handle_path /cms/* { reverse_proxy 127.0.0.1:54321 }`.
5. `~/bin/start-services.sh` must launch the proxy (see the cms block).
6. `crontab -l` should have the `@reboot` line.

The OAuth App in GitHub is **not** wiped by a server wipe, so you only re-paste the
two secrets — no new OAuth App needed.

## Notes / limitations

- Image fields are plain text (type the path, e.g. `images/blog/01.jpg`) to match the
  theme's existing asset convention. A GUI media uploader can be added later by
  migrating images from `assets/images/` to `static/images/`.
- Drafts: set `Draft: true` on a post — the production build excludes drafts.
