// Sert dist/ comme Cloudflare Pages, pour que la boucle locale voie ce que voit le site en ligne :
// /etude -> etude.html, /etude.html -> 308 /etude, chemin inconnu -> 404.html (statut 404),
// en-têtes du bloc « /* » de _headers appliqués à toutes les réponses.
// Usage : node serve.cjs <dist> <port>
const http = require('http'), fs = require('fs'), path = require('path');
const [dist, port] = process.argv.slice(2);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp' };

const entetes = {};
let bloc = null;
for (const l of fs.readFileSync(path.join(dist, '_headers'), 'utf8').split('\n')) {
  if (!l.trim()) continue;
  if (!/^\s/.test(l)) { bloc = l.trim() === '/*'; continue; }
  if (bloc) { const i = l.indexOf(':'); entetes[l.slice(0, i).trim()] = l.slice(i + 1).trim(); }
}

const fichier = p => { try { return fs.statSync(p).isFile() ? p : null; } catch { return null; } };
http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  for (const [k, v] of Object.entries(entetes)) res.setHeader(k, v);
  if (url.endsWith('.html')) { res.writeHead(308, { Location: url === '/index.html' ? '/' : url.slice(0, -5) }); return res.end(); }
  const base = path.join(dist, path.normalize(url));
  const f = fichier(url.endsWith('/') ? path.join(base, 'index.html') : base) || fichier(base + '.html');
  const cible = f || path.join(dist, '404.html');
  res.writeHead(f ? 200 : 404, { 'Content-Type': TYPES[path.extname(cible)] || 'application/octet-stream' });
  fs.createReadStream(cible).pipe(res);
}).listen(+port, '127.0.0.1');
