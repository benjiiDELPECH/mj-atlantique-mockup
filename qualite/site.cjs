// Comportement HTTP et métadonnées du site servi : adresses sans .html, 404, en-têtes de sécurité,
// canoniques/og:url/sitemap cohérents, aucune fausse annonce.
// Usage : node site.cjs <base servie> <site canonique>   ex. node site.cjs https://etude.mj-atlantique.fr https://etude.mj-atlantique.fr
// rc=1 au moindre défaut.
const [base, site] = process.argv.slice(2);
const PAGES = ['/', '/etude', '/contact'];
const SECU = {
  'strict-transport-security': /max-age=\d{7,}/,
  'x-content-type-options': /^nosniff$/,
  'referrer-policy': /^strict-origin-when-cross-origin$/,
  'x-frame-options': /^DENY$/,
  'permissions-policy': /camera=\(\)/,
  'content-security-policy': /frame-ancestors 'none'.*object-src 'none'|object-src 'none'.*frame-ancestors 'none'/,
};
const ko = [];
const get = u => fetch(base + u, { redirect: 'manual' });
const attr = (html, re) => (html.match(re) || [])[1];
(async () => {
  for (const p of PAGES) {
    const r = await get(p), html = await r.text();
    if (r.status !== 200) { ko.push(`${p} : statut ${r.status}`); continue; }
    for (const [h, re] of Object.entries(SECU)) if (!re.test(r.headers.get(h) || '')) ko.push(`${p} : en-tête ${h} absent ou faible (« ${r.headers.get(h)} »)`);
    const canon = attr(html, /<link rel="canonical" href="([^"]+)"/), og = attr(html, /<meta property="og:url" content="([^"]+)"/);
    if (canon !== site + p) ko.push(`${p} : canonique « ${canon} » ≠ ${site + p}`);
    if (og !== canon) ko.push(`${p} : og:url « ${og} » ≠ canonique`);
    for (const h of html.match(/href="(?!https?:|mailto:|tel:|#)[^"]*\.html[^"]*"/g) || []) ko.push(`${p} : lien interne en .html ${h}`);
    if (/class="opp-card"|Opportunités en cours/.test(html)) ko.push(`${p} : annonces d'exemple encore présentes`);
  }
  const r404 = await get('/cette-page-nexiste-pas'), b404 = await r404.text();
  if (r404.status !== 404) ko.push(`404 : statut ${r404.status}`);
  if (!/href="\/"/.test(b404) || !/<title>[^<]*introuvable/i.test(b404)) ko.push('404 : page sans titre « introuvable » ni lien vers l\'accueil');
  const rh = await get('/etude.html');
  if (![301, 308].includes(rh.status) || rh.headers.get('location') !== '/etude') ko.push(`/etude.html : ${rh.status} → ${rh.headers.get('location')}`);
  const plan = await (await get('/sitemap.xml')).text(), locs = [...plan.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  if (locs.join(' ') !== PAGES.map(p => site + p).join(' ')) ko.push(`sitemap : ${locs.join(' ')}`);
  const llms = await (await get('/llms.txt')).text();
  for (const l of llms.match(/https?:\/\/[^)\s]+\.html/g) || []) ko.push(`llms.txt : adresse en .html ${l}`);
  for (const x of ko) console.error('ÉCHEC site ' + x);
  console.log(`site : ${ko.length} défaut(s) (${base})`);
  process.exit(ko.length ? 1 : 0);
})().catch(e => { console.error('ÉCHEC site : ' + e.message); process.exit(1); });
