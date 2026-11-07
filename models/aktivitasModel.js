// Model Aktivitas (tabel "aktivitas"). Seluruh query database ke tabel ini ada di sini.
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Aktivitas = sequelize.define('Aktivitas', {
  judul: { type: DataTypes.STRING(150), allowNull: false },
  tanggal: { type: DataTypes.DATEONLY, allowNull: false },
  jam: { type: DataTypes.STRING(5), allowNull: false },
  selesai: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}, { tableName: 'aktivitas', timestamps: false });

const getAll = () => Aktivitas.findAll({ order: [['tanggal', 'ASC'], ['jam', 'ASC']] });

const getById = (id) => Aktivitas.findByPk(id);

const create = (data) => Aktivitas.create(data);

async function update(id, data) {
  const item = await Aktivitas.findByPk(id);
  if (!item) return null;
  return item.update(data);
}

async function remove(id) {
  const item = await Aktivitas.findByPk(id);
  if (!item) return false;
  await item.destroy();
  return true;
}

module.exports = { Aktivitas, getAll, getById, create, update, remove };