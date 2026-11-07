const produkModel = require('../models/produkModel');
const asyncHandler = require('../utils/asyncHandler');
const { parseId, validasiProduk } = require('../utils/validator');

const getProduk = asyncHandler(async (req, res) => {
  res.json(await produkModel.getAll()); // array JSON dari database
});

const getProdukById = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ status: 'error', message: 'ID tidak valid' });

  const item = await produkModel.getById(id);
  if (!item) return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
  res.json(item);
});

const tambahProduk = asyncHandler(async (req, res) => {
  const { error, data } = validasiProduk(req.body);
  if (error) return res.status(400).json({ status: 'error', message: error });

  res.status(201).json(await produkModel.create(data));
});

const ubahProduk = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ status: 'error', message: 'ID tidak valid' });

  const { error, data } = validasiProduk(req.body);
  if (error) return res.status(400).json({ status: 'error', message: error });

  const item = await produkModel.update(id, data);
  if (!item) return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
  res.json(item);
});

const hapusProduk = asyncHandler(async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ status: 'error', message: 'ID tidak valid' });

  const berhasil = await produkModel.remove(id);
  if (!berhasil) return res.status(404).json({ status: 'error', message: 'Produk tidak ditemukan' });
  res.json({ status: 'ok', message: 'Produk berhasil dihapus' });
});

module.exports = { getProduk, getProdukById, tambahProduk, ubahProduk, hapusProduk };