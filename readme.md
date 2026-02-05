# Personal Website Repository

## Overview
This repository contains the source code for a personal portfolio website managed by Alexey Panfilov (dzarlax). The codebase includes HTML, CSS, and JavaScript files for a modern, responsive personal website with multilingual support.

## 🌟 Key Features
- **Multi-language Support**: Full localization for English, Russian, and Serbian
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices (768px breakpoint)
- **Dark/Light Theme**: Automatic theme switching based on user preference with HSL-based color system
- **Dynamic Projects**: JSON-based project showcase with localized content
- **Performance Optimized**: Lazy loading, optimized assets, Web Vitals monitoring
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Modern CSS**: Design tokens, systematic spacing, logical properties, CSS nesting

## 🚀 Recent Updates
- ✅ **Removed RSS/News Pages**: Deprecated feed.html and news.html for simplification
- ✅ **Enhanced CSS Architecture**: Implemented design tokens and systematic spacing
- ✅ **Improved Dark Mode**: High contrast colors for better readability
- ✅ **Feature Toggle Removal**: Simplified configuration system

## 📁 Project Structure

### Root Files
- `index.html` - Main HTML file with semantic structure
- `ai-workflow.html` - AI workflow documentation page
- `style.css` - Primary stylesheet with CSS custom properties (47 design tokens)
- `projects.json` - Project data with multilingual content
- `manifest.json` - PWA manifest file
- `sw.js` - Service Worker for offline functionality

### `/web` Directory
- `localization.js` - Multilingual translation system
- `theme.js` - Dark/light theme management
- `contacts.js` - Contact form and social links handler
- `projects.js` - Dynamic project loading and display
- `animation.js` - Scroll animations and visual effects
- `vitals.js` - Web vitals monitoring
- `optimization.js` - Performance optimizations
- `main.js` - Main application entry point
- `jspdf.min.js` - PDF generation library

### Documentation Files
- `CSS_ARCHITECTURE.md` - Detailed CSS design system documentation
- `EXPERIENCE_REFACTOR.md` - Before/after CSS refactoring example
- `CLAUDE.md` - Developer guide for Claude Code AI assistant

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

## 🎨 CSS Architecture

### Design Token System
The project uses a comprehensive design token system with:
- **HSL Color System**: `--brand-hue: 217` for easy theming
- **4px Spacing Grid**: `--s-1: 4px`, `--s-2: 8px`, `--s-6: 24px`
- **Typography Scale**: Modular scale with `--f-base: 1rem`
- **47 total CSS variables** as single source of truth

### Modern CSS Features
- **CSS Nesting** (~40% coverage)
- **Logical Properties** (~15% coverage) for RTL support
- **Component-based architecture** with BEM naming
- **Systematic spacing** - no magic numbers

### Layout Utilities
```css
.l-container { /* Max-width container */ }
.l-grid { /* CSS Grid layouts */ }
.l-section { /* Section spacing */ }
```

For detailed CSS architecture information, see `CSS_ARCHITECTURE.md`.

## 🌐 Localization
The website supports three languages:
- **English (en)** - Default language
- **Russian (ru)** - Full translation
- **Serbian (rs)** - Full translation

### Adding New Translations
1. Update `web/localization.js` with new translation keys
2. Add corresponding HTML `data-lang` attributes
3. The system automatically updates content on language switch via `languageChanged` event

### Translation Key Format
- Simple keys: `data-lang="projects_title"`
- Nested keys: `data-lang="menu.home"`, `data-lang="footer.copyright"`
- Array access: Handled programmatically for dynamic content

## 🎨 Theming
The website uses CSS custom properties for theming:
- HSL-based color system for easy theme customization
- Automatic dark/light mode detection via `prefers-color-scheme`
- Manual theme toggle available
- Consistent color scheme across all components
- High contrast in dark mode for accessibility

## 📱 Progressive Web App
The website includes PWA features:
- Service Worker for offline functionality
- Web App Manifest for installation
- Responsive design for all screen sizes

## 📊 Performance
- Lazy loading for images and content
- Minified and optimized assets
- Service Worker caching
- Web vitals monitoring via `web/vitals.js`
- Intersection Observer for performant scroll animations

## 🔧 Development Guidelines

### CSS Best Practices
1. **Always use design tokens** - No hardcoded values
2. **Prefer logical properties** - Use `inline-size` instead of `width` for RTL support
3. **Use CSS nesting** - Keep component styles together
4. **Follow BEM naming** - `.component__element--modifier`
5. **Test on mobile** - 768px breakpoint is critical

### JavaScript Conventions
- All vanilla JavaScript - no frameworks
- Event-driven architecture with custom events
- Security first - always escape user-generated content
- Modular design - independent modules

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
