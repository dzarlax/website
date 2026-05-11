#!/usr/bin/env bash
# Resolve the Obsidian vault path for the current machine.
# Sourced by other bin/ scripts — DO NOT execute directly.
#
# Priority:
#   1. $BLOG_VAULT env var (set per machine, override anything)
#   2. .env file in repo root (per-machine config, gitignored)
#   3. Sensible default per OS

resolve_vault() {
  # 1. Already set?
  if [ -n "${BLOG_VAULT:-}" ]; then
    echo "$BLOG_VAULT"
    return
  fi

  # 2. .env file at repo root?
  local repo_root
  repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
  if [ -f "$repo_root/.env" ]; then
    # shellcheck disable=SC1091
    set -a; . "$repo_root/.env"; set +a
    if [ -n "${BLOG_VAULT:-}" ]; then
      echo "$BLOG_VAULT"
      return
    fi
  fi

  # 3. Default per OS. Probe a few common locations; first match wins.
  case "$(uname -s)" in
    Darwin)
      for p in \
        "$HOME/Projects/Documents/Personal/blog" \
        "$HOME/Documents/Personal/blog"
      do
        if [ -d "$p" ]; then echo "$p"; return; fi
      done
      # Fallback (may not exist yet — used in error messages)
      echo "$HOME/Projects/Documents/Personal/blog"
      ;;
    MINGW*|MSYS*|CYGWIN*)
      # Git Bash on Windows. $HOME resolves to %USERPROFILE% (usually C:).
      # The vault may live on D: — probe common locations.
      for p in \
        "/d/Documents/Personal/blog" \
        "/d/Personal/blog" \
        "/d/blog" \
        "$HOME/Documents/Personal/blog" \
        "/c/Users/$USER/Documents/Personal/blog"
      do
        if [ -d "$p" ]; then echo "$p"; return; fi
      done
      # Fallback hint (most likely D: per user's setup)
      echo "/d/Documents/Personal/blog"
      ;;
    Linux)
      echo "$HOME/Documents/Personal/blog"
      ;;
    *)
      echo ""
      ;;
  esac
}

ensure_vault() {
  local vault
  vault="$(resolve_vault)"

  if [ -z "$vault" ]; then
    echo "✗ Could not resolve vault path." >&2
    echo "  Set BLOG_VAULT in your shell profile or .env file in repo root." >&2
    return 1
  fi

  if [ ! -d "$vault" ]; then
    echo "✗ Vault not found: $vault" >&2
    echo "  Either:" >&2
    echo "    1. Create the folder and open it as an Obsidian vault, or" >&2
    echo "    2. Set BLOG_VAULT env var to your actual vault path" >&2
    return 1
  fi

  echo "$vault"
}
