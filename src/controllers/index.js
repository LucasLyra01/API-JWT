const TokensModel = require('../models/models.js');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const crypto = require('crypto');

exports.cadastrarTokens = async (req, res) => {

    // passar como parametro nome e password

    const body = req.body;

    var hash = crypto.createHash('sha256').update(body.senha).digest('base64');

    const token = jwt.sign({ userID: body.nome }, hash, { expiresIn: 300 })

    const inserirToken = await TokensModel.create({
        nome: body.nome,
        senha: hash,
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
            // Primeiro ele verifica o token pra ver se ele é verdadeiro
            // Depois ele vai fazer a verificação pra saber se o token expirou

            jwt.verify(response.token, response.senha, (error, decoded) => {
                if(error){
                    console.log('Deu erro aqui dentro');
                    console.log(error);
                }else{
                    console.log('Aqui vai aparecer se ele for válido', decoded);
                    let dateIat = new Date(decoded.iat * 1000);
                    dateIat = dateIat.getHours() + ':' + dateIat.getMinutes() + ':' + dateIat.getSeconds();
        
                    console.log("Data emissão:", dateIat);
                    
                    let dateExp = new Date(decoded.exp * 1000);
                    dateExp = dateExp.getHours() + ':' + dateExp.getMinutes() + ':' + dateExp.getSeconds();
                    console.log("Data expiração:", dateExp);
        
                    let dataEmissao = Date.parse(dateIat);
                    let dataExpiracao = Date.parse(dateExp);
                }
            })



            // jwt.verify(response.token, '1234', (error, decoded) => {
            //     if(error){
            //         console.log('Deu erro aqui dentro');
            //         console.log(error);
            //     }else{
            //         console.log('Aqui vai aparecer se ele for válido', decoded);
            //         return decoded;
            //     }
            // })
            
            res.json({
                status: 'error',
                message: 'Nome se encontra na base de dados',
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

exports.fazerLogin = async (req, res) => {

    const body = req.body;

    var hash = crypto.createHash('sha256').update(body.senha).digest('base64');

    const nomeLogin = await TokensModel.findAll({
        where: {
            [Op.and]: [
                { nome: body.nome },
                { senha: hash }
            ]
        }
    });

    if ( nomeLogin.length > 0 ) {

        nomeLogin.map(() => {
            res.json({
                status: 'ok',
                message: 'Login realizado com sucesso'
            })

            

        })
    }else {
        res.json({
            status: 'error',
            message: 'Ocorreu um erro ao realizar o login'
        })
    }



}