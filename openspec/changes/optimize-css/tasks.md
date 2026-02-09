# CSS Optimization Tasks

## 1. Analysis & Preparation

- [ ] 1.1 Create feature branch `feature/css-optimization`
- [ ] 1.2 Analyze current CSS for all duplicates (grep "@keyframes", ".profile", ".education")
- [ ] 1.3 Identify critical CSS selectors (intro, header, nav, variables, reset)
- [ ] 1.4 Measure current metrics: file size, line count, LCP time
- [ ] 1.5 Document baseline metrics for comparison

## 2. Critical CSS Extraction

- [ ] 2.1 Create `critical.css` file with extracted styles:
  - [ ] 2.1.1 Copy CSS variables (`:root`, `[dark-mode]`)
  - [ ] 2.1.2 Copy reset styles (`*`, `html`, `body`)
  - [ ] 2.1.3 Copy typography base styles
  - [ ] 2.1.4 Copy `.intro` section styles
  - [ ] 2.1.5 Copy `header`, `nav`, `.nav-link` styles
  - [ ] 2.1.6 Copy `.theme-toggle` styles
  - [ ] 2.1.7 Copy `.hamburger` styles
- [ ] 2.2 Verify critical CSS standalone renders first viewport correctly
- [ ] 2.3 Minify critical CSS (optional, target < 40KB)
- [ ] 2.4 Inline critical CSS into `<head>` of `index.html` as `<style>` tag

## 3. Remove Duplicates

- [ ] 3.1 Remove standalone `.profile-image` (lines 454-462) - keep nested version
- [ ] 3.2 Remove standalone `.profile-badge` (lines 463-478) - keep nested version
- [ ] 3.3 Remove duplicate `@keyframes float` (lines 479-492) - keep first definition
- [ ] 3.4 Remove duplicate `@keyframes morph` (lines 493-506) - keep first definition
- [ ] 3.5 Consolidate `.education-item` nested styles with flat `.education-*` classes
- [ ] 3.6 Verify all styles still apply correctly after duplicate removal
- [ ] 3.7 Test all animations (float, morph, fadeIn, etc.) still work

## 4. Reorganize CSS Structure

- [ ] 4.1 Reorder `style.css` sections:
  - [ ] 4.1.1 Section 1: Variables & Design Tokens (`:root`, `[dark-mode]`)
  - [ ] 4.1.2 Section 2: Base Styles (reset, typography, base elements)
  - [ ] 4.1.3 Section 3: Layout Utilities (`.container`, sections, grid)
  - [ ] 4.1.4 Section 4: Components (`.theme-toggle`, `.hamburger`, buttons)
  - [ ] 4.1.5 Section 5: Sections (`.intro`, `.skills`, `.experience`, `.education`, `.projects`, `.achievements`, `.contact`, `footer`)
  - [ ] 4.1.6 Section 6: Responsive (all media queries consolidated)
  - [ ] 4.1.7 Section 7: Keyframes (all animations consolidated)
- [ ] 4.2 Add section comment headers using `/* ======================================== */` format
- [ ] 4.3 Verify CSS parses correctly after reorganization

## 5. Convert to CSS Nesting

- [ ] 5.1 Convert `.skills` section to 100% nesting
- [ ] 5.2 Convert `.projects` section (`.project-card` children)
- [ ] 5.3 Convert `.education` section (`.education-item-*` to nesting)
- [ ] 5.4 Convert `.contact` section (`.contact-btn` children)
- [ ] 5.5 Convert `.achievements` section (`.achievement-card` children)
- [ ] 5.6 Convert `footer` section (`.footer-*` children to nesting)
- [ ] 5.7 Verify nesting coverage reaches 90% target
- [ ] 5.8 Test all components render correctly with nested syntax

## 6. Convert to Logical Properties

- [ ] 6.1 Replace `width/height` with `inline-size/block-size` in `.intro`
- [ ] 6.2 Replace `left/right` with `inset-inline-*` in `.experience`
- [ ] 6.3 Replace `width` with `inline-size` in `.projects`
- [ ] 6.4 Replace `top/bottom` with `inset-block-*` in all sections
- [ ] 6.5 Replace `margin-left/right` with `margin-inline-*` globally
- [ ] 6.6 Replace `padding-left/right` with `padding-inline-*` globally
- [ ] 6.7 Replace `border-left/right` with `border-inline-*` where applicable
- [ ] 6.8 Verify logical properties coverage reaches 85% target
- [ ] 6.9 Test RTL rendering (if Arabic/Hebrew content exists)

## 7. Consolidate Media Queries

- [ ] 7.1 Move all `@media (max-width: 480px)` rules to end of file
- [ ] 7.2 Move all `@media (max-width: 768px)` rules to end of file
- [ ] 7.3 Move all `@media (min-width: 768px)` rules to end of file
- [ ] 7.4 Move all `@media (min-width: 1024px)` rules to end of file
- [ ] 7.5 Move all `@media (min-width: 1200px)` rules to end of file
- [ ] 7.6 Order media queries: mobile-first → desktop (480 → 768 → 1024 → 1200)
- [ ] 7.7 Remove duplicate media query blocks
- [ ] 7.8 Test all breakpoints still work correctly

## 8. Consolidate Keyframes

- [ ] 8.1 Move all `@keyframes` to end of file (after media queries)
- [ ] 8.2 Remove any remaining duplicate keyframe definitions
- [ ] 8.3 Verify all animations reference consolidated keyframes
- [ ] 8.4 Test all animations play correctly

## 9. Integrate Async CSS Loading

- [ ] 9.1 Update `index.html` `<head>` section:
  - [ ] 9.1.1 Add inline critical CSS in `<style>` tag
  - [ ] 9.1.2 Replace existing `<link rel="stylesheet">` with async load pattern
  - [ ] 9.1.3 Add `<link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">` for `style.css`
  - [ ] 9.1.4 Add `<noscript><link rel="stylesheet" href="style.css"></noscript>` fallback
- [ ] 9.2 Verify CSS loads asynchronously in browser DevTools Network tab
- [ ] 9.3 Test with JavaScript disabled - styles should still load via `<noscript>`

## 10. Testing & Validation

- [ ] 10.1 Visual regression testing:
  - [ ] 10.1.1 Test desktop Chrome/Firefox/Safari
  - [ ] 10.1.2 Test mobile iOS Safari/Chrome
  - [ ] 10.1.3 Test all breakpoints (480, 768, 1024, 1200px)
  - [ ] 10.1.4 Test dark/light mode switching
  - [ ] 10.1.5 Test all animations and transitions
  - [ ] 10.1.6 Compare screenshots before/after (no visual regressions)
- [ ] 10.2 Performance testing:
  - [ ] 10.2.1 Measure LCP before/after (target: 0.5-1s improvement)
  - [ ] 10.2.2 Test on 3G throttling
  - [ ] 10.2.3 Run Lighthouse audit (target: 90+ performance score)
  - [ ] 10.2.4 Verify First Contentful Paint (FCP) improvement
- [ ] 10.3 CSS size validation:
  - [ ] 10.3.1 Count total lines (target: 800-1000 lines, 60% reduction)
  - [ ] 10.3.2 Measure file size in KB (target: 25-30KB)
  - [ ] 10.3.3 Verify critical CSS < 40KB
- [ ] 10.4 Cross-browser compatibility:
  - [ ] 10.4.1 Test CSS nesting in Chrome 112+, Safari 16.5+, Firefox 117+
  - [ ] 10.4.2 Test logical properties in all modern browsers
  - [ ] 10.4.3 Verify fallback for older browsers (graceful degradation)
- [ ] 10.5 Functional testing:
  - [ ] 10.5.1 Test theme toggle functionality
  - [ ] 10.5.2 Test hamburger menu open/close
  - [ ] 10.5.3 Test scroll animations
  - [ ] 10.5.4 Test language switcher (en/ru/rs)
  - [ ] 10.5.5 Test project card hover effects

## 11. Documentation

- [ ] 11.1 Document CSS architecture decisions in `CLAUDE.md`
- [ ] 11.2 Add guidelines for updating critical CSS
- [ ] 11.3 Document critical CSS selectors list
- [ ] 11.4 Update `CSS_ARCHITECTURE.md` with new structure
- [ ] 11.5 Add inline comments for complex sections if needed

## 12. Deployment

- [ ] 12.1 Commit all changes with descriptive message
- [ ] 12.2 Merge `feature/css-optimization` to main branch
- [ ] 12.3 Push to GitHub
- [ ] 12.4 Verify GitHub Pages deployment
- [ ] 12.5 Test production environment:
  - [ ] 12.5.1 Check LCP in Chrome DevTools
  - [ ] 12.5.2 Run Lighthouse on production URL
  - [ ] 12.5.3 Verify visual appearance matches development
- [ ] 12.6 Monitor for any user-reported issues

## 13. Rollback Preparation

- [ ] 13.1 Save git commit hash of pre-optimization state
- [ ] 13.2 Create rollback script: `git revert <commit-hash>`
- [ ] 13.3 Document rollback procedure
- [ ] 13.4 Keep feature branch for quick fixes if needed

## Success Criteria

- [ ] CSS file size reduced by 60% (2100+ → 800-1000 lines)
- [ ] LCP improved by 0.5-1s on 3G connection
- [ ] All visual tests pass (no regressions)
- [ ] CSS nesting coverage ≥ 90%
- [ ] Logical properties coverage ≥ 85%
- [ ] All duplicates removed
- [ ] All media queries consolidated
- [ ] Critical CSS successfully inlined
- [ ] Async CSS loading works correctly
- [ ] Lighthouse performance score ≥ 90
