import EnhancedRSSFeed from './enhanced-rss.js';

// Attach the enhanced RSS feed to the window object
window.rssFeed = new EnhancedRSSFeed('https://s3.dzarlax.dev/articles/feed_300.xml', 'rss-feed');

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the RSS feed
  window.rssFeed.fetchRSSFeed();
  
  // Set up filter controls
  setupFilterControls();
  
  // Set up favorites button
  setupFavoritesButton();
  
  // Set up auto-update toggle
  setupAutoUpdateToggle();
});

// Set up filter controls
function setupFilterControls() {
  const dateFilter = document.getElementById('date-filter');
  if (dateFilter) {
    dateFilter.addEventListener('change', function() {
      window.rssFeed.setDateFilter(this.value);
    });
  }
}

// Set up favorites button
function setupFavoritesButton() {
  const favoritesBtn = document.getElementById('show-favorites');
  if (favoritesBtn) {
    favoritesBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      const showFavoritesOnly = this.classList.contains('active');
      window.rssFeed.setShowFavoritesOnly(showFavoritesOnly);
      
      // Update button text
      const icon = this.querySelector('i');
      const textSpan = this.querySelector('span') || this.childNodes[this.childNodes.length - 1];
      if (showFavoritesOnly) {
        if (textSpan.nodeType === Node.TEXT_NODE) {
          textSpan.textContent = ' Показать все';
        }
      } else {
        if (textSpan.nodeType === Node.TEXT_NODE) {
          textSpan.textContent = ' Избранное';
        }
      }
    });
  }
}

// Set up auto-update toggle
function setupAutoUpdateToggle() {
  const autoUpdateBtn = document.getElementById('auto-update-toggle');
  if (autoUpdateBtn) {
    autoUpdateBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      const isActive = this.classList.contains('active');
      window.rssFeed.setAutoUpdate(isActive);
      
      // Update button appearance
      const icon = this.querySelector('i');
      if (isActive) {
        icon.classList.remove('fa-sync');
        icon.classList.add('fa-sync');
      } else {
        icon.classList.remove('fa-sync');
        icon.classList.add('fa-pause');
      }
    });
  }
}

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Export for global access
window.updateRSSLocalization = updateRSSLocalization; 