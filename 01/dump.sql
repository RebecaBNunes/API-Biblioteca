CREATE DATABASE biblioteca;

CREATE TABLE autores (
	id SERIAL PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  idade INTEGER
);
