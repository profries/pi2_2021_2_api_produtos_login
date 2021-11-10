//Rota: /usuarios (localhost:3000/usuarios)

const express = require('express');
const rota = express.Router();

const usuarioController = require('../controller/usuario_controller');

rota.get('/', usuarioController.listar);
rota.post('/', usuarioController.inserir);
//busca deve vir antes, senão a variavel id interpreta como id=busca
rota.get('/busca', usuarioController.buscarPorUsername);
rota.get('/:id', usuarioController.buscarPorId);

module.exports = rota;