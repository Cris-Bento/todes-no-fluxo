const express = require('express');
const routes = express();

const {login} = require('./controladores/login');
const verificarLogin = require('./intermediarios/verificarLogin')
const { obterUsuario, cadastrarUsuario, editarUsuario, deletarUsuario } = require('./controladores/usuarios');

//login e usuários devem ficar antes de verificarLogin, por para cadastrar um usuário e fazer o login, não precisamos estar logados e com token
routes.post("/usuarios", cadastrarUsuario);
routes.post("/login", login);

routes.use(verificarLogin);

routes.get("/usuarios", obterUsuario);
routes.put("/usuarios", editarUsuario);
routes.delete("/usuarios/:id", deletarUsuario);



module.exports = routes;