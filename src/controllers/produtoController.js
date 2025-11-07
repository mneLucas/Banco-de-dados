const { produtoModel } = require("../models/produtoModel");

const produtoController = {
    /**
     * Controlador que lista todos os produtos do banco de dados.
     * 
     * @async
     * @function buscarTodos
     * @param {object} req Objeto da requisição (recebido do cliente HTTP) 
     * @param {object} res Objeto da resposta (enviado ao cliente HTTP)
     * @returns {Promise<void>} Retorna a resposta HTTP com a lista de produtos em formato JSON ou um erro.
     * @throws Envia uma resposta de erro HTTP 500 em caso de falha na busca.
     */
    listarProdutos: async (req, res) => {
        try {

            const produtos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao buscar produtos." });
        }
    },

    /**
     * Controlador que cria um novo produto no banco de dados.
     * 
     * @async
     * @function criarProduto
     * @param {object} req Objeto da requisição (recebido do cliente HTTP)
     * @param {object} res Objeto da resposta (enviado ao cliente HTTP) 
     * @returns {Promise<void>} Retorna uma mensagem de sucesso ou erro em formato JSON.
     * @throws {400} Se algum campo obrigatório não for preenchido corretamente.
     * @throws {500} Em caso de falha ao cadastrar o produto no banco de dados.
     * 
     * @example
     * POST /produtos
     * BODY:
     * {
     *   "nomeProduto": "Camiseta",
     *  "precoProduto": 49.90
     * }
     */

    criarProduto: async (req, res) => {
        try {

            const { nomeProduto, precoProduto } = req.body;

            if (nomeProduto == undefined || nomeProduto.trim() == null || precoProduto == undefined || isNaN(precoProduto)) {
                return res.status(400).json({ erro: "Campos obrigatórios não preenchidos." });
            }

            await produtoModel.inserirProduto(nomeProduto, precoProduto);

            return res.status(201).json({ message: "Produto cadastrado com sucesso." });

        } catch (error) {
            console.error("Erro ao criar produto:", error);
            res.status(500).json({ erro: "Erro ao cadastrar produto." });

        }
    }

}


module.exports = { produtoController };