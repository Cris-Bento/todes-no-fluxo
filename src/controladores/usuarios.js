const conexao = require('../bancoDeDados/conexao');
const { format } = require('date-fns');
const knex = require('../bancoDeDados/conexao');
const bcrypt = require('bcrypt');
const schemaEmail = require('../validacoes/schemaEmail');
const schemaEditarUsuario = require('../validacoes/schemaEditarUsuario');
const schemaUsuario = require('../validacoes/schemaUsuario')

const obterUsuario = async (req, res) =>{
    return res.status(200).json(req.usuario);
}

const cadastrarUsuario = async (req, res) =>{
    const { 
        nome, 
        email, 
        data_nascimento, 
        senha, 
        local_entrega, 
        pacotes_doados, 
        data_retirada 
    } = req.body;
    
    const nasceu = new Date(data_nascimento);
    const agora = new Date()

    const anoAtual = agora.getFullYear()
    const anoNasceu = nasceu.getFullYear()
    
    if(anoAtual - anoNasceu < 18) {
        return res.status(400).json({ "mensagem": "É preciso ser maior de 18 anos para ser doador." });
    }
            
    try {
        const usuarioExiste = await knex ('usuarios').where({email}).first()
        if(usuarioExiste) {
            return res.status(400).json("O email cadastrado ja existe.")
        }
        await schemaUsuario.validate(req.body);

        const hash = await bcrypt.hash(senha, 10);

        const usuario = { 
            nome, 
            email, 
            data_nascimento, 
            senha: hash, 
            local_entrega, 
            pacotes_doados, 
            data_retirada 
        }; 

        const query = await knex('usuarios').insert(usuario);
        
        if (query.rowCount > 0) {
            return res.status(200).json('Usuário cadastrado com sucesso');
        }
     
        return res.status(400).json('Usuário não cadastrado');
    } catch (error) {
        return res.status(400).json(error.message);
    }
    }

const editarUsuario = async (req, res) =>{
    const body = req.body;

    const { id } = req.usuario;

    const nasceu = new Date(body.data_nascimento);
    const agora = new Date()

    const anoAtual = agora.getFullYear()
    const anoNasceu = nasceu.getFullYear()
    
    if(anoAtual - anoNasceu < 18) {
        return res.status(400).json({ "mensagem": "É preciso ser maior de 18 anos para ser doador." });
    }

    try {
        const usuarioExiste = await knex ('usuarios').where({email: body.email}).first()
        if(usuarioExiste) {
            return res.status(400).json("O email cadastrado ja existe.")
        }
        await schemaEditarUsuario.verifiqueNome.validate({nome: body.nome});
        await schemaEditarUsuario.verifiqueEmail.validate({email: body.email});
        await schemaEditarUsuario.verifiqueDataRetirada.validate({data_retirada: body.data_retirada});
        if (!body.senha) {

            const getSenha = await knex('usuarios').where({ id }).first();

            const usuario = { ...body, senha: getSenha.senha }; 

            const query = await knex('usuarios').where({ id }).update(usuario);

            if (query.rowCount > 0) {
                return res.status(400).json('Não foi possivel editar o usuário.');
            }

            return res.status(200).json('Cadastro alterado com sucesso!');
        }

        await schemaEditarUsuario.verifiqueSenha.validate({ senha: body.senha});

        const hash = await bcrypt.hash(body.senha, 10); 

        const queryUsuario = await knex('usuarios').where({ id }).update({ ...body, senha: hash });

        if (queryUsuario > 0) {
            return res.status(200).json('Cadastro alterado com sucesso!');
        }

        return res.status(400).json('Não foi possivel editar o usuário.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
    
}

const deletarUsuario = async (req, res) =>{
    const { usuario } = req;

    const id = Number(req.params.id); 
    
    if(isNaN(id)){
        return res.status(400).json({"mensagem": "Um id numérico  deve ser informado"});
    }
    
    if (id !== usuario.id) {
        return res.status(403).json({"mensagem": "Ação não permitida. Id não pertence ao usuário logado"});
    }

    try {
       
        const usuarioExcluido = await knex('usuarios').where({id}).del();
            
        if (!usuarioExcluido) {
            return res.status(400).json("O usuário não foi excluido");
        }

        return res.status(200).json('Usuário excluido com sucesso');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    obterUsuario,
    cadastrarUsuario,
    editarUsuario,
    deletarUsuario
    
}