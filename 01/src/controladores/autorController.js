const pool = require('../conexao');

const cadastrarAutor = async (request, response) => {
    const { nome, idade } = request.body;

    if (!nome || !nome.trim()) {
        return response.status(400).json({ mensagem: 'o campo nome é obrigatório.' });
    }

    const query = `
    INSERT INTO autores
    (nome, idade)
    values
    ($1, $2)
    returning id;
    `
    const params = [nome, idade];

    try {
        const resultado = await pool.query(query, params);
        const { id } = resultado.rows[0];
        const autor = await pool.query('SELECT * FROM autores WHERE id = $1', [id]);
        return response.status(201).json(autor.rows[0]);
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ mensagem: 'Ocorreu um erro ao tentar cadastrar o autor.' });
    }
}

module.exports = {
    cadastrarAutor
};