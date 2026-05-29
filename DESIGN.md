# Design System — Opencode Agent KIT Landing Page

> Single-page landing for `index.html`. Tailwind CSS via CDN + custom CSS classes.

---

## 1. Color Palette

### Primary Colors (OKLCH)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#08080c` | Page background |
| `--surface` | `#0e0e14` | Card backgrounds |
| `--raised` | `#14141c` | Elevated surfaces |
| `--accent` | `#d4a04a` | Primary accent (gold) |
| `--accent-bright` | `#e8b85e` | Accent highlight |
| `--accent-dim` | `rgba(212, 160, 74, 0.12)` | Subtle accent wash |
| `--accent-glow` | `rgba(212, 160, 74, 0.25)` | Accent glow/shadow |

### Secondary Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--violet` | `#8b6cf6` | Secondary accent |
| `--violet-dim` | `rgba(139, 108, 246, 0.1)` | Violet wash |
| `--violet-glow` | `rgba(139, 108, 246, 0.2)` | Violet glow |
| `--rose` | `#e06070` | Tertiary accent |
| `--rose-dim` | `rgba(224, 96, 112, 0.1)` | Rose wash |
| `--teal` | `#4ac8b8` | Quaternary accent |
| `--teal-dim` | `rgba(74, 200, 184, 0.1)` | Teal wash |

### Neutral Colors (OKLCH)

| Usage | Value | Context |
|-------|-------|---------|
| Heading text | `oklch(0.92 0.005 260)` | h1-h6 |
| Body text | `oklch(0.55 0.01 260)` | p, span |
| Muted text | `oklch(0.4 0.005 260)` | Nav, labels |
| Hover text | `oklch(0.75 0.01 260)` | Interactive states |
| Border subtle | `oklch(1 0 0 / 0.04)` | Card borders |
| Border hover | `oklch(1 0 0 / 0.1)` | Card hover borders |
| Divider | `oklch(0.5 0.01 260 / 0.15)` | Section dividers |

### Color Opacity Scale

| Level | Opacity | Usage |
|-------|---------|-------|
| 3% | `0.03` | Ultra-subtle backgrounds |
| 4% | `0.04` | Card borders, subtle dividers |
| 5% | `0.05` | Card borders, hover states |
| 10% | `0.10` | Secondary elements |
| 12% | `0.12` | Accent dim wash |
| 15% | `0.15` | Dividers, orbital rings |
| 20% | `0.20` | Hover borders |
| 25% | `0.25` | Accent glow |
| 30% | `0.30` | Marquee bullets |
| 40% | `0.40` | Dot indicators |
| 50% | `0.50` | Marquee text, stat suffix |

---

## 2. Typography

### Font Families

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| **Display** | Sora | 400, 500, 600, 700, 800 | Headings, hero titles, stat numbers |
| **Body** | IBM Plex Sans | 300, 400, 500, 600 | Paragraphs, descriptions, body text |
| **Mono** | JetBrains Mono | 400, 500 | Code blocks, badges, labels, commands |

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| Hero title | `5xl/6xl` (3rem/4.5rem) | 800 (extra-bold) | `1.1` | `-0.03em` |
| Section heading | `3xl/4xl/5xl` (1.875rem/2.25rem/3rem) | 700 (bold) | `1.2` | `-0.02em` |
| Subheading | `sm/base` (0.875rem/1rem) | 400 (normal) | `1.625` | normal |
| Nav link | `0.8rem` | 400 | normal | `0.02em` |
| Body text | `sm` (0.875rem) | 400 | `1.75` | normal |
| Label uppercase | `xs` (0.75rem) | 500 | normal | `0.08em` |
| Stat label | `[11px]` | 500 | normal | `0.15em` |
| Badge | `xs` (0.75rem) | 500 | normal | `0.02em` |
| Code | `xs` (0.75rem) | 400 | `1.6` | normal |
| Orbital node | `10px` | 700 | normal | normal |

### Text Colors by Context

| Context | Color | Example |
|---------|-------|---------|
| Hero title | `oklch(0.92 0.005 260)` | "Opencode Agent KIT" |
| Section heading | `oklch(0.92 0.005 260)` | "13 Agents, One Mission" |
| Body paragraph | `oklch(0.55 0.01 260)` | Description text |
| Muted description | `text-white/25` | Section subtitles |
| Nav links | `oklch(0.4 0.005 260)` | Navigation items |
| Accent text | `text-accent` | Highlighted keywords |
| Code text | `text-white/60` | Code blocks |

---

## 3. Spacing System

### Section Spacing

| Breakpoint | Padding | Context |
|------------|---------|---------|
| Mobile | `py-16` (4rem) | Section vertical padding |
| Desktop | `lg:py-24` / `lg:py-32` (6rem/8rem) | Large sections |
| Marquee | `py-6` (1.5rem) | Compact horizontal sections |
| Nav | `py-4` (1rem) | Navigation bar |

### Horizontal Containers

| Container | Max Width | Padding |
|-----------|-----------|---------|
| Full bleed | `100vw` | Background layers |
| Standard | `max-w-6xl` (72rem) | `px-6 lg:px-8` (1.5rem/2rem) |
| Content narrow | `max-w-2xl` (42rem) | Centered text blocks |
| Orbital | `max-w-480px` | Centered visualization |

### Component Spacing

| Element | Spacing | Context |
|---------|---------|---------|
| Card padding | `p-5 sm:p-6` (1.25rem/1.5rem) | Stat cards, bento cards |
| Gap between cards | `gap-3` (0.75rem) | Grid gaps |
| Internal gap | `gap-1.5` (0.375rem) | Inline elements |
| Margin bottom | `mb-14` / `mb-16` (3.5rem/4rem) | Section spacing |
| Hero CTA margin | `mb-20` (5rem) | Below hero actions |

---

## 4. Border Radius

| Radius | Value | Usage |
|--------|-------|-------|
| `rounded-full` | 9999px | Pills, badges, dots, marquee chips |
| `rounded-2xl` | 1rem | Stat cards, bento cards, code blocks |
| `rounded-xl` | 0.75rem | Buttons, install CTA |
| `rounded-lg` | 0.5rem | Nav container |
| `rounded` | 0.25rem | Small elements, checkboxes |
| `rounded-md` | 0.375px | Code tags, small badges |
| Custom | `4px` | Corner accent cards |
| Custom | `10px` | Orbital nodes |
| Custom | `12px` | Code blocks |
| Custom | `16px` | Bento cards |

---

## 5. Shadows & Glows

| Type | Value | Usage |
|------|-------|-------|
| Card hover | `0 12px 40px oklch(0 0 0 / 0.3)` | Agent cards |
| Accent shadow | `shadow-accent/5` | Featured stat card |
| Accent glow | `shadow-accent/20` | Orbital center badge |
| Nav blur | `backdrop-blur-md` | Navigation background |
| Ambient blur | `blur(100px)` | Background glow orbs |
| Card blur | `blur-2xl` | Internal card glows |

---

## 6. Components

### 6.1 Navigation

```
Structure:
├── Fixed position, full width
├── Backdrop blur + gradient background
├── Logo (left) + Links (center) + CTA (right)
└── Scroll-aware background opacity

Classes: nav-link, nav-container
Colors: oklch(0.4 0.005 260) → oklch(0.75 0.01 260) hover
Border: border-white/[0.04] on scroll
```

### 6.2 Hero Section

```
Structure:
├── Badge (pill, mono font)
├── Title (3 lines, display font, staggered animation)
├── Description (body font, muted)
├── CTA Row
│   ├── Primary (install-cta, gradient bg)
│   └── Secondary (ghost button)
└── Stats Row (4 cards)

Animations: line-reveal, fade-up, count-pop
```

### 6.3 Stat Cards

```
Featured Card:
├── Border: accent/20 → accent/30 hover
├── Background: accent/[0.03] → accent/[0.06] hover
├── Glow: ambient circle, blur-2xl
├── Number: 4xl/5xl, font-black, accent color
├── Suffix: "+", mono, accent/50
├── Label: 11px, uppercase, tracking-wide
└── Hover line: expanding gradient bar

Standard Card:
├── Border: white/[0.04] → white/[0.08] hover
├── Background: white/[0.01] → white/[0.03] hover
├── Number: 4xl/5xl, font-black, white/80
├── Suffix: "+", mono, white/20
├── Label: 11px, uppercase, tracking-wide
└── Dots: 3 colored indicators (6px each)
```

### 6.4 Bento Cards

```
Base:
├── Background: --surface (#0e0e14)
├── Border: oklch(1 0 0 / 0.05)
├── Radius: 16px
├── Padding: p-6 lg:p-8
└── Hover: border-color 0.3s, bg 0.3s, transform 0.4s

Variants:
├── agent-card--accent: gradient bg, accent border
├── agent-card--dots: dot pattern overlay
└── agent-card--corner: corner cut + gradient
```

### 6.5 Marquee Chips

```
Structure:
├── Pill shape (rounded-full)
├── Padding: px-4 py-2
├── Border: white/[0.05]
├── Background: white/[0.03]
├── Dot: 6px colored circle (w-1.5 h-1.5)
├── Text: xs, mono, white/50
└── Gap: gap-6 between chips

Dot Colors:
├── blue-400/60: Nuxt, Database
├── cyan-400/60: React
├── emerald-400/60: Node Backend
├── orange-400/60: Laravel
├── lime-400/60: CodeIgniter 3, SEO
├── green-400/60: Android
├── sky-400/60: Flutter
├── amber-400/60: UI/UX Design
├── red-400/60: Code Review
└── indigo-400/60: DevOps
```

### 6.6 Code Blocks

```
Structure:
├── Background: oklch(0.08 0.002 260)
├── Border: oklch(1 0 0 / 0.04)
├── Radius: 12px
├── Padding: p-4 sm:p-5
├── Font: mono, text-xs
├── Color: text-white/60
└── Tags: rounded-md, bg-white/[0.03], text-accent/70
```

### 6.7 Install CTA Button

```
Structure:
├── Gradient: 135deg, accent → violet
├── Radius: rounded-xl
├── Padding: px-6 py-3
├── Font: mono, bold, text-sm
├── Text: text-black
├── Overflow: hidden (for ::before gradient)
└── Hover: translateY(-2px), shadow

Animation: fade-up on page load (0.75s delay)
```

### 6.8 Orbital Visualization

```
Rings:
├── Ring 1: 180px, accent/15 border
├── Ring 2: 300px, violet/10 border
└── Ring 3: 420px, teal/07 border

Center:
├── Badge: 56px, accent bg, black text
├── Shadow: accent/20
└── Label: "IT Leader"

Nodes:
├── Size: 40px × 40px
├── Radius: 10px
├── Font: 10px mono, bold
├── Hover: scale(1.25)
└── Colors: per-agent accent
```

### 6.9 Power Bars

```
Track:
├── Height: 3px
├── Radius: 2px
└── Background: oklch(0.25 0.005 260 / 0.4)

Fill:
├── Gradient: accent → violet
├── Transform: scaleX(0) → scaleX(1)
├── Duration: 1.2s
└── Easing: cubic-bezier(0.16, 1, 0.3, 1)
```

---

## 7. Animations

### 7.1 Keyframes

| Name | Duration | Easing | Usage |
|------|----------|--------|-------|
| `line-reveal` | 0.9s | cubic-bezier(0.16, 1, 0.3, 1) | Hero title lines |
| `fade-up` | 0.6s | ease-out | Badge, CTA |
| `count-pop` | 0.5s | cubic-bezier(0.16, 1, 0.3, 1) | Stat numbers |
| `marquee` | 30s | linear | Infinite scroll marquee |
| `spin-slow` | 80s/120s/160s | linear | Orbital rings |
| `float` | 6s/8s/10s | ease-in-out | Floating shapes |

### 7.2 Transition Timings

| Context | Duration | Easing |
|---------|----------|--------|
| Hover micro | 0.2s | ease |
| Card hover | 0.3s | ease |
| Transform | 0.4s | cubic-bezier(0.16, 1, 0.3, 1) |
| Reveal | 0.8s | cubic-bezier(0.16, 1, 0.3, 1) |
| Power bar | 1.2s | cubic-bezier(0.16, 1, 0.3, 1) |
| Stat line | 0.5s | ease-out |

### 7.3 Scroll Reveal

```
Base: .reveal
├── Initial: opacity 0, translateY(40px)
├── Visible: opacity 1, translateY(0)
├── Duration: 0.8s
└── Easing: cubic-bezier(0.16, 1, 0.3, 1)

Delays:
├── .reveal-delay-1: 0.1s
├── .reveal-delay-2: 0.2s
├── reveal-delay-3: 0.3s
└── .reveal-delay-4: 0.4s
```

---

## 8. Background Layers

| Layer | Position | Size | Color | Blur |
|-------|----------|------|-------|------|
| Base | fixed, full | 100vw × 100vh | `#08080c` | none |
| Noise | fixed, full | 128px tile | SVG fractal | none (opacity 0.025) |
| Ambient 1 | fixed, top-right | 600px | accent/04 radial | 100px |
| Ambient 2 | fixed, bottom-left | 500px | violet/03 radial | 100px |
| Ambient 3 | fixed, mid-right | 400px | rose/02 radial | 100px |

---

## 9. Responsive Breakpoints

| Breakpoint | Width | Adjustments |
|------------|-------|-------------|
| Mobile | < 640px | 2-col grids, smaller fonts, reduced padding |
| Tablet | 640px+ | 4-col grids, larger fonts, full padding |
| Desktop | 1024px+ | lg:py-32, lg:p-8, lg:text-5xl |

---

## 10. Design Principles

### Color Strategy
- **Committed**: Gold accent carries the primary visual identity
- **Tinted neutrals**: All grays lean toward the cool blue hue (260°)
- **Chromatic reduction**: Lower chroma as lightness approaches extremes
- **No pure black/white**: Every neutral has subtle hue tint

### Typography Strategy
- **Display**: Sora for headings (distinctive, geometric)
- **Body**: IBM Plex Sans for readability (humanist sans)
- **Mono**: JetBrains Mono for code/technical elements
- **Hierarchy**: ≥1.25 ratio between steps, no flat scales

### Layout Strategy
- **Asymmetric spacing**: Varying padding for rhythm
- **No nested cards**: Single-level card nesting only
- **Generous whitespace**: Large section padding (py-20 to py-32)
- **Container variety**: Full bleed, max-w-6xl, max-w-2xl

### Motion Strategy
- **No layout property animation**: Transform and opacity only
- **Exponential ease-out**: cubic-bezier(0.16, 1, 0.3, 1)
- **Timing**: 150ms hover, 300ms toggles, 500ms+ reveals
- **Staggered reveals**: Sequential animation delays

### Absolute Bans
- ❌ Side-stripe borders (border-left/right >1px as accent)
- ❌ Gradient text (background-clip: text)
- ❌ Glassmorphism as default
- ❌ Hero-metric template (big number + small label + gradient)
- ❌ Identical card grids
- ❌ Modal as first thought
- ❌ Italic serif display heroes
- ❌ Hero eyebrow chips

---

## 11. Accessibility

| Aspect | Implementation |
|--------|---------------|
| Contrast | OKLCH color space for perceptual uniformity |
| Focus | Visible focus rings on interactive elements |
| Keyboard | All navigation and actions keyboard-accessible |
| Semantic HTML | Proper heading hierarchy (h1 > h2 > h3) |
| Reduced motion | `prefers-reduced-motion` media query support |
| Font size | Minimum 11px for labels, 14px+ for body |

---

## 12. File Reference

| File | Path | Purpose |
|------|------|---------|
| Landing page | `index.html` | Single-page landing (all-in-one) |
| Design system | `DESIGN.md` | This document |

---

*Last updated: 2026-05-29*
