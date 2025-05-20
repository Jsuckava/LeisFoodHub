const sql = require('mssql')

const config = {
  user: 'Leifoodhub',
  password: 'leiallen12345',
  server: 'localhost',
  database: 'lei_foodhubDb',
  options: {
    instanceName: 'MSSQLPATSV',
    encrypt: true,
    trustServerCertificate: true
  }
}

async function query(sqlQuery, params = {}) {
  try {
    const pool = await sql.connect(config)
    const request = pool.request()

    for (const param in params) {
      request.input(param, params[param])
    }

    const result = await request.query(sqlQuery)
    return result.recordset
  } catch (err) {
    console.error("Database Query Error:", err.message)
    throw err
  }
}

module.exports = { query }
