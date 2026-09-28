const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const PORT = 3000;

process.on('uncaughtException', (err) => {
  console.error('Server error handled safely:', err.message);
});
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  
  const filePath = path.join(__dirname, '..', reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const total = stats.size;

    // Support HTTP Range requests for video seeking & smooth streaming (Chrome, Safari, iOS, Edge)
    if (req.headers.range && (ext === '.mp4' || ext === '.webm')) {
      const range = req.headers.range;
      const matches = range.match(/bytes=(\d*)-(\d*)/);

      let start = 0;
      let end = total - 1;

      if (matches) {
        if (matches[1] === "" && matches[2] !== "") {
          // Suffix byte range: bytes=-500 (last 500 bytes)
          start = Math.max(0, total - parseInt(matches[2], 10));
        } else if (matches[1] !== "" && matches[2] === "") {
          // Open-ended range: bytes=500- (from 500 to end)
          start = parseInt(matches[1], 10);
        } else if (matches[1] !== "" && matches[2] !== "") {
          // Explicit range: bytes=500-999
          start = parseInt(matches[1], 10);
          end = Math.min(total - 1, parseInt(matches[2], 10));
        }
      }

      if (isNaN(start) || isNaN(end) || start > end || start >= total) {
        res.writeHead(416, {
          'Content-Range': `bytes */${total}`,
          'Accept-Ranges': 'bytes'
        });
        res.end();
        return;
      }

      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start: start, end: end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600'
      });
      file.pipe(res);
      file.on('error', () => {
        if (!res.headersSent) res.writeHead(500);
        res.end();
      });
      req.on('close', () => {
        file.destroy();
      });
    } else {
      const acceptEncoding = req.headers['accept-encoding'] || '';
      const isText = (ext === '.html' || ext === '.css' || ext === '.js' || ext === '.json');

      if (isText && acceptEncoding.includes('gzip')) {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Content-Encoding': 'gzip',
          'Vary': 'Accept-Encoding',
          'Cache-Control': 'no-cache'
        });
        fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': total,
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'no-cache'
        });
        fs.createReadStream(filePath).pipe(res);
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Jaydaar website running at http://localhost:${PORT}/`);
});
