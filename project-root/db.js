
const sql = require('mssql')

const config = {
  user: 'Leifoodhub',
  password: 'leiallen12345',
  server: 'localhost',
  database: 'lei_foodhubDb',
  port: 8080,
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
