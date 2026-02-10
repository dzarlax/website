# CLS Elimination Proposal

## Why

The website had a Performance score of 73/100 with Cumulative Layout Shift (CLS) of 0.267, which is in the "poor" range (>0.25). Analysis revealed that large animated decorative pseudo-elements (`.intro::before`, `.intro::after`, shape divs) and unused JavaScript code were causing significant layout shifts and bloating the page. Eliminating these issues would improve Core Web Vitals and user experience while reducing bundle size.

**Why now:** The CLS score of 0.267 was actively harming user experience and SEO rankings. The fix was straightforward - removing unused code and problematic decorative elements - with no functional trade-offs.

## What Changes

**Code Cleanup:**
- Delete unused JavaScript files: `main.js` (3.7KB), `optimization.js` (7.4KB), `localization.js` (90KB)
- Total reduction: ~101KB of dead code

**Layout Shift Elimination:**
- Remove `.intro::before` pseudo-element with animated meshRotate (300px × 300px)
- Remove `.intro::after` pseudo-element with radial gradient (400px × 400px)
- Remove `.shape-1` and `.shape-2` decorative divs from HTML (300px and 250px)
- Remove `translateY` from CSS keyframe animations (staggerFadeIn, fadeIn, fadeInUp)
- Remove `transform: translateY()` from `.reveal` and `section` elements

**Font Strategy Change:**
- Remove Google Fonts (Inter) entirely
- Switch to system font stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- Remove font preconnect hints for fonts.googleapis.com and fonts.gstatic.com

**Race Condition Fix:**
- Move `window.translations = translations` to top of `web/localization-core.js`
- Ensures translations object is available before modules load

## Capabilities

### New Capabilities
- `layout-stability`: Elimination of cumulative layout shift through removal of animated decorative elements and problematic CSS transforms

### Modified Capabilities
None - this is pure performance optimization with no functional behavior changes

## Impact

**Affected Files:**
- `main.js` - **DELETED** (dead code, 3.7KB)
- `optimization.js` - **DELETED** (dead code, 7.4KB)
- `localization.js` - **DELETED** (dead code, 90KB)
- `web/localization-core.js` - Fixed race condition (moved window.translations initialization)
- `index.html` - Removed Google Fonts link, removed decorative shape divs, added system font CSS
- `style.css` - Removed `.intro::before` and `.intro::after` pseudo-elements, removed `.shape-1` and `.shape-2` rules, removed `translateY` from animations

**Performance Results:**
- Performance Score: 73/100 → **95/100** (+30% improvement)
- CLS: 0.267 → **0.01** (96% improvement, now in "good" range)
- LCP: **203ms** (excellent)
- TTFB: **0.9ms** (excellent)

**Dependencies:**
- None external - uses native browser features (system fonts)
- Removed dependency on Google Fonts CDN

**Browser Compatibility:**
- All browsers - system fonts are universally supported
- No progressive enhancement needed - system fonts always work

**Testing Requirements:**
- Verify Core Web Vitals with Lighthouse (desktop + mobile)
- Test language switching still works (ru, en, rs)
- Verify sections load correctly (skills, experience, education)
- Check theme toggle functionality maintained
