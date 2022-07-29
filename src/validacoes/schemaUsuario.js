const yup = require('./settings');

const schemaUsuario = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    data_nascimento: yup.date().required(),
    senha: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').max(15, 'Senha deve ter no máximo 15 caracteres').required(),
    local_entrega: yup.string().max(90).required(),
    pacotes_doados: yup.number().required().positive().integer(),
    data_retirada: yup.date().required(),
});

module.exports = schemaUsuario;