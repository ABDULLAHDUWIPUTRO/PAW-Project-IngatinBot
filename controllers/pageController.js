const config = require('../config/config');

function renderHome(req, res) {
  res.render('index', { appName: config.appName });
}

module.exports = { renderHome };