// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:4200", // Permitir apenas este domínio
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Permitir apenas estes métodos
    credentials: true, // Permitir cookies
  })
);

app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
