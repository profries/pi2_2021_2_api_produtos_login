const { Client } = require('pg');

const conexao = {
    host: 'localhost',
    port: 5432,
    database: 'crud_produtos',
    user: 'postgres',
    password: 'postgres'
};

//Conexao com banco de dados
exports.listar = (callback) => {

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query('SELECT * FROM usuario', (err, res) => {
        callback(err,res.rows);
        cliente.end();
    });
}

exports.inserir = (usuario, callback) => {
    const sql = "INSERT INTO usuario(nome, email, username, senha) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [usuario.nome, usuario.email, usuario.username, usuario.senha];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.buscarPorusername = (username, callback) => {
    const sql = "SELECT * FROM usuario WHERE username=$1";
    const values = [username];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        if(err){
            callback(err, null);
        }
        else if(res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        }
        else {
            const error = "Usuario nao encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.buscarPorUsername = (username, callback) => {
    const sql = "SELECT * FROM usuario WHERE username=$1";
    const values = [username];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        if(err){
            callback(err, null);
        }
        else if(res.rows && res.rows.length > 0) {
            callback(null, res.rows[0]);
        }
        else {
            const error = "Usuario nao encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}
