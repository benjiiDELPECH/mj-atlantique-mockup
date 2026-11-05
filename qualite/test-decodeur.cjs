// node test-decodeur.cjs — test du décodeur et du calcul de contraste : couleurs connues rendues par Chromium.
const { chromium } = require('playwright');
const { png, lum, ratio } = require('./contraste.cjs');
(async () => {
  const b = await chromium.launch(), pg = await b.newPage({ viewport: { width: 300, height: 200 } });
  let ko = 0;
  for (const [r, g, bl] of [[10, 200, 30], [0, 22, 86], [255, 255, 255], [138, 144, 160]]) {
    await pg.setContent(`<body style="margin:0;background:rgb(${r},${g},${bl})"></body>`);
    const s = png(await pg.screenshot({ clip: { x: 37, y: 11, width: 101, height: 53 } }));
    const k = (20 * s.w + 50) * s.bpp, lu = [s.px[k], s.px[k + 1], s.px[k + 2]];
    const ok = lu.every((v, i) => Math.abs(v - [r, g, bl][i]) <= 1) && s.w === 101 && s.h === 53;
    if (!ok) ko++;
    console.log(ok ? 'ok   ' : 'ÉCHEC', `attendu ${r},${g},${bl} lu ${lu} bpp ${s.bpp} ${s.w}x${s.h}`);
  }
  // valeurs WCAG de référence : #8a90a0 sur blanc = 3,19 ; blanc sur noir = 21
  const c1 = ratio(lum(138, 144, 160), lum(255, 255, 255)), c2 = ratio(lum(255, 255, 255), lum(0, 0, 0));
  for (const [v, att] of [[c1, 3.19], [c2, 21]]) { const ok = Math.abs(v - att) < .01; if (!ok) ko++; console.log(ok ? 'ok   ' : 'ÉCHEC', `ratio ${v.toFixed(2)} attendu ${att}`); }
  await b.close();
  process.exit(ko ? 1 : 0);
})();
