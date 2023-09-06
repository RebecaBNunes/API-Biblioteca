const express = require('express');
const roteador = require('./rotas');

const app = express();

app.use(express.json());

app.use(roteador);

const PORTA = 3000;
app.listen(PORTA, () => console.log(`Servidor rodando em http://localhost:${PORTA} 🚀`));