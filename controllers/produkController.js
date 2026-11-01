const produkModel = require('../models/produkModel');

function getProduk(req, res) {
  res.json(produkModel.getAll()); // array JSON
}

module.exports = { getProduk };