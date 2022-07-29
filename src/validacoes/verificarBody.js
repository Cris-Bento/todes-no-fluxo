const verificarBodyUsuario = (usuario) => {
    const { nome, email, data_nascimento, senha, local_entrega, pacotes_doados } = usuario;

    if(!nome){
        return "O campo nome é obrigatório";
    }
    
    if(!email){
        return "O campo email é obrigatório";
    }
    
    if(!data_nascimento){
        return "O campo data_nascimento é obrigatório";
    }

    if(!senha){
        return "O campo senha é obrigatório";
    }
    
    if(!local_entrega){
        return "O campo local_entrega é obrigatório";
    }

    if(!pacotes_doados){
        return "O campo pacotes_doados é obrigatório";
    }
}

module.exports = {
    verificarBodyUsuario
    
};