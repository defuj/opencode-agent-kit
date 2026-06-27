---
description: Reconstruct task state after session resume or context compression. Restore progress, active tasks, and memory context before continuing work.
---

# Continue Command

Invoke `/continue` after resuming a session (e.g., after `/reset`, after context compression, or at the start of a new CLI session).

## When to Use

- After `/reset`
- After context compression
- Starting a new session for an existing project
- User returns after a break and says "where were we?"

## How It Works

The command runs a 3-step recovery protocol:

### Step 1: Recall Memory Context

Query agentmemory for:
1. `memory_smart_search(query: "task-status progress current-state", limit: 5)` — restore task tracking state
2. `memory_smart_search(query: "user preferences", limit: 3)` — reload user preferences
3. `memory_smart_search(query: "project conventions", limit: 3)` — reload conventions
4. `memory_recall(query: "current-state")` — get last session log
5. `memory_sessions(limit: 5)` — see recent activity

### Step 2: Verify Against Codebase

Quick sanity check: do the files mentioned in memory still exist? If not, flag as stale:

```
Reconciling with codebase...
- src/services/notification.service.ts — EXISTS ✅
- src/components/NotificationBell.vue — EXISTS ✅
- src/components/Header.vue — EXISTS ✅
All files from last session present.
```

### Step 3: Report to User

```markdown
Session resumed.

## What We Were Doing
Working on notification feature:
- ✅ DB-001: Migration done
- 🔄 BE-002: API endpoint (route handler done, validation pending)
- ⏳ FE-001: NotificationBell (blocked on BE-002)

## Memory Restored
- 12 previous sessions found
- User preferences: minimal output, Nuxt UI components
- Conventions: services in src/services/, singular file names
- Lessons: none new since last session

Shall I continue with BE-002 (validation middleware)?
```

## Integration

This command relies on:
- `agent-memory-workflow` skill — for the session start recall ritual
- `progress-tracking` skill — for task status recovery
- `agentmemory` MCP — for persistent storage
