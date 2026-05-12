# Migration runbook — Level 2 vault sync (Hugo Modules)

This branch flips the blog from a manual `bin/sync-content.sh` flow to
consuming the Obsidian vault as a **Hugo Module** pulled from the public
`github.com/dzarlax/blog-content` repo at build time. Until the steps
below are done, this branch **will not build** (locally or in CI) — that
is intentional, the branch is the migration commit.

Run the steps in order. Most of them happen outside this repo.

## What changes

| Before | After |
|---|---|
| Vault rsync'd into `hugo/content/` via `bin/sync-content.sh` | Vault is `github.com/dzarlax/blog-content`, mounted by Hugo at build time |
| Article content committed to this repo | Article content lives only in the vault repo |
| Local dev runs `bin/sync-content.sh` before `bin/preview.sh` | Local dev runs `bin/preview.sh` directly; vault is resolved via `HUGO_MODULE_REPLACEMENTS` pointing at `$BLOG_VAULT` |
| No Go dependency | Go 1.22+ required (Hugo modules use the `go` toolchain) |

`bin/sync-content.sh` survives as an escape hatch for environments where Go
isn't available — not part of any happy path.

### Why public, not private?

Originally planned as a private repo with a PAT in CI. Reconsidered: the
rendered output is public anyway, and drafts work just fine via Hugo's
built-in `draft: true` frontmatter flag — Hugo skips them at render time
without removing them from the source. A public vault repo means:

- No `BLOG_CONTENT_TOKEN` secret to manage / rotate
- No `GOPRIVATE` / `git config insteadOf` shenanigans in CI
- `proxy.golang.org` serves the module, so CI fetches are fast and cached
- Forks of either repo work out of the box

The only thing visible to the public is in-progress drafts. If that ever
becomes a concern, the workflow is the same — just flip the repo back to
private and follow the `docs/MIGRATION-LEVEL2-private.md` runbook (kept in
git history if you ever revert).

## Prerequisites

- Repo admin access on `github.com/dzarlax`
- Local Go 1.22+ (`brew install go` / `winget install GoLang.Go`)
- `$BLOG_VAULT` already set on your dev machine

## Steps

### 1. Create the public vault repo

```bash
gh repo create dzarlax/blog-content --public --description "Obsidian vault for dzarlax.dev blog content"
```

### 2. Initialize the vault as a Go module

In the vault working copy (not this repo):

```bash
cd "$BLOG_VAULT"
go mod init github.com/dzarlax/blog-content
```

Create a `.gitignore` at the vault root that excludes the Obsidian metadata
and your private notes:

```gitignore
.obsidian/
.obsidian-mobile/
.trash/
.DS_Store
Thumbs.db
*.tmp
_meta/
```

> `_meta/` is excluded so your private writing playbook stays out of the
> public repo. `_drafts/` is NOT excluded — drafts can live there or as
> regular articles with `draft: true`. Hugo skips draft pages at render,
> so they're public-in-source but never appear on dzarlax.dev.

### 3. Push the vault

```bash
cd "$BLOG_VAULT"
git init
git add .
git commit -m "Initial blog content"
git branch -M main
git remote add origin git@github.com:dzarlax/blog-content.git
git push -u origin main
```

### 4. Optional: install the frontmatter lint hook in the vault repo too

The website repo's pre-commit hook lints staged article frontmatter, but
once content moves to `blog-content` that's the wrong place to enforce it.
Copy the linter over:

```bash
cp bin/lint-frontmatter.sh "$BLOG_VAULT/.git-hooks-lint-frontmatter.sh"
chmod +x "$BLOG_VAULT/.git-hooks-lint-frontmatter.sh"

cat > "$BLOG_VAULT/.git/hooks/pre-commit" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
ROOT="$(git rev-parse --show-toplevel)"
mapfile -t STAGED < <(
  git diff --cached --name-only --diff-filter=ACMR \
    -- 'articles/*.md' 'articles/**/*.md' 2>/dev/null \
    | grep -v '/_index\.md$' || true
)
[ "${#STAGED[@]}" -eq 0 ] && exit 0
declare -a ABS=()
for f in "${STAGED[@]}"; do ABS+=("$ROOT/$f"); done
# The linter expects articles under hugo/content/articles, but the path arg
# overrides the default scan — passing absolute paths bypasses the default.
exec "$ROOT/.git-hooks-lint-frontmatter.sh" "${ABS[@]}"
EOF
chmod +x "$BLOG_VAULT/.git/hooks/pre-commit"
```

> One quirk: the linter's title-bar comments still say "Hugo article" —
> harmless. If you want a vault-specific copy, edit the path-suggestion
> strings in the script.

### 5. Sanity-check the local build on this branch

```bash
cd <website repo>
git checkout claude/vigorous-hoover-378bdb
bin/preview.sh build
```

You should see:

```
▸ Hugo module replacement: github.com/dzarlax/blog-content → /Users/.../blog
▸ Building Hugo blog → .../dist-preview
```

If you see `error: failed to download modules` instead, check that:
- `$BLOG_VAULT` resolves to the actual vault path
- The vault has a `go.mod` (step 2)
- `go env GOMODCACHE` is writable

### 6. Sanity-check CI

Push the branch to GitHub and trigger the workflow manually (or via the
deploy preview branch). The workflow should:
1. Install Hugo, install Go
2. Resolve the design-system tag (unchanged)
3. Run `hugo mod get -u` — fetches `blog-content@latest` from `proxy.golang.org`
4. Build, overlay lander, deploy

### 7. Wire up automatic rebuilds on content push

By default, pushing an article to `blog-content` does **not** rebuild the
site — `dzarlax/website`'s workflow only triggers on its own pushes /
manual runs. To close that gap, this branch adds a `repository_dispatch`
trigger to `deploy.yml`, and a matching `notify-website.yml` workflow has
been committed locally to the vault repo. To finish wiring:

1. Generate a fine-grained PAT at <https://github.com/settings/personal-access-tokens/new>:
   - Resource owner: `dzarlax`
   - Repository access: only `dzarlax/website`
   - Repository permissions: **Contents = Read and write**, **Metadata = Read-only**
     (the `POST /repos/.../dispatches` endpoint that fires `repository_dispatch`
     is gated on Contents:write, despite the visible side effect being an
     Actions run — counterintuitive, but that's the GitHub API mapping.)
   - Expiration: 1 year (calendar a renewal task)
2. Save the token as a secret in `blog-content`:
   ```bash
   gh -R dzarlax/blog-content secret set WEBSITE_DISPATCH_TOKEN
   # paste the PAT when prompted
   ```
3. Push the pending `notify-website.yml` commit from the vault:
   ```bash
   cd "$BLOG_VAULT" && git push
   ```
4. Verify: make a trivial commit on `blog-content` (e.g. fix a typo, push),
   then watch Actions in both repos:
   - `dzarlax/blog-content` → "Notify website to rebuild" — green
   - `dzarlax/website` → "Deploy to GitHub Pages" — runs, source listed as
     `blog-content-updated` in the run details

### 8. Merge

Once steps 1–7 are green, merge this branch to `main`.

## Rollback

If the module flow blows up in CI mid-deploy:

```bash
# In the website repo
git revert <merge commit>
git push origin main
```

That restores the rsync flow. The old `bin/sync-content.sh` still works
end-to-end; you can rebuild and re-deploy from committed content while you
debug. To capture content from the vault repo back into this repo for the
revert window: `bin/sync-content.sh` reads from `$BLOG_VAULT` regardless of
whether that path is also a git working copy of `blog-content`.

## Ongoing operation

- **Write an article**: do it in Obsidian as before, commit + push in the
  vault repo (`cd "$BLOG_VAULT" && git add . && git commit -m "..." && git push`).
  The push fires `notify-website.yml` (step 7), which fires
  `repository_dispatch` on the website repo, which rebuilds and deploys.
  Roundtrip ≈ 3 min from `git push` in vault to live on dzarlax.dev.
- **Preview an in-progress article locally**: just save in Obsidian and rerun
  `bin/preview.sh`. The replacement env var reads straight from disk, no
  vault commit needed.
- **Stash a draft on GitHub without publishing**: commit it with
  `draft: true` in frontmatter. Hugo skips it at render — invisible on
  dzarlax.dev but tracked in git. Flip to `draft: false` when ready.
- **Pin to a specific vault commit** (rarely useful): replace `hugo mod get -u`
  in the workflow with `hugo mod get github.com/dzarlax/blog-content@<sha>`.

## See also

- [hugo/hugo.toml](../hugo/hugo.toml) — `[module]` block with mounts
- [.github/workflows/deploy.yml](../.github/workflows/deploy.yml) — CI fetch
- [bin/preview.sh](../bin/preview.sh) — local replacement wiring
- [OPERATIONS.md](../OPERATIONS.md) — high-level overview
