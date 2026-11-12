const express = require('express');
const { getStatus } = require('../controllers/statusController');
const produk = require('../controllers/produkController');
const aktivitas = require('../controllers/aktivitasController');
const chatRoutes = require('./chat.routes');

const router = express.Router();

router.get('/status', getStatus);

// CRUD produk
router.get('/produk', produk.getProduk);
router.get('/produk/:id', produk.getProdukById);
router.post('/produk', produk.tambahProduk);
router.put('/produk/:id', produk.ubahProduk);
router.delete('/produk/:id', produk.hapusProduk);

// CRUD aktivitas
router.get('/aktivitas', aktivitas.getAktivitas);
router.get('/aktivitas/:id', aktivitas.getAktivitasById);
router.post('/aktivitas', aktivitas.tambahAktivitas);
router.put('/aktivitas/:id', aktivitas.ubahAktivitas);
router.delete('/aktivitas/:id', aktivitas.hapusAktivitas);

// AI Assistant (Gemini)
router.use('/chat', chatRoutes);
module.exports = router;