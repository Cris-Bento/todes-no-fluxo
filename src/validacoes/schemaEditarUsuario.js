const yup = require('./settings');

const verifiqueNome = yup.object().shape({
    nome: yup.string().required()
});

const verifiqueEmail = yup.object().shape({
    email: yup.string().email().required()
});

const verifiqueSenha= yup.object().shape({
    senha: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').max(15, 'Senha deve ter no máximo 15 caracteres')
});

const verifiqueLocalEntrega = yup.object().shape({
    local_entrega: yup.string().required()
});

const verifyPacotes = yup.object().shape({
    pacotes_doados: yup.number().required().positive().integer(),
});

const verifiqueDataRetirada = yup.object().shape({
    data_retirada: yup.date().required()
});



module.exports = {
    verifiqueNome,
    verifiqueEmail,
    verifiqueSenha,
    verifiqueLocalEntrega,
    verifyPacotes,
    verifiqueDataRetirada
};