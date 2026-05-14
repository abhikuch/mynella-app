#!/usr/bin/env bash
# Run the Sanity CLI with cwd = sanity/ using an absolute path to node + CLI entry.
# Avoids npm --prefix / bare `sanity` on PATH breaking when the repo path contains spaces.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SANITY_DIR="$ROOT/sanity"
CLI="$SANITY_DIR/node_modules/sanity/bin/sanity"
if [[ ! -f "$CLI" ]]; then
  echo "Missing $CLI — run npm install in sanity/ first." >&2
  exit 1
fi
# @sanity/cli runs a vendored macOS term-size helper via `sh -c <path>`; paths with
# spaces break unless we skip that probe (COLUMNS/LINES short-circuit term-size).
export COLUMNS="${COLUMNS:-120}"
export LINES="${LINES:-40}"
mkdir -p "$SANITY_DIR/backups"
cd "$SANITY_DIR"
exec node "$CLI" "$@"
