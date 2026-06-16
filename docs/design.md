# ACorp Design Language

This document defines the design language used across all ACorp products and surfaces. Its purpose is to ensure visual and experiential consistency whether you are building a new product, a marketing page, or an internal tool. Every decision here has a reason — read the rationale alongside the spec.

---

## 1. Philosophy

**Name:** Receipt Brutalism

**What it means:** Raw, functional, paper-like. Every interface is treated as a printed document — an invoice, a receipt, a ledger. No decorative gradients, no rounded corners, no soft shadows. The aesthetic signals that the people who built this care about precision and getting the job done.

**How it should feel:** Opening an ACorp product should feel like holding a freshly printed invoice. Sharp edges, clear hierarchy, monospace numbers, and no wasted ink. Direct, not playful.

**What to avoid:**
- Purple-gradient-on-white "AI startup" aesthetics
- Rounded corners on cards, buttons, or badges
- Colored status badges (green, blue, red) — use black/white/gray only
- Drop shadows, glows, or soft skeuomorphism
- Animations that call attention to themselves rather than the content
- Color used for decoration rather than communication

---

## 2. Color System

### Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Dominant | White | `#ffffff` | Page backgrounds, card fills, section spacers |
| Secondary | Neutral | `#737373` | Secondary text, borders, muted UI chrome, captions |
| Accent | Black | `#000000` | CTAs, primary buttons, active states, headings, borders |
| Ink | Near-black | `#000000` | Primary headings, body text on light backgrounds |
| Surface | White | `#ffffff` | Card backgrounds |
| Dark surface | Dark | `#171717` | Sidebar background, dark sections, inverted blocks |
| Destructive | Red | `#ef4444` | Logout actions, delete confirmations, critical alerts |

### 60 / 30 / 10 Rule

| Proportion | Color | Where |
|---|---|---|
| 60% | White `#ffffff` | Page background, content areas, card fills |
| 30% | Neutral `#737373` | Body copy, labels, borders, nav chrome, footer text, secondary text |
| 10% | Black `#000000` | Buttons, active indicators, links, headings, borders, key icons |

### Opacity Variants

These are the standard opacity suffixes used throughout the codebase via hex alpha:

| Purpose | Value |
|---|---|
| Subtle border | `#00000010` – `#00000020` |
| Light background tint | `#00000005` – `#00000008` |
| Active nav pill fill | `#00000008` |
| Hover background | `#00000002` |
| Card ring shadow | `0 1px 3px rgba(0,0,0,0.08)` |
| Dark sidebar border | `rgba(255,255,255,0.10)` |
| Dark sidebar text muted | `rgba(255,255,255,0.50)` |

### Dark Surfaces

When a section needs high visual contrast (e.g. a CTA at the bottom of a page or the sidebar), use `#171717` as the background. Layer a subtle dot matrix pattern on top:

```tsx
<div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />
```

This creates texture without introducing additional colors.

---

## 3. Typography

### Typeface

**Geist Variable** — loaded via `@fontsource-variable/geist`. Variable font; use `font-weight` freely within 100–900 range. Applied globally as `font-sans` and `font-heading`.

```css
@import "@fontsource-variable/geist";
```

### Monospace Labels

For numbers, financial data, and technical labels, use monospace styling with tabular numbers:

```css
.tabular-nums {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
}
```

### Heading Scale

| Level | Size | Weight | Tracking | Usage |
|---|---|---|---|---|
| Display (H1 hero) | `clamp(3.5rem, 9vw, 7.5rem)` | 800 (`extrabold`) | `-0.04em` | Landing page hero only |
| Page title (H1) | `clamp(2.5rem, 6vw, 4.5rem)` | 800 | `-0.03em` | Interior page headers |
| Section heading (H2) | `2.5rem` / `text-4xl` | 700 (`bold`) | tight | Section headings |
| Card heading (H3) | `1.5rem` / `text-2xl` | 700 | tight | Product card names |
| Sub-heading | `1.125rem` / `text-lg` | 700 | tight | Feature card titles, process steps |

### Body & UI Scale

| Level | Size | Weight | Color | Usage |
|---|---|---|---|---|
| Body / description | `0.875rem` / `text-sm` | 400 | `#737373` | Card descriptions, prose |
| Label / tagline | `0.875rem` / `text-sm` | 500 (`medium`) | `#737373` | Card taglines, secondary labels |
| Eyebrow | `0.75rem` / `text-xs` | 700 (`bold`) | `#737373` | Section labels above headings |
| Monospace label | `0.625rem` / `text-[10px]` | 700 (`bold`) | `#737373` | Receipt-style labels, column headers |
| Button | `0.875rem` / `text-sm` | 600 (`semibold`) | varies | All buttons |
| Caption / meta | `0.75rem` / `text-xs` | 400–500 | `#737373` | Footer copy, timestamps, legal notes |

### Eyebrow Pattern

Every major section begins with a small, uppercase eyebrow label in monospace:

```tsx
<p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5"
   style={{ color: "#737373" }}>
  Section Label
</p>
```

The tracking value `0.25em` (25/100ths of an em) is standard for all eyebrows. Use `0.18em` – `0.22em` for pill/badge labels.

### Line Height

| Context | Value |
|---|---|
| Display headings | `0.87` – `0.92` (tight, below 1) |
| Section headings | `1` (leading-none to leading-tight) |
| Body / descriptions | `1.6` – `1.7` (`leading-relaxed`) |
| Legal prose | `1.6` |

---

## 4. Spacing & Layout

### Container

All content is constrained with a single max-width class:

```tsx
<div className="max-w-7xl mx-auto px-6">
```

- Max-width: `80rem` (`max-w-7xl`)
- Horizontal padding: `1.5rem` (`px-6`) on all viewports
- Never use a narrower container on public-facing pages except legal/prose pages, which use `max-w-4xl`

### Section Vertical Rhythm

| Context | Padding |
|---|---|
| Hero top | `pt-20` (5rem) |
| Hero bottom | `pb-28` (7rem) |
| Interior section bottom | `pb-24` (6rem) or `pb-16` (4rem) |
| Card internal padding | `p-6` (1.5rem) |
| Legal section padding | `px-8 md:px-12 py-10` |

### Grid

Product cards: `grid grid-cols-1 md:grid-cols-3 gap-4`
Feature/capability cards: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
Process steps: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`
Full-width stacked cards: `flex flex-col gap-4`

---

## 5. Component Patterns

### 5a. Buttons

All buttons are **square** (`rounded-none`). There are three variants:

**Solid (primary CTA)**
```tsx
<button className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-black transition-all hover:bg-black/90 active:scale-95">
  Label <ArrowRight />
</button>
```

**Outline (secondary CTA)**
```tsx
<button className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold border-2 border-black text-black transition-all hover:bg-black hover:text-white active:scale-95">
  Label
</button>
```

**Ghost (tertiary, used in nav or minimal contexts)**
```tsx
<button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-black transition-all hover:bg-black hover:text-white active:scale-95">
  Label
</button>
```

**Rules:**
- All buttons are square — never `rounded-lg`, `rounded-xl`, or `rounded-full`
- Hover state: fill with black and invert text for outline/ghost, reduce opacity for solid
- Active state: always `active:scale-95` — provides tactile press feedback
- No colored shadows on buttons
- `destructive` variant uses `bg-red-500 text-white` for delete/logout actions

### 5b. Cards

**Standard white card**
```tsx
<div className="bg-white border border-black/10 p-6">
  {/* content */}
</div>
```

- Background: always white (`#ffffff`)
- Border: `1px solid rgba(0,0,0,0.10)` — hairline black border
- Radius: always square (`rounded-none`)
- Shadow: none — borders carry the visual weight
- Hover: subtle background tint (`hover:bg-black/[0.02]`) for list items, no lift for cards
- **No color hints**: do not add colored borders, accent bars, or colored text to signal which product a card belongs to. Typography hierarchy carries the identity.

**Coming-soon / placeholder card**
```tsx
<div className="border border-dashed border-black/10 p-6">
  {/* content */}
</div>
```

### 5c. Navigation

The global nav is a sticky frosted-glass header:

```tsx
<header className="sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-md">
  <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
```

- Height: `h-16` (4rem)
- Background: white at 80% opacity with `backdrop-blur-md`
- Border: `rgba(0,0,0,0.10)` — very subtle separator

**Active nav link:**
```tsx
<Link className="relative px-3 py-1.5 text-sm font-medium transition-all"
      style={{ color: isActive ? "#000000" : "#737373" }}>
  {active && <span className="absolute inset-0" style={{ backgroundColor: "#00000008" }} />}
  <span className="relative">{label}</span>
</Link>
```

Active links use `color: #000000`; inactive use `color: #737373`.

**Sidebar (dark):**
```tsx
<aside className="bg-[#171717] text-white border-r border-white/10">
```

- Background: `#171717` (lighter black)
- Text: white, muted at 50% opacity for inactive items
- Active items: full white text with `rgba(255,255,255,0.08)` background
- Separators: `rgba(255,255,255,0.10)`
- Logout button: `text-red-400 hover:text-red-300`

### 5d. Footer

Two-row structure:
1. **Main row** — brand block (wordmark + tagline) on the left; link columns on the right
2. **Bottom bar** — copyright on the left; legal links on the right, separated by a `border-black/10` border-top

Footer border-top: `border-black/10`
Link color: `#737373`, hover: `hover:opacity-60`
Column heading: `text-xs font-bold uppercase tracking-widest`, color `#000000`

### 5e. Section Header Pattern

Every section that introduces a grid or list uses this three-element header:

```tsx
<p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5"
   style={{ color: "#737373" }}>
  Eyebrow Label
</p>
<h2 className="text-4xl font-bold tracking-tight text-black">
  Primary Heading.
</h2>
// optional:
<p className="text-lg max-w-xl leading-relaxed mt-3 text-neutral-500">
  Supporting subtext.
</p>
```

### 5f. Status Chips & Badges

**Status badge (monochrome)**
```tsx
<span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-black text-white">
  Paid
</span>
```

Badge variants:
- `paid`: `bg-black text-white`
- `sent`: `bg-neutral-800 text-white`
- `draft`: `bg-neutral-100 text-neutral-700`
- `overdue`: `bg-neutral-800 text-white`
- `active`: `bg-black text-white`
- `disabled`: `bg-neutral-800 text-white`

All badges are square (`rounded-none`). No green, blue, or red color coding.

**In-development badge**
```tsx
<span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold border"
      style={{ backgroundColor: "#00000008", borderColor: "#00000015", color: "#737373" }}>
  <span className="w-1 h-1 animate-pulse bg-neutral-500" />
  In development
</span>
```

---

## 6. Backgrounds & Texture

### Dot-Grid Pattern

Applied to sections and cards. Creates a subtle spatial rhythm.

```tsx
<div className="absolute inset-0 bg-dot-matrix opacity-30 pointer-events-none" />
```

Defined in CSS:
```css
.bg-dot-matrix {
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
  background-size: 12px 12px;
}
```

- Dot color: `rgba(0,0,0,0.08)` (black at 8% opacity)
- Dot size: `1px`
- Grid size: `12px × 12px`
- Always `pointer-events-none` and `absolute inset-0`

### Receipt Textures

```css
.receipt-texture {
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 8px 8px;
}

.paper-texture {
  position: relative;
}
.paper-texture::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,...");
  mix-blend-mode: multiply;
  opacity: 0.025;
  pointer-events: none;
}
```

### Dashed Lines

Used as horizontal rules in receipt-style layouts:

```css
.hr-dashed {
  border: none;
  height: 1px;
  background: repeating-linear-gradient(90deg, #000000 0px, #000000 4px, transparent 4px, transparent 8px);
  opacity: 0.3;
}
```

---

## 7. Dark CTA Blocks

The standard full-width CTA section used at the bottom of pages:

```tsx
<div className="relative border border-black overflow-hidden px-10 py-16 text-center bg-black">
  <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />
  <div className="relative">
    <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-4 text-neutral-500">
      Eyebrow
    </p>
    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
      Main headline.
      <br />
      <span className="text-outline text-white">Outlined line.</span>
    </h2>
    <p className="text-base mb-10 max-w-lg mx-auto leading-relaxed text-neutral-500">
      Supporting copy.
    </p>
    {/* CTA button — white on dark bg */}
  </div>
</div>
```

**Outlined / stroke headline technique** — used for display headings to create visual tension:

```tsx
<h1>
  Solid line.{" "}
  <span className="text-outline text-black">
    Outlined line.
  </span>
</h1>
```

- Stroke width: `2px` for all sizes
- Stroke color: `currentColor` (inherits from text color)
- The outlined span is always the second or third line, never the first

---

## 8. Animation System

Animations are defined in `src/index.css` and applied via utility classes. All animations use `both` fill mode so elements start invisible and remain in their final state.

### Keyframes

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-16px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes printLine {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes receiptUnroll {
  from { opacity: 0; transform: translateY(-20px) scaleY(0.95); }
  to { opacity: 1; transform: translateY(0) scaleY(1); }
}
```

### Utility Classes

| Class | Keyframe | Duration | Easing |
|---|---|---|---|
| `.animate-fade-up` | `fadeUp` | `0.65s` | `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out spring) |
| `.animate-fade-in` | `fadeIn` | `0.5s` | `ease` |
| `.animate-slide-left` | `slideInLeft` | `0.55s` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `.animate-print-line` | `printLine` | `1s` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `.animate-receipt-unroll` | `receiptUnroll` | `0.6s` | `cubic-bezier(0.22, 1, 0.36, 1)` |

### Stagger Pattern

Apply staggered `animation-delay` via inline styles:

```tsx
// Hero elements — tight stagger
style={{ animationDelay: "0.05s" }}  // eyebrow
style={{ animationDelay: "0.12s" }}  // headline
style={{ animationDelay: "0.22s" }}  // subtext
style={{ animationDelay: "0.32s" }}  // CTAs

// Grid cards — sequential reveal
style={{ animationDelay: `${0.1 + index * 0.1}s` }}
```

### Hover Micro-Interactions

| Element | Hover effect |
|---|---|
| Card | `hover:shadow-lg` (subtle shadow, no lift) |
| List row | `hover:bg-black/[0.02]` (barely perceptible tint) |
| Solid button | `hover:bg-black/90` |
| Outline button | `hover:bg-black hover:text-white` |
| Ghost button | `hover:bg-black hover:text-white` |
| Text link with arrow | Arrow translates `+0.5px` on `group-hover` |
| Nav links | `hover:opacity-60` (text) or pill highlight (active) |

All card transitions use `transition-all duration-300`.

---

## 9. Icons

We use **Lucide React** icons throughout. All icons are stroke-based (no fill), consistent with the typographic style.

### Rules

- Default icon size: `16px` (w-4 h-4)
- Always `stroke="currentColor"` unless a specific brand color is required
- `strokeWidth` ranges: `1.5` (small), `2` (standard)
- Use `strokeLinecap="round" strokeLinejoin="round"` for inline SVGs
- Never use icon libraries that render with fill — maintain stroke consistency

---

## 10. Page Templates

### 10a. Standard Public Page

Every public page follows this anatomy:

```
[Nav — inherited from _guest.tsx layout]

<section>  ← Hero
  dot-grid background
  max-w-7xl container
    breadcrumb (interior pages only)
    eyebrow pill (monospace)
    H1 display headline (with optional stroke span)
    subtext paragraph
    CTA button row (square buttons)
    supporting chips (landing page only)
</section>

<section>  ← Primary content
  max-w-7xl container
    section header (monospace eyebrow + H2)
    grid of cards / list of items
    coming-soon strip (if applicable)
</section>

<section>  ← Dark CTA block
  max-w-7xl container
    border border-black bg-black
      dot-grid texture
      eyebrow + headline + subtext + button
</section>

[Footer — inherited from _guest.tsx layout]
```

### 10b. Legal / Prose Page

Used for Privacy Policy and Terms of Service:

```
[Nav]

<section>  ← Hero (narrower, max-w-4xl)
  dot-grid background
  breadcrumb
  eyebrow pill
  H1 title
  effective date
  summary paragraph
</section>

<section>  ← Body (max-w-4xl)
  Table of contents card (border border-black/10, white)
  Main content card (border border-black/10, white)
    per section: H2 + prose (P, H3, Ul)
  Bottom note / related links
</section>

[Footer]
```

### 10c. Authenticated Dashboard

```
[Sidebar — dark #171717, white text]

<main>
  header (sticky, breadcrumb + title)
  content area
    stats cards (square, black border, monochrome icons)
    charts (monochrome: black bars, grayscale pie)
    tables (square headers, black borders, monospace labels)
    forms (square cards, black borders, monospace inputs)
</main>
```

---

## 11. Reusable Code Snippets

### Card Shell

```tsx
<div className="bg-white border border-black/10 p-6">
  {/* content */}
</div>
```

### Section Header

```tsx
<div className="mb-12">
  <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5 text-neutral-500">
    Eyebrow
  </p>
  <h2 className="text-4xl font-bold tracking-tight text-black">
    Section heading.
  </h2>
</div>
```

### Solid Button (Square)

```tsx
<button className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-black transition-all hover:bg-black/90 active:scale-95">
  Label <ArrowRight />
</button>
```

### Outline Button (Square)

```tsx
<button className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold border-2 border-black text-black transition-all hover:bg-black hover:text-white active:scale-95">
  Label
</button>
```

### Dot-Grid Background

```tsx
<div className="absolute inset-0 bg-dot-matrix opacity-30 pointer-events-none" />
```

### Receipt Card

```tsx
<div className="relative bg-white border border-black/10 p-6 receipt-top receipt-bottom receipt-tear paper-texture">
  {/* content */}
</div>
```

### Status Badge

```tsx
<span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-black text-white">
  Paid
</span>
```

### Table Header Row

```tsx
<div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-black/10 text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-500">
  <div className="col-span-3">Column</div>
  <div className="col-span-2">Column</div>
  <div className="col-span-3">Column</div>
  <div className="col-span-2">Column</div>
  <div className="col-span-2 text-right"></div>
</div>
```

### Dark CTA Block

```tsx
<div className="relative border border-black overflow-hidden px-10 py-16 text-center bg-black">
  <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />
  <div className="relative">
    {/* eyebrow, headline, subtext, button */}
  </div>
</div>
```

---

*This document should be updated whenever a new pattern is introduced to the codebase. Keep it current — it is the single source of truth for ACorp's visual language.*
