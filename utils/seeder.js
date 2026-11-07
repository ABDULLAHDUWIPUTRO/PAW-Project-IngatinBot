// Mengisi data awal jika tabel masih kosong, supaya operasi Read langsung bisa diuji.
const { timezone } = require('../config/config');
const { Produk } = require('../models/produkModel');
const { Aktivitas } = require('../models/aktivitasModel');

function tanggalOffset(hari) {
  const d = new Date();
  d.setDate(d.getDate() + hari);
  return d.toLocaleDateString('en-CA', { timeZone: timezone });
}

async function jalankanSeeder() {
  if ((await Produk.count()) === 0) {
    await Produk.bulkCreate([
      { nama: 'Paket Pelajar', kategori: 'Akademik', deskripsi: 'Pengingat tugas, praktikum, dan jadwal kuliah via Telegram.', harga: 0 },
      { nama: 'Paket Organisasi', kategori: 'Organisasi', deskripsi: 'Pengingat rapat dan deadline kegiatan dengan tombol tunda.', harga: 15000 },
      { nama: 'Paket Freelancer', kategori: 'Profesional', deskripsi: 'Pengingat deadline banyak klien dan rekap mingguan.', harga: 25000 }
    ]);
    console.log('[Seeder] Data awal produk dibuat');
  }

  if ((await Aktivitas.count()) === 0) {
    await Aktivitas.bulkCreate([
      { judul: 'Kumpul tugas praktikum PAW', tanggal: tanggalOffset(1), jam: '20:00' },
      { judul: 'Belajar Sequelize', tanggal: tanggalOffset(2), jam: '19:30' }
    ]);
    console.log('[Seeder] Data awal aktivitas dibuat');
  }
}

module.exports = { jalankanSeeder };