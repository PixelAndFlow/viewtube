import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { useStarred } from '../context/StarredContext';

function formatViews(count) {
  if (count >= 1e9) return `${(count / 1e9).toFixed(1)}B views`;
  if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M views`;
  if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K views`;
  return `${count} views`;
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function WatchPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isStarred, toggleStar } = useStarred();
  const [video, setVideo] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/videos/${id}`).then((r) => r.json()),
      fetch('/api/videos').then((r) => r.json()),
    ])
      .then(([videoData, allVideos]) => {
        setVideo(videoData);
        setSuggestions(allVideos.filter((v) => v.id !== videoData.id).slice(0, 12));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <main className="main-content"><p className="status-message">Loading...</p></main>;
  if (!video || video.error) return <main className="main-content"><p className="status-message error">Video not found.</p></main>;

  const starred = isStarred(video.id);

  return (
    <main className="main-content">
      <div className="watch-container">
        <section className="watch-player-section">
          <VideoPlayer videoId={video.video_url} />
          <div className="watch-video-info">
            <h1 className="watch-title">{video.title}</h1>
            <p className="watch-channel">{video.channel_name}</p>
            <div className="watch-meta">
              <span>{formatViews(video.view_count)}</span>
              <span>·</span>
              <span>{formatDate(video.upload_date)}</span>
              <span>·</span>
              <span>{video.duration}</span>
            </div>
            <button
              className={`watch-star-btn${starred ? ' starred' : ''}`}
              onClick={() => toggleStar(video.id)}
            >
              {starred ? '★ Starred' : '☆ Add to Starred'}
            </button>
          </div>
        </section>

        <aside className="watch-suggestions-section">
          <h2 className="suggestions-title">Up next</h2>
          {suggestions.map((v) => (
            <div
              key={v.id}
              className="suggestion-card"
              onClick={() => navigate(`/watch/${v.id}`)}
            >
              <div className="suggestion-thumbnail-wrapper">
                <img src={v.thumbnail_url} alt={v.title} loading="lazy" />
                <span className="suggestion-duration">{v.duration}</span>
              </div>
              <div className="suggestion-info">
                <p className="suggestion-title">{v.title}</p>
                <p className="suggestion-channel">{v.channel_name}</p>
                <p className="suggestion-views">{formatViews(v.view_count)}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </main>
  );
}
