import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { VideoGridSkeleton } from '../components/VideoCardSkeleton';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q.trim()) {
      setVideos([]);
      return;
    }
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [q]);

  return (
    <main className="main-content">
      {q && (
        <p className="search-header">
          Search results for <strong>"{q}"</strong>
        </p>
      )}
      {loading && <VideoGridSkeleton count={8} />}
      {!loading && q && videos.length === 0 && (
        <div className="empty-state">
          <h2>No results found for "{q}"</h2>
          <p>Try a different search term or browse the homepage.</p>
        </div>
      )}
      {!loading && videos.length > 0 && (
        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </main>
  );
}
