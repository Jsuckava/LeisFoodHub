const express = require('express')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const session = require('express-session')
const db = require('./db')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}))

const publicDir = path.join(__dirname, 'public')
fs.readdirSync(publicDir).forEach(file => {
  if (file.endsWith('.html')) {
    const routePath = '/' + path.parse(file).name
    app.get(routePath, (req, res) => {
      res.sendFile(path.join(publicDir, file))
    })
    console.log(`Route created: ${routePath} → ${file}`)
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const query = 'SELECT * FROM LF_Users WHERE username = @username'

  try {
    const rows = await db.query(query, { username })
    if (rows.length === 0) return res.status(401).send('Invalid username or password')

    const match = await bcrypt.compare(password, rows[0].password)
    if (!match) return res.status(401).send('Invalid username or password')

    req.session.username = username
    res.redirect('/')
  } catch {
    res.status(500).send('Database error')
  }
})

app.post('/signup', async (req, res) => {
  const { username, email, password, 'confirm-password': confirmPassword } = req.body
  if (password !== confirmPassword) return res.status(400).send('Passwords do not match')

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const query = 'INSERT INTO LF_Users (username, email, password) VALUES (@username, @email, @password)'

    await db.query(query, { username, email, password: hashedPassword })

    res.redirect('/acc')
  } catch {
    res.status(500).send('Signup failed')
  }
})

app.get('/', (req, res) => {
  if (!req.session.username) return res.redirect('/acc')
  res.sendFile(path.join(publicDir, 'index.html'))
})

app.get('/get-username', (req, res) => {
  res.json({ username: req.session.username || null })
})

app.listen(8000, () => {
  console.log('Server running on http://localhost:8000')
})
