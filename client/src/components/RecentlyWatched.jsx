import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VideoCard from './VideoCard';
import { getRecentlyWatched } from '../utils/recentlyWatched';

export default function RecentlyWatched({ videos }) {
  const location = useLocation();
  const [ids, setIds] = useState([]);

  useEffect(() => {
    setIds(getRecentlyWatched());
  }, [location.pathname]);

  const recentVideos = ids
    .map((id) => videos.find((v) => v.id === id))
    .filter(Boolean);

  if (recentVideos.length === 0) return null;

  return (
    <section className="recently-watched">
      <h2 className="recently-watched-title">Recently watched</h2>
      <div className="recently-watched-row">
        {recentVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
