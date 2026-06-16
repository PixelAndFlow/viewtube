export const CHANNEL_SUBSCRIBER_COUNTS = {
  'VEVO Music': '12.4M subscribers',
  'Retro Hits': '3.8M subscribers',
  'Pop Legends': '9.1M subscribers',
  'Rock Classics': '5.6M subscribers',
  'Urban Beats': '7.2M subscribers',
  'Sports Central': '8.4M subscribers',
  'TED Talks': '24M subscribers',
  'Learn Academy': '5.1M subscribers',
  'Science & Space': '4.5M subscribers',
  'Tech Today': '6.3M subscribers',
  'World Kitchen': '2.9M subscribers',
};

export function getChannelSubscriberCount(channelName) {
  return CHANNEL_SUBSCRIBER_COUNTS[channelName] || '1.0M subscribers';
}
