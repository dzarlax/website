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
- Test responsiveness: Use browser DevTools device emulation
- Test SEO: Check meta tags and structured data with browser DevTools

### Deployment
- Push to `main` branch triggers automatic GitHub Pages deployment
- No build process required - static files deployed directly
- Workflow: `.github/workflows/deploy.yml`

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

**Critical**: `features.js` must load first as other modules may depend on `window.featureManager`. The loading order ensures proper initialization and prevents race conditions.

### Feature Toggle System
The `web/features.js` module implements a comprehensive feature management system:

**Core Architecture**:
- `FeatureManager` class with observer pattern for feature changes
- Loads configuration from `config/features.json` (production) or `features-dev.json` (development)
- Global instance at `window.featureManager`

**Key Features**:
- Controls visibility of page sections (intro, skills, experience, education, achievements, projects, contact)
- Automatically shows/hides navigation links based on enabled features
- Supports runtime feature toggling: `window.featureManager.toggleFeature('projects')`
- Observer pattern: `window.featureManager.onFeatureChange('projects', callback)`
- Debug mode with admin panel: Set `debug.showFeatureStatus: true` in config

**Feature States**:
- `isFeatureEnabled(name)` - Check if feature is enabled
- `enableFeature(name)` / `disableFeature(name)` - Explicitly set state
- `getEnabledFeatures()` / `getDisabledFeatures()` - List features by state

### Localization Architecture
The `web/localization.js` module handles multilingual content:

**System Design**:
- Supports English (en), Russian (ru), and Serbian (rs) - note: `rs` not `sr`
- Uses `data-lang` attributes on HTML elements for automatic translation
- Stores language preference in `localStorage` key `preferredLanguage`
- Nested translation keys using dot notation: `intro.title`, `skills.items[0].description`

**Key Functions**:
- `switchLang(lang)` - Main language switcher, updates all content and dispatches `languageChanged` event
- `updateContent(lang)` - Rebuilds dynamic sections (skills, experience, education)
- `updateLocalizedContent()` - Updates all `data-lang` attributes
- `setupSkills(lang)` - Rebuilds skills section with proper icons

**Event System**:
- Dispatches `CustomEvent('languageChanged', { detail: { language: lang } })` on language change
- Other modules listen for this to update their content (e.g., `web/projects.js`)

**Translation Keys**:
- Simple keys: `data-lang="projects_title"`
- Nested keys: `data-lang="menu.home"`, `data-lang="footer.copyright"`
- Array access: Handled programmatically in `updateContent()` for items

### Project Data System
Projects are stored in `projects.json` with a specific structure:

**Data Schema**:
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

**Loading Process**:
- `fetchProjects()` - Fetches and parses JSON with error handling
- `displayProjects()` - Main render function, shows skeleton loaders first
- `createProjectCard()` - Creates individual cards with XSS protection via `escapeHtml()`
- Listens for `languageChanged` event to re-render on language switch

**Security Note**: All user-facing content is escaped via `escapeHtml()` to prevent XSS attacks.

### RSS Feed System
Located in `/rss/` directory with modular ES6 architecture:

**Module Structure**:
- `RSSFeed.js` - Core RSS feed class (basic implementation)
- `enhanced-rss.js` - Enhanced RSS with filtering, search, pagination (extends base)
- `fetchRSSFeed.js` - Network layer for fetching RSS data
- `display.js` - Rendering logic for feed items
- `pagination.js` - Pagination controls
- `enhanced-init.js` - Initializes the enhanced RSS system

**Enhanced Features**:
- Caching with 5-minute expiry: Uses `localStorage` with base64-encoded key
- Search functionality: Filters by title and description
- Date filtering: Filter items by date range
- Favorites system: Persist favorite articles in localStorage
- Auto-update: Configurable auto-refresh interval
- Pagination: Configurable items per page

**Initialization**:
```html
<script type="module" src="rss/enhanced-init.js"></script>
```
Creates global `window.rssFeed` instance for debugging.

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
1. Add keys to the `translations` object for each language (en, ru, rs)
2. Add `data-lang="key.path"` attribute to HTML elements
3. For dynamic content, add logic in `updateContent()` function
4. The system automatically updates content on language change via `languageChanged` event

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

**Note**: Feature names must match section IDs in HTML (e.g., `#intro`, `#projects`).

## Key Technical Details

### Theme System
- CSS custom properties for colors (defined in `style.css`)
- `prefers-color-scheme` media query for automatic dark/light mode detection
- Manual toggle via `.theme-toggle` button
- Preference saved to `localStorage`
- Theme class applied to `<body>` element

### Animation System
- Scroll-triggered animations via `.reveal` class
- Elements fade in when they enter viewport using Intersection Observer
- Staggered animations using CSS custom property `--i` for delay
- Typing animation for intro title (disabled on mobile)
- Implemented in `web/animation.js`

### Event System
The codebase uses custom events for module communication:
- `languageChanged` - Dispatched when language changes, listened to by projects.js and other modules
- Check for existing event listeners before adding new ones to avoid duplicates

### Performance Optimizations
- Lazy loading for images
- Preconnect to external domains (Google Fonts, CDN, S3)
- Font Awesome from CDN with integrity check
- Web Vitals monitoring via `web/vitals.js`
- Skeleton loaders for async content loading
- Intersection Observer for scroll animations (performant)
- Minimal JavaScript for fast loading

## File Structure Notes

### Root Directory
- `index.html` - Main page (single-page application)
- `feed.html` - RSS feed reader (standalone page)
- `news.html` - News article viewer (standalone page)
- `style.css` - Global stylesheet with CSS custom properties
- `projects.json` - Project data source

### `/web` Directory
Core JavaScript modules loaded by main page. All use vanilla JS with no dependencies.

### `/rss` Directory
RSS feed system modules loaded as ES6 modules by `feed.html`. Modular architecture allows for easy extension.

### `/config` Directory
- `features.json` - Production feature config
- `features-dev.json` - Development feature config
- `features-minimal.json` - Minimal feature set

### External Resources
- Fonts: Google Fonts (Inter)
- Icons: Font Awesome 6.4.0 (CDN) with SRI
- Images: Stored in `assets/images/` directory

## Important Conventions

- **Language codes**: `en`, `ru`, `rs` (not `sr` for Serbian)
- **All scripts use vanilla JavaScript** (no frameworks, no build process)
- **CSS uses BEM-like naming** for components
- **Localization keys use dot notation** (e.g., `menu.home`, `footer.copyright`)
- **Feature names match section IDs** in HTML (e.g., `intro`, `projects`)
- **Event-driven architecture** - Use custom events for cross-module communication
- **Security first** - Always escape user-generated content with `escapeHtml()`
- **Mobile-first responsive design** - Test on mobile viewport (768px breakpoint)
