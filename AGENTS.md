# Frontend Developer Nuxt — OpenCode Agent System

This is a meta-project containing OpenCode agent configurations, skills, rules, and commands for a Nuxt frontend development agent system. There is no actual application source code — all content is configuration and documentation for AI agent orchestration.

## Project Structure

- `.opencode/config.json` — Main OpenCode configuration with MCP servers and agent definitions
- `.opencode/agents/` — Custom agent prompts (IT Leader + 7 subagents: frontend, backend, designer, reviewer, database, devops, seo)
- `.opencode/instructions/INSTRUCTIONS.md` — Core instructions loaded into all agents
- `.opencode/skills/` — Skill playbooks (coding-standards, security-review, nuxt-ui, frontend-design, etc.)
- `.opencode/rules/` — Scoped rules (common/, typescript/, python/)
- `.opencode/commands/` — Custom slash commands (plan, tdd, code-review, security, etc.)
- `.opencode/contexts/` — Context files (dev, review, research modes)
- `.github/agent-docs/` — Legacy agent documentation (READ_ONLY reference)
- `.github/agents/Frontend Developer.agent.md` — Legacy single-agent definition

## Key Architecture

- **Primary Agent**: `leader` (IT Leader) orchestrates via Task tool to subagents
- **Subagents**: `frontend`, `backend`, `designer`, `reviewer`, `database`, `devops`, `seo`
- **MCP Servers**: Nuxt docs, Nuxt UI docs, Playwright (enabled); Figma, Stitch (disabled)
- **Built-in Agents Available**: `@planner`, `@explore`, `@scout`, `@general`, `@code-reviewer`, `@security-reviewer`, `@e2e-runner`, `@build-error-resolver`, `@refactor-cleaner`

## No Build/Lint/Test Commands

This project has no application code. Build, lint, or test commands from `package.json` or other tooling configs are NOT relevant here. All validation is structural (valid JSON/YAML/Markdown).
