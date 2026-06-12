const Database = require('better-sqlite3');
const dbPath = require('./dbPath');

let db;

function getDb() {
  if (!db) db = new Database(dbPath);
  return db;
}

module.exports = { getDb, dbPath };
