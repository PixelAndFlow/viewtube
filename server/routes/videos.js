const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../db/viewtube.db');
const db = new Database(DB_PATH);

router.get('/', (req, res) => {
  try {
    const videos = db.prepare('SELECT * FROM videos ORDER BY upload_date DESC').all();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const video = db.prepare('SELECT * FROM videos WHERE id = ?').get(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
