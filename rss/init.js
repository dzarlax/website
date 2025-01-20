import RSSFeed from './RSSFeed.js';

// Attach the rssFeed to the window object to make it globally accessible
window.rssFeed = new RSSFeed('https://s3.dzarlax.dev/articles/feed_300.xml', 'rss-feed');

// Wait for the DOM content to be fully loaded before fetching the RSS feed
document.addEventListener('DOMContentLoaded', () => {
  window.rssFeed.fetchRSSFeed();
});
