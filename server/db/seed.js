const Database = require('better-sqlite3');
const dbPath = require('./dbPath');

const db = new Database(dbPath);

db.exec('DROP TABLE IF EXISTS videos;');

db.exec(`
  CREATE TABLE videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    channel_name TEXT NOT NULL,
    category TEXT NOT NULL,
    upload_date TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    video_url TEXT NOT NULL,
    view_count INTEGER NOT NULL,
    duration TEXT NOT NULL
  );
`);

const CHANNEL_CATEGORY = {
  'VEVO Music': 'Music',
  'Retro Hits': 'Music',
  'Pop Legends': 'Music',
  'Rock Classics': 'Music',
  'Urban Beats': 'Music',
  'Sports Central': 'Sports',
  'TED Talks': 'Education',
  'Learn Academy': 'Education',
  'Science & Space': 'News',
  'Tech Today': 'Gaming',
  'World Kitchen': 'Education',
};

const rawVideos = [
  // ── VEVO Music ───────────────────────────────────────────────
  { title: 'Never Gonna Give You Up', channel_name: 'VEVO Music', upload_date: '2026-01-15', video_url: 'dQw4w9WgXcQ', view_count: 1340000000, duration: '3:33' },
  { title: 'Despacito', channel_name: 'VEVO Music', upload_date: '2026-01-28', video_url: 'kJQP7kiw5Fk', view_count: 8200000000, duration: '4:42' },
  { title: 'Shape of You', channel_name: 'VEVO Music', upload_date: '2026-02-03', video_url: 'JGwWNGJdvx8', view_count: 6100000000, duration: '4:24' },
  { title: 'See You Again', channel_name: 'VEVO Music', upload_date: '2026-02-14', video_url: 'RgKAFK5djSk', view_count: 5900000000, duration: '3:49' },
  { title: 'Uptown Funk', channel_name: 'VEVO Music', upload_date: '2026-02-22', video_url: 'OPf0YbXqDm0', view_count: 5000000000, duration: '4:30' },
  { title: 'Gangnam Style', channel_name: 'VEVO Music', upload_date: '2026-03-05', video_url: '9bZkp7q19f0', view_count: 4900000000, duration: '4:13' },
  { title: 'Hello', channel_name: 'VEVO Music', upload_date: '2026-03-18', video_url: 'YQHsXMglC9A', view_count: 3200000000, duration: '6:07' },
  { title: 'Counting Stars', channel_name: 'VEVO Music', upload_date: '2026-04-01', video_url: 'hT_nvWreIhg', view_count: 3600000000, duration: '4:17' },
  { title: 'Shake It Off', channel_name: 'VEVO Music', upload_date: '2026-04-15', video_url: 'nfWlot6h_JM', view_count: 3500000000, duration: '3:39' },

  // ── Retro Hits ───────────────────────────────────────────────
  { title: 'Bohemian Rhapsody', channel_name: 'Retro Hits', upload_date: '2026-01-20', video_url: 'fJ9rUzIMcZQ', view_count: 1800000000, duration: '5:55' },
  { title: 'Take On Me', channel_name: 'Retro Hits', upload_date: '2026-02-05', video_url: 'djV11Xbc914', view_count: 1200000000, duration: '3:46' },
  { title: 'Africa', channel_name: 'Retro Hits', upload_date: '2026-02-20', video_url: 'FTQbiNvZqaY', view_count: 730000000, duration: '4:55' },
  { title: 'Billie Jean', channel_name: 'Retro Hits', upload_date: '2026-03-10', video_url: 'Zi_XLOBDo_Y', view_count: 1050000000, duration: '4:54' },
  { title: 'Thriller', channel_name: 'Retro Hits', upload_date: '2026-03-25', video_url: 'sOnqjkJTMaA', view_count: 890000000, duration: '13:42' },
  { title: "Sweet Child O' Mine", channel_name: 'Retro Hits', upload_date: '2026-04-10', video_url: '1w7OgIMMRc4', view_count: 2200000000, duration: '5:56' },
  { title: 'Hotel California', channel_name: 'Retro Hits', upload_date: '2026-04-25', video_url: 'BciS5krYL80', view_count: 870000000, duration: '6:30' },
  { title: "Don't Stop Me Now", channel_name: 'Retro Hits', upload_date: '2026-05-08', video_url: 'HgzGwKwLmgM', view_count: 540000000, duration: '3:29' },

  // ── Pop Legends ──────────────────────────────────────────────
  { title: 'Rolling in the Deep', channel_name: 'Pop Legends', upload_date: '2026-01-18', video_url: 'rYEDA3JcQqw', view_count: 2300000000, duration: '3:49' },
  { title: 'Someone Like You', channel_name: 'Pop Legends', upload_date: '2026-02-08', video_url: 'hLQl3WQQoQ0', view_count: 1600000000, duration: '4:45' },
  { title: 'Royals', channel_name: 'Pop Legends', upload_date: '2026-02-25', video_url: 'nlcIKh6sBtc', view_count: 960000000, duration: '3:10' },
  { title: 'Roar', channel_name: 'Pop Legends', upload_date: '2026-03-12', video_url: 'CevxZvSJLk8', view_count: 3800000000, duration: '4:32' },
  { title: 'Blank Space', channel_name: 'Pop Legends', upload_date: '2026-03-28', video_url: 'e-ORhEE9VVg', view_count: 3400000000, duration: '6:02' },
  { title: 'Sorry', channel_name: 'Pop Legends', upload_date: '2026-04-12', video_url: 'fRh_vgS2dFE', view_count: 3900000000, duration: '3:21' },
  { title: 'Happy', channel_name: 'Pop Legends', upload_date: '2026-04-28', video_url: 'y6Sxv-sUYtM', view_count: 1500000000, duration: '3:53' },
  { title: 'What Makes You Beautiful', channel_name: 'Pop Legends', upload_date: '2026-05-15', video_url: 'QJO3ROT-A4E', view_count: 1400000000, duration: '3:20' },
  { title: 'Stay With Me', channel_name: 'Pop Legends', upload_date: '2026-05-28', video_url: 'pB-5XG-DbAA', view_count: 1300000000, duration: '2:52' },

  // ── Rock Classics ────────────────────────────────────────────
  { title: 'Believer', channel_name: 'Rock Classics', upload_date: '2026-01-22', video_url: '7PCkvCPvDXk', view_count: 1700000000, duration: '3:24' },
  { title: 'Radioactive', channel_name: 'Rock Classics', upload_date: '2026-02-10', video_url: 'K_6IyVb_ENM', view_count: 1500000000, duration: '3:06' },
  { title: 'Thunder', channel_name: 'Rock Classics', upload_date: '2026-02-28', video_url: 'ktvTqknDobU', view_count: 1200000000, duration: '3:08' },
  { title: 'Stressed Out', channel_name: 'Rock Classics', upload_date: '2026-03-15', video_url: 'pXRviuL6vMY', view_count: 1100000000, duration: '3:22' },
  { title: 'Heathens', channel_name: 'Rock Classics', upload_date: '2026-03-30', video_url: 'UprcpdwuwCg', view_count: 980000000, duration: '3:45' },
  { title: 'Paradise', channel_name: 'Rock Classics', upload_date: '2026-04-18', video_url: '1G4isv_Fylg', view_count: 1150000000, duration: '4:39' },
  { title: 'Yellow', channel_name: 'Rock Classics', upload_date: '2026-05-02', video_url: 'yKNxeF4KMsY', view_count: 870000000, duration: '4:29' },
  { title: 'Fix You', channel_name: 'Rock Classics', upload_date: '2026-05-18', video_url: 'k4V3Mo61fJM', view_count: 950000000, duration: '4:55' },

  // ── Urban Beats ──────────────────────────────────────────────
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

  // ── TED Talks ────────────────────────────────────────────────
  { title: 'How Great Leaders Inspire Action', channel_name: 'TED Talks', upload_date: '2026-01-12', video_url: 'qp0HIF3SfI4', view_count: 60000000, duration: '18:01' },
  { title: 'Do Schools Kill Creativity?', channel_name: 'TED Talks', upload_date: '2026-01-26', video_url: 'iG9CE55wbtY', view_count: 73000000, duration: '19:22' },
  { title: 'The Power of Vulnerability', channel_name: 'TED Talks', upload_date: '2026-02-10', video_url: 'iCvmsMzlF7o', view_count: 63000000, duration: '20:19' },
  { title: 'Inside the Mind of a Master Procrastinator', channel_name: 'TED Talks', upload_date: '2026-02-24', video_url: 'arj7oStGLkU', view_count: 58000000, duration: '14:04' },
  { title: 'Your Body Language May Shape Who You Are', channel_name: 'TED Talks', upload_date: '2026-03-10', video_url: 'Ks-_Mh1QhMc', view_count: 67000000, duration: '21:02' },
  { title: 'The Puzzle of Motivation', channel_name: 'TED Talks', upload_date: '2026-03-28', video_url: 'rrkrvAUbU9Y', view_count: 35000000, duration: '18:36' },
  { title: 'How to Speak So That People Want to Listen', channel_name: 'TED Talks', upload_date: '2026-04-05', video_url: 'eIho2S0ZahI', view_count: 48000000, duration: '9:58' },
  { title: 'The Happy Secret to Better Work', channel_name: 'TED Talks', upload_date: '2026-04-18', video_url: 'fLJsdqxnSr0', view_count: 28000000, duration: '12:20' },
  { title: 'The Danger of a Single Story', channel_name: 'TED Talks', upload_date: '2026-05-01', video_url: 'D9Ihs241zeg', view_count: 31000000, duration: '18:49' },
  { title: '10 Ways to Have a Better Conversation', channel_name: 'TED Talks', upload_date: '2026-05-14', video_url: 'R1vXuFi2G1Q', view_count: 22000000, duration: '11:44' },

  // ── Sports Central ─────────────────────────────────────────────
  { title: 'Usain Bolt 100m World Record (9.58s)', channel_name: 'Sports Central', upload_date: '2026-01-10', video_url: '3nbjhpcZ9_g', view_count: 89000000, duration: '1:30' },
  { title: 'Ronaldo Overhead Kick vs Juventus', channel_name: 'Sports Central', upload_date: '2026-01-22', video_url: '0pZzJBT894g', view_count: 120000000, duration: '2:15' },
  { title: 'Michael Jordan - The Last Dance Highlights', channel_name: 'Sports Central', upload_date: '2026-02-05', video_url: 'E7eLP553K8A', view_count: 45000000, duration: '3:42' },
  { title: 'Messi vs Real Madrid (El Clasico Hat Trick)', channel_name: 'Sports Central', upload_date: '2026-02-18', video_url: 'c9OjKDQF92M', view_count: 67000000, duration: '4:08' },
  { title: 'Muhammad Ali - Float Like a Butterfly', channel_name: 'Sports Central', upload_date: '2026-03-02', video_url: 'a8QcblbT2QA', view_count: 34000000, duration: '3:55' },
  { title: 'NBA Top 10 Plays of the Week', channel_name: 'Sports Central', upload_date: '2026-03-15', video_url: '6HGB4Z8S_38', view_count: 18000000, duration: '12:04' },
  { title: 'FIFA World Cup - Best Goals Compilation', channel_name: 'Sports Central', upload_date: '2026-04-01', video_url: 'j0bEZ8U83D8', view_count: 95000000, duration: '10:22' },
  { title: 'Federer vs Nadal - Wimbledon Epic Rally', channel_name: 'Sports Central', upload_date: '2026-04-20', video_url: '8X2k_ifr67A', view_count: 52000000, duration: '5:18' },

  // ── Learn Academy ──────────────────────────────────────────────
  { title: 'Welcome to Crash Course Biology', channel_name: 'Learn Academy', upload_date: '2026-01-16', video_url: 'QLpCQ8I7MQo', view_count: 14000000, duration: '15:01' },
  { title: 'Introduction to Cells', channel_name: 'Learn Academy', upload_date: '2026-02-01', video_url: 'Hmwvj9lnNIE', view_count: 8200000, duration: '8:42' },
  { title: 'The Agricultural Revolution: Crash Course World History', channel_name: 'Learn Academy', upload_date: '2026-02-14', video_url: '6D38RFSJVhc', view_count: 11000000, duration: '11:11' },
  { title: 'Algebra Basics: What Is Algebra?', channel_name: 'Learn Academy', upload_date: '2026-03-01', video_url: 'NybHckSEQBI', view_count: 5600000, duration: '7:56' },
  { title: 'Photosynthesis', channel_name: 'Learn Academy', upload_date: '2026-03-18', video_url: 'q0fGBox2s48', view_count: 4300000, duration: '13:05' },
  { title: 'What Is Philosophy? - Crash Course Philosophy', channel_name: 'Learn Academy', upload_date: '2026-04-02', video_url: '1A2b4RkK8Gc', view_count: 7800000, duration: '10:04' },

  // ── Science & Space ──────────────────────────────────────────
  { title: 'James Webb Telescope: First Images (Official Broadcast)', channel_name: 'Science & Space', upload_date: '2026-01-08', video_url: 'nmMRMIE3MGw', view_count: 2100000, duration: '1:52:13' },
  { title: 'SpaceX Starship Flight 5: First Ever Booster Catch', channel_name: 'Science & Space', upload_date: '2026-01-20', video_url: 'YC87WmFN_As', view_count: 5400000, duration: '1:43:00' },
  { title: 'All of Human History In One Hour', channel_name: 'Science & Space', upload_date: '2026-02-06', video_url: 'KNwMiydCYA4', view_count: 10200000, duration: '1:02:44' },
  { title: 'You Are Not Where You Think You Are', channel_name: 'Science & Space', upload_date: '2026-02-22', video_url: 'Pj-h6MEgE7I', view_count: 15300000, duration: '15:34' },
  { title: 'There Is Something Hiding Inside Earth', channel_name: 'Science & Space', upload_date: '2026-03-12', video_url: 'VD6xJq8NguY', view_count: 8100000, duration: '12:18' },
  { title: 'Trees Are So Weird', channel_name: 'Science & Space', upload_date: '2026-03-30', video_url: 'ZSch_NgZpQs', view_count: 6200000, duration: '10:12' },
  { title: 'What Everyone Gets Wrong About AI and Learning', channel_name: 'Science & Space', upload_date: '2026-04-18', video_url: '0xS68sl2D70', view_count: 4500000, duration: '15:22' },

  // ── Tech Today ───────────────────────────────────────────────
  { title: 'How Does the Internet Work?', channel_name: 'Tech Today', upload_date: '2026-01-14', video_url: 'zN8YNNHcaZc', view_count: 5300000, duration: '2:07:27' },
  { title: 'AI, Machine Learning & Deep Learning Explained', channel_name: 'Tech Today', upload_date: '2026-01-30', video_url: 'qYNweeDHiyU', view_count: 3200000, duration: '11:04' },
  { title: 'Backpropagation Calculus | Deep Learning Explained', channel_name: 'Tech Today', upload_date: '2026-02-16', video_url: 'tIeHLnjs5U8', view_count: 5100000, duration: '10:18' },
  { title: 'Bayes Theorem: The Geometry of Changing Beliefs', channel_name: 'Tech Today', upload_date: '2026-03-04', video_url: 'HZGCoVF3YvM', view_count: 5800000, duration: '15:12' },
  { title: 'Best Tech of 2024 ft. MKBHD, Linus Tech Tips & More', channel_name: 'Tech Today', upload_date: '2026-03-22', video_url: 'Y8s_LNl1jpM', view_count: 3100000, duration: '30:15' },
  { title: 'Which Smartphones Do We Actually Use? ft. MKBHD & LTT', channel_name: 'Tech Today', upload_date: '2026-04-08', video_url: 'Z1mIpTQ9Uu4', view_count: 4200000, duration: '25:22' },

  // ── World Kitchen ────────────────────────────────────────────
  { title: '20 Minute Meals with Gordon Ramsay', channel_name: 'World Kitchen', upload_date: '2026-01-18', video_url: 'mzDCuS2l_qI', view_count: 8400000, duration: '25:14' },
  { title: "Gordon's Quick & Simple Recipes", channel_name: 'World Kitchen', upload_date: '2026-02-03', video_url: 'mhDJNfV7hjk', view_count: 12100000, duration: '22:08' },
  { title: "Gordon Ramsay's Best Breakfast Recipes", channel_name: 'World Kitchen', upload_date: '2026-02-20', video_url: 'KDCFNsMFGtg', view_count: 6700000, duration: '18:42' },
  { title: 'TOP 3 Recipes You Can Make On Your Own', channel_name: 'World Kitchen', upload_date: '2026-03-08', video_url: 'p4k--aRZu8U', view_count: 5200000, duration: '15:30' },
  { title: 'Sourdough Bread feat. Joshua Weissman', channel_name: 'World Kitchen', upload_date: '2026-03-26', video_url: 'bSYdABrPrtM', view_count: 4100000, duration: '9:44' },
  { title: 'Paunch Burger from Parks & Recreation', channel_name: 'World Kitchen', upload_date: '2026-04-12', video_url: 'RN8uoBwRr1k', view_count: 3300000, duration: '8:15' },
];

const videos = rawVideos.map(v => ({
  ...v,
  category: CHANNEL_CATEGORY[v.channel_name],
  thumbnail_url: `https://img.youtube.com/vi/${v.video_url}/hqdefault.jpg`,
}));

const insert = db.prepare(`
  INSERT INTO videos (title, channel_name, category, upload_date, thumbnail_url, video_url, view_count, duration)
  VALUES (@title, @channel_name, @category, @upload_date, @thumbnail_url, @video_url, @view_count, @duration)
`);

const insertAll = db.transaction((rows) => {
  for (const row of rows) insert.run(row);
});

insertAll(videos);

console.log(`Seeded ${videos.length} videos across 11 channels.`);
db.close();
