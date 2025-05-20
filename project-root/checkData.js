const sql = require('msnodesqlv8');
const connectionString = "server=MSI\\MSSQLPATSV;Database=lei_foodhubDb;Trusted_Connection=Yes;Encrypt=yes;TrustServerCertificate=yes;Driver={ODBC Driver 17 for SQL Server}";

const query = 'SELECT * FROM LF_Users';

sql.query(connectionString, query, (err, rows) => {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Users:', rows);
  }
});
