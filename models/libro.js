const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Editorial = require('./editorial');

const Libro = sequelize.define('Libro', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  autor: { type: DataTypes.STRING, allowNull: false },
  anio: { type: DataTypes.INTEGER, allowNull: false },
  imagen: { type: DataTypes.STRING }
});

Libro.belongsTo(Editorial, { foreignKey: 'EditorialId' });
Editorial.hasMany(Libro);

module.exports = Libro;
