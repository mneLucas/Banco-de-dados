const { sql, getConnection } = require("../config/db");

const produtoModel = {
    /**
     * Busca todos os produtos no banco de dados.
     * 
     * @async
     * @function buscarTodos
     * @returns {Promise<Array>} Retorna uma lista com todos os produtos.
     * @throws Monstar no console e propaga o erro caso a busca falhe.
     * 
     */
    buscarTodos: async () => {
        try {
            const pool = await getConnection();

            const querySQL = 'SELECT * FROM Produtos';
            const result = await pool.request()
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            throw error; //Reverberar o erro para a função que o chamar
        }
    },

    /**
     * Busca apenas um produto pelo seu ID no banco de dados.
     * 
     * @async
     * @function buscarUm
     * @param {string} idProduto ID do produto a ser buscado.
     * @returns {Promise<Object>} Retorna o produto correspondente ao ID fornecido.
     * @throws Mostrar no console e propaga o erro caso a busca falhe.
     */

    buscarUm: async (idProduto) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                SELECT * FROM Produtos
                WHERE idProduto = @idProduto
            `;

            const result = await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);

            return result.recordset;
            
        } catch (error) {
            console.error('Erro ao buscar o produto:', error);
            throw error;
            
        }

    },
    /**
     * Insere um novo produto no banco de dados.
     * 
     * @async
     * @function inserirProduto
     * @param {string} nomeProduto Nome do produto a ser cadastrado. 
     * @param {number} precoProduto Preço do produto a ser cadastrado.
     * @returns {Promise<void>} Não retorna nada, apenas executa a inserção.
     * @throws Mostrar no console e propaga o erro caso a inserção falhe. 
     */

    inserirProduto: async (nomeProduto, precoProduto) => {
        try {

            const pool = await getConnection();

            const querySQL = `
            INSERT INTO Produtos (nomeProduto, precoProduto)
            VALUES (@nomeProduto, @precoProduto)
            `

            await pool.request()
                .input('nomeProduto', sql.VarChar(100), nomeProduto)
                .input('precoProduto', sql.Decimal(10, 2), precoProduto)
                .query(querySQL);
        } catch (error) {
            console.error("Erro ao inserir produto:", error);
            throw error; 
        }
    },

        /**
     * atualiza um produto no banco de dados.
     * 
     * @async
     * @function atualizarProduto
     * @param {string} idProduto ID do produto a ser atualizado.
     * @param {string} nomeProduto Novo nome do produto a ser atualizado
     * @param {number} precoProduto Novo preço do produto a ser atualizado.
     * @returns {Promise<void>} Não retorna nada, apenas executa a atualização.
     * @throws Mostrar no console e propaga o erro caso a atualização falhe.
     */

    atualizarProduto: async (idProduto, nomeProduto, precoProduto) => {
        try {
            const pool = await getConnection();
            const querySQL = `
                UPDATE Produtos
                SET nomeProduto = @nomeProduto,
                    precoProduto = @precoProduto
                WHERE idProduto = @idProduto
            `;

            await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .input('nomeProduto', sql.VarChar(100), nomeProduto)
                .input('precoProduto', sql.Decimal(10, 2), precoProduto)
                .query(querySQL);
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            throw error;
        }
    },

    deletarProduto: async (idProduto) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                DELETE FROM Produtos
                WHERE idProduto = @idProduto
            `;

            await pool.request()
                .input('idProduto', sql.UniqueIdentifier, idProduto)
                .query(querySQL);
        } catch (error) {
            console.error("Erro ao deletar produto:", error);
            throw error;
            
        }
    }

    
}

module.exports = { produtoModel };