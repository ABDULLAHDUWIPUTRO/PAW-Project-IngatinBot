// Data produk statis (tanpa database). Paket IngatinBot sesuai persona di PRD.
const produk = [
  {
    id: 1,
    nama: 'Paket Pelajar',
    kategori: 'Akademik',
    deskripsi: 'Pengingat tugas, praktikum, dan jadwal kuliah via Telegram.',
    harga: 0
  },
  {
    id: 2,
    nama: 'Paket Organisasi',
    kategori: 'Organisasi',
    deskripsi: 'Pengingat rapat dan deadline kegiatan dengan tombol tunda.',
    harga: 15000
  },
  {
    id: 3,
    nama: 'Paket Freelancer',
    kategori: 'Profesional',
    deskripsi: 'Pengingat deadline banyak klien dan rekap mingguan.',
    harga: 25000
  }
];

function getAll() {
  return produk;
}

module.exports = { getAll };