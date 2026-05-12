# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **hybrid site**:
- **Lander** at `/` — static `index.html` + `style.css` + `web/*.js`, hand-edited. Multilingual (en/ru/rs) via `localization-core.js`.
- **Hugo-powered blog** at `/articles/`, `/tags/`, `/index.xml` — generated. Content lives in an Obsidian vault **outside** this repo and is consumed as a **Hugo Module** from the public `github.com/dzarlax/blog-content` repo. Locally, the import is replaced with `$BLOG_VAULT` (defaults to `~/Projects/Documents/Personal/blog` on macOS or `/d/Documents/Personal/blog` on Windows) via `HUGO_MODULE_REPLACEMENTS`. Drafts live in the repo with `draft: true` — Hugo skips them at render time.

CI builds Hugo, drops Hugo's `index.html` (lander owns `/`), overlays static lander files, deploys the merged tree. See `.github/workflows/deploy.yml`. The legacy `bin/sync-content.sh → hugo/content/` flow survives as an escape hatch only — see [docs/MIGRATION-LEVEL2.md](docs/MIGRATION-LEVEL2.md).

### CI overlay collision rules

The deploy workflow has a fixed list `LANDER_FILES` (in `.github/workflows/deploy.yml`) — those files are `cp`-ed on top of the Hugo build, so **the lander always wins on filename conflicts**. Current list: `index.html, style.css, ai-workflow.html, ai-workflow.css, projects.json, humans.txt, llms.txt, robots.txt, sitemap.xml, CNAME, og-default.png` (+ directories `web`, `assets`, `.well-known`).

**Consequence:** any Hugo-generated file at one of these paths is silently overwritten in prod. If you need Hugo to ship something at a path that overlaps:
- emit it under a different name (e.g. Hugo sitemap → `/blog-sitemap.xml`, not `/sitemap.xml`)
- or move the lander-owned counterpart out of `LANDER_FILES` and let Hugo own that path

Current Hugo-owned alternate paths: `/blog-sitemap.xml` (declared in `hugo/hugo.toml` `[sitemap].filename`), `/articles/llms.txt` (Hugo `LLMS` output format opt-in via `content/articles/_index.md` frontmatter `outputs:`).

For detailed engineering reference: [OPERATIONS.md](OPERATIONS.md).
Personal writing workflow lives in the vault at `<vault>/_meta/blog-playbook.md`.

## Bootstrap on a new machine

Run once per machine. Works on macOS and Windows (use **Git Bash** on Windows for the `bin/*.sh` scripts — PowerShell is not supported).

1. **Install toolchain**
   - macOS: `brew install hugo go` (Hugo extended + Go 1.22+) + ensure Python 3 is available + install Obsidian.
   - Windows: `winget install Hugo.Hugo.Extended GoLang.Go Git.Git Python.Python.3.12` + install Obsidian. Use Git Bash for all script invocations.
2. **Clone the repo**
   ```bash
   git clone <repo-url> website && cd website
   ```
3. **Point scripts at the vault**
   The Obsidian vault is the source of truth for blog content and is **not committed** to this repo (it lives in the private `dzarlax/blog-content` repo and is checked out separately as your working copy). Either set `BLOG_VAULT` in your shell profile (`~/.zshrc` / `~/.bashrc`) or copy `.env.example → .env` and edit it.
   ```bash
   # macOS example
   export BLOG_VAULT="$HOME/Projects/Documents/Personal/blog"
   # Windows Git Bash example
   export BLOG_VAULT="/d/Documents/Personal/blog"
   ```
   Default probe order is in [bin/lib/vault.sh](bin/lib/vault.sh). First existing path wins.
4. **Get the vault content onto this machine**
   The vault lives at `git@github.com:dzarlax/blog-content.git` (public). Clone it to `$BLOG_VAULT` and keep it as a normal git working copy — Obsidian opens it as a vault, while Hugo reads it via the module replacement during local preview. Confirm `$BLOG_VAULT/articles/` and `$BLOG_VAULT/tags/` exist before continuing.
5. **Install the pre-commit hook**
   ```bash
   bin/install-git-hooks.sh
   ```
   Lints article frontmatter (description, tags, date, draft) before allowing a commit.
6. **Verify the pipeline end-to-end**
   ```bash
   bin/preview.sh build      # build only, no serve
   bin/preview.sh            # build + serve at http://localhost:8000/
   ```
   Hit `http://localhost:8000/articles/` — if articles render, you're done.

If `bin/preview.sh` fails with "Vault not found", `BLOG_VAULT` is wrong or the vault isn't on this machine yet — fix one of those. If it errors on the module fetch, you probably don't have Go installed.

## Development Commands

### Local preview (recommended)
The merged lander + blog preview at `localhost:8000`, mirroring CI:

```bash
bin/preview.sh                # Hugo build (module replaced with $BLOG_VAULT) + lander overlay + serve
bin/preview.sh build          # build only (output in dist-preview/)
```

The vault is loaded as a Hugo Module — `bin/preview.sh` automatically sets `HUGO_MODULE_REPLACEMENTS=github.com/dzarlax/blog-content -> $BLOG_VAULT` so you read from your working copy without committing or pushing anything.

### Hugo blog only (fastest template/CSS iteration)

```bash
cd hugo && hugo server --disableFastRender
# http://localhost:1313/articles/  — blog only, no lander
```

### Lander only (rare — if editing static files)

```bash
python3 -m http.server 8000   # from repo root
# http://localhost:8000/ — lander served raw, no Hugo content
```

### Testing
- Test responsiveness: Use browser DevTools device emulation (768px breakpoint)
- Test SEO: Check meta tags and structured data with browser DevTools
- Test theme switching: Toggle dark/light mode and verify localStorage persistence

### Deployment
- Push to `main` branch triggers automatic GitHub Pages deployment
- No build process required - static files deployed directly
- Workflow: `.github/workflows/deploy.yml`

## Architecture Overview

This is a vanilla JavaScript personal portfolio website with no build system or framework. The architecture is modular with clear separation of concerns and follows modern CSS best practices.

### CSS Architecture Principles

The project uses a **token-based design system** with systematic spacing and modern CSS features:

**Design Tokens** (resolved from `dzarlax/design-system` CDN, see `:root` bridges in `style.css` + `hugo/assets/css/site.css`):
- **Monochrome editorial palette** (current DS state — replaces the old `--brand-hue: 217` blue tokens that older comments reference):
  - Light: `--bg #FCFAF7` (ivory), `--text/--accent #1A1A1E` (graphite)
  - Dark:  `--bg #1A1D21`, `--text #F5F5F5`
  - OG images, theme-color meta, and any new branded surface should pull from these values
- **Spacing Scale**: 4px grid system - `--s-1: 4px`, `--s-2: 8px`, `--s-6: 24px`, etc.
- **Typography Scale**: Modular scale with `--f-base: 1rem`, `--f-ratio: 1.2`
- **47 total CSS variables** as single source of truth

**Layout Utilities** (`.l-*` prefix):
- `.l-container` - Max-width container with logical properties
- `.l-grid` - CSS Grid layouts
- `.l-section` - Section-level spacing

**Modern CSS Features**:
- **CSS Nesting** (~40% coverage, target: 90%)
- **Logical Properties** (~15% coverage, target: 85%)
  - Use `inline-size/block-size` instead of `width/height`
  - Use `margin-inline` instead of `margin-left/right`
  - Use `inset-inline-start` instead of `left`
  - Enables RTL support for Arabic/Hebrew

**Component Patterns**:
- BEM-like naming: `.component__element--modifier`
- Partial nesting: `footer { &::before { } .footer-content { } }`
- Systematic spacing: All values use `var(--s-*)` tokens, no magic numbers

**Migration Notes**:
- Target state: 60% smaller CSS file size through consolidation
- See `CSS_ARCHITECTURE.md` for detailed optimization roadmap
- See `EXPERIENCE_REFACTOR.md` for before/after refactoring example

### Module Loading Pattern
Scripts are loaded in `index.html` in the following order:
1. `web/theme.js` - Dark/light theme management
2. `web/localization.js` - Multi-language support (en/ru/rs)
3. `web/contacts.js` - Contact form handlers
4. `web/animation.js` - Scroll animations
5. `web/projects.js` - Dynamic project loading from JSON
6. `web/vitals.js` - Performance monitoring

All modules are independent and can be loaded in any order.

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

### CSS Development Guidelines
When adding or modifying styles:

1. **Always use design tokens** - No hardcoded values:
   ```css
   /* ✅ Good */
   padding: var(--s-6);
   margin-block-end: var(--s-4);

   /* ❌ Bad */
   padding: 24px;
   margin-bottom: 16px;
   ```

2. **Prefer logical properties** for RTL support:
   ```css
   /* ✅ Good */
   inline-size: 100%;
   margin-inline: auto;
   inset-inline-start: 0;

   /* ❌ Avoid */
   width: 100%;
   margin-left: auto;
   left: 0;
   ```

3. **Use CSS nesting** for component organization:
   ```css
   /* ✅ Good - Nested */
   .project-card {
       background: var(--bg-secondary);

       &:hover {
           transform: translateY(-4px);
       }

       &__title {
           font-size: var(--f-h3);
       }
   }

   /* ❌ Avoid - Fragmented */
   .project-card { }
   .project-card:hover { }
   .project-card__title { }
   ```

4. **Follow BEM naming** for components:
   - Block: `.component`
   - Element: `.component__element`
   - Modifier: `.component__element--modifier`
   - Layout utilities: `.l-container`, `.l-grid`
   - Utilities: `.u-stagger`, `.u-hidden`

## Key Technical Details

### Theme System
- CSS custom properties for colors (defined in `style.css`)
- HSL-based color system with `--brand-hue` for easy theme changes
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
- `ai-workflow.html` - AI workflow documentation page
- `style.css` - Global stylesheet with CSS custom properties
- `projects.json` - Project data source

### `/web` Directory
Core JavaScript modules loaded by main page. All use vanilla JS with no dependencies.

### External Resources
- Fonts: Google Fonts (Inter)
- Icons: Font Awesome 6.4.0 (CDN) with SRI
- Images: Stored in `assets/images/` directory

### Removed Files (Deprecated)
The following files have been removed from the codebase:
- `feed.html` - RSS feed reader (deprecated)
- `news.html` - News article viewer (deprecated)
- `web/features.js` - Feature toggle system (simplified)
- `/config` directory - Feature configuration files (simplified)

## Important Conventions

- **Language codes**: `en`, `ru`, `rs` (not `sr` for Serbian)
- **All scripts use vanilla JavaScript** (no frameworks, no build process)
- **CSS uses BEM-like naming** for components
- **CSS uses systematic spacing** based on 4px grid
- **Localization keys use dot notation** (e.g., `menu.home`, `footer.copyright`)
- **Event-driven architecture** - Use custom events for cross-module communication
- **Security first** - Always escape user-generated content with `escapeHtml()`
- **Mobile-first responsive design** - Test on mobile viewport (768px breakpoint)
- **Design tokens first** - Always use CSS variables, never hardcode values
- **Logical properties preferred** - Use `inline-size` instead of `width` for RTL support
- **CSS nesting preferred** - Nest component styles for better organization
