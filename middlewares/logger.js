const { formatTimestamp } = require('../utils/formatter');

// Mencatat: metode HTTP, path, status response, dan waktu request.
// Status baru diketahui setelah response selesai, jadi dicatat di event 'finish'.
function logger(req, res, next) {
  const mulai = Date.now();

  res.on('finish', () => {
    const durasi = Date.now() - mulai;
    console.log(
      `[${formatTimestamp()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${durasi}ms`
    );
  });

  next();
}

module.exports = logger;