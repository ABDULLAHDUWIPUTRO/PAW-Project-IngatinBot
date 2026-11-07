// Konfigurasi aplikasi. Nilai sensitif (password DB) dibaca dari file .env yang TIDAK di-commit.
require('dotenv').config({ quiet: true });

module.exports = {
  appName: 'IngatinBot',
  versi: '1.0.0',
  port: process.env.PORT || 5173,
  timezone: 'Asia/Jakarta',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '', // dipakai setelah integrasi Telegram aktif
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'ingatinbot',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || ''
  }
};