# Hooks System

## Hook Types

- **PreToolUse**: Before tool execution (validation, parameter modification)
- **PostToolUse**: After tool execution (auto-format, checks)
- **Stop**: When session ends (final verification)

## Auto-Accept Permissions

Use with caution:
- Enable for trusted, well-defined plans
- Disable for exploratory work
- Never use dangerously-skip-permissions flag
- Configure `allowedTools` in `~/.claude.json` instead

## TodoWrite Best Practices

Use TodoWrite tool to:
- Track progress on multi-step tasks
- Verify understanding of instructions
- Enable real-time steering
- Show granular implementation steps

Todo list reveals:
- Out of order steps
- Missing items
- Extra unnecessary items
- Wrong granularity
- Misinterpreted requirements

## Delegation + TODO Integration

When IT-Leader delegates to subagents, use this protocol:

1. **IT-Leader**: Create TODO items before delegating (`pending`)
2. **IT-Leader**: Mark TODO `in_progress` when delegating via `task` tool
3. **Subagents**: Use `todowrite` for their own subtask tracking
4. **IT-Leader**: Update TODO to `completed` when subagent output is verified
5. **IT-Leader**: Create integration TODO for cross-subagent verification

This ensures real-time progress visibility across the delegation chain.
