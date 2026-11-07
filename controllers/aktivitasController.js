const aktivitasModel = require('../models/aktivitasModel');
const asyncHandler = require('../utils/asyncHandler');
const { sudahLewat } = require('../utils/formatter');
const { parseId, validasiAktivitas } = require('../utils/validator');

const PESAN_LEWAT = 'Waktu aktivitas sudah lewat. Pilih tanggal dan jam yang akan datang.';

const getAktivitas = asyncHandler(async (req, res) => {
  res.json(await aktivitasModel.getAll());
});

const getAktivitasById = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ status: 'error', message: 'ID tidak valid' });

  const item = await aktivitasModel.getById(id);
  if (!item) return res.status(404).json({ status: 'error', message: 'Aktivitas tidak ditemukan' });
  res.json(item);
});

const tambahAktivitas = asyncHandler(async (req, res) => {
  const { error, data } = validasiAktivitas(req.body);
  if (error) return res.status(400).json({ status: 'error', message: error });

  if (sudahLewat(data.tanggal, data.jam)) {
    return res.status(400).json({ status: 'error', message: PESAN_LEWAT });
  }

  res.status(201).json(await aktivitasModel.create(data));
});

const ubahAktivitas = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ status: 'error', message: 'ID tidak valid' });

  const { error, data } = validasiAktivitas(req.body);
  if (error) return res.status(400).json({ status: 'error', message: error });

  const lama = await aktivitasModel.getById(id);
  if (!lama) return res.status(404).json({ status: 'error', message: 'Aktivitas tidak ditemukan' });

  // Hanya tolak waktu lampau jika jadwal memang diubah (menandai selesai pada aktivitas lama tetap boleh)
  const jadwalBerubah = data.tanggal !== lama.tanggal || data.jam !== lama.jam;
  if (jadwalBerubah && sudahLewat(data.tanggal, data.jam)) {
    return res.status(400).json({ status: 'error', message: PESAN_LEWAT });
  }

  res.json(await aktivitasModel.update(id, data));
});

const hapusAktivitas = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ status: 'error', message: 'ID tidak valid' });

  const berhasil = await aktivitasModel.remove(id);
  if (!berhasil) return res.status(404).json({ status: 'error', message: 'Aktivitas tidak ditemukan' });
  res.json({ status: 'ok', message: 'Aktivitas berhasil dihapus' });
});

module.exports = { getAktivitas, getAktivitasById, tambahAktivitas, ubahAktivitas, hapusAktivitas };