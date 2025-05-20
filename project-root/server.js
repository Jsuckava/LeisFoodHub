const express = require('express');
const sql = require('msnodesqlv8');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const app = express();

const connectionString = "server=MSI\\MSSQLPATSV;Database=lei_foodhubDb;Trusted_Connection=Yes;Encrypt=yes;TrustServerCertificate=yes;Driver={ODBC Driver 17 for SQL Server}";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
}));

const publicDir = path.join(__dirname, 'public');
fs.readdirSync(publicDir).forEach(file => {
  if (file.endsWith('.html')) {
    const routePath = '/' + path.parse(file).name;
    app.get(routePath, (req, res) => {
      res.sendFile(path.join(publicDir, file));
    });
    console.log(`Route created: ${routePath} → ${file}`);
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM LF_Users WHERE username = ?`;

  sql.query(connectionString, query, [username], (err, rows) => {
    if (err) return res.status(500).send('Database error');
    if (rows.length === 0) return res.status(401).send('Invalid username or password');

    bcrypt.compare(password, rows[0].password, (err, result) => {
      if (err) return res.status(500).send('Password check failed');
      if (!result) return res.status(401).send('Invalid username or password');

      req.session.username = username; 
      res.redirect('/');
    });
  });
});

app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (req.body.password !== req.body['confirm-password']) {
    return res.status(400).send("Passwords do not match.");
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Password hashing failed');

    const query = `INSERT INTO LF_Users (username, email, password) VALUES (?, ?, ?)`;

    sql.query(connectionString, query, [username, email, hashedPassword], (err) => {
      if (err) return res.status(500).send('Signup failed');
      res.redirect('/acc');
    });
  });
});

app.get('/', (req, res) => {
  if (!req.session.username) {
    return res.redirect('/acc'); 
  }

  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/get-username', (req, res) => {
  if (req.session.username) {
    res.json({ username: req.session.username });
  } else {
    res.json({ username: null });
  }
});

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
