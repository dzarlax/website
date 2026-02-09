# Lazy Localization Specification

## ADDED Requirements

### Requirement: Dynamic language module loading
The system SHALL load translation data dynamically using ES module imports, loading only the language data that is needed by the user.

Translation modules SHALL be structured as:
- `localization-core.js` - Core localization logic and functions
- `localization-data-en.js` - English translation data
- `localization-data-ru.js` - Russian translation data
- `localization-data-rs.js` - Serbian translation data
- `skill-icons.js` - Skill icon mapping data

#### Scenario: Initial page load with preferred language
- **WHEN** page loads for the first time
- **THEN** system loads core module + default language (English) synchronously
- **AND** system checks localStorage for preferred language
- **AND** if preferred language differs from English, system loads that language asynchronously

#### Scenario: Initial page load without preferred language
- **WHEN** page loads and no language preference is stored
- **THEN** system loads English translation data by default
- **AND** page renders immediately with English content

#### Scenario: Switching to already-loaded language
- **WHEN** user switches to a language that is already loaded in memory
- **THEN** system updates content immediately without additional network requests
- **AND** content changes instantaneously

#### Scenario: Switching to unloaded language
- **WHEN** user switches to a language that is not yet loaded
- **THEN** system asynchronously imports the language module
- **AND** system shows loading state during import
- **AND** system updates content after module loads successfully
- **AND** system caches loaded language in memory for subsequent switches

### Requirement: Initial bundle size reduction
The system SHALL reduce the initial JavaScript bundle size by loading only core logic and one language instead of all translation data.

Initial load SHALL include:
- Core localization module (~400 lines)
- Default language translation data (~270 lines for English)
- Skill icons mapping (~25 lines)

Initial load SHALL NOT include:
- Translation data for languages not currently in use

#### Scenario: First contentful paint measurement
- **WHEN** page loads for the first time
- **THEN** initial JavaScript bundle is approximately 700 lines (core + one language)
- **AND** this represents a 45% reduction from current 1269 lines
- **AND** First Contentful Paint (FCP) improves due to smaller bundle

#### Scenario: Memory usage measurement
- **WHEN** page loads with one language selected
- **THEN** memory usage is proportional to loaded languages
- **AND** unused language data is not loaded into memory

### Requirement: Browser caching optimization
The system SHALL structure translation modules as separate ES modules to enable independent browser caching.

Each language module SHALL be cached separately by the browser with its own cache key.

#### Scenario: Cache hit on subsequent page loads
- **WHEN** user loads page for the second time with same language preference
- **THEN** browser serves core module from cache
- **AND** browser serves language module from cache
- **AND** no additional network requests are made for translation data

#### Scenario: Cache invalidation after language switch
- **WHEN** user switches to a different language
- **THEN** browser fetches new language module from network (if not cached)
- **AND** previously cached language modules remain available for future use

#### Scenario: Different users on same device
- **WHEN** user A loads page in English and then user B loads page in Russian on same device
- **THEN** browser serves core module from cache (shared)
- **AND** browser may serve Russian module from cache if user B previously loaded it
- **AND** language modules are cached independently

### Requirement: Backward compatibility with existing API
The system SHALL maintain the existing localization API without breaking changes to ensure compatibility with other modules.

The global `window.translations` object SHALL be populated with loaded translation data.

The `switchLang(lang)` function SHALL accept the same language codes ('en', 'ru', 'rs').

The `CustomEvent('languageChanged')` event SHALL be dispatched after language change.

#### Scenario: Accessing translations from other modules
- **WHEN** other modules (e.g., projects.js) access `window.translations`
- **THEN** the object contains translation data for currently loaded language
- **AND** the object structure matches the current format (nested objects with keys)

#### Scenario: Language change event handling
- **WHEN** language is changed using `switchLang(lang)`
- **THEN** system dispatches `CustomEvent('languageChanged', { detail: { language: lang } })`
- **AND** other modules can listen for this event to update their content

#### Scenario: Function signature compatibility
- **WHEN** existing code calls `switchLang('ru')`
- **THEN** function accepts the language code parameter
- **AND** function behavior matches current implementation (async load notwithstanding)

### Requirement: Loading state indication
The system SHALL provide visual feedback when language data is being loaded asynchronously.

Loading state SHALL be indicated by:
- Cursor change to `wait` on body element
- Opacity reduction on translatable content elements

#### Scenario: Visual feedback during language switch
- **WHEN** user switches to an unloaded language
- **THEN** cursor changes to `wait` immediately
- **AND** content elements show reduced opacity (0.7)
- **AND** loading indicators are removed after language module loads

#### Scenario: No loading state for cached language
- **WHEN** user switches to a language that is already loaded in memory
- **THEN** no loading indicators are shown
- **AND** content updates immediately

#### Scenario: Loading state on slow network
- **WHEN** language module loading takes more than 200ms due to slow network
- **THEN** loading indicators remain visible until load completes
- **AND** user can see that system is working (not frozen)

### Requirement: Fallback behavior for load failures
The system SHALL gracefully handle failures when loading language modules asynchronously.

If language module fails to load, system SHALL:
- Fall back to English translation data
- Log error to console for debugging
- Continue functioning without crashing

#### Scenario: Network failure during language load
- **WHEN** user switches to language and network request fails
- **THEN** system catches the error
- **AND** system falls back to English translations
- **AND** system logs error message to console
- **AND** page remains functional with English content

#### Scenario: Malformed language module
- **WHEN** loaded language module contains invalid JavaScript or data
- **THEN** system catches parsing errors
- **AND** system falls back to English translations
- **AND** system logs detailed error for debugging

#### Scenario: Missing language module
- **WHEN** requested language module does not exist (404 error)
- **THEN** system falls back to English translations
- **AND** system logs warning about missing module
- **AND** user sees English content instead of blank page

### Requirement: Language preference persistence
The system SHALL persist user's language preference in localStorage and load preferred language on initial page load.

Language preference SHALL be stored under key `preferredLanguage`.

#### Scenario: Saving language preference
- **WHEN** user switches language using `switchLang(lang)`
- **THEN** system saves language code to `localStorage.setItem('preferredLanguage', lang)`
- **AND** preference persists across browser sessions

#### Scenario: Loading saved preference on page load
- **WHEN** user returns to page after previously selecting a language
- **THEN** system reads `localStorage.getItem('preferredLanguage')`
- **AND** if saved language is 'ru' or 'rs', system loads that language module
- **AND** content renders in user's preferred language

#### Scenario: First-time visitor without preference
- **WHEN** user visits page for the first time (no localStorage preference)
- **THEN** system defaults to English language
- **AND** system does not show language selection prompt

#### Scenario: Browser language detection
- **WHEN** no localStorage preference exists
- **THEN** system may optionally detect browser language using `navigator.language`
- **AND** if detected language is supported ('ru', 'rs'), system loads that language
- **AND** if detected language is not supported, system defaults to English

### Requirement: ES module compatibility
The system SHALL use native ES modules (`import`/`export`) without requiring a build step or bundler.

All modules SHALL use ES module syntax for imports and exports.

#### Scenario: Module import syntax
- **WHEN** localization-core.js imports translation data
- **THEN** it uses dynamic import: `import('./localization-data-en.js')`
- **AND** it uses ES module export: `export function switchLang(lang)`

#### Scenario: Browser support
- **WHEN** page loads in modern browsers (Chrome 112+, Safari 16.5+, Firefox 117+)
- **THEN** ES module syntax is natively supported
- **AND** no polyfills or transpilation are required

#### Scenario: No build process required
- **WHEN** developer deploys changes to localization
- **THEN** no build step (webpack, vite, rollup) is required
- **AND** modules can be deployed directly to GitHub Pages
- **AND** development workflow remains simple (edit files, commit, push)
