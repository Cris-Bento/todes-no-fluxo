# API TODES NO FLUXO - Backend

A API permite:

-   Cadastrar Usuário
-   Fazer Login
-   Detalhar Perfil do Usuário Logado
-   Editar Perfil do Usuário Logado
-   Remover o Usuário Logado


**Importante: Cada usuário só pode ver e manipular seus próprios dados. !**

**Importante 1: Sempre que a validação de uma requisição falhar, responda com código de erro e mensagem adequada à situação.**

**Importante 2: O link de acesso a esta API se encontra no final deste README!**


## **Banco de dados**

Criei um Banco de Dados PostgreSQL chamado `todes_no_fluxo` contendo as seguintes tabelas e colunas:  

-   usuarios
    -   id
    -   nome
    -   email (campo único)
    -   data_nascimento
    -   senha
    -   local_entrega
    -   pacotes_doados
    -   data_retirada
    
**IMPORTANTE: Tem no projeto um arquivo SQL que contem o script que cria as tabelas corretamente.**

## **Detalhes da Api**

-   A API tem acesso ao banco de dados criado `todes_no_fluxo` para persistir e manipular os dados de usuários.
-   O campo `id` das tabelas no banco de dados é de auto incremento, chave primária e não permite edição uma vez criado.
-   O código é organizado, delimitando as responsabilidades de cada arquivo adequadamente. Ou seja, ele tem os seguinte arquivos:
    -   Um arquivo index.js
    -   Um arquivo conexao.js
    -   Um arquivo de rotas
    -   Um pasta com controladores


## **Status Codes**

Abaixo, listandos os possíveis **_status codes_** esperados como resposta da API.

```javascript
// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
```

## **Endpoints**

### **Cadastrar usuário**

#### `POST` `/usuarios`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

-   **Requisição**  
    
    -   id
    -   nome
    -   email (campo único)
    -   data_nascimento
    -   senha
    -   local_entrega
    -   pacotes_doados
    -   data_retirada

-   **Resposta**  
    Em caso de **sucesso**, deveremos enviar no corpo (body) da resposta o conteúdo do usuário cadastrado, incluindo seu respectivo `id` e excluindo a senha criptografada.
    Em caso de **falha na validação**, a resposta retornara **_status code_** apropriado.
    Caso o doador for menor de idade, recebera uma resposta que infomra que doador tem que ser maior de 18.


#### **Exemplo de requisição**

```javascript
// POST /usuarios
{
    "nome": "Cris",
    "email": "Cris@email.com",
    "data_nascimento":"11-02-2000",
    "senha": "123456",
    "local_entrega":"shopping",
    "pacotes_doados":2,
    "data_retirada":"11-02-2023",

}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "mensagem": "Usuário cadastrado com sucesso."
}
```

```javascript
// HTTP Status 400 
{
    "mensagem": "O email cadastrado já existe."
}
```

### **Login do usuário**

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) possui um objeto com as seguintes propriedades (respeitando estes nomes):

    -   email
    -   senha

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta retorna um objeto com a propriedade **token** que contem como valor o token de autenticação gerado e uma propriedade **usuario** .  
    

```javascript
// POST /login
{
    "email": "cris@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 
{
    "messagem":"Ola Cris, seja muito bem vinde ao progrma todes no fluxo"
    "usuario": {
    "nome": "Cris",
    "email": "cris@email.com",
    "data_nascimento":"11-02-2000",
    "senha": "123456",
    "local_entrega":"shopping",
    "pacotes_doados":2,
    "data_retirada":"11-02-2023",
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400 
{
    "mensagem": "Usuário ou senha não conferem."
}
```

---

## **ATENÇÃO**: As funcionalidades (endpoints) a seguir, a partir desse ponto, exigirão o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado.

---

### **Detalhar usuário**

#### `GET` `/usuarios`

Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa o usuário encontrado, com todas as suas propriedades (exceto a senha), conforme exemplo abaixo, acompanhado de **_status code_** apropriado.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.  
    

#### **Exemplo de requisição**

```javascript
// GET /usuarios
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 
{
    "nome": "Cris",
    "email": "cris@email.com",
    "data_nascimento":"11-02-2000",
    "senha": "123456",
    "local_entrega":"shopping",
    "pacotes_doados":2,
    "data_retirada":"11-02-2023",
}
```

```javascript
// HTTP Status 400 
{
    "mensagem": "Token não informado."
}
```

### **Atualizar usuário**

#### `PUT` `/usuarios`

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

    -   nome
    -   email
    -   senha
    -   local_entrega
    -   pacotes_doados
    -   data_retirada

-   **Resposta**  
    Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.
    

-   **REQUISITOS OBRIGATÓRIOS**
    -   Caso o doador for menor de idade, recebera uma resposta que infomra que doador tem que ser maior de 18.
    -   Validar se o novo e-mail já existe no banco de dados para outro usuário
        -   Caso já exista o novo e-mail fornecido para outro usuário no banco de dados, a alteração não deve ser permitida (o campo de email é único no banco de dados)
    -   Criptografar a senha antes de salvar no banco de dados
    -   Atualizar as informações do usuário no banco de dados

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "Cris Bento",
    "email": "crisbento@email.com",
    "data_nascimento":"11-02-2000",
    "senha": "123456",
    "local_entrega":"shopping",
    "pacotes_doados":2,
    "data_retirada":"11-02-2023",
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 
{
    "mensagem": "Cadastro alterado com sucesso."
}
```

```javascript
// HTTP Status 400 
{
    "mensagem": "O email cadastrado já existe."
}
```
### **Excluir usuário logado**

#### `DELETE` `/usuarios/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir sua conta.  
**Lembre-se:** Deverá ser possível excluir **apenas** a conta do próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

-   **Requisição**  
    Deverá ser enviado o ID da transação no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

-   **Resposta**  
    Em caso de **sucesso**, não deveremos enviar conteúdo no corpo (body) da resposta.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**:
    -   Validar se existe transação para o id enviado como parâmetro na rota e se esta transação pertence ao usuário logado.
    -   Excluir a transação no banco de dados.

#### **Exemplo de requisição**

```javascript
// DELETE /usuarios/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 
{
    "mensagem": "Usuario excluido com sucesso"
}
```

```javascript
// HTTP Status 400 
{
    "mensagem": "O usuario não foi excluido."
}
```
---

Link do deploy da API somente para testes: [ link]()

---

