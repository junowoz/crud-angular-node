
# Digiboard - Teste

## Instruções para rodar o App
- Acessar a pasta `digiboard-back`, instalar dependências com `npm install` e rodar servidor localmente com `node server.js`, o qual abrirá a porta 3000.
- Acessar a pasta  `digiboard-front`, instalar dependências com `npm install` e rodar o front-end localmente com `ng`.
- Digitar a senha: "1234" para acessar o sistema e poder realizar CRUDS.

---

## Front-End da Digiboard

- Angular 12
- Angular Material
- TailwindCSS
- Dependências: rxjs, tslib


## Back-end da Digiboard

A base de dados postgreSQL está armazenada online, no serviço de back-end FL0.com

- Node.js
- Prisma
- PostgreSQL
- Express
- Dependências: cors, jsonwebtoken, body-parser
  
### Comandos Opcionais
- Caso já tenha uma base de dados, simplesmente rodo `prisma db pull` para trasnformar minha base de dados num prisma schema.
- Se não tiver uma base de dados, rodo `prisma db push` para criar uma base de dados com base no prisma schema.
- Para criar um novo modelo, basta criar um novo arquivo na pasta `prisma/schema` e rodar `prisma generate` para gerar o prisma client.

