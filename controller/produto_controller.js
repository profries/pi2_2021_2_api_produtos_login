const produtoRepository = require('../repository/produto_repository');


exports.listar = (req, res) => {    
    produtoRepository.listar((err, listaProdutos) => {
        if(err) { 
            res.status(500).json({ msg: err.msg }) 
        }
        else {
            res.json(listaProdutos);
        }
    })
}


exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    produtoRepository.buscarPorId (id, (err, produtoEncontrado) => {
        if(err) { 
            res.status(500).json({ msg: err }) 
        }
        else if(produtoEncontrado) {
            res.json(produtoEncontrado);
        }
        else {
            res.status(404).json({msg:"Produto nao encontrado"});
        }    
    });
}

exports.inserir = (req, res) => {
    let produto = req.body;
    if(produto && produto.nome && produto.preco) {
        produtoRepository.inserir(produto, (err, produtoInserido) => {
            if(err) { 
                res.status(500).json({ msg: err.msg }) 
            }
            else {
                res.status(201).send(produto);
            }
        });    
    }
    else {
        //Bad Request
        res.status(400).json({msg:"Entrada de dados invalida"});
    }
}

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const produtoAtualizar = req.body;

    produtoRepository.atualizar(id, produtoAtualizar, (err, produtoAtualizado) => {
        if(err) { 
            res.status(500).json({ msg: err }) 
        }
        else {
            res.json(produtoAtualizado);
        }        
    })
}

exports.deletar = (req, res) => {
    const id = req.params.id;

    produtoRepository.deletar(id, (err, produtoAtualizado) => {
        if(err) { 
            res.status(500).json({ msg: err.msg }) 
        }
        else {
            res.json(produtoAtualizado);
        }        
    })
}