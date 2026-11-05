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
  python3 -m http.server "$PORT" --bind 127.0.0.1 -d dist >/dev/null 2>&1 &
  SRV=$!
  trap 'kill $SRV' EXIT
  for _ in $(seq 50); do curl -sf -o /dev/null "http://127.0.0.1:$PORT/index.html" && break; sleep 0.1; done
  BASE="http://127.0.0.1:$PORT"; ACCUEIL=/index.html; PAGES=(/index.html /etude.html /contact.html)
else
  BASE="${1%/}"; ACCUEIL=/; PAGES=(/ /etude /contact)
fi

cd qualite
mkdir -p crops
node test-decodeur.cjs
node chevauche.cjs "$BASE$ACCUEIL"
node axe-typo.cjs "$BASE" "${PAGES[@]}"
node contraste.cjs "$BASE" "${PAGES[@]}" > crops/contraste.json
echo "OK : contraste, axe, tailles, « à fournir », chevauchement ($BASE)"
