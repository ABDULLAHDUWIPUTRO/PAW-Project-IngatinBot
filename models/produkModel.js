// Model Produk (tabel "produk"). Seluruh query database ke tabel ini ada di sini, bukan di controller.
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produk = sequelize.define('Produk', {
  nama: { type: DataTypes.STRING(100), allowNull: false },
  kategori: { type: DataTypes.STRING(50), allowNull: false },
  deskripsi: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
  harga: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
}, { tableName: 'produk', timestamps: false });

const getAll = () => Produk.findAll({ order: [['id', 'ASC']] });

const getById = (id) => Produk.findByPk(id);

const create = (data) => Produk.create(data);

async function update(id, data) {
  const item = await Produk.findByPk(id);
  if (!item) return null;
  return item.update(data);
}

async function remove(id) {
  const item = await Produk.findByPk(id);
  if (!item) return false;
  await item.destroy();
  return true;
}

module.exports = { Produk, getAll, getById, create, update, remove };