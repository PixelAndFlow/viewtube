import { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';

export default function TrendingPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => {
        const trending = [...data]
          .sort((a, b) => b.view_count - a.view_count)
          .slice(0, 20);
        setVideos(trending);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <main className="main-content"><p className="status-message">Loading...</p></main>;

  return (
    <main className="main-content">
      <h1 className="page-heading">Trending</h1>
      <p className="page-subheading">Most viewed videos on ViewTube</p>
      <div className="video-grid">
        {videos.map((video, index) => (
          <div key={video.id} className="trending-item">
            <span className="trending-rank">{index + 1}</span>
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </main>
  );
}
