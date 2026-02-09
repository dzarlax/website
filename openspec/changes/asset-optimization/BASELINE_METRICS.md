# Asset Optimization Baseline Metrics

## 1. Current Image Inventory

### Images in `assets/images/`
| File | Size | Format | Location | Hero Image? | Lazy Load Candidate? |
|------|------|--------|----------|-------------|---------------------|
| `avatar-circle.webp` | 17KB | WebP | Intro section (line 351) | Yes (in viewport) | No |
| `avatar-512x512.webp` | 14KB | WebP | Open Graph (line 73) | N/A (meta tag) | N/A |
| `avatar-128x128.webp` | 2.7KB | WebP | Favicon (line 97) | N/A | N/A |

**Total Image Size:** 33.7KB

### Current Image Implementation
- **Hero image** (avatar-circle): Simple `<img>` tag without srcset
- **Meta images**: WebP format (good for modern browsers)
- **Favicon**: WebP format with fallback support needed
- **No responsive variants** exist yet
- **No lazy loading** implemented
- **No JPG fallbacks** for older browsers

## 2. Current Font Loading

### Google Fonts Configuration (line 101)
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

**Current State:**
- Font: Inter
- Weights: 400, 500, 600, 700, 800 (5 weights)
- Display strategy: `swap` (causes FOIT then font swap)
- Preconnect: Yes (lines 9-10)
- Preload: No

**Issues:**
- `display=swap` causes layout shift when font loads
- No preloading of critical font weights
- Loading 5 weights instead of 3 critical ones

## 3. Current Script Loading

### Script Load Order (lines 472-476)
| Script | Type | Load Strategy | Dependencies | Priority |
|--------|------|---------------|--------------|----------|
| `theme.js` | Standard | Synchronous | None | High (but inline script handles it) |
| `contacts.js` | Standard | Defer | None | Low |
| `animation.js` | Standard | Defer | None | Low |
| `projects.js` | Standard | Defer | localization-core | Low |
| `vitals.js` | Standard | Defer | None | Low |

**Issues:**
- `theme.js` loads synchronously but inline script already handles theme (line 26-35)
- Should add `defer` to `theme.js`

## 4. Current Resource Hints

### Existing Resource Hints (lines 5-11)
- ✅ `dns-prefetch` for googletagmanager.com
- ✅ `dns-prefetch` for google-analytics.com
- ✅ `dns-prefetch` for cdnjs.cloudflare.com
- ✅ `preconnect` for fonts.googleapis.com
- ✅ `preconnect` for fonts.gstatic.com (with crossorigin)
- ✅ `preconnect` for cdnjs.cloudflare.com

**Status:** Resource hints well configured ✅

## 5. Performance Baseline

### To Be Measured (via Lighthouse)

**Desktop Metrics:**
- LCP (Largest Contentful Paint): TBD
- CLS (Cumulative Layout Shift): TBD
- TBT (Total Blocking Time): TBD
- FCP (First Contentful Paint): TBD
- Performance Score: TBD

**Mobile Metrics:**
- LCP: TBD
- CLS: TBD
- TBT: TBD
- FCP: TBD
- Performance Score: TBD

## 6. Known Performance Issues

### High Priority
1. **No responsive image variants** - All devices download same 17KB hero image
2. **Font loading causes CLS** - `display=swap` triggers layout shift
3. **No lazy loading** - Below-fold images load immediately
4. **theme.js loads synchronously** - Blocks rendering unnecessarily

### Medium Priority
1. **No JPG fallbacks** - Older browsers may not display images
2. **Loading 5 font weights** - Should preload only 3 critical weights
3. **No font preloading** - Critical fonts load late

### Low Priority
1. **No width/height attributes** - Could cause CLS with lazy loading
2. **Favicon in WebP only** - May not work in older browsers

## 7. Optimization Targets

### Goals
- ✅ LCP reduction: 30% (baseline TBD)
- ✅ CLS < 0.1 (good threshold)
- ✅ TBT < 300ms (good threshold)
- ✅ FCP improvement (earlier text rendering)

### Implementation Strategy
1. Create responsive WebP variants (640w, 1024w, 1200w, 1280w, 2400w)
2. Add JPG fallbacks for all images
3. Update HTML to use `<picture>` with `srcset`
4. Add `loading="lazy"` to below-fold images
5. Change `display=swap` to `display=optional`
6. Preload critical WOFF2 font weights (400, 600, 700)
7. Add `defer` to `theme.js`

## 8. Success Criteria

### Performance Improvements
- [ ] LCP reduced by 30% compared to baseline
- [ ] CLS score < 0.1 (good threshold)
- [ ] TBT < 300ms (good threshold)
- [ ] FCP improved (earlier text rendering)

### Implementation Completeness
- [ ] All images converted to WebP with JPG fallbacks
- [ ] Responsive srcset implemented for all images
- [ ] Lazy loading implemented for below-fold images
- [ ] Font loading uses `display=optional`
- [ ] Critical fonts preloaded with WOFF2
- [ ] Script loading optimized (defer added where appropriate)

### Testing & Validation
- [ ] Tested in 3 major desktop browsers (Chrome, Safari, Firefox)
- [ ] Tested on 2 mobile platforms (iOS, Android)
- [ ] Lazy loading tested and working
- [ ] Fallback images verified
- [ ] No layout shift with lazy loading (CLS < 0.1)
- [ ] Progressive enhancement works (JS disabled)
- [ ] Slow 3G network tested

---

**Baseline Date:** 2025-02-09
**Next Step:** Run Lighthouse audits to establish performance baseline
