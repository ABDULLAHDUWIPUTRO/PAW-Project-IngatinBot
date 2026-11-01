const express = require('express');
const { getStatus } = require('../controllers/statusController');
const { getProduk } = require('../controllers/produkController');
const { getAktivitas, tambahAktivitas } = require('../controllers/aktivitasController');

const router = express.Router();

router.get('/status', getStatus);
router.get('/produk', getProduk);
router.get('/aktivitas', getAktivitas);
router.post('/aktivitas', tambahAktivitas);

module.exports = router;