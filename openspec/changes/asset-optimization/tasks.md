# Asset Optimization Tasks

## 1. Baseline Measurement

- [ ] 1.1 Run Lighthouse audit (desktop) and record baseline metrics
  - Open Chrome DevTools → Lighthouse tab
  - Run audit with Desktop mode
  - Record: LCP, CLS, TBT, FCP, Performance score
  - Save screenshot of results as `baseline-desktop.png`

- [ ] 1.2 Run Lighthouse audit (mobile) and record baseline metrics
  - Open Chrome DevTools → Lighthouse tab
  - Run audit with Mobile mode (4G throttling)
  - Record: LCP, CLS, TBT, FCP, Performance score
  - Save screenshot of results as `baseline-mobile.png`

- [ ] 1.3 Document current image sizes and formats
  - List all images in `assets/images/` directory
  - Record current file sizes and formats (WebP/JPG/PNG)
  - Note which images are in initial viewport (hero images)
  - Note which images are below-fold (lazy load candidates)

- [ ] 1.4 Document current script loading performance
  - Open DevTools Network tab
  - Record page load and note script load order
  - Check for duplicate or unnecessary script loads
  - Note render-blocking resources

## 2. Image Optimization

- [ ] 2.1 Backup original images
  - Create directory: `mkdir -p assets/images/originals`
  - Copy all JPG/PNG files: `cp assets/images/*.jpg assets/images/*.png assets/images/originals/ 2>/dev/null`
  - Verify backup contains all original files

- [ ] 2.2 Create responsive WebP variants for avatar-circle.webp
  - Use Squoosh.app or ImageMagick to convert
  - Generate sizes: 640w, 1024w, 1200w, 1280w, 2400w
  - Quality setting: 80-85%
  - Name files: `avatar-circle-640.webp`, `avatar-circle-1024.webp`, etc.

- [ ] 2.3 Create responsive WebP variants for avatar-512x512.webp
  - Generate sizes: 320w, 640w, 1024w
  - Quality setting: 80-85%
  - Name files: `avatar-512-320.webp`, `avatar-512-640.webp`, etc.

- [ ] 2.4 Create JPG fallbacks for all WebP images
  - Convert each WebP image back to JPG format
  - Use same quality setting (80-85%)
  - Ensure JPG files are named: `avatar-circle-1200.jpg`, etc.

- [ ] 2.5 Update avatar-circle HTML to use <picture> with srcset
  - Replace `<img>` tag with `<picture>` element in index.html
  - Add `<source srcset="..." type="image/webp">` for WebP variants
  - Add `<source srcset="..." type="image/jpeg">` for JPG fallback
  - Add `<img>` with src, srcset, sizes, and alt attributes
  - Do NOT add `loading="lazy"` (hero image must load immediately)

- [ ] 2.6 Update avatar images to use responsive srcset
  - Find all `<img>` tags using avatar images
  - Update to use srcset with responsive variants
  - Add `loading="lazy"` attribute (these are below-fold)
  - Add explicit width and height attributes to prevent layout shift

- [ ] 2.7 Test image fallbacks in different browsers
  - Test in Chrome (should load WebP)
  - Test in Firefox (should load WebP)
  - Test in Safari (should load WebP)
  - Verify JPG fallback works by disabling WebP in DevTools

## 3. Font Loading Optimization

- [ ] 3.1 Update Google Fonts URL to use display=optional
  - Find: `href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"`
  - Replace with: `display=optional` (only load font if quickly available)
  - Update in index.html `<head>` section

- [ ] 3.2 Extract WOFF2 URLs for critical font weights
  - Load page in browser with current font loading
  - Open DevTools Network tab
  - Find WOFF2 URLs for weights 400, 600, 700
  - URLs format: `https://fonts.gstatic.com/s/inter/v12/...`

- [ ] 3.3 Add preload tags for critical font weights
  - Add `<link rel="preload">` for Inter weight 400 WOFF2
  - Add `<link rel="preload">` for Inter weight 600 WOFF2
  - Add `<link rel="preload">` for Inter weight 700 WOFF2
  - Include `as="font" type="font/woff2" crossorigin` attributes
  - Place in `<head>` before Google Fonts stylesheet link

- [ ] 3.4 Verify font rendering improvement
  - Reload page and observe text rendering
  - Text should appear immediately with system font (no FOIT)
  - Custom font should swap in without delay (if cached)
  - Check for layout shift during font swap

## 4. Script Loading Optimization

- [ ] 4.1 Add defer attribute to theme.js script tag
  - Find: `<script src="web/theme.js">` in index.html
  - Replace with: `<script src="web/theme.js" defer>`
  - Verify theme.js has no dependencies (standalone module)

- [ ] 4.2 Audit script loading order in DevTools
  - Open DevTools Network tab
  - Reload page and record network activity
  - Verify scripts load in correct order
  - Check for any duplicate script loads

- [ ] 4.3 Test theme toggle functionality
  - Toggle dark/light theme button
  - Verify theme changes correctly
  - Check for JavaScript errors in console
  - Test on mobile viewport

- [ ] 4.4 Consider async for vitals.js (optional optimization)
  - Check if vitals.js has dependencies on other scripts
  - If standalone, consider changing `defer` to `async`
  - Test page analytics still work correctly

## 5. Resource Hints

- [ ] 5.1 Verify existing resource hints are in place
  - Check for `<link rel="dns-prefetch">` tags (should be present)
  - Check for `<link rel="preconnect">` tags (should be present)
  - Confirm external domains are covered (Google Fonts, Font Awesome, etc.)

- [ ] 5.2 Test preconnect for Font Awesome CDN
  - Verify `<link rel="preconnect" href="https://cdnjs.cloudflare.com">` exists
  - Check connection is established before resource request
  - Test in DevTools Network tab (Timing tab)

## 6. Performance Validation

- [ ] 6.1 Run post-optimization Lighthouse audit (desktop)
  - Open Chrome DevTools → Lighthouse tab
  - Run audit with Desktop mode
  - Record: LCP, CLS, TBT, FCP, Performance score
  - Compare with baseline (task 1.1)
  - Verify 30% LCP reduction achieved

- [ ] 6.2 Run post-optimization Lighthouse audit (mobile)
  - Open Chrome DevTools → Lighthouse tab
  - Run audit with Mobile mode (4G throttling)
  - Record: LCP, CLS, TBT, FCP, Performance score
  - Compare with baseline (task 1.2)
  - Verify CLS < 0.1 and TBT < 300ms

- [ ] 6.3 Test lazy loading behavior
  - Open page and monitor Network tab
  - Scroll to bottom of page
  - Verify below-fold images load as they enter viewport
  - Confirm initial page load has fewer image requests

- [ ] 6.4 Measure actual file size reduction
  - Check total page size in Network tab
  - Note reduction from baseline
  - Verify WebP images are 25-35% smaller than JPG equivalents

## 7. Cross-Browser Testing

- [ ] 7.1 Test in Chrome desktop (latest version)
  - Open site in Chrome browser
  - Test all functionality: theme toggle, language switch, navigation
  - Verify images display correctly with WebP format
  - Check font rendering and swap behavior

- [ ] 7.2 Test in Safari desktop (latest version)
  - Open site in Safari browser
  - Test all functionality
  - Verify WebP support (Safari 14+)
  - Check font loading and rendering

- [ ] 7.3 Test in Firefox desktop (latest version)
  - Open site in Firefox browser
  - Test all functionality
  - Verify WebP support (Firefox 65+)
  - Check lazy loading behavior

- [ ] 7.4 Test on mobile device (iOS Safari)
  - Open site on iPhone or iOS simulator
  - Test responsive images at different screen sizes
  - Verify lazy loading works correctly
  - Check font rendering and layout

- [ ] 7.5 Test on mobile device (Android Chrome)
  - Open site on Android device or emulator
  - Test responsive images at different screen sizes
  - Verify lazy loading works correctly
  - Check font rendering and layout

## 8. Edge Case Testing

- [ ] 8.1 Test with slow network connection (3G throttling)
  - Open Chrome DevTools → Network tab
  - Throttle to "Slow 3G"
  - Reload page and observe loading behavior
  - Verify lazy loading is effective
  - Check fonts load with `display=optional` behavior

- [ ] 8.2 Test with JavaScript disabled
  - Disable JavaScript in browser settings
  - Reload page
  - Verify content is readable and accessible
  - Check core functionality works (navigation, content display)
  - Confirm progressive enhancement works

- [ ] 8.3 Test image fallback behavior
  - Open DevTools → Network tab
  - Disable WebP format (or use browser without WebP support)
  - Reload page
  - Verify JPG fallback images load correctly
  - Check no broken images

- [ ] 8.4 Verify no layout shift with lazy images
  - Open page and observe initial load
  - Scroll down to trigger lazy image loading
  - Watch for layout shifts (use CLS metric in Lighthouse)
  - Confirm CLS score < 0.1

- [ ] 8.5 Test font loading without cache
  - Open DevTools → Application tab
  - Clear site storage and cache
  - Reload page
  - Verify text renders immediately with system font
  - Check custom font loads eventually

## 9. Cleanup and Documentation

- [ ] 9.1 Create summary of optimization results
  - Document baseline vs. optimized metrics
  - Note file size reductions achieved
  - List any issues or edge cases encountered
  - Save as `OPTIMIZATION_RESULTS.md`

- [ ] 9.2 Update CLAUDE.md if needed
  - Document new image format strategy (WebP with fallback)
  - Note lazy loading implementation
  - Update font loading approach
  - Add performance optimization notes

- [ ] 9.3 Remove temporary backup files (optional)
  - Verify all optimizations are working correctly
  - Decide if original images in `assets/images/originals/` should be kept
  - If confident in results, can remove backup to save space
  - Otherwise, keep for rollback capability

- [ ] 9.4 Commit changes with descriptive message
  - Stage changes: `git add assets/images/ index.html`
  - Commit with message: "feat: Optimize assets - WebP images, lazy loading, font optimization"
  - Include summary of performance improvements in commit body

- [ ] 9.5 Push to GitHub and verify deployment
  - Push commits to main branch
  - Wait for GitHub Pages deployment
  - Navigate to https://dzarlax.dev/
  - Run Lighthouse audit on production site
  - Verify optimizations work in production

## Success Criteria

**Performance Improvements:**
- [ ] LCP reduced by 30% compared to baseline
- [ ] CLS score < 0.1 (good threshold)
- [ ] TBT < 300ms (good threshold)
- [ ] FCP improved (earlier text rendering)

**Implementation Completeness:**
- [ ] All images converted to WebP with JPG fallbacks
- [ ] Responsive srcset implemented for all images
- [ ] Lazy loading implemented for below-fold images
- [ ] Font loading uses `display=optional`
- [ ] Critical fonts preloaded with WOFF2
- [ ] Script loading optimized (defer added where appropriate)

**Testing & Validation:**
- [ ] Tested in 3 major desktop browsers (Chrome, Safari, Firefox)
- [ ] Tested on 2 mobile platforms (iOS, Android)
- [ ] Lazy loading tested and working
- [ ] Fallback images verified
- [ ] No layout shift with lazy loading (CLS < 0.1)
- [ ] Progressive enhancement works (JS disabled)
- [ ] Slow 3G network tested

**Documentation:**
- [ ] Baseline metrics recorded
- [ ] Optimization results documented
- [ ] CLAUDE.md updated if needed
- [ ] Commit message describes changes
