# CSS Architecture Specification

## ADDED Requirements

### Requirement: Eliminate duplicate CSS rules
The system SHALL remove all duplicate CSS definitions from `style.css`.

Duplicates to remove:
- `@keyframes float` (second definition at lines 479-492)
- `@keyframes morph` (second definition at lines 493-506)
- `.profile-image` (standalone definition at lines 454-462, keep nested version in `.intro`)
- `.profile-badge` (standalone definition at lines 463-478, keep nested version in `.intro`)
- `.education-item` vs `.education-*` classes (consolidate to nested approach)

#### Scenario: Single definition for each keyframe
- **WHEN** CSS is parsed
- **THEN** `@keyframes float` appears exactly once
- **AND** `@keyframes morph` appears exactly once
- **AND** each animation uses the single definition

#### Scenario: Consolidated class definitions
- **WHEN** styles apply to elements
- **THEN** `.profile-image` uses only nested definition in `.intro`
- **AND** `.profile-badge` uses only nested definition in `.intro`
- **AND** `.education` uses consistent nested approach

### Requirement: Consolidate media queries
The system SHALL group all responsive breakpoints into a single section at the end of the CSS file.

Media query sections:
- `@media (max-width: 480px)` - Mobile small
- `@media (max-width: 768px)` - Mobile
- `@media (min-width: 768px)` - Tablet
- `@media (min-width: 1024px)` - Desktop
- `@media (min-width: 1200px)` - Large desktop

#### Scenario: All media queries in one location
- **WHEN** developer searches for responsive styles
- **THEN** all media queries are located in the final section of `style.css`
- **AND** media queries are ordered from mobile-first to desktop
- **AND** no media queries appear before this section

#### Scenario: Breakpoint consistency
- **WHEN** media queries are defined
- **THEN** consistent breakpoint values are used throughout:
  - Mobile: 480px, 768px
  - Desktop: 768px, 1024px, 1200px

### Requirement: Organize CSS by architectural layers
The system SHALL structure `style.css` in hierarchical order from global to specific.

Structure order:
1. **Variables & Design Tokens** - `:root`, `[dark-mode]` custom properties
2. **Base Styles** - Reset, typography, base element styles
3. **Layout Utilities** - `.container`, section spacing, grid
4. **Components** - Reusable components (`.theme-toggle`, `.hamburger`, `.project-card`, buttons)
5. **Sections** - Page sections (`.intro`, `.skills`, `.experience`, `.education`, `.projects`, `.achievements`, `.contact`, `footer`)
6. **Responsive** - All media queries consolidated
7. **Keyframes** - All animations consolidated

#### Scenario: Logical CSS organization
- **WHEN** developer reads `style.css`
- **THEN** file follows hierarchical structure
- **AND** each section is clearly marked with comment header
- **AND** related styles are grouped together

#### Scenario: Easy navigation
- **WHEN** developer searches for specific style
- **THEN** section headers enable quick navigation
- **AND** consistent comment format `/* ======================================== */` is used

### Requirement: Increase CSS nesting coverage
The system SHALL convert flat CSS selectors to nested syntax where applicable.

Target coverage:
- Current: ~40% nesting coverage
- Target: 90% nesting coverage

Sections to convert:
- `.skills` - Expand nesting to 100%
- `.projects` - Convert `.project-card` children to nesting
- `.education` - Convert `.education-item-*` to nesting
- `.contact` - Convert `.contact-btn` children to nesting
- `.achievements` - Convert `.achievement-card` children to nesting
- `footer` - Expand nesting for `.footer-*` children

#### Scenario: Nested component structure
- **WHEN** component styles are defined
- **THEN** child selectors use nesting syntax (`&` or `&-modifier`)
- **AND** parent selector is defined once
- **EXAMPLE:**
  ```css
  .project-card {
      /* parent styles */

      &__image { } /* instead of .project-card__image */
      &__title { } /* instead of .project-card__title */
      &:hover { }  /* instead of .project-card:hover */
  }
  ```

#### Scenario: Nesting percentage achievement
- **WHEN** CSS architecture is refactored
- **THEN** at least 90% of eligible selectors use nesting syntax
- **AND** only global/base styles remain flat (reset, base elements)

### Requirement: Increase logical properties usage
The system SHALL replace physical CSS properties with logical properties for RTL support.

Target coverage:
- Current: ~15% logical properties
- Target: 85% logical properties

Properties to convert:
- `width/height` → `inline-size/block-size`
- `min/max-width` → `min/max-inline-size`
- `min/max-height` → `min/max-block-size`
- `margin-left/right` → `margin-inline-start/end`
- `margin-top/bottom` → `margin-block-start/end`
- `padding-left/right` → `padding-inline-start/end`
- `padding-top/bottom` → `padding-block-start/end`
- `left/right` → `inset-inline-start/end`
- `top/bottom` → `inset-block-start/end`
- `border-left/right` → `border-inline-start/end`
- `border-top/bottom` → `border-block-start/end`

#### Scenario: Logical properties in components
- **WHEN** component dimensions and spacing are defined
- **THEN** logical properties are used instead of physical properties
- **AND** styles automatically adapt to RTL languages
- **EXAMPLE:**
  ```css
  /* BEFORE */
  .intro {
      left: 0;
      right: 0;
      width: 100%;
      padding-left: var(--s-6);
      padding-right: var(--s-6);
  }

  /* AFTER */
  .intro {
      inset-inline: 0;
      inline-size: 100%;
      padding-inline: var(--s-6);
  }
  ```

#### Scenario: Logical properties percentage achievement
- **WHEN** CSS architecture is refactored
- **THEN** at least 85% of physical properties are converted to logical properties
- **AND** remaining physical properties are justified (e.g., specific edge cases)

### Requirement: Reduce total CSS size
The system SHALL reduce the total size of `style.css` through consolidation and optimization.

Targets:
- Current: 2100+ lines (approximately 62KB)
- Target: 800-1000 lines (approximately 25-30KB)
- Reduction: 60% decrease in file size

#### Scenario: File size measurement
- **WHEN** CSS refactoring is complete
- **THEN** total line count is between 800-1000 lines
- **AND** file size is reduced by at least 50%
- **AND** all visual styles are preserved

#### Scenario: No functional loss
- **WHEN** refactored CSS is deployed
- **THEN** all existing styles render identically to before
- **AND** no visual regressions occur
- **AND** all animations and transitions function correctly

### Requirement: Maintain BEM naming convention
The system SHALL maintain BEM-like naming for component classes during refactoring.

Naming convention:
- Block: `.component`
- Element: `.component__element`
- Modifier: `.component__element--modifier`
- Utilities: `.u-*` prefix
- Layout: `.l-*` prefix

#### Scenario: Consistent naming in nested selectors
- **WHEN** nesting is applied
- **THEN** BEM names are preserved in nested syntax
- **EXAMPLE:**
  ```css
  .project-card {
      &__image { }  /* BEM element */
      &__title { }  /* BEM element */

      &--featured { }  /* BEM modifier */
  }
  ```

#### Scenario: No naming conflicts
- **WHEN** CSS is reorganized
- **THEN** all class names follow BEM convention
- **AND** no naming collisions occur
- **AND** class names remain descriptive and semantic

### Requirement: Document CSS architecture decisions
The system SHALL document architectural decisions and patterns for future maintainers.

Documentation must include:
- Rationale for CSS organization
- Guidelines for adding new styles
- Critical CSS update instructions
- Browser support considerations

#### Scenario: Developer onboarding
- **WHEN** new developer joins project
- **THEN** CSS architecture documentation explains file structure
- **AND** guidelines for adding new components are clear
- **AND** common patterns (nesting, logical properties) are documented
