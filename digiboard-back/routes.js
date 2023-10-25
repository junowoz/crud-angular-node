//routes.js
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

//MIDDLEWARE
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err) => {
      if (err) {
        console.log("Token verification failed:", err);
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    console.log("No token provided");
    res.sendStatus(401);
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
router.post("/login", async (req, res) => {
  const { senha } = req.body;

  // Aqui, você pode verificar o nome de usuário e a senha em uma base de dados real
  // Para fins de demonstração, vamos assumir que qualquer usuário com a senha "senha" pode se autenticar
  if (senha === "senha") {
    const token = jwt.sign({}, JWT_SECRET, { expiresIn: "30m" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Senha errada" });
  }
});

// Renovar token
router.get("/renew", authenticateJWT, (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    jwt.verify(token, JWT_SECRET);
    const newToken = jwt.sign({}, JWT_SECRET, {
      expiresIn: "30m",
    });
    res.json({ token: newToken });
  } catch (error) {
    res.status(401).json({ error: "Token invalida, ou expirou" });
  }
});

module.exports = router;
