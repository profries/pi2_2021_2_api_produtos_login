const express = require('express');
const app = express();
const porta = 3000;
const usuarioController = require('./controller/usuario_controller');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const loginRota = require('./rotas/login_rota');
app.use('/login', loginRota);

//app.use(usuarioController.validarToken);

const produtoRota = require('./rotas/produto_rota');
app.use('/produtos', usuarioController.validarToken , produtoRota);

const usuarioRota = require('./rotas/usuario_rota');
app.use('/usuarios', usuarioRota);


app.listen(porta,() => 
    console.log(`Iniciando o servidor na porta ${porta}`)
);