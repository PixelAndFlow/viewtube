import { useNavigate } from 'react-router-dom';
import { useStarred } from '../context/StarredContext';
import { getProgressPercent } from '../utils/watchProgress';

const CHANNEL_COLORS = {
  'VEVO Music':    '#c00',
  'Retro Hits':    '#1565c0',
  'Pop Legends':   '#c2185b',
  'Rock Classics': '#e65100',
  'Urban Beats':   '#00695c',
  'TED Talks':     '#4a148c',
  'Science & Space': '#0277bd',
  'Tech Today':    '#2e7d32',
  'World Kitchen': '#5d4037',
};

function formatDuration(duration) {
  if (!duration) return '0:00';
  const parts = String(duration).split(':').map(Number);
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  const [minutes, seconds] = parts;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function formatRelativeDate(dateStr) {
  const days = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (days < 1)  return 'today';
  if (days < 7)  return `${days} day${days > 1 ? 's' : ''} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}

export default function VideoCard({ video, startTime, onCardClick }) {
  const navigate = useNavigate();
  const { isStarred, toggleStar } = useStarred();
  const starred = isStarred(video.id);
  const avatarColor = CHANNEL_COLORS[video.channel_name] || '#606060';
  const progressPercent = getProgressPercent(video.id);

  function formatViewCount(count) {
    if (count >= 1e9) return `${(count / 1e9).toFixed(1)}B views`;
    if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M views`;
    if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K views`;
    return `${count} views`;
  }

  const handleStarClick = (e) => {
    e.stopPropagation();
    toggleStar(video.id);
  };

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
      return;
    }
    if (startTime != null) {
      navigate(`/watch/${video.id}`, { state: { startTime } });
      return;
    }
    navigate(`/watch/${video.id}`);
  };

  return (
    <div className="video-card" onClick={handleCardClick}>
      <div className="video-card-thumb-wrap">
        <img
          className="video-card-thumb"
          src={video.thumbnail_url}
          alt={video.title}
          loading="lazy"
        />
        {progressPercent > 0 && progressPercent < 95 && (
          <div className="video-card-progress">
            <div
              className="video-card-progress-bar"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
        <span className="video-card-duration">{formatDuration(video.duration)}</span>
        <button
          className={`video-card-star${starred ? ' starred' : ''}`}
          onClick={handleStarClick}
          aria-label={starred ? 'Remove from starred' : 'Add to starred'}
        >
          {starred ? '★' : '☆'}
        </button>
      </div>
      <div className="video-card-body">
        <div
          className="video-card-avatar"
          style={{ background: avatarColor }}
          title={video.channel_name}
        >
          {video.channel_name[0]}
        </div>
        <div className="video-card-meta-col">
          <p className="video-card-title">{video.title}</p>
          <p className="video-card-channel">{video.channel_name}</p>
          <p className="video-card-stats">
            {formatViewCount(video.view_count)} · {formatRelativeDate(video.upload_date)}
          </p>
        </div>
      </div>
    </div>
  );
}
