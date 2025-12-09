const router = require("express").Router();

//Rotas de Services
const serviceRouter = require("./services");

//Configuração das rotas
router.use("/", serviceRouter);

//Rotas de Parties
const partyRouter = require("./parties");
router.use("/", partyRouter);

module.exports = router;
