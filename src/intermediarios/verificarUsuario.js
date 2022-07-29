const schemaUsuario = require('../validations/schemaUsers');
const knex = require('../bancoDeDados/conexao');
const schemaEditUsuario = require('../validacoes/schemaEditarUsuario')

const signUpFilter = async (req, res, next) => {
    const { email } = req.body;
    
    try {
        await schemaUsuario.validate(req.body);
        
        const verifyEmail = await knex('usuarios').where('email', email);
        
        if (verifyEmail.length > 0) {
            return res.status(400).json('E-mail já cadastrado');
        }

        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }

};

const editFilter = async (req, res, next) => {
    const { email } = req.body;

    const { id } = req.user;

    try {
        await schemaEditUsuario.verifiqueEmail.validate({ email });

        if (email) {
            const verifyEmailOwner = await knex('usuarios').where({ id }).first();

            if (verifyEmailOwner.email !== email) {
               const verifyEmail = await knex('usuarios').where({ email }).first();

                if (verifyEmail) {
                    return res.status(400).json('E-mail já cadastrado');
                } 
            }
        }
        
        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    signUpFilter,
    editFilter
}