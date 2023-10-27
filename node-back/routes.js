//routes.js
// declara express, prisma e jsonwebtoken
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

// Inicializa o prisma client
const prisma = new PrismaClient();
const router = express.Router();

//chama o JWT_SECRET que criei
const JWT_SECRET = process.env.JWT_SECRET;

//MIDDLEWARE:
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization; // Get the Authorization header from the request headers
  if (authHeader) {
    // Check if the Authorization header is present
    const token = authHeader.split(" ")[1]; // Extract the token from the header value
    jwt.verify(token, JWT_SECRET, (err) => {
      // Verify the token using the jwt.verify method
      if (err) {
        // If the verification fails
        console.log("Token verification failed:", err); // Log an error message to the console
        return res.sendStatus(403); // Send a 403 Forbidden status code to the client
      }
      next(); // Call the next middleware function in the request-response cycle
    });
  } else {
    // If the Authorization header is not present
    console.log("No token provided"); // Log a message to the console
    res.sendStatus(401); // Send a 401 Unauthorized status code to the client
  }
}

// Criar um novo colaborador
router.post("/colaboradores", authenticateJWT, async (req, res) => {
  const { cpf, nome, cargo, setor } = req.body;
  try {
    const novoColaborador = await prisma.colaborador.create({
      data: {
        cpf,
        nome,
        cargo,
        setor,
      },
    });
    res.json(novoColaborador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos os colaboradores
router.get("/colaboradores", authenticateJWT, async (req, res) => {
  try {
    const colaboradores = await prisma.colaborador.findMany();
    res.json(colaboradores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar colaboradores por setor
router.get("/colaboradores/setor/:setor", authenticateJWT, async (req, res) => {
  try {
    const colaboradores = await prisma.colaborador.findMany({
      where: { setor: req.params.setor },
    });
    res.json(colaboradores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Listar colaboradores por cargo
router.get("/colaboradores/cargo/:cargo", authenticateJWT, async (req, res) => {
  try {
    const colaboradores = await prisma.colaborador.findMany({
      where: { cargo: req.params.cargo },
    });
    res.json(colaboradores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Editar informações de um colaborador
router.put("/colaboradores/:id", authenticateJWT, async (req, res) => {
  try {
    const colaborador = await prisma.colaborador.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(colaborador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deletar um colaborador
router.delete("/colaboradores/:id", authenticateJWT, async (req, res) => {
  try {
    const colaborador = await prisma.colaborador.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json(colaborador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//AUTH
// Autenticação fictícia (apenas para fins de demonstração)
// O usuário envia a senha e recebe um token
router.post("/login", async (req, res) => {
  const { senha } = req.body;

  // Para fins de demonstração, vamos assumir que qualquer usuário com a senha "1234" pode se autenticar
  if (senha === "1234") {
    // Gerar um token com duração de 30 minutos
    const token = jwt.sign({}, JWT_SECRET, { expiresIn: "30m" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Senha errada" });
  }
});

// Renovar token
router.get("/renew", authenticateJWT, (req, res) => {
  // O token é enviado no header da requisição
  const token = req.headers.authorization.split(" ")[1];
  try {
    // Verificar se o token é válido
    jwt.verify(token, JWT_SECRET);
    // Gerar um novo token com duração de 30 minutos
    const newToken = jwt.sign({}, JWT_SECRET, {
      expiresIn: "30m",
    });
    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ error: "Token invalida, ou expirou" });
  }
});

module.exports = router;
