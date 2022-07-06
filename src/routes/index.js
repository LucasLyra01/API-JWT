let router = require('express').Router();
const cors = require('cors');

const TokenController = require('../controllers/index');

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

router.get('/', cors(corsOptions), TokenController.listarTokens);

router.post('/cadastro', cors(corsOptions), TokenController.cadastrarTokens);

router.post('/login', TokenController.fazerLogin);

router.get('/:nome', TokenController.verificarToken);

router.delete('/:nome', TokenController.deletarToken);

module.exports = router;