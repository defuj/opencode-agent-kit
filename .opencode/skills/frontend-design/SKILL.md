---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Automatically applies Impeccable design intelligence — typography, color, layout, motion, critique, and polish. Use this skill when the user asks to build, redesign, critique, audit, or polish web components, pages, or applications.
---

This skill embeds **Impeccable** (impeccable.style) design intelligence. When doing frontend design work, automatically load the `impeccable` skill via the skill tool to access deep reference files for typography, color, motion, spatial design, interaction, responsive, UX writing, and all 23 design command references.

## Core Design Principles (Apply Automatically)

### Color
- Use OKLCH. Reduce chroma as lightness approaches 0 or 100.
- Never use `#000` or `#fff`. Tint every neutral toward the brand hue (chroma 0.005–0.01).
- Pick a **color strategy**: Restrained (tinted neutrals + ≤10% accent), Committed (one color carries 30–60%), Full palette (3–4 named roles), or Drenched (the surface IS the color).
- Name your instinctive first three palette choices; reject all three before committing.

### Typography
- Cap body line length at 65–75ch.
- ≥1.25 ratio between hierarchy steps. Avoid flat scales.
- Avoid overused fonts: Inter, Roboto, Arial, Fraunces, Geist, Plus Jakarta Sans, Space Grotesk, Recoleta, Instrument Sans.
- Prefer distinctive display fonts + refined body pairings.

### Layout
- Vary spacing for rhythm. Same padding everywhere is monotony.
- Cards are the lazy answer. Use only when they're truly the best affordance. Nested cards are always wrong.
- Don't wrap everything in a container. Most things don't need one.

### Motion
- Don't animate CSS layout properties.
- Ease out with exponential curves (ease-out-quart / quint / expo). No bounce, no elastic.
- 150ms for hover/focus, 300ms for toggles/reveals, 500ms for page transitions.

### Absolute Bans (AI Slop Prevention)
- **Side-stripe borders**: `border-left`/`right` >1px as colored accent — never intentional.
- **Gradient text**: `background-clip: text` with gradient — decorative, never meaningful.
- **Glassmorphism as default** — rare and purposeful, or nothing.
- **Hero-metric template**: big number, small label, supporting stats, gradient accent. SaaS cliché.
- **Identical card grids**: same-sized cards with icon + heading + text, endlessly.
- **Modal as first thought** — exhaust inline/progressive alternatives first.
- **Italic serif display heroes**: oversized italic serif as primary h1 (late-2025 AI fingerprint).
- **Hero eyebrow chips**: uppercase letter-spaced label sitting directly above h1.

### Copy
- Every word earns its place. No restated headings, no intros that repeat the title.
- **No em dashes**. Use commas, colons, semicolons, periods, or parentheses.

### Register Awareness
Every design task is either **brand** (marketing, landing, portfolio: design IS the product) or **product** (app UI, dashboard, tools: design SERVES the product). Identify before designing. Brand work needs bolder choices; product work needs clarity and efficiency.

## Design Thinking

Before coding, understand:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick a BOLD aesthetic direction (brutally minimal, maximalist chaos, retro-futuristic, editorial/magazine, etc.)
- **Constraints**: Technical requirements (framework, performance, accessibility)
- **Differentiation**: What makes this UNFORGETTABLE?

Then implement working code that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Aesthetics Guidelines

- **Typography**: Choose distinctive, unexpected fonts. Avoid AI-overused fonts.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables in OKLCH.
- **Motion**: Purposeful animations, staggered reveals, scroll-triggering, surprising hover states.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Grid-breaking. Generous whitespace.
- **Backgrounds**: Gradient meshes, noise textures, geometric patterns, layered transparencies.

Never converge on common choices across generations. Vary between light and dark themes, different fonts, different aesthetics.

## Loading Impeccable Reference Files

When the task involves any of these, load the corresponding reference via the `skill` tool:

| Task | Reference File |
|------|---------------|
| Typography fixes | `impeccable` skill (loads typography.md) |
| Color decisions | `impeccable` skill (loads color-and-contrast.md) |
| Motion/animation | `impeccable` skill (loads motion-design.md) |
| Layout/spacing | `impeccable` skill (loads spatial-design.md) |
| UX copy | `impeccable` skill (loads ux-writing.md) |
| Responsive | `impeccable` skill (loads responsive-design.md) |
| Interaction design | `impeccable` skill (loads interaction-design.md) |
| Full critique | `impeccable` skill (loads critique.md, personas.md, heuristics-scoring.md) |
| Production polish | `impeccable` skill (loads polish.md) |
| Brand work | `impeccable` skill (loads brand.md) |
| Product UI | `impeccable` skill (loads product.md) |
