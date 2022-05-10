const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db/banco.sqlite'
});

module.exports = sequelize;