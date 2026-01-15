# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Local Development Server
Due to AJAX requests and module loading, a local HTTP server is required:

```bash
# Python 3
python3 -m http.server 8000

# Node.js (npx serve)
npx serve .

# Navigate to
open http://localhost:8000
```

### Testing
- Test RSS functionality: Access `/feed.html` after starting the local server
- Test PWA features: Use Chrome DevTools Application tab
- Test responsiveness: Use browser DevTools device emulation

## Architecture Overview

This is a vanilla JavaScript personal portfolio website with no build system or framework. The architecture is modular with clear separation of concerns.

### Module Loading Pattern
Scripts are loaded in `index.html` in a specific order:
1. `web/features.js` - Feature toggle system (must load first)
2. `web/theme.js` - Dark/light theme management
3. `web/localization.js` - Multi-language support (en/ru/rs)
4. `web/contacts.js` - Contact form handlers
5. `web/animation.js` - Scroll animations
6. `web/projects.js` - Dynamic project loading from JSON
7. `web/vitals.js` - Performance monitoring

### Feature Toggle System
The `web/features.js` module implements a comprehensive feature management system:
- Loads configuration from `config/features.json` (or `features-dev.json` for development)
- Controls visibility of page sections (intro, skills, experience, achievements, projects, contact)
- Automatically shows/hides navigation links based on enabled features
- Supports runtime feature toggling via `window.featureManager`

### Localization Architecture
The `web/localization.js` module handles multilingual content:
- Supports English (en), Russian (ru), and Serbian (rs)
- Uses `data-lang` attributes on HTML elements for automatic translation
- Stores language preference in `localStorage`
- Nested translation keys (e.g., `intro.title`, `skills.items[0].description`)
- Dynamically updates content on language switch without page reload

### Project Data System
Projects are stored in `projects.json` with a specific structure:
- Each project has unique `id`, localized `title_*`, `description_*`, `tags_*` fields
- Projects are dynamically rendered by `web/projects.js` into `#projects-container`
- Use placeholder images from `via.placeholder.com` or S3-hosted images

### RSS Feed System
Located in `/rss/` directory with modular architecture:
- `RSSFeed.js` - Core RSS feed class
- `enhanced-rss.js` - Enhanced RSS with filtering, search, pagination
- `fetchRSSFeed.js` - Network layer for fetching RSS data
- `display.js` - Rendering logic for feed items
- `pagination.js` - Pagination controls
- `enhanced-init.js` - Initializes the RSS system
- Loaded via ES6 modules: `<script type="module" src="rss/enhanced-init.js"></script>`

### Service Worker
PWA features implemented in `sw.js`:
- Static file caching for offline support
- Stale-while-revalidate strategy for external resources
- Background sync for analytics
- Push notification support (prepared but not actively used)
- Cache versioning: `STATIC_CACHE = 'static-v1.2'`

## Content Management

### Adding a New Project
Edit `projects.json`:
```json
{
  "id": "unique-id",
  "title_en": "English Title",
  "title_ru": "Русский заголовок",
  "title_rs": "Српски наслов",
  "description_en": "English description",
  "description_ru": "Русское описание",
  "description_rs": "Српски опис",
  "image": "https://example.com/image.png",
  "link": "https://github.com/user/repo",
  "tags_en": ["Tag1", "Tag2"],
  "tags_ru": ["Тег1", "Тег2"],
  "tags_rs": ["Таг1", "Таг2"]
}
```

### Adding Translations
Edit `web/localization.js`:
1. Add keys to the `translations` object for each language
2. Add `data-lang="key.path"` attribute to HTML elements
3. The system automatically updates content on language change

### Feature Configuration
Edit `config/features.json`:
```json
{
  "features": {
    "intro": { "enabled": true },
    "projects": { "enabled": true }
  },
  "navigation": {
    "showDisabledSections": false,
    "animateToggle": true
  },
  "debug": {
    "showFeatureStatus": false,
    "logToggleActions": false
  }
}
```

## Key Technical Details

### Theme System
- CSS custom properties for colors (defined in `style.css`)
- `prefers-color-scheme` media query for automatic dark/light mode
- Manual toggle via `.theme-toggle` button
- Preference saved to `localStorage`

### Animation System
- Scroll-triggered animations via `.reveal` class
- Elements fade in when they enter viewport
- Implemented in `web/animation.js`
- Uses Intersection Observer for performance

### Performance Optimizations
- Service Worker caching
- Lazy loading for images
- Preconnect to external domains (Google Fonts, CDN, S3)
- Font Awesome from CDN
- Web Vitals monitoring via `web/vitals.js`

## File Structure Notes

### Root Directory
- `index.html` - Main page (single-page application)
- `feed.html` - RSS feed reader (standalone page)
- `news.html` - News article viewer (standalone page)
- `style.css` - Global stylesheet with CSS custom properties
- `projects.json` - Project data source
- `manifest.json` - PWA manifest
- `sw.js` - Service Worker

### `/web` Directory
Core JavaScript modules loaded by main page.

### `/rss` Directory
RSS feed system modules loaded as ES6 modules by `feed.html`.

### `/config` Directory
- `features.json` - Production feature config
- `features-dev.json` - Development feature config
- `features-minimal.json` - Minimal feature set

### External Resources
- Fonts: Google Fonts (Inter)
- Icons: Font Awesome 6.4.0 (CDN)
- Images: S3 bucket at `https://s3.dzarlax.dev/`

## Important Conventions

- Language codes: `en`, `ru`, `rs` (not `sr` for Serbian)
- All scripts use vanilla JavaScript (no frameworks)
- CSS uses BEM-like naming for components
- Localization keys use dot notation (e.g., `menu.home`)
- Feature names match section IDs in HTML
- Cache versioning uses semantic versioning (v1.2, v1.3)
