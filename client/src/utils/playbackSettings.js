const RATE_KEY = 'viewtube_playback_rate';

export function getPlaybackRate() {
  try {
    const rate = Number(sessionStorage.getItem(RATE_KEY));
    return [0.5, 1, 1.5, 2].includes(rate) ? rate : 1;
  } catch {
    return 1;
  }
}

export function setPlaybackRate(rate) {
  try {
    sessionStorage.setItem(RATE_KEY, String(rate));
  } catch {
    // ignore
  }
}
