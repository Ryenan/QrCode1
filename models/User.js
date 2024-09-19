const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Certifique-se que o caminho está correto

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

(async () => {
  await sequelize.sync();
})();

module.exports = User;
