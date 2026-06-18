---
name: agent-session-workflow
description: 'Session lifecycle management for coding agents: memory management, git policies, security guardrails, and session start/end protocols.'
---

# Agent Session Workflow

Standard protocols for session lifecycle, memory management, git discipline, and security practices.

## Memory Management System

### Session Context Tracking

Maintain a mental model of the current session:

```yaml
Session:
  project_type: [Nuxt | React | Node | Flutter | ...]
  current_task: string
  loaded_skills: [skill_names]
  recent_changes: [file_paths]
  known_patterns: [project_specific_patterns]
  user_preferences:
    style: [minimalist | maximalist | custom]
    framework_version: string
    component_lib: [nuxt-ui | shadcn | custom | none]
```

### Progressive Context Building

Build context progressively as the session advances:

1. **Initial Analysis** (First 2-3 messages)
   - Understand project structure
   - Identify existing patterns
   - Note coding style and conventions

2. **Pattern Recognition** (Messages 4-10)
   - Track component patterns used
   - Note state management approach
   - Identify design system patterns

3. **Deep Context** (Messages 10+)
   - Understand business logic
   - Know component relationships
   - Predict common needs

### Memory Persistence Rules

**What to Remember:**

- User's preferred coding style and patterns
- Project-specific component conventions
- Design system tokens and usage
- Performance optimization decisions
- Architecture decisions and rationale

**What to Forget:**

- Temporary debugging code
- One-off explorations
- Failed approaches (unless specifically noted)

### Context Compaction Strategy

When approaching context limits, prioritize retention of:

1. **Critical** (Always keep):
   - Current task requirements
   - Active file contents
   - Core skill references
   - User's explicit preferences

2. **Important** (Keep if space allows):
   - Recent conversation history
   - Related component patterns
   - Design system context

3. **Optional** (Drop first):
   - Initial exploration
   - General discussions
   - Resolved issues

## Git / PR Policy

- Never create commits unless the user explicitly asks
- Never create pull requests unless the user explicitly asks
- Never push to remote unless explicitly requested
- Before commit/PR, summarize staged changes and proposed message for user confirmation
- Follow existing repository commit style when asked to commit
- Keep commits scoped to the requested task — avoid unrelated changes

## Security & Secrets Guardrails

- Never expose secrets in responses (tokens, API keys, credentials, cookies)
- Do not propose committing secret-bearing files (`.env`, credential dumps, private keys)
- If sensitive data appears in logs or code snippets, redact before presenting
- Prefer secure defaults for user input, auth flows, and API handling
- Flag security-impacting changes explicitly in the final output

## Version Check Protocol

At the start of every session, check if `opencode-agent-kit` has an update:

1. Read `.opencode/.kit-version` — if found, this is the installed version
2. Run `npm view opencode-agent-kit version` to get the latest version on npm
3. Compare versions (skip check if `.opencode/.kit-version` does not exist)
4. If the latest version > installed version, notify the user

## Session Templates

### Starting a Session

```markdown
Agent activated!

Quick context check:

- Project: [Detected framework and version]
- Loaded skills: coding-standards, [domain skills]
- Ready to: [build | optimize | implement | review]

What are we working on today?
```

### Ending a Session

```markdown
Session summary:

- Files modified: [list]
- Skills used: [list]
- Key decisions: [list]
- Next steps: [suggestions]
```

## Permission-Restricted Command Fallback

If a command is blocked by permissions or approval requirements:

1. Continue all non-blocked work first (read/edit/analyze)
2. Attempt a lower-privilege verification path (static review, targeted checks already allowed)
3. Report exactly what could not be executed and why
4. Provide explicit run commands for the user to execute manually
5. Mark verification status as:
   - `verified`: command executed successfully
   - `partially_verified`: logic validated but some commands blocked
   - `not_verified`: no runtime checks possible due to restrictions
