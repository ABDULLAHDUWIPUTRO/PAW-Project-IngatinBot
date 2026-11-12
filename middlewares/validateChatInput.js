// Validasi input chat sebelum diproses: tipe, kosong, panjang, dan percobaan prompt injection.
const { maxMessageLength, pesanTolakInjection, pesanTolakDiLuarKonteks } = require('../config/gemini');

// Pola umum prompt injection (Indonesia dan Inggris)
const POLA_INJECTION = [
  /\b(ignore|disregard|forget|override|bypass)\b.{0,40}\b(instruction|instructions|rules?|prompt|guidelines|system)\b/i,
  /\b(abaikan|lupakan|hiraukan|kesampingkan|langgar|lewati|ubah|ganti)\b.{0,40}\b(instruksi|aturan|perintah|prompt|batasan|pembatasan|peran)(mu|nya)?\b/i,
  /\b(system\s*prompt|prompt\s*sistem|instruksi\s*sistem|system\s*instruction|developer\s*mode|jailbreak)\b/i,
  /\b(pura-pura|berpura-pura|roleplay|role-play|act\s+as|pretend|berperanlah|berperan\s+sebagai|anggap\s+dirimu)\b/i,
  /\b(tampilkan|bocorkan|tunjukkan|sebutkan|ungkapkan|reveal|show|print|repeat)\b.{0,30}\b(instruksi|instructions?|prompt|api\s*key|kunci\s*api)(mu|nya)?\b/i
];

// Permintaan yang jelas di luar ruang lingkup aplikasi (contoh: membuat kode program atau game)
const POLA_DI_LUAR_KONTEKS = [
  /\b(buat(kan)?|bikin(kan)?|tulis(kan)?|write|create|generate)\b.{0,30}\b(kode|coding|source\s*code|script|game|puisi|cerpen|esai|skripsi|lagu|resep)\b/i
];

function validateChatInput(req, res, next) {
  const { message } = req.body || {};

  if (typeof message !== 'string') {
    return res.status(400).json({ success: false, message: 'Pesan harus berupa teks' });
  }

  // Hapus karakter kontrol dan rapikan spasi
  const bersih = message.replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim();

  if (!bersih) {
    return res.status(400).json({ success: false, message: 'Pesan tidak boleh kosong' });
  }
  if (bersih.length > maxMessageLength) {
    return res.status(400).json({
      success: false,
      message: `Pesan terlalu panjang (maksimal ${maxMessageLength} karakter)`
    });
  }

  // Percobaan prompt injection ditolak di backend tanpa memanggil Gemini
  if (POLA_INJECTION.some((pola) => pola.test(bersih))) {
    return res.json({ success: true, data: { reply: pesanTolakInjection } });
  }

  // Permintaan yang jelas di luar konteks aplikasi juga ditolak di backend
  if (POLA_DI_LUAR_KONTEKS.some((pola) => pola.test(bersih))) {
    return res.json({ success: true, data: { reply: pesanTolakDiLuarKonteks } });
  }

  req.body.message = bersih;
  next();
}

module.exports = validateChatInput;