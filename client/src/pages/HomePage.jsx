import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { VideoGridSkeleton } from '../components/VideoCardSkeleton';
import RecentlyWatched from '../components/RecentlyWatched';
import ContinueWatching from '../components/ContinueWatching';
import { getWatchHistory } from '../utils/watchHistory';

const CHANNELS = ['VEVO Music', 'Retro Hits', 'Pop Legends', 'Rock Classics', 'Urban Beats', 'Sports Central', 'TED Talks', 'Learn Academy', 'Science & Space', 'Tech Today', 'World Kitchen'];

const CATEGORIES = ['Music', 'Sports', 'News', 'Gaming', 'Education'];

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

const QUICK_FILTERS = [
  { id: 'watched', label: 'Watched' },
  { id: 'new-to-you', label: 'New to you' },
];

const SORT_OPTIONS = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'views', label: 'Most Viewed' },
  { value: 'az', label: 'A–Z' },
];

function getVideoCategory(video) {
  return video.category || CHANNEL_CATEGORY[video.channel_name];
}

function getWatchedIds() {
  return new Set(getWatchHistory().map((entry) => Number(entry.videoId)));
}

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

function filterVideos(videos, { activeChannel, activeCategory, activeQuickFilter }) {
  let filtered = videos;

  if (activeCategory) {
    filtered = filtered.filter((v) => getVideoCategory(v) === activeCategory);
  }

  if (activeChannel) {
    filtered = filtered.filter((v) => v.channel_name === activeChannel);
  }

  if (activeQuickFilter === 'watched') {
    const watchedIds = getWatchedIds();
    filtered = filtered.filter((v) => watchedIds.has(Number(v.id)));
  } else if (activeQuickFilter === 'new-to-you') {
    const watchedIds = getWatchedIds();
    filtered = filtered.filter((v) => !watchedIds.has(Number(v.id)));
  }

  return filtered;
}

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeChannel, setActiveChannel] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeQuickFilter, setActiveQuickFilter] = useState(null);
  const [sortOption, setSortOption] = useState('recent');
  const [historyVersion, setHistoryVersion] = useState(0);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => { setVideos(data); setLoading(false); })
      .catch(() => { setError('Could not load videos. Is the server running on port 3001?'); setLoading(false); });
  }, []);

  useEffect(() => {
    const refreshHistory = () => setHistoryVersion((v) => v + 1);
    window.addEventListener('viewtube-history-update', refreshHistory);
    window.addEventListener('storage', refreshHistory);
    return () => {
      window.removeEventListener('viewtube-history-update', refreshHistory);
      window.removeEventListener('storage', refreshHistory);
    };
  }, []);

  if (loading) {
    return (
      <main className="main-content">
        <div className="homepage-toolbar">
          <div className="filter-chips skeleton-filter-row">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="skeleton-block skeleton-chip" />
            ))}
          </div>
        </div>
        <VideoGridSkeleton count={12} />
      </main>
    );
  }
  if (error)   return <main className="main-content"><p className="status-message error">{error}</p></main>;

  let filtered = filterVideos(videos, { activeChannel, activeCategory, activeQuickFilter });
  const displayed = sortVideos(filtered, sortOption);
  const hasActiveFilters = Boolean(activeChannel || activeCategory || activeQuickFilter);

  const handleCategoryClick = (cat) => {
    const nextCategory = activeCategory === cat ? null : cat;
    setActiveCategory(nextCategory);
    if (nextCategory && activeChannel && CHANNEL_CATEGORY[activeChannel] !== nextCategory) {
      setActiveChannel(null);
    }
  };

  const handleQuickFilterClick = (id) => {
    setActiveQuickFilter(activeQuickFilter === id ? null : id);
  };

  const handleChannelClick = (channel) => {
    const nextChannel = activeChannel === channel ? null : channel;
    setActiveChannel(nextChannel);
    if (nextChannel && activeCategory && CHANNEL_CATEGORY[nextChannel] !== activeCategory) {
      setActiveCategory(null);
    }
  };

  const clearAllFilters = () => {
    setActiveChannel(null);
    setActiveCategory(null);
    setActiveQuickFilter(null);
  };

  const handleSendFeedback = () => {
    window.location.href = 'mailto:?subject=ViewTube%20Feedback';
  };

  return (
    <main className="main-content">
      <div className="homepage-toolbar">
        <div className="filter-chips">
          <button
            className={`filter-chip${!hasActiveFilters ? ' active' : ''}`}
            onClick={clearAllFilters}
          >
            All
          </button>
          {CHANNELS.map(ch => (
            <button
              key={ch}
              className={`filter-chip${activeChannel === ch ? ' active' : ''}`}
              onClick={() => handleChannelClick(ch)}
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
      {!hasActiveFilters && <ContinueWatching videos={videos} />}
      {!hasActiveFilters && <RecentlyWatched videos={videos} key={historyVersion} />}
      {displayed.length === 0 ? (
        <p className="status-message">
          No videos match your filters.
          {activeQuickFilter === 'watched' && ' Watch a few videos first, then try again.'}
          {' '}
          <button type="button" className="page-action-btn" onClick={clearAllFilters}>
            Clear filters
          </button>
        </p>
      ) : (
        <div className="video-grid">
          {displayed.map(video => <VideoCard key={video.id} video={video} />)}
        </div>
      )}
    </main>
  );
}
