const { timezone } = require('../config/config');

// Contoh: 01/11/2026 10.30.15 (WIB)
function formatTimestamp(date = new Date()) {
  return date.toLocaleString('id-ID', { timeZone: timezone, hour12: false });
}

// Contoh: 2026-11-04 -> Rabu, 4 November 2026
function formatTanggal(tanggal) {
  const d = new Date(`${tanggal}T00:00:00`);
  return d.toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
}

module.exports = { formatTimestamp, formatTanggal };