
---

# Universal Anti-AI Design System

## Core Philosophy

**Golden Rule:** If it looks like shadcn/ui, Vercel, or "2024 AI startup" — redesign. Every element must have **Character**. Design should feel hand-crafted, not generated.

---

## 1. Design Tokens (Framework-Agnostic)

Define these as CSS variables, theme objects, or design tokens:

```css
:root {
  /* Colors */
  --color-ivory: #FCFAF7;
  --color-graphite: #1A1A1E;
  --color-surface: #E8E6E3;
  --color-surface-dark: #1A1D21;
  
  /* Semantic Actions */
  --color-btn-primary: #18181B;
  --color-btn-primary-hover: #25282D;
  
  /* Status */
  --color-status-available: #059669;
  --color-status-reserved: #D97706;
  --color-status-purchased: #7C3AED;
  
  /* Priority */
  --color-priority-hot: #DC2626;
  --color-priority-medium: #D97706;
  --color-priority-low: #2563EB;
  
  /* Opacity */
  --opacity-border: 0.08;
  --opacity-overlay: 0.5;
  --opacity-disabled: 0.5;
  
  /* Spacing */
  --spacing-input: 17px;
  --spacing-modal: 24px;
  --spacing-filter-gap: 8px;
  --spacing-chip-padding: 12px;
  
  /* Radius */
  --radius-modal: 8px;
  --radius-input: 4px;
  --radius-btn-icon: 9999px;
  
  /* Shadows (Layered) */
  --shadow-editorial: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.06);
  --shadow-editorial-lg: 0 8px 30px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06);
}
```

---

## 2. Typography Rules

### Editorial Headings
- **Letter-spacing:** `-0.02em` (tight tracking)
- **Font-weight:** 500 (medium), not bold
- **Transform:** Uppercase for labels, small text

```css
.heading-editorial {
  font-family: 'Georgia', 'Times New Roman', serif;
  letter-spacing: -0.02em;
  font-weight: 500;
  line-height: 1.1;
}

.label-micro {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(0,0,0,0.6);
}
```

**Avoid:** Inter, Roboto, system-ui fonts without character.

---

## 3. Layout Principles

### Bento Grid Logic
Never uniform grids. Dynamic sizing based on importance:

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.bento-item {
  grid-column: span 1;
}

.bento-item--priority-high {
  grid-column: span 2; /* High priority spans 2 columns */
  background: var(--color-ivory);
}

.bento-item--priority-hot {
  grid-column: span 2;
  grid-row: span 2; /* Or double row for emphasis */
}
```

### Spacing Scale
Use semantic spacing, not arbitrary values:

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-input` | 17px | Form inputs padding |
| `--spacing-modal` | 24px | Modal padding |
| `--spacing-card` | 20px | Card padding (p-5) |
| `--spacing-filter-gap` | 8px | Gap between filters |
| `--spacing-chip-padding` | 12px | Chip button padding |

---

## 4. Component Patterns

### Cards (Universal Structure)

```html
<!-- Base Card -->
<div class="card">
  <div class="card__content">...</div>
</div>

<style>
.card {
  background: var(--color-ivory);
  border-radius: var(--radius-modal);
  box-shadow: var(--shadow-editorial);
  /* Crisp edge definition */
  box-shadow: 
    inset 0 0 0 1px rgba(0,0,0,0.05),
    var(--shadow-editorial);
  padding: var(--spacing-card);
}

/* States */
.card--reserved {
  position: relative;
  background: rgba(232, 230, 227, 0.8);
  backdrop-filter: blur(2px);
}

.card--reserved::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.05);
  border-radius: inherit;
  pointer-events: none;
}

.card--purchased {
  filter: grayscale(100%);
  opacity: 0.75;
}
</style>
```

### Buttons

```html
<button class="btn btn--primary">Action</button>
<button class="btn btn--icon">×</button>

<style>
.btn {
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn--primary {
  background: var(--color-btn-primary);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-input);
  border: none;
}

.btn--primary:hover {
  background: var(--color-btn-primary-hover);
}

.btn--icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-btn-icon);
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid rgba(0,0,0,0.1);
}

/* NO gradients, NO aggressive colors */
</style>
```

### Status Indicators (Quiet, Not Loud)

```html
<!-- ❌ BAD: Loud badge -->
<span class="badge badge--success">AVAILABLE</span>

<!-- ✅ GOOD: Quiet dot indicator -->
<span class="status-indicator">
  <span class="status-indicator__dot status-indicator__dot--available"></span>
  <span class="status-indicator__label">Available</span>
</span>

<style>
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(0,0,0,0.6);
}

.status-indicator__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-indicator__dot--available { background: var(--color-status-available); }
.status-indicator__dot--reserved { background: var(--color-status-reserved); }
.status-indicator__dot--purchased { background: var(--color-status-purchased); }
</style>
```

### Filters (Chips, Not Dropdowns)

```html
<div class="filter-chips">
  <button class="chip chip--active">All</button>
  <button class="chip">Electronics</button>
  <button class="chip">Furniture</button>
</div>

<style>
.filter-chips {
  display: flex;
  gap: var(--spacing-filter-gap);
  overflow-x: auto;
  padding-bottom: 8px;
  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.filter-chips::-webkit-scrollbar { display: none; }

.chip {
  padding: 8px var(--spacing-chip-padding);
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  background: rgba(0,0,0,0.05);
  color: rgba(0,0,0,0.7);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip:hover {
  background: rgba(0,0,0,0.1);
}

.chip--active {
  background: var(--color-graphite);
  color: white;
}
</style>
```

---

## 5. Anti-Patterns Checklist

Before shipping, verify you have **NONE** of these:

| Anti-Pattern | Why It's Bad | Replace With |
|--------------|--------------|--------------|
| Inter font | Instantly recognizable AI/Tech vibe | Georgia, Clash, Satoshi, or custom serif |
| Slate/Gray/Zinc palette | Default Tailwind = generic | Ivory, Graphite, custom semantic colors |
| `rounded-lg` or `rounded-xl` everywhere | Uniform = boring | `var(--radius-modal)`, `var(--radius-btn-icon)` |
| `shadow-sm`, `shadow-md`, `shadow-lg` | Flat, single-layer | Layered `var(--shadow-editorial)` |
| Perfect centering `max-w-4xl mx-auto` | AI default layout | Asymmetric, editorial spacing |
| `p-4`, `p-6`, `gap-4` everywhere | Mechanical spacing | Semantic spacing tokens |
| Generic shadcn/ui cards | Mass-produced feel | Custom with ring-inset edges |
| Uniform grid cells | No visual hierarchy | Bento grid with dynamic spans |
| Colorful filled badges (green/red/yellow) | Bootstrap/Element UI feel | Dot + muted text indicators |
| Hardcoded hex values | Inconsistent, hard to maintain | CSS variables/design tokens |
| Gradient buttons | 2024 AI trend | Confident dark `var(--color-btn-primary)` |
| Select dropdowns for filters | Hide options, hard to scan | Horizontal scrollable chips |

---

## 6. Framework-Specific Implementation

### React/Next.js
```jsx
// theme.js
export const tokens = {
  colors: {
    ivory: '#FCFAF7',
    graphite: '#1A1A1E',
    // ... all tokens
  },
  spacing: {
    input: '17px',
    modal: '24px',
    // ...
  }
};

// components/Card.jsx
export const Card = ({ children, state = 'available' }) => (
  <div className={`card card--${state}`} style={{
    background: 'var(--color-ivory)',
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05), var(--shadow-editorial)',
    borderRadius: 'var(--radius-modal)',
    padding: 'var(--spacing-card)'
  }}>
    {children}
  </div>
);
```

### Vue
```vue
<!-- components/Card.vue -->
<template>
  <div :class="['card', `card--${state}`]" :style="cssVars">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({ state: { default: 'available' }});
const cssVars = {
  '--card-bg': 'var(--color-ivory)',
  '--card-shadow': 'var(--shadow-editorial)'
};
</script>
```

### Svelte
```svelte
<!-- components/Card.svelte -->
<script>
  export let state = 'available';
</script>

<div class="card card--{state}" style="--bg: var(--color-ivory)">
  <slot />
</div>

<style>
  .card {
    background: var(--bg);
    box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05), var(--shadow-editorial);
  }
</style>
```

### Pure CSS/HTML
Use the CSS variables defined in Section 1 directly. No framework needed.

---

## 7. Quick Reference Card

| Element | AI Default | Do This |
|---------|-----------|---------|
| **Font** | Inter | Georgia, Clash, Satoshi |
| **Background** | white/slate-50 | `var(--color-ivory)` |
| **Text** | slate-900 | `var(--color-graphite)` |
| **Headings** | Bold | Medium weight, `-0.02em` letter-spacing |
| **Borders** | border-slate-200 | `ring-1 ring-inset ring-black/5` |
| **Buttons** | rounded-lg, gradients | `var(--radius-input)`, solid dark |
| **Shadows** | shadow-md | Layered `var(--shadow-editorial)` |
| **Grid** | uniform cells | Bento (span based on priority) |
| **Filters** | `<select>` | Horizontal scrollable chips |
| **Badges** | Filled colorful | Dot + muted text |
| **Card edges** | Flat or border | Inset ring for definition |
| **Spacing** | p-4, gap-4 | Semantic tokens |

---

## 8. Testing Checklist

Before every release:

- [ ] No Inter font anywhere
- [ ] All colors use CSS variables, no hardcoded hex
- [ ] Headings have `letter-spacing: -0.02em`
- [ ] Cards use inset ring + layered shadows
- [ ] High-priority items span 2 columns in Bento grid
- [ ] No `shadow-sm/md/lg` — only editorial shadows
- [ ] Status indicators use dots, not filled badges
- [ ] Filters are chips, not dropdowns
- [ ] Buttons are dark/confident, not gradients
- [ ] Reserved/purchased states have visual overlays
- [ ] No `rounded-lg` on everything — semantic radius only

