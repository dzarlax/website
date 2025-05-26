# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a static personal portfolio website built with vanilla HTML, CSS, and JavaScript. The site supports multilingual content (English, Russian, Serbian) and features a modular JavaScript architecture.

### Core Structure

- **`index.html`** - Main landing page with all sections (header, intro, skills, experience, projects, contact)
- **`style.css`** - Main stylesheet with CSS custom properties for theming and responsive design
- **`projects.json`** - Data source for project cards with multilingual content
- **`news.html`** and **`feed.html`** - RSS feed reader pages

### JavaScript Modules

The site uses a modular approach with the following key modules:

- **`web/localization.js`** - Central localization system handling all translations and content updates
- **`web/theme.js`** - Dark/light theme toggle with system preference detection
- **`web/projects.js`** - Dynamic project card rendering from JSON data
- **`web/contacts.js`** - Contact button functionality
- **`web/animation.js`** - Scroll-based reveal animations and particle effects
- **`web/optimization.js`** - Performance optimizations

### RSS Feed System

Located in the `rss/` directory, this is a modular RSS reader:

- **`RSSFeed.js`** - Main class that orchestrates RSS functionality
- **`fetchRSSFeed.js`** - Handles RSS feed fetching and parsing
- **`pagination.js`** - Pagination logic for RSS items
- **`display.js`** - Rendering RSS items to DOM
- **`init.js`** - Initializes RSS feed on news pages

## Key Patterns

### Localization System
- All text content is managed through the `translations` object in `localization.js`
- Elements use `data-lang` attributes for automatic content updates
- Language switching triggers a `languageChanged` custom event that other modules listen to
- Current language stored in `localStorage.preferredLanguage`

### Theme System
- CSS custom properties enable dynamic theming
- Theme preference stored in `localStorage.theme`
- Supports system preference detection via `prefers-color-scheme`
- Dark mode controlled by `[dark-mode]` attribute on `documentElement`

### Event-Driven Architecture
- Uses custom events for module communication (e.g., `languageChanged`)
- DOM events handled at module level with proper cleanup

## Development Notes

- **No build process** - This is a static site served directly
- **No package.json** - Uses vanilla JavaScript with ES6 modules
- **Responsive design** - Mobile-first approach with breakpoints at 768px
- **Performance optimized** - Lazy loading, optimized animations, minimal dependencies
- **SEO friendly** - Semantic HTML, meta tags, structured data
- **Deployment** - Website runs on Github Pages

## File Dependencies

- `localization.js` is a core dependency that other modules rely on
- `projects.js` depends on `projects.json` and `localization.js`
- RSS modules have internal dependencies: `RSSFeed.js` imports all other RSS modules
- All modules are loaded via script tags in `index.html`

## External Dependencies

- Font Awesome icons (CDN)
- Google Fonts (Inter font family)
- Yandex Metrika analytics
- No npm packages or build tools required