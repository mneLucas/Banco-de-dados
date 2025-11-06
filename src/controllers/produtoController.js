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
    buscarTodos: async (req, res) => {
        try {

            const produtos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao buscar produtos." });
        }
    }


}


module.exports = { produtoController };