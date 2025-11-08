const { clienteModel } = require("../models/clienteModel");

const clienteController = {
    /**
     * Controlador que lista todos os clientes do banco de dados.
     * 
     * @async
     * @function buscarTodos
     * @param {object} req Cliente da requisição (recebido do cliente HTTP) 
     * @param {object} res Cliente da resposta (enviado ao cliente HTTP)
     * @returns {Promise<void>} Retorna a resposta HTTP com a lista de clientes em formato JSON ou um erro.
     * @throws Envia uma resposta de erro HTTP 500 em caso de falha na busca.
     */
    listarCliente: async (req, res) => {
        try {
            const {idCliente} = req.query

            if (idCliente) {
                if (idCliente.length != 36) {
                    return res.status(400).json({ erro: "ID do cliente inválido." });
                }

                const cliente = await clienteModel.buscarUm(idCliente);

                return res.status(200).json(cliente);
            }
            const clientes = await clienteModel.buscarTodos();

            res.status(200).json(clientes);
            
        } catch (error) {
            console.error("Erro ao listar clientes:", error);
            res.status(500).json({ erro: "Erro ao buscar clientes." });
        }
    },

    /**
     * Controlador que cria um novo cliente no banco de dados.
     * 
     * @async
     * @function criarCliente
     * @param {object} req Objeto da requisição (recebido do cliente HTTP)
     * @param {object} res Objeto da resposta (enviado ao cliente HTTP) 
     * @returns {Promise<void>} Retorna uma mensagem de sucesso ou erro em formato JSON.
     * @throws {400} Se algum campo obrigatório não for preenchido corretamente.
     * @throws {500} Em caso de falha ao cadastrar o cliente no banco de dados.
     * 
     * @example
     * POST /clientes
     * BODY:
     * {
     *   "nomeCliente": "Alfredo",
     *  "cpfCliente": 12345678901
     * }
     */

    criarCliente: async (req, res) => {
        try {

            const { nomeCliente, cpfCliente } = req.body;

            if (nomeCliente == undefined || cpfCliente == undefined || isNaN(cpfCliente)) {
                return res.status(400).json({ erro: "Campos obrigatórios não preenchidos." });
            }

            await clienteModel.inserirCliente(nomeCliente, cpfCliente);

            return res.status(201).json({ message: "Cliente cadastrado com sucesso." });

        } catch (error) {
            console.error("Erro ao criar cliente:", error);
            res.status(500).json({ erro: "Erro ao cadastrar cliente." });

        }
    }

}


module.exports = { clienteController };