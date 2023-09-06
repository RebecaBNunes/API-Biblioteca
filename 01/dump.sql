CREATE DATABASE biblioteca;

CREATE TABLE autores (
	id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  idade INTEGER
);

CREATE TABLE livros (
	id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  genero VARCHAR(80),
  editora VARCHAR(100),
  data_publicacao VARCHAR(20),
  autor_id INTEGER REFERENCES autores(id)
);