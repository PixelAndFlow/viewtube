import { useEffect, useRef, useState } from 'react';
import { loadYouTubeApi } from '../utils/youtubeApi';
import { saveWatchProgress, clearWatchProgress } from '../utils/watchProgress';
import { addRecentlyWatched } from '../utils/recentlyWatched';
import { addWatchHistory } from '../utils/watchHistory';
import { getPlaybackRate, setPlaybackRate as persistPlaybackRate } from '../utils/playbackSettings';

const SPEEDS = [0.5, 1, 1.5, 2];
const QUALITIES = [
  { label: '480p', value: 'large' },
  { label: '720p', value: 'hd720' },
  { label: '1080p', value: 'hd1080' },
];

export default function VideoPlayer({
  videoId,
  videoDbId,
  startTime = 0,
  isMini = false,
  onExpandMini,
}) {
  const playerId = `yt-player-${videoDbId ?? videoId}`;
  const playerRef = useRef(null);
  const pollRef = useRef(null);
  const [speed, setSpeed] = useState(getPlaybackRate);
  const [quality, setQuality] = useState('hd720');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (videoDbId != null) {
      addRecentlyWatched(videoDbId);
      addWatchHistory(videoDbId);
    }
  }, [videoDbId]);

  useEffect(() => {
    let destroyed = false;

    async function init() {
      await loadYouTubeApi();
      if (destroyed) return;

      playerRef.current = new window.YT.Player(playerId, {
        videoId,
        playerVars: {
          autoplay: 1,
          start: Math.floor(startTime),
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            if (destroyed) return;
            const player = event.target;
            const rate = getPlaybackRate();
            player.setPlaybackRate(rate);
            if (startTime > 0) player.seekTo(startTime, true);
            player.setPlaybackQuality(quality);
            setReady(true);
            startPolling(player);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED && videoDbId != null) {
              clearWatchProgress(videoDbId);
              stopPolling();
            }
          },
        },
      });
    }

    init();

    return () => {
      destroyed = true;
      setReady(false);
      stopPolling();
      try {
        playerRef.current?.destroy?.();
      } catch {
        // player may already be destroyed
      }
      playerRef.current = null;
    };
  }, [videoId, videoDbId, playerId]);

  function startPolling(player) {
    stopPolling();
    pollRef.current = setInterval(() => {
      if (!player?.getCurrentTime || videoDbId == null) return;
      const current = player.getCurrentTime();
      const duration = player.getDuration();
      if (duration > 0) saveWatchProgress(videoDbId, current, duration);
    }, 2000);
  }

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  const handleSpeedChange = (rate) => {
    setSpeed(rate);
    persistPlaybackRate(rate);
    playerRef.current?.setPlaybackRate?.(rate);
  };

  const handleQualityChange = (value) => {
    setQuality(value);
    const player = playerRef.current;
    if (!player?.getCurrentTime) return;
    const current = player.getCurrentTime();
    player.setPlaybackQuality(value);
    player.seekTo(current, true);
  };

  const handleWrapperClick = () => {
    if (isMini && onExpandMini) onExpandMini();
  };

  return (
    <div
      className={`watch-player-wrapper${isMini ? ' is-mini' : ''}`}
      onClick={handleWrapperClick}
      role={isMini ? 'button' : undefined}
      tabIndex={isMini ? 0 : undefined}
      onKeyDown={isMini ? (e) => e.key === 'Enter' && onExpandMini?.() : undefined}
      aria-label={isMini ? 'Expand video player' : undefined}
    >
      <div id={playerId} className="watch-player-embed" />
      {!isMini && ready && (
        <div className="player-controls" onClick={(e) => e.stopPropagation()}>
          <label className="player-control">
            <span>Speed</span>
            <select value={speed} onChange={(e) => handleSpeedChange(Number(e.target.value))}>
              {SPEEDS.map((s) => (
                <option key={s} value={s}>{s}x</option>
              ))}
            </select>
          </label>
          <label className="player-control">
            <span>Quality</span>
            <select value={quality} onChange={(e) => handleQualityChange(e.target.value)}>
              {QUALITIES.map((q) => (
                <option key={q.value} value={q.value}>{q.label}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      {isMini && <div className="mini-player-badge">Expand</div>}
    </div>
  );
}
