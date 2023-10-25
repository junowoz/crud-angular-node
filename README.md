# Digiboard - Teste

## Instruções para rodar o App

1. Acessar a pasta `digiboard-back`, instalar dependências com `npm install` e rodar servidor localmente com `node server.js`, o qual abrirá a porta 3000.
2. Acessar a pasta `digiboard-front`, instalar dependências com `npm install` e rodar o front-end localmente com `ng serve`, para depois acessar a porta <http://localhost:4200/>.
3. Digitar a senha: "1234" para acessar ao sistema e poder realizar CRUDs.

---

## Front-End da Digiboard

- Angular
- Angular Material
- TailwindCSS
- npm

## Back-end da Digiboard

A base de dados postgreSQL está armazenada online, no serviço de back-end FL0 (https://app.fl0.com/junowoz/digiboard-back/dev/digiboard)

- Node.js
- Prisma
- PostgreSQL
- Express
- Dependências: cors, jsonwebtoken
- npm

---

## Diagrama Entidade-Relacionamento

Apenas há uma tabela, então é algo simples. Diagrama realizado com [dbdiagram](https://dbdiagram.io).

![Entidade](./entidade.png)
