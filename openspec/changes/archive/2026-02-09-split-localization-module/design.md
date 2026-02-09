# Split Localization Module Design

## Context

### Current State

The `web/localization.js` file is a 1269-line monolithic module containing:
- **Skill icons mapping** (lines 2-27): Map of skill titles to Font Awesome icon classes
- **Translation data** (lines 30-828): Complete translations for 3 languages (en, ru, rs)
  - English: ~270 lines
  - Russian: ~270 lines
  - Serbian: ~270 lines
- **Core logic** (lines 831-1269): Functions for language switching, content updates, typing animations

The file is loaded synchronously in `<head>` of `index.html`:
```html
<script src="web/localization.js"></script>
```

This means all users download all translation data (~800 lines) even though they only need one language.

### Constraints

- **No build system**: Vanilla JavaScript, no webpack/vite/rollup
- **Browser support**: Modern browsers (Chrome 112+, Safari 16.5+, Firefox 117+)
- **Backward compatibility**: Existing API must work without breaking changes
- **Dependencies**: `web/projects.js` may access `window.translations` object
- **Event system**: Uses `CustomEvent('languageChanged')` for inter-module communication

### Stakeholders

- **Users**: Faster initial page load, smaller download
- **Developers**: Clearer module separation, easier to maintain translations
- **Performance**: Improved FCP and reduced memory usage

## Goals / Non-Goals

**Goals:**
1. Reduce initial bundle size by 70-80% (load only needed language)
2. Implement lazy loading for translation data
3. Maintain 100% backward compatibility with existing API
4. Improve caching (each language cached separately)
5. Keep code readable and maintainable

**Non-Goals:**
- Changing the localization API or function signatures
- Adding a build system or bundler
- Supporting legacy browsers (IE11, old Safari)
- Changing how language preferences are stored (localStorage)

## Decisions

### 1. Module Structure

**Decision:** Split into 5 ES modules using native JavaScript `import()`

**Modules:**
```
web/
├── localization-core.js      # ~400 lines - core logic only
├── localization-data-en.js   # ~270 lines - English translations
├── localization-data-ru.js   # ~270 lines - Russian translations
├── localization-data-rs.js   # ~270 lines - Serbian translations
└── skill-icons.js            # ~25 lines - icon mapping (optional)
```

**Why this structure:**
- **Core module** stays small and fast to load
- **Data modules** are loaded on-demand based on user preference
- **Icons** are needed immediately (used in `setupSkills()`), so loaded with core or separately
- Follows separation of concerns: logic vs data
- Each language can be cached independently by browser

**Alternatives considered:**
- ❌ **Single file with conditional exports**: Still loads all data, no benefit
- ❌ **JSON files for translations**: Would require fetch() + parse(), more complex
- ❌ **Build-time code splitting**: Requires build tools (non-goal)

### 2. Dynamic Import Strategy

**Decision:** Use native `import()` for lazy loading translation data

**Implementation pattern:**
```javascript
// In localization-core.js
let translations = {}; // Start empty

async function loadLanguage(lang) {
    if (translations[lang]) {
        return translations[lang]; // Already loaded
    }

    const module = await import(`./localization-data-${lang}.js`);
    translations[lang] = module.default;
    return module.default;
}

async function switchLang(lang) {
    const data = await loadLanguage(lang);
    updateContent(data);
    // ... rest of logic
}
```

**Why:**
- Native browser support (no polyfills needed)
- Automatic code splitting by browser
- Built-in caching (browser caches each module separately)
- Clean async/await syntax

**Alternatives considered:**
- ❌ **fetch() + eval()**: Security risk, no caching benefits
- ❌ **Script injection**: Harder to manage, timing issues
- ❌ **SystemJS**: Unnecessary dependency

### 3. Initial Load Strategy

**Decision:** Load core + default language immediately, lazy load others

**Implementation:**
```javascript
// In index.html - replace current script
<script type="module">
    import { initLocalization } from './web/localization-core.js';

    // Detect preferred language
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';

    // Initialize with default language
    initLocalization(savedLang);
</script>
```

**In `localization-core.js`:**
```javascript
import skillIcons from './skill-icons.js'; // Load immediately (small file)
import enTranslations from './localization-data-en.js'; // Default language

let translations = {
    en: enTranslations
};

export function initLocalization(lang) {
    if (lang !== 'en') {
        loadLanguage(lang); // Async load other languages
    }
    updateContent(translations[lang] || translations.en);
}
```

**Why:**
- English is most common (safe default)
- Core + English ~400 lines (vs 1269 lines before = 68% reduction)
- Other languages load async if needed
- No visible delay for most users

**Alternatives considered:**
- ❌ **Load nothing initially**: Shows empty content until language loads (bad UX)
- ❌ **Detect browser language first**: Adds complexity, detection not always accurate
- ✅ **Accept English as default**: Simple, works for majority of users

### 4. Backward Compatibility

**Decision:** Maintain `window.translations` global object for other modules

**Implementation:**
```javascript
// After loading language data
window.translations = translations; // Keep global reference

// Dispatch event for other modules
document.dispatchEvent(new CustomEvent('languageChanged', {
    detail: { language: lang }
}));
```

**Why:**
- `web/projects.js` may access `window.translations`
- Event system already exists and works
- Zero breaking changes to existing code

**Alternatives considered:**
- ❌ **Remove global, require imports**: Breaking change, risky
- ❌ **Export from module**: Requires updating all dependent modules

### 5. Loading State Management

**Decision:** Show minimal loading indicator only when switching languages

**Implementation:**
```javascript
async function switchLang(lang) {
    // Show loading state
    document.documentElement.classList.add('loading-language');

    try {
        const data = await loadLanguage(lang);
        updateContent(data);
    } finally {
        document.documentElement.classList.remove('loading-language');
    }
}
```

**CSS:**
```css
html.loading-language body {
    cursor: wait;
}

html.loading-language [data-lang] {
    opacity: 0.7;
}
```

**Why:**
- Minimal visual disruption
- Only shows when actively switching languages (rare action)
- Cursor change indicates loading state
- No need for progress bars (fast enough)

**Alternatives considered:**
- ❌ **Full-screen loader**: Overkill, blocks page
- ❌ **Spinner in header**: Too visible for rare action
- ✅ **Subtle opacity + cursor**: Professional and unobtrusive

## Risks / Trade-offs

### Risk 1: FOUC (Flash of Unstyled Content) on language switch

**Risk:** When user switches language, there may be a brief moment where old content is visible before new translations load.

**Mitigation:**
- Show loading state (cursor + opacity) during switch
- Keep transition fast (translations are small ~270 lines = ~10KB gzipped)
- Preload adjacent languages if user switches frequently (optional optimization)

**Acceptable because:** Language switching is a rare action (usually once per session)

### Risk 2: Network failure when loading translation

**Risk:** If network fails during async load, user sees no translations.

**Mitigation:**
- Fallback to English if load fails: `try { load(lang) } catch { load('en') }`
- Cache loaded translations in memory (no re-fetch)
- Consider service worker for offline support (future enhancement)

**Acceptable because:** Network failures are rare, English fallback is reasonable

### Risk 3: Breaking dependencies on `window.translations`

**Risk:** Other modules (like `projects.js`) may access `window.translations` before it's loaded.

**Mitigation:**
- Initialize `window.translations` with English data synchronously
- Update global object after each language load
- Keep event system working for reactive updates

**Acceptable because:** We're keeping the global object, just populating it differently

### Trade-off: Multiple HTTP requests vs single file

**Trade-off:** Splitting into 5 modules means more HTTP requests (1 core + 1 data vs 1 file).

**Mitigation:**
- Browser caches each module separately (long-term win)
- HTTP/2 multiplexing makes multiple requests cheap
- Core + default language loads together (most common case)
- Translation files are small (~10KB each gzipped)

**Why acceptable:** Performance gain from lazy loading outweighs extra request cost

## Migration Plan

### Phase 1: Prepare Modules (30 minutes)
1. Create `web/skill-icons.js` - extract icon mapping
2. Create `web/localization-data-en.js` - extract English translations
3. Create `web/localization-data-ru.js` - extract Russian translations
4. Create `web/localization-data-rs.js` - extract Serbian translations
5. Create `web/localization-core.js` - new core with dynamic imports

### Phase 2: Update HTML (10 minutes)
1. Remove `<script src="web/localization.js"></script>` from `<head>`
2. Add module script with initialization:
   ```html
   <script type="module">
       import { initLocalization } from './web/localization-core.js';
       const lang = localStorage.getItem('preferredLanguage') || 'en';
       initLocalization(lang);
   </script>
   ```

### Phase 3: Testing (20 minutes)
1. Test initial page load (verify English loads correctly)
2. Test language switcher (verify async load works)
3. Test localStorage persistence
4. Test all three languages (en, ru, rs)
5. Check browser DevTools Network tab (verify lazy loading)
6. Test `web/projects.js` still works (if it uses `window.translations`)

### Phase 4: Deployment (5 minutes)
1. Commit changes with descriptive message
2. Push to GitHub
3. Verify GitHub Pages deployment
4. Test production environment

### Rollback Strategy

If issues arise:
1. Revert commit: `git revert <commit-hash>`
2. Force push to main
3. Old `localization.js` will be restored

**Low risk:** Changes are isolated to localization module, no database or server changes

## Open Questions

1. **Should we preload adjacent languages?**
   - Consideration: User who switches en→ru might switch again
   - Decision: Not initially (premature optimization), monitor usage

2. **Should we add loading spinner?**
   - Consideration: Language switch is fast (~100ms)
   - Decision: Subtle cursor change is enough (see Loading State Management)

3. **Should skill-icons.js be separate?**
   - Consideration: Only 25 lines, always needed
   - Decision: Yes - keeps core focused on localization logic, easier to maintain

4. **Service Worker for offline support?**
   - Consideration: Would allow offline language switching
   - Decision: Out of scope for this change, future enhancement
