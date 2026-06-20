# Token Reference — CSS Custom Properties

> Design tokens for the Terminal-Native landing page rebuild. Import this into `:root` and `[data-theme="light"]`.

---

## 1. Color Tokens

### Base Surface (Dark — :root)

```css
:root {
  /* Backgrounds — darkest to lightest */
  --bg: oklch(0.04 0.008 280); /* #0a0a0f — page background */
  --bg-surface: oklch(0.06 0.01 280); /* #0e0e16 — card/panel bg */
  --bg-raised: oklch(0.08 0.012 280); /* #12121c — terminal chrome, elevated */
  --bg-inset: oklch(0.035 0.005 280); /* #06060a — code block, inset panel */
  --bg-hover: oklch(0.12 0.015 280); /* #1a1a28 — card hover */
  --bg-nav: oklch(0.04 0.008 280 / 0.95); /* nav background (scrolled) */

  /* Text */
  --text-primary: oklch(0.88 0.015 280); /* #e0e0e8 — body, headings */
  --text-secondary: oklch(0.55 0.015 280); /* #6a6a7a — muted text */
  --text-muted: oklch(0.42 0.012 280); /* #4a4a5a — captions, timestamps */
  --text-inverse: oklch(0.04 0.008 280); /* text on gold buttons */

  /* Borders */
  --border-subtle: oklch(1 0 0 / 0.06); /* default card border */
  --border-hover: oklch(1 0 0 / 0.12); /* hover border */
  --border-active: oklch(1 0 0 / 0.2); /* active/focus border */
  --border-gold: oklch(0.68 0.12 78 / 0.25); /* gold-tinted border (tabs active) */

  /* Gold accent */
  --gold: oklch(0.68 0.12 78); /* #d4a04a — prompts, CTAs, highlight text */
  --gold-hover: oklch(0.72 0.13 78); /* #e0b050 — hover state for gold elements */
  --gold-dim: oklch(0.68 0.12 78 / 0.15); /* gold background wash (tabs) */
  --gold-dim-2: oklch(0.68 0.12 78 / 0.06); /* subtle gold wash (badges) */
  --gold-glow: oklch(0.68 0.12 78 / 0.1); /* gold shadow/glow */

  /* Teal — success */
  --teal: oklch(0.72 0.14 170); /* #2dd4bf — success states */
  --teal-dim: oklch(0.72 0.14 170 / 0.12); /* teal background */
  --teal-text: oklch(0.72 0.14 170); /* teal on dark bg — use as text */

  /* Red — error/loss */
  --red: oklch(0.58 0.16 25); /* #e06070 — error, lost context */
  --red-dim: oklch(0.58 0.16 25 / 0.12); /* red background */
  --red-text: oklch(0.72 0.14 25); /* red text on dark bg */

  /* Category dots — for agent cards */
  --dot-frontend: var(--teal);
  --dot-backend: oklch(0.62 0.14 290); /* #8b6cf6 — violet */
  --dot-mobile: var(--gold);
  --dot-devops: var(--red);
  --dot-reviewer: oklch(0.65 0.12 260); /* #60a5fa — blue */
}
```

### Light Mode Override

```css
[data-theme='light'] {
  --bg: oklch(0.94 0.008 85); /* warm off-white */
  --bg-surface: oklch(0.97 0.006 85);
  --bg-raised: oklch(0.99 0.004 85);
  --bg-inset: oklch(0.91 0.01 85);
  --bg-hover: oklch(0.88 0.01 85);
  --bg-nav: oklch(0.94 0.008 85 / 0.92);

  --text-primary: oklch(0.15 0.015 280);
  --text-secondary: oklch(0.38 0.012 280);
  --text-muted: oklch(0.5 0.01 280);
  --text-inverse: oklch(0.98 0.005 85);

  --border-subtle: oklch(0 0 0 / 0.08);
  --border-hover: oklch(0 0 0 / 0.18);
  --border-active: oklch(0 0 0 / 0.28);
  --border-gold: oklch(0.58 0.12 78 / 0.3);

  --gold: oklch(0.58 0.12 78); /* darker gold for light bg */
  --gold-hover: oklch(0.62 0.13 78);
  --gold-dim: oklch(0.58 0.12 78 / 0.15);
  --gold-dim-2: oklch(0.58 0.12 78 / 0.06);
  --gold-glow: oklch(0.58 0.12 78 / 0.12);

  --teal: oklch(0.5 0.14 170);
  --teal-dim: oklch(0.5 0.14 170 / 0.12);
  --teal-text: oklch(0.4 0.14 170);

  --red: oklch(0.5 0.16 25);
  --red-dim: oklch(0.5 0.16 25 / 0.12);
  --red-text: oklch(0.55 0.16 25);
}
```

---

## 2. Typography Tokens

```css
:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Size scale */
  --text-xs: 0.6875rem; /* 11px — captions, timestamps */
  --text-sm: 0.75rem; /* 12px — labels, small text */
  --text-base: 0.875rem; /* 14px — body */
  --text-md: 1rem; /* 16px — large body */
  --text-lg: 1.125rem; /* 18px — subheadings */
  --text-xl: 1.5rem; /* 24px — headings */
  --text-2xl: 2rem; /* 32px — section titles */
  --text-3xl: 3rem; /* 48px — hero command */

  /* Weight */
  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  /* Line Height */
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.6;
  --leading-relaxed: 1.8;

  /* Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.02em;
}
```

---

## 3. Spacing Tokens

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-8: 48px;
  --space-10: 64px;
  --space-12: 96px;
}
```

---

## 4. Border & Radius Tokens

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  --border-width: 1px;
  --border-default: var(--border-width) solid var(--border-subtle);
}
```

---

## 5. Shadow Tokens

```css
:root {
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-raised: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-gold: 0 0 20px var(--gold-glow);
}
```

---

## 6. Motion Tokens

```css
:root {
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1); /* ease-out-quart */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1); /* ease-out-expo */
  --duration-fast: 200ms;
  --duration-normal: 400ms;
  --duration-slow: 800ms;

  /* Keyframes */
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes pulse-dot {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }

  @keyframes type-cursor {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
}
```

---

## 7. Z-Index Tokens

```css
:root {
  --z-base: 0;
  --z-content: 1;
  --z-dropdown: 10;
  --z-nav: 100;
  --z-overlay: 200;
  --z-modal: 300;
}
```

---

## 8. Container & Layout Tokens

```css
:root {
  --container-max: 1200px;
  --container-padding: 24px;
  --container-padding-mobile: 16px;

  --nav-height: 64px;
  --nav-height-scrolled: 52px;

  --section-padding-desktop: 120px;
  --section-padding-mobile: 80px;
}
```

---

## 9. Theme Class Usage

```css
/* Dark theme (default) */
:root,
[data-theme='dark'] {
  /* all dark tokens above */
}

/* Light theme */
[data-theme='light'] {
  /* all light overrides above */
}
```

---

## 10. Utility Classes

```css
/* Layout utilities */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}
@media (max-width: 640px) {
  .container {
    padding: 0 var(--container-padding-mobile);
  }
}

.section {
  padding: var(--section-padding-desktop) 0;
  position: relative;
}
@media (max-width: 640px) {
  .section {
    padding: var(--section-padding-mobile) 0;
  }
}

.section-divider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--border-gold), transparent);
}

/* Section header pattern */
.section-header {
  text-align: center;
  margin-bottom: var(--space-8);
}
.section-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--gold);
  margin-bottom: var(--space-3);
}
.section-tag::before {
  content: '#';
  opacity: 0.5;
}

/* Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.focus-ring:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
