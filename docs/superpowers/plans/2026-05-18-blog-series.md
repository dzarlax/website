# Blog Series Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add first-class multi-part series support to the Hugo blog at `/articles/` — top-of-article callout with counter + progress bar, prev/next nav at the bottom, and a `/series/<slug>/` index page — driven by `series` + `series_order` frontmatter on existing articles.

**Architecture:** New Hugo taxonomy `series` with an optional vault-side `series/<slug>/_index.md` hub file (mounted as a third module mount alongside `articles` and `tags`). Two new partials called from `_default/single.html` and one new `layouts/series/term.html`. CSS additions only after auditing `dzarlax/design-system` for reusable primitives; new selectors live flat in `hugo/assets/css/site.css` (Hugo's minifier silently drops nested rules).

**Tech Stack:** Hugo extended (modules, taxonomies, partials), Go template language, plain CSS with design-system token bridge, Bash pre-commit lint.

**Spec:** [docs/superpowers/specs/2026-05-18-blog-series-design.md](../specs/2026-05-18-blog-series-design.md)

**Prerequisites:**
- `bin/preview.sh` runs cleanly on `main` before starting (sanity check that toolchain is healthy).
- A dedicated **test vault** at `D:\tmp\series-test-vault/` (Windows) or `/tmp/series-test-vault/` (Unix), created in Task 2. All verification runs against this synthetic vault, not against the real `dzarlax/blog-content`. The test vault is deleted in Task 11. We use a synthetic vault rather than the real one because the real vault may not be checked out on the machine, and because a synthetic vault keeps verification hermetic.

**Windows path-form caveat:** When passing the vault path to Hugo via `BLOG_VAULT='...'`, use the **backslash** Windows form `D:\tmp\series-test-vault`. The forward-slash form `D:\tmp\series-test-vault` is silently broken because Hugo splits `HUGO_MODULE_REPLACEMENTS` on the colon, then falls back to the cached real module without complaining. The Git-Bash form `/d/tmp/...` Hugo interprets as a theme name and errors out. If you ever see articles from the real `dzarlax/blog-content` repo appearing in `dist-preview/articles/`, run `hugo mod clean --all` to flush the module cache and re-check that the `BLOG_VAULT` path is in the right form.

---

## File map

| Path | Status | Responsibility |
|---|---|---|
| `hugo/hugo.toml` | modify | add `series` taxonomy and `series` module mount |
| `hugo/layouts/_default/single.html` | modify | build series context; inject two partials; filter Related |
| `hugo/layouts/partials/series-callout.html` | create | top-of-article callout (title, counter, progress, all-parts list) |
| `hugo/layouts/partials/series-nav.html` | create | bottom prev/next block; last part → link to series index |
| `hugo/layouts/series/term.html` | create | series index page: optional intro + ordered card list + ItemList JSON-LD |
| `hugo/assets/css/site.css` | modify | DS-fallback CSS for series-callout / series-nav / series-index-item (only what DS doesn't provide) |
| `bin/lint-frontmatter.sh` | modify | extend with `series_order` requirement when `series` is set |
| `CLAUDE.md` | modify | document frontmatter fields + add "Adding a new series" checklist |

---

## Task 1: Add `series` taxonomy and module mount to hugo.toml

**Files:**
- Modify: `hugo/hugo.toml`

- [ ] **Step 1: Edit `hugo/hugo.toml` — add taxonomy**

Find the `[taxonomies]` block (around line 90) and change it from:

```toml
# Single taxonomy — tags is the only classification axis.
[taxonomies]
  tag = "tags"
```

to:

```toml
# Taxonomies — tags (per-article topics) + series (ordered multi-part articles).
[taxonomies]
  tag    = "tags"
  series = "series"
```

- [ ] **Step 2: Edit `hugo/hugo.toml` — add module mount**

Find the existing `[[module.imports.mounts]]` blocks (two of them, for `articles` and `tags`) and append a third one immediately after the `tags` mount:

```toml
    [[module.imports.mounts]]
      source = "series"
      target = "content/series"
```

The full module block should end up looking like:

```toml
[module]
  [[module.imports]]
    path = "github.com/dzarlax/blog-content"
    [[module.imports.mounts]]
      source = "articles"
      target = "content/articles"
    [[module.imports.mounts]]
      source = "tags"
      target = "content/tags"
    [[module.imports.mounts]]
      source = "series"
      target = "content/series"
```

- [ ] **Step 3: Create an empty `series/` directory in the local vault**

So the new mount has something to point at, in the local working copy of the vault:

```bash
mkdir -p "$BLOG_VAULT/series"
touch "$BLOG_VAULT/series/.gitkeep"
```

(Do NOT commit this to the vault as part of this plan — it is a local-only setup so `bin/preview.sh` does not error on a missing mount source. A separate vault-side commit happens later, outside this plan.)

- [ ] **Step 4: Verify Hugo build does not error**

Run: `BLOG_VAULT='D:\tmp\series-test-vault' bin/preview.sh build`
Expected: build completes with no errors. `dist-preview/` is populated. `dist-preview/series/index.html` exists (empty listing of all series terms).

- [ ] **Step 5: Verify no existing page is broken**

Run: `find dist-preview/articles -name 'index.html' | wc -l`
Compare to the same command run on `main` before this change.
Expected: identical count.

- [ ] **Step 6: Commit**

```bash
git add hugo/hugo.toml
git commit -m "feat(blog): add series taxonomy and module mount"
```

---

## Task 2: Scaffold the synthetic test vault at `D:\tmp\series-test-vault/`

This is verification scaffolding only. It is a self-contained Hugo content tree at `D:\tmp\series-test-vault/`, used via `HUGO_MODULE_REPLACEMENTS` (which `bin/preview.sh` derives from `$BLOG_VAULT`). It is deleted in Task 11. Nothing in this plan touches the real `dzarlax/blog-content` vault.

**Files (all under `D:\tmp\series-test-vault/`, local only):**
- Create: `articles/control-no-series/index.md` — non-series article for regression checks
- Create: `articles/seriestest-part-1/index.md`
- Create: `articles/seriestest-part-2/index.md`
- Create: `articles/seriestest-part-3/index.md`
- Create: `series/seriestest/_index.md`
- Create: `tags/.gitkeep` — empty mount source so Hugo does not error

**Throughout the rest of the plan, all `bin/preview.sh` invocations are prefixed with `BLOG_VAULT='D:\tmp\series-test-vault'`** so the build reads from the synthetic vault.

- [ ] **Step 0: Create the vault skeleton**

```bash
mkdir -p D:\tmp\series-test-vault/articles
mkdir -p D:\tmp\series-test-vault/tags
mkdir -p D:\tmp\series-test-vault/series
touch    D:\tmp\series-test-vault/tags/.gitkeep
```

- [ ] **Step 0.5: Create the control (non-series) article**

Write to `D:\tmp\series-test-vault\articles\control-no-series\index.md`:

```markdown
---
title: "Control article"
description: "Used to verify a non-series article still renders without any series UI."
slug: "control-no-series"
date: 2026-05-10
tags: ["testing"]
draft: false
---

Body of the control article. This article must render with no series callout and no series prev/next.
```

- [ ] **Step 1: Create part 1**

Write to `D:\tmp\series-test-vault/articles/seriestest-part-1/index.md`:

```markdown
---
title: "Series test — part 1"
description: "First part of the series test fixture."
slug: "seriestest-part-1"
date: 2026-05-15
tags: ["testing"]
series: ["seriestest"]
series_order: 1
draft: false
---

Body of part 1. Lorem ipsum.
```

- [ ] **Step 2: Create part 2**

Write to `D:\tmp\series-test-vault/articles/seriestest-part-2/index.md`:

```markdown
---
title: "Series test — part 2"
description: "Middle part of the series test fixture."
slug: "seriestest-part-2"
date: 2026-05-16
tags: ["testing"]
series: ["seriestest"]
series_order: 2
draft: false
---

Body of part 2. Lorem ipsum.
```

- [ ] **Step 3: Create part 3**

Write to `D:\tmp\series-test-vault/articles/seriestest-part-3/index.md`:

```markdown
---
title: "Series test — part 3"
description: "Last part of the series test fixture."
slug: "seriestest-part-3"
date: 2026-05-17
tags: ["testing"]
series: ["seriestest"]
series_order: 3
draft: false
---

Body of part 3. Lorem ipsum.
```

- [ ] **Step 4: Create series hub**

Write to `D:\tmp\series-test-vault/series/seriestest/_index.md`:

```markdown
---
title: "Series test"
description: "Fixture used to verify series rendering."
---

This is the local fixture series. Used for end-to-end verification of the series feature during implementation. Will be removed before the PR is merged.
```

- [ ] **Step 5: Verify Hugo picks up the new content from the synthetic vault**

```bash
BLOG_VAULT='D:\tmp\series-test-vault' bin/preview.sh build
```
Expected: build succeeds. `dist-preview/articles/seriestest-part-1/index.html` exists. `dist-preview/articles/control-no-series/index.html` exists. `dist-preview/series/seriestest/index.html` exists (rendered with the default taxonomy template for now — Task 7 replaces it). `dist-preview/articles/seriestest-part-2/index.html` and `dist-preview/articles/seriestest-part-3/index.html` exist.

- [ ] **Step 6: No commit**

This is local fixture scaffolding only. Nothing to commit.

---

## Task 3: Build series context in single.html with no-op partial stubs

This task wires the data plumbing in `single.html` and adds two empty partial files. Articles without `series:` continue to render exactly as before. Articles with `series:` start calling empty partials — visible output is unchanged from `main`.

**Files:**
- Modify: `hugo/layouts/_default/single.html`
- Create: `hugo/layouts/partials/series-callout.html`
- Create: `hugo/layouts/partials/series-nav.html`

- [ ] **Step 1: Create empty `series-callout.html` partial**

Write to `hugo/layouts/partials/series-callout.html`:

```go-html-template
{{/* Series callout — rendered above article body when the article is part of a series of 2+ parts.
     Context: dict with keys current, slug, term, ordered, idx, total, prev, next.
     Implementation lives in Task 4. */}}
```

- [ ] **Step 2: Create empty `series-nav.html` partial**

Write to `hugo/layouts/partials/series-nav.html`:

```go-html-template
{{/* Series prev/next nav — rendered above the article footer when the article is part of a series of 2+ parts.
     Context: dict with keys current, slug, term, ordered, idx, total, prev, next.
     Implementation lives in Task 5. */}}
```

- [ ] **Step 3: Inject series context into `single.html`**

Open `hugo/layouts/_default/single.html`. Find the `<header class="hero hero--editorial">` block (currently at lines 4–11). Immediately after the closing `</header>` (line 11) and **before** the `{{- if .Params.toc }}` line (line 13), insert this block:

```go-html-template

  {{/* Series context — populated when this article is part of a series of 2+ parts. */}}
  {{- $series := "" -}}
  {{- with .Params.series }}{{ $series = index . 0 }}{{ end -}}
  {{- $seriesCtx := false -}}
  {{- if $series }}
    {{- $all := where site.RegularPages "Params.series" "intersect" (slice $series) -}}
    {{- $ordered := sort (sort $all "Date" "asc") "Params.series_order" "asc" -}}
    {{- $idx := 0 -}}
    {{- range $i, $p := $ordered }}{{ if eq $p.RelPermalink $.RelPermalink }}{{ $idx = add $i 1 }}{{ end }}{{ end -}}
    {{- $total := len $ordered -}}
    {{- if gt $total 1 }}
      {{- $prev := false -}}
      {{- $next := false -}}
      {{- if gt $idx 1 }}{{ $prev = index $ordered (sub $idx 2) }}{{ end -}}
      {{- if lt $idx $total }}{{ $next = index $ordered $idx }}{{ end -}}
      {{- $termPage := site.GetPage (printf "/series/%s" $series) -}}
      {{- $seriesCtx = dict
            "current" .
            "slug"    $series
            "term"    $termPage
            "ordered" $ordered
            "idx"     $idx
            "total"   $total
            "prev"    $prev
            "next"    $next -}}
      {{ partial "series-callout.html" $seriesCtx }}
    {{- end }}
  {{- end }}
```

- [ ] **Step 4: Add series-nav call before the article footer**

Still in `single.html`, find the `<div class="article__footer">` line (was line 24). Immediately **before** it, insert:

```go-html-template
  {{- with $seriesCtx }}{{ partial "series-nav.html" . }}{{ end }}

```

- [ ] **Step 5: Verify build does not error**

Run: `BLOG_VAULT='D:\tmp\series-test-vault' bin/preview.sh build`
Expected: zero errors. Build succeeds.

- [ ] **Step 6: Verify existing articles still render identically**

Pick any pre-existing article (one without `series:` in frontmatter) and inspect its built HTML:

```bash
diff <(cat dist-preview/articles/<some-real-article-slug>/index.html) <(git show main:dist-preview/articles/<some-real-article-slug>/index.html 2>/dev/null) || echo "(no main build available — eyeball the served page instead)"
```

If you don't have a previous build to diff against, open the page in a browser via `bin/preview.sh` and visually confirm there's no new whitespace, no broken layout, no extra markup compared to before.

Expected: existing articles are byte-for-byte identical (or visually identical if no diff is available).

- [ ] **Step 7: Verify series articles call the partials**

```bash
grep -c 'Series callout' dist-preview/articles/seriestest-part-2/index.html
```

The partials only emit a comment right now, so look for the comment string from Step 1. Expected: a hit (>= 1). This confirms the partial is being called for series articles.

- [ ] **Step 8: Commit**

```bash
git add hugo/layouts/_default/single.html hugo/layouts/partials/series-callout.html hugo/layouts/partials/series-nav.html
git commit -m "feat(blog): wire series context plumbing in single.html"
```

---

## Task 4: Implement series-callout.html

**Files:**
- Modify: `hugo/layouts/partials/series-callout.html`

- [ ] **Step 1: Replace the stub with the full partial**

Overwrite `hugo/layouts/partials/series-callout.html` with:

```go-html-template
{{- /* Context: dict with keys current, slug, term, ordered, idx, total, prev, next. */ -}}
{{- $current := .current -}}
{{- $slug    := .slug -}}
{{- $term    := .term -}}
{{- $ordered := .ordered -}}
{{- $idx     := .idx -}}
{{- $total   := .total -}}

{{- $termHref  := printf "/series/%s/" $slug -}}
{{- $termTitle := $slug -}}
{{- with $term -}}
  {{- $termHref  = .RelPermalink -}}
  {{- $termTitle = .Title -}}
{{- end -}}

<aside class="series-callout" aria-label="Series navigation">
  <header class="series-callout__header">
    <p class="series-callout__title">
      Series: <a href="{{ $termHref }}">{{ $termTitle }}</a>
    </p>
    <p class="series-callout__counter">Part {{ $idx }} of {{ $total }}</p>
  </header>

  <progress class="series-callout__progress"
            max="{{ $total }}" value="{{ $idx }}"
            aria-label="Part {{ $idx }} of {{ $total }}"></progress>

  <details class="series-callout__list"{{ if eq $idx 1 }} open{{ end }}>
    <summary>All parts</summary>
    <ol class="series-callout__parts">
      {{- range $i, $p := $ordered }}
        {{- $n := add $i 1 -}}
        {{- if eq $p.RelPermalink $current.RelPermalink }}
          <li class="series-callout__part series-callout__part--current" aria-current="page">
            <span class="series-callout__part-num">{{ printf "%02d" $n }}</span>
            <span class="series-callout__part-title">{{ $p.Title }}</span>
          </li>
        {{- else }}
          <li class="series-callout__part">
            <span class="series-callout__part-num">{{ printf "%02d" $n }}</span>
            <a class="series-callout__part-title" href="{{ $p.RelPermalink }}">{{ $p.Title }}</a>
          </li>
        {{- end }}
      {{- end }}
    </ol>
  </details>
</aside>
```

- [ ] **Step 2: Verify build**

Run: `BLOG_VAULT='D:\tmp\series-test-vault' bin/preview.sh build`
Expected: zero errors.

- [ ] **Step 3: Visual check on a middle part**

Run: `bin/preview.sh` and open http://localhost:8000/articles/seriestest-part-2/

Confirm visually:
- Callout appears below the H1 and meta line.
- Title "Series: Series test" linking to `/series/seriestest/`.
- Counter "Part 2 of 3" on the right side of the header.
- Progress bar fills ~66%.
- "All parts" details element exists (closed on part 2, since `idx != 1`).
- Expanding the list shows three items numbered 01 / 02 / 03; part 2 is not a link and has visible emphasis (we'll style this in Task 8 — for now `aria-current="page"` is enough for the markup).

- [ ] **Step 4: Visual check on first part**

Open http://localhost:8000/articles/seriestest-part-1/
Confirm: `<details>` is rendered with `open` attribute (list expanded by default on first part).

- [ ] **Step 5: Verify no callout on articles outside the series**

Open any pre-existing article without `series:` in frontmatter.
Confirm: no `series-callout` element anywhere on the page.

```bash
grep -c 'series-callout' dist-preview/articles/control-no-series/index.html
```
Expected: `0`.

- [ ] **Step 6: Commit**

```bash
git add hugo/layouts/partials/series-callout.html
git commit -m "feat(blog): implement series callout partial"
```

---

## Task 5: Implement series-nav.html

**Files:**
- Modify: `hugo/layouts/partials/series-nav.html`

- [ ] **Step 1: Replace the stub with the full partial**

Overwrite `hugo/layouts/partials/series-nav.html` with:

```go-html-template
{{- /* Context: dict with keys current, slug, term, ordered, idx, total, prev, next. */ -}}
{{- $slug  := .slug -}}
{{- $term  := .term -}}
{{- $idx   := .idx -}}
{{- $total := .total -}}
{{- $prev  := .prev -}}
{{- $next  := .next -}}

{{- $termHref := printf "/series/%s/" $slug -}}
{{- with $term -}}{{ $termHref = .RelPermalink }}{{- end -}}

<nav class="series-nav" aria-label="Series navigation">
  <div class="card-grid card-grid--2 series-nav__grid">
    {{- if $prev }}
      <a class="card card--editorial card--link series-nav__link series-nav__link--prev"
         href="{{ $prev.RelPermalink }}" rel="prev">
        <span class="series-nav__label">← Previous</span>
        <span class="series-nav__title">{{ $prev.Title }}</span>
      </a>
    {{- else }}
      <span class="series-nav__placeholder" aria-hidden="true"></span>
    {{- end }}

    {{- if $next }}
      <a class="card card--editorial card--link series-nav__link series-nav__link--next"
         href="{{ $next.RelPermalink }}" rel="next">
        <span class="series-nav__label">Next →</span>
        <span class="series-nav__title">{{ $next.Title }}</span>
      </a>
    {{- else }}
      {{/* Last part — link to the series index instead. */}}
      <a class="card card--editorial card--link series-nav__link series-nav__link--index"
         href="{{ $termHref }}">
        <span class="series-nav__label">To the series index →</span>
        <span class="series-nav__title">All {{ $total }} parts</span>
      </a>
    {{- end }}
  </div>
</nav>
```

- [ ] **Step 2: Verify build**

Run: `BLOG_VAULT='D:\tmp\series-test-vault' bin/preview.sh build`
Expected: zero errors.

- [ ] **Step 3: Visual check on first part (no Prev)**

Open http://localhost:8000/articles/seriestest-part-1/

Confirm:
- Above the share / tags footer there is a `series-nav` block.
- Only one card on the right showing "Next →" with the title of part 2.
- The left slot is an empty placeholder (no link).

- [ ] **Step 4: Visual check on middle part (both Prev and Next)**

Open http://localhost:8000/articles/seriestest-part-2/

Confirm: two cards — "← Previous" (part 1) and "Next →" (part 3).

- [ ] **Step 5: Visual check on last part (Next → series index)**

Open http://localhost:8000/articles/seriestest-part-3/

Confirm: two cards — "← Previous" (part 2) and "To the series index →" pointing to `/series/seriestest/`. The right card label reads "All 3 parts".

- [ ] **Step 6: Verify no nav on non-series articles**

```bash
grep -c 'series-nav' dist-preview/articles/control-no-series/index.html
```
Expected: `0`.

- [ ] **Step 7: Commit**

```bash
git add hugo/layouts/partials/series-nav.html
git commit -m "feat(blog): implement series prev/next nav partial"
```

---

## Task 6: Filter series siblings out of the Related block

**Files:**
- Modify: `hugo/layouts/_default/single.html`

- [ ] **Step 1: Locate the current Related block**

In `hugo/layouts/_default/single.html`, find this line (currently around line 41):

```go-html-template
    {{- $related := .Site.RegularPages.Related . | first 3 }}
```

- [ ] **Step 2: Replace with a series-aware version**

Replace that single line with:

```go-html-template
    {{- $related := .Site.RegularPages.Related . -}}
    {{- if $series -}}
      {{- $sameSeries := where $related "Params.series" "intersect" (slice $series) -}}
      {{- $related = $related | symdiff $sameSeries -}}
    {{- end -}}
    {{- $related = $related | first 3 -}}
```

Note: `$series` was already defined earlier in the file by Task 3 (the series-context block) and is in scope here.

- [ ] **Step 3: Verify build**

Run: `BLOG_VAULT='D:\tmp\series-test-vault' bin/preview.sh build`
Expected: zero errors.

- [ ] **Step 4: Verify a middle part does not list series siblings in Related**

Open http://localhost:8000/articles/seriestest-part-2/

Scroll to the "Related" block at the bottom. Confirm: neither "Series test — part 1" nor "Series test — part 3" appears among the Related cards. (Whatever else Hugo's Related algorithm surfaces based on tags is fine — we only care that series siblings are excluded.)

If the Related block is empty for the test series, that's expected — `tags: ["testing"]` likely has no other matches. To get a positive signal, you can also check that the existing pre-existing articles (outside the test series) show Related as they did before:

```bash
grep -c 'article__related' dist-preview/articles/control-no-series/index.html
```
Expected: same as on `main`.

- [ ] **Step 5: Commit**

```bash
git add hugo/layouts/_default/single.html
git commit -m "feat(blog): exclude series siblings from Related"
```

---

## Task 7: Implement layouts/series/term.html

**Files:**
- Create: `hugo/layouts/series/term.html`

- [ ] **Step 1: Create the term layout**

Write to `hugo/layouts/series/term.html`:

```go-html-template
{{ define "main" }}
<article class="series-index reveal">

  <header class="hero hero--editorial">
    <p class="hero__eyebrow">Series</p>
    <h1 class="hero__title">{{ .Title }}</h1>
    {{- with .Params.description }}<p class="hero__lede">{{ . }}</p>{{ end }}
  </header>

  {{- with .Content }}
  <div class="prose series-index__intro">
    {{ . }}
  </div>
  {{- end }}

  {{- $ordered := sort (sort .Pages "Date" "asc") "Params.series_order" "asc" -}}
  {{- $total   := len $ordered -}}

  <section class="series-index__parts">
    <div class="container container--xl">
      <ol class="card-grid card-grid--2">
        {{- range $i, $p := $ordered }}
          {{- $n := add $i 1 -}}
          <li>
            <a class="card card--editorial card--link series-index-item" href="{{ $p.RelPermalink }}">
              <span class="series-index-item__num">{{ printf "%02d" $n }}</span>
              <div class="series-index-item__body">
                <h2 class="card__title">{{ $p.Title }}</h2>
                {{- with $p.Description }}<p class="card__description">{{ . }}</p>{{ end }}
              </div>
            </a>
          </li>
        {{- end }}
      </ol>
    </div>
  </section>

  {{- if gt $total 0 }}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": {{ .Title | jsonify }},
    "numberOfItems": {{ $total }},
    "itemListOrder": "https://schema.org/ItemListOrderAscending",
    "itemListElement": [
      {{- range $i, $p := $ordered -}}
      {{- if $i }},{{ end }}
      {
        "@type": "ListItem",
        "position": {{ add $i 1 }},
        "url": {{ $p.Permalink | jsonify }},
        "name": {{ $p.Title | jsonify }}
      }
      {{- end }}
    ]
  }
  </script>
  {{- end }}
</article>
{{ end }}
```

- [ ] **Step 2: Verify build**

Run: `BLOG_VAULT='D:\tmp\series-test-vault' bin/preview.sh build`
Expected: zero errors.

- [ ] **Step 3: Visual check on the term page (with `_index.md`)**

Open http://localhost:8000/series/seriestest/

Confirm:
- "Series" eyebrow above title.
- Title "Series test" comes from `_index.md`.
- Lede paragraph "Fixture used to verify series rendering." appears.
- Intro paragraph from the markdown body of `_index.md` ("This is the local fixture series…") is rendered below in a prose block.
- Below the intro, a 2-column card grid shows three cards: part 1, part 2, part 3 in that order, each with a "01" / "02" / "03" badge.
- View source: a `<script type="application/ld+json">` block with `ItemList`, `numberOfItems: 3`, and three `ListItem` entries in order.

- [ ] **Step 4: Visual check on the term page (without `_index.md`)**

Temporarily move the hub out of the way to simulate a series with no `_index.md`:

```bash
mv D:\tmp\series-test-vault/series/seriestest/_index.md D:\tmp\series-test-vault/series/seriestest/_index.md.bak
```

Rebuild and reopen http://localhost:8000/series/seriestest/

Confirm:
- Page still renders.
- Title falls back to "seriestest" (Hugo's default term name).
- Lede paragraph is absent.
- Intro prose block is absent.
- The card grid still lists all three parts in order.

Restore the hub:

```bash
mv D:\tmp\series-test-vault/series/seriestest/_index.md.bak D:\tmp\series-test-vault/series/seriestest/_index.md
```

- [ ] **Step 5: Commit**

```bash
git add hugo/layouts/series/term.html
git commit -m "feat(blog): add series term page with ordered parts and ItemList JSON-LD"
```

---

## Task 8: Audit design system, then add CSS fallbacks

**Files:**
- Modify: `hugo/assets/css/site.css`

- [ ] **Step 1: Identify the DS release currently baked in**

Open `.github/workflows/deploy.yml` and confirm which release of `dzarlax/design-system` is resolved at deploy time (the workflow uses `releases/latest`). For local dev, `hugo/hugo.toml` has `dsTag = "main"`, which means local preview always tracks the tip of `main` in the DS repo.

- [ ] **Step 2: Pull the DS sources and audit primitives**

Without committing anything in this repo, check what the DS provides:

```bash
git clone --depth 1 https://github.com/dzarlax/design-system /tmp/ds-audit
grep -E '\.callout|\.note|\.progress|\.card--editorial|\.card--link|\.card-grid|--radius-|--border|tabular-nums' /tmp/ds-audit/src/**/*.css 2>/dev/null | head -50
```

Record findings as one of "provided" / "missing" for each row below. Update the table inline in this task before continuing:

| Primitive | DS provides? | If not, local class to add |
|---|---|---|
| `.callout` / `.note` container | ? | `.series-callout` |
| Native `<progress>` styling | ? | `.series-callout__progress` |
| `.card-grid--2` | (already used by Related — assume yes) | — |
| `.card.card--editorial.card--link` | (already used by Related — assume yes) | — |
| Numbered badge utility | ? | `.series-callout__part-num` / `.series-index-item__num` |

- [ ] **Step 3: Append the necessary CSS to `hugo/assets/css/site.css`**

Append the block below at the end of the file. **If the DS audit found that a primitive already exists, delete the corresponding rule from this block** and adopt the DS class name in the partials instead (which means going back to Task 4 / 5 / 7 to swap class names — do that swap now and re-verify before continuing).

```css
/* ─ Series ─────────────────────────────────────────────────────────────────
   Top-of-article callout, prev/next nav, and term-page parts list.
   Flat selectors only — Hugo's minifier silently drops nested rules.
   See docs/superpowers/specs/2026-05-18-blog-series-design.md.
*/
.series-callout {
  margin-block: var(--s-6) var(--s-6);
  padding: var(--s-5);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
}
.series-callout__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--s-3);
  margin-block-end: var(--s-3);
}
.series-callout__title {
  margin: 0;
  font-size: var(--f-small);
  color: var(--text-muted);
}
.series-callout__title a {
  color: var(--text);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}
.series-callout__counter {
  margin: 0;
  font-size: var(--f-small);
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}
.series-callout__progress {
  display: block;
  inline-size: 100%;
  block-size: 4px;
  appearance: none;
  border: 0;
  border-radius: 999px;
  background: var(--border);
  overflow: hidden;
}
.series-callout__progress::-webkit-progress-bar {
  background: var(--border);
  border-radius: 999px;
}
.series-callout__progress::-webkit-progress-value {
  background: var(--text);
  border-radius: 999px;
}
.series-callout__progress::-moz-progress-bar {
  background: var(--text);
  border-radius: 999px;
}
.series-callout__list {
  margin-block-start: var(--s-3);
}
.series-callout__list > summary {
  cursor: pointer;
  font-size: var(--f-small);
  color: var(--text-muted);
}
.series-callout__parts {
  margin-block-start: var(--s-3);
  padding-inline-start: 0;
  list-style: none;
}
.series-callout__part {
  display: flex;
  gap: var(--s-3);
  padding-block: var(--s-2);
  font-size: var(--f-base);
}
.series-callout__part-num {
  font-variant-numeric: tabular-nums;
  color: var(--text-muted);
  min-inline-size: 2.5ch;
}
.series-callout__part--current .series-callout__part-title {
  font-weight: 600;
  color: var(--text);
}

.series-nav {
  margin-block: var(--s-6) var(--s-4);
}
.series-nav__placeholder {
  display: block;
}
.series-nav__link {
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}
.series-nav__link--next {
  text-align: end;
}
.series-nav__label {
  font-size: var(--f-small);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.series-nav__title {
  font-size: var(--f-h3);
  color: var(--text);
}

.series-index-item {
  display: flex;
  align-items: flex-start;
  gap: var(--s-4);
}
.series-index-item__num {
  font-variant-numeric: tabular-nums;
  font-size: var(--f-h3);
  color: var(--text-muted);
  min-inline-size: 3ch;
}
.series-index-item__body {
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
}
```

- [ ] **Step 4: Verify build and minifier output**

Run: `BLOG_VAULT='D:\tmp\series-test-vault' bin/preview.sh build`
Expected: zero errors.

Then verify selectors survive minification:

```bash
grep -c 'series-callout' dist-preview/assets/css/site.min.*.css
grep -c 'series-nav' dist-preview/assets/css/site.min.*.css
grep -c 'series-index-item' dist-preview/assets/css/site.min.*.css
```

Expected: each command returns a count `>= 1`. If any returns 0, a nested-CSS slip-up made it past review — the rule was dropped by the minifier. Fix flat-selector violations and re-run.

- [ ] **Step 5: Visual pass — light and dark themes**

Open http://localhost:8000/articles/seriestest-part-2/ in the browser.

- Toggle light theme: callout border, text, progress bar, and prev/next cards are all legible.
- Toggle dark theme: same check. Progress bar fill should still be visible against the bar background.

Open http://localhost:8000/series/seriestest/. Same theme toggle check.

- [ ] **Step 6: Visual pass — mobile width**

In browser DevTools, set the viewport to 375px wide. On the part-2 article:
- Callout stays a single column.
- `card-grid--2` for prev/next collapses to one column (DS behaviour, no new CSS needed).

On the series term page:
- Card grid collapses to one column.

- [ ] **Step 7: Commit**

```bash
git add hugo/assets/css/site.css
git commit -m "feat(blog): series callout, nav, and index-item styles"
```

---

## Task 9: Extend lint-frontmatter.sh with `series_order` requirement

**Files:**
- Modify: `bin/lint-frontmatter.sh`

**Context:** The hook only fires on staged files under `hugo/content/articles/`. Articles normally live in the external vault and don't pass through this hook, so this rule is mostly defence-in-depth for the rare case where an article is committed to this repo directly. A matching vault-side hook is out of scope for this plan.

- [ ] **Step 1: Add `has_series` and `series_order` checks in the per-file loop**

Open `bin/lint-frontmatter.sh`. Find the per-file error-collection loop (starts with `for f in "${FILES[@]}"; do`). After the existing `draft` check and before the `if [ "${#errors[@]}" -gt 0 ]` block, insert:

```bash
  # If `series:` is present and non-empty, `series_order:` must be a positive integer.
  has_series=0
  if awk '/^series[[:space:]]*:[[:space:]]*\[.*[^[:space:]\[\]].*\][[:space:]]*$/{found=1; exit} /^series[[:space:]]*:[[:space:]]*$/{block=1; next} block && /^[[:space:]]*-[[:space:]]+[^[:space:]]/{found=1; exit} block && /^[^[:space:]]/{exit} END{exit !found}' <<< "$fm"; then
    has_series=1
  fi
  if [ "$has_series" = "1" ]; then
    series_order="$(get_scalar "$fm" series_order)"
    if [ -z "$series_order" ]; then
      errors+=("'series:' is set but 'series_order:' is missing — add an integer order >= 1")
    elif ! [[ "$series_order" =~ ^[1-9][0-9]*$ ]]; then
      errors+=("'series_order' must be a positive integer (got: $series_order)")
    fi
  fi
```

- [ ] **Step 2: Test the lint manually — passing case**

Create a temp file and run the linter against it:

```bash
cat > /tmp/lint-pass.md <<'EOF'
---
title: "Lint test pass"
description: "ok"
date: 2026-05-15
tags: ["x"]
series: ["foo"]
series_order: 2
draft: false
---
body
EOF
bin/lint-frontmatter.sh /tmp/lint-pass.md
```
Expected: `✓ Frontmatter lint passed (1 file(s))` and exit code 0.

- [ ] **Step 3: Test the lint manually — missing `series_order`**

```bash
cat > /tmp/lint-fail-1.md <<'EOF'
---
title: "Lint test fail 1"
description: "missing order"
date: 2026-05-15
tags: ["x"]
series: ["foo"]
draft: false
---
body
EOF
bin/lint-frontmatter.sh /tmp/lint-fail-1.md
echo "exit=$?"
```
Expected: non-zero exit; output mentions "`series:` is set but `series_order:` is missing".

- [ ] **Step 4: Test the lint manually — non-integer `series_order`**

```bash
cat > /tmp/lint-fail-2.md <<'EOF'
---
title: "Lint test fail 2"
description: "bad order"
date: 2026-05-15
tags: ["x"]
series: ["foo"]
series_order: zero
draft: false
---
body
EOF
bin/lint-frontmatter.sh /tmp/lint-fail-2.md
echo "exit=$?"
```
Expected: non-zero exit; output mentions "'series_order' must be a positive integer".

- [ ] **Step 5: Test the lint manually — empty series list, should be ignored**

```bash
cat > /tmp/lint-pass-2.md <<'EOF'
---
title: "Lint test pass 2"
description: "no series"
date: 2026-05-15
tags: ["x"]
series: []
draft: false
---
body
EOF
bin/lint-frontmatter.sh /tmp/lint-pass-2.md
```
Expected: exit code 0. An empty `series: []` is treated as "no series" and `series_order` is not required.

- [ ] **Step 6: Clean up temp files**

```bash
rm -f /tmp/lint-pass.md /tmp/lint-pass-2.md /tmp/lint-fail-1.md /tmp/lint-fail-2.md
```

- [ ] **Step 7: Commit**

```bash
git add bin/lint-frontmatter.sh
git commit -m "feat(lint): require series_order when series is set"
```

---

## Task 10: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Document the frontmatter fields**

Find the section that describes article frontmatter (search for "frontmatter" in `CLAUDE.md`). If there is no dedicated subsection for frontmatter fields, add one under "Content Management" titled **"Article frontmatter conventions"**. Add the following entry (or append to the existing list):

```markdown
- **`series`** *(optional, list of one)* — slug of the series this article belongs to,
  e.g. `series: ["ai-agents"]`. Always a single-element list (Hugo taxonomies are list-typed).
- **`series_order`** *(required iff `series` is set)* — positive integer marking the position
  within the series. Order is explicit, not derived from `date`. Enforced by
  `bin/lint-frontmatter.sh`.
```

- [ ] **Step 2: Add an "Adding a new series" checklist**

Find the existing "Removing a lander section" checklist in `CLAUDE.md`. Immediately after it, add a parallel checklist:

```markdown
### Adding a new series

Series support lives in two repos. Touch points are split between the
website (templates + lint) and the vault (content). For a brand-new
series:

1. **Vault — optional hub page.** In `dzarlax/blog-content`, create
   `series/<slug>/_index.md` with frontmatter `title` and `description`,
   plus an optional intro paragraph in the body. Skip this file if you
   are happy with the slug as the page title and no intro prose.
2. **Vault — frontmatter on each part.** Every article that belongs to
   the series gets `series: ["<slug>"]` and `series_order: <N>` in its
   frontmatter, where `N` is a positive integer.
3. **Local verification.** `bin/preview.sh build` then open
   `http://localhost:8000/series/<slug>/` and each part. Check:
   - The callout appears on every part with the correct counter and progress.
   - Prev/next at the bottom of each part points to the correct neighbours.
   - The series index page lists parts in `series_order` order.
4. **Commit and push the vault.** The website does not need a redeploy —
   the next deploy picks up the fresh vault module automatically; if you
   want it live now, trigger the deploy workflow manually.

A series with only one part renders with neither callout nor prev/next
(see spec). You don't need to remove the frontmatter — Hugo just hides
the UI until a second part exists.
```

- [ ] **Step 3: Verify the file still reads cleanly**

Spot-check the file in a previewer or just `cat CLAUDE.md | head -200`. No truncated headings, no stray HTML, list indentation matches existing items.

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs(CLAUDE): document series frontmatter and add 'Adding a new series' checklist"
```

---

## Task 11: Final verification pass and fixture cleanup

**Files:** none modified — this is end-to-end verification + local cleanup.

- [ ] **Step 1: Run the full verification matrix from the spec**

| Check | How | Expected |
|---|---|---|
| Hugo builds | `bin/preview.sh build` | zero errors |
| Existing articles render unchanged | open any pre-existing article in browser | no callout, no series-nav, layout matches `main` |
| Test series works end-to-end | open parts 1, 2, 3 + `/series/seriestest/` | callout, counter, progress, prev/next, term-page list order all correct |
| Lint rejects `series` without `series_order` | break a part's frontmatter under `hugo/content/articles/` (commit-and-revert), `git commit` | commit refused |
| Minifier preserves selectors | `grep series-callout dist-preview/assets/css/site.min.*.css` | >= 1 hit |
| Related excludes series siblings | inspect part 2 Related block | no part-1 or part-3 cards |
| Light + dark themes legible | toggle theme on a part | both themes readable |
| Mobile width legible | DevTools 375px viewport | callout single column, prev/next single column |

Record any failures and fix before continuing. If you fix anything, commit those fixes with a descriptive message before moving on.

- [ ] **Step 2: Remove the synthetic test vault**

```bash
rm -rf D:\tmp\series-test-vault
```

Also clean up the placeholder created in Task 1 if it is still in the real vault working copy:

```bash
rm -f /d/Documents/Personal/blog/series/.gitkeep
rmdir /d/Documents/Personal/blog/series 2>/dev/null || true
```

- [ ] **Step 3: Final build sanity check after fixture removal**

```bash
bin/preview.sh build
```

Expected: build succeeds. There is now no `dist-preview/series/seriestest/` directory because no article carries `series:`. `dist-preview/series/index.html` may or may not exist depending on Hugo's behaviour with an empty taxonomy — either outcome is fine.

- [ ] **Step 4: Review the branch diff**

```bash
git log --oneline origin/main..HEAD
git diff --stat origin/main..HEAD
```

Expected commits (in order):
1. `feat(blog): add series taxonomy and module mount`
2. `feat(blog): wire series context plumbing in single.html`
3. `feat(blog): implement series callout partial`
4. `feat(blog): implement series prev/next nav partial`
5. `feat(blog): exclude series siblings from Related`
6. `feat(blog): add series term page with ordered parts and ItemList JSON-LD`
7. `feat(blog): series callout, nav, and index-item styles`
8. `feat(lint): require series_order when series is set`
9. `docs(CLAUDE): document series frontmatter and add 'Adding a new series' checklist`

Plus the pre-existing spec commit from the brainstorming phase.

Expected `--stat`: changes only under `hugo/`, `bin/lint-frontmatter.sh`, `CLAUDE.md`, and `docs/superpowers/`. **No changes anywhere else** (especially not in `hugo/content/articles/` — that area must be untouched, since articles live in the vault).

- [ ] **Step 5: No commit**

This task only verifies and cleans up local fixtures. The branch is ready for the user to open the PR (the user will push manually per their git-workflow rules).
