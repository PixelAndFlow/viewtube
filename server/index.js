require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const videosRouter = require('./routes/videos');
const searchRouter = require('./routes/search');

const dbPath = path.join(__dirname, 'db/viewtube.db');
if (!fs.existsSync(dbPath)) {
  require('./db/seed');
}

const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';
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
