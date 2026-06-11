const STORAGE_KEY = 'viewtube_recently_watched';
const MAX_ITEMS = 5;

export function getRecentlyWatched() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function addRecentlyWatched(videoId) {
  const id = Number(videoId);
  try {
    const prev = getRecentlyWatched();
    const next = [id, ...prev.filter((x) => x !== id)].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore write errors
  }
}
