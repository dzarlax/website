# dzarlax.dev — personal site + blog

Source for [dzarlax.dev](https://dzarlax.dev): a hand-built multilingual portfolio
lander plus a Hugo-powered blog at `/articles/`. By Alexey Panfilov ([dzarlax](https://github.com/dzarlax)).

## What's here

- **Lander** (`/`) — static HTML/CSS/vanilla-JS. Multilingual (en/ru/rs), dark/light
  theme, project showcase from `projects.json`.
- **Blog** (`/articles/`, `/tags/`, `/index.xml`) — Hugo Modules pull content from
  the public [`dzarlax/blog-content`](https://github.com/dzarlax/blog-content) repo
  (an Obsidian vault) at build time.

CI merges the two at deploy: Hugo builds the blog → lander files are overlaid on top
→ GitHub Pages serves the merged tree. See [OPERATIONS.md](OPERATIONS.md) for the
engineering reference, [docs/MIGRATION-LEVEL2.md](docs/MIGRATION-LEVEL2.md) for the
vault-as-module setup.

## ✍️ Writing a blog post

The detailed writing playbook is in the Obsidian vault at
`<vault>/_meta/blog-playbook.md` (gitignored).

TL;DR:

1. `bin/new-article.sh "Title"` — scaffold an article in `$BLOG_VAULT`
2. Write in Obsidian; preview locally with `bin/preview.sh` (vault loaded via
   Hugo module path replacement — no commit needed)
3. `cd "$BLOG_VAULT" && git add . && git commit -m "..." && git push` — that
   push fires `repository_dispatch` to this repo and triggers a deploy
4. ~3 min later the post is live on dzarlax.dev

`$BLOG_VAULT` defaults to `~/Projects/Documents/Personal/blog` (macOS) or
`/d/Documents/Personal/blog` (Windows Git Bash). Override via env var or `.env`.

## 🛠️ Setup & dev

### Bootstrap (per machine)

```bash
# macOS
brew install hugo go        # Hugo extended + Go 1.22+ (Hugo modules need Go)
# Windows (Git Bash, not PowerShell)
winget install Hugo.Hugo.Extended GoLang.Go

git clone https://github.com/dzarlax/website.git && cd website
git clone https://github.com/dzarlax/blog-content.git ~/Projects/Documents/Personal/blog
bin/install-git-hooks.sh    # frontmatter lint on commit
bin/preview.sh              # build + serve on :8000
```

Full setup details: [OPERATIONS.md](OPERATIONS.md).

### Day-to-day

| Command | Use |
|---|---|
| `bin/preview.sh` | Build merged lander + blog, serve on `:8000` |
| `bin/preview.sh build` | Build only (output in `dist-preview/`) |
| `bin/new-article.sh "Title"` | Scaffold a new article in the vault |
| `bin/new-tag.sh slug "Label"` | Scaffold a new tag in the vault |
| `bin/lint-frontmatter.sh` | Lint article frontmatter (also run as pre-commit hook) |

For fastest template/CSS iteration on the blog only:

```bash
cd hugo && hugo server --disableFastRender
# http://localhost:1313/articles/
```

### Deploying

Push to `main` (or vault repo push, via dispatch) → `.github/workflows/deploy.yml`
runs → GitHub Pages serves. ~2–3 min roundtrip.

## 📁 Repo layout

```
.
├── index.html, style.css         — lander
├── projects.json                                              — lander data
├── achievements.md, education.md, experience.md, skills.md   — lander content
├── web/                                                       — lander JS
├── assets/                                                    — lander images
├── hugo/
│   ├── hugo.toml         — [module] block imports blog-content
│   ├── go.mod
│   ├── layouts/, assets/, archetypes/, data/
│   └── content/_index.md, content/articles/_index.md  — section metadata only
├── bin/                  — scripts (preview, new-article, lint, etc.)
├── docs/                 — engineering docs (migration runbooks)
└── .github/workflows/    — CI
```

Lander files referenced in `index.html`:

- `web/theme.js` — dark/light theme + localStorage persistence
- `web/localization-core.js` + `web/localization-data-{en,ru,rs}.js` — i18n
- `web/projects.js`, `web/experience.js`, `web/education.js`, `web/skills.js` —
  dynamic content rendering
- `web/skill-icons.js`, `web/contacts.js`, `web/animation.js`, `web/vitals.js` —
  utilities
- `web/structured-data.json` — JSON-LD payload

## 🎨 CSS & design tokens

The lander and blog share a token system, surfaced via the
[`dzarlax/design-system`](https://github.com/dzarlax/design-system) CDN package.

- **Monochrome editorial palette**: light = `#FCFAF7` ivory / `#1A1A1E` graphite;
  dark = `#1A1D21` / `#F5F5F5`. (Older inline comments may still mention a
  blue `--brand-hue: 217` — that palette has been retired.)
- **4px spacing grid**: `--s-1: 4px`, `--s-2: 8px`, ..., `--s-6: 24px`
- **Typography scale**: `--f-base: 1rem`, `--f-ratio: 1.2`
- **BEM-ish naming**, layout utilities prefixed `.l-*`
- **CSS nesting** + **logical properties** (`inline-size`, `margin-inline`, etc.)

See [CSS_ARCHITECTURE.md](CSS_ARCHITECTURE.md) for the full token reference and
the optimization roadmap.

## 🌐 Localization

Three locales: `en`, `ru`, `rs` (note: `rs`, not `sr`). All lander content is
keyed by `data-lang="..."` attributes on HTML elements; translations live in
`web/localization-data-*.js`. The `languageChanged` `CustomEvent` lets other
modules (projects, experience, etc.) re-render when the language switches.

Blog content is single-language per article — articles use whatever language
they're written in; tags and section metadata are en-only.

## 🔧 Development guidelines

CSS:

1. Always use design tokens — no hardcoded values
2. Prefer logical properties for RTL support
3. Nest component styles
4. Follow BEM naming
5. Test at 768px mobile breakpoint

JS:

- Vanilla, no frameworks
- Event-driven cross-module communication (`languageChanged`, `themeChanged`)
- Always escape user-rendered content (`escapeHtml()`)

See [CLAUDE.md](CLAUDE.md) for in-depth conventions and the architecture map.

## 📄 License

Personal project — all rights reserved.

## 📞 Contact

- GitHub: [dzarlax](https://github.com/dzarlax)
- LinkedIn: [Alexey Panfilov](https://linkedin.com/in/dzarlax)
- Web: [dzarlax.dev](https://dzarlax.dev)
