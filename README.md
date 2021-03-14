<h1 align="center">
  <img style="background-color: #312e38; border-radius: 10px;" alt="smartmei-logo" src="https://media.glassdoor.com/sqll/1728220/ioasys-squarelogo-1586796589831.png" />
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

Você deverá criar uma API que o site IMDb irá consultar para exibir seu conteúdo, sua API deve conter as seguintes features:

- **Features** 
  - Usuário ✅
    - Permissões: Admin e User
    - Cadastro
    - Edição
    - Exclusão lógica (Desativação)

  - Filmes ✅

    - Cadastro (Somente um usuário administrador poderá realizar esse cadastro)
    - Voto (A contagem dos votos será feita por usuário de 0-4 que indica quanto o usuário gostou do filme)
    - Listagem (deverá ter filtro por diretor, nome, gênero e/ou atores)
    - Detalhe do filme trazendo todas as informações sobre o filme, inclusive a média dos votos


## 💻 Tecnologias 

  - <img width="20px" src="https://img.icons8.com/color/2x/nodejs.png" /> [NodeJS](https://nodejs.org/en/ "NodeJS")
  - <img width="20px" src="https://img.icons8.com/color/2x/typescript.png" /> [TypeScript](https://www.typescriptlang.org/ "TypeScript")
  - <img width="20px" src="https://res.cloudinary.com/practicaldev/image/fetch/s--00h6CjGb--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://www.maxrooted.com/panduan-membangun-rest-api-expressjs-mysql/cover.png" /> [Express](https://expressjs.com/ "Express")
  - <img width="20px" src="https://img.icons8.com/color/2x/postgreesql.png" /> [PostgreSQL](https://www.postgresql.org/ "PostgreSQL")
  - <img width="20px" src="https://avatars2.githubusercontent.com/u/20165699?s=400&v=4" /> [TypeORM](https://typeorm.io/#/ "TypeORM")
  - <img width="20px" src="https://simpleicons.org/icons/jest.svg" /> [Jest](https://jestjs.io/ 'Jest')
  - <img width="20px" src="https://img.icons8.com/dusk/2x/docker.png" /> [Docker](https://www.docker.com/ 'Docker')
 
## ▶️ Getting Started 

 - **Passo 1️⃣** : git clone do projeto [ioasys](https://github.com/rafaelsanzio/ioasys "ioasys")
 - **Passo 2️⃣** : executar a instalação do [Node](https://nodejs.org/en/ 'Node') e [Docker](https://www.docker.com/ "Docker")

 - **Passo 3️⃣** : rodando a aplicação executando os seguintes comandos:
  ```bash
   # Navegando até a pasta do projeto
   $ cd ioasys

   # Instalando todas as depêndencias necessárias
   $ npm install ou yarn install

   # Criando container para o banco de dados PostgreSQL usando o docker
   $ docker run --name ioasys -e POSTGRES_PASSWORD=ioasys -p 5432:5432 -d postgres

   # Iniciando o banco de dados
   $ docker start ioasys
   
   # Após a criação do container do banco de dados criar a database: filmes

   # Criando tabelas no banco de dados a partir de migrations
   $ yarn typeorm migration:run

   # Starting o backend da aplicação
   $ npm dev:server ou yarn dev:server

   # Rodando os testes
   $ npm test ou yarn test
```


#### ⚠️ Rotas .
  - O arquivo ioasys-insonmia.json na aplicação contém as rotas feitas para melhor visualização, basta importar no [Insomnia](https://insomnia.rest/download/ "Insomnia") e as rotas estaram visíveis.

## ㊗️ Considerações 
- Projeto desenvolvido by:

  - <a href="https://github.com/rafaelsanzio">
    <img src="https://img.shields.io/badge/-Rafael%20Sanzio-000000?style=flat&logo=GitHub&logoColor=#000000" />
  </a>

  - <a href="https://www.linkedin.com/in/rafael-sanzio-012778143/">
    <img src="https://img.shields.io/badge/-Rafael%20Sanzio-0077B5?style=flat&logo=LinkedIN&logoColor=#000000" />
  </a>



