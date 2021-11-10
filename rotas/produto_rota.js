//Rota: /produtos (localhost:3000/produtos)

const express = require('express');
const rota = express.Router();

const produtoController = require('../controller/produto_controller');

rota.get('/', produtoController.listar);
rota.post('/', produtoController.inserir);
rota.get('/:id', produtoController.buscarPorId);
rota.put('/:id', produtoController.atualizar);
rota.delete('/:id', produtoController.deletar);

module.exports = rota;