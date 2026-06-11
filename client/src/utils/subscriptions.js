const KEY = 'viewtube_subscriptions';

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

function write(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export function isSubscribed(channelName) {
  return read().includes(channelName);
}

export function toggleSubscription(channelName) {
  const prev = read();
  const next = prev.includes(channelName)
    ? prev.filter((c) => c !== channelName)
    : [...prev, channelName];
  write(next);
  return next.includes(channelName);
}

export function getSubscribedChannels() {
  return read();
}
