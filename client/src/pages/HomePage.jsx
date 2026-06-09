import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';

export default function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load videos. Is the server running on port 3001?');
        setLoading(false);
      });
  }, []);

  if (loading) return <main className="main-content"><p className="status-message">Loading...</p></main>;
  if (error) return <main className="main-content"><p className="status-message error">{error}</p></main>;

  return (
    <main className="main-content">
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </main>
  );
}
