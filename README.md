<h1 align="center">
  <img style="background-color: #312e38; border-radius: 10px;" alt="smartmei-logo" src="https://image4.owler.com/logo/smartmei_owler_20171107_193520_original.png" />
  <p align="center">
    <a href="https://nodejs.org/en/">
      <img src="https://img.shields.io/badge/-NodeJS-006400?style=flat&logo=Node.js&logoColor=#339933" />
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/-TypeScript-007ACC?style=flat&logo=TypeScript&logoColor=#007ACC" />
    </a>
    <a href="https://jestjs.io/">
      <img src="https://img.shields.io/badge/-Jest-C21325?style=flat&logo=Jest&logoColor=FFFFF" />
    </a>
	<a href="https://www.postgresql.org/">
	<img src="https://img.shields.io/badge/-PostgreSQL-336791?style=flat&logo=PostgreSQL&logoColor=#339933" /></a>
  </p>
</h1>

## 🔖 Sobre o projeto 

O projeto **API de empréstimos de livros** desenvolvido para teste de programador [SmartMEI](https://www.smartmei.com.br/ "SmartMEI"), tendo como objetivo construir um serviço para empréstimos de livros.

- **Features** 
  - Cadastro de Usuário - ✅
  - Login - ✅
  - Cadastro de um livro para um usuário - ✅
  - Empréstimo de livro para outro usuário - ✅
  - Devolver livro - ✅
  - Histórico de livros emprestados - ✅


## 💻 Tecnologias 

  - <img width="20px" src="https://img.icons8.com/color/2x/nodejs.png" /> [NodeJS](https://nodejs.org/en/ "NodeJS")
  - <img width="20px" src="https://img.icons8.com/color/2x/typescript.png" /> [TypeScript](https://www.typescriptlang.org/ "TypeScript")
  - <img width="20px" src="https://res.cloudinary.com/practicaldev/image/fetch/s--00h6CjGb--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.maxrooted.com/panduan-membangun-rest-api-expressjs-mysql/cover.png" /> [Express](https://expressjs.com/ "Express")
  - <img width="20px" src="https://img.icons8.com/color/2x/postgreesql.png" /> [PostgreSQL](https://www.postgresql.org/ "PostgreSQL")
  - <img width="20px" src="https://avatars2.githubusercontent.com/u/20165699?s=400&v=4" /> [TypeORM](https://typeorm.io/#/ "TypeORM")
  - <img width="20px" src="https://simpleicons.org/icons/jest.svg" /> [Jest](https://jestjs.io/ 'Jest')
  - <img width="20px" src="https://img.icons8.com/dusk/2x/docker.png" /> [Docker](https://www.docker.com/ 'Docker')
 
## ▶️ Getting Started 

 - **Passo 1️⃣** : git clone do projeto [SmartMEI](https://github.com/rafaelsanzio/smartmei "SmartMEI")
 - **Passo 2️⃣** : executar a instalação do [Node](https://nodejs.org/en/ 'Node') e [Docker](https://www.docker.com/ "Docker")

 - **Passo 3️⃣** : rodando a aplicação executando os seguintes comandos:
  ```bash
   # Navegando até a pasta do projeto
   $ cd smartmei

   # Instalando todas as depêndencias necessárias
   $ npm install ou yarn install

   # Criando container para o banco de dados PostgreSQL usando o docker
   $ docker run --name smartmei -e POSTGRES_PASSWORD=smartmei -p 5432:5432 -d postgres

   # Iniciando o banco de dados
   $ docker start smartmei

   # Criando tabelas no banco de dados a partir de migrations
   $ yarn typeorm migration:run

   # Starting o backend da aplicação
   $ npm dev:server ou yarn dev:server

   # Rodando os testes
   $ npm test ou yarn test
```

## ⚙️ Exemplificando rotas

 ```json
/* Requisição de login */
🟢 POST - /sessions
params: {
  "email": "rafaelsanzio27@gmail.com",
  "password": "123456"
}

/* Requisição de criação de usuário */
🟢 POST - /users
params: {
  "name": "Rafael Sanzio",
  "email": "rafaelsanzio@gmail.com",
  "password": "123456"
}

/* Requisições de histórico de empréstimo/profile do usuário do usuário logado - necessário token de autenticação*/
🟣 GET - /profile

/* Requisição de criação de livro - necessário token de autenticação*/
🟢 POST - /books
params: {
  "name": "Harry Potter"
}

/* Requisição de empréstimo de livro - necessário token de autenticação */
🟢 POST - /book-transaction
params: {
  "book_id": "22586a0b-af87-4c4b-b6b3-2889e5f9a183",
  "to_user_id": "b9562a67-c89d-460e-bc3a-4ed3fbf2235d"
}

/* Requisição de devolução de livro - necessário token de autenticação*/
🟠 PUT - /book-transaction/{id}
```

#### ⚠️ Observação.
  - Arquivo [Insonmia_routes.json](https://github.com/rafaelsanzio/smartmei/blob/master/Insomnia_routes.json "Insonmia_routes.json") contém as rotas feitas para melhor visualização, basta importar no [Insomnia](https://insomnia.rest/download/ "Insomnia") e as rotas estaram visíveis.

## ㊗️ Considerações 
- Projeto desenvolvido by:

  - <a href="https://github.com/rafaelsanzio">
    <img src="https://img.shields.io/badge/-Rafael%20Sanzio-000000?style=flat&logo=GitHub&logoColor=#000000" />
  </a>

  - <a href="https://www.linkedin.com/in/rafael-sanzio-012778143/">
    <img src="https://img.shields.io/badge/-Rafael%20Sanzio-0077B5?style=flat&logo=LinkedIN&logoColor=#000000" />
  </a>



