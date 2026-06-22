---
description: 'Run the visual development loop: start dev server, preview in browser, screenshot, inspect, fix, and repeat until the task is complete.'
---

# Visual Dev Loop Command

Invokes the visual development loop — an automated cycle of build → preview → inspect → fix → repeat.

## When to Use

Use `/dev-loop` when:

- Building or modifying UI components that need visual verification
- Fixing layout/styling issues that require visual inspection
- Implementing frontend features where you want to see the result
- Debugging UI rendering or interaction problems
- Need to verify that UI changes look correct before committing

## How It Works

The command automates this loop:

```
1. START DEV SERVER   → portless <name> <command>  → https://<name>.localhost
2. OPEN BROWSER       → chrome-devtools new_page + navigate_page
3. INSPECT            → take_screenshot + take_snapshot + console/network check
4. ANALYZE            → Compare UI against task requirements
5. FIX                → Edit source code based on findings
6. RELOAD             → chrome-devtools navigate_page (reload)
   └── LOOP back to step 3 until all issues are resolved
7. DONE               → Report summary with screenshots
```

## Loop Control

- **Max iterations**: 10 (auto-stops to prevent infinite loops)
- **Termination**: Stops when no console errors, no 4xx/5xx network failures, and UI matches requirements
- **Manual abort**: Type "stop" at any time to exit the loop

## Example Usage

```
User: /dev-loop Buat halaman login dengan form email dan password,
       tampilkan error saat input kosong

Agent:
Starting dev loop for: "Buat halaman login..."

Iteration 1:
  ✓ Dev server started at https://auth-app.localhost
  ✓ Page loaded
  ⚠ [Screenshot]: Form appears but submit button is missing
  ⚠ [Console]: No errors
  → Fix: Add submit button component
  → Reload...

Iteration 2:
  ✓ Page reloaded
  ✓ [Screenshot]: Submit button now visible
  ⚠ [Console]: Form validation not triggering (no error messages)
  → Fix: Add form validation logic
  → Reload...

Iteration 3:
  ✓ Page reloaded
  ✓ [Screenshot]: Error messages display correctly on empty submit
  ✓ [Console]: No errors
  ✓ [Network]: All API calls 200
  ✓ All requirements met!

  Done in 3 iterations.
```

## Output

The command produces:

- Screenshot(s) from the final state
- Console logs summary
- Network request summary
- Number of iterations taken
- List of changes made
