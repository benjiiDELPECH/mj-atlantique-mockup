#!/usr/bin/env bash
# Construit la copie publique (Cloudflare Pages) à partir de l'aperçu GitHub Pages :
# URL github.io réécrites vers SITE, noindex de l'aperçu retiré des 3 pages publiques.
# Usage : ./build-pages.sh [dist]   (défaut : dist ; SITE surchargeable par variable)
# Déploiement :
#   npx wrangler pages deploy dist --project-name mj-atlantique --branch main
set -euo pipefail

cd "$(dirname "$0")"
DIST="${1:-dist}"
SITE="${SITE:-https://etude.mj-atlantique.fr}"
SRC="https://benjiidelpech.github.io/mj-atlantique-mockup"
PAGES=(index.html etude.html contact.html)

rm -rf "$DIST"
mkdir -p "$DIST/v/img"

# Pages : réécriture des URL ; suppression de la balise noindex (et d'un éventuel
# commentaire sur la même ligne). Les liens vers www.mj-atlantique.fr restent intacts.
# Les emplacements « à fournir » (data-a-fournir) restent visibles dans l'aperçu
# client, mais sont masqués côté public.
# Adresses publiques sans .html (Cloudflare redirige /etude.html en 308 vers /etude) :
# canonique, og:url et liens internes pointent directement sur la forme finale.
for f in "${PAGES[@]}"; do
  chemin="/${f%.html}"; [ "$f" = index.html ] && chemin=/
  sed -E \
    -e "s|$SRC|$SITE|g" \
    -e "s#($SITE/[a-z-]+)\.html#\1#g" \
    -e 's#href="index\.html#href="/#g' \
    -e 's#href="(etude|contact)\.html#href="/\1#g' \
    -e "s#<meta property=\"og:url\" content=\"[^\"]*\">#<meta property=\"og:url\" content=\"$SITE$chemin\">#" \
    -e 's|<meta name="robots" content="noindex">(<!--.*-->)?||g' \
    -e 's|</head>|<style>[data-a-fournir]{display:none!important}</style></head>|' \
    "$f" > "$DIST/$f"
done
cp 404.html "$DIST/404.html"

# Polices, images référencées par les pages, aperçu avant/après (garde son noindex).
cp -R fonts "$DIST/fonts"
for img in $(cat "${PAGES[@]}" | grep -oE 'v/img/[A-Za-z0-9_.-]+' | sort -u); do
  cp "$img" "$DIST/$img"
done
cp -R apercu "$DIST/apercu"

# En-têtes : noindex toujours sur *.pages.dev (prod et previews) ; sur le domaine
# public aussi, tant que INDEXABLE=1 n'est pas passé explicitement (la vitrine
# n'est indexée qu'une fois la grille « 29 axes » verte).
cat > "$DIST/_headers" <<'HDR'
https://:project.pages.dev/*
  X-Robots-Tag: noindex, nofollow
https://:version.:project.pages.dev/*
  X-Robots-Tag: noindex, nofollow
HDR
# En-têtes de sécurité sur tout le site. 'unsafe-inline' : styles et scripts sont
# inline dans les pages ; seul autre destinataire de formulaire = recherche d'actifs
# Atlantic Log. HSTS sans includeSubDomains : le domaine appartient à l'étude.
cat >> "$DIST/_headers" <<'HDR'
/*
  Strict-Transport-Security: max-age=31536000
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; form-action 'self' https://www.mj-atlantique.fr; frame-ancestors 'none'; base-uri 'self'; object-src 'none'
HDR
if [ "${INDEXABLE:-0}" != "1" ]; then
  printf '  X-Robots-Tag: noindex, nofollow\n' >> "$DIST/_headers"
fi

# robots.txt, sitemap.xml, llms.txt : URL réécrites, sans .html. robots reste
# permissif : un Disallow empêcherait les robots de lire le noindex des copies.
for f in robots.txt sitemap.xml llms.txt; do
  sed -E -e "s|$SRC|$SITE|g" -e "s#($SITE/[a-z-]+)\.html#\1#g" "$f" > "$DIST/$f"
done

# Gardes : le build échoue si une URL d'aperçu ou un noindex subsiste côté public.
if [ -n "$(find "$DIST" -maxdepth 4 -type f -exec grep -l 'github\.io' {} + 2>/dev/null)" ]; then
  echo "ECHEC : occurrence de github.io dans $DIST" >&2; exit 1
fi
for f in "${PAGES[@]}"; do
  if grep -qiE '<meta[^>]*name="robots"[^>]*noindex' "$DIST/$f"; then
    echo "ECHEC : meta robots noindex dans $DIST/$f" >&2; exit 1
  fi
  if grep -iE 'à (fournir|préciser)' "$DIST/$f" | grep -qv 'data-a-fournir'; then
    echo "ECHEC : emplacement « à fournir » non marqué data-a-fournir dans $DIST/$f" >&2; exit 1
  fi
  if ! grep -q '\[data-a-fournir\]{display:none' "$DIST/$f"; then
    echo "ECHEC : masquage data-a-fournir absent de $DIST/$f" >&2; exit 1
  fi
done
echo "OK : $DIST prêt (SITE=$SITE, INDEXABLE=${INDEXABLE:-0})"
