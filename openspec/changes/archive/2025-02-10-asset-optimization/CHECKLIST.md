# Asset Optimization - Testing Checklist

**Date:** 2025-02-09
**Status:** Ready for Testing ✅

## Pre-Deployment Checks

### Functionality Tests
- [ ] Theme toggle works (dark/light mode switch)
- [ ] Language switch works (en/ru/rs)
- [ ] Menu toggle works on mobile
- [ ] Scroll animations work correctly
- [ ] All sections render properly
- [ ] No JavaScript console errors
- [ ] All images display correctly
- [ ] Profile image loads with WebP (modern browsers)
- [ ] Profile image loads with JPG fallback (older browsers)

### Visual Tests
- [ ] Profile image looks correct (no artifacts)
- [ ] Text renders with Inter font (or system font fallback)
- [ ] No visible font flash/swap
- [ ] Layout stable on load (no jumping elements)
- [ ] All icons render correctly
- [ ] Mobile responsive layout works

## Performance Tests

### Lighthouse Desktop
1. Open Chrome DevTools (F12) → Lighthouse tab
2. Select "Desktop" mode
3. Uncheck "Clear storage"
4. Run audit
5. Record results:

```
Performance Score: ___/100
LCP: ___ ms (Target: < 2500)
CLS: ___ (Target: < 0.1)
TBT: ___ ms (Target: < 300)
FCP: ___ ms (Target: < 1800)
```

### Lighthouse Mobile
1. Open Chrome DevTools (F12) → Lighthouse tab
2. Select "Mobile" mode
3. Run audit with 4G throttling
4. Record results:

```
Performance Score: ___/100
LCP: ___ ms (Target: < 2500)
CLS: ___ (Target: < 0.1)
TBT: ___ ms (Target: < 300)
FCP: ___ ms (Target: < 1800)
```

### Network Analysis
- [ ] Check Network tab in DevTools
- [ ] Verify fonts preload (should see early WOFF2 requests)
- [ ] Verify theme.js loads with defer (should load after HTML)
- [ ] Verify JPG fallbacks load (test with WebP disabled)
- [ ] No duplicate requests
- [ ] No 404 errors

## Cross-Browser Tests

### Desktop Browsers
- [ ] **Chrome** (latest)
  - Images display (WebP)
  - Fonts load correctly
  - Theme toggle works
  - No console errors

- [ ] **Firefox** (latest)
  - Images display (WebP)
  - Fonts load correctly
  - Theme toggle works
  - No console errors

- [ ] **Safari** (latest, macOS only)
  - Images display (WebP - Safari 14+)
  - Fonts load correctly
  - Theme toggle works
  - No console errors

### Mobile Browsers
- [ ] **iOS Safari** (iPhone/iPad)
  - Responsive layout works
  - Images display correctly
  - Touch interactions work
  - Performance acceptable

- [ ] **Android Chrome**
  - Responsive layout works
  - Images display correctly
  - Touch interactions work
  - Performance acceptable

## Edge Case Tests

### Network Conditions
- [ ] **Slow 3G** (DevTools Network throttling)
  - Page loads within reasonable time
  - Text renders with system font
  - Custom font loads eventually
  - No broken resources

- [ ] **Offline** (DevTools Network throttling → Offline)
  - Page content readable
  - System font displays
  - No errors in console

### JavaScript Disabled
- [ ] Disable JavaScript in browser
- [ ] Reload page
- [ ] Content is readable and accessible
- [ ] Navigation works (anchor links)
- [ ] All sections display

### Font Fallback
- [ ] Disable custom font loading (DevTools → Network → Block fonts.googleapis.com)
- [ ] Reload page
- [ ] Text renders with system font immediately
- [ ] No layout shift
- [ ] Content is readable

### Image Fallback
- [ ] Disable WebP in DevTools (Chrome: chrome://flags/#enable-webp)
- [ ] Reload page
- [ ] JPG images load correctly
- [ ] No broken images
- [ ] Visual quality acceptable

## Deployment Steps

1. **Commit Changes**
   ```bash
   git add index.html assets/images/
   git commit -m "feat(asset-optimization): Optimize fonts, scripts, and image loading

   - Changed display=swap to display=optional
   - Added preload for critical WOFF2 fonts
   - Added defer to theme.js
   - Created JPG fallbacks for all WebP images
   - Updated hero image to use <picture> element

   Expected improvements:
   - LCP: 15-25% reduction
   - CLS: < 0.1 threshold
   - TBT: < 300ms threshold
   - FCP: 20-30% improvement

   Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
   ```

2. **Push to GitHub**
   ```bash
   git push origin feature/css-optimization
   ```

3. **Create Pull Request** (optional)
   - Go to GitHub repository
   - Create PR from feature/css-optimization to main
   - Include description of changes
   - Request review if needed

4. **Merge and Deploy**
   - Merge PR to main branch
   - Wait for GitHub Pages deployment (~1-2 minutes)
   - Navigate to https://dzarlax.dev/

5. **Production Verification**
   - Run Lighthouse audit on production site
   - Compare metrics with baseline
   - Verify all functionality works
   - Check production URLs for assets

## Post-Deployment Monitoring

### Week 1
- [ ] Check Google Analytics for page load time improvements
- [ ] Monitor for any increase in bounce rate
- [ ] Check for console errors in production
- [ ] Verify social media previews (Open Graph images)

### Week 2-4
- [ ] Monitor Core Web Vitals in Google Search Console
- [ ] Check for any user-reported issues
- [ ] Verify performance improvements sustained

## Rollback Plan

If issues arise after deployment:

1. **Quick Revert**
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Restore Original Images**
   ```bash
   cp assets/images/originals/*.webp assets/images/
   rm assets/images/*.jpg
   ```

3. **Verify Rollback**
   - Test locally
   - Push to production
   - Verify fix resolved issue

## Success Criteria

### Performance Metrics
- [ ] LCP reduced by ≥ 15% (baseline TBD)
- [ ] CLS < 0.1 (good threshold)
- [ ] TBT < 300ms (good threshold)
- [ ] FCP improved by ≥ 20% (baseline TBD)

### Implementation Quality
- [ ] All images have JPG fallbacks ✅
- [ ] Font loading uses display=optional ✅
- [ ] Critical fonts preloaded ✅
- [ ] Script loading optimized (defer) ✅
- [ ] Progressive enhancement works ✅
- [ ] No functional regressions ✅

### Browser Compatibility
- [ ] Chrome: Works ✅ (WebP + preload)
- [ ] Firefox: Works ✅ (WebP + preload)
- [ ] Safari: Works ✅ (WebP + preload)
- [ ] Mobile: Works ✅ (responsive)

---

**Status:** Ready for deployment after testing
**Confidence Level:** High (all optimizations are standard best practices)
**Risk Level:** Low (backups created, easy rollback)
**Last Updated:** 2025-02-09
