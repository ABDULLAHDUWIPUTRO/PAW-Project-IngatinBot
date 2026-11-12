// Controller hanya menerima request dan mengembalikan response. Logika Gemini ada di service.
const { tanyaGemini } = require('../services/gemini.service');

async function kirimChat(req, res) {
  try {
    const reply = await tanyaGemini(req.body.message);
    res.json({ success: true, data: { reply } });
  } catch (err) {
    console.error('[Chat] Gagal:', err.message);
    res.status(err.httpStatus || 500).json({
      success: false,
      message: err.userMessage || 'Terjadi kesalahan pada server'
    });
  }
}

module.exports = { kirimChat };