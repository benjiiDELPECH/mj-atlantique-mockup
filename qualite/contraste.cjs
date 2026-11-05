// v3 : contraste des textes sur image/dégradé, mesuré tel que vu à l'écran.
// - capture du VIEWPORT (jamais fullPage : les blocs 100vh s'étireraient) ;
// - TOUT le texte de la page masqué au moment de la capture (enfants compris) ;
// - recadrages enregistrés dans crops/ pour contrôle visuel.
// Usage : node contraste.cjs <base> <chemin> [<chemin>...]   ex. node contraste.cjs https://etude.mj-atlantique.fr / /etude /contact
// Sortie : JSON de toutes les mesures sur stdout, échecs sur stderr ; rc=1 si un texte est sous le seuil WCAG.
const { chromium } = require('playwright');
const fs = require('fs'), zlib = require('zlib');
const axeSrc = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
function png(buf) {
  let i = 8, w, h, idat = [];
  while (i < buf.length) {
    const len = buf.readUInt32BE(i), type = buf.toString('ascii', i + 4, i + 8), d = buf.slice(i + 8, i + 8 + len);
    if (type === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); if (d[8] !== 8 || ![2, 6].includes(d[9])) throw new Error(`PNG non géré : profondeur ${d[8]}, type ${d[9]}`); var bpp = d[9] === 6 ? 4 : 3; }
    if (type === 'IDAT') idat.push(d);
    i += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat)), st = w * bpp, px = Buffer.alloc(h * st);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (st + 1)], line = raw.slice(y * (st + 1) + 1, (y + 1) * (st + 1));
    for (let x = 0; x < st; x++) {
      const a = x >= bpp ? px[y * st + x - bpp] : 0, b = y ? px[(y - 1) * st + x] : 0, c = (x >= bpp && y) ? px[(y - 1) * st + x - bpp] : 0;
      let v = line[x];
      if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); v += (pa <= pb && pa <= pc) ? a : pb <= pc ? b : c; }
      px[y * st + x] = v & 255;
    }
  }
  return { w, h, px, bpp };
}
const lum = (r, g, b) => [r, g, b].map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }).reduce((s, v, k) => s + v * [.2126, .7152, .0722][k], 0);
const ratio = (a, b) => (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
const MASQUE = '*,*::before,*::after{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;caret-color:transparent!important}';

module.exports = { png, lum, ratio };
if (require.main === module) (async () => {
  const [base, ...chemins] = process.argv.slice(2);
  fs.mkdirSync('crops', { recursive: true });
  const b = await chromium.launch();
  const res = [];
  for (const w of [400, 1280]) for (const p of chemins) {
    const pg = await b.newPage({ viewport: { width: w, height: 900 } });
    await pg.goto(base + p, { waitUntil: 'networkidle' });
    await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 300) { scrollTo(0, y); await new Promise(r => setTimeout(r, 40)); } scrollTo(0, 0); });
    // défilement instantané : avec scroll-behavior:smooth, la capture tombait en plein défilement
    await pg.addStyleTag({ content: 'html{scroll-behavior:auto!important}*,*::before,*::after{transition:none!important;animation:none!important}' });
    await pg.addScriptTag({ content: axeSrc });
    const cibles = await pg.evaluate(async () => {
      const r = await axe.run(document, { runOnly: ['color-contrast'] });
      const out = [];
      for (const [etat, l] of [['violation', r.violations], ['incomplet', r.incomplete]])
        for (const x of l) for (const n of x.nodes) {
          const e = document.querySelector(n.target[0]); if (!e) continue;
          const s = getComputedStyle(e);
          let op = 1; for (let q = e; q; q = q.parentElement) op *= +getComputedStyle(q).opacity;
          e.dataset.sonde = out.length;
          out.push({ etat, c: s.color, fs: parseFloat(s.fontSize), fw: +s.fontWeight, op, ombre: s.textShadow !== 'none',
            txt: [...e.childNodes].filter(t => t.nodeType === 3).map(t => t.textContent).join(' ').trim().replace(/\s+/g, ' ').slice(0, 40) || e.innerText.trim().slice(0, 40) });
        }
      return out;
    });
    for (let i = 0; i < cibles.length; i++) {
      const t = cibles[i], el = pg.locator(`[data-sonde="${i}"]`);
      await el.evaluate(e => e.scrollIntoView({ block: 'center' }));
      await pg.waitForTimeout(120);
      const masque = await pg.addStyleTag({ content: MASQUE });
      const bb = await el.boundingBox();
      if (!bb || bb.width < 2 || bb.height < 2) { await masque.evaluate(n => n.remove()); continue; }
      const clip = { x: Math.max(0, bb.x), y: Math.max(0, bb.y), width: Math.min(bb.width, w - Math.max(0, bb.x)), height: Math.min(bb.height, 900 - Math.max(0, bb.y)) };
      if (clip.width < 2 || clip.height < 2) { await masque.evaluate(n => n.remove()); continue; }
      const buf = await pg.screenshot({ clip });
      await masque.evaluate(n => n.remove());
      const nom = `crops/${w}${p.replace(/[/.]/g, '_')}-${i}.png`; fs.writeFileSync(nom, buf);
      const shot = png(buf);
      let [r, g, bl, a = 1] = t.c.match(/[\d.]+/g).map(Number); a *= t.op;
      const vals = [];
      for (let k = 0; k < shot.px.length; k += shot.bpp * 2) {
        const R = shot.px[k], G = shot.px[k + 1], B = shot.px[k + 2];
        vals.push(ratio(lum(r * a + R * (1 - a), g * a + G * (1 - a), bl * a + B * (1 - a)), lum(R, G, B)));
      }
      vals.sort((x, y) => x - y);
      const gros = t.fs >= 24 || (t.fs >= 18.66 && t.fw >= 700), seuil = gros ? 3 : 4.5;
      res.push({ w, p, etat: t.etat, txt: t.txt, fs: t.fs, fw: t.fw, alpha: +a.toFixed(2), ombre: t.ombre, p10: +vals[Math.floor(vals.length * .1)].toFixed(2), med: +vals[Math.floor(vals.length / 2)].toFixed(2), seuil, ok: vals[Math.floor(vals.length * .1)] >= seuil, crop: nom });
    }
    await pg.close();
  }
  console.log(JSON.stringify(res));
  for (const x of res.filter(x => !x.ok)) console.error(`ÉCHEC contraste ${x.w}px ${x.p} « ${x.txt} » ${x.p10}:1 < ${x.seuil}:1 (${x.crop})`);
  if (!res.length) console.error('ÉCHEC : aucun texte mesuré (0 mesure ≠ succès)');
  await b.close();
  process.exit(!res.length || res.some(x => !x.ok) ? 1 : 0);
})();
