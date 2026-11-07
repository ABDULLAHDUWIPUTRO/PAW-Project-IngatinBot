// Penanganan error terpusat: semua error dari controller/model berakhir di sini.
function errorHandler(err, req, res, next) {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ status: 'error', message: 'Format JSON tidak valid' });
  }

  console.error('[Error]', err.message);
  res.status(500).json({ status: 'error', message: 'Terjadi kesalahan pada server' });
}

module.exports = errorHandler;