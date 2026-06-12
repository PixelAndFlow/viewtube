const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../db/viewtube.db');
const db = new Database(DB_PATH);

router.get('/', (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json([]);
    const term = `%${q}%`;
    const videos = db
      .prepare('SELECT * FROM videos WHERE title LIKE ? OR channel_name LIKE ? ORDER BY view_count DESC')
      .all(term, term);
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
