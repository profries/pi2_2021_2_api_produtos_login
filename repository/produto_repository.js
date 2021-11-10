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
    cliente.query('SELECT * FROM produto', (err, res) => {
        callback(err,res.rows);
        cliente.end();
    });
}

exports.inserir = (produto, callback) => {
    const sql = "INSERT INTO produto(nome, preco) VALUES ($1, $2) RETURNING *";
    const values = [produto.nome, produto.preco];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        callback(err, res.rows[0]);
        cliente.end();
    });
}

exports.buscarPorId = (id, callback) => {
    const sql = "SELECT * FROM produto WHERE id=$1";
    const values = [id];

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
            const error = "Produto nao encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}

exports.atualizar = (id, produto, callback) => {
    const sql = "UPDATE produto SET nome=$1, preco=$2 WHERE id=$3 RETURNING *";
    const values = [produto.nome, produto.preco, id];

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
            const error = "Produto nao encontrado";
            callback(error, null);
        }
        cliente.end();
    });    
}

exports.deletar = (id, callback) => {
    const sql = "DELETE FROM produto WHERE id=$1 RETURNING *";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    cliente.query(sql, values, (err, res) => { 
        if(err){
            callback(err, null);
        }
        else if(res.rowCount > 0) {
            callback(null, res.rows[0]);
        }
        else {
            const error = "Produto nao encontrado";
            callback(error, null);
        }
        cliente.end();
    });
}

