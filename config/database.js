const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sistemadecadastro', 'root', '123kopi321', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;