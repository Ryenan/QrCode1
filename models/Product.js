const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    validade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fabricacao: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Product;