const sql = require('mssql')

const config = {
  user: 'Leifoodhub',
  password: 'leiallen12345',
  server: 'MSI',
  database: 'lei_foodhubDb',
  options: {
    instanceName: 'MSSQLPATSV',
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
