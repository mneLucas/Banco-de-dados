const sql = require('mssql');

const config = {
    user: "sa",
    password: "123456789",
    server: "localhost",
    database: "LojaEspricio",
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};
/**
 * Cria e retorna uma conexão com o banco de dados SQL Server
 * 
 * @async
 * @function getConnection
 * @returns (Promise<sql.ConnectionPool>} Retorna o objeto de conexão (pool) com o banco de dados SQL Server
 * @throws  Lança um erro se a conexão falhar)
 */
async function getConnection() {
    try {
        const pool = await sql.connect(config);
        return pool;
    } catch (error) {
        console.error("Erro na conexão SQL Server", error);
    }
};

// (async () => {
//     const pool = await getConnection();

//     const result = await pool.request().query('SELECT * FROM Produtos');
//     console.log(result.recordset);
    
// })()

module.exports = {sql, getConnection};