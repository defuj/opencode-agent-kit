---
name: progress-tracking
description: 'Multi-step task tracking system: todo hierarchy, status protocol, cross-agent status sharing, session-boundary recovery, and visual progress reporting.'
---

# Progress Tracking

Structured system for tracking multi-step tasks across agents, sessions, and context window limits. Mirrors Hermes Agent's `todo` tool discipline — every task has a lifecycle, status, and owner.

## Core Model

Every unit of work follows this lifecycle:

```
BACKLOG → TODO → IN_PROGRESS → REVIEW → DONE
                                    ↓
                                 CANCELLED (explicit only)
```

| Status | Meaning |
|--------|---------|
| `BACKLOG` | Known but not started |
| `TODO` | Ready to start |
| `IN_PROGRESS` | Actively being worked on |
| `REVIEW` | Submitted, awaiting verification or user sign-off |
| `DONE` | Verified complete |
| `CANCELLED` | Explicitly abandoned (with reason) |
| `BLOCKED` | Waiting on external dependency |

**Rule:** Only ONE task can be IN_PROGRESS per agent at a time.

## Task Tracking via Todowrite

OpenCode provides a `todowrite` tool. Use it as the primary task store within a session. Every task item MUST have a stable ID.

### Task ID Convention

Use a hierarchical ID for cross-reference:

```
<agent-prefix>-<number>

Prefixes:
FE  = frontend (nuxt / react / angular)
BE  = backend (node / ci3 / laravel / java / go / python / rust / swift / dotnet / cpp)
DB  = database
DS  = designer
QA  = code review / quality
OP  = devops / deploy
SEC = security
GEN = general / research
```

Examples: `FE-001`, `BE-012`, `DB-003`, `QA-002`

### Task Entry Format

Every todowrite entry MUST include this structure:

```
{ID}: {short description} | priority:{P0|P1|P2|P3} | depends:{IDs or -} | assignee:{@agent}
```

Example:
```
FE-001: Create NotificationBell component | priority:P1 | depends:BE-002 | assignee:@frontend-nuxt
BE-002: Build notification API endpoint | priority:P1 | depends:DB-001 | assignee:@node-developer
DB-001: Create notifications table migration | priority:P1 | depends:- | assignee:@database
```

When using todowrite, include dependencies and assignee in the item description or as structured context.

## Visual Progress Report

When the user asks about status (or after completing a task), produce a progress table:

```
## Progress Report

| ID | Task | Status | Priority | Dependencies | Owner |
|----|------|--------|----------|--------------|-------|
| DB-001 | Create notifications table | ✅ DONE | P1 | — | @database |
| BE-002 | Build notification API | 🔄 IN PROGRESS | P1 | DB-001 | @node-developer |
| FE-001 | NotificationBell component | ⏳ TODO | P1 | BE-002 | @frontend-nuxt |
| FE-002 | NotificationList modal | ⏳ TODO | P2 | FE-001 | @frontend-nuxt |

Blockers:
- (none)

Overall: 1/4 done, 0 blocked
```

Status emoji convention:
- `⬜` BACKLOG or unstarted
- `⏳` TODO (ready)
- `🔄` IN PROGRESS
- `🔍` REVIEW
- `✅` DONE
- `❌` CANCELLED
- `🚫` BLOCKED

## Session Start Handoff

When starting a new session after previous work was done, reconstruct task state:

1. **Check agentmemory**: `memory_recall(query: "task-status")` or `memory_smart_search(query: "progress tracking current state")`
2. **Check file-based fallback**: Read `.opencode/memory/task-status.json` if agentmemory is unavailable
3. **Infer from codebase**: Check recent git commits, modified files, open branches
4. **Report to user**: "I see you were working on X. Last status was: [summary]. Shall I continue?"

### Task Status Save Format (for session end / checkpoint)

Save to agentmemory (or file fallback) at every significant checkpoint:

```javascript
memory_save(
  content: JSON.stringify({
    timestamp: "2025-03-21T14:30:00Z",
    active_tasks: [
      { id: "BE-002", status: "in_progress", description: "Build notification API" },
      { id: "FE-001", status: "todo", description: "NotificationBell component", depends_on: "BE-002" }    
    ],
    completed_tasks: ["DB-001"],
    blocked_tasks: []
  }),
  concepts: ["task-status", "progress", "current-state"],
  files: [],
  type: "session"
)
```

## Cross-Agent Status Protocol

When IT Leader delegates to subagents:

1. **Before delegation**: IT Leader reports the current task list in the delegation contract (see agent-delegation-contract skill)
2. **During work**: Subagent updates progress inside its own session using todowrite
3. **After completion**: Subagent returns completion status in the DELEGATION RESULT
4. **Integration**: IT Leader updates the master task list with subagent's results

### Single-Agent Task Stack

When working directly (not delegating), maintain a mental task stack:

```
Current: BE-002 Build notification API (in progress)
  └─ 1. Create route handler
  └─ 2. Add validation middleware  ← CURRENT
  └─ 3. Write tests

Next:    FE-001 NotificationBell component
Pending: FE-002 NotificationList modal
```

The CURRENT marker shows exactly where you are. After finishing a substep, move the marker.

## Context Window Recovery

When approaching context limits and compression is needed, the progress tracking data is in the **Critical** retention tier:

```markdown
## Task State (RETAIN DURING COMPRESSION)

In progress: BE-002 (notification API — route handler done, validation pending)
TODO: FE-001 (blocked on BE-002), FE-002
Completed: DB-001
Blocked: none

Compression note: dropped substep details for BE-002. Validation needs Zod schema + middleware.
```

## Status Commands

The `.opencode/commands/` directory includes commands for common progress actions:

### `/status`
Invoke to produce a visual progress report and check for blocked tasks.

### `/continue` 
Invoke after session resume to reconstruct task state from agentmemory and report to user.
