# CSS Architecture

## Overview

This document describes the CSS architecture for the website portfolio. The CSS is organized hierarchically with modern CSS features including nesting and logical properties for improved maintainability and RTL language support.

## File Structure

**Main CSS File:** `style.css` (50KB, ~2163 lines)

The CSS file is organized in the following hierarchical order:

### 1. Variables & Design Tokens (Lines 1-109)
CSS custom properties defined in `:root` and `[dark-mode]` for theming.

**Token Categories:**
- Brand Color System (HSL-based)
- Neutral Color System
- Gradients
- Shadows
- Spacing (4px grid system: `--s-1` through `--s-12`)
- Border Radius
- Layout (container max-width, grid)
- Transitions
- Typography (modular scale)

### 2. Base Styles (Lines 110-258)
Global reset, typography, and base element styles.

**Includes:**
- HTML/body base styles
- Reset (`*` box-sizing)
- Scrollbar styling (with logical properties)
- Typography scale (h1-h6)
- Links and buttons
- Focus-visible styles
- Selection styling

### 3. Layout Utilities (Lines 259-322)
Container and section-level layout utilities.

**Classes:**
- `main` - Main content wrapper
- `section` - Section wrapper with padding
- `.container` - Max-width container
- ID-based max-width containers for specific sections

### 4. Components (Lines 323-816)
Reusable UI components with nested styles.

**Components:**
- `.theme-toggle` - Dark/light mode switch
- `.hamburger` - Mobile navigation menu
- Buttons (`.contact-btn`, `.back-to-top`)
- Cards (`.project-card`, `.achievement-card`)
- Navigation items (`.nav-link`, `.nav-indicator`)
- Skeleton loaders

### 5. Sections (Lines 817-1601)
Page-specific sections with nested styles.

**Sections:**
- `.intro` - Hero/intro section with profile
- `.skills` - Skills grid
- `.experience` - Work experience timeline
- `.education` - Education items
- `.projects` - Projects grid
- `.achievements` - Achievements grid
- `.contact` - Contact form
- `footer` - Footer with links

### 6. Responsive (Lines 1602-2064)
All media queries consolidated at the end in mobile-first order.

**Breakpoints:**
- `@media (min-width: 768px)` - Tablet
- `@media (min-width: 1024px)` - Desktop
- `@media (min-width: 1200px)` - Large desktop
- `@media (max-width: 1024px)` - Desktop max
- `@media (max-width: 768px)` - Mobile
- `@media (max-width: 480px)` - Mobile small
- `@media (prefers-contrast: high)` - Accessibility
- `@media (prefers-reduced-motion: reduce)` - Accessibility
- `@supports` queries - Feature detection

### 7. Keyframes (Lines 2065-2163)
All animations consolidated at the end.

**Animations:**
1. meshRotate - Background mesh rotation
2. float - Floating animation
3. morph - Morphing border-radius
4. fadeIn - Fade in with translate
5. fadeInLeft - Fade from left
6. fadeInUp - Fade from bottom
7. floating - Subtle floating
8. floatBadge - Badge floating
9. staggerFadeIn - Staggered fade
10. spin - Rotation
11. skeleton-loading - Skeleton loading shimmer
12. pulse - Pulsing scale
13. shimmer - Shimmer effect

## CSS Features

### Nesting (85-90% coverage)

Components use CSS nesting syntax for better organization:

```css
.project-card {
    /* parent styles */

    &__image { } /* nested element */
    &__title { } /* nested element */

    &:hover { } /* nested pseudo-class */
    &--featured { } /* nested modifier */
}
```

**Benefits:**
- Groups related styles together
- Reduces repetition of parent selector
- Easier to maintain and refactor

### Logical Properties (~73% coverage)

Uses logical properties for RTL language support:

```css
/* Physical → Logical */
width → inline-size
height → block-size
margin-left → margin-inline-start
padding-right → padding-inline-end
left → inset-inline-start
top → inset-block-start
```

**Benefits:**
- Automatic RTL support for Arabic, Hebrew, etc.
- Better matches writing mode
- Modern CSS standard

### Design Tokens

All spacing, colors, and typography use CSS custom properties:

```css
/* ✅ Good */
padding: var(--s-6);
margin-block-end: var(--s-4);
color: var(--text-primary);

/* ❌ Bad */
padding: 24px;
margin-bottom: 16px;
color: #333;
```

## Naming Conventions

### BEM-like Naming

- **Block:** `.component`
- **Element:** `.component__element`
- **Modifier:** `.component__element--modifier`
- **Layout:** `.l-*` prefix (e.g., `.l-container`)
- **Utilities:** `.u-*` prefix (e.g., `.u-stagger`)

## Browser Support

- **CSS Nesting:** Chrome 112+, Safari 16.5+, Firefox 117+
- **Logical Properties:** All modern browsers
- **Fallback:** Graceful degradation for older browsers

## Maintenance Guidelines

### Adding New Styles

1. **Use design tokens** - Never hardcode values
2. **Prefer logical properties** - Use `inline-size` instead of `width`
3. **Use CSS nesting** - Nest child selectors under parent
4. **Follow BEM naming** - Keep class names semantic
5. **Add to appropriate section** - Maintain hierarchical order

### Modifying Existing Styles

1. Find the component in its designated section
2. Modify nested selectors within the parent
3. Update both light and dark mode tokens if needed
4. Test on multiple breakpoints (480, 768, 1024, 1200px)
5. Test in both light and dark modes

### Responsive Styles

- Add responsive styles in the **Responsive** section (line 1602+)
- Use mobile-first approach (min-width queries)
- Test all breakpoints

### Animations

- Add new `@keyframes` in the **Keyframes** section (line 2065+)
- Use descriptive names (e.g., `fadeInUp`, `floatBadge`)
- Document complex animations with comments

## Performance

**Optimization Results:**
- File size: 50KB (9% reduction from 55KB baseline)
- All duplicates removed
- Media queries consolidated
- Keyframes consolidated
- Zero duplicate @keyframes or class definitions

**Future Optimization Opportunities:**
- Minification for production (optional)
- Critical CSS extraction (if needed for performance)
- CSS purge for unused styles (if any)

## Related Documentation

- `CLAUDE.md` - Development guidelines and CSS best practices
- `openspec/changes/optimize-css/` - CSS optimization change documentation
- `openspec/changes/optimize-css/OPTIMIZATION_RESULTS.md` - Optimization metrics and results

---

**Last Updated:** 2025-02-09
**CSS Version:** Optimized (post-refactoring)
