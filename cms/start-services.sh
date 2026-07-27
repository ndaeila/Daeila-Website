#!/usr/bin/env bash
# No-sudo supervisor: keeps Caddy + GitHub runner + CMS OAuth proxy alive.
# Triggered by user crontab @reboot. Respawns on crash. Idempotent (guards).
set -u

CADDY=/home/com-daeila/bin/caddy
CADDYFILE=/home/com-daeila/caddy/Caddyfile
CADDY_LOG=/home/com-daeila/caddy/caddy.log
RUNNER_DIR=/home/com-daeila/actions-runner
RUNNER_LOG=/home/com-daeila/actions-runner/runner.log
CMS_DIR=/home/com-daeila/cms
CMS_SECRETS=$CMS_DIR/secrets.env
OAUTH_LOG=$CMS_DIR/oauth.log

# --- Caddy (static site on :1313, behind the Cloudflare tunnel) ---
if ! pgrep -f "caddy run --config $CADDYFILE" >/dev/null 2>&1; then
  (
    while true; do
      "$CADDY" run --config "$CADDYFILE" >> "$CADDY_LOG" 2>&1
      echo "[$(date -u)] caddy exited; restarting in 3s" >> "$CADDY_LOG"
      sleep 3
    done
  ) &
fi

# --- GitHub Actions self-hosted runner ---
if ! pgrep -f "$RUNNER_DIR" >/dev/null 2>&1; then
  (
    cd "$RUNNER_DIR"
    while true; do
      ./run.sh >> "$RUNNER_LOG" 2>&1
      echo "[$(date -u)] runner exited; restarting in 5s" >> "$RUNNER_LOG"
      sleep 5
    done
  ) &
fi

# --- CMS OAuth proxy (Python, only if secrets are present) ---
if [ -f "$CMS_SECRETS" ] && ! pgrep -f "oauth-proxy.py" >/dev/null 2>&1; then
  (
    set -a; . "$CMS_SECRETS"; set +a
    while true; do
      /usr/bin/python3 "$CMS_DIR/oauth-proxy.py" >> "$OAUTH_LOG" 2>&1
      echo "[$(date -u)] oauth-proxy exited; restarting in 3s" >> "$OAUTH_LOG"
      sleep 3
    done
  ) &
fi
