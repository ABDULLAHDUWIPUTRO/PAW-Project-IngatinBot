// Koneksi database PostgreSQL lewat Sequelize. Dibuat satu kali, dipakai oleh semua model.
const { Sequelize } = require('sequelize');
const { db } = require('./config');

const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.host,
  port: db.port,
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;