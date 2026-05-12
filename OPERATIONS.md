# Operations — repo & deployment reference

Engineering-side docs that live with the code. Personal writing playbook
lives in the Obsidian vault at `<vault>/_meta/blog-playbook.md` (not in this
repo).

## Architecture (in 30 seconds)

Hybrid site:
- **Lander** at `/` — static `index.html` + `style.css` + `web/*.js`. Hand-edited.
- **Blog** at `/articles/`, `/tags/`, `/index.xml` — Hugo. Source: Obsidian vault, consumed as a Hugo Module from the public `github.com/dzarlax/blog-content` repo. Drafts (`draft: true` in frontmatter) live in the repo but Hugo skips them at render — same trick as in any Hugo blog.

CI builds Hugo, drops Hugo's `index.html` (lander owns `/`), overlays static
lander files on top, deploys the merged tree. See
`.github/workflows/deploy.yml`.

```
github.com/dzarlax/blog-content       ← private vault repo (you push from Obsidian)
      │
      │  Hugo module import — pulled at build time
      │  (locally replaced with $BLOG_VAULT for live editing)
      ▼
hugo build + lander overlay
      ▼
dzarlax.dev
```

The legacy `bin/sync-content.sh → hugo/content/` flow is kept around as an
escape hatch only. See [docs/MIGRATION-LEVEL2.md](docs/MIGRATION-LEVEL2.md)
for the one-time vault-repo bootstrap.

## First-time setup (per machine)

1. **Install toolchain**: Hugo (extended), Go 1.22+, Git, Python 3.
   - macOS: `brew install hugo go`
   - Windows: `winget install Hugo.Hugo.Extended GoLang.Go` (use Git Bash, not PowerShell, for the scripts)
2. **Clone**: `git clone <repo> website && cd website`
3. **Tell scripts where the vault is**:
   - Either set `BLOG_VAULT` in your shell profile, or
   - `cp .env.example .env` and edit
   - Defaults probe sensible paths per OS — see `bin/lib/vault.sh`
4. **Install the pre-commit hook** (once per clone): `bin/install-git-hooks.sh`
5. **Verify**: `bin/preview.sh build`
   - On a fresh machine without the vault yet, this fails fast — pull the
     vault working copy down first (Obsidian Sync / clone `blog-content`).
6. **Open `<vault>/_meta/blog-playbook.md` in Obsidian** for the full writing flow.

## Scripts (`bin/`)

| Script | What |
|---|---|
| `new-article.sh "Title"` | Scaffold a new article in the vault |
| `new-tag.sh slug "Label"` | Create a new taxonomy term in the vault |
| `preview.sh [build]` | Build + serve combined preview at `:8000`. Vault is loaded via Hugo module replacement (no rsync) |
| `lint-frontmatter.sh [files...]` | Frontmatter linter for articles (title, description, date, tags, draft). Run by pre-commit hook |
| `install-git-hooks.sh` | One-shot: installs the pre-commit hook into `.git/hooks/` |
| `sync-content.sh` | **Deprecated** rsync flow. Only used as an emergency escape hatch (e.g. Go unavailable). Also handles PNG/JPG → WebP conversion |
| `migrate-content-to-vault.sh` | One-time historical: copy existing `hugo/content/` into the vault |

## Environment

| Var | Purpose | Default |
|---|---|---|
| `BLOG_VAULT` | Path to Obsidian vault working copy | OS probe — see `bin/lib/vault.sh` |
| `PORT` | Port for `bin/preview.sh` server | `8000` |
| `HUGO_PARAMS_DSTAG` | Design-system tag (CI only) | Latest release of `dzarlax/design-system` |
| `HUGO_MODULE_REPLACEMENTS` | Module-path → local-path overrides for Hugo. Set automatically by `bin/preview.sh` to point `blog-content` at `$BLOG_VAULT` | unset in CI |
| `WEBP_QUALITY` | cwebp quality for the sync-content.sh image conversion | `82` |
| `NO_WEBP` | Skip the WebP conversion step in sync-content.sh | unset |

## Deployment

Two triggers feed `.github/workflows/deploy.yml`:

1. **Push to `main`** in this repo — engineering changes (templates, lander, CSS).
2. **`repository_dispatch` of type `blog-content-updated`** — fired by
   `notify-website.yml` in `dzarlax/blog-content` on each push to its
   main. New articles ship without a touch-commit here.

The workflow installs Hugo + Go, runs `hugo mod get -u` to pull the latest
`blog-content` commit from the public Go module proxy, then builds + overlays
+ deploys via GitHub Pages. Roundtrip ≈ 2–3 min.

Required secret on the **vault** repo: `WEBSITE_DISPATCH_TOKEN` — a fine-
grained PAT scoped to `dzarlax/website` with `Actions: write`. See
docs/MIGRATION-LEVEL2.md step 7 for rotation. No secrets on this repo
beyond the default `GITHUB_TOKEN`.

Manual fallback: `bin/preview.sh build` produces `dist-preview/` which can
be pushed to any static host. Module replacement makes this fully local —
no network needed if `$BLOG_VAULT` resolves.

## Layout

```
website/
├── OPERATIONS.md                  ← this file
├── readme.md                      ← project intro
├── docs/MIGRATION-LEVEL2.md       ← vault-as-module bootstrap runbook
├── index.html, style.css, …       ← lander
├── web/, assets/, projects.json   ← lander
├── hugo/
│   ├── hugo.toml                  ← includes [module] block
│   ├── go.mod                     ← declares the website as a Go module
│   ├── archetypes/
│   ├── layouts/
│   ├── assets/                    ← Hugo Pipes (theme.js, animation.js, site.css)
│   └── content/                   ← section _index.md files only;
│                                    articles + tag pages mounted from module
├── bin/                           ← scripts
└── .github/workflows/             ← CI
```

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Vault not found` | Set `BLOG_VAULT` env var or `.env` |
| `go: github.com/dzarlax/blog-content@latest: ... no matching versions` (CI) | `blog-content` repo isn't pushed yet, or its default branch has no commits, or there's no `go.mod` at its root. See docs/MIGRATION-LEVEL2.md |
| Local build can't fetch the module | The replacement env var should make this impossible. Run `echo $HUGO_MODULE_REPLACEMENTS` after `bin/preview.sh` starts — it should point at `$BLOG_VAULT`. If not, check that Go is on PATH and `bin/preview.sh` reached its `export` line |
| Article not appearing on the site | Check `draft:` is `false` in frontmatter; pre-commit hook should have caught this. Verify the vault commit was pushed to `blog-content`. CI pulls `@latest`, so the next deploy picks it up |
| Build fails after editing frontmatter | YAML lint error — re-run `bin/lint-frontmatter.sh path/to/index.md` for a readable diagnostic |
| Stale content in preview | Hard reload browser (`Cmd+Shift+R` / `Ctrl+F5`), or rerun `bin/preview.sh` |
| WebP conversion (sync-content.sh fallback) missed images | `cwebp` not installed. `brew install webp` / `apt install webp` |

For the writing workflow, daily routine, content tactics — open the vault
and read `<vault>/_meta/blog-playbook.md`.
