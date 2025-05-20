require('dotenv').config()
const sql = require('mssql')

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    instanceName: process.env.DB_INSTANCE,
    encrypt: true,
    trustServerCertificate: true
  }
}

const poolPromise = sql.connect(config)

async function query(sqlQuery, params = {}) {
  const pool = await poolPromise
  const request = pool.request()
  for (const param in params) {
    request.input(param, params[param])
  }
  const result = await request.query(sqlQuery)
  return result.recordset
}

module.exports = { query }
