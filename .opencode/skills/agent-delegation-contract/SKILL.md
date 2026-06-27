---
name: agent-delegation-contract
description: 'Structured contract template for agent-to-agent delegation: shared schema, file boundaries, interface definitions, return format, and verification protocol. Ensures reliable multi-agent collaboration.'
---

# Agent Delegation Contract

Standardised contract format for delegating work from the IT Leader (or any orchestrator) to a subagent. This skill replaces ad-hoc "go do this" delegation with explicit, verifiable contracts.

## Core Contract Template

Every delegation MUST use this template. The subagent receives this as their full brief.

```markdown
## DELEGATION CONTRACT

### Agent
@{agent-name}

### Task ID
{FE-001 | BE-001 | DES-001 | DB-001 | OPS-001 | QA-001}

### Scope
{exactly what files and components are in scope}

### Out of Scope (MANDATORY)
{exactly what the subagent MUST NOT touch}

### Input Interface
{shared types, API contracts, component props, state shape — include exact types}

```typescript
// Expected input shape (if applicable)
interface Input {
  // concrete fields + types
}
```

### Expected Output
{what the subagent must produce: files, types, behaviours}

```typescript
// Expected output shape (if applicable)
interface Output {
  // concrete fields + types
}
```

### Dependencies
{tasks that must be done first, shared modules, data that must exist}

### Constraints
{budget constraints, performance targets, security requirements, naming conventions}

### Memory Context
{relevant recall from agentmemory — user preferences, past decisions, conventions}

### Verification Criteria
{how to verify the work is correct: build, lint, test, manual checks}

### Handoff Notes
{anything else — gotchas, known issues, tricky parts}
```

## Delegation Flow

```
┌─────────────┐    1. Recall memory     ┌─────────────┐
│  IT Leader  │ ──────────────────────▶  │ agentmemory │
│             │ ◀──────────────────────  │             │
│             │    2. Load memory        │             │
│             │         context          └─────────────┘
│             │
│             │    3. Fill contract      ┌─────────────┐
│             │ ──────────────────────▶  │  Subagent   │
│             │    4. Execute work       │             │
│             │ ◀──────────────────────  │             │
│             │    5. Return result      └─────────────┘
│             │
│             │    6. Verify contract
│             │    7. Report to user
│             │    8. Save findings to memory
└─────────────┘
```

## Contract Sections — Detailed Rules

### 1. Agent Selection

Match task to the agent whose domain covers the work. See IT Leader prompt for full agent list.

| Task type | Agent | When |
|-----------|-------|------|
| UI component | `@designer` then `@frontend-nuxt` / `@frontend-react` | Design first, then implement |
| API endpoint | `@node-developer` / `@ci3` / `@laravel` / `@java-developer` / `@go-developer` | By backend stack |
| Database schema | `@database` | Schema, migration, index |
| Mobile UI | `@flutter` / `@android` | Per platform |
| Code review | `@reviewer` or language-specific reviewer | After implementation |
| Security | `@security-reviewer` | Auth, payments, PII, file upload |
| DevOps | `@devops` | CI/CD, deploy, infra |
| Agent system | `@agent-engineer` | Only for building AI agents, not development orchestration |

### 2. Scope & Out-of-Scope (CRITICAL)

Scope MUST be a specific list of files, directories, or behaviours. Out-of-scope MUST list what the subagent might naturally touch but must not.

**Good:**
```
Scope:
- src/services/notification.service.ts
- src/components/NotificationBell.vue
- src/composables/useNotifications.ts

Out of Scope:
- Auth middleware (src/middleware/auth.ts)
- Database schema changes
- Package.json or config files
- Any file outside src/
```

**Bad:**
```
Scope: notification feature
```

### 3. Input Interface

For frontend work: exact component props with TypeScript types.
For backend work: exact request/response shapes.
For database work: exact table schemas with fields and constraints.

Include actual type definitions in the contract — not references to other files. The subagent works in isolation and should not need to dig for types.

### 4. Expected Output

Concrete deliverables with file paths:

```
Expected Output:
- CREATE: src/components/NotificationBell.vue
  - Props: { unreadCount: number }
  - Emits: ['open']
- MODIFY: src/components/Header.vue
  - Add <NotificationBell /> between logo and profile
- No other files changed
```

### 5. Memory Context

The IT Leader recalls from agentmemory and includes the relevant synthesis:

```
Memory Context:
- User prefers minimal loading skeletons (just pulse animation, no text)
- Project uses Nuxt UI components, not custom HTML
- Past session: notification bell was planned but not implemented
```

### 6. Verification Criteria

Concrete, actionable verification steps the subagent must perform:

```
Verification Criteria:
1. [ ] TypeScript: `npx tsc --noEmit` passes with no new errors
2. [ ] Lint: `npx eslint src/` passes
3. [ ] Test: `npx vitest run src/components/NotificationBell.spec.ts` passes
4. [ ] Loading state renders <NotificationSkeleton />
5. [ ] Error state shows <NotificationError /> with retry button
6. [ ] Empty state shows "No notifications" text
```

## Subagent Response Contract

Every subagent MUST return results in this exact format:

```markdown
## DELEGATION RESULT

### Task ID
{FE-001}

### Files Changed
- CREATED: src/components/NotificationBell.vue
- MODIFIED: src/components/Header.vue
- DELETED: (none)

### Verification Status
- [x] TypeScript: passes
- [x] Lint: passes  
- [x] Test: 3/3 passing
- [x] All UI states handled (loading, error, empty, data)

### Deviations from Contract
{any changes to the contract — explain why}

### New Findings for Memory
{anything discovered that should be saved to agentmemory:
- conventions discovered
- bugs encountered
- decisions made
}

### Blockers / Risks
{anything the IT Leader should know}
```

## Contract Violations

If a subagent violates the contract (edits out-of-scope files, changes types without notice, skips verification):

1. Flag the violation clearly in the "Deviations" section
2. The IT Leader reviews and decides: accept deviation, revert, or re-delegate
3. If intentional, add reasoning to agentmemory as a learned convention

## Sequential Delegation (Chaining)

When subagent B's work depends on subagent A's output:

```markdown
## DELEGATION CONTRACT — Chain

### Chain Sequence
1. @database → Create schema + migration (DB-001)
2. @node-developer → Build API endpoints (BE-001, depends on DB-001)  
3. @frontend-nuxt → Build UI (FE-001, depends on BE-001)

### Shared Contracts
API contract: {swagger/openapi reference or inline types}

### Handoff Format
Each subagent's output becomes the Input Interface for the next.
The IT Leader runs each delegation sequentially, not in parallel.
```

**Chain Rule:** Do NOT delegate parallel work when subagents share interfaces or data dependencies. Use chaining instead. Parallel delegation is only safe when agents work on entirely independent subsystems with no shared types.

## Parallel Delegation Safety Check

Before delegating in parallel, verify ALL of:

- [ ] Do the agents touch different files?
- [ ] Do the agents share no types/interfaces?
- [ ] Do the agents share no data dependencies?
- [ ] Does each agent have a clearly bounded scope?

If any is NO, use chaining instead of parallel delegation.
