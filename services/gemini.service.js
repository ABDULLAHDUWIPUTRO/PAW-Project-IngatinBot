// Service komunikasi dengan Google Gemini + penyusunan context dari database.
const { GoogleGenAI } = require('@google/genai');
const gemini = require('../config/gemini');
const produkModel = require('../models/produkModel');
const aktivitasModel = require('../models/aktivitasModel');
const { sekarangWIB } = require('../utils/formatter');

let client = null;

function buatError(httpStatus, userMessage, detail) {
  const err = new Error(detail || userMessage);
  err.httpStatus = httpStatus;
  err.userMessage = userMessage;
  return err;
}

function getClient() {
  if (!gemini.apiKey) {
    throw buatError(503, 'Layanan AI belum dikonfigurasi. Hubungi pengelola aplikasi.', 'GEMINI_API_KEY belum diisi di .env');
  }
  if (!client) client = new GoogleGenAI({ apiKey: gemini.apiKey });
  return client;
}

const rupiah = (n) => (n === 0 ? 'Gratis' : `Rp${n.toLocaleString('id-ID')}`);

// Mengambil data terbaru dari database sebagai sumber context AI
async function buatContext() {
  const [produk, aktivitas] = await Promise.all([produkModel.getAll(), aktivitasModel.getAll()]);
  const sekarang = sekarangWIB();

  const barisProduk = produk.length
    ? produk.map((p, i) => `${i + 1}. ${p.nama} | kategori: ${p.kategori} | harga: ${rupiah(p.harga)} | ${p.deskripsi}`).join('\n')
    : '(belum ada paket)';

  const barisAktivitas = aktivitas.length
    ? aktivitas.map((a, i) => `${i + 1}. ${a.judul} | ${a.tanggal} ${a.jam} WIB | ${a.selesai ? 'sudah selesai' : 'belum selesai'}`).join('\n')
    : '(belum ada aktivitas)';

  return `DATA APLIKASI (sumber kebenaran, diambil dari database)
Waktu sekarang: ${sekarang.tanggal} ${sekarang.jam} WIB

Paket layanan:
${barisProduk}

Aktivitas pengguna:
${barisAktivitas}`;
}

// Mengubah error dari SDK Gemini menjadi error yang aman ditampilkan ke pengguna
function petakanError(err) {
  const status = Number(err.status || err.code);
  if (status === 429) return buatError(429, 'Layanan AI sedang sibuk atau kuota habis. Coba lagi beberapa saat.', err.message);
  if ([400, 401, 403, 404].includes(status)) {
    return buatError(503, 'Layanan AI tidak dapat diakses saat ini. Hubungi pengelola aplikasi.', err.message);
  }
  return buatError(502, 'Layanan AI sedang bermasalah. Coba lagi nanti.', err.message);
}

const tunggu = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Error sementara dari sisi server Gemini (mis. 503 "high demand") layak dicoba ulang
const bisaDiulang = (err) => [500, 503, 504].includes(Number(err.status || err.code));

async function tanyaGemini(pesan) {
  const ai = getClient();
  const konteks = await buatContext();
  const systemInstruction = `${gemini.systemInstruction}\n\n${konteks}`;

  // Model utama dulu; jika tetap gagal, coba model cadangan
  const daftarModel = [gemini.model];
  if (gemini.fallbackModel && gemini.fallbackModel !== gemini.model) daftarModel.push(gemini.fallbackModel);

  let response = null;
  let errTerakhir = null;

  for (const model of daftarModel) {
    for (let percobaan = 0; percobaan <= gemini.maxRetry; percobaan++) {
      try {
        response = await ai.models.generateContent({
          model,
          contents: pesan,
          config: {
            systemInstruction,
            temperature: gemini.temperature,
            maxOutputTokens: gemini.maxOutputTokens
          }
        });
        break;
      } catch (err) {
        errTerakhir = err;
        console.error(`[Gemini] ${model} percobaan ${percobaan + 1} gagal: ${err.message}`);
        if (!bisaDiulang(err)) break;                       // error permanen: langsung ke model berikutnya
        if (percobaan < gemini.maxRetry) await tunggu(gemini.retryDelayMs * (percobaan + 1));
      }
    }
    if (response) break;
  }

  if (!response) throw petakanError(errTerakhir);

  const reply = (response.text ? response.text : '').trim();
  if (!reply) {
    throw buatError(502, 'AI tidak memberikan jawaban. Coba ajukan pertanyaan dengan kalimat lain.', 'Response Gemini kosong');
  }
  return reply;
}

module.exports = { tanyaGemini, buatContext };