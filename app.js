const express = require("express");
const app = express();
const {produtoRoutes} = require("./src/routes/produtoRoutes");
const clienteRoutes = require("./src/routes/clienteRoutes");
const PORT = 8090;

app.use(express.json());

app.use('/', produtoRoutes, clienteRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});