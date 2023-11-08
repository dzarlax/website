import RSSFeed from './RSSFeed.js';

let rssFeed;

document.addEventListener('DOMContentLoaded', () => {
  rssFeed = new RSSFeed('https://s3.dzarlax.dev/feed_300.xml', 'rss-feed');
  rssFeed.fetchRSSFeed();
});
