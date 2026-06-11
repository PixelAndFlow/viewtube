import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VideoCard from './VideoCard';
import { getContinueWatchingEntries } from '../utils/watchProgress';

export default function ContinueWatching({ videos }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    setEntries(getContinueWatchingEntries());
    const refresh = () => setEntries(getContinueWatchingEntries());
    window.addEventListener('viewtube-progress-update', refresh);
    return () => window.removeEventListener('viewtube-progress-update', refresh);
  }, [location.pathname]);

  const continueVideos = entries
    .map((entry) => {
      const video = videos.find((v) => v.id === entry.videoId);
      return video ? { video, startTime: entry.currentTime } : null;
    })
    .filter(Boolean);

  if (continueVideos.length === 0) return null;

  return (
    <section className="continue-watching">
      <h2 className="section-heading">Continue watching</h2>
      <div className="continue-watching-row">
        {continueVideos.map(({ video, startTime }) => (
          <VideoCard
            key={video.id}
            video={video}
            startTime={startTime}
            onCardClick={() => navigate(`/watch/${video.id}`, { state: { startTime } })}
          />
        ))}
      </div>
    </section>
  );
}
