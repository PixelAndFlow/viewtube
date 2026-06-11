import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import RelatedVideos from '../components/RelatedVideos';
import { useStarred } from '../context/StarredContext';
import { isSubscribed, toggleSubscription } from '../utils/subscriptions';
import { getChannelSubscriberCount } from '../utils/channels';

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

function formatViews(count) {
  if (count >= 1e9) return `${(count / 1e9).toFixed(1)}B views`;
  if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M views`;
  if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K views`;
  return `${count} views`;
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

export default function WatchPage() {
  const { id } = useParams();
  const location = useLocation();
  const { isStarred, toggleStar } = useStarred();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [miniPlayer, setMiniPlayer] = useState(false);
  const playerAnchorRef = useRef(null);

  const startTime = location.state?.startTime ?? 0;

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/videos/${id}`).then(r => r.json()),
      fetch('/api/videos').then(r => r.json()),
    ])
      .then(([videoData, allVideos]) => {
        setVideo(videoData);
        setRelatedVideos(
          allVideos.filter(
            (v) => v.channel_name === videoData.channel_name && v.id !== videoData.id
          )
        );
        setSubscribed(isSubscribed(videoData.channel_name));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const onScroll = () => {
      const anchor = playerAnchorRef.current;
      if (!anchor) return;
      setMiniPlayer(anchor.getBoundingClientRect().bottom < 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [video]);

  const handleExpandMini = () => {
    setMiniPlayer(false);
    playerAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubscribe = () => {
    if (!video) return;
    toggleSubscription(video.channel_name);
    setSubscribed(isSubscribed(video.channel_name));
  };

  if (loading) return <main className="main-content"><p className="status-message">Loading...</p></main>;
  if (!video || video.error) return <main className="main-content"><p className="status-message error">Video not found.</p></main>;

  const starred = isStarred(video.id);
  const avatarColor = CHANNEL_COLORS[video.channel_name] || '#606060';

  return (
    <main className="main-content">
      <div className="watch-container">
        <section className="watch-player-section">
          <div ref={playerAnchorRef} className="watch-player-anchor">
            {miniPlayer && <div className="watch-player-placeholder" aria-hidden="true" />}
            <VideoPlayer
              videoId={video.video_url}
              videoDbId={video.id}
              startTime={startTime}
              isMini={miniPlayer}
              onExpandMini={handleExpandMini}
            />
          </div>

          <div className="watch-video-info">
            <h1 className="watch-title">{video.title}</h1>

            <div className="watch-channel-row">
              <div className="watch-channel-avatar" style={{ background: avatarColor }}>
                {video.channel_name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <p className="watch-channel-name">{video.channel_name}</p>
                <p className="watch-channel-subs">{getChannelSubscriberCount(video.channel_name)}</p>
              </div>
              <button
                type="button"
                className={`subscribe-btn${subscribed ? ' subscribed' : ''}`}
                onClick={handleSubscribe}
              >
                {subscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>

            <div className="watch-actions-row">
              <p className="watch-meta-text">
                {formatViews(video.view_count)} · {formatRelativeDate(video.upload_date)} · {video.duration}
              </p>
              <button
                className={`watch-action-btn${starred ? ' starred' : ''}`}
                onClick={() => toggleStar(video.id)}
              >
                {starred ? '★ Starred' : '☆ Star'}
              </button>
              <button className="watch-action-btn">↗ Share</button>
            </div>
          </div>
        </section>

        <RelatedVideos videos={relatedVideos} />
      </div>
    </main>
  );
}
