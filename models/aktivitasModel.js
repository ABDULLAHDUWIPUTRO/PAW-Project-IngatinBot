// Data aktivitas disimpan di memori (array). Hilang saat server restart; database menyusul di minggu berikutnya.
const aktivitas = [];
let nextId = 1;

function getAll() {
  return [...aktivitas].sort((a, b) =>
    `${a.tanggal} ${a.jam}`.localeCompare(`${b.tanggal} ${b.jam}`)
  );
}

function create({ judul, tanggal, jam }) {
  const item = { id: nextId++, judul, tanggal, jam, selesai: false };
  aktivitas.push(item);
  return item;
}

module.exports = { getAll, create };