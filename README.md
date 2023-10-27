# Angular/Node CRUD (Dashboard de Colaboradores)

## Instruções para Executar o App

1. Acesse a pasta `node-back`, instale as dependências com `npm install` e execute o servidor localmente com `node server.js`. Isso abrirá a porta 3000.
2. Acesse a pasta `angular-front`, instale as dependências com `npm install` e execute o front-end localmente com `ng serve`. Após isso, acesse a porta <http://localhost:4200/>.
3. Digite a senha: "1234" para acessar o sistema.

## Checks

- [x] Colaboradores podem ser listados por setor e cargo, no select.
- [x] Colaboradores podem ser adicionados, deletados e editados.
- [x] Token de sessão expira em 30 minutos.
- [x] Diagrama de entidade-relacionamento disponível ao final deste README.
- [x] Front-end em Angular, back-end com Express e banco de dados PostgreSQL (ORM Prisma).

---

## Front-End

- Angular
- Angular Material
- TailwindCSS
- npm

## Back-End

A base de dados PostgreSQL está armazenada online, no serviço de back-end FL0 (https://app.fl0.com/junowoz/digiboard-back/dev/digiboard).

- Node.js
- ORM Prisma
- PostgreSQL
- Express
- Dependências: cors, jsonwebtoken
- npm
