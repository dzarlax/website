# Personal Website Repository

## Overview
This repository contains the source code for a personal portfolio website managed by Alexey Panfilov (dzarlax). The codebase includes HTML, CSS, and JavaScript files for a modern, responsive personal website with multilingual support.

## 🌟 Key Features
- **Multi-language Support**: Full localization for English, Russian, and Serbian
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Automatic theme switching based on user preference
- **Dynamic Projects**: JSON-based project showcase with localized content
- **RSS News Feed**: Real-time news feed integration
- **Performance Optimized**: Service Worker, lazy loading, and optimized assets
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🚀 Recent Updates
- ✅ **Localized Footer**: Added fully localized footer with navigation links
- ✅ **Fixed Projects Section**: Resolved project loading issues with proper JSON handling
- ✅ **Enhanced Localization**: Improved translation system for nested content
- ✅ **Mobile Optimization**: Better responsive design for mobile devices

## 📁 Project Structure

### Root Files
- `index.html` - Main HTML file with semantic structure
- `style.css` - Primary stylesheet with CSS custom properties
- `projects.json` - Project data with multilingual content
- `manifest.json` - PWA manifest file
- `sw.js` - Service Worker for offline functionality
- `feed.html` - RSS feed reader page
- `news.html` - News aggregation page

### `/web` Directory
- `localization.js` - Multilingual translation system
- `theme.js` - Dark/light theme management
- `contacts.js` - Contact form and social links handler
- `projects.js` - Dynamic project loading and display
- `animation.js` - Scroll animations and visual effects
- `optimization.js` - Performance optimizations
- `features.js` - Feature toggle system
- `vitals.js` - Web vitals monitoring

### `/rss` Directory
- `RSSFeed.js` - Main RSS feed class
- `fetchRSSFeed.js` - RSS data fetching logic
- `pagination.js` - Feed pagination functionality
- `display.js` - Feed item rendering
- `init.js` - RSS system initialization
- `/articles` - Article detail pages and styles

### `/config` Directory
- `features.json` - Production feature configuration
- `features-dev.json` - Development feature configuration
- `features-minimal.json` - Minimal feature set

## 🛠️ Setup & Development

### Prerequisites
- Modern web browser with ES6+ support
- HTTP server (for AJAX requests)

### Local Development
1. Clone the repository
2. Start a local HTTP server:
   ```bash
   python3 -m http.server 8000
   # or
   npx serve .
   ```
3. Navigate to `http://localhost:8000`

### RSS Feed Integration
To use the RSS functionality:

```html
<script type="module" src="rss/init.js"></script>
```

The RSS system automatically loads and displays feeds in elements with ID `rss-feed`.

### Project Configuration
Projects are managed through `projects.json` with the following structure:

```json
{
  "id": "unique-project-id",
  "title_en": "English Title",
  "title_ru": "Русский заголовок",
  "title_rs": "Српски наслов",
  "description_en": "English description",
  "description_ru": "Русское описание",
  "description_rs": "Српски опис",
  "link": "https://github.com/user/repo",
  "tags_en": ["Tag1", "Tag2"],
  "tags_ru": ["Тег1", "Тег2"],
  "tags_rs": ["Таг1", "Таг2"]
}
```

## 🌐 Localization
The website supports three languages:
- **English (en)** - Default language
- **Russian (ru)** - Full translation
- **Serbian (rs)** - Full translation

### Adding New Translations
1. Update `web/localization.js` with new translation keys
2. Add corresponding HTML `data-lang` attributes
3. The system automatically updates content on language switch

## 🎨 Theming
The website uses CSS custom properties for theming:
- Automatic dark/light mode detection
- Manual theme toggle available
- Consistent color scheme across all components

## 📱 Progressive Web App
The website includes PWA features:
- Service Worker for offline functionality
- Web App Manifest for installation
- Responsive design for all screen sizes

## 🔧 Feature Toggles
Features can be controlled through configuration files:
- Enable/disable sections dynamically
- A/B testing capabilities
- Performance optimization options

## 📊 Performance
- Lazy loading for images and content
- Minified and optimized assets
- Service Worker caching
- Web vitals monitoring

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different browsers and devices
5. Submit a pull request

## 📄 License
This project is for personal use. All rights reserved.

## 📞 Contact
- **GitHub**: [dzarlax](https://github.com/dzarlax)
- **LinkedIn**: [Alexey Panfilov](https://linkedin.com/in/alexey-panfilov)
- **Website**: [dzarlax.dev](https://dzarlax.dev)

