const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Editorial = sequelize.define('Editorial', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Editorial;
