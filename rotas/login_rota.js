//Rota: /login (localhost:3000/login)

const express = require('express');
const rota = express.Router();

const usuarioController = require('../controller/usuario_controller');

rota.post('/', usuarioController.validarUsuario);

module.exports = rota;