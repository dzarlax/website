import EnhancedRSSFeed from './enhanced-rss.js';

// Attach the enhanced RSS feed to the window object
window.rssFeed = new EnhancedRSSFeed('https://s3.dzarlax.dev/articles/feed_300.xml', 'rss-feed');

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the RSS feed
  window.rssFeed.fetchRSSFeed();
  
  // Apply current localization
  const currentLang = localStorage.getItem('preferredLanguage') || 'en';
  updateRSSLocalization(currentLang);
});

// Listen for language changes
document.addEventListener('languageChanged', (event) => {
  const newLang = event.detail.language;
  updateRSSLocalization(newLang);
});

// Function to update RSS localization
function updateRSSLocalization(lang) {
  // Load translations
  fetch('./web/localization.js')
    .then(response => response.text())
    .then(text => {
      // Extract translations from the localization file
      const translations = extractTranslations(text, lang);
      
      // Update UI elements
      updateUITranslations(translations);
    })
    .catch(error => {
      console.error('Error loading translations:', error);
    });
}

// Extract translations from localization file
function extractTranslations(jsContent, lang) {
  try {
    // This is a simplified approach - in production, you'd want a more robust parser
    const langStart = jsContent.indexOf(`${lang}: {`);
    if (langStart === -1) return {};
    
    const langEnd = jsContent.indexOf('},', langStart);
    const langContent = jsContent.substring(langStart, langEnd);
    
    // Extract RSS translations
    const rssStart = langContent.indexOf('rss: {');
    if (rssStart === -1) return {};
    
    const rssEnd = langContent.indexOf('}', rssStart);
    const rssContent = langContent.substring(rssStart + 6, rssEnd);
    
    // Parse the RSS translations (simplified parsing)
    const translations = {};
    const lines = rssContent.split('\n');
    
    lines.forEach(line => {
      const match = line.match(/(\w+):\s*['"]([^'"]+)['"]/);
      if (match) {
        translations[match[1]] = match[2];
      }
    });
    
    return translations;
  } catch (error) {
    console.error('Error parsing translations:', error);
    return {};
  }
}

// Update UI translations
function updateUITranslations(translations) {
  // Update page title
  if (translations.title) {
    document.title = translations.title;
    const headerTitle = document.querySelector('.site-header h1');
    if (headerTitle) {
      headerTitle.textContent = translations.title;
    }
  }
  
  // Update placeholder text
  if (translations.search_placeholder) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.placeholder = translations.search_placeholder;
    }
  }
  
  // Update buttons
  const backToHome = document.getElementById('back-to-home');
  if (backToHome && translations.back_to_home) {
    backToHome.innerHTML = `<i class="fas fa-home"></i> ${translations.back_to_home}`;
  }
  
  // Update filter options
  const filterSelect = document.getElementById('date-filter');
  if (filterSelect && translations.filters) {
    const options = filterSelect.querySelectorAll('option');
    options.forEach(option => {
      const key = option.value;
      if (translations.filters && translations.filters[key]) {
        option.textContent = translations.filters[key];
      }
    });
  }
  
  // Update view buttons
  const favoritesBtn = document.getElementById('show-favorites');
  if (favoritesBtn) {
    favoritesBtn.innerHTML = `<i class="fas fa-heart"></i> ${translations.favorites || 'Favorites'}`;
  }
  
  // Update all elements with data-lang attributes
  document.querySelectorAll('[data-lang^="rss."]').forEach(element => {
    const key = element.getAttribute('data-lang').replace('rss.', '');
    if (translations[key]) {
      element.textContent = translations[key];
    }
  });
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