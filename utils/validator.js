// Validasi input request. Mengembalikan { error } jika tidak valid, atau { data } jika valid.

function parseId(nilai) {
  const id = Number(nilai);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function validasiProduk(body = {}) {
  const nama = String(body.nama || '').trim();
  const kategori = String(body.kategori || '').trim();
  const deskripsi = String(body.deskripsi || '').trim();
  const harga = Number(body.harga ?? 0);

  if (!nama || !kategori) return { error: 'nama dan kategori wajib diisi' };
  if (!Number.isInteger(harga) || harga < 0) return { error: 'harga harus berupa bilangan bulat >= 0' };

  return { data: { nama, kategori, deskripsi, harga } };
}

function validasiAktivitas(body = {}) {
  const judul = String(body.judul || '').trim();
  const tanggal = String(body.tanggal || '');
  const jam = String(body.jam || '');

  if (!judul || !tanggal || !jam) return { error: 'judul, tanggal, dan jam wajib diisi' };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) return { error: 'format tanggal harus YYYY-MM-DD' };
  if (!/^\d{2}:\d{2}$/.test(jam)) return { error: 'format jam harus HH:MM' };

  const data = { judul, tanggal, jam };
  if (body.selesai !== undefined) data.selesai = Boolean(body.selesai);
  return { data };
}

module.exports = { parseId, validasiProduk, validasiAktivitas };