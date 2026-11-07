# PAW-Project-IngatinBot

Web pengingat aktivitas dengan notifikasi Telegram. Express.js + EJS + MVC + PostgreSQL (Sequelize).

## Menjalankan
1. Buat database PostgreSQL bernama `ingatinbot`.
2. Salin `.env.example` menjadi `.env`, lalu isi password database.
3. Jalankan:
```bash
npm install
npm start
```
Buka http://localhost:5173. Tabel dan data awal dibuat otomatis saat server pertama kali jalan.

## Endpoint
| Method | Path | Keterangan |
|---|---|---|
| GET | /api/status | Status aplikasi |
| GET | /api/produk | Semua produk dari database |
| GET | /api/produk/:id | Detail produk |
| POST | /api/produk | Tambah produk |
| PUT | /api/produk/:id | Ubah produk |
| DELETE | /api/produk/:id | Hapus produk |
| GET | /api/aktivitas | Semua aktivitas |
| GET | /api/aktivitas/:id | Detail aktivitas |
| POST | /api/aktivitas | Tambah aktivitas (judul, tanggal, jam) |
| PUT | /api/aktivitas/:id | Ubah aktivitas |
| DELETE | /api/aktivitas/:id | Hapus aktivitas |

## Struktur
`config/` konfigurasi dan koneksi database · `models/` model Sequelize · `middlewares/` logger dan error handler · `controllers/` logika request · `routes/` endpoint · `views/` template EJS · `utils/` validator, seeder, dan fungsi bantu