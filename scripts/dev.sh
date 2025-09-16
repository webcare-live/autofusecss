#!/usr/bin/env bash
set -euo pipefail

echo "AutofuseCSS dev environment"
echo "Node version: $(node -v)"

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DOCS_DIR="$ROOT_DIR/apps/docs"

echo "Installing/Updating root dependencies..."
(cd "$ROOT_DIR" && npm install)

echo "Installing/Updating docs dependencies..."
(cd "$DOCS_DIR" && npm install)

echo "Ensuring dist build exists..."
(cd "$ROOT_DIR" && npm run -s build >/dev/null)

cleanup() {
  echo "\nShutting down..."
  jobs -p | xargs -I {} kill {} 2>/dev/null || true
}
trap cleanup EXIT INT TERM

echo "Starting library watcher..."
(cd "$ROOT_DIR" && npm run -s dev) &
LIB_PID=$!

# Pick a free port starting from 4001 and export it to the server
pick_port() {
  local start=${1:-4001}
  local p=$start
  while true; do
    if ! lsof -i :$p -sTCP:LISTEN >/dev/null 2>&1; then
      echo $p; return
    fi
    p=$((p+1))
  done
}

TOK_PORT=$(pick_port 4001)
echo "Starting tokens server on http://localhost:$TOK_PORT ..."
(cd "$ROOT_DIR" && PORT=$TOK_PORT npm run -s tokens:server) &
TOK_PID=$!

# Helper: kill any processes listening on a port (macOS compatible)
kill_port() {
  local port=$1
  if [ -z "$port" ]; then
    return 0
  fi

  # Find PIDs listening on the port (TCP LISTEN)
  local pids
  pids=$(lsof -i TCP:$port -sTCP:LISTEN -t 2>/dev/null || true)
  if [ -z "$pids" ]; then
    return 0
  fi

  echo "Port $port is in use by pid(s): $pids"
  for pid in $pids; do
    echo "Killing pid $pid (port $port)..."
    kill "$pid" 2>/dev/null || true
  done

  # Give processes a moment to exit, then force kill if still present
  sleep 0.5
  pids=$(lsof -i TCP:$port -sTCP:LISTEN -t 2>/dev/null || true)
  if [ -n "$pids" ]; then
    echo "Forcing kill for remaining pid(s): $pids"
    for pid in $pids; do
      kill -9 "$pid" 2>/dev/null || true
    done
  fi
}

DOCS_PORT=${DOCS_PORT:-3000}
if [ "${SKIP_KILL:-0}" != "1" ]; then
  echo "Checking port $DOCS_PORT for existing processes..."
  kill_port "$DOCS_PORT"
else
  echo "SKIP_KILL=1 set; not killing processes on port $DOCS_PORT"
fi

echo "Starting docs on http://localhost:$DOCS_PORT ..."
(cd "$DOCS_DIR" && PORT=$DOCS_PORT npm run -s dev) &
DOCS_PID=$!

echo "\nAll services running:
- lib watcher (pid $LIB_PID)
- tokens server (pid $TOK_PID) → http://localhost:$TOK_PORT
- docs app (pid $DOCS_PID) → http://localhost:3000
"

wait
