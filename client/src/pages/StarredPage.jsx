import { useState, useEffect } from 'react';
import { useStarred } from '../context/StarredContext';
import VideoCard from '../components/VideoCard';

export default function StarredPage() {
  const { starred } = useStarred();
  const [allVideos, setAllVideos] = useState([]);

  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then(setAllVideos)
      .catch(() => {});
  }, []);

  const starredVideos = allVideos.filter((v) => starred.includes(v.id));

  return (
    <main className="main-content">
      <h1 className="page-heading">Starred Videos</h1>
      {starredVideos.length === 0 ? (
        <div className="empty-state">
          <h2>No starred videos yet</h2>
          <p>Click the ☆ on any video card or player to save it here.</p>
        </div>
      ) : (
        <div className="video-grid">
          {starredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </main>
  );
}
