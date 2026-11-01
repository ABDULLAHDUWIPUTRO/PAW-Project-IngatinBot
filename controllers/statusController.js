const config = require('../config/config');
const { formatTimestamp } = require('../utils/formatter');

function getStatus(req, res) {
  res.json({
    status: 'ok',
    aplikasi: config.appName,
    versi: config.versi,
    uptimeDetik: Math.floor(process.uptime()),
    waktuServer: formatTimestamp()
  });
}

module.exports = { getStatus };