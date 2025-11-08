const express = require('express');
const router = express.Router();
const { clienteController } = require('../controllers/clienteController');

router.get('/cliente', clienteController.listarCliente);

router.post('/cliente', clienteController.criarCliente);

module.exports = {clienteRoutes: router};