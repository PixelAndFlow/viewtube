const path = require('path');

module.exports = process.env.DATABASE_PATH || (
  process.env.NODE_ENV === 'production'
    ? path.join('/tmp', 'viewtube.db')
    : path.join(__dirname, 'viewtube.db')
);
