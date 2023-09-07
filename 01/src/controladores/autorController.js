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
        console.error(error.message);
        return response.status(500).json({ mensagem: 'Ocorreu um erro ao tentar cadastrar o autor.' });
    }
}

const buscarAutor = async (request, response) => {
    const { id } = request.params;

    const queryAutor = `SELECT * FROM autores WHERE id = $1;`;

    try {
        const autor = (await pool.query(queryAutor, [id])).rows[0];
        if (!autor) {
            return response.status(404).json({ mensagem: 'Autor não encontrado.' });
        }

        const queryLivros = `SELECT nome, genero, editora, data_publicacao FROM livros WHERE autor_id = $1`;

        const livros = (await pool.query(queryLivros, [id])).rows;

        // if (livros.length === 0) {
        //     return response.status(404).json({ mensagem: 'livro não encontrado.' })
        // }

        return response.json({
            autor,
            livros
        });

    } catch (error) {
        console.error(error.message);
        return response.status(500).json({ mensagem: 'Ocorreu um erro ao tentar buscar um autor.' });
    }

}

module.exports = {
    cadastrarAutor,
    buscarAutor
};