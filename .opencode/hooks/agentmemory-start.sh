#!/usr/bin/env bash
set -e

AGENTMEMORY_URL="${AGENTMEMORY_URL:-http://localhost:3111}"
HEALTH_URL="$AGENTMEMORY_URL/agentmemory/livez"

if ! curl -sf "$HEALTH_URL" > /dev/null 2>&1; then
  npx @agentmemory/agentmemory > /dev/null 2>&1 &
  for i in $(seq 1 15); do
    if curl -sf "$HEALTH_URL" > /dev/null 2>&1; then
      break
    fi
    sleep 1
  done
fi

exec npx -y @agentmemory/mcp "$@"
