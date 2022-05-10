const TokensModel = require('../models/models.js');
const jwt = require('jsonwebtoken');
const moment = require('moment');

exports.cadastrarTokens = async (req, res) => {

    const body = req.body;

    const token = jwt.sign({ userID: body.nome }, body.password, { expiresIn: 300 })

    const inserirToken = await TokensModel.create({
        nome: body.nome,
        token: token
    })

    res.json({
        status: 'ok',
        message: inserirToken
    })
}

exports.listarTokens = async (req, res) => {
    
    try {
        const dados = await TokensModel.findAll();
        let vetorDados = [];
    
        dados.map((response) => {
            vetorDados.push({
                nome: response.nome,
                token: response.token
            });
        });
    
        res.json({
            status: 'ok',
            token: vetorDados
        })
        
    } catch (error) {
        res.json({
            status: 'error',
            message: error
        })
    }
}

exports.verificarToken = async (req, res) => {

    const body = req.params;

    const nomeExiste = await TokensModel.findAll({
        where: {
            nome: body.nome
        }
    });

    if(nomeExiste.length > 0){

        nomeExiste.map((response) => {
            console.log(response.token);
            var decoded = jwt.decode(response.token);
            console.log(decoded);

            let dateIat = new Date(decoded.iat * 1000);
            dateIat = dateIat.getHours() + ':' + dateIat.getMinutes() + ':' + dateIat.getSeconds();

            console.log("Data emissão:", dateIat);
            
            let dateExp = new Date(decoded.exp * 1000);
            dateExp = dateExp.getHours() + ':' + dateExp.getMinutes() + ':' + dateExp.getSeconds();
            console.log("Data expiração:", dateExp);

            let data1 = Date.parse(dateIat);
            let data2 = Date.parse(dateExp);

            if(data1 > data2){
                console.log('first')
            }
            
            res.json({
                status: 'error',
                message: 'Nome já se encontra na base de dados',
                nome: response.nome,
                token: response.token
            });
        });
    }else{
        res.json({
            status: 'error',
            message: 'Nome não encontrado'
        })
    }

}

exports.deletarToken = async (req, res) => {

    const body = req.params;

    try {
        const tokens = await TokensModel.destroy({
            where: {
                nome: body.nome
            }
        });

        res.json({
            status: 'ok',
            message: tokens
        });
    } catch (error) {
        res.json({
            status: 'erro',
            message: error
        })
    }



}