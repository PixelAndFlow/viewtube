import { useNavigate } from 'react-router-dom';

export default function RelatedVideos({ videos }) {
  const navigate = useNavigate();

  function formatViewCount(count) {
    if (count >= 1e9) return `${(count / 1e9).toFixed(1)}B views`;
    if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M views`;
    if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K views`;
    return `${count} views`;
  }

  if (videos.length === 0) {
    return (
      <aside className="watch-suggestions-section related-videos">
        <h2 className="suggestions-title">Related videos</h2>
        <p className="related-videos-empty">No other videos from this channel.</p>
      </aside>
    );
  }

  return (
    <aside className="watch-suggestions-section related-videos">
      <h2 className="suggestions-title">Related videos</h2>
      <div className="related-videos-list">
        {videos.map((v) => (
          <div
            key={v.id}
            className="suggestion-card"
            onClick={() => navigate(`/watch/${v.id}`)}
          >
            <div className="suggestion-thumb-wrap">
              <img src={v.thumbnail_url} alt={v.title} loading="lazy" />
              <span className="suggestion-duration">{v.duration}</span>
            </div>
            <div className="suggestion-info">
              <p className="suggestion-title">{v.title}</p>
              <p className="suggestion-channel">{v.channel_name}</p>
              <p className="suggestion-views">{formatViewCount(v.view_count)}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
