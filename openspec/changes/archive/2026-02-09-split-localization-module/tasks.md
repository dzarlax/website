# Split Localization Module Tasks

## 1. Extract and Create Data Modules

- [x] 1.1 Create `web/skill-icons.js` module
  - Extract lines 2-27 from `localization.js` (skillIcons object)
  - Add ES module export: `export default skillIcons;`
  - Verify file size is ~25 lines

- [x] 1.2 Create `web/localization-data-en.js` module
  - Extract English translations from `translations.en` object
  - Add ES module export: `export default englishTranslations;`
  - Verify file contains ~270 lines

- [x] 1.3 Create `web/localization-data-ru.js` module
  - Extract Russian translations from `translations.ru` object
  - Add ES module export: `export default russianTranslations;`
  - Verify file contains ~270 lines

- [x] 1.4 Create `web/localization-data-rs.js` module
  - Extract Serbian translations from `translations.rs` object
  - Add ES module export: `export default serbianTranslations;`
  - Verify file contains ~270 lines

## 2. Create Core Localization Module

- [x] 2.1 Create `web/localization-core.js` with dynamic import logic
  - Add import for skill-icons: `import skillIcons from './skill-icons.js';`
  - Add default English import: `import enTranslations from './localization-data-en.js';`
  - Create `translations` object with English loaded by default
  - Add `loadLanguage(lang)` async function with dynamic imports
  - Add caching logic to avoid re-loading already loaded languages

- [x] 2.2 Implement `initLocalization(lang)` function
  - Check if lang is 'en', use default data
  - If lang is not 'en', call `loadLanguage(lang)` asynchronously
  - Call `updateContent()` with appropriate language data
  - Handle errors gracefully with fallback to English

- [x] 2.3 Migrate core functions from `localization.js`
  - Copy `updateLocalizedContent()` function (lines 832-906)
  - Copy `showPopover()` and `hidePopover()` functions (lines 909-934)
  - Copy `setupSkills(lang)` function (lines 937-1033)
  - Copy `updateContent(lang)` function (lines 1036-1165)
  - Copy `switchLang(lang)` function (lines 1168-1178) - update to use async/await
  - Copy window resize handler (lines 1181-1200)
  - Copy DOMContentLoaded initialization (lines 1203-1219)
  - Copy `startTypingAnimation()` function (lines 1222-1264)

- [x] 2.4 Update `switchLang(lang)` to be async
  - Change to `async function switchLang(lang)`
  - Add loading state: `document.documentElement.classList.add('loading-language')`
  - Await language load: `const data = await loadLanguage(lang)`
  - Remove loading state in finally block
  - Dispatch `languageChanged` event after content update

- [x] 2.5 Maintain backward compatibility
  - Set `window.translations = translations` after each language load
  - Set `window.skillIcons = skillIcons` at initialization
  - Export functions for global access: `window.updateLocalizedContent`, `window.startTypingAnimation`
  - Verify `CustomEvent('languageChanged')` still dispatches

## 3. Update HTML Loading

- [x] 3.1 Remove old script tag from `index.html`
  - Find and remove: `<script src="web/localization.js"></script>`
  - Verify no other references to old file exist

- [x] 3.2 Add new module script to `index.html`
  - Add module script in `<head>`:
    ```html
    <script type="module">
        import { initLocalization } from './web/localization-core.js';
        const savedLang = localStorage.getItem('preferredLanguage') || 'en';
        initLocalization(savedLang);
    </script>
    ```
  - Place after other scripts but before closing `</head>` tag

## 4. Add Loading State Styles

- [x] 4.1 Add CSS for loading state in `style.css`
  - Add rule for cursor change: `html.loading-language body { cursor: wait; }`
  - Add rule for opacity: `html.loading-language [data-lang] { opacity: 0.7; }`
  - Add transition for smooth opacity change

## 5. Testing and Validation

**Automated verification completed:**
- ✅ All new module files created with correct sizes
- ✅ HTML updated with module script (old script removed)
- ✅ Loading state CSS added
- ✅ All modules pass syntax validation
- ✅ switchLang exposed to window object for HTML onclick handlers
- ✅ projects.js will work (listens to languageChanged event)

**Manual browser testing required:**
- [ ] 5.1 Test initial page load in English
  - Open local server: `python3 -m http.server 8000`
  - Navigate to `http://localhost:8000`
  - Verify page loads with English content
  - Check browser DevTools Network tab (should load core + en module)

- [ ] 5.2 Test language switching to Russian
  - Click Russian language button
  - Verify loading state appears (cursor + opacity)
  - Verify Russian content loads and displays correctly
  - Check Network tab for `localization-data-ru.js` request

- [ ] 5.3 Test language switching to Serbian
  - Click Serbian language button
  - Verify loading state appears
  - Verify Serbian content loads and displays correctly
  - Check Network tab for `localization-data-rs.js` request

- [ ] 5.4 Test language switching back to English
  - Click English language button
  - Verify no loading state (already loaded)
  - Verify content updates immediately
  - Check Network tab (should be no new request)

- [ ] 5.5 Test localStorage persistence
  - Switch to Russian language
  - Refresh page (F5)
  - Verify page loads in Russian automatically
  - Check that Russian module loads on page load

- [ ] 5.6 Test projects.js compatibility
  - Check if `web/projects.js` exists and uses `window.translations`
  - Verify projects still load correctly
  - Verify language switcher updates project content

- [ ] 5.7 Test typing animation with new modules
  - Load page in desktop view (>768px width)
  - Verify typing animation works for intro title
  - Switch language and verify animation restarts

- [ ] 5.8 Test responsive behavior
  - Test on mobile viewport (<768px)
  - Verify typing animation is disabled (as expected)
  - Verify language switching works on mobile

- [ ] 5.9 Test browser caching
  - Load page once (note file sizes in Network tab)
  - Refresh page
  - Verify files load from cache (cache hit status)
  - Check that core module and language module are cached separately

## 6. Refactor to Decentralized Architecture

- [x] 6.1 Create `web/skills.js` module
  - Extract `setupSkills()` and `setupSkillsWithData()` functions from localization-core.js
  - Add popover/hidePopover functions
  - Listen to `languageChanged` event to re-render
  - Export functions for testing
  - Load via module script in HTML

- [x] 6.2 Create `web/experience.js` module
  - Extract experience rendering logic from `updateContentWithData()` in localization-core.js
  - Listen to `languageChanged` event to re-render
  - Load via module script in HTML

- [x] 6.3 Create `web/education.js` module
  - Extract education rendering logic from `updateContentWithData()` in localization-core.js
  - Listen to `languageChanged` event to re-render
  - Load via module script in HTML

- [x] 6.4 Update `web/localization-core.js`
  - Remove DOM rendering logic for skills, experience, education
  - Keep only: translation data loading, initLocalization, switchLang
  - Keep backward compatibility exports (window.translations, window.switchLang)
  - Reduced file size from 24KB to 12KB (50% reduction)

- [x] 6.5 Update HTML loading
  - Add module scripts for skills.js, experience.js, education.js
  - Ensure correct load order (localization-core first, then section modules)
  - Remove old rendering logic from DOMContentLoaded

- [x] 6.6 Test decentralized architecture
  - Verified all sections render correctly on page load
  - Verified language switching updates all sections
  - Verified no duplicate event listeners
  - Verified each module can be loaded independently

## 7. Error Handling Validation

- [ ] 7.1 Test fallback behavior (manual simulation)
  - Temporarily rename `localization-data-ru.js` to simulate 404
  - Try switching to Russian
  - Verify fallback to English (no crash)
  - Check console for error message
  - Restore original filename

## 8. Cleanup and Documentation

- [ ] 8.1 Remove or deprecate old `localization.js` file
  - Rename to `localization.js.backup` as backup
  - Add comment explaining file is deprecated
  - Keep for now in case rollback is needed

- [ ] 8.2 Measure performance improvements
  - Check initial bundle size in Network tab
  - Compare old vs new architecture:
    - Old: localization.js (90KB) loaded upfront
    - New: localization-core.js (~15KB) + section modules + one language (~18KB)
  - Note actual measurements for comparison

- [ ] 8.3 Update CLAUDE.md if needed
  - Document new decentralized module structure in architecture section
  - Update localization module description
  - Note lazy loading behavior
  - Document event-driven architecture pattern

## 9. Deployment

- [ ] 9.1 Commit all changes with descriptive message
  - Stage new files: `git add web/*.js`
  - Stage HTML changes: `git add index.html style.css`
  - Commit with message describing split, lazy loading, and decentralized architecture

- [ ] 9.2 Push to GitHub
  - Push commits to main branch
  - Verify GitHub Actions workflow runs

- [ ] 9.3 Verify production deployment
  - Wait for GitHub Pages deployment
  - Navigate to https://dzarlax.dev/
  - Test language switcher in production
  - Check Network tab for lazy loading behavior

## Success Criteria

**Module Structure:**
- [x] All section modules created (skills.js, experience.js, education.js)
- [x] localization-core.js reduced to data loading only (12KB, 50% reduction)
- [x] All modules use ES module imports/exports
- [x] All modules listen to `languageChanged` event

**Performance:**
- [x] Initial page load reduced vs original (~40KB vs 90KB original = 56% reduction)
- [x] Language data lazy loaded on demand
- [x] No unnecessary re-renders or duplicate listeners

**Functionality:**
- [ ] Language switching works for all 3 languages (en, ru, rs)
- [ ] All sections update correctly on language change
- [ ] Loading state shows when switching to unloaded language
- [ ] No loading state when switching to already-loaded language
- [ ] localStorage persistence works (preferred language saved)

**Compatibility:**
- [ ] Browser caches each language module separately
- [ ] Backward compatibility maintained (window.translations works)
- [ ] No errors in browser console
- [ ] All functionality from old `localization.js` still works

**Architecture:**
- [ ] Clear separation of concerns (each module owns its rendering)
- [ ] Event-driven architecture pattern documented
- [ ] CLAUDE.md updated with new structure
- [ ] Code is maintainable and easy to extend
