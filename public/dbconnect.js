const Sequelize = require('sequelize');
const sequelize = new Sequelize('sistemadecadastro', 'root', 'aragao@7355608', {
    host: "localhost", 
    dialect: 'mysql'
})

sequelize.authenticate();