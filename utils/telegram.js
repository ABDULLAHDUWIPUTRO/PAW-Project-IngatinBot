// Placeholder pengiriman notifikasi Telegram.
// Belum aktif di Week 7; akan diisi (Telegram Bot API + penjadwal) di minggu berikutnya.
const { telegramBotToken } = require('../config/config');

async function kirimPengingat(chatId, pesan) {
  if (!telegramBotToken) {
    console.log(`[Telegram] Belum aktif. Pesan untuk ${chatId}: ${pesan}`);
    return false;
  }
  // TODO: panggil Telegram Bot API (sendMessage)
  return false;
}

module.exports = { kirimPengingat };