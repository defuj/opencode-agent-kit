---
name: agent-task-workflow
description: 'Universal task approach patterns for coding agents: operating modes, task workflow, lightweight mode, scope safety, verification matrix, definition of done, and quality checklist.'
---

# Agent Task Workflow

Standardized approach patterns for every coding agent. Use this skill to determine how to approach tasks of any size.

## Operating Modes

Choose execution depth based on user intent and task complexity.

| Mode       | When                                                                     | Workflow                                                                   |
| ---------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `fast`     | Tiny, low-risk tasks (typo, spacing, icon swap, single-field edit)       | Minimal planning, minimal diff, skip MCP lookups if local pattern is clear |
| `balanced` | Default — normal feature work                                            | Moderate planning, load skills when needed, run proportional checks        |
| `thorough` | Complex/risky tasks (auth, data flow, many files, cross-cutting changes) | Deep analysis, wider verification, explicit trade-off discussion           |

If user does not specify mode, infer automatically from task size and risk.

## Task Approach Pattern

For each task, follow this protocol:

```
1. Understand
   - Read requirements carefully
   - Identify constraints and goals
   - Read only files needed for scope; infer local patterns first

2. Plan
   - Load relevant skills
   - Identify affected files
   - Define minimal set of touched files
   - Consider edge cases and failure modes

3. Implement
   - Write clean, typed code following project conventions
   - Keep changes small and explicit
   - Reuse existing helpers and middleware patterns

4. Verify
   - Run checks proportional to risk (see Verification Matrix)
   - If checks cannot run, report exact commands to run
   - Review for best practices and edge cases

5. Report
   - What changed (1-3 bullets)
   - Files touched (explicit paths)
   - Verification status
```

## Lightweight Mode for Simple Tasks

For small, low-risk requests, use a minimal-change workflow.

**Trigger Lightweight Mode when ALL are true**:

- Change touches 1-2 files
- No API contract, auth, database, or routing changes
- No architecture or state-management redesign
- Request is clear and implementation is straightforward

**Lightweight Mode protocol**:

1. Read the target file(s) and existing local pattern
2. Implement the smallest correct change
3. Do a quick verification (type/lint/build check only if immediately relevant)
4. Return concise result with changed file path(s)

**Skip by default**:

- Full multi-step planning narrative
- Broad skill-loading announcements
- Extended documentation updates
- Extra refactors unrelated to the request

**Guardrail**: If hidden complexity appears (cross-file impact, uncertain behavior, failing checks), immediately switch back to the full Task Approach Pattern.

## Scope Safety Rules (Non-Negotiable)

- Modify only files required by the user request
- Do not perform opportunistic refactors outside scope
- Do not change project-wide config (build, lint, tsconfig, CI, env) unless requested
- Prefer smallest diff that fully solves the task
- Preserve repository conventions over personal preference
- If unrelated local changes exist, leave them untouched

## Output Contract (Response Format)

For every implementation task, end with this concise structure:

1. What changed (1-3 bullets)
2. Files touched (explicit paths)
3. Verification status (`verified` | `partially_verified` | `not_verified`)
4. If not fully verified: exact commands user should run
5. Optional next step (only if natural)

## Verification Matrix

| Task Size | Required Checks                                                 |
| --------- | --------------------------------------------------------------- |
| Tiny      | Optional targeted check; no full build required by default      |
| Small     | At least one relevant check (lint OR typecheck OR focused test) |
| Medium+   | Lint + typecheck + relevant tests when permitted                |

If commands are restricted by permissions:

1. Continue non-blocked work first
2. Attempt lower-privilege verification (static review, targeted checks allowed)
3. Report what could not be executed with explicit commands for manual execution
4. Mark verification as `partially_verified` or `not_verified`

## Definition of Done

### Tiny Task (single-file, trivial UI/content tweak)

- Requested change implemented with minimal diff
- Existing local pattern preserved
- No unrelated file edits
- Verification status reported (verified / partially_verified / not_verified)

### Small Task (1-3 files, localized behavior change)

- All Tiny Task criteria met
- Edge states for touched UI considered (loading/error/empty where relevant)
- Type safety and lint impact reviewed for touched code
- If runtime checks blocked, provide exact commands for user to run

### Medium+ Task (cross-file feature/refactor)

- All Small Task criteria met
- Clear implementation notes and trade-offs provided
- Validation performed with available checks (tests/lint/build as appropriate)
- Follow-up risks or TODOs explicitly listed

## Quality Checklist

Before marking any task as complete, verify:

- [ ] Code follows project conventions
- [ ] TypeScript strict mode compliance (or language-equivalent)
- [ ] Loading, error, and empty states handled
- [ ] No console.log statements left
- [ ] No hardcoded secrets or sensitive values
- [ ] Imports are organized
- [ ] Code is accessible (labels, focus, contrast)
- [ ] Responsive design implemented (for UI tasks)
- [ ] Performance implications considered
- [ ] Tests would be easy to write for this code
