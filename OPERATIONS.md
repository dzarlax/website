# Operations — repo & deployment reference

Engineering-side docs that live with the code. Personal writing playbook
lives in the Obsidian vault at `<vault>/_meta/blog-playbook.md` (not in this
repo).

## Architecture (in 30 seconds)

Hybrid site:
- **Lander** at `/` — static `index.html` + `style.css` + `web/*.js`. Hand-edited.
- **Blog** at `/articles/`, `/tags/`, `/index.xml` — Hugo. Source: Obsidian vault.

CI builds Hugo, drops Hugo's `index.html` (lander owns `/`), overlays static
lander files on top, deploys the merged tree. See
`.github/workflows/hugo-deploy.yml`.

```
~/Projects/Documents/Personal/blog/   ← Obsidian vault (you write here)
      │  bin/sync-content.sh
      ▼
hugo/content/                          ← rsync target, committed
      │  hugo build + lander overlay
      ▼
dzarlax.dev
```

## First-time setup (per machine)

1. **Install Hugo** (extended), Git, Python 3.
   - macOS: `brew install hugo`
   - Windows: `winget install Hugo.Hugo.Extended` (use Git Bash, not PowerShell, for the scripts)
2. **Clone**: `git clone <repo> website && cd website`
3. **Tell scripts where the vault is**:
   - Either set `BLOG_VAULT` in your shell profile, or
   - `cp .env.example .env` and edit
   - Defaults probe sensible paths per OS — see `bin/lib/vault.sh`
4. **Verify**: `bin/sync-content.sh && bin/preview.sh build`
5. **Open `<vault>/_meta/blog-playbook.md` in Obsidian** for the full writing flow.

## Scripts (`bin/`)

| Script | What |
|---|---|
| `new-article.sh "Title"` | Scaffold a new article in the vault |
| `new-tag.sh slug "Label"` | Create a new taxonomy term in the vault |
| `sync-content.sh` | rsync vault → `hugo/content/` (excludes `.obsidian/`, `_meta/`, `_drafts/`) |
| `migrate-content-to-vault.sh` | One-time: copy existing `hugo/content/` into the vault |
| `preview.sh [build] [--no-sync]` | sync + build + serve combined preview at `:8000` |

## Environment

| Var | Purpose | Default |
|---|---|---|
| `BLOG_VAULT` | Path to Obsidian vault root | OS probe — see `bin/lib/vault.sh` |
| `PORT` | Port for `bin/preview.sh` server | `8000` |
| `HUGO_PARAMS_DSTAG` | Design-system tag (CI only) | Latest release of `dzarlax/design-system` |

## Deployment

Push to `main` triggers `.github/workflows/hugo-deploy.yml`. Result lands in
`gh-pages-preview` branch until validated, then switches to the live deploy
branch. ~2 min round trip.

Manual fallback: `bin/preview.sh build` produces `dist-preview/` which can
be pushed to any static host.

## Layout

```
website/
├── OPERATIONS.md                  ← this file
├── readme.md                      ← project intro
├── index.html, style.css, …       ← lander
├── web/, assets/, projects.json   ← lander
├── hugo/
│   ├── hugo.toml
│   ├── archetypes/
│   ├── layouts/
│   ├── assets/                    ← Hugo Pipes (theme.js, animation.js, site.css)
│   └── content/                   ← GENERATED from vault, do not edit
├── bin/                           ← scripts
└── .github/workflows/             ← CI
```

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Vault not found` | Set `BLOG_VAULT` env var or `.env` |
| `rsync: command not found` (Windows) | Script falls back to `cp`. Install via MSYS2 `pacman -S rsync` if desired |
| Article not appearing on the site | Check `draft:` is `false` in frontmatter; verify `bin/sync-content.sh` succeeded; check `hugo/content/articles/<slug>/` exists |
| Build fails after editing frontmatter | YAML lint error — check quotes, indentation, commas |
| Stale content in preview | Hard reload browser (`Cmd+Shift+R` / `Ctrl+F5`), or rerun `bin/preview.sh` |

For the writing workflow, daily routine, content tactics — open the vault
and read `<vault>/_meta/blog-playbook.md`.
