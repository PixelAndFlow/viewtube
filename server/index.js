require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const { dbPath } = require('./db/database');

function ensureDatabase() {
  if (isProd) {
    require('./db/seed');
    return;
  }
  if (!fs.existsSync(dbPath)) {
    require('./db/seed');
    return;
  }
  try {
    const Database = require('better-sqlite3');
    const db = new Database(dbPath);
    const table = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='videos'").get();
    db.close();
    if (!table) require('./db/seed');
  } catch {
    require('./db/seed');
  }
}

const isProd = process.env.NODE_ENV === 'production';
ensureDatabase();

const videosRouter = require('./routes/videos');
const searchRouter = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 3001;
const clientDist = path.join(__dirname, '../client/dist');

app.use(cors({
  origin: isProd
    ? process.env.CLIENT_URL || true
    : 'http://localhost:5173',
}));
app.use(express.json());

app.use('/api/videos', videosRouter);
app.use('/api/search', searchRouter);

if (isProd && fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.use((req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`ViewTube server running on port ${PORT}${isProd ? ' (production)' : ''}`);
});
