const pool = require('../conexao');
const { validarExistenciaAutor } = require('../intermediarios');

const cadastrarLivro = async (request, response) => {
    const idAutor = request.params.id;
    const { nome, genero, editora, data_publicacao } = request.body;

    if (!nome || !nome.trim()) {
        return response.status(400).json({ mensagem: 'o campo nome é obrigatório' });
    }

    const query = `
    INSERT INTO livros
    (nome, genero, editora, data_publicacao, autor_id)
    values
    ($1, $2, $3, $4, $5)
    returning id
    `;

    try {
        const resultado = await pool.query(query, [nome, genero, editora, data_publicacao, idAutor]);

        const { id } = resultado.rows[0];
        const livro = await pool.query('SELECT id, nome, genero, editora, data_publicacao FROM livros WHERE id = $1', [id]);
        return response.status(201).json(livro.rows[0]);

    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ mensagem: 'Ocorreu um erro ao tentar cadastrar um livro.' })
    }
}

module.exports = {
    cadastrarLivro
}