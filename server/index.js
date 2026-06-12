require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const videosRouter = require('./routes/videos');
const searchRouter = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

const allowedOrigins = isProd ? true : 'http://localhost:5173';
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use('/api/videos', videosRouter);
app.use('/api/search', searchRouter);

if (isProd) {
  const clientDist = path.join(__dirname, '../client/dist');
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`ViewTube server running on port ${PORT}${isProd ? ' (production)' : ''}`);
});
