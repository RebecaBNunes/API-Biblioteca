const express = require('express');
const roteador = express();

const autorController = require('./controladores/autorController');
const livroController = require('./controladores/livroController');
const { validarExistenciaAutor, validarParametroUrl } = require('./intermediarios');

roteador.post('/autor', autorController.cadastrarAutor);
roteador.get('/autor/:id', validarParametroUrl, validarExistenciaAutor, autorController.buscarAutor);
roteador.post('/autor/:id/livro', validarParametroUrl, validarExistenciaAutor, livroController.cadastrarLivro);

module.exports = roteador;