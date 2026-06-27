---
description: Display current task progress, track multi-step work status, and visualise remaining work with priority and blocker information.
---

# Status Command

Invoke `/status` to produce a visual snapshot of all in-flight and pending tasks.

## When to Use

- User asks "what's the status?" or "where are we?"
- After completing a delegation cycle
- Before context compression or session end
- After resuming a session to confirm current state

## How It Works

The agent recalls the current task state from todowrite and agentmemory, then presents a structured progress table:

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

## Status Emoji Convention

| Emoji | Status |
|-------|--------|
| ⬜ | BACKLOG — known but not started |
| ⏳ | TODO — ready to start |
| 🔄 | IN PROGRESS — actively being worked on |
| 🔍 | REVIEW — submitted for verification |
| ✅ | DONE — verified complete |
| ❌ | CANCELLED — explicitly abandoned |
| 🚫 | BLOCKED — waiting on external dependency |

## Integration with Progress Tracking

This command relies on the `progress-tracking` skill (`.opencode/skills/progress-tracking/SKILL.md`) for:
- Task ID conventions (`FE-001`, `BE-002`, etc.)
- Task lifecycle states
- Cross-agent status protocol

## Example Output

```
User: /status

Agent:
# Progress Report

## Active Tasks
| ID | Task | Status | Priority | Depends On |
|----|------|--------|----------|------------|
| BE-002 | Notification API endpoint | 🔄 IN PROGRESS | P1 | DB-001 |
| FE-001 | NotificationBell component | ⏳ TODO | P1 | BE-002 |

## Completed
- DB-001: Notifications table migration

## Blockers
None.

## Session Context
Last session: API route handler done, validation middleware in progress.
```
