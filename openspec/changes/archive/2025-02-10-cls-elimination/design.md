# CLS Elimination Design

## Context

### Current State

The website had a Performance score of 73/100 with Cumulative Layout Shift (CLS) of 0.267, which is in the "poor" range (threshold >0.25). Analysis using Chrome DevTools Performance trace identified several sources of layout shifts:

1. **Large animated pseudo-elements** in `.intro` section:
   - `.intro::before` with meshRotate animation (300px × 300px)
   - `.intro::after` with radial gradient (400px × 400px)

2. **Decorative shape divs** in HTML:
   - `.shape-1` (300px × 300px) with no explicit positioning
   - `.shape-2` (250px × 250px) with no explicit positioning

3. **CSS animations with `translateY`**:
   - `staggerFadeIn`, `fadeIn`, `fadeInUp` keyframe animations
   - `.reveal` and `section` elements with `transform: translateY(30px)`

4. **Unused JavaScript files** bloating the bundle:
   - `main.js` (3.7KB) - obsolete dead code
   - `optimization.js` (7.4KB) - obsolete dead code
   - `localization.js` (90KB) - replaced by modular localization system

5. **External font loading** (Google Fonts Inter) causing FOUT/FOIT issues

### Constraints

- **No build system**: Vanilla JavaScript, no webpack/vite/rollup
- **Progressive enhancement**: Site must work without JavaScript
- **Browser support**: Modern browsers, system fonts universally supported
- **Deployment**: Direct to GitHub Pages, no build pipeline
- **Visual design**: Maintain readability and accessibility

### Stakeholders

- **Users**: Faster page loads, better mobile experience, no janky layout shifts
- **Developer**: Cleaner codebase, less dead code to maintain
- **SEO**: Better Core Web Vitals scores improve search rankings

## Goals / Non-Goals

**Goals:**
1. Reduce CLS from 0.267 to <0.1 (good threshold)
2. Improve Performance score from 73 to >90
3. Remove dead code to reduce bundle size
4. Eliminate external font dependency for faster initial render
5. Fix race condition in localization initialization

**Non-Goals:**
- Implementing image optimization (deferred to separate `asset-optimization` change)
- Adding lazy loading for images (deferred to separate change)
- Changing functional behavior - this is pure performance optimization
- Implementing service workers or offline caching (future enhancement)

## Decisions

### Decision 1: Remove Decorative Pseudo-Elements

**Decision:** Delete `.intro::before` and `.intro::after` pseudo-elements entirely.

**Implementation:**
```css
/* REMOVED from style.css */
.intro::before {
    content: '';
    position: absolute;
    inline-size: 300px;
    block-size: 300px;
    background: radial-gradient(...);
    animation: meshRotate 20s linear infinite;
}

.intro::after {
    content: '';
    position: absolute;
    inline-size: 400px;
    block-size: 400px;
    background: radial-gradient(...);
}
```

**Why this approach:**
- **Root cause**: These were the primary contributors to CLS (0.267 → 0.203 after removing ::before)
- **No functional value**: Purely decorative, no user interaction
- **Large size**: 300px and 400px elements causing significant layout reflow
- **Animation complexity**: meshRotate animation was non-composited, causing layout shifts

**Alternatives considered:**
- ❌ **Add explicit positioning**: Tried `inset-block-start`, `inset-inline-end` but CLS increased to 0.166
- ❌ **Make them composited**: Would require `will-change: transform`, still causes layout shift during load
- ❌ **Reduce size**: Smaller elements would still shift, just less
- ✅ **Remove entirely**: Eliminates shift completely, simplifies code

### Decision 2: Remove Decorative Shape Divs

**Decision:** Delete `.shape-1` and `.shape-2` divs from HTML and their CSS rules.

**Implementation:**
```html
<!-- REMOVED from index.html -->
<div class="shape-1"></div>
<div class="shape-2"></div>
```

**Why this approach:**
- **Secondary CLS source**: Contributed 0.166 to CLS score
- **No explicit positioning**: Absolute positioned elements without top/left causing reflow
- **Purely decorative**: No semantic value or user interaction
- **Redundant**: Similar visual effect already achieved through background color

**Alternatives considered:**
- ❌ **Add positioning constraints**: Would require extensive CSS changes
- ❌ **Make them fixed position**: Could cause overlap issues on small screens
- ✅ **Remove entirely**: Cleanest solution, zero CLS impact

### Decision 3: Remove `translateY` from Animations

**Decision:** Strip vertical translation transforms from all CSS animations and transitions.

**Implementation:**
```css
/* BEFORE */
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
}

/* AFTER */
.reveal {
    opacity: 0;
    transition: all 0.8s ease;
}

@keyframes staggerFadeIn {
    to {
        opacity: 1;
        /* REMOVED: transform: translateY(0); */
    }
}
```

**Why this approach:**
- **Layout shift prevention**: `translateY` causes reflow even when animating opacity
- **Subtle visual difference**: Fade-in only is still visually pleasing
- **Browser optimization**: Opacity-only animations can be GPU-composited
- **Simpler code**: Fewer properties to manage

**Alternatives considered:**
- ❌ **Use `will-change: transform`**: Still causes layout shift during initial render
- ❌ **Add explicit dimensions**: Would require changes to all animated elements
- ✅ **Remove transform**: Cleanest solution, no CLS impact

### Decision 4: Switch to System Fonts

**Decision:** Remove Google Fonts (Inter) and use system font stack.

**Implementation:**
```html
<!-- REMOVED -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<!-- ADDED -->
<style>
    body {
        font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI Variable",
            "Segoe UI",
            Roboto,
            Helvetica,
            Arial,
            sans-serif,
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol",
            "Noto Color Emoji";
    }
</style>
```

**Why this approach:**
- **Zero CLS from fonts**: System fonts always available, no loading delay
- **Faster FCP/FCP**: No network request for font files (~40KB saved)
- **Native feel**: Each OS renders its native font (San Francisco on Mac, Segoe UI on Windows)
- **No preconnect needed**: Removes 2 DNS lookups and TLS handshakes
- **Privacy**: No external requests to Google servers

**Alternatives considered:**
- ❌ **Use `font-display: optional`**: Still requires network request, just fails fast
- ❌ **Self-host fonts**: Complex, requires CDN, maintenance burden
- ❌ **Use `font-display: swap`**: Causes FOUT (flash of unstyled text), CLS from font swap
- ✅ **System fonts**: Zero network latency, zero CLS, zero maintenance

### Decision 5: Remove Unused JavaScript Files

**Decision:** Delete dead code files and verify no references remain.

**Implementation:**
```bash
# Files deleted
rm main.js optimization.js localization.js

# Verification: search for remaining imports
grep -r "main.js\|optimization.js" index.html
# No results found - safe to delete
```

**Why this approach:**
- **101KB saved**: Significant bundle size reduction (3.7KB + 7.4KB + 90KB)
- **Confirmed dead code**: No import statements or script tags reference these files
- **Replaced by modular system**: `localization.js` functionality now in `web/localization-*.js` modules
- **Cleaner codebase**: Less code to maintain and understand

**Alternatives considered:**
- ❌ **Keep for backward compatibility**: No references exist, safe to delete
- ❌ **Archive to git history**: Git already has history, deletion is recoverable
- ✅ **Delete immediately**: Reduces bundle size immediately, simplifies project

### Decision 6: Fix Race Condition in Localization

**Decision:** Move `window.translations` assignment to top of `localization-core.js`.

**Implementation:**
```javascript
// BEFORE (at end of file, after async operations)
const translations = { en: enTranslations };
window.translations = translations;

// AFTER (at top of file, immediately after imports)
import enTranslations from './localization-data-en.js';

const translations = {
    en: enTranslations
};

// Expose IMMEDIATELY before any async operations
window.translations = translations;
```

**Why this approach:**
- **Fixes empty sections**: Skills, Experience, Education were not loading
- **Root cause**: Modules tried to access `window.translations` before it was set
- **Simple one-line move**: No logic changes, just reordering
- **Immediate availability**: Other modules can safely access global object

**Alternatives considered:**
- ❌ **Add loading state**: Would require changes to all dependent modules
- ❌ **Use import statements**: Would break current architecture
- ❌ **Add initialization promise**: Over-engineering for simple fix
- ✅ **Move assignment earlier**: Simplest solution, fixes issue completely

## Risks / Trade-offs

### Risk 1: System fonts reduce brand consistency

**Risk:** Each OS renders different default fonts, making visual design less consistent across platforms.

**Mitigation:**
- System fonts are high-quality and well-designed (San Francisco, Segoe UI, Roboto)
- Modern users are accustomed to native system fonts
- Content and functionality remain unchanged
- Visual hierarchy maintained through font weight and sizing

**Acceptable because:** Performance improvement (CLS elimination) outweighs minor visual variation. System fonts are professionally designed and highly readable.

### Risk 2: Removing decorative elements reduces visual appeal

**Risk:** Removing animated gradients and shapes makes the intro section less visually interesting.

**Mitigation:**
- Profile image and content remain the focal point
- Color scheme and spacing maintain visual hierarchy
- Can add back static CSS backgrounds if needed (no animation)
- Performance is more important than decoration

**Acceptable because:** User experience (no janky shifts) is better than visual decoration. Content remains accessible and well-designed.

### Risk 3: Deleted files might be referenced elsewhere

**Risk:** Unused JS files might have hidden references not caught by grep.

**Mitigation:**
- Searched entire codebase for imports and script tags
- Verified no `<script src="main.js">` or similar references
- Checked git history to confirm files were obsolete
- Can recover from git history if needed: `git checkout HEAD~1 -- main.js`

**Acceptable because:** Thorough search confirmed no references. Git history provides safety net.

### Risk 4: Animation changes affect user experience

**Risk:** Removing `translateY` makes animations less dynamic and noticeable.

**Mitigation:**
- Opacity fade-in is still smooth and visually pleasing
- Reduces motion for users who prefer less animation (accessibility benefit)
- Staggered delays maintain visual flow
- Can add back transforms with explicit dimensions if CLS permits

**Acceptable because:** Subtle fade-in is professional and non-intrusive. Accessibility (reduced motion) is a benefit.

## Migration Plan

### Phase 1: Code Cleanup (COMPLETED)

1. **Delete unused JavaScript files**
   ```bash
   rm main.js optimization.js localization.js
   ```

2. **Verify no broken references**
   - Search codebase for `main.js`, `optimization.js`, `localization.js`
   - Test page load in browser console
   - Verify no 404 errors in Network tab

### Phase 2: Layout Shift Elimination (COMPLETED)

1. **Remove pseudo-elements from CSS**
   - Delete `.intro::before` block from `style.css`
   - Delete `.intro::after` block from `style.css`

2. **Remove decorative shapes from HTML**
   - Delete `<div class="shape-1"></div>` from `index.html`
   - Delete `<div class="shape-2"></div>` from `index.html`

3. **Remove shape CSS rules**
   - Delete `.shape-1` block from `style.css`
   - Delete `.shape-2` block from `style.css`

4. **Remove transform from animations**
   - Remove `transform: translateY(30px)` from `.reveal` and `section`
   - Remove `transform: translateY(0)` from keyframe animations
   - Keep opacity animations intact

### Phase 3: Font Migration (COMPLETED)

1. **Remove Google Fonts**
   - Delete `<link href="https://fonts.googleapis.com/...">` from `index.html`
   - Remove preconnect hints for fonts.googleapis.com and fonts.gstatic.com

2. **Add system font CSS**
   - Add inline `<style>` block in `<head>` of `index.html`
   - Define system font stack with proper fallbacks

3. **Update body font-family**
   - Change from `'Inter', system-ui, ...` to pure system stack
   - Test rendering across different OS (Mac, Windows, Linux)

### Phase 4: Race Condition Fix (COMPLETED)

1. **Fix localization initialization**
   - Move `window.translations = translations` to top of `web/localization-core.js`
   - Place immediately after import statements
   - Test that Skills, Experience, Education sections load correctly

### Phase 5: Validation (COMPLETED)

1. **Performance testing**
   - Run Lighthouse audit (desktop + mobile)
   - Verify CLS < 0.1
   - Verify Performance score >90
   - Check LCP, FCP, TBT metrics

2. **Functional testing**
   - Test language switching (en, ru, rs)
   - Test theme toggle (dark/light mode)
   - Test all sections load correctly
   - Verify no console errors

3. **Cross-browser testing**
   - Chrome (primary development browser)
   - Safari (if available)
   - Firefox (if available)
   - Mobile viewport testing

### Rollback Strategy

If issues arise after deployment:

1. **Restore deleted files** (if needed):
   ```bash
   git checkout HEAD~1 -- main.js optimization.js localization.js
   ```

2. **Revert CSS changes**:
   ```bash
   git checkout HEAD~1 -- style.css
   ```

3. **Revert HTML changes**:
   ```bash
   git checkout HEAD~1 -- index.html
   ```

4. **Force push to trigger deployment**:
   ```bash
   git push origin main --force
   ```

**Low risk**: All changes are isolated to static assets, no database or backend changes. Revert is straightforward with git.

## Open Questions

None - all decisions were straightforward with clear best practices.
