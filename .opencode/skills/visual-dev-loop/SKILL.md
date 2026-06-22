---
name: visual-dev-loop
description: 'Automated visual development loop: run app, preview in browser, screenshot, inspect, fix, repeat until done. Uses Chrome DevTools MCP for inspection + agent-browser for annotated screenshots + portless for stable dev URLs.'
---

# Visual Development Loop

Use this skill when developing frontend/UI features that need visual verification. The agent runs an automated loop: build → preview → screenshot → inspect → fix → repeat until the task is complete.

## Tooling Overview

| Tool                    | Purpose                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------- |
| **portless**            | Run dev server with named URL: `https://myapp.localhost`                                |
| **chrome-devtools MCP** | Navigate, screenshot, snapshot, inspect console, network, performance                   |
| **agent-browser MCP**   | Annotated screenshots (numbered labels), visual diff, React tree inspection, Web Vitals |

## Port-Specific Guidance

When running `portless` as a Bash command, use the `PORT` env var if port 443 is unavailable:

```bash
PORT=443 portless myapp npm run dev
```

Portless reads `package.json` "dev" script automatically. Just run:

```bash
portless
# or
portless myapp next dev
```

This produces `https://myapp.localhost` (or `<project-name>.localhost`).

## Dev Loop Protocol

### Step 1: Start Dev Server

```bash
# In project with package.json:
portless

# Or with explicit name and command:
portless <app-name> <dev-command>
```

The app is now at `https://<app-name>.localhost`.

### Step 2: Open Browser & Navigate

Use chrome-devtools to open the app:

```
chrome-devtools new_page https://<app-name>.localhost
```

### Step 3: Inspect the UI

**Using chrome-devtools (primary):**

```
chrome-devtools take_screenshot            — full page screenshot
chrome-devtools take_snapshot              — accessibility tree with refs
chrome-devtools list_console_messages      — check for errors/warnings
chrome-devtools list_network_requests      — verify API calls, no 4xx/5xx
chrome-devtools lighthouse_audit           — performance/accessibility audit
```

**Using agent-browser (when visual context is needed):**

```
agent-browser screenshot --annotate        — screenshot with numbered labels
agent-browser snapshot -i                  — interactive elements only
agent-browser get title                    — current page title
agent-browser get url                      — current URL
```

### Step 4: Analyze Issues

Compare what you see against the task requirements:

- Visual issues (layout, styling, missing elements) → from screenshots
- Console errors → from chrome-devtools list_console_messages
- Network failures → from chrome-devtools list_network_requests
- Accessibility violations → from lighthouse_audit or take_snapshot

### Step 5: Fix Code

Edit the source files based on findings.

### Step 6: Reload & Re-inspect

```
chrome-devtools navigate_page (reload)
# Wait for page to load
chrome-devtools take_screenshot
chrome-devtools list_console_messages
```

### Step 7: Loop Until Done

Repeat steps 4-6 until all issues are resolved.

## Agent-Browser Specific Workflows

### Annotated Screenshots for Visual Reference

```
agent-browser navigate_page https://myapp.localhost
agent-browser screenshot --annotate
```

Produces a screenshot with `@e1`, `@e2`, etc. labels overlaid on interactive elements.

### Visual Regression Diff

```
agent-browser screenshot baseline.png
# ... after changes ...
agent-browser screenshot current.png
agent-browser diff screenshot --baseline baseline.png --output diff.png
```

### React Component Inspection

```
agent-browser new_page https://myapp.localhost --enable react-devtools
agent-browser evaluate_script "agent_browser_react_tree()"
```

## Chrome DevTools Specific Workflows

### Full Inspection (Every Loop)

```
1. take_screenshot                  — visual capture
2. take_snapshot                    — accessibility tree with element refs
3. list_console_messages (types: error, warn) — JS errors
4. list_network_requests (resourceTypes: xhr, fetch) — API call status
```

### Performance Check (When Loading is Slow)

```
1. performance_start_trace (reload: true)
2. Wait for trace to complete
3. performance_analyze_insight — get performance recommendations
```

### Mobile/Responsive Testing

```
1. emulate viewport "375x667x2,mobile"
2. take_screenshot
3. resize_page 1440 900
4. take_screenshot
```

## Loop Termination Criteria

The loop stops when ALL criteria are met:

- [ ] Application loads without console errors
- [ ] All network requests return 2xx/3xx
- [ ] UI matches requirements visually (verified via screenshot)
- [ ] Accessibility snapshot shows correct elements
- [ ] No layout/rendering issues visible

If after 10 iterations the task is not complete, stop and report remaining issues.

## Common Pitfalls

1. **Port already in use** → Kill existing process with `kill $(lsof -ti:PORT)` or use different port
2. **portless permission** → First run requires `sudo` for port 443 on macOS/Linux: `sudo portless trust`
3. **Chrome not starting** → Ensure Chrome is installed. chrome-devtools-mcp auto-downloads Chrome for Testing
4. **agent-browser not installed** → `npm install -g agent-browser && agent-browser install`
5. **Screenshot too large** → chrome-devtools-mcp is configured with `--screenshot-max-width 1200` to reduce token usage
6. **State loss on reload** → If app state resets, use chrome-devtools `evaluate_script` to re-hydrate state after reload
