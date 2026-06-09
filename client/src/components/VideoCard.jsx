import { useNavigate } from 'react-router-dom';
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
    month: 'short',
    day: 'numeric',
  });
}

export default function VideoCard({ video }) {
  const navigate = useNavigate();
  const { isStarred, toggleStar } = useStarred();
  const starred = isStarred(video.id);

  const handleStarClick = (e) => {
    e.stopPropagation();
    toggleStar(video.id);
  };

  return (
    <div className="video-card" onClick={() => navigate(`/watch/${video.id}`)}>
      <div className="video-card-thumbnail-wrapper">
        <img
          className="video-card-thumbnail"
          src={video.thumbnail_url}
          alt={video.title}
          loading="lazy"
        />
        <span className="video-card-duration">{video.duration}</span>
        <button
          className={`video-card-star${starred ? ' starred' : ''}`}
          onClick={handleStarClick}
          aria-label={starred ? 'Remove from starred' : 'Add to starred'}
        >
          {starred ? '★' : '☆'}
        </button>
      </div>
      <div className="video-card-info">
        <p className="video-card-title">{video.title}</p>
        <p className="video-card-channel">{video.channel_name}</p>
        <p className="video-card-meta">
          {formatViews(video.view_count)} · {formatDate(video.upload_date)}
        </p>
      </div>
    </div>
  );
}
