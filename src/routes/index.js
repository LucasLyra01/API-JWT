let router = require('express').Router();

const TokenController = require('../controllers/index');

router.get('/', TokenController.listarTokens);

router.post('/cadastro', TokenController.cadastrarTokens);

router.post('/login', TokenController.fazerLogin);

router.get('/:nome', TokenController.verificarToken);

router.delete('/:nome', TokenController.deletarToken);

module.exports = router;