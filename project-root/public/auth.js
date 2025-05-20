const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db')
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both email and password' });
  }

  const query = `SELECT * FROM LF_Users WHERE email = '${email}'`;

  db.query(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err });
    }

    if (rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = rows[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Error comparing passwords', details: err });
      }

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username
        }
      });
    });
  });
});

module.exports = router;
