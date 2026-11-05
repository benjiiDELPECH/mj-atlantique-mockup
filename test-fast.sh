#!/usr/bin/env bash
# Boucle FAST de la vitrine (#806) : build public, puis sondes de lisibilité sur dist
# servi en local. rc ≠ 0 au premier défaut.
# Usage : ./test-fast.sh          mesure dist (build local)
#         ./test-fast.sh <url>    mesure le site en ligne (ex. https://etude.mj-atlantique.fr)
set -euo pipefail
cd "$(dirname "$0")"

if [ ! -d qualite/node_modules ]; then
  (cd qualite && npm ci --silent && npx playwright install chromium)
fi

if [ $# -eq 0 ]; then
  ./build-pages.sh
  PORT=$(python3 -c 'import socket; s=socket.socket(); s.bind(("127.0.0.1", 0)); print(s.getsockname()[1])')
  # serve.cjs reproduit Cloudflare Pages : adresses sans .html, 404.html, en-têtes de _headers
  node qualite/serve.cjs dist "$PORT" &
  SRV=$!
  trap 'kill $SRV' EXIT
  for _ in $(seq 50); do curl -sf -o /dev/null "http://127.0.0.1:$PORT/" && break; sleep 0.1; done
  BASE="http://127.0.0.1:$PORT"; CANON="${SITE:-https://etude.mj-atlantique.fr}"
else
  BASE="${1%/}"; CANON="$BASE"
fi
PAGES=(/ /etude /contact /page-introuvable)

cd qualite
mkdir -p crops
node test-decodeur.cjs
node site.cjs "$BASE" "$CANON"
node chevauche.cjs "$BASE/"
node axe-typo.cjs "$BASE" "${PAGES[@]}"
node contraste.cjs "$BASE" "${PAGES[@]}" > crops/contraste.json
echo "OK : site (404, en-têtes, canoniques), contraste, axe, tailles, console, « à fournir », chevauchement ($BASE)"
