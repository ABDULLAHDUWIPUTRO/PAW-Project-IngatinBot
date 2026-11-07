const express = require('express');
const path = require('path');
const config = require('./config/config');
const sequelize = require('./config/database');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const apiRoutes = require('./routes/apiRoutes');
const pageRoutes = require('./routes/pageRoutes');
const { jalankanSeeder } = require('./utils/seeder');

const app = express();

app.disable('etag'); // supaya response selalu 200, bukan 304 dari cache

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger);          // logger dipasang paling awal agar semua request tercatat
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', pageRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Endpoint tidak ditemukan' });
});
app.use(errorHandler);

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Koneksi database berhasil');
    await sequelize.sync();      // membuat tabel jika belum ada
    await jalankanSeeder();      // mengisi data awal jika tabel kosong

    app.listen(config.port, () => {
      console.log(`${config.appName} berjalan di http://localhost:${config.port}`);
    });
  } catch (err) {
    console.error('Gagal terhubung ke database:', err.message);
    console.error('Cek file .env dan pastikan PostgreSQL sudah berjalan.');
    process.exit(1);
  }
}

start();