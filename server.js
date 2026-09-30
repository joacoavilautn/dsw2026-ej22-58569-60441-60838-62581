const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/login.html';
  }

  let cleanUrl = decodeURIComponent(reqUrl).replace(/^\/+/, '');
  let filePath = path.join(PUBLIC_DIR, cleanUrl);

  // Si no tiene extensión y existe con .html (ej: /login -> /login.html)
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  console.log(`[HTTP] ${req.method} ${req.url}`);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(`
        <h2>Archivo no encontrado</h2>
        <p>No se encontró la ruta: <code>${req.url}</code></p>
        <p>Probá haciendo clic aquí para ir al login: <a href="/login.html">Iniciar Sesión</a></p>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(` Servidor local iniciado correctamente!`);
  console.log(` Abrí en tu navegador: http://localhost:${PORT}/login.html`);
  console.log(`=================================================\n`);
});
