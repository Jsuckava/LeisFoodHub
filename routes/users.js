const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM LF_Users', (err, rows) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });
    res.json(rows);
  });
});

module.exports = router;
// Compare this snippet from server.js:
// const express = require('express');  