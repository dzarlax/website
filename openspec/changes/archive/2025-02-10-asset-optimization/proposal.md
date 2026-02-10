# Asset Optimization Proposal

## Why

The website currently loads unoptimized assets (images, fonts, scripts) which impacts initial page load performance and user experience. With the decentralized localization architecture now complete (56% bundle size reduction achieved), the next logical optimization step is to improve asset loading efficiency to further reduce page load times and improve Core Web Vitals scores.

Current performance issues:
- Images use older formats (PNG/JPG) without responsive variants
- Fonts load without optimization, causing layout shifts
- Some scripts could be deferred or loaded asynchronously
- No lazy loading for below-the-fold images

**Why now:** The localization optimization is complete and deployed. Asset optimization is the natural next step in the performance improvement roadmap, building on the foundation of modular architecture already established.

## What Changes

**Images:**
- Convert hero images and avatars to modern formats (WebP, AVIF) with fallbacks
- Implement responsive images with `srcset` for different screen sizes
- Add `loading="lazy"` attribute to below-the-fold images
- Optimize image compression ratios

**Fonts:**
- Implement `font-display: swap` for faster text rendering
- Add `preload` tags for critical fonts
- Subset fonts to include only used characters (reduces file size)

**Scripts:**
- Review and optimize script loading order
- Ensure non-critical scripts use `defer` or `async`
- Verify no duplicate or redundant script loads

**HTML Updates:**
- Add `rel="preload"` for critical above-the-fold resources
- Update image tags to use `picture` element with `source` variants
- Add meta tags for resource hints (`dns-prefetch`, `preconnect`)

## Capabilities

### New Capabilities
- **asset-optimization**: Optimized loading and delivery of static assets (images, fonts, scripts) to improve page load performance, Core Web Vitals scores, and user experience through modern web performance best practices.

### Modified Capabilities
None - this is purely a performance optimization with no functional behavior changes to existing capabilities.

## Impact

**Affected Files:**
- `assets/images/` - Image format conversions and optimization
- `index.html` - Font loading, script attributes, image elements, resource hints
- Possibly `style.css` - Font loading CSS updates

**Performance Goals:**
- Reduce Largest Contentful Paint (LCP) by 30% (currently measuring baseline)
- Reduce Cumulative Layout Shift (CLS) through font optimization
- Reduce Total Blocking Time (TBT) through optimized script loading
- Improve First Contentful Paint (FCP) with font preloading

**Dependencies:**
- None external - uses native browser features (WebP, AVIF, srcset, loading="lazy")

**Browser Compatibility:**
- Modern browsers (Chrome 112+, Safari 16.5+, Firefox 117+) fully supported
- Graceful fallbacks for older browsers (JPG/PNG fallbacks for images)
- No polyfills needed - progressive enhancement approach

**Testing Requirements:**
- Test across different screen sizes (mobile, tablet, desktop)
- Verify image fallbacks work in browsers without WebP/AVIF support
- Measure Core Web Vitals before and after optimization
- Test on slow 3G connections to verify lazy loading effectiveness
