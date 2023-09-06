const pool = require('./conexao');

const validarParametroUrl = (request, response, next) => {
    const { id } = request.params;

    if (!id || isNaN(Number(id))) {
        return response.status(400).json({ mensagem: 'Identificador inválido.' });
    }

    next();
}

const validarExistenciaAutor = async (request, response, next) => {
    const { id } = request.params;

    const query = `SELECT * FROM autores WHERE id = $1;`;

    try {
        const autor = await pool.query(query, [id]);
        if (!autor.rows[0]) {
            return response.status(404).json({ mensagem: 'Autor não encontrado.' });
        }
        next();
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    validarExistenciaAutor,
    validarParametroUrl
}