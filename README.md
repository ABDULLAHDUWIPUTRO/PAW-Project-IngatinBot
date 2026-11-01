# PAW-Project-IngatinBot

Web pengingat aktivitas dengan notifikasi Telegram. Project PAW Week 7 (Express.js + EJS + MVC).

## Menjalankan
```bash
npm install
npm start
```
Buka http://localhost:5173

## Endpoint
| Method | Path | Keterangan |
|---|---|---|
| GET | /api/status | Status aplikasi (JSON) |
| GET | /api/produk | Daftar produk (array JSON) |
| GET | /api/aktivitas | Daftar aktivitas |
| POST | /api/aktivitas | Tambah aktivitas (judul, tanggal, jam) |

## Struktur
`config/` konfigurasi · `models/` data · `middlewares/` logger · `controllers/` logika request · `routes/` endpoint · `views/` template EJS · `utils/` fungsi bantu