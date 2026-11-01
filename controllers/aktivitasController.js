const aktivitasModel = require('../models/aktivitasModel');

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

  const baru = aktivitasModel.create({ judul: String(judul).trim(), tanggal, jam });
  res.status(201).json(baru);
}

module.exports = { getAktivitas, tambahAktivitas };