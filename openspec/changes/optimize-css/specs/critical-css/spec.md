# Critical CSS Specification

## ADDED Requirements

### Requirement: Inline critical CSS for first paint
The system SHALL inline critical CSS styles directly in the HTML `<head>` section to enable immediate rendering without network requests.

Critical CSS MUST include:
- CSS custom properties (variables) defined in `:root` and `[dark-mode]`
- Base reset styles (`*`, `html`, `body`)
- Typography base styles
- Header navigation styles (`header`, `nav`, `.nav-link`)
- Theme toggle styles (`.theme-toggle`)
- Hamburger menu styles (`.hamburger`)
- Intro section styles visible in first viewport (`.intro`)

#### Scenario: First paint without blocking
- **WHEN** page loads for the first time
- **THEN** browser renders above-the-fold content immediately without waiting for external CSS file
- **AND** Largest Contentful Paint (LCP) occurs within 2.5 seconds on 3G connection

#### Scenario: Critical CSS size limit
- **WHEN** critical CSS is extracted
- **THEN** inline CSS size SHALL NOT exceed 40KB (recommended: 15-20KB)
- **AND** critical CSS represents approximately 30-40% of total CSS size

### Requirement: Async load non-critical CSS
The system SHALL load the main CSS file (`style.css`) asynchronously after critical CSS renders.

Implementation MUST use:
- `<link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">` pattern
- `<noscript>` fallback for users with JavaScript disabled

#### Scenario: Non-blocking CSS load
- **WHEN** page loads
- **THEN** browser starts parsing HTML immediately
- **AND** non-critical CSS loads asynchronously
- **AND** page remains interactive during CSS load

#### Scenario: JavaScript disabled fallback
- **WHEN** user has JavaScript disabled
- **THEN** `<noscript>` fallback loads CSS synchronously
- **AND** all styles are applied correctly

### Requirement: Visual consistency during load
The system SHALL maintain visual appearance as non-critical CSS loads.

#### Scenario: Progressive enhancement
- **WHEN** critical CSS renders
- **THEN** above-the-fold content is fully styled
- **AND** below-the-fold content styles apply progressively as CSS loads
- **AND** no visible flash of unstyled content (FOUC) occurs

### Requirement: Critical CSS maintenance
The system SHALL document which styles are considered critical for future maintenance.

Documentation MUST include:
- List of critical CSS selectors
- Rationale for each critical section
- Instructions for updating critical CSS when styles change

#### Scenario: Developer updates critical styles
- **WHEN** developer modifies `.intro` or `header` styles
- **THEN** inline critical CSS is updated accordingly
- **AND** documentation reflects changes
