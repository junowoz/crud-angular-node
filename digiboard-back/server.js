// server.js

//Importando express, body-parser e cors
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

//Criando uma instância do express na porta 3000
const app = express();
const PORT = 3000;

//Configurando o CORS para permitir requisições de outros domínios
app.use(
  cors({
    origin: "http://localhost:4200", // Permitir apenas este domínio
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Permitir apenas estes métodos
    credentials: true, // Permitir cookies
  })
);

//bodyParse serve para converter o corpo da requisição para o formato JSON
app.use(bodyParser.json());
app.use(routes);

//Iniciando o servidor na porta 3000
app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}`);
});
