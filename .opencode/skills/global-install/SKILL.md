---
name: global-install
origin: fajar-dev
description: 'Global installation strategy for opencode-agent-kit: cross-platform config paths, symlink-based per-project setup, environment variable overrides, and upgrade workflow.'
---

# Global Install — opencode-agent-kit

Install opencode-agent-kit once globally and use it across all your projects without re-running `npx opencode-agent-kit init` in each one.

## The Problem

The agent kit currently requires `npx opencode-agent-kit init` in every project, which copies 200+ skill files, 34 agent prompts, 47 commands, and MCP configs into `.opencode/`. This means:

- Every project gets a full copy — wasted disk space
- Updates require re-init or manual migration in each project
- No single source of truth for your agent config
- `opencode.json` with skill paths locked to per-project `.opencode/`

## The Solution

Install the kit **once** to a platform-appropriate global directory, then **link** each project to it.

```
┌──────────────────────────────────────────────────┐
│         OpenCode Global Config Directory          │
│  ~/.config/opencode/        (macOS/Linux)        │
│  %USERPROFILE%\.config\opencode\  (Windows)       │
│                                                   │
│  The template's .opencode/ contents are copied    │
│  FLAT into this directory (no .opencode wrapper): │
│                                                   │
│  ├── opencode.jsonc          ← merged config      │
│  ├── instructions/                                │
│  ├── skills/                 ← 200+ skills        │
│  ├── prompts/agents/         ← 34 agents          │
│  ├── commands/               ← 47 commands        │
│  ├── hooks/                  ← automation hooks   │
│  ├── rules/                  ← scoped rules       │
│  ├── docs/                   ← reference docs     │
│  ├── contexts/               ← dev/review modes   │
│  ├── plugins/                ← agent plugins      │
│  └── package.json            ← dependencies       │
└──────────────────────────────────────────────────┘
         │
         │ OpenCode auto-detects this config
         ▼
┌──────────────────────┐    ┌──────────────────────┐
│   Project A          │    │   Project B          │
│                      │    │                      │
│  (no .opencode/      │    │  (no .opencode/      │
│   needed — global    │    │   needed — global    │
│   config is used)    │    │   config is used)    │
└──────────────────────┘    └──────────────────────┘
```

### Advantages

- **Single update** — upgrade once, all projects use the new version
- **Zero copy** — no file duplication across projects
- **Disk efficient** — 200+ skills stored once
- **Project isolation** — `opencode.json` per project can still have overrides
- **Git-clean** — `.opencode/` is symlinked and gitignored
- **Offline capable** — once installed globally, no network needed per project

## Cross-Platform Path Resolution

| Platform | Default Path | Env Override | Config Format |
|----------|-------------|--------------|---------------|
| macOS    | `~/.config/opencode/` | `OPENCODE_HOME` | `opencode.jsonc` |
| Linux    | `$XDG_CONFIG_HOME/opencode/` (default: `~/.config/...`) | `OPENCODE_HOME` | `opencode.jsonc` |
| Windows  | `%USERPROFILE%\.config\opencode\` | `OPENCODE_HOME` | `opencode.jsonc` |

### Implementation (Node.js)

```javascript
import { homedir, platform } from 'os';
import { join } from 'path';

function getOpenCodeHome() {
  if (process.env.OPENCODE_HOME) {
    return process.env.OPENCODE_HOME;
  }

  if (platform() === 'win32') {
    // Windows: %USERPROFILE%\.config\opencode\ (NOT %APPDATA%)
    const userProfile = process.env.USERPROFILE || join(homedir(), 'AppData', 'Roaming');
    return join(userProfile, '.config', 'opencode');
  }

  const xdgConfig = process.env.XDG_CONFIG_HOME || join(homedir(), '.config');
  return join(xdgConfig, 'opencode');
}
```

## Commands

### `opencode-agent-kit init --global`

Installs the full kit to the global config directory.

```
$ opencode-agent-kit init --global

  opencode-agent-kit init --global

  → OpenCode home: ~/.config/opencode/
  → Copying skills, prompts, commands, instructions...
  → Merging configuration into opencode.jsonc...
  → Installing OpenCode dependencies...
  ✓ Dependencies installed
  ✓ agentmemory already installed
  ✓ portless already installed

  ✅ opencode-agent-kit v1.3.5 installed globally!

  Location: ~/.config/opencode/

  Installed:
    • skills/              — 200+ skill playbooks
    • prompts/agents/      — 34 agent prompt files
    • commands/            — 47 slash commands
    • instructions/        — Core rules
    • hooks/               — Automation hooks
    • rules/               — Scoped coding rules
    • opencode.jsonc       — Merged configuration
    • agentmemory (global) — Persistent memory
    • portless (global)    — Dev server URLs

  Next: OpenCode will automatically use this config.
```

### `opencode-agent-kit link` (macOS/Linux)

On macOS and Linux, OpenCode auto-detects the global config at `~/.config/opencode/`. No per-project setup is needed.

```
$ cd my-project
$ opencode-agent-kit link

  opencode-agent-kit link
  ──────────────────────────────────────────────────

  → OpenCode on this platform auto-detects the global config.
  → Global config at: ~/.config/opencode/
  ✓ No per-project setup needed — OpenCode reads global config automatically.

  Next: run `opencode` to start.
```

### `opencode-agent-kit link` (Windows)

On Windows, creates a junction from `.opencode/` → global config.

```
$ opencode-agent-kit link

  → Global install found at %USERPROFILE%\.config\opencode\
  → Creating .opencode/ junction...
  → Creating opencode.json...
  → Updating .gitignore...

  ✅ Project linked!
```

### `opencode-agent-kit global path`

Prints the global install path.

```
$ opencode-agent-kit global path
~/.config/opencode/
```

### `opencode-agent-kit global update`

Updates the global install to the latest version.

```
$ opencode-agent-kit global update

  → Checking latest version...
  → Current: v1.3.4 → Latest: v1.3.5
  → Updating global install...
  → Updating agentmemory and portless...

  ✅ Global install updated to v1.3.5!
```

### `opencode-agent-kit init --local`

Explicitly copies everything locally (traditional behavior). Use when:
- You want the config committed to the project repo
- You need custom overrides without affecting other projects
- No global install exists

## How the Global Config Works

On macOS and Linux, OpenCode automatically reads `~/.config/opencode/opencode.jsonc`. All skills, prompts, commands, and instructions are stored flat in that directory. When you run `opencode` in any project, OpenCode finds this global config and loads everything.

The template's `opencode.json` paths (which use `.opencode/skills/...`) are rewritten during global install to **absolute paths** pointing into the global directory. This is critical — OpenCode resolves config paths relative to the **current project directory**, so relative paths like `skills/...` would break in every project. Absolute paths guarantee the files are found regardless of where you run `opencode`.

For example, the resulting config will contain paths like:

```json
{
  "instructions": [
    "/Users/me/.config/opencode/instructions/INSTRUCTIONS.md",
    "/Users/me/.config/opencode/skills/coding-standards/SKILL.md",
    "..."
  ]
}
```

Instead of broken relative paths like `skills/coding-standards/SKILL.md` that would resolve against whatever project directory you're in.

## Per-Project Setup

On macOS and Linux, **no per-project setup is needed**. OpenCode auto-detects the global config. Just start `opencode` in any project directory.

On Windows, `opencode-agent-kit link` creates a junction from `.opencode/` → global config.

## Project-Specific Overrides

When you need custom skills or commands for a specific project:

### Option A: Local-only extras
Create a `.opencode.local/` directory in your project with additional skill files. The op
encode.json `instructions` array can reference both the global and local paths.

### Option B: Detach to full copy
Run `opencode-agent-kit init --local` to copy everything into the project, breaking the link to the global install. You can then freely modify it.

### Option C: Layered AGENTS.md
Use `AGENTS.md` in the project root for project-specific rules. The global kit handles the generic agent behavior.

## Migration from Per-Project to Global

```
# 1. Install globally
npx opencode-agent-kit init --global

# 2. Remove old per-project copies (optional)
rm -rf project-a/.opencode project-a/opencode.json

# 3. Link projects
cd project-a && npx opencode-agent-kit link
cd project-b && npx opencode-agent-kit link

# 4. Verify
npx opencode-agent-kit doctor
```

## Windows-Specific Notes

- On Windows, OpenCode reads from `%USERPROFILE%\.config\opencode\opencode.jsonc`
- Directory junctions (`fs.symlinkSync` with `'junction'` type) work without admin on NTFS
- If junction creation fails, falls back to copying a minimal reference config

## Edge Cases

| Scenario | Behaviour |
|----------|-----------|
| No global install exists | `init` falls back to local copy (traditional) |
| Global install is outdated | `doctor` warns and suggests `global update` |
| `OPENCODE_HOME` set | Uses that path instead of OS default |
| `opencode.jsonc` exists with provider config | Merges kit entries, preserves existing provider/MCP config |
| Files already exist at destination (skills/, prompts/) | Copied with merge (existing package.json preserved) |
| Global install deleted | `doctor` detects missing `opencode.jsonc`, suggests `init --global` |

## Design Rationale

**Why install into `~/.config/opencode/` instead of a separate directory?**

On macOS and Linux, OpenCode reads its configuration from `~/.config/opencode/opencode.jsonc` automatically. By installing the agent kit directly into this directory, OpenCode picks it up without any per-project setup, symlinks, or config file modifications.

**Why OpenCode config at `~/.config/opencode/` instead of project-level `.opencode/`?**

OpenCode supports both levels. The global config at `~/.config/opencode/` provides base configuration (agents, skills, MCP servers). Project-level `.opencode/` can override or extend it. The agent kit focuses on the global level so all projects benefit.

**Why flat structure instead of `kit/` subdirectory?**

OpenCode expects skills at `~/.config/opencode/skills/`, prompts at `~/.config/opencode/prompts/agents/`, etc. A `kit/` subdirectory would break auto-discovery. The flat structure matches OpenCode's expectations.

**Why merge into `opencode.jsonc` instead of overwriting it?**

Most users already have custom OpenCode configuration (providers, API keys, model selections). Overwriting would break their setup. Merging preserves their existing config while adding the agent kit's instructions, agents, and MCP servers.

**Why `opencode.jsonc` (JSONC) instead of `opencode.json`?**

OpenCode uses JSONC format which supports comments — important for provider configurations with commented-out models, API key notes, etc. The merge writes standard JSON (which OpenCode also reads) to avoid complexity. Users can reformat to JSONC if desired.
