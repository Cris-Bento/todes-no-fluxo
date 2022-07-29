const knex = require('../bancoDeDados/conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const segredo = require('../segredo');
const {schemaLogin} = require('../validacoes/schemaLogin');



const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        await schemaLogin.validate(req.body);

        const usuario = await knex('usuarios').where({ email }).first();

        if (!usuario) {
            return res.status(404).json('O usuario não foi encontrado');
        }

        const validarSenha = await bcrypt.compare(senha, usuario.senha);

        if (!validarSenha) {
            return res.status(400).json("Email ou senha não conferem");
        }

        const token = jwt.sign({ id: usuario.id }, segredo, { expiresIn: '2h' });

        const { senha: _, ...usuarioData } = usuario;

        return res.status(200).json({
            messagem:`Ola ${usuario.nome}, seja bem vinde ao programa Todes No Fluxo`,
            usuario: usuarioData,
            token
        });

        
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    login
}