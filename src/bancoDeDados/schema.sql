CREATE DATABASE todes_no_fluxo

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    data_nascimento DATE,
    senha TEXT NOT NULL,
    local_entrega VARCHAR(90) NOT NULL,
    pacotes_doados INTEGER NOT NULL,
    data_retirada DATE
)

