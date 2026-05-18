# Blog series support — design

**Status:** draft, awaiting review
**Date:** 2026-05-18
**Scope:** Hugo blog at `/articles/` (dzarlax.dev). No changes to the lander.

## Goal

Support multi-part article series on the blog with first-class navigation
and progress. A reader landing on any part should see at a glance:

- that the article is part of a series;
- which part it is and how many there are in total;
- visual progress through the series;
- direct links to the previous and next parts;
- a single index page for the whole series.

No separate RSS feed for series. Series titles and UI strings are
English-only in this iteration — the blog itself has no i18n
infrastructure today and this PR does not introduce any.

## Non-goals

Explicit YAGNI list. None of the following are in scope:

- Per-series RSS feed.
- Multilingual series titles (`title_en` / `title_ru` / `title_rs`).
- "Read / unread" state with localStorage.
- Nested series (series of series).
- Auto-deriving `series_order` from publication date.
- Series badge on the `/articles/` index card grid.
- A blog post / changelog announcing the feature.

## Source of truth

Content lives in the `dzarlax/blog-content` Hugo Module (the Obsidian
vault). Article pages opt into a series by adding two frontmatter
fields:

```yaml
series: ["ai-agents"]   # always a single-element list — Hugo taxonomies are list-typed
series_order: 2         # required when `series` is present; positive integer
```

A series optionally has a hub page at `series/<slug>/_index.md` inside
the vault, with frontmatter `title` and `description`. If the hub file
is absent the series term page still works — it just uses the slug as a
heading and shows no intro prose.

## Hugo configuration

`hugo/hugo.toml`:

- `[taxonomies]` gains `series = "series"` alongside the existing
  `tag = "tags"`.
- `[module]` gains a third mount parallel to `articles` and `tags`:
  ```toml
  [[module.imports.mounts]]
    source = "series"
    target = "content/series"
  ```

No permalink customisation — Hugo's default `/series/<slug>/` is fine.

## Template layout

| File | Role |
|---|---|
| `hugo/layouts/_default/single.html` | builds the series context once, injects two partials, filters Related |
| `hugo/layouts/partials/series-callout.html` | top-of-article callout: title, counter, progress bar, collapsible list |
| `hugo/layouts/partials/series-nav.html` | prev/next block above the article footer |
| `hugo/layouts/series/term.html` | series index page: optional intro + ordered list of parts + ItemList JSON-LD |

The existing `_default/taxonomy.html` is not touched; series-specific
templates live under `layouts/series/`.

### Series context built in `single.html`

```go-template
{{- $series := index (.Params.series | default slice) 0 -}}
{{- if $series }}
  {{- $all := where site.RegularPages "Params.series" "intersect" (slice $series) -}}
  {{- $ordered := sort (sort $all "Date" "asc") "Params.series_order" "asc" -}}
  {{- $idx := 0 -}}
  {{- range $i, $p := $ordered }}{{ if eq $p.RelPermalink $.RelPermalink }}{{ $idx = add $i 1 }}{{ end }}{{ end -}}
  {{- $total := len $ordered -}}
  {{- $prev := false -}}
  {{- $next := false -}}
  {{- if gt $idx 1 }}{{ $prev = index $ordered (sub $idx 2) }}{{ end -}}
  {{- if lt $idx $total }}{{ $next = index $ordered $idx }}{{ end -}}
  {{- $termPage := site.GetPage (printf "/series/%s" $series) -}}
  {{- $ctx := dict
        "current" .
        "slug"    $series
        "term"    $termPage
        "ordered" $ordered
        "idx"     $idx
        "total"   $total
        "prev"    $prev
        "next"    $next -}}
  {{- if gt $total 1 -}}
    {{ partial "series-callout.html" $ctx }}
  {{- end -}}
{{- end }}
```

Double `sort` provides a stable tiebreaker: items sort by `Date` first,
then by `series_order`. Hugo's `sort` is stable, so two parts with the
same `series_order` fall back to publication date order rather than
random hash order.

The same `$ctx` is reused for the bottom `series-nav.html` partial.

### Edge cases

| Case | Behaviour |
|---|---|
| Article has no `series` frontmatter | Templates render exactly as today. Zero regression. |
| `$total == 1` (only one part exists yet) | Neither callout nor nav renders. Solo article is not a series. |
| `$idx == 1` (first part) | Prev slot hidden in `series-nav.html`. Only Next renders. |
| `$idx == $total` (last part) | Next slot becomes a link to the term page (`/series/<slug>/`) with label "To the series index". |
| `series_order` missing on one part | Caught by pre-commit lint. If somehow it slips through, that part sorts to the start (nil key wins in `sort` asc) and the template does not panic. |
| `series_order` collision | Stable tiebreaker on `Date` ascending — see `$ordered` construction. |
| `_index.md` for the series is absent | `site.GetPage` returns nil. Callout still links to `/series/<slug>/` via `printf`, not `.RelPermalink`. Term page uses the slug as fallback title. |

### Related-block filter

`single.html` currently does:

```go-template
{{- $related := .Site.RegularPages.Related . | first 3 }}
```

This becomes:

```go-template
{{- $related := .Site.RegularPages.Related . -}}
{{- if $series -}}
  {{- $sameSeries := where $related "Params.series" "intersect" (slice $series) -}}
  {{- $related = $related | symdiff $sameSeries -}}
{{- end -}}
{{- $related = $related | first 3 -}}
```

Effect: a series part never lists its own siblings in Related, since
those siblings are already covered by the callout and prev/next.

### Term page (`layouts/series/term.html`)

Layout:

1. `<h1>{{ .Title }}</h1>` — either from `_index.md` or fallback to slug.
2. `{{ with .Content }}<div class="prose">{{ . }}</div>{{ end }}` — optional intro from `_index.md`.
3. Ordered list of parts using `.card.card--editorial.card--link` (the
   same card used by Related), each with a numeric badge "01", "02"
   for visual ordering.
4. `<script type="application/ld+json">` ItemList of all parts in order.

## Visual design (DS-first)

Before authoring any CSS, audit `dzarlax/design-system` (latest release)
for existing primitives. Use them when present; only fall back to local
CSS when DS is empty.

| Need | If DS provides | Local fallback in `hugo/assets/css/site.css` |
|---|---|---|
| Callout container | `.callout` / `.note` | `.series-callout` — 1px border, `var(--radius-md)`, padding `var(--s-5)` |
| Progress bar | DS progress component | Style native `<progress>` element |
| Numbered card on term page | DS variant | `.series-index-item__num` — tabular-nums, `var(--f-small)` |
| Prev/next buttons | `.btn--ghost` or `.card--link` | `.series-nav__link` — two card boxes, label + part title |
| Card grid for prev/next | `.card-grid--2` (already used in Related) | — (reuse) |

If a token the design needs is missing in DS, the fix is a DS PR
released first — not a hardcoded value in this repo.

### Callout anatomy

```
┌─ Series callout ────────────────────────────────────┐
│ Series: AI agents in practice         Part 2 of 5   │  ← title is a link to /series/<slug>/, counter right-aligned
│ ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░               │  ← <progress max=5 value=2>
│ ▾ All parts                                          │  ← <details><summary>
│   1. What an agent is — and is not                  │
│   2. Memory, tools, planning loop              ←    │  ← aria-current="page", visually emphasised, not a link
│   3. (draft — not rendered, draft: true)            │
│   4. …                                              │
│   5. …                                              │
└──────────────────────────────────────────────────────┘
```

Draft parts (`draft: true` in frontmatter) are filtered by Hugo at
render time and never appear in `site.RegularPages`, so they will not
appear in the list at all. The schematic above shows a draft only for
illustration; in practice it would simply not render.

### Prev/next anatomy

Two cards in a `.card-grid--2`. On the first part the left card is
hidden. On the last part the right card becomes "To the series index".

### Accessibility

- Current part in the list is marked `aria-current="page"` and is not a link.
- `<progress max="N" value="K">` carries `aria-label="Part K of N"`.
- Collapsible list uses native `<details>`. Default state: open on the
  first part, closed elsewhere. (To be confirmed empirically during
  implementation; can be flipped without changing markup.)

### Responsive

Below 768px:

- The callout stays a single column.
- `.card-grid--2` already collapses to one column via DS.

No new media queries required.

### Tokens used (all already in the DS bridge)

- Spacing: `--s-3`, `--s-4`, `--s-5`, `--s-6`
- Typography: `--f-small`, `--f-base`, `--f-h3`
- Colour: `--text`, `--text-muted`, `--bg`, `--bg-secondary`, `--border`, `--accent`
- Radius: `--radius-md`

## Lint

`bin/install-git-hooks.sh` already validates article frontmatter
(`description`, `tags`, `date`, `draft`). Extend it with one rule:

> If `series:` is present in frontmatter, `series_order:` must also be
> present and must parse as a positive integer.

Failure mode: the commit is rejected with a clear message naming the
file and the missing field.

## CLAUDE.md updates

Two additions:

1. Under the existing frontmatter conventions: document `series` (list,
   one element) and `series_order` (positive integer).
2. A new checklist "Adding a new series" mirroring the existing
   "Removing a lander section" style: create the optional `_index.md`,
   set `series` and `series_order` on every part, verify locally with
   `bin/preview.sh build` and open `/series/<slug>/`.

## Rollout

Two PRs, in order:

**PR-A — `dzarlax/website`** (this repo):

1. `hugo/hugo.toml` taxonomy + module mount.
2. Partials and layout under `hugo/layouts/`.
3. CSS additions in `hugo/assets/css/site.css` (flat selectors, no
   nesting — Hugo's minifier silently drops nested rules; see CLAUDE.md).
4. Pre-commit hook extension.
5. CLAUDE.md updates.

PR-A is safe to merge before any vault changes: while no article has
`series:` frontmatter, the callout does not render and no term page
exists. Zero regression.

**PR-B — `dzarlax/blog-content`** (vault), separately and later:

1. Create the `series/` directory (empty commit if necessary, so the
   module mount does not fail).
2. Optional `series/<slug>/_index.md` per planned series.
3. Add `series:` / `series_order:` to the frontmatter of existing
   articles that become parts of a series.

The feature "appears" on the live site as soon as PR-B is merged into
`main` of the vault, with no further website deploy needed (the module
is fetched fresh on each deploy).

## CI / overlay safety

The deploy workflow's `LANDER_FILES` list in
`.github/workflows/deploy.yml` does not include any `/series/` path.
No overlay conflict. No change to the workflow.

`hugo/hugo.toml` already routes Hugo's sitemap to `/blog-sitemap.xml`
to avoid overlay collision with the lander's hand-maintained
`/sitemap.xml`. Series term pages join `blog-sitemap.xml`
automatically.

## Verification before merge

| Check | How |
|---|---|
| Hugo builds with the new taxonomy | `bin/preview.sh build` — zero errors |
| Existing articles render unchanged | Visually inspect any article without `series:` — no callout, no nav |
| A test series (3 parts) in the local vault works end-to-end | Visually inspect each part + `/series/<test-slug>/`; verify counter, progress, prev/next, and term page list order |
| Lint rejects a part with `series:` but no `series_order:` | Artificially break one part; `git commit` must refuse |
| Hugo minifier preserves new selectors | `grep series-callout dist-preview/assets/css/site.min.*.css` — at least one match |
| Related does not duplicate series siblings | Inspect a middle part of the test series — no series-mates in Related |
| Light and dark themes both readable | Toggle theme on a part — callout and progress remain legible |

## Open questions

None blocking. To be decided during implementation, with permission to
flip without re-spec:

- Default `<details>` state for the "All parts" list (open vs. closed
  per device width).
- Whether to add a header-nav link to `/series/` (list of all series).
  Default: no — series are discoverable from callouts and from
  `/articles/`.
