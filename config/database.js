const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway', "mysql.railway.internal"  ,'YsSBFKGjYljoLCpzrccmOzapUnqUkEki', {
  host: 'mysql.railway.internal',
  dialect: 'mysql',
  PORT:'3306'
});

module.exports = sequelize;