const knex = require('../bancoDeDados/conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const segredo = require('../segredo');


const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Não autorizado');
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, segredo);
      
        const userCheck = await knex('usuarios').where({ id }).first();

        if (!userCheck) {
            return res.status(404).json('Usuario não encontrado');
        }
             
        const { senha, ...usuario } = userCheck;

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = verificarLogin;