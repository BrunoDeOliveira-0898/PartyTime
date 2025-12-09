// Import necessary modules
const express = require("express"); // Importa o Express
const cors = require("cors"); // Importa o CORS
const app = express(); // Cria uma instância do Express

// Middleware configuration
app.use(cors()); // evita erros de CORS
app.use(express.json()); // permite receber JSON no body das requisições

// Database connection
const conn = require("./db/conn");
conn();

// Routes configuration
const routes = require("./routes/router");
app.use(express.static(path.join(__dirname, "../front/dist")));
app.use("/api", routes); // Configura o prefixo /api para as rotas

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/dist/index.html"));
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

// senha: Koshino%40765 - Koshino@765 - MongoDB
