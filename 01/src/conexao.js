const { Pool } = require('pg');
const { senha } = require('./pass');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: senha,
    database: 'biblioteca'
});

module.exports = pool;