const HISTORY_KEY = 'viewtube_watch_history';

export function getWatchHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function addWatchHistory(videoId) {
  const id = Number(videoId);
  try {
    const prev = getWatchHistory();
    const next = [
      { videoId: id, watchedAt: Date.now() },
      ...prev.filter((e) => e.videoId !== id),
    ];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event('viewtube-history-update'));
  } catch {
    // ignore
  }
}

export function clearWatchHistory() {
  try {
    localStorage.removeItem(HISTORY_KEY);
    window.dispatchEvent(new Event('viewtube-history-update'));
  } catch {
    // ignore
  }
}
