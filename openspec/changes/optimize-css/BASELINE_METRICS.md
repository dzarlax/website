# CSS Optimization - Baseline Metrics

## Current State (Before Optimization)

### File Metrics
- **Line Count:** 2101 lines
- **File Size:** 55KB
- **Location:** `/style.css`

### Duplicates Found
1. `@keyframes float` - lines 421, 479 (2 definitions)
2. `@keyframes morph` - lines 435, 493 (2 definitions)
3. `.profile-image` - lines 361 (nested), 454 (flat), 1427 (mobile)
4. `.profile-badge` - lines 370 (nested), 463 (flat), 1431 (mobile)

### Current Organization
- CSS Nesting: ~40% coverage
- Logical Properties: ~15% coverage
- Media Queries: Scattered throughout file (6 locations)
- Keyframes: Scattered (15 animations)

### Structure Issues
- Mixed organization (no clear hierarchy)
- Duplicate definitions
- Media queries not consolidated
- Some flat CSS where nesting could be used

## Targets (After Optimization)

### File Metrics
- **Line Count:** 800-1000 lines (60% reduction)
- **File Size:** ~22KB (60% reduction)
- **Critical CSS:** < 40KB inline

### Quality Targets
- CSS Nesting: 90% coverage
- Logical Properties: 85% coverage
- Zero duplicates
- Consolidated media queries
- Consolidated keyframes

### Performance Targets
- LCP improvement: 0.5-1s on 3G
- First paint: < 2s on 3G
- Lighthouse score: ≥ 90
