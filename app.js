const express = require("express");
const app = express();
const {} = require("./src/routes/produtoRoutes");
const PORT = 8090;

app.use(express.json());

app.use('/', produtoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});