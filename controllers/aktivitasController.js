const aktivitasModel = require('../models/aktivitasModel');
const { sekarangWIB } = require('../utils/formatter');

function getAktivitas(req, res) {
  res.json(aktivitasModel.getAll());
}

function tambahAktivitas(req, res) {
  const { judul, tanggal, jam } = req.body || {};

  if (!judul || !tanggal || !jam) {
    return res.status(400).json({
      status: 'error',
      message: 'judul, tanggal, dan jam wajib diisi'
    });
  }

    // Pengingat hanya masuk akal untuk waktu yang belum lewat (WIB)
  const sekarang = sekarangWIB();
  if (`${tanggal} ${jam}` < `${sekarang.tanggal} ${sekarang.jam}`) {
    return res.status(400).json({
      status: 'error',
      message: 'Waktu aktivitas sudah lewat. Pilih tanggal dan jam yang akan datang.'
    });
  }

  const baru = aktivitasModel.create({ judul: String(judul).trim(), tanggal, jam });
  res.status(201).json(baru);
}

module.exports = { getAktivitas, tambahAktivitas };