const sql = require('msnodesqlv8');

const connectionString = "server=MSI\\MSSQLPATSV;Database=lei_foodhubDb;Trusted_Connection=Yes;Encrypt=yes;TrustServerCertificate=yes;Driver={ODBC Driver 17 for SQL Server}";

function query(sqlQuery, callback) {
  sql.query(connectionString, sqlQuery, callback);
}

module.exports = { query };