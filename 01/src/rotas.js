const express = require('express');
const roteador = express();
const pool = require('./conexao');
const autorController = require('./controladores/autorController');

roteador.post('/autor', autorController.cadastrarAutor);
roteador.get('/autor/:id', autorController.buscarAutor);

module.exports = roteador;