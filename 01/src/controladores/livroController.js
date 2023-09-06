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

const listarLivros = async (request, response) => {
    const { pagina, quantPorPagina } = request.query;

    const query = `
    SELECT l.id as idLivro, l.nome as nomeLivro, l.genero, l.editora, l.data_publicacao, a.id, a.nome, a.idade FROM livros l JOIN autores a ON l.autor_id = a.id ORDER BY l.id asc;`;

    try {
        const livros = await pool.query(query);
        const livrosFormatados = [];
        for (let livro of livros.rows) {
            const book = {
                id: livro.id,
                nome: livro.nomelivro,
                genero: livro.genero,
                editora: livro.editora,
                data_publicacao: livro.data_publicacao,
                autor: {
                    id: livro.id,
                    nome: livro.nome,
                    idade: livro.idade
                }
            }
            livrosFormatados.push(book);
        }

        return response.json(livrosFormatados);

    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ mensagem: 'Ocorreu um erro ao tentar listar todos os livros.' });
    }
}

module.exports = {
    cadastrarLivro,
    listarLivros
}