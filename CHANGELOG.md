# Changelog

All notable changes to the **opencode-agent-kit** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.5] - 2026-06-27

### Added

- **`agent-memory-workflow` skill** — disciplined cross-session memory protocol: mandatory recall ritual at session start, structured save at session end, 5 memory categories (preference, architecture, convention, lesson, session), auto-save triggers, memory audit procedures, and cross-agent discipline (IT Leader mediates subagent memory writes)
- **`agent-delegation-contract` skill** — structured contract template for agent-to-agent delegation with: scope & out-of-scope, input interface, expected output, verification criteria, memory context. Includes subagent response contract format, chain vs parallel rules, and contract violation protocol
- **`progress-tracking` skill** — multi-step task tracking with lifecycle (BACKLOG → TODO → IN_PROGRESS → REVIEW → DONE), hierarchical task IDs (FE-001, BE-002), visual progress tables with emoji status markers, session-boundary handoff protocol, and cross-agent status protocol
- **`/status` command** — one-shot visual progress report with task table, priority, blocker detection, and overall completion stats
- **`/continue` command** — 3-step session recovery protocol after `/reset` or context compression: memory recall, codebase reconciliation, user-facing status report
- **IT Leader prompt** — delegation protocol now uses structured contract template from `agent-delegation-contract` skill; new Progress Tracking section with task ID convention and visual reporting mandate
- **Global installation system** — `opencode-agent-kit init --global` installs the full kit to the platform-specific OpenCode config directory, where OpenCode discovers it automatically:
  - macOS/Linux: `~/.config/opencode/` (respects `$XDG_CONFIG_HOME`)
  - Windows: `%APPDATA%\opencode\`
  - Override: `$OPENCODE_HOME` env var
- **Flat install structure** — template's `.opencode/` contents are copied directly into the global directory (no `.opencode` wrapper), with config paths rewritten: `.opencode/skills/...` → `skills/...`
- **JSONC config merging** — reads existing `opencode.jsonc` (JSON with comments), strips comments, merges with template's `opencode.json` entries (instructions, agents, MCP servers), preserves existing provider/model/MCP config
- **`opencode-agent-kit link`** command — on macOS/Linux, reports that OpenCode auto-detects the global config; on Windows, creates a junction from `.opencode/` → global dir
- **`opencode-agent-kit global`** command — subcommands: `path` (print path), `status` (show version + contents), `update` (re-install latest)
- **Smart `init`** — now defaults to local copy (since OpenCode auto-discovers global config). Use `--global` for system-wide install, `--local` to force local copy
- **`global-install` skill** — comprehensive documentation of the global install design, cross-platform path resolution, JSONC merging, and edge cases
- **`bin/commands/global-path.mjs`** — shared utility: `getOpenCodeHome()`, `globalInstallExists()`
- **JSONC parser** — `parseJsonc()` strips `//` and `/* */` comments and trailing commas for safe JSON parsing
- **`doctor` command update** — checks for global install at `~/.config/opencode/`, reports version and status

### Changed

- `opencode.json`: instructions array now includes 4 new skills (agent-memory-workflow, agent-delegation-contract, progress-tracking, global-install) — 17 total
- `.opencode/instructions/INSTRUCTIONS.md`: 4 new subsections (Memory Workflow, Delegation Contracts, Progress Tracking, Global Install)
- `.opencode/skills/agent-session-workflow/SKILL.md`: session start template now mandates memory recall protocol + `/continue` for resumed sessions
- `bin/commands/init.mjs`: refactored into 3 modes (`--global` installs flat into `~/.config/opencode/`, `--local` copies into `.opencode/`, default is local). Includes `parseJsonc()`, `rewriteTemplatePathsForGlobal()`, and `mergeJson()` with updated strategy
- `bin/commands/global-path.mjs`: renamed to `getOpenCodeHome()` / `globalInstallExists()`, uses `~/.config/opencode/` (was `~/.config/opencode-agent-kit/kit/`)
- `bin/init.mjs`: registered `link` and `global` subcommands with `--global`/`--local` flags on `init`
- `bin/commands/global-cmd.mjs`: uses `getOpenCodeHome()`, reads `.kit-version` from OpenCode home
- `bin/commands/doctor.mjs`: imports `getOpenCodeHome` from `global-path.mjs`
- `bin/commands/link.mjs`: on macOS/Linux, reports auto-detection; on Windows, delegates to init's `linkProject`

## [1.3.4] - 2026-06-25

### Added

- **SonarQube as primary agent** — mode changed from `subagent` to `primary`; SonarQube Quality Auditor can now be selected as a standalone agent, not just a subagent of IT Leader
- **Bug/Error Fix Protocol** — new 4-step mandatory protocol in `it-leader.md`: classify issue → read context only (never edit) → delegate immediately to domain subagent → verify the fix; ensures leader never edits code directly

### Changed

- **Agent prompts relocated** — all 34 agent `.md` files moved from `.opencode/agents/` → `.opencode/prompts/agents/`; OpenCode auto-detection now driven solely by `opencode.json`
- `opencode.json`: all `{file:.opencode/agents/...}` paths updated to `{file:.opencode/prompts/agents/...}`; SonarQube agent description updated
- `opencode.example.json`: mirrored path and mode changes
- `bin/commands/doctor.mjs`: agent path check updated to `prompts/agents/`
- `bin/commands/init.mjs`: summary display updated to `prompts/agents/`
- `bin/commands/validate.mjs`: agent validation directory updated to `prompts/agents/`
- `AGENTS.md`, `README.md`, `CONTRIBUTING.md`: all `.opencode/agents/` references updated
- `schema/opencode-config.schema.json`, `index-old.html`: example paths updated
- `.opencode/prompts/agents/nuxt-frontend-developer-mentor.md`: internal cross-reference paths updated
- `.opencode/skills/android-kotlin-compose/SKILL.md`: agent reference path updated
- `it-leader.md`: added DELEGATION MANDATE, Bug/Error Fix classification, stronger delegation enforcement, and 10 new delegation examples for bug/error fixes

---

## [1.3.3] - 2026-06-23

### Added

- **Visual Dev Loop** — automated build → preview → screenshot → fix → repeat cycle
- **Chrome DevTools MCP** — enabled with screenshot optimizations (jpeg, quality 80, max 1200px)
- **agent-browser MCP** — Rust-based browser automation with annotated screenshots, visual diff, React introspection
- **portless auto-install** — installed globally on `npx opencode-agent-kit init` for stable `.localhost` dev URLs
- `.opencode/skills/visual-dev-loop/SKILL.md` — dual-browser strategy skill teachng the full dev loop protocol
- `.opencode/commands/dev-loop.md` — `/dev-loop` command for automated visual iteration

### Changed

- `opencode.json`: enabled chrome-devtools MCP + added agent-browser MCP + permissions for both
- `opencode.example.json`: mirrored MCP and permission changes
- `bin/commands/init.mjs`: auto-installs portless on init; summary updated for 10 MCP servers, 47 commands

---

## [1.3.2] - 2026-06-23

### Added

- `.opencode/hooks/agentmemory-start.mjs`: new Node.js startup script for agentmemory MCP server, replacing the deprecated Bash script

### Changed

- `opencode.example.json`: updated agentmemory command to use Node.js script instead of Bash
- `opencode.json`: updated agentmemory command to use Node.js script instead of Bash
- `.opencode/hooks/agentmemory-start.sh`: deprecated Bash script removed from the project

---

## [1.3.1] - 2026-06-21

### Changed

- `.opencode/plugins/agentmemory-capture.ts`: fix wrong default port for agentmemory

---

## [1.3.0] - 2026-06-20

### Added

- **Ponytail Integration** — integrated [Ponytail](https://github.com/DietrichGebert/ponytail) (41.8k stars), the lazy senior dev skill for AI agents, as first-party plugin
- **Ponytail Commands** — 6 new slash commands (`/ponytail`, `/ponytail-review`, `/ponytail-audit`, `/ponytail-debt`, `/ponytail-gain`, `/ponytail-help`)
- **Ponytail Plugin** — `.opencode/plugins/ponytail.mjs` auto-injects ponytail ruleset with mode switching (lite/full/ultra/off)
- **Ponytail Hooks** — 5 lifecycle hooks (instructions, config, activate, mode-tracker, runtime) for dynamic ponytail behavior
- **Ponytail Skills** — 6 skill playbooks (ponytail, review, audit, debt, gain, help) with 6-rung reasoning ladder

### Changed

- `opencode.json`: plugin entry `[agentmemory-capture, ponytail]`
- `opencode.example.json`: plugin entry `[agentmemory-capture, ponytail]`
- Version: 1.2.11 → **1.3.0** (minor version bump for new feature integration)

---

## [1.2.11] - 2026-06-20

### Added

- **Versioned Migration System** — `.opencode/migrations/` with sequential migration scripts (v1.0.0 → ongoing), auto-detection on version upgrade, `opencode-agent-kit migrate` CLI command with `--dry-run` and `--rollback` support, snapshot backup before each migration, and auto-migration check integrated into `init` and `doctor` commands
- **CI/CD Validation Pipeline** — GitHub Actions workflow (`validation.yml`) running on every PR and push to main that validates `opencode.json` schema integrity, ensures all agent keys map to existing prompt files, checks YAML frontmatter in all `SKILL.md` files, verifies MCP configuration consistency, detects orphan agent files, and more
- **Validation Script** — `.opencode/scripts/validate.mjs` standalone validator runnable locally or in CI with color-coded output

### Fixed

- **MCP Configuration** — Figma and Stitch MCP servers now have explicit `"enabled": false` to match their disabled status
- **Skill Validation** — frontmatter checks scoped to `SKILL.md` files only, avoiding false positives from non-skill markdown files

## [1.2.10] - 2026-06-20

### Changed

- **Version**: 1.2.9 → **1.2.10**
- **`opencode.example.json`**: Synced with all 33 agents (was missing python, rust, swift, dotnet, angular, cpp, sonarqube, go-developer, and all reviewer/harness agents) — now mirrors `opencode.json` exactly
- **`AGENTS.md`**: Updated skill count 61 → **205** (was outdated)
- **`README.md`**: Updated skill count 202 → **205**
- **`package.json`**: Updated skill count in description
- **`opencode.example.json` permissions**: Deny list expanded with `~/.kube`, `docker-config`, `gcloud`, `azure`, `npmrc`, `netrc`, `gnupg`, `helm`, `terraform.d`, `vault`

---

## [1.2.6] - 2025-06-19

### Added

- **3 new shared skills** — `agent-task-workflow`, `agent-communication`, `agent-session-workflow` loaded globally via opencode.json
- **Content restoration in it-leader.md** — Subagent Capabilities Reference, Delegation Examples, expanded Parallel Delegation (contract checklist, Postman Sync, sequential vs parallel), TUI Question Templates (single/multi-select), Session Workflow (version check, TODO protocol, start/end templates), Quality Standards
- **Dynamic version in CLI** — `bin/init.mjs` now reads version from `package.json` instead of hardcoded `"1.0.0"`

### Changed

- `it-leader.md`: 324 → **810 lines** (+486 lines restored from main branch)
- `opencode.json` instructions: 9 → **12** (3 new shared skills)
- `package.json` description: updated agent/skills/commands counts
- `bin/commands/doctor.mjs`: expected agent count 14 → **34**
- `bin/commands/init.mjs` summary: all counts updated (13→31 agents, 14→34 files, 60+→200+ skills, 35+→46 commands)

---

## [1.2.7] - 2025-06-19

### Fixed

- **CLI path resolution** — `bin/init.mjs` path to package.json fixed for npx execution
- **npm dist-tag** — published 1.2.7 to npm registry with correct `latest` tag

### Changed

- Version: 1.2.6 → **1.2.7**

---

## [1.2.9] - 2025-06-20

### Added

- **IT Leader: Request Classification & Adaptive Response** — 6 request types (Discussion/Info/Small Fix/Simple Feature/Complex Feature/Full App) with automated scope detection
- **IT Leader: Domain Task Rule** — immediate delegation to domain subagent without analysis (extends design rule pattern to all subagents)
- **IT Leader: Discussion Protocol** — domain-specific questions delegate as consultation to subagents
- **New skill: `leadership-workflow`** — 10 leadership components (requirement discovery, estimasi, sprint planning, risk management, client reporting, QA/UAT, retrospective, task tracking, team health, post-delivery)
- **Conditional skill loading** — `leadership-workflow` auto-loaded for Complex Feature / Full App scopes

### Changed

- `it-leader.md`: 842 → **914 lines** (+72 lines)
- `it-leader.md`: Task Decision Tree merged into Classification Flow (single entry point)
- `it-leader.md`: Operating Modes mapped to classification (not independent)
- `it-leader.md`: Task Decomposition Framework scoped to Complex/Full App only
- `leadership-workflow/SKILL.md`: Tool call formats fixed (`todowrite`, `memory_*` → correct parameter syntax)
- `leadership-workflow/SKILL.md`: Bottleneck Rules → dependency-aware queue (replaces capacity-based)
- `leadership-workflow/SKILL.md`: Workload Tracking → Dependency Tracking (subagents are parallel-capable)
- Version: 1.2.8 → **1.2.9**

---

## [1.2.8] - 2025-06-19

### Added

- **Safe bash command permissions** — 17 non-aggressive bash patterns (`ls`, `pwd`, `which`, `mkdir`, `cp`, `echo`, etc.) auto-allowed at both top-level and per-agent level, reducing permission prompts by ~90%
- **Read-only tool permissions** — `glob`, `grep`, `list` set to `"allow"` at top-level (no more prompts for file search)
- **`agentmemory_*` centralized** — moved from per-agent duplication (33 agents × 1 line) to top-level permission
- **`figma_*` centralized** — set to `"deny"` at top-level (Figma MCP disabled, no Figma clutter in unrelated agents)

### Changed

- **`external_directory`** — relaxed from `"ask"` to `"allow"` with deny rules for sensitive dirs (`~/.ssh`, `~/.aws`, `~/.config`, `~/secrets`)
- **`skill` permission** — per-agent `{"*": "allow"}` → shorthand `"allow"` (cleaner config)
- **`opencode.example.json`** — same permission improvements applied to the example config

---

## [1.2.5] - 2025-06-18

### Added

- **Subagent capability references** — detailed stack, capabilities, and output format for all 20+ subagents in IT Leader
- **Agent doc reorganization** — consistent structure across all agent prompts with skill-based content extraction

### Changed

- Agent prompts condensed: shared procedural content extracted to dedicated skill files
- Content moved: Memory Management, Working Methodology, Communication Style, Session Workflow extracted from individual prompts to shared skills

---

## [1.2.4] - 2025-06-18

### Added

- **Go Developer agent** (`@go-developer`) — Go APIs, CLI tools, concurrency patterns, sqlx/gorm
- **Java Developer agent** (`@java-developer`) — Spring Boot, JPA/Hibernate, Maven/Gradle, microservices
- **Cross-references** — Go and Java added to IT Leader's subagent table, task decision tree, project conventions, and verification policy

### Changed

- Agent count: 31 → **33** registered in opencode.json

---

## [1.2.3] - 2025-06-18

### Changed

- **Agent configs streamlined** — redundant content removed from agent prompts
- **Delegation mappings updated** — agent identifiers and routing paths aligned for consistency across node-backend-developer, nuxt-frontend-developer, and react-frontend-developer
- **Permission-restricted command fallback** — consolidated fallback protocol across all agents

---

## [1.2.2] - 2025-06-18

### Added

- **UI/UX Designer agent reformatted** — refined design review/audit workflow, Google Stitch MCP integration
- **Landing page redesign** — refreshed branding with agentmemory focus, responsive GitHub link

### Changed

- Landing page: CSS variables for light/dark theme, modern design with updated stats

---

## [1.2.1] - 2025-06-09

### Added

- **Design review delegation rule** — IT Leader now delegates all design/UI analysis to `@designer` immediately
- **Landing page** — light/dark theme support with CSS variables and theme toggle
- **agentmemory documentation** — comprehensive README section for persistent cross-session memory

### Changed

- Landing page: redesigned with refreshed branding and agentmemory focus

---

## [1.2.0] - 2025-06-09

### Added

- **17 new agents** — @python, @rust, @swift, @dotnet, @angular, @cpp, @ai-agent (total 31 agents)
- **91 new skills from ECC** — total 201 skills, covering Python/ML, Rust, Swift, C++, C#/.NET, Angular, AI agent engineering, cross-cutting workflows
- **Full agent infrastructure** — prompts, config, permissions, skill references for all new agents

### Changed

- Agent count: 14 → **21**
- Skills count: 74 → **201**
- Template files: 380 → **~450**

---

## [1.1.1] - 2025-06-09

### Added

- **74 skill playbooks** (was 61) — 13 new agent-specific skills + agentmemory linked to all 14 agents
- **Skill-to-agent mapping** — 127 explicit skill references across all agent prompts
- **Cross-stack optional skills** — 15 skills available on-demand for django, golang, python, springboot, java stacks

### Changed

- **Global install** — multi-OS instructions (macOS/Linux, Windows PowerShell, CMD)
- **Path resolution** — 3-tier fallback for template discovery (npx, global, local dev)
- **SonarQube agent** — registered in config, MCP enabled, permissions added

---

## [1.1.0] - 2025-06-09

### Added

- **Foundation files**: LICENSE (MIT), CHANGELOG.md, CONTRIBUTING.md, SECURITY.md, CODE_OF_CONDUCT.md
- **CI/CD pipeline**: GitHub Actions workflow for automated testing + npm publish
- **GitHub templates**: Issue templates (bug report, feature request) + PR template
- **Developer tooling**: `.editorconfig`, `.prettierrc`, `.eslintrc.json` for consistent code quality
- **JSON Schema**: `schema/opencode-config.schema.json` for validating agent configurations
- **CLI upgrade command**: `opencode-agent-kit upgrade` — self-update with version check
- **CLI doctor command**: `opencode-agent-kit doctor` — diagnose common setup issues
- **CLI uninstall command**: `opencode-agent-kit uninstall` — clean removal
- **Unit tests**: Test suite for init, merge logic, config helpers, and CLI commands (Vitest)
- **Polish output**: Color-coded console output with spinners and structured feedback in CLI
- **Bash permission hardening**: Template `opencode.json` now uses `"*": "ask"` by default instead of `"*": "allow"`

### Security

- Added SECURITY.md with responsible disclosure policy
- Permission model in template config now defaults to ask for unrestricted bash access

---

## [1.0.19] - 2025-06-08

### Added

- SonarQube quality agent (`@sonarqube`) with full MCP integration
- SonarQube scan command `/sonarqube-scan` with quick/full/PR modes
- SonarQube quality gate checks and issue triage workflow
- agentmemory integration with 53 MCP tools for persistent cross-session memory
- `.kit-version` tracking for automated update checks
- Postman MCP server for API management
- Smart JSON merge strategy in init command (agents, MCP, permissions, instructions)

### Fixed

- Template directory resolution when installed globally via npm
- Gitignore entries for `.opencode/*` and `data/`

---

## [1.0.0] - 2025-06-06

### Added

- Initial release of opencode-agent-kit
- 13 specialized AI agents orchestrated by IT Leader
- Multi-stack support: Nuxt/Vue, React/Next.js, Node.js/Express, Laravel, CodeIgniter 3, Android (Kotlin/Compose), Flutter (Dart)
- 60+ skill playbooks across all stacks
- 30+ custom slash commands (plan, tdd, code-review, security, build, android/flutter commands)
- 8 MCP servers (Nuxt, Nuxt UI, Playwright, Postman, Figma, Stitch, SonarQube, agentmemory)
- Impeccable design intelligence system
- agentmemory persistent cross-session memory
- One-command `npx opencode-agent-kit init` installation
- Smart config merging for existing OpenCode projects
- Comprehensive docs for Nuxt, React, Flutter, Android stacks
- 30-day mentor curriculum for Nuxt transition
