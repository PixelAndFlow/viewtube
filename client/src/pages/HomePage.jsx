import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import RecentlyWatched from '../components/RecentlyWatched';
import ContinueWatching from '../components/ContinueWatching';
import { getRecentlyWatched } from '../utils/recentlyWatched';

const CHANNELS = ['VEVO Music', 'Retro Hits', 'Pop Legends', 'Rock Classics', 'Urban Beats', 'TED Talks', 'Science & Space', 'Tech Today', 'World Kitchen'];

const CATEGORIES = ['Music', 'Sports', 'News', 'Gaming', 'Education'];

const QUICK_FILTERS = [
  { id: 'watched', label: 'Watched' },
  { id: 'new-to-you', label: 'New to you' },
];

const SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'views', label: 'Most Viewed' },
  { value: 'az', label: 'A–Z' },
];

function sortVideos(list, sortOption) {
  const sorted = [...list];
  switch (sortOption) {
    case 'views':
      return sorted.sort((a, b) => b.view_count - a.view_count);
    case 'az':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'recent':
    default:
      return sorted.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date));
  }
}

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeChannel, setActiveChannel] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeQuickFilter, setActiveQuickFilter] = useState(null);
  const [sortOption, setSortOption] = useState('recent');

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => { setVideos(data); setLoading(false); })
      .catch(() => { setError('Could not load videos. Is the server running on port 3001?'); setLoading(false); });
  }, []);

  if (loading) return <main className="main-content"><p className="status-message">Loading...</p></main>;
  if (error)   return <main className="main-content"><p className="status-message error">{error}</p></main>;

  let filtered = videos;
  if (activeCategory) {
    filtered = filtered.filter((v) => v.category === activeCategory);
  } else if (activeQuickFilter === 'watched') {
    const watchedIds = getRecentlyWatched();
    filtered = filtered.filter((v) => watchedIds.includes(v.id));
  } else if (activeQuickFilter === 'new-to-you') {
    const watchedIds = getRecentlyWatched();
    filtered = filtered.filter((v) => !watchedIds.includes(v.id));
  }
  if (activeChannel) {
    filtered = filtered.filter((v) => v.channel_name === activeChannel);
  }
  const displayed = sortVideos(filtered, sortOption);

  const handleCategoryClick = (cat) => {
    setActiveQuickFilter(null);
    setActiveCategory(activeCategory === cat ? null : cat);
  };

  const handleQuickFilterClick = (id) => {
    setActiveCategory(null);
    setActiveQuickFilter(activeQuickFilter === id ? null : id);
  };

  const handleSendFeedback = () => {
    window.location.href = 'mailto:?subject=ViewTube%20Feedback';
  };

  return (
    <main className="main-content">
      <div className="homepage-toolbar">
        <div className="filter-chips">
          <button
            className={`filter-chip${!activeChannel ? ' active' : ''}`}
            onClick={() => setActiveChannel(null)}
          >
            All
          </button>
          {CHANNELS.map(ch => (
            <button
              key={ch}
              className={`filter-chip${activeChannel === ch ? ' active' : ''}`}
              onClick={() => setActiveChannel(activeChannel === ch ? null : ch)}
            >
              {ch}
            </button>
          ))}
        </div>
        <label className="sort-control">
          <span className="sort-label">Sort by</span>
          <select
            className="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="category-chips">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-chip${activeCategory === cat ? ' active' : ''}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
        {QUICK_FILTERS.map(({ id, label }) => (
          <button
            key={id}
            className={`filter-chip${activeQuickFilter === id ? ' active' : ''}`}
            onClick={() => handleQuickFilterClick(id)}
          >
            {label}
          </button>
        ))}
        <button className="filter-chip" onClick={handleSendFeedback}>
          Send feedback
        </button>
      </div>
      <ContinueWatching videos={videos} />
      <RecentlyWatched videos={videos} />
      <div className="video-grid">
        {displayed.map(video => <VideoCard key={video.id} video={video} />)}
      </div>
    </main>
  );
}
