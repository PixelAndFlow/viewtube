const PROGRESS_KEY = 'viewtube_watch_progress';

function readMap() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeMap(map) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(map));
    window.dispatchEvent(new Event('viewtube-progress-update'));
  } catch {
    // ignore
  }
}

export function getWatchProgress(videoId) {
  const map = readMap();
  return map[Number(videoId)] ?? null;
}

export function getWatchProgressMap() {
  return readMap();
}

export function getProgressPercent(videoId) {
  const entry = getWatchProgress(videoId);
  if (!entry?.duration) return 0;
  return Math.min(100, (entry.currentTime / entry.duration) * 100);
}

export function saveWatchProgress(videoId, currentTime, duration) {
  if (videoId == null || !duration || duration <= 0) return;

  const id = Number(videoId);
  const percent = (currentTime / duration) * 100;

  if (percent >= 95) {
    clearWatchProgress(id);
    return;
  }

  if (currentTime <= 0) return;

  const map = readMap();
  map[id] = {
    currentTime,
    duration,
    updatedAt: Date.now(),
  };
  writeMap(map);
}

export function clearWatchProgress(videoId) {
  const id = Number(videoId);
  const map = readMap();
  if (!map[id]) return;
  delete map[id];
  writeMap(map);
}

export function getContinueWatchingEntries() {
  const map = readMap();
  return Object.entries(map)
    .map(([id, data]) => ({
      videoId: Number(id),
      ...data,
      percent: (data.currentTime / data.duration) * 100,
    }))
    .filter((e) => e.percent >= 5 && e.percent <= 95)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}
