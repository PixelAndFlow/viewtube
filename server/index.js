require('dotenv').config();
const express = require('express');
const cors = require('cors');
const videosRouter = require('./routes/videos');
const searchRouter = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/videos', videosRouter);
app.use('/api/search', searchRouter);

app.listen(PORT, () => {
  console.log(`ViewTube server running on http://localhost:${PORT}`);
});
