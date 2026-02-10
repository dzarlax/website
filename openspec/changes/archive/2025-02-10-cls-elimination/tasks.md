# CLS Elimination Tasks

## 1. Baseline Measurement

- [x] 1.1 Run Lighthouse audit (desktop) and record baseline metrics
  - Open Chrome DevTools → Lighthouse tab
  - Run audit with Desktop mode
  - Record: LCP, CLS, TBT, FCP, Performance score
  - Baseline: Performance 73/100, CLS 0.267

- [x] 1.2 Run Lighthouse audit (mobile) and record baseline metrics
  - Open Chrome DevTools → Lighthouse tab
  - Run audit with Mobile mode (4G throttling)
  - Record: LCP, CLS, TBT, FCP, Performance score

- [x] 1.3 Identify CLS sources using Performance Trace
  - Open Chrome DevTools → Performance tab
  - Record page load and analyze timeline
  - Identify layout shift culprits: `.intro::before`, `.intro::after`, `.shape-1`, `.shape-2`
  - Document animation-related shifts from `translateY` transforms

## 2. Dead Code Removal

- [x] 2.1 Verify unused JavaScript files
  - Search codebase for references to `main.js`, `optimization.js`, `localization.js`
  - Confirm no `<script src="main.js">` or import statements exist
  - Verify `localization.js` functionality replaced by modular system

- [x] 2.2 Delete unused JavaScript files
  - Delete `main.js` (3.7KB)
  - Delete `optimization.js` (7.4KB)
  - Delete `localization.js` (90KB)
  - Total reduction: ~101KB

- [x] 2.3 Verify no broken references after deletion
  - Search codebase again for deleted filenames
  - Test page load in browser
  - Check Network tab for 404 errors
  - Verify all functionality still works

## 3. Layout Shift Elimination

- [x] 3.1 Remove `.intro::before` pseudo-element
  - Open `style.css`
  - Find `.intro::before` block with meshRotate animation
  - Delete entire pseudo-element rule including animation
  - Save and verify in browser

- [x] 3.2 Remove `.intro::after` pseudo-element
  - Find `.intro::after` block with radial gradient (400px × 400px)
  - Delete entire pseudo-element rule
  - Save and verify in browser

- [x] 3.3 Remove `.shape-1` from HTML
  - Open `index.html`
  - Find `<div class="shape-1"></div>` in `.intro` section
  - Delete the div element
  - Save and verify

- [x] 3.4 Remove `.shape-2` from HTML
  - Find `<div class="shape-2"></div>` in `.intro` section
  - Delete the div element
  - Save and verify

- [x] 3.5 Remove `.shape-1` and `.shape-2` CSS rules
  - Open `style.css`
  - Find `.shape-1` block (300px × 300px radial gradient)
  - Find `.shape-2` block (250px × 250px radial gradient)
  - Delete both rules
  - Save and verify

- [x] 3.6 Remove `translateY` from `.reveal` elements
  - Find `.reveal` class in `style.css`
  - Remove `transform: translateY(30px)` from rule
  - Keep `opacity: 0` and `transition` properties

- [x] 3.7 Remove `translateY` from `section` elements
  - Find `section` selector in `style.css`
  - Remove `transform: translateY(30px)` from rule
  - Keep `opacity: 0` and `transition` properties

- [x] 3.8 Remove `translateY` from keyframe animations
  - Find `@keyframes staggerFadeIn` and remove `transform: translateY(0)` from `to` block
  - Find `@keyframes fadeIn` and remove any transform properties
  - Find `@keyframes fadeInUp` and remove any transform properties
  - Verify only `opacity` changes remain in keyframes

## 4. Font Migration

- [x] 4.1 Remove Google Fonts link
  - Open `index.html`
  - Find `<link href="https://fonts.googleapis.com/css2?family=Inter...">`
  - Delete entire link element
  - Save and verify

- [x] 4.2 Remove font preconnect hints
  - Find `<link rel="preconnect" href="https://fonts.googleapis.com">`
  - Find `<link rel="preconnect" href="https://fonts.gstatic.com">`
  - Delete both preconnect links
  - Save and verify

- [x] 4.3 Add system font CSS
  - Add inline `<style>` block in `<head>` section of `index.html`
  - Define `body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", ... }`
  - Include full system font stack with fallbacks

- [x] 4.4 Update `style.css` body font-family
  - Open `style.css`
  - Find `body` rule
  - Change `font-family: 'Inter', system-ui, ...` to pure system stack
  - Remove `'Inter'` from font-family list
  - Save and verify text renders correctly

## 5. Race Condition Fix

- [x] 5.1 Identify race condition source
  - Open `web/localization-core.js`
  - Locate `window.translations = translations` assignment
  - Confirm it's at end of file after async operations
  - Verify modules like `skills.js` access `window.translations` on load

- [x] 5.2 Move `window.translations` initialization to top of file
  - Find import statements at top of `localization-core.js`
  - Immediately after imports, add: `window.translations = translations;`
  - Remove duplicate assignment from end of file
  - Save and verify

- [x] 5.3 Verify sections load correctly
  - Test page load in browser
  - Verify Skills section renders with content
  - Verify Experience section renders with content
  - Verify Education section renders with content
  - Check no empty sections or undefined errors

## 6. Performance Validation

- [x] 6.1 Run post-optimization Lighthouse audit (desktop)
  - Open Chrome DevTools → Lighthouse tab
  - Run audit with Desktop mode
  - Record: LCP, CLS, TBT, FCP, Performance score
  - Results: Performance 95/100, CLS 0.01

- [x] 6.2 Run post-optimization Lighthouse audit (mobile)
  - Open Chrome DevTools → Lighthouse tab
  - Run audit with Mobile mode (4G throttling)
  - Record: LCP, CLS, TBT, FCP, Performance score
  - Verify CLS < 0.1 threshold met

- [x] 6.3 Verify Performance Trace CLS reduction
  - Open Chrome DevTools → Performance tab
  - Start trace and reload page
  - Analyze CLS culprits section
  - Verify no layout shifts from removed elements
  - Confirm CLS reduced from 0.267 to 0.01

- [x] 6.4 Measure actual file size reduction
  - Check Network tab for total page size
  - Compare against baseline
  - Verify ~101KB reduction from deleted JS files
  - Confirm no additional font downloads (~40KB saved)

## 7. Functional Testing

- [x] 7.1 Test language switching
  - Click language toggle buttons (en, ru, rs)
  - Verify content updates correctly
  - Verify no console errors
  - Check all sections (intro, skills, experience, education)

- [x] 7.2 Test theme toggle
  - Click dark/light mode toggle button
  - Verify theme changes correctly
  - Check theme preference saves to localStorage
  - Verify no flash of wrong theme on page load

- [x] 7.3 Test all interactive elements
  - Test navigation menu
  - Test mobile menu toggle
  - Test contact form submission
  - Verify no JavaScript errors in console

- [x] 7.4 Test responsive behavior
  - Test at mobile viewport (<768px)
  - Test at tablet viewport (768px - 1024px)
  - Test at desktop viewport (>1024px)
  - Verify layout adapts correctly without shifts

## 8. Cross-Browser Verification

- [x] 8.1 Test in Chrome (primary browser)
  - Open site in Chrome browser
  - Run Lighthouse audit
  - Test all functionality
  - Verify system fonts render correctly

- [x] 8.2 Verify font rendering across OS
  - Test on macOS (San Francisco font)
  - Test on Windows (Segoe UI font)
  - Test on Linux (Roboto or liberation-sans)
  - Verify text is readable and well-spaced

## 9. Documentation

- [x] 9.1 Create summary of optimization results
  - Document baseline vs. optimized metrics
  - Note file size reductions achieved
  - List specific changes made
  - Save results reference

## Success Criteria

**Performance Improvements:**
- [x] CLS reduced from 0.267 to 0.01 (96% improvement)
- [x] Performance score improved from 73 to 95 (+30%)
- [x] LCP under 2.5s (achieved 203ms)
- [x] No layout shifts from decorative elements

**Implementation Completeness:**
- [x] Unused JavaScript files deleted (~101KB saved)
- [x] Decorative pseudo-elements removed (.intro::before, .intro::after)
- [x] Decorative shape divs removed (.shape-1, .shape-2)
- [x] CSS transforms (translateY) removed from animations
- [x] Google Fonts replaced with system fonts
- [x] Race condition fixed in localization-core.js

**Functional Verification:**
- [x] All sections load correctly (skills, experience, education)
- [x] Language switching works (en, ru, rs)
- [x] Theme toggle works (dark/light mode)
- [x] No console errors on page load
- [x] Responsive behavior maintained
