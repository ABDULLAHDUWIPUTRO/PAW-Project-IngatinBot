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

// Tanggal dan jam saat ini dalam WIB, format: { tanggal: '2026-11-01', jam: '14:30' }
function sekarangWIB() {
  const now = new Date();
  return {
    tanggal: now.toLocaleDateString('en-CA', { timeZone: timezone }),
    jam: now.toLocaleTimeString('en-GB', { timeZone: timezone, hour12: false, hour: '2-digit', minute: '2-digit' })
  };
}

module.exports = { formatTimestamp, formatTanggal, sekarangWIB };