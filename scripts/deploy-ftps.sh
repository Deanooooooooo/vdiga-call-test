#!/bin/sh
set -eu

HOST="jump21.jump.bg"
USER="vdiga-deploy@vdiga.bg"
SERVICE="vdiga-jump-ftps"
ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
PASSWORD=$(security find-generic-password -a "$USER" -s "$SERVICE" -w)

cd "$ROOT_DIR"
npm run build
find dist -type d -exec chmod 755 {} +
find dist -type f -exec chmod 644 {} +

FTP_PASS=$PASSWORD python3 scripts/upload_ftps.py

printf 'Deployed %s to https://vdiga.bg/\n' "$(git rev-parse --short HEAD)"

if [ "${SUBMIT_INDEXNOW:-0}" = "1" ]; then
  if node scripts/submit-indexnow.mjs; then
    printf 'IndexNow notified for sitemap URLs.\n'
  else
    printf 'Warning: deployment succeeded, but IndexNow notification failed.\n' >&2
  fi
else
  printf 'IndexNow skipped. Set SUBMIT_INDEXNOW=1 only when URLs need submission.\n'
fi
