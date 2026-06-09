const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'viewtube.db'));

db.exec(`
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
`);

db.exec('DELETE FROM videos;');
db.exec("DELETE FROM sqlite_sequence WHERE name='videos';");

const rawVideos = [
  // VEVO Music
  { title: 'Never Gonna Give You Up', channel_name: 'VEVO Music', upload_date: '2026-01-15', video_url: 'dQw4w9WgXcQ', view_count: 1340000000, duration: '3:33' },
  { title: 'Despacito', channel_name: 'VEVO Music', upload_date: '2026-01-28', video_url: 'kJQP7kiw5Fk', view_count: 8200000000, duration: '4:42' },
  { title: 'Shape of You', channel_name: 'VEVO Music', upload_date: '2026-02-03', video_url: 'JGwWNGJdvx8', view_count: 6100000000, duration: '4:24' },
  { title: 'See You Again', channel_name: 'VEVO Music', upload_date: '2026-02-14', video_url: 'RgKAFK5djSk', view_count: 5900000000, duration: '3:49' },
  { title: 'Uptown Funk', channel_name: 'VEVO Music', upload_date: '2026-02-22', video_url: 'OPf0YbXqDm0', view_count: 5000000000, duration: '4:30' },
  { title: 'Gangnam Style', channel_name: 'VEVO Music', upload_date: '2026-03-05', video_url: '9bZkp7q19f0', view_count: 4900000000, duration: '4:13' },
  { title: 'Hello', channel_name: 'VEVO Music', upload_date: '2026-03-18', video_url: 'YQHsXMglC9A', view_count: 3200000000, duration: '6:07' },
  { title: 'Counting Stars', channel_name: 'VEVO Music', upload_date: '2026-04-01', video_url: 'hT_nvWreIhg', view_count: 3600000000, duration: '4:17' },
  { title: 'Shake It Off', channel_name: 'VEVO Music', upload_date: '2026-04-15', video_url: 'nfWlot6h_JM', view_count: 3500000000, duration: '3:39' },

  // Retro Hits
  { title: 'Bohemian Rhapsody', channel_name: 'Retro Hits', upload_date: '2026-01-20', video_url: 'fJ9rUzIMcZQ', view_count: 1800000000, duration: '5:55' },
  { title: 'Take On Me', channel_name: 'Retro Hits', upload_date: '2026-02-05', video_url: 'djV11Xbc914', view_count: 1200000000, duration: '3:46' },
  { title: 'Africa', channel_name: 'Retro Hits', upload_date: '2026-02-20', video_url: 'FTQbiNvZqaY', view_count: 730000000, duration: '4:55' },
  { title: 'Billie Jean', channel_name: 'Retro Hits', upload_date: '2026-03-10', video_url: 'Zi_XLOBDo_Y', view_count: 1050000000, duration: '4:54' },
  { title: 'Thriller', channel_name: 'Retro Hits', upload_date: '2026-03-25', video_url: 'sOnqjkJTMaA', view_count: 890000000, duration: '13:42' },
  { title: "Sweet Child O' Mine", channel_name: 'Retro Hits', upload_date: '2026-04-10', video_url: '1w7OgIMMRc4', view_count: 2200000000, duration: '5:56' },
  { title: 'Hotel California', channel_name: 'Retro Hits', upload_date: '2026-04-25', video_url: 'BciS5krYL80', view_count: 870000000, duration: '6:30' },
  { title: "Don't Stop Me Now", channel_name: 'Retro Hits', upload_date: '2026-05-08', video_url: 'HgzGwKwLmgM', view_count: 540000000, duration: '3:29' },

  // Pop Legends
  { title: 'Rolling in the Deep', channel_name: 'Pop Legends', upload_date: '2026-01-18', video_url: 'rYEDA3JcQqw', view_count: 2300000000, duration: '3:49' },
  { title: 'Someone Like You', channel_name: 'Pop Legends', upload_date: '2026-02-08', video_url: 'hLQl3WQQoQ0', view_count: 1600000000, duration: '4:45' },
  { title: 'Royals', channel_name: 'Pop Legends', upload_date: '2026-02-25', video_url: 'nlcIKh6sBtc', view_count: 960000000, duration: '3:10' },
  { title: 'Roar', channel_name: 'Pop Legends', upload_date: '2026-03-12', video_url: 'CevxZvSJLk8', view_count: 3800000000, duration: '4:32' },
  { title: 'Blank Space', channel_name: 'Pop Legends', upload_date: '2026-03-28', video_url: 'e-ORhEE9VVg', view_count: 3400000000, duration: '6:02' },
  { title: 'Sorry', channel_name: 'Pop Legends', upload_date: '2026-04-12', video_url: 'fRh_vgS2dFE', view_count: 3900000000, duration: '3:21' },
  { title: 'Happy', channel_name: 'Pop Legends', upload_date: '2026-04-28', video_url: 'y6Sxv-sUYtM', view_count: 1500000000, duration: '3:53' },
  { title: 'What Makes You Beautiful', channel_name: 'Pop Legends', upload_date: '2026-05-15', video_url: 'QJO3ROT-A4E', view_count: 1400000000, duration: '3:20' },
  { title: 'Stay With Me', channel_name: 'Pop Legends', upload_date: '2026-05-28', video_url: 'pB-5XG-DbAA', view_count: 1300000000, duration: '2:52' },

  // Rock Classics
  { title: 'Believer', channel_name: 'Rock Classics', upload_date: '2026-01-22', video_url: '7PCkvCPvDXk', view_count: 1700000000, duration: '3:24' },
  { title: 'Radioactive', channel_name: 'Rock Classics', upload_date: '2026-02-10', video_url: 'K_6IyVb_ENM', view_count: 1500000000, duration: '3:06' },
  { title: 'Thunder', channel_name: 'Rock Classics', upload_date: '2026-02-28', video_url: 'ktvTqknDobU', view_count: 1200000000, duration: '3:08' },
  { title: 'Stressed Out', channel_name: 'Rock Classics', upload_date: '2026-03-15', video_url: 'pXRviuL6vMY', view_count: 1100000000, duration: '3:22' },
  { title: 'Heathens', channel_name: 'Rock Classics', upload_date: '2026-03-30', video_url: 'UprcpdwuwCg', view_count: 980000000, duration: '3:45' },
  { title: 'Paradise', channel_name: 'Rock Classics', upload_date: '2026-04-18', video_url: '1G4isv_Fylg', view_count: 1150000000, duration: '4:39' },
  { title: 'Yellow', channel_name: 'Rock Classics', upload_date: '2026-05-02', video_url: 'yKNxeF4KMsY', view_count: 870000000, duration: '4:29' },
  { title: 'Fix You', channel_name: 'Rock Classics', upload_date: '2026-05-18', video_url: 'k4V3Mo61fJM', view_count: 950000000, duration: '4:55' },

  // Urban Beats
  { title: 'Without Me', channel_name: 'Urban Beats', upload_date: '2026-01-25', video_url: 'YVkUvmDQ3HY', view_count: 1800000000, duration: '4:51' },
  { title: 'Faded', channel_name: 'Urban Beats', upload_date: '2026-02-12', video_url: '60ItHLz5WEA', view_count: 3800000000, duration: '3:33' },
  { title: 'Alone', channel_name: 'Urban Beats', upload_date: '2026-03-02', video_url: '1-xGerv5FOk', view_count: 1900000000, duration: '2:42' },
  { title: 'Closer', channel_name: 'Urban Beats', upload_date: '2026-03-20', video_url: 'TUmyygCMMGA', view_count: 3000000000, duration: '4:05' },
  { title: 'Sugar', channel_name: 'Urban Beats', upload_date: '2026-04-05', video_url: '09R8_2nJtjg', view_count: 3100000000, duration: '3:56' },
  { title: 'Girls Like You', channel_name: 'Urban Beats', upload_date: '2026-04-22', video_url: 'aJOTlE1K90k', view_count: 2700000000, duration: '4:04' },
  { title: 'High Hopes', channel_name: 'Urban Beats', upload_date: '2026-05-10', video_url: 'IPXIgEAGe4U', view_count: 890000000, duration: '3:11' },
  { title: 'Centuries', channel_name: 'Urban Beats', upload_date: '2026-05-25', video_url: 'LBr7kECsjcQ', view_count: 1200000000, duration: '3:47' },
  { title: 'Lose Yourself', channel_name: 'Urban Beats', upload_date: '2026-06-01', video_url: '_Yhyp-_hX2s', view_count: 1500000000, duration: '5:26' },
  { title: 'Sunflower', channel_name: 'Urban Beats', upload_date: '2026-06-05', video_url: 'ApXoWvfEYVU', view_count: 2400000000, duration: '2:38' },
];

const videos = rawVideos.map(v => ({
  ...v,
  thumbnail_url: `https://img.youtube.com/vi/${v.video_url}/hqdefault.jpg`,
}));

const insert = db.prepare(`
  INSERT INTO videos (title, channel_name, upload_date, thumbnail_url, video_url, view_count, duration)
  VALUES (@title, @channel_name, @upload_date, @thumbnail_url, @video_url, @view_count, @duration)
`);

const insertAll = db.transaction((rows) => {
  for (const row of rows) insert.run(row);
});

insertAll(videos);

console.log(`Seeded ${videos.length} videos across 5 channels.`);
db.close();
