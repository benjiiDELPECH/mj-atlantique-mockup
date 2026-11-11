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
// Google coupe la description vers 155-160 caractères : au-delà, l'aperçu finit en « … ».
const DESC_MAX = 160;
const vues = { description: new Map(), 'og:description': new Map() };
// Affirmations contredites par une source (checklist §1 « zéro invention ») : elles ne doivent pas revenir.
const CONTREDITS = [
  [/à compter du jugement d.ouverture/, 'le délai court de la publication au BODACC (art. R.622-24 C. com., Infogreffe)'],
  [/fondée en 2007|[ÉE]tude créée|(?<!mandataires judiciaires )[Dd]epuis 2007/,'SCP immatriculée le 13.09.1991 (SIRENE 383573201) ; la source dit « inscrite sur la liste nationale depuis 2007 »'],
  [/17001/, 'code postal 17000 (SIRENE et mentions légales de www.mj-atlantique.fr)'],
  [/6 à 8 mois|12 et 24 mois/, 'durées de clôture sans source'],
];
const contredits = (lieu, texte) => { for (const [re, src] of CONTREDITS) if (re.test(texte)) ko.push(`${lieu} : « ${texte.match(re)[0]} » contredit — ${src}`); };
const get = u => fetch(base + u, { redirect: 'manual' });
const attr = (html, re) => (html.match(re) || [])[1];
(async () => {
  for (const p of PAGES) {
    const r = await get(p), html = await r.text();
    if (r.status !== 200) { ko.push(`${p} : statut ${r.status}`); continue; }
    contredits(p, html);
    for (const [h, re] of Object.entries(SECU)) if (!re.test(r.headers.get(h) || '')) ko.push(`${p} : en-tête ${h} absent ou faible (« ${r.headers.get(h)} »)`);
    const canon = attr(html, /<link rel="canonical" href="([^"]+)"/), og = attr(html, /<meta property="og:url" content="([^"]+)"/);
    if (canon !== site + p) ko.push(`${p} : canonique « ${canon} » ≠ ${site + p}`);
    if (og !== canon) ko.push(`${p} : og:url « ${og} » ≠ canonique`);
    // Une description par page, lisible en entier dans l'aperçu, différente de celle des autres pages.
    const desc = {
      description: attr(html, /<meta name="description" content="([^"]*)"/),
      'og:description': attr(html, /<meta property="og:description" content="([^"]*)"/),
    };
    for (const [k, d] of Object.entries(desc)) {
      if (!d) { ko.push(`${p} : ${k} absente`); continue; }
      if (d.length > DESC_MAX) ko.push(`${p} : ${k} de ${d.length} caractères (> ${DESC_MAX})`);
      if (vues[k].has(d)) ko.push(`${p} : ${k} identique à celle de ${vues[k].get(d)}`);
      vues[k].set(d, p);
    }
    for (const h of html.match(/href="(?!https?:|mailto:|tel:|#)[^"]*\.html[^"]*"/g) || []) ko.push(`${p} : lien interne en .html ${h}`);
    if (/class="opp-card"|Opportunités en cours/.test(html)) ko.push(`${p} : annonces d'exemple encore présentes`);
    // Un formulaire doit aboutir quelque part : action absente, vide ou « # » = message perdu.
    for (const f of html.match(/<form\b[^>]*>/g) || []) if (!/action="https?:\/\/[^"#]+"/.test(f)) ko.push(`${p} : formulaire sans destination ${f}`);
    // Un lien qui ne mène nulle part (« # » ou vide) promet un clic sans suite.
    const morts = html.match(/href="#?"/g) || [];
    if (morts.length) ko.push(`${p} : ${morts.length} lien(s) vers nulle part (href="#" ou vide)`);
    if (p === '/contact') for (const m of ['contact@mj-atlantique.fr', 'contact@mj-perpignan.fr'])
      if (!html.includes(`href="mailto:${m}`)) ko.push(`/contact : lien d'écriture vers ${m} absent`);
  }
  const r404 = await get('/cette-page-nexiste-pas'), b404 = await r404.text();
  if (r404.status !== 404) ko.push(`404 : statut ${r404.status}`);
  if (!/href="\/"/.test(b404) || !/<title>[^<]*introuvable/i.test(b404)) ko.push('404 : page sans titre « introuvable » ni lien vers l\'accueil');
  const rh = await get('/etude.html');
  if (![301, 308].includes(rh.status) || rh.headers.get('location') !== '/etude') ko.push(`/etude.html : ${rh.status} → ${rh.headers.get('location')}`);
  const plan = await (await get('/sitemap.xml')).text(), locs = [...plan.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  if (locs.join(' ') !== PAGES.map(p => site + p).join(' ')) ko.push(`sitemap : ${locs.join(' ')}`);
  const llms = await (await get('/llms.txt')).text();
  contredits('llms.txt', llms);
  for (const l of llms.match(/https?:\/\/[^)\s]+\.html/g) || []) ko.push(`llms.txt : adresse en .html ${l}`);
  for (const x of ko) console.error('ÉCHEC site ' + x);
  console.log(`site : ${ko.length} défaut(s) (${base})`);
  process.exit(ko.length ? 1 : 0);
})().catch(e => { console.error('ÉCHEC site : ' + e.message); process.exit(1); });
