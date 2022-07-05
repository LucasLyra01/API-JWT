const Sequelize = require('sequelize');
const sequelize = require('../db/index');

const Tokens = sequelize.define('tokens', {
    
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const init = async () => {
    await Tokens.sync();
    console.log("BASE DE DADOS CRIADA");
}

init();

module.exports = Tokens;