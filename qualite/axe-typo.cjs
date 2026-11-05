// axe-core (WCAG 2.2 AA), textes visibles < 12 px, emplacements « à fournir » visibles,
// erreurs console (dont violations de la CSP).
// Usage : node axe-typo.cjs <base> <chemin> [<chemin>...]   rc=1 au moindre défaut
const { chromium } = require('playwright');
const fs = require('fs');
const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
(async () => {
  const [base, ...chemins] = process.argv.slice(2);
  const b = await chromium.launch(); let ko = 0, pages = 0;
  for (const w of [400, 1280]) for (const p of chemins) {
    const pg = await b.newPage({ viewport: { width: w, height: 900 } }), consoleKo = [];
    // seul le 404 du document de /page-introuvable est attendu ; une ressource absente reste un échec
    pg.on('console', m => { if (m.type() === 'error' && !(/status of 404/.test(m.text()) && m.location().url === base + p)) consoleKo.push(m.text()); });
    pg.on('pageerror', e => consoleKo.push(e.message));
    await pg.goto(base + p, { waitUntil: 'networkidle' });
    await pg.evaluate(axeSrc);
    const v = await pg.evaluate(async () => (await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] } }))
      .violations.map(x => `${x.id} (${x.impact}) ×${x.nodes.length} : ${x.nodes[0].target[0]}`));
    const petits = await pg.evaluate(() => [...document.querySelectorAll('body *')]
      .filter(e => e.offsetParent && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 12)
      .map(e => `« ${e.textContent.trim().slice(0, 30)} » ${getComputedStyle(e).fontSize}`));
    const fournir = await pg.evaluate(() => (document.body.innerText.match(/[^\n]*à (fournir|préciser)[^\n]*/gi) || []));
    for (const x of v) console.error(`ÉCHEC axe ${w}px ${p} ${x}`);
    for (const x of petits) console.error(`ÉCHEC taille ${w}px ${p} ${x}`);
    for (const x of consoleKo) console.error(`ÉCHEC console ${w}px ${p} : ${x.slice(0, 120)}`);
    for (const x of fournir) console.error(`ÉCHEC « à fournir » visible ${w}px ${p} : ${x.slice(0, 60)}`);
    ko += v.length + petits.length + fournir.length + consoleKo.length; pages++;
    await pg.close();
  }
  await b.close();
  console.log(`axe-typo : ${pages} page(s)×largeur, ${ko} défaut(s)`);
  process.exit(ko || !pages ? 1 : 0);
})();
