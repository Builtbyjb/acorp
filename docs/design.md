# ACorp Design Language

This document defines the design language used across all ACorp products and surfaces. Its purpose is to ensure visual and experiential consistency whether you are building a new product, a marketing page, or an internal tool. Every decision here has a reason — read the rationale alongside the spec.

---

## 1. Philosophy

**Name:** Precision Craft

**What it means:** Clean, architectural, editorial. Every element earns its place. Nothing decorative for decoration's sake — but nothing sterile or cold either. The aesthetic signals that the people who built this care deeply about the work.

**How it should feel:** Opening an ACorp product should feel like picking up a well-made tool. Immediate confidence. No learning curve to appreciate the quality. Calm, not exciting.

**What to avoid:**
- Purple-gradient-on-white "AI startup" aesthetics
- Excessive drop shadows or heavy skeuomorphism
- Cluttered layouts or dense information hierarchies
- Animations that call attention to themselves rather than the content
- Color used for decoration rather than communication

---

## 2. Color System

### Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Dominant | Cloud | `#ebf0f0` | Page backgrounds, section fills |
| Secondary | Slate | `#7F8CAA` | Secondary text, borders, muted UI chrome |
| Accent | Cobalt | `#4382df` | CTAs, links, active states, key highlights |
| Ink | Near-black | `#0f172a` | Primary headings, body text on light backgrounds |
| Surface | White | `#ffffff` | Card backgrounds |
| Dark surface | Deep ink | `#0f172a` | Dark CTA sections, inverted blocks |

### 60 / 30 / 10 Rule

| Proportion | Color | Where |
|---|---|---|
| 60% | Cloud `#ebf0f0` | Page background, hero fills, section spacers |
| 30% | Slate `#7F8CAA` | Body copy, labels, borders, nav chrome, footer text |
| 10% | Cobalt `#4382df` | Buttons, active indicators, links, accent dots, key icons |

### Opacity Variants

These are the standard opacity suffixes used throughout the codebase via hex alpha:

| Purpose | Value |
|---|---|
| Subtle border | `#7F8CAA20` – `#7F8CAA28` |
| Light background tint | `#7F8CAA14` – `#7F8CAA18` |
| Active nav pill fill | `#7F8CAA18` |
| Accent tint background | `#4382df0e` – `#4382df14` |
| Accent border | `#4382df2e` – `#4382df50` |
| Ambient glow | `#4382df10` – `#4382df35` |
| Card ring shadow | `#0f172a06` – `#0f172a0c` |

### Dark Surfaces

When a section needs high visual contrast (e.g. a CTA at the bottom of a page), use `#0f172a` as the background. Layer two transparency effects on top:

1. **Radial glow** — `#4382df20` at ~25% horizontal, `#7F8CAA18` at ~80% horizontal
2. **Grid overlay** — `1px` lines at `48px` spacing using `#4382df0e`, opacity `0.20`

This creates depth without introducing additional colors.

---

## 3. Typography

### Typeface

**Geist Variable** — loaded via `@fontsource-variable/geist`. Variable font; use `font-weight` freely within 100–900 range. Applied globally as `font-sans` and `font-heading`.

```css
@import "@fontsource-variable/geist";
```

### Heading Scale

Use fluid `clamp()` values for page-level headings so they respond to viewport without breakpoint hacks:

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
| Body / description | `0.875rem` / `text-sm` | 400 | `#7F8CAA` or `#4a5568` | Card descriptions, prose |
| Label / tagline | `0.875rem` / `text-sm` | 500 (`medium`) | `#7F8CAA` | Card taglines, secondary labels |
| Eyebrow | `0.75rem` / `text-xs` | 700 (`bold`) | `#7F8CAA` | Section labels above headings |
| Button | `0.875rem` / `text-sm` | 600 (`semibold`) | varies | All buttons |
| Caption / meta | `0.75rem` / `text-xs` | 400–500 | `#7F8CAA` | Footer copy, timestamps, legal notes |

### Eyebrow Pattern

Every major section begins with a small, uppercase eyebrow label to orient the reader:

```tsx
<p className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
   style={{ color: "#7F8CAA" }}>
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
| Card internal padding | `p-7` (1.75rem) or `p-10` (2.5rem) for full-width cards |
| Legal section padding | `px-8 md:px-12 py-10` |

### Grid

Product cards: `grid grid-cols-1 md:grid-cols-3 gap-5`
Feature/capability cards: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
Process steps: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`
Full-width stacked cards: `flex flex-col gap-5`

---

## 5. Component Patterns

### 5a. Buttons

All buttons use `rounded-full`. There are three variants:

**Solid (primary CTA)**
```tsx
<button
  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:opacity-92 active:scale-95"
  style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
>
  Label <ArrowRight />
</button>
```

**Outline (secondary CTA)**
```tsx
<button
  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
  style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
>
  Label
</button>
```

**Outline accent (tertiary, used on cards or banners)**
```tsx
<button
  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white active:scale-95"
  style={{ color: "#4382df", borderColor: "#4382df50" }}
>
  Label <ArrowRight />
</button>
```

**Rules:**
- Hover state: reduce opacity (`hover:opacity-92`) or increase gap (`hover:gap-3`) — never change background color
- Active state: always `active:scale-95` — provides tactile press feedback
- Solid buttons always carry a colored box-shadow matching the button color at 30–35% opacity
- Never use `rounded-xl` or `rounded-lg` for buttons — always `rounded-full`

### 5b. Cards

**Standard white card**
```tsx
<div
  className="bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
  style={{ boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07" }}
>
```

- Background: always white (`#ffffff`)
- Radius: always `rounded-3xl`
- Shadow: two-layer — a soft drop shadow + a hairline ring (`0 0 0 1px`)
- Hover: lift `-translate-y-1.5` + `shadow-xl`
- **No color hints**: do not add colored borders, accent bars, or colored text to signal which product a card belongs to. Typography hierarchy carries the identity.

**Coming-soon / placeholder card**
```tsx
<div
  className="rounded-3xl border-2 border-dashed px-7 py-5"
  style={{ borderColor: "#7F8CAA2a" }}
>
```

**Feature / capability card (lighter variant)**
Same as standard but with `hover:-translate-y-1 hover:shadow-lg` (smaller lift).

**Full-width detail card (products page)**
```tsx
<div
  className="bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl"
  style={{ boxShadow: "0 1px 4px #0f172a0a, 0 0 0 1px #0f172a06" }}
>
```

### 5c. Navigation

The global nav is a sticky frosted-glass header:

```tsx
<header
  className="sticky top-0 z-50 border-b backdrop-blur-md"
  style={{ backgroundColor: "#ebf0f0e8", borderColor: "#7F8CAA22" }}
>
  <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
```

- Height: `h-16` (4rem)
- Background: `#ebf0f0e8` — dominant color at ~91% opacity with `backdrop-blur-md`
- Border: `#7F8CAA22` — very subtle separator

**Wordmark:**
```tsx
<div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black"
     style={{ backgroundColor: "#4382df" }}>
  A
</div>
<span className="font-bold text-lg tracking-tight" style={{ color: "#0f172a" }}>Corp</span>
```

**Active nav link pill:**
```tsx
<Link className="relative px-3 py-1.5 text-sm font-medium rounded-full">
  {active && <span className="absolute inset-0 rounded-full" style={{ backgroundColor: "#7F8CAA18" }} />}
  <span className="relative">{label}</span>
</Link>
```

Active links use `color: #0f172a`; inactive use `color: #7F8CAA`.

### 5d. Footer

Two-row structure:
1. **Main row** — brand block (wordmark + tagline) on the left; link columns on the right
2. **Bottom bar** — copyright on the left; legal links on the right, separated by a `#7F8CAA18` border-top

Footer border-top: `borderColor: "#7F8CAA20"`
Link color: `#7F8CAA`, hover: `hover:opacity-60`
Column heading: `text-xs font-bold uppercase tracking-widest`, color `#0f172a`

### 5e. Section Header Pattern

Every section that introduces a grid or list uses this three-element header:

```tsx
<p className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5" style={{ color: "#7F8CAA" }}>
  Eyebrow Label
</p>
<h2 className="text-4xl font-bold tracking-tight" style={{ color: "#0f172a" }}>
  Primary Heading.
</h2>
// optional:
<p className="text-lg max-w-xl leading-relaxed mt-3" style={{ color: "#7F8CAA" }}>
  Supporting subtext.
</p>
```

### 5f. Status Chips & Badges

**Pill chip (used in hero / status rows)**
```tsx
<span
  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border"
  style={{ backgroundColor: "#ffffff90", borderColor: "#7F8CAA25", color: "#7F8CAA" }}
>
  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4382df" }} />
  Label text
</span>
```

**In-development badge**
```tsx
<span
  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border"
  style={{ backgroundColor: "#7F8CAA10", borderColor: "#7F8CAA28", color: "#7F8CAA" }}
>
  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#7F8CAA" }} />
  In development
</span>
```

**Eyebrow pill (hero sections)**
```tsx
<div
  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.18em] uppercase"
  style={{ backgroundColor: "#ffffff70", borderColor: "#7F8CAA28", color: "#7F8CAA" }}
>
  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4382df" }} />
  Label
</div>
```

---

## 6. Backgrounds & Texture

Three layered background techniques are used to create depth without photos or illustrations.

### Dot-Grid Pattern

Applied to hero sections and legal page headers. Creates a subtle spatial rhythm.

```tsx
<div
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage: "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
    backgroundSize: "28px 28px",
  }}
/>
```

- Dot color: `#7F8CAA22` (Slate at ~13% opacity)
- Dot size: `1.5px`
- Grid size: `28px × 28px`
- Always `pointer-events-none` and `absolute inset-0`

### Ambient Glow Blobs

Large blurred circles that create soft color warmth in the background. Use one or two per hero:

```tsx
// Cobalt glow — top right
<div
  className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
  style={{ backgroundColor: "#4382df10" }}
/>

// Slate glow — bottom left
<div
  className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none"
  style={{ backgroundColor: "#7F8CAA14" }}
/>
```

- Primary glow (Cobalt): opacity `0e` – `14` (hex)
- Secondary glow (Slate): opacity `12` – `18`
- Size: 400–600px, always `rounded-full` + `blur-3xl`
- Position: top-right for primary, bottom-left or bottom-center for secondary

### Dark Section Grid Overlay

Used exclusively inside dark (`#0f172a`) CTA blocks:

```tsx
<div
  className="absolute inset-0 pointer-events-none opacity-20"
  style={{
    backgroundImage:
      "linear-gradient(#4382df0e 1px, transparent 1px), linear-gradient(90deg, #4382df0e 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  }}
/>
```

Always stack this above the radial glow layer, both `absolute inset-0 pointer-events-none`.

---

## 7. Dark CTA Blocks

The standard full-width CTA section used at the bottom of most pages:

```tsx
<div
  className="relative rounded-3xl overflow-hidden px-10 py-20 text-center"
  style={{ backgroundColor: "#0f172a" }}
>
  {/* Glow layer */}
  <div className="absolute inset-0 pointer-events-none" style={{
    backgroundImage:
      "radial-gradient(ellipse at 25% 60%, #4382df20 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, #7F8CAA18 0%, transparent 50%)",
  }} />
  {/* Grid layer */}
  <div className="absolute inset-0 pointer-events-none opacity-20" style={{
    backgroundImage:
      "linear-gradient(#4382df0e 1px, transparent 1px), linear-gradient(90deg, #4382df0e 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  }} />

  <div className="relative">
    <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "#4382df" }}>
      Eyebrow
    </p>
    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
      Main headline.
      <br />
      <span style={{ color: "#7F8CAA" }}>Secondary line.</span>
    </h2>
    <p className="text-base mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: "#7F8CAA" }}>
      Supporting copy.
    </p>
    {/* CTA button — same solid style but on dark bg */}
  </div>
</div>
```

**Outlined / stroke headline technique** — used for the display heading on hero sections to create visual tension between a solid and an outlined word:

```tsx
<h1>
  Solid line.{" "}
  <span style={{ WebkitTextStroke: "2.5px #4382df", color: "transparent" }}>
    Outlined line.
  </span>
</h1>
```

- Stroke width: `2.5px` for display sizes (`7rem+`), `2px` for page title sizes (`4–5rem`)
- Stroke color: always Cobalt `#4382df`
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
```

### Utility Classes

| Class | Keyframe | Duration | Easing |
|---|---|---|---|
| `.animate-fade-up` | `fadeUp` | `0.65s` | `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out spring) |
| `.animate-fade-in` | `fadeIn` | `0.5s` | `ease` |
| `.animate-slide-left` | `slideInLeft` | `0.55s` | `cubic-bezier(0.22, 1, 0.36, 1)` |

### Stagger Pattern

Apply staggered `animation-delay` via inline styles. Standard delay increments:

```tsx
// Hero elements — tight stagger
style={{ animationDelay: "0.05s" }}  // eyebrow
style={{ animationDelay: "0.12s" }}  // headline
style={{ animationDelay: "0.22s" }}  // subtext
style={{ animationDelay: "0.32s" }}  // CTAs
style={{ animationDelay: "0.48s" }}  // supporting chips/details

// Grid cards — sequential reveal
style={{ animationDelay: `${0.1 + index * 0.1}s` }}   // tight (cards)
style={{ animationDelay: `${0.05 + index * 0.07}s` }}  // faster (small cards)
style={{ animationDelay: `${0.08 + index * 0.1}s` }}   // process steps
```

### Hover Micro-Interactions

| Element | Hover effect |
|---|---|
| Card | `hover:-translate-y-1.5 hover:shadow-xl duration-300` |
| Small card | `hover:-translate-y-1 hover:shadow-lg duration-300` |
| Solid button | `hover:opacity-92` + widening icon gap `hover:gap-3` |
| Outline button | `hover:bg-white/60` |
| Text link with arrow | Arrow translates `+0.5px` on `group-hover` |
| Wordmark icon | `group-hover:scale-95` |
| Nav links | `hover:opacity-60` (text) or pill highlight (active) |

All card transitions use `transition-all duration-300`.

---

## 9. Icons

We use inline SVG icons drawn with stroke (no fill). This keeps them consistent with the typographic style and scalable to any size.

### Arrow Icon (standard)

The most common icon in the codebase — used on all directional CTAs:

```tsx
function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}
```

### Checkmark Icon (used in "why us" lists)

```tsx
<svg width="10" height="10" viewBox="0 0 10 10"
     fill="none" stroke="#4382df" strokeWidth="1.8"
     strokeLinecap="round" strokeLinejoin="round">
  <path d="M2 5l2.5 2.5L8 2.5" />
</svg>
```

### Rules

- Default icon size: `14px`
- Always `stroke="currentColor"` unless a specific brand color is required
- `strokeWidth` ranges: `1.8` (small, 10px), `2` (standard, 14px)
- Always `strokeLinecap="round" strokeLinejoin="round"`
- Never use icon libraries that render with fill — maintain stroke consistency

---

## 10. Page Templates

### 10a. Standard Public Page

Every public page follows this anatomy:

```
[Nav — inherited from _guest.tsx layout]

<section>  ← Hero
  dot-grid background
  ambient glow blobs
  max-w-7xl container
    breadcrumb (interior pages only)
    eyebrow pill
    H1 display headline (with optional stroke span)
    subtext paragraph
    CTA button row
    supporting chips (landing page only)
</section>

<section>  ← Primary content
  max-w-7xl container
    section header (eyebrow + H2)
    grid of cards / list of items
    coming-soon strip (if applicable)
</section>

<section>  ← Dark CTA block
  max-w-7xl container
    rounded-3xl dark card
      glow + grid layers
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
  Table of contents card (rounded-3xl, white/80)
  Main content card (rounded-3xl, white, single card with dividers)
    per section: H2 + prose (P, H3, Ul)
  Bottom note / related links
</section>

[Footer]
```

---

## 11. Reusable Code Snippets

Copy-paste building blocks for new pages and products.

### Card Shell

```tsx
<div
  className="bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
  style={{ boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07" }}
>
  {/* content */}
</div>
```

### Section Header

```tsx
<div className="mb-12">
  <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5" style={{ color: "#7F8CAA" }}>
    Eyebrow
  </p>
  <h2 className="text-4xl font-bold tracking-tight" style={{ color: "#0f172a" }}>
    Section heading.
  </h2>
</div>
```

### Solid Button (Pill)

```tsx
<button
  className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95"
  style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
>
  Label <ArrowRight />
</button>
```

### Outline Button (Pill)

```tsx
<button
  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
  style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
>
  Label
</button>
```

### Dot-Grid Background

```tsx
<div
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage: "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
    backgroundSize: "28px 28px",
  }}
/>
```

### Ambient Glow Blob

```tsx
<div
  className="absolute -top-48 -right-48 w-[560px] h-[560px] rounded-full blur-3xl pointer-events-none"
  style={{ backgroundColor: "#4382df10" }}
/>
```

### Dark CTA Block

```tsx
<div
  className="relative rounded-3xl overflow-hidden px-10 py-20 text-center"
  style={{ backgroundColor: "#0f172a" }}
>
  <div className="absolute inset-0 pointer-events-none" style={{
    backgroundImage:
      "radial-gradient(ellipse at 25% 60%, #4382df20 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, #7F8CAA18 0%, transparent 50%)",
  }} />
  <div className="absolute inset-0 pointer-events-none opacity-20" style={{
    backgroundImage:
      "linear-gradient(#4382df0e 1px, transparent 1px), linear-gradient(90deg, #4382df0e 1px, transparent 1px)",
    backgroundSize: "48px 48px",
  }} />
  <div className="relative">
    {/* eyebrow, headline, subtext, button */}
  </div>
</div>
```

### Staggered Card Grid (3-column)

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
  {items.map((item, i) => (
    <div
      key={item.id}
      className="animate-fade-up bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
      style={{
        boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
        animationDelay: `${0.1 + i * 0.1}s`,
      }}
    >
      {/* card content */}
    </div>
  ))}
</div>
```

### Eyebrow Pill

```tsx
<div
  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.18em] uppercase"
  style={{ backgroundColor: "#ffffff70", borderColor: "#7F8CAA28", color: "#7F8CAA" }}
>
  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4382df" }} />
  Label
</div>
```

---

*This document should be updated whenever a new pattern is introduced to the codebase. Keep it current — it is the single source of truth for ACorp's visual language.*
