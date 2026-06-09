CREATE TABLE IF NOT EXISTS videos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  channel_name TEXT NOT NULL,
  upload_date TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  video_url TEXT NOT NULL,
  view_count INTEGER NOT NULL,
  duration TEXT NOT NULL
);
