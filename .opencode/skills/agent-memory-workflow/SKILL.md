---
name: agent-memory-workflow
description: 'Consistent cross-session memory protocol: mandatory recall at session start, structured save at session end, memory categories, auto-save triggers, and memory audit procedures.'
---

# Agent Memory Workflow

Protocols for persistent cross-session memory using the agentmemory MCP server. This skill turns agentmemory from an optional tool into a disciplined, reliable memory layer.

## Core Principle

Treat agentmemory as the agent's **external hippocampus** — it stores what the agent should know across sessions, not what it can re-derive from the codebase. The goal is continuity: the user should never have to repeat preferences, past decisions, or discovered conventions.

## Memory Categories

Organise memories into 5 stable categories. Every save MUST specify exactly one `type`:

| Category | `type` field | What goes in | Retention |
|----------|-------------|--------------|-----------|
| User Preferences | `preference` | Style choices (verbose/minimal), framework versions, component lib, naming conventions | Permanent |
| Architecture | `architecture` | Technology decisions, library choices, data flow design, why-X-over-Y | Permanent |
| Project Convention | `convention` | Code patterns, folder structure, naming rules, import style, error handling pattern | Permanent |
| Bug / Lesson | `lesson` | Non-obvious bugs found, debugging strategies, specific pitfalls, workarounds | Permanent |
| Session Log | `session` | What was done this session, files touched, current state | Volatile (overwritten) |

### Example saves per type

```javascript
// preference
memory_save(
  content: "User prefers minimal console output, one-line status per change.",
  concepts: ["preference", "output-style", "verbose-level"],
  files: [],
  type: "preference"
)

// architecture
memory_save(
  content: "Chose Zod over Yup because Zod has better TypeScript inference and edge runtime support.",
  concepts: ["validation", "zod", "typescript", "edge-runtime"],
  files: ["src/lib/validation.ts"],
  type: "architecture"
)

// convention
memory_save(
  content: "All API service files go under src/services/ with singular names (auth.service.ts, market.service.ts).",
  concepts: ["convention", "folder-structure", "services"],
  files: ["src/services/auth.service.ts"],
  type: "convention"
)

// lesson
memory_save(
  content: "Nuxt 4 auto-imports: components in components/ are auto-imported but NOT recursively. Nested dirs need manual export.",
  concepts: ["nuxt4", "auto-import", "components"],
  files: ["nuxt.config.ts"],
  type: "lesson"
)

// session — always overwrite the same concept key so only one session entry exists
memory_save(
  content: "Session 2025-03-21: Implemented market card component, refactored auth middleware. Next: notification system.",
  concepts: ["session-log", "current-state"],
  files: [],
  type: "session"
)
```

## Session Start Ritual (MANDATORY)

Every new session (or after `/reset`) MUST execute this sequence before any productive work:

```markdown
## Memory Recall Protocol

1. memory_smart_search(query: "user preferences", limit: 5)
2. memory_smart_search(query: "project conventions", limit: 5)
3. memory_smart_search(query: "architecture decisions", limit: 5)
4. memory_smart_search(query: "lessons learned", limit: 10)
5. memory_sessions(limit: 5) — to see what was done recently
6. memory_recall(query: "current-state") — to check session log
```

If the project has been worked on before, also call:
```javascript
// Get file-level history for any files you're about to touch
memory_file_history(files: ["src/middleware/auth.ts", "src/lib/api.ts"])
```

### Synthesise Findings

After recall, produce a one-paragraph context summary:

```
Previous context: 3 sessions found. User prefers minimal output.
Architecture: Zod validation, JWT auth with jose library.
Conventions: services under src/services/, singular names.
Last session: MarketCard component created, auth refactor pending.
```

If no context found, report: "No prior memory found — starting fresh."

## Session End Ritual (MANDATORY)

Before the session ends (user says "done", "bye", or after completing a significant task), execute:

```markdown
## Memory Save Protocol

1. Save session log (overwrite `session-log` + `current-state` concepts)
2. Save any new user preferences discovered
3. Save any new conventions observed
4. Save any lessons/bugs encountered
5. Save any architecture decisions made
6. memory_consolidate() — run the 4-tier consolidation pipeline
```

Use `memory_smart_search` first to check if you're about to duplicate something already saved.

## Auto-Save Triggers (Mid-Session)

Save immediately (don't wait for session end) when these occur:

| Trigger | Action | Example |
|---------|--------|---------|
| User states a preference | Save `type: preference` | "I prefer tabs over spaces" |
| Decision with trade-offs | Save `type: architecture` | "We chose X because Y" |
| Non-obvious bug found | Save `type: lesson` | "Remember to validate JWT expiry before payload" |
| Custom convention discovered | Save `type: convention` | "All mutations go through service layer" |
| User corrects your approach | Save `type: preference` + `type: convention` | "Don't use barrel exports" |

The heuristic: **if the user would be annoyed repeating this next session, save it now.**

## Memory Audit & Hygiene

Periodically (or when user says "organise memory" / "memory review"):

```javascript
// 1. Find duplicate or stale entries
memory_patterns()

// 2. Delete what's no longer relevant (requires user confirmation)
memory_governance_delete(memory_id: "...")

// 3. Re-consolidate
memory_consolidate()
```

### Duplicate Prevention

Before every `memory_save`, check with `memory_recall` or `memory_smart_search` whether the same information already exists. Overwrite if the old version is stale, skip if it's identical.

## Edge Cases

### No agentmemory server
If agentmemory MCP is unavailable (tools don't appear in the tool list), fall back to:
- Save a JSON file at `.opencode/memory/memory-<type>.json` using Write tool
- Recall by reading `.opencode/memory/` directory
- Report: "agentmemory server offline — using file-based fallback"

### First session ever
If `memory_sessions` returns empty, skip the full recall ritual and note: "Fresh project — no prior memory. Starting clean."

### Conflict between memory and codebase
Codebase is always the source of truth. If memory says one thing but the code shows another, trust the code and save a correction.

## Cross-Agent Memory Discipline

When the IT Leader delegates to a subagent, the subagent does NOT have direct agentmemory access. Instead:

1. **IT Leader recalls** relevant memory before delegating
2. **IT Leader includes** the synthesis in the delegation contract (see agent-delegation-contract skill)
3. **Subagent reports** any new findings at the end
4. **IT Leader saves** the subagent's findings to agentmemory

This prevents memory pollution from subagents running in shared or unclear contexts.
