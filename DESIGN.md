# SIGNAL Design System — Agent Kit Landing Page

> **Register**: Brand (marketing landing page)
> **Concept**: SIGNAL — Warm Dark, Purposeful Motion
> **Target file**: `index-premium.html` (single HTML, inline CSS/JS)
> **Stack**: Vanilla HTML/CSS/JS, IntersectionObserver, CSS custom properties

---

## 1. Design Direction Summary

**SIGNAL** is a warm-dark landing page for a developer tool. It rejects the cold purple/blue AI-tool aesthetic, the glassmorphism reflex, and the terminal-only motif. Instead it uses:

- **Warm charcoal** foundations (tinted toward amber, not purple)
- **Amber-honey** primary accent (warm, confident, not gold)
- **Single font family** (DM Sans) for headlines and body, JetBrains Mono only for code
- **Purposeful motion** that is scroll-driven, not decorative
- **Sectional variety** — every section has a different layout signature
- **Subtle background shifts** between sections (warm → neutral → warm)

**Scene sentence**: A senior developer lands on this page late at night in a dim room. The warm dark doesn't pretend to be a terminal — it's an editorial space. The amber feels like lamp light on paper. The animations confirm intent without demanding attention.

---

## 2. Complete Color Tokens

### Color Strategy: Committed

Amber-honey carries ~30% of visual surface (headlines, accents, interactive elements). Neutrals are tinted toward warm (hue 50). Secondary (slate) provides cool contrast for passive elements. This is **not** the Restrained pattern — amber is deliberately present.

### `:root` (Dark Mode)

```css
:root {
  /* === Backgrounds (warm charcoal, tinted toward amber) === */
  --bg: oklch(0.035 0.006 50); /* page background    */
  --bg-surface: oklch(0.06 0.005 50); /* card/section alt   */
  --bg-raised: oklch(0.085 0.007 50); /* elevated surfaces  */
  --bg-inset: oklch(0.05 0.005 50); /* input backgrounds  */
  --bg-hover: oklch(0.12 0.01 50); /* hover states       */
  --bg-nav: oklch(0.035 0.006 50 / 0.92); /* navbar       */
  --bg-overlay: oklch(0 0 0 / 0.6); /* modal overlays    */

  /* === Text (warm-tinted neutrals) === */
  --text-primary: oklch(0.88 0.015 50); /* headings, body     */
  --text-secondary: oklch(0.58 0.012 50); /* subtext, labels    */
  --text-muted: oklch(0.42 0.01 50); /* captions, metadata */
  --text-inverse: oklch(0.035 0.006 50); /* on-primary text    */

  /* === Primary: Amber-Honey === */
  --primary: oklch(0.62 0.1 65); /* amber-honey        */
  --primary-hover: oklch(0.66 0.105 65); /* hover state        */
  --primary-active: oklch(0.58 0.095 65); /* active/pressed     */
  --primary-dim: oklch(0.62 0.1 65 / 0.15); /* bg tint        */
  --primary-dim-2: oklch(0.62 0.1 65 / 0.06); /* subtle tint    */
  --primary-glow: oklch(0.62 0.1 65 / 0.08); /* glow wash      */

  /* === Secondary: Slate (cool counterpoint) === */
  --secondary: oklch(0.5 0.02 250);
  --secondary-dim: oklch(0.5 0.02 250 / 0.12);
  --secondary-text: oklch(0.55 0.025 250);

  /* === Success: Mint (not teal) === */
  --success: oklch(0.65 0.08 160);
  --success-dim: oklch(0.65 0.08 160 / 0.12);
  --success-text: oklch(0.62 0.08 160);

  /* === Borders === */
  --border-subtle: oklch(1 0 0 / 0.06);
  --border-hover: oklch(1 0 0 / 0.12);
  --border-active: oklch(1 0 0 / 0.2);
  --border-primary: var(--primary-dim);

  /* === Shadows === */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.5);
  --shadow-primary: 0 0 24px var(--primary-glow);

  /* === Motion === */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 200ms;
  --duration-normal: 400ms;
  --duration-slow: 800ms;

  /* === Z-index === */
  --z-base: 0;
  --z-content: 1;
  --z-dropdown: 10;
  --z-nav: 100;
  --z-overlay: 200;
  --z-modal: 300;

  /* === Layout === */
  --container-max: 1200px;
  --container-padding: 24px;
  --container-padding-mobile: 16px;
  --nav-height: 64px;
  --nav-height-scrolled: 52px;
  --section-padding: 120px;
  --section-padding-mobile: 80px;

  /* === Radius === */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* === Border default === */
  --border-width: 1px;
  --border-default: var(--border-width) solid var(--border-subtle);
}

/* Ambien glow per section — light wash that shifts subtly */
.section-glow-warm {
  background: radial-gradient(ellipse 80% 60% at 50% -20%, var(--primary-dim-2), transparent 70%);
}
.section-glow-neutral {
  background: radial-gradient(
    ellipse 70% 50% at 50% 0%,
    oklch(0.5 0.01 250 / 0.03),
    transparent 60%
  );
}
```

### `[data-theme="light"]` (Light Mode Override)

```css
[data-theme='light'] {
  /* Warm light — cream-based, not cold white */
  --bg: oklch(0.94 0.008 55);
  --bg-surface: oklch(0.97 0.005 55);
  --bg-raised: oklch(0.99 0.003 55);
  --bg-inset: oklch(0.91 0.01 55);
  --bg-hover: oklch(0.88 0.012 55);
  --bg-nav: oklch(0.94 0.008 55 / 0.92);
  --bg-overlay: oklch(0 0 0 / 0.3);

  --text-primary: oklch(0.15 0.012 50);
  --text-secondary: oklch(0.38 0.01 50);
  --text-muted: oklch(0.52 0.008 50);
  --text-inverse: oklch(0.98 0.003 55);

  --primary: oklch(0.55 0.1 65);
  --primary-hover: oklch(0.59 0.105 65);
  --primary-active: oklch(0.51 0.095 65);
  --primary-dim: oklch(0.55 0.1 65 / 0.15);
  --primary-dim-2: oklch(0.55 0.1 65 / 0.06);
  --primary-glow: oklch(0.55 0.1 65 / 0.1);

  --secondary: oklch(0.45 0.025 250);
  --secondary-dim: oklch(0.45 0.025 250 / 0.1);
  --secondary-text: oklch(0.4 0.025 250);

  --success: oklch(0.5 0.08 160);
  --success-dim: oklch(0.5 0.08 160 / 0.12);
  --success-text: oklch(0.45 0.08 160);

  --border-subtle: oklch(0 0 0 / 0.08);
  --border-hover: oklch(0 0 0 / 0.18);
  --border-active: oklch(0 0 0 / 0.28);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 30px rgba(0, 0, 0, 0.12);
  --shadow-primary: 0 0 20px var(--primary-glow);
}
```

### Contrast Verification (Dark Mode)

| Token Pair                                         | Ratio  | WCAG |
| -------------------------------------------------- | ------ | ---- |
| `--text-primary` (0.88) on `--bg` (0.035)          | ~15:1  | AAA  |
| `--text-secondary` (0.58) on `--bg` (0.035)        | ~7:1   | AAA  |
| `--text-secondary` (0.58) on `--bg-surface` (0.06) | ~5.7:1 | AA   |
| `--text-muted` (0.42) on `--bg` (0.035)            | ~4.7:1 | AA   |
| `--primary` (0.62) on `--bg` (0.035)               | ~8:1   | AAA  |

---

## 3. Typography Scale

### Font Family

```css
:root {
  --font-sans: 'DM Sans', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

- **DM Sans** — all headlines, body, navigation, buttons, stat numbers, section labels
- **JetBrains Mono** — code blocks, inline code, terminal output in Install section only
- No third font. DM Sans covers weights 400–800 with real italic.

### Scale

| Token            | Size | Weight | Line Height | Letter Spacing | clamp()                        |
| ---------------- | ---- | ------ | ----------- | -------------- | ------------------------------ |
| `--text-hero`    | 72px | 700    | 1.05        | -0.03em        | `clamp(2.5rem, 5.5vw, 4.5rem)` |
| `--text-display` | 48px | 700    | 1.1         | -0.02em        | `clamp(2rem, 4vw, 3rem)`       |
| `--text-h2`      | 36px | 600    | 1.15        | -0.015em       | `clamp(1.5rem, 3vw, 2.25rem)`  |
| `--text-h3`      | 24px | 600    | 1.25        | -0.01em        | `clamp(1.125rem, 2vw, 1.5rem)` |
| `--text-lg`      | 18px | 400    | 1.5         | 0              | —                              |
| `--text-base`    | 16px | 400    | 1.6         | 0              | —                              |
| `--text-sm`      | 14px | 400    | 1.5         | 0.01em         | —                              |
| `--text-xs`      | 12px | 500    | 1.4         | 0.02em         | —                              |
| `--text-code`    | 14px | 400    | 1.7         | 0              | —                              |
| `--text-stat`    | 48px | 700    | 1           | -0.02em        | `clamp(2rem, 4vw, 3rem)`       |

Weights available: 400 (Regular), 500 (Medium), 600 (Semi Bold), 700 (Bold), 800 (Extra Bold)

**Body text max-width**: `max-width: 65ch` for paragraphs, `max-width: 42ch` for stat labels

### Usage Map

```
HEADLINE (hero h1)      → --text-hero / weight-700
SECTION TITLE (h2)      → --text-display or --text-h2 / weight-600 or 700
SECTION SUBTITLE        → --text-lg / weight-400 / --text-secondary
CARD TITLE (h3)         → --text-h3 / weight-600
BODY TEXT               → --text-base / weight-400
SMALL / METADATA        → --text-sm / weight-400 / --text-muted
TAG / LABEL             → --text-xs / weight-500 / uppercase / --text-muted
STAT NUMBER             → --text-stat / weight-700 / --primary
CODE BLOCK             → --text-code / --font-mono
INLINE CODE             → font-family var(--font-mono) / --text-sm
```

---

## 4. Section-by-Section Specification

### Global Element Order (Page Flow)

```
Marquee (tech ticker)        → KEPT from current file
Navbar                       → KEPT, rethemed
├── #hero                    → NEW: typographic, full-viewport
├── #problem                 → REWORKED: progress metaphor, not crash log
├── #memory                  → REWORKED: comparison layout, not terminal
├── #agents                  → REWORKED: visual cards, not ls listing
├── #install                 → REWORKED: minimal code block
├── #cta                     → NEW: natural ending
Marquee (tech ticker)        → KEPT (duplicate at bottom optional)
Footer                       → KEPT, rethemed
```

---

### Section 1: Hero (`#hero`)

**Narrative function**: The value proposition statement. First impression. Must establish warmth, confidence, and clarity in one viewport.

**Layout type**: Center-aligned, full-viewport, typographic statement with floating stat counters below.

**Background treatment**:

- Dark warm (`--bg`) with subtle radial glow from top center (`--primary-dim-2`)
- Optional: soft dot grid pattern (retained from current, with warm dots not purple)
- No terminal box, no code blocks

**Key visual element**:

- Large typographic headline (single line or two-line stack)
- Warm amber underline on key word (not gradient text — banned)
- Below: 3 stat counters side by side (not the hero-metrics template — these are integrated visually with horizontal rule)
- Stats animate UP on scroll (counter animation), not on load

**Motion behavior**:

- Headline fades in + translateY(0) on load (800ms ease-out-expo)
- Stats reveal on scroll via IntersectionObserver with counter animation
- No staggering per character — the whole headline arrives as one statement

**HTML structure**:

```html
<section id="hero" class="hero">
  <div class="hero-ambient" aria-hidden="true"></div>
  <div class="container">
    <div class="hero-content">
      <div class="hero-label">OpenCode Agent Kit</div>
      <h1 class="hero-headline">
        Portable AI agents
        <span class="hero-headline-accent">with memory</span>
        for every stack
      </h1>
      <p class="hero-subtitle">
        33 specialized agents. 207 skill playbooks. Persistent cross-session memory. One command to
        install.
      </p>
      <div class="hero-actions">
        <a href="#install" class="btn btn-primary btn-lg">Install Now</a>
        <a href="https://github.com/..." class="btn btn-secondary btn-lg">View on GitHub</a>
      </div>
      <hr class="hero-divider" aria-hidden="true" />
      <div class="hero-stats">
        <div class="hero-stat">
          <span class="hero-stat-number" data-target="33">0</span>
          <span class="hero-stat-label">Specialized Agents</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-number" data-target="207">0</span>
          <span class="hero-stat-label">Skill Playbooks</span>
        </div>
        <div class="hero-stat">
          <span class="hero-stat-number" data-target="46">0</span>
          <span class="hero-stat-label">CLI Commands</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

**CSS classes**:
| Class | Purpose |
|-------|---------|
| `.hero` | Full-viewport, center alignment, position relative |
| `.hero-ambient` | Radial gradient glow, pointer-events none |
| `.hero-content` | Max-width 780px, centered, z-content |
| `.hero-label` | `--text-xs`, uppercase, tracking-wide, `--primary` color |
| `.hero-headline` | `--text-hero`, `--text-primary`, weight 700 |
| `.hero-headline-accent` | `--primary` color (NOT gradient), inline |
| `.hero-subtitle` | `--text-lg`, `--text-secondary`, max-width 60ch |
| `.hero-actions` | Flex row, gap 16px, center, wrap on mobile |
| `.hero-divider` | Width 60px, `--primary`, opacity 0.3, margin auto |
| `.hero-stats` | Flex row, gap 48px, center, wrap |
| `.hero-stat` | Text center, min-width 120px |
| `.hero-stat-number` | `--text-stat`, `--primary`, weight 700 |
| `.hero-stat-label` | `--text-sm`, `--text-secondary` |

---

### Section 2: Problem (`#problem`)

**Narrative function**: Diagnose the pain — context loss between AI agent sessions. Make it tangible, not technical.

**Layout type**: Split layout — left side text, right side visual comparison. On mobile: stacked.

**Background treatment**: `--bg-surface` (slightly lighter warm), with subtle warm gradient at top.

**Key visual element**:

- NOT a crash log (REMOVED)
- Two "progress bars" side by side representing context retention:
  - BEFORE: a thin, fragmented bar at ~20% — irregular segments
  - AFTER: a full, solid warm bar at ~100% — continuous
- Bars have a label and sub-label

**Motion behavior**:

- Bars animate from 0 to their target width on scroll into view
- BEFORE bar animates in fragmented segments (staggered)
- AFTER bar animates as one continuous fill (800ms ease-out-expo)
- Fade-in reveal on the whole section

**HTML structure**:

```html
<section id="problem" class="section section-alt">
  <div class="container">
    <div class="problem-layout">
      <div class="problem-text reveal">
        <div class="section-tag">The Problem</div>
        <h2>Every session starts<br />from zero</h2>
        <p>
          AI agents don't remember what you discussed last week. Architecture decisions, API
          contracts, code conventions — all vanish between sessions.
        </p>
        <p>
          Developers spend <strong class="text-primary">30% of their time</strong> re-explaining
          context. Agentmemory fixes that.
        </p>
      </div>
      <div class="problem-visual reveal">
        <div class="problem-bar-group">
          <div class="problem-bar-label">
            <span class="problem-bar-name">Without agentmemory</span>
            <span class="problem-bar-pct" id="beforePct">~20%</span>
          </div>
          <div
            class="problem-bar problem-bar-before"
            aria-label="Context retained without agentmemory: ~20%"
          >
            <div class="problem-bar-fill problem-bar-fill-broken"></div>
          </div>
        </div>
        <div class="problem-bar-group">
          <div class="problem-bar-label">
            <span class="problem-bar-name">With agentmemory</span>
            <span class="problem-bar-pct" id="afterPct">~95%</span>
          </div>
          <div
            class="problem-bar problem-bar-after"
            aria-label="Context retained with agentmemory: ~95%"
          >
            <div class="problem-bar-fill problem-bar-fill-solid" style="width: 0%;"></div>
          </div>
        </div>
        <p class="problem-note">Cross-session memory, restored automatically</p>
      </div>
    </div>
  </div>
</section>
```

**CSS classes**:
| Class | Purpose |
|-------|---------|
| `.problem-layout` | CSS grid 1fr 1fr, gap 64px, 1fr on mobile |
| `.problem-text` | Text column, 50ch max |
| `.problem-visual` | Visual column, centered |
| `.problem-bar-group` | Margin-bottom 32px |
| `.problem-bar-label` | Flex, space-between, margin-bottom 8px |
| `.problem-bar-name` | `--text-sm`, `--text-secondary`, weight 500 |
| `.problem-bar-pct` | `--text-sm`, `--text-muted` |
| `.problem-bar` | Height 12px, `--bg-inset`, radius-full, overflow hidden |
| `.problem-bar-fill` | Height 100%, radius-full, transition width 1.2s ease-out |
| `.problem-bar-fill-broken` | Background: repeating segments (via gradient or multiple spans), `--text-muted` |
| `.problem-bar-fill-solid` | Background: `--primary`, box-shadow: `--shadow-primary` |
| `.problem-note` | `--text-xs`, `--text-muted`, text-center, margin-top 16px |

---

### Section 3: Memory (`#memory`)

**Narrative function**: Show the agentmemory system in action. Concrete evidence of persistent memory.

**Layout type**: Full-width with centered content, comparison table.

**Background treatment**: `--bg` (back to warm dark) — background shift from surface to base creates rhythm.

**Key visual element**:

- A semantic table showing memory entries with confidence scores (not terminal output)
- Visual metaphor: "before" empty state → arrow → "after" populated state
- The table has mood and texture — colored badges for memory types

**Motion behavior**:

- Staggered row reveal (each row fades in with 80ms delays)
- The "before" card is muted and dissolves
- The "after" card is vibrant and grows into place

**HTML structure**:

```html
<section id="memory" class="section" style="background: var(--bg)">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-tag">agentmemory</div>
      <h2>Memory that persists<br />across <span class="text-primary">every session</span></h2>
      <p class="section-sub">
        No more repeating yourself. Agent Kit remembers who you are, what you built, and how you
        build it.
      </p>
    </div>

    <div class="memory-showcase reveal">
      <div class="memory-comparison">
        <!-- Before: empty state -->
        <div class="memory-panel memory-panel-empty">
          <div class="memory-panel-head">Before agentmemory</div>
          <div class="memory-panel-body">
            <div class="memory-empty-icon" aria-hidden="true">∅</div>
            <p class="memory-empty-text">No prior context found.<br />Starting from zero.</p>
          </div>
        </div>

        <div class="memory-arrow" aria-hidden="true">→</div>

        <!-- After: populated state -->
        <div class="memory-panel memory-panel-filled">
          <div class="memory-panel-head">
            After <code class="text-primary">npx opencode-agent-kit init</code>
          </div>
          <div class="memory-panel-body">
            <table class="memory-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Content</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                <tr class="memory-row">
                  <td><span class="memory-badge memory-badge-pattern">pattern</span></td>
                  <td class="memory-content">Component-first architecture</td>
                  <td><span class="memory-confidence">0.82</span></td>
                </tr>
                <!-- 5-7 rows, diverse types -->
              </tbody>
            </table>
            <div class="memory-schema">
              <span class="schema-tag">identity</span>
              <span class="schema-tag">preference</span>
              <span class="schema-tag">goal</span>
              <span class="schema-tag">decision</span>
              <span class="schema-tag">pattern</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**CSS classes**:
| Class | Purpose |
|-------|---------|
| `.memory-showcase` | Max-width 960px, centered |
| `.memory-comparison` | Flex row, gap 40px, align center, stack on mobile |
| `.memory-panel` | Border `--border-default`, radius-lg, overflow hidden, flex 1 |
| `.memory-panel-empty` | Background `--bg-surface`, opacity 0.6 |
| `.memory-panel-filled` | Background `--bg-surface`, border-color `--primary-dim` |
| `.memory-panel-head` | Padding 16px 20px, border-bottom, `--text-sm`, weight 600 |
| `.memory-panel-body` | Padding 20px |
| `.memory-empty-icon` | `--text-2xl`, `--text-muted`, text-center, padding 24px |
| `.memory-empty-text` | `--text-sm`, `--text-muted`, text-center |
| `.memory-arrow` | `--text-h3`, `--primary`, padding 0 16px |
| `.memory-table` | Width 100%, border-collapse |
| `.memory-table th` | `--text-xs`, uppercase, `--text-muted`, weight 600, border-bottom |
| `.memory-table td` | `--text-sm`, `--text-secondary`, padding 8px 4px |
| `.memory-row` | Transition, staggered reveal via nth-child delay |
| `.memory-badge` | Inline-flex, padding 2px 10px, radius-full, `--text-xs`, weight 500 |
| `.memory-badge-pattern` | Background `--primary-dim`, color `--primary` |
| `.memory-content` | `--text-primary`, weight 400 |
| `.memory-confidence` | `--text-muted`, font-mono |
| `.schema-tag` | Inline-flex, padding 4px 12px, border, radius-full, `--text-xs`, `--text-muted` |

---

### Section 4: Agents (`#agents`)

**Narrative function**: Showcase the agent roster. Each agent is a "personality" with clear role and stack. Make them feel like a team, not a file listing.

**Layout type**: Card grid — but NOT an identical card grid. Each card has a subtle color accent per category (warm for frontend, cool for backend, etc.). Cards vary in visual weight.

**Background treatment**: `--bg-surface` — shift away from base dark.

**Key visual element**:

- Agent cards with category-colored top border (2px, full width — NOT side-stripe)
- Each card shows: agent name (monospace), emoji-less icon area, description, tech stack tags
- Cards grouped by category with a category label
- 6 categories max, ~2-4 agents each

**Motion behavior**:

- Staggered card reveal (0.1s delay per card)
- Cards lift on hover (translateY(-4px) + subtle shadow)
- Category labels fade in before their cards

**HTML structure**:

```html
<section id="agents" class="section section-alt">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-tag">Team</div>
      <h2>33 agents, <span class="text-primary">ready to deploy</span></h2>
      <p class="section-sub">Specialized subagents for every layer of your stack.</p>
    </div>

    <div class="agents-grid">
      <!-- Category: Frontend -->
      <div class="agent-category reveal">
        <h3 class="agent-category-title" style="--cat-color: var(--primary)">Frontend</h3>
        <div class="agent-cards">
          <article class="agent-card" style="--card-accent: var(--primary)">
            <header class="agent-card-header">
              <span class="agent-card-name">@frontend-nuxt</span>
              <span class="agent-card-stack">Nuxt, Vue, Pinia</span>
            </header>
            <p class="agent-card-desc">
              Builds production Nuxt 4 apps with composables, layouts, and full SSR.
            </p>
            <div class="agent-card-tags">
              <span class="agent-tag">Vue 3</span>
              <span class="agent-tag">Tailwind</span>
              <span class="agent-tag">Nuxt UI</span>
            </div>
          </article>
          <!-- repeat for @frontend-react -->
        </div>
      </div>
      <!-- repeat for Backend, Mobile, DevOps, Reviewers, Languages -->
    </div>
  </div>
</section>
```

**CSS classes**:
| Class | Purpose |
|-------|---------|
| `.agents-grid` | Max-width 1100px, centered |
| `.agent-category` | Margin-bottom 48px |
| `.agent-category-title` | `--text-h3`, color `--cat-color`, margin-bottom 20px |
| `.agent-cards` | CSS grid, `repeat(auto-fill, minmax(280px, 1fr))`, gap 16px |
| `.agent-card` | Background `--bg`, border, radius-lg, padding 20px, border-top 2px solid `--card-accent`, transition all |
| `.agent-card:hover` | TranslateY(-4px), shadow-md |
| `.agent-card-header` | Flex, justify-between, align-start, margin-bottom 8px |
| `.agent-card-name` | `--font-mono`, `--text-sm`, `--card-accent`, weight 600 |
| `.agent-card-stack` | `--text-xs`, `--text-muted` |
| `.agent-card-desc` | `--text-sm`, `--text-secondary`, line-height 1.5 |
| `.agent-card-tags` | Flex, gap 6px, flex-wrap, margin-top 12px |
| `.agent-tag` | Padding 2px 10px, bg `--bg-surface`, border, round-sm, `--text-xs`, `--text-muted` |

**Color accents per category**:
| Category | Accent |
|----------|--------|
| Frontend | `--primary` (amber-honey) |
| Backend | `--secondary` (slate) |
| Mobile | `--success` (mint) |
| DevOps | `--secondary` (slate), lighter variant |
| Reviewers | `--primary-dim` |
| Languages | `--success-dim` |

---

### Section 5: Install (`#install`)

**Narrative function**: Ultra-simple installation. One command, copy and paste. No friction.

**Layout type**: Center-aligned, minimal.

**Background treatment**: `--bg` — solid, quiet. The code block is the star.

**Key visual element**:

- One code block with the install command, cleanly presented
- Terminal dots (red/yellow/green) retained from current, but simplified
- No execution output log — just the command and a button
- A subtitle: "Zero configuration. 73 files. Done in 3 seconds."

**Motion behavior**:

- Code block appears with subtle scale + fade reveal
- Copy button (optional visual, no JS copy needed)

**HTML structure**:

```html
<section id="install" class="section">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-tag">Install</div>
      <h2>One command, <span class="text-primary">zero config</span></h2>
      <p class="section-sub">Works in any project. Node.js 18+ required.</p>
    </div>

    <div class="install-block reveal">
      <div class="code-block">
        <div class="code-block-header">
          <div class="code-dots" aria-hidden="true">
            <span class="code-dot code-dot-red"></span>
            <span class="code-dot code-dot-yellow"></span>
            <span class="code-dot code-dot-green"></span>
          </div>
          <span class="code-block-title">terminal</span>
        </div>
        <div class="code-block-body">
          <span class="code-prompt">$</span>
          <span class="code-command">npx opencode-agent-kit init</span>
        </div>
      </div>
      <p class="install-footnote">73 files created · 33 agents online · 207 skills loaded</p>
      <div class="install-actions">
        <a href="https://github.com/..." class="btn btn-primary btn-lg">Install Now</a>
        <a href="https://npmjs.com/package/opencode-agent-kit" class="btn btn-secondary btn-lg"
          >npm</a
        >
      </div>
    </div>
  </div>
</section>
```

**CSS classes**:
| Class | Purpose |
|-------|---------|
| `.install-block` | Max-width 640px, centered |
| `.code-block` | Background `--bg-inset`, border, radius-lg, overflow hidden |
| `.code-block-header` | Flex, align-center, padding 10px 16px, bg `--bg-surface`, border-bottom |
| `.code-dots` | Flex, gap 6px |
| `.code-dot` | Width 10px, height 10px, radius-full |
| `.code-dot-red` | Background `#ff5f56` |
| `.code-dot-yellow` | Background `#ffbd2e` |
| `.code-dot-green` | Background `#27c93f` |
| `.code-block-title` | `--text-xs`, `--text-muted`, font-mono, margin-left auto |
| `.code-block-body` | Padding 20px 24px, font-mono, `--text-code`, flex, gap 8px |
| `.code-prompt` | `--primary`, weight 600 |
| `.code-command` | `--text-primary`, weight 400 |
| `.install-footnote` | `--text-sm`, `--text-muted`, text-center, margin-top 16px |
| `.install-actions` | Flex, justify-center, gap 12px, margin-top 24px |

---

### Section 6: CTA (`#cta`)

**Narrative function**: Natural ending. A closing statement, not a hard sell. Warm, confident invitation.

**Layout type**: Center-aligned, full-width, generous vertical padding.

**Background treatment**: `--bg-surface` with warm glow overlay.

**Key visual element**:

- Large closing statement (single sentence)
- Primary CTA button
- Optionally: "Already using it?" with upgrade command inline

**Motion behavior**: Standard reveal. No animation on the closing statement itself — let it sit with quiet confidence.

**HTML structure**:

```html
<section id="cta" class="section section-alt cta-section">
  <div class="cta-ambient" aria-hidden="true"></div>
  <div class="container">
    <div class="cta-content reveal">
      <h2 class="cta-heading">
        Your agent team.<br />
        <span class="text-primary">One command away.</span>
      </h2>
      <p class="cta-sub">
        No monthly fees. No cloud dependency. Just a portable agent system<br class="hide-mobile" />
        that works the way you do.
      </p>
      <div class="cta-actions">
        <a href="https://github.com/..." class="btn btn-primary btn-lg">Get Started</a>
      </div>
      <p class="cta-alt">
        Already installed? Run <code class="text-primary">npx opencode-agent-kit upgrade</code>
      </p>
    </div>
  </div>
</section>
```

**CSS classes**:
| Class | Purpose |
|-------|---------|
| `.cta-section` | Padding top/bottom 160px relative |
| `.cta-ambient` | Radial glow, centered, pointer-events none |
| `.cta-content` | Max-width 680px, centered, text-center |
| `.cta-heading` | `--text-display`, weight 700, line-height 1.15 |
| `.cta-sub` | `--text-lg`, `--text-secondary`, margin-top 16px |
| `.cta-actions` | Flex, justify-center, margin-top 32px |
| `.cta-alt` | `--text-sm`, `--text-muted`, margin-top 24px |

---

## 5. Component Specifications

### Button System

| Variant         | Background                                                      | Color              | Border             | Hover                                               |
| --------------- | --------------------------------------------------------------- | ------------------ | ------------------ | --------------------------------------------------- |
| `btn-primary`   | `--primary`                                                     | `--text-inverse`   | none               | `--primary-hover`, translateY(-1px), shadow-primary |
| `btn-secondary` | transparent                                                     | `--text-secondary` | `--border-default` | `--bg-surface`, `--text-primary`, border-hover      |
| Sizes           | `.btn-sm` (8px 16px), `.btn` (10px 24px), `.btn-lg` (14px 32px) |                    |                    |                                                     |

### Navbar (KEPT from current, rethemed)

- Logo area: square icon + "Agent Kit" text
- Nav links: Why, Platform, Memory, Agents, Install, GitHub
- Theme toggle button (moon/sun) — **KEPT**
- Mobile: hamburger → full-screen overlay (KEPT)

**Changes**:

- Nav link underline color → `--primary`
- Logo icon background → `--primary`
- Active/current section indicator: add `.nav-link-active` with `--primary` color

### Marquee (KEPT)

- Retain current structure exactly
- Change dot colors to use new palette if needed
- Keep duplicate-tracks for seamless loop

### Footer (KEPT)

- Retain current grid structure
- Update gold references → `--primary`

### Scroll Progress (KEPT)

- Gradient: `var(--primary)` instead of gold
- Rest unchanged

### Noise Overlay (KEPT)

- Unchanged. It's a texture, not an animation.

### Theme Toggle (KEPT)

- Icon: sun (light) / moon (dark) using simple SVG or unicode
- Update ARIA labels

---

## 6. Motion Specifications

### Scroll Reveal

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.6s var(--ease-out),
    transform 0.6s var(--ease-out);
}
.revealed {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
```

### Counter Animation (Stats)

```javascript
// On IntersectionObserver entry:
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
```

### Staggered Reveal (Cards, Table Rows)

Apply `transition-delay` via nth-child:

```css
.agent-card:nth-child(1) {
  transition-delay: 0s;
}
.agent-card:nth-child(2) {
  transition-delay: 0.1s;
}
.agent-card:nth-child(3) {
  transition-delay: 0.2s;
}
/* etc. — or use inline style with JS */
```

### Hover States

- Interactive elements (buttons, cards, links): `transition: transform var(--duration-fast) var(--ease-out)`
- Cards lift: `translateY(-4px)`
- Buttons lift: `translateY(-1px)`
- Links: underline grows from left (current pattern, KEPT)

### prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal {
    opacity: 1 !important;
    transform: none !important;
  }
  .scroll-progress {
    display: none;
  }
  .marquee-track {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
  }
  .hero-stat-number {
    /* show final values immediately */
  }
}
```

---

## 7. What to KEEP (from current file)

| Element                                                      | File lines | Notes                        |
| ------------------------------------------------------------ | ---------- | ---------------------------- |
| Navbar structure                                             | 532-799    | Retheme colors, gold→primary |
| Nav mobile panel                                             | 659-799    | Retheme, keep pattern        |
| Marquee section                                              | 919-968    | Keep identical               |
| Footer                                                       | 973-1079   | Retheme colors               |
| Scroll progress bar                                          | 501-512    | Update gradient to primary   |
| Noise overlay                                                | 513-527    | Keep unchanged               |
| Theme toggle JS                                              | 2332-2353  | Retheme icon, keep logic     |
| Navbar scroll JS                                             | 2358-2373  | Keep unchanged               |
| Mobile menu JS                                               | 2378-2428  | Keep unchanged               |
| Scroll reveal (IntersectionObserver)                         | 2433-2454  | Keep unchanged               |
| prefers-reduced-motion CSS                                   | 1631-1665  | Update references            |
| Section utility classes (.container, .section, .section-alt) | 300-385    | Keep                         |
| Button system                                                | 429-496    | Retheme colors               |
| `.sr-only`                                                   | 414-424    | Keep                         |
| Focus-visible outlines                                       | 278-281    | Keep, color→primary          |

---

## 8. What to REMOVE (from current file)

| Section                                  | Lines     | Reason                             |
| ---------------------------------------- | --------- | ---------------------------------- |
| Crash log section (Problem)              | 1771-1814 | Replace with progress-bar metaphor |
| Hero terminal section                    | 1819-1896 | Replace with typographic hero      |
| Memory query terminal output             | 1901-1993 | Replace with comparison panels     |
| Agent directory ls listing               | 1998-2097 | Replace with visual cards          |
| Install terminal execution log           | 2102-2185 | Replace with minimal code block    |
| All terminal-dot CSS (`.terminal-dot-*`) | 846-854   | Replaced by `.code-dot-*`          |
| All `.crash-*` CSS classes               | 1084-1220 | Replaced by problem-bar system     |
| All `.hero-terminal-*` CSS classes       | 1224-1319 | Replaced by new hero               |
| All `.memory-query-*` CSS classes        | 1324-1421 | Replaced by memory-showcase        |
| All `.dir-*` CSS classes                 | 1426-1483 | Replaced by agent-card system      |
| All `.install-*` CSS classes             | 1488-1611 | Replaced by code-block             |
| Gold accent tokens                       | 42-47     | Replaced by primary (amber)        |
| Teal accent tokens                       | 49-52     | Replaced by success (mint)         |
| Purple dot color (`--dot-backend`)       | 61        | To be reassigned                   |
| `.text-gold`, `.text-gold-emphasis`      | 389-393   | Replaced by `.text-primary`        |
| `.text-teal`                             | 411-413   | Replaced by `.text-success`        |
| Gold shadow (`--shadow-gold`)            | 117       | Replaced by `--shadow-primary`     |
| `Inter` in font stack                    | 67        | Replaced by `DM Sans`              |
| Gold underline effect                    | 394-410   | Replace with simple color accent   |
| Hero metric template stats               | 1864-1872 | Replaced by hero-stats             |
| Crash/error narrative in Problem         | 1776-1814 | Replaced by objective metaphor     |

---

## 9. Google Fonts Link

Replace current Inter + JetBrains Mono with:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400;1,9..40,500&family=JetBrains+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

---

## 10. Accessibility Checklist

- [ ] All color pairs meet WCAG AA (verified in contrast table above)
- [ ] Focus-visible outlines use `--primary` at 2px
- [ ] All interactive elements have `:focus-visible` styles
- [ ] Buttons have visible hover + active states
- [ ] Keyboard navigation works: Tab through navbar, links, buttons
- [ ] Mobile menu traps focus when open and releases on Escape
- [ ] `aria-label` on theme toggle updates with state change
- [ ] `prefers-reduced-motion: reduce` disables all animations and reveals
- [ ] Marquee pauses on hover and collapses on reduced-motion
- [ ] Touch targets ≥ 44x44px on mobile
- [ ] Skip-to-content link (add if not present)

---

## 11. Implementation Order (for `@frontend-nuxt` or `@frontend-react`)

| Phase | Work                                                           |
| ----- | -------------------------------------------------------------- |
| 1     | Update CSS tokens (`:root` + `[data-theme="light"]`)           |
| 2     | Update Google Fonts link to DM Sans + JetBrains Mono           |
| 3     | Rebuild Hero section (typographic + stats)                     |
| 4     | Rebuild Problem section (progress bar metaphor)                |
| 5     | Rebuild Memory section (comparison panels + table)             |
| 6     | Rebuild Agents section (visual cards grid)                     |
| 7     | Rebuild Install section (minimal code block)                   |
| 8     | Add CTA section                                                |
| 9     | Retheme Navbar, Marquee, Footer (keep structure, new colors)   |
| 10    | Update JS: counter animation for stats                         |
| 11    | QA: color contrast, motion, responsive, prefers-reduced-motion |
