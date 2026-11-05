// Aucun bloc du hero ne doit chevaucher le bandeau des chiffres, à chaque largeur.
// Usage : node chevauche.cjs <url de l'accueil>   rc=1 si chevauchement
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); let ko = 0;
  for (const w of [360, 400, 768, 1024, 1280, 1440]) {
    const pg = await b.newPage({ viewport: { width: w, height: 800 } });
    await pg.goto(process.argv[2], { waitUntil: 'networkidle' });
    const r = await pg.evaluate(() => {
      const s = document.querySelector('.hero-strip').getBoundingClientRect();
      const blocs = [...document.querySelectorAll('.hero-door, .hero-sub, .hero-h, .hero-doors-lead')];
      return blocs.map(e => e.getBoundingClientRect()).filter(x => x.bottom > s.top + 1 && x.top < s.bottom).length;
    });
    console.log(r ? 'ÉCHEC' : 'ok   ', w, 'px :', r, 'bloc(s) sous le bandeau');
    ko += r; await pg.close();
  }
  await b.close(); process.exit(ko ? 1 : 0);
})();
