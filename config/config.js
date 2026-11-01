// Konfigurasi aplikasi (port, nama app, token Telegram untuk minggu berikutnya)
module.exports = {
  appName: 'IngatinBot',
  versi: '1.0.0',
  port: process.env.PORT || 5173,
  timezone: 'Asia/Jakarta',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '' // dipakai setelah integrasi Telegram aktif
};