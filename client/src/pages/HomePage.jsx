import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';

const CHANNELS = ['VEVO Music', 'Retro Hits', 'Pop Legends', 'Rock Classics', 'Urban Beats', 'TED Talks', 'Science & Space', 'Tech Today', 'World Kitchen'];

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeChannel, setActiveChannel] = useState(null);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => { setVideos(data); setLoading(false); })
      .catch(() => { setError('Could not load videos. Is the server running on port 3001?'); setLoading(false); });
  }, []);

  if (loading) return <main className="main-content"><p className="status-message">Loading...</p></main>;
  if (error)   return <main className="main-content"><p className="status-message error">{error}</p></main>;

  const displayed = activeChannel ? videos.filter(v => v.channel_name === activeChannel) : videos;

  return (
    <main className="main-content">
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
      <div className="video-grid">
        {displayed.map(video => <VideoCard key={video.id} video={video} />)}
      </div>
    </main>
  );
}
