# Asset Optimization Design

## Context

### Current State

The website has recently undergone a major localization architecture refactor that achieved a 56% bundle size reduction (from 90KB to 40KB initial load). The next performance optimization opportunity is in static asset delivery.

**Current Asset State:**
- **Images**: Already using WebP format for hero images and avatars (good!)
  - `avatar-circle.webp` (17KB)
  - `avatar-128x128.webp` (2.7KB)
  - `avatar-512x512.webp` (14KB)
- **Fonts**: Loading Inter font via Google Fonts with `preconnect` hints
  - Using `display=swap` parameter (good!)
  - No font preloading for above-fold content
  - Loading full font weight range (400-800)
- **Scripts**: Mixed loading strategies
  - Inline theme script for immediate execution
  - Defer loading for contacts, animation, projects, vitals (good!)
  - Module scripts loaded synchronously (skills, experience, education)

**Performance Baseline:**
To be measured using Chrome DevTools Lighthouse before optimization.

### Constraints

- **No build system**: Vanilla JavaScript, no webpack/vite/rollup
- **No external dependencies**: Use native browser features only
- **Progressive enhancement**: Older browsers must remain functional
- **Browser support**: Modern browsers (Chrome 112+, Safari 16.5+, Firefox 117+)
- **Deployment**: Direct to GitHub Pages, no build pipeline

### Stakeholders

- **Users**: Faster page loads, better mobile experience, lower data usage
- **Developer**: Maintainable codebase, no build complexity, clear asset strategy
- **SEO**: Better Core Web Vitals scores improve search rankings

## Goals / Non-Goals

**Goals:**
1. Reduce Largest Contentful Paint (LCP) by 30% through image and font optimization
2. Reduce Cumulative Layout Shift (CLS) through improved font loading
3. Reduce Total Blocking Time (TBT) through optimized script loading
4. Improve First Contentful Paint (FCP) with resource preloading
5. Maintain progressive enhancement - site works without JavaScript
6. Keep codebase simple - no build tools or complex asset pipelines

**Non-Goals:**
- Implementing a build system or bundler (webpack, vite, etc.)
- Adding service workers for offline caching (future enhancement)
- Changing functional behavior - this is pure performance optimization
- Supporting IE11 or legacy browsers (graceful degradation is acceptable)
- Implementing adaptive image loading with client hints (too complex, limited support)

## Decisions

### Decision 1: Image Format Strategy

**Decision:** Use WebP as primary format with JPG fallback, using HTML5 `<picture>` element.

**Implementation Pattern:**
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

**Why this approach:**
- **WebP support**: 95%+ browser support (Chrome 23+, Firefox 65+, Safari 14+)
- **Size benefit**: WebP is 25-35% smaller than JPG at similar quality
- **Fallback**: JPG ensures compatibility with older browsers
- **No build step**: Manual conversion using tools like Squoosh or ImageMagick
- **Native**: Uses browser's built-in format negotiation

**Alternatives considered:**
- ❌ **AVIF only**: Poor browser support (Chrome 85+, Firefox 93+, Safari 16.4+)
- ❌ **Picturefill polyfill**: Adds JavaScript dependency, defeats purpose
- ❌ **Build-time generation**: Requires webpack/asset pipeline (non-goal)
- ❌ **Server-side detection**: Requires backend logic (static site limitation)

**Tools for conversion:**
- Online: Squoosh.app (Google's image optimizer)
- CLI: `cwebp` (WebP encoder), ImageMagick `convert image.jpg image.webp`

### Decision 2: Responsive Image Breakpoints

**Decision:** Use three breakpoints based on CSS grid max-width and common device sizes.

**Breakpoints:**
- Mobile: 640px (1x), 1280px (2x)
- Tablet: 1024px (1x), 2048px (2x)
- Desktop: 1200px (1x), 2400px (2x)

**Implementation Pattern:**
```html
<img srcset="
  avatar-640.webp 640w,
  avatar-1024.webp 1024w,
  avatar-1200.webp 1200w,
  avatar-1280.webp 1280w,
  avatar-2400.webp 2400w
"
sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
src="avatar-1200.webp"
alt="Profile picture"
loading="lazy">
```

**Why these breakpoints:**
- **Mobile**: 640px covers most phones (iPhone SE: 375px, iPhone 14 Pro Max: 430px)
- **Tablet**: 1024px covers iPad Mini and similar tablets
- **Desktop**: 1200px matches site's `--container-max-width` (1200px)
- **2x variants**: Cover high-DPI displays (Retina, modern phones)
- **Sizes attribute**: Helps browser pick optimal image before loading

**Alternatives considered:**
- ❌ **Auto-generation**: Requires build tool (non-goal)
- ❌ **Client hints**: Limited browser support (`accept` header)
- ❌ **Many breakpoints**: Manual maintenance overhead
- ✅ **Three breakpoints**: Good balance of coverage vs. maintenance

### Decision 3: Lazy Loading Strategy

**Decision:** Add `loading="lazy"` to all below-fold images, exclude hero images.

**Implementation:**
- **Hero images** (avatar-circle): No lazy loading (in initial viewport)
- **Achievement images**: Add `loading="lazy"` (below fold)
- **Project images**: Add `loading="lazy"` (below fold, dynamically loaded)

**Why:**
- **Native browser support**: 94%+ browser support (Chrome 77+, Firefox 75+, Safari 15.4+)
- **Automatic**: No JavaScript needed, browser handles detection and loading
- **Performance**: Reduces initial page load by deferring non-critical images
- **Bandwidth savings**: Images only load if user scrolls to them

**Alternatives considered:**
- ❌ **Intersection Observer**: More complex, requires JavaScript
- ❌ **All images lazy**: Causes LCP degradation, hero image should load immediately
- ❌ **Library approach**: Adds external dependency (loz.io, etc.)
- ✅ **Native attribute**: Simple, performant, well-supported

### Decision 4: Font Loading Optimization

**Decision:** Keep Google Fonts with `display=swap`, add preconnect for WOFF2, and preload critical font weights.

**Implementation:**
```html
<!-- Keep existing preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Change display=swap to display=optional -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=optional" rel="stylesheet">

<!-- Preload critical font weights -->
<link rel="preload" href="https://fonts.gstatic.com/s/inter/v12/..." as="font" type="font/woff2" crossorigin>
```

**Changes:**
- **`display=swap`** → **`display=optional`**: Font only loads if quickly available
- **Preload WOFF2**: Preload critical font weights (400, 600, 700) for above-fold text
- **Font subsetting**: Use Google Fonts' automatic text subset optimization (already enabled)

**Why:**
- **`display=optional`**: Better than `swap` - if font takes too long, browser uses system font
- **Preload**: Faster font delivery for above-fold content
- **WOFF2**: Modern font format, 30% smaller than WOFF, good browser support
- **No subsetting needed**: Google Fonts API provides automatic subsetting based on page text

**Alternatives considered:**
- ❌ **Self-hosting fonts**: Complex, requires CDN, update management
- ❌ **Font subsetting service**: External dependency, cost
- ❌ **System fonts**: Would change visual design, brand consistency
- ❌ **`display=swap`**: Always waits for custom font, can cause delay
- ✅ **Google Fonts with `display=optional`**: Simple, effective, well-optimized

**Font preloading approach:**
1. Extract WOFF2 URLs from Google Fonts CSS response
2. Add `<link rel="preload">` for critical weights (400, 600, 700)
3. Keep `display=optional` to allow font swap if preloading is slow

### Decision 5: Script Loading Order

**Decision:** Keep current strategy, add `defer` to theme.js, and audit for duplicates.

**Current Script Loading (already optimized):**
```html
<!-- Critical: Inline theme script -->
<script>
    (function() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
            document.documentElement.setAttribute('dark-mode', '');
        }
    })();
</script>

<!-- Modules: Load synchronously but small -->
<script type="module">
    import { initLocalization } from './web/localization-core.js';
    initLocalization(savedLang);
</script>
<script type="module" src="./web/skills.js"></script>
<script type="module" src="./web/experience.js"></script>
<script type="module" src="./web/education.js"></script>

<!-- Deferred: Load after HTML parsing -->
<script src="web/theme.js" defer></script>
<script src="web/contacts.js" defer></script>
<script src="web/animation.js" defer></script>
<script src="web/projects.js" defer></script>
<script src="web/vitals.js" defer></script>
```

**Proposed Changes:**
- Add `defer` to theme.js (not critical for initial render, inline script handles it)
- Verify no duplicate script loads (check network tab)
- Consider `async` for vitals.js (non-blocking analytics)

**Why:**
- **Already well-optimized**: Defer used appropriately, modules are small
- **Inline theme script**: Prevents flash of wrong theme (FOUC), good pattern
- **Module scripts**: Small enough to not block rendering significantly

**Alternatives considered:**
- ❌ **All async**: Could cause execution order issues
- ❌ **Module bundling**: Requires build tool (non-goal)
- ❌ **Critical CSS inlining**: Complex to maintain, limited benefit
- ✅ **Current strategy + defer theme.js**: Minimal changes, good optimization

### Decision 6: Resource Hints

**Decision:** Add preload for critical WOFF2 fonts and keep existing preconnect for Google Fonts.

**Resource Hints to Add:**
```html
<!-- Already present - keep these -->
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
<link rel="dns-prefetch" href="https://www.google-analytics.com">
<link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Add preloads for critical fonts -->
<link rel="preload" href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2" as="font" type="font/woff2" crossorigin>
```

**Why:**
- **DNS prefetch**: Resolves DNS early for external domains
- **Preconnect**: Establishes TCP/TLS connection before resource request
- **Preload**: Fetches resource earlier in load priority order
- **Minimal changes**: Leverage existing hints, add critical font preloads

**Alternatives considered:**
- ❌ **Preload everything**: Can overwhelm network, lower priority resources
- ❌ **Module preload**: Not needed for small modules
- ✅ **Critical font preloads**: Good balance, minimal overhead

## Risks / Trade-offs

### Risk 1: WebP conversion quality loss

**Risk:** Converting to WebP may reduce image quality, especially for photos with gradients or text.

**Mitigation:**
- Use quality setting of 80-85% during conversion (good balance of size/quality)
- Test converted images visually against originals
- Keep original JPG/PNG files as backup in `assets/images/originals/`
- Use A/B testing to compare user perception

**Acceptable because:** 30% file size reduction outweighs minimal quality difference, and JPG fallback ensures compatibility.

### Risk 2: Font preloading causes cache bloat

**Risk:** Preloading WOFF2 files increases cache storage usage and may not benefit repeat visitors.

**Mitigation:**
- Preload only 3 critical font weights (400, 600, 700) instead of all 4
- Monitor cache usage with DevTools Application tab
- Consider removing preload if cache size becomes problematic

**Acceptable because:** Fonts are cached long-term, repeat visitors benefit from faster loads.

### Risk 3: Lazy loading causes layout shift

**Risk:** Lazy-loaded images may cause cumulative layout shift (CLS) when they load.

**Mitigation:**
- Add explicit `width` and `height` attributes to all lazy-loaded images
- Use CSS aspect-ratio boxes as placeholders for lazy images
- Test CLS score before and after optimization

**Acceptable because:** Proper placeholder sizing eliminates CLS, and spec requires CLS < 0.1.

### Risk 4: Font subsetting breaks character support

**Risk:** If new content requires characters not in the subset, they won't render.

**Mitigation:**
- Use Google Fonts' automatic text subset optimization ( scans page content)
- Avoid manual font subsetting unless absolutely necessary
- Test with multilingual content (English, Russian, Serbian)

**Acceptable because:** Google Fonts API handles this automatically and updates subsets as page content changes.

### Risk 5: Script loading order causes race conditions

**Risk:** Adding `defer` to theme.js might cause it to load after dependent scripts expect it.

**Mitigation:**
- Verify theme.js has no dependencies (it doesn't - standalone module)
- Test page load with Network throttling (Slow 3G)
- Check for JavaScript errors in browser console

**Acceptable because:** theme.js is standalone and only called by user interaction (theme toggle).

## Migration Plan

### Phase 1: Image Optimization (45 minutes)

1. **Backup original images**
   ```bash
   mkdir -p assets/images/originals
   cp assets/images/*.jpg assets/images/*.png assets/images/originals/ 2>/dev/null
   ```

2. **Convert images to WebP**
   - Use Squoosh.app (online tool) or ImageMagick CLI
   - Target: 80-85% quality, lossless for graphics with text
   - Create responsive variants: 640w, 1024w, 1200w, 1280w, 2400w

3. **Update HTML with `<picture>` elements**
   - Replace `<img>` tags with `<picture>` + `<source>` pattern
   - Add `srcset` for responsive variants
   - Add `loading="lazy"` to below-fold images

4. **Test image fallbacks**
   - Verify JPG fallback works in older browsers
   - Test responsive images at different screen sizes
   - Check lazy loading behavior on scroll

### Phase 2: Font Optimization (30 minutes)

1. **Update font loading**
   - Change `display=swap` to `display=optional` in Google Fonts URL
   - Extract WOFF2 URLs for critical font weights
   - Add `<link rel="preload">` for WOFF2 files

2. **Test font rendering**
   - Check text renders immediately with system font
   - Verify custom font loads without visible delay
   - Test in different browsers (Chrome, Safari, Firefox)

3. **Measure CLS improvement**
   - Run Lighthouse audit before and after
   - Verify CLS score < 0.1

### Phase 3: Script Loading Review (15 minutes)

1. **Audit script loading**
   - Open DevTools Network tab
   - Record page load
   - Check for duplicate or unnecessary script loads

2. **Add defer to theme.js**
   - Change `<script src="web/theme.js">` to `<script src="web/theme.js" defer>`

3. **Test page functionality**
   - Verify theme toggle still works
   - Check no console errors
   - Test on mobile devices

### Phase 4: Performance Measurement (15 minutes)

1. **Baseline measurement**
   - Run Lighthouse audit (desktop + mobile)
   - Record: LCP, CLS, TBT, FCP scores
   - Save audit as baseline

2. **Post-optimization measurement**
   - Run Lighthouse audit again
   - Compare scores against baseline
   - Verify 30% LCP reduction achieved

3. **Validate on real devices**
   - Test on iPhone (iOS Safari)
   - Test on Android (Chrome)
   - Test on desktop (Chrome, Firefox, Safari)

### Rollback Strategy

If issues arise after deployment:

1. **Revert HTML changes**: `git revert HEAD~1 -- index.html`
2. **Revert CSS changes**: `git revert HEAD~1 -- style.css`
3. **Force push**: `git push origin main --force`
4. **Restore originals**: Copy from `assets/images/originals/` back to `assets/images/`

**Low risk**: All changes are isolated to static assets, no database or backend changes. Revert is straightforward with git.

## Open Questions

1. **Should we preload all 4 font weights or just 3?**
   - **Consideration**: Preloading 700 (bold) weight is important for headings
   - **Impact**: Extra ~40KB cache storage
   - **Decision**: Start with 3 weights (400, 600, 700), measure if 800 is needed

2. **Should we use AVIF format for images?**
   - **Consideration**: AVIF is 20% smaller than WebP but poor support
   - **Impact**: Maintenance overhead (generate 3 formats instead of 2)
   - **Decision**: Skip AVIF for now - WebP + JPG fallback is good balance

3. **Should we lazy load Font Awesome icons?**
   - **Consideration**: Icons are below-fold but already using async loading trick
   - **Impact**: May delay icon rendering when user scrolls
   - **Decision**: Keep current async loading approach - it's already optimized

4. **What should the LCP baseline be?**
   - **Consideration**: Need to measure current LCP before setting target
   - **Impact**: Can't verify 30% reduction without baseline
   - **Decision**: Measure baseline in Phase 4, adjust target if current LCP is already good

5. **Should we add width/height attributes to all images?**
   - **Consideration**: Required for lazy loading without CLS
   - **Impact**: Need to determine image dimensions
   - **Decision**: Yes - add explicit width/height to all lazy-loaded images to prevent layout shift
