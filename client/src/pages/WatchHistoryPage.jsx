import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { getWatchHistory, clearWatchHistory } from '../utils/watchHistory';

export default function WatchHistoryPage() {
  const [allVideos, setAllVideos] = useState([]);
  const [history, setHistory] = useState([]);

  const loadHistory = () => setHistory(getWatchHistory());

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then(setAllVideos)
      .catch(() => {});
    loadHistory();
    window.addEventListener('viewtube-history-update', loadHistory);
    return () => window.removeEventListener('viewtube-history-update', loadHistory);
  }, []);

  const historyVideos = history
    .map((entry) => allVideos.find((v) => v.id === entry.videoId))
    .filter(Boolean);

  const handleClear = () => {
    clearWatchHistory();
    loadHistory();
  };

  return (
    <main className="main-content">
      <div className="page-header-row">
        <h1 className="page-heading">Watch History</h1>
        {historyVideos.length > 0 && (
          <button type="button" className="page-action-btn" onClick={handleClear}>
            Clear History
          </button>
        )}
      </div>
      {historyVideos.length === 0 ? (
        <div className="empty-state">
          <h2>No watch history yet</h2>
          <p>Videos you watch will appear here.</p>
        </div>
      ) : (
        <div className="video-grid">
          {historyVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </main>
  );
}
