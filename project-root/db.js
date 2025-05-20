const sql = require('mssql')

const config = {
  connectionString: process.env.MSSQL_URL,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
}

async function query(sqlQuery, params = {}) {
  const pool = await sql.connect(config)
  const request = pool.request()
  for (const param in params) {
    request.input(param, params[param])
  }
  const result = await request.query(sqlQuery)
  return result.recordset
}

module.exports = { query }
