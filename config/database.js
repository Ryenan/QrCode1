const sequelize = new Sequelize('sistemadecadastro', 'root', '123kopi321', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

module.exports = sequelize;