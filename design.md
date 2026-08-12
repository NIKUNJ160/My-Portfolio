# Design System — nikunj-portfolio

> Living reference for the visual language of [nikunjpateliya.com](https://nikunjpateliya.com).
> Last updated: August 2026

---

## 1. Design Philosophy

**"Apex Dark Glassmorphism"** — deep-black canvases with luminous frosted-glass surfaces, neon accent glows, and ambient organic motion. Every surface whispers depth; nothing is flat.

### Guiding Principles

| # | Principle | How it manifests |
|---|---|---|
| 1 | **Depth over decoration** | Glass cards float above the canvas via layered `backdrop-filter`, inner highlights, and multi-stop shadows |
| 2 | **Motion with purpose** | Blob backgrounds + cursor-tracking light create life without distracting; all transitions use a single custom easing `cubic-bezier(0.16, 1, 0.3, 1)` |
| 3 | **Content emerges** | Skeleton shimmer → real data hydration; sections fade-in on scroll intersection — the page reveals itself |
| 4 | **One accent, many harmonics** | Emerald green `#10B981` is the primary accent; cyan and violet are supporting gradients that appear in blobs, never in UI chrome |

---

## 2. Color Palette

### Backgrounds
| Token | Value | Usage |
|---|---|---|
| `--bg-primary` | `#030304` | Page canvas |
| `--bg-secondary` | `#08080a` | Section alternate background |
| `--bg-card` | `rgba(22, 22, 26, 0.45)` | Legacy card fill |
| `--bg-glass` | `rgba(18, 18, 22, 0.42)` | Glass surface default |
| `--bg-glass-hover` | `rgba(26, 26, 32, 0.62)` | Glass surface on hover |

### Text
| Token | Value | Usage |
|---|---|---|
| `--text-primary` | `#FFFFFF` | Headings, names, CTAs |
| `--text-secondary` | `#A3A3BC` | Body copy, descriptions |
| `--text-muted` | `#64647C` | Labels, footnotes, timestamps |

### Accents
| Token | Value | Usage |
|---|---|---|
| `--accent-color` | `#10B981` (Emerald) | Primary interactive color — buttons, links, status pill, tag hovers |
| `--accent-blue` | `#06B6D4` (Cyan) | Gradient endpoint, blob tint |
| `--accent-purple` | `#8B5CF6` (Violet) | Blob-only, never used in UI elements |
| `--accent-pink` | `#EC4899` (Hot Pink) | Defined but unused — reserved |
| `--accent-gradient` | `135deg emerald → cyan` | Primary CTA button fill |

### Borders & Shadows
| Token | Value |
|---|---|
| `--border-glass` | `rgba(255, 255, 255, 0.07)` |
| `--border-glass-hover` | `rgba(16, 185, 129, 0.35)` |
| `--shadow-glass` | `0 16px 40px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.05)` |
| `--shadow-glass-hover` | `0 24px 60px rgba(0,0,0,0.6), 0 0 30px rgba(16,185,129,0.15), inset 0 1px 1px rgba(255,255,255,0.1)` |

---

## 3. Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Headings | Inter | 700–800 | `letter-spacing: -0.02em` to -0.03em; gradient fill on hero title |
| Body | Inter | 400–500 | `line-height: 1.6` (body), `1.7` (descriptions), `1.8` (about bio) |
| Monospace | JetBrains Mono | 400–500 | Tags, status pill, small labels |

### Fluid Scale (Hero)
```
font-size: clamp(3.5rem, 6.5vw, 6rem)  → desktop hero
font-size: 2.25rem                       → tablet (≤768px)
font-size: 1.85rem                       → phone (≤480px)
```

### Section Headings
All section `<h2>` headings use inline `font-size: 2.5rem` with `margin-bottom: 2rem` — no variation between sections. This is a known issue (see Weaknesses below).

---

## 4. Layout System

### Grid Container
- Max width: `1200px`, centered with `padding: 0 24px`
- Section vertical padding: `100px` (consistent across all sections)

### Bento Grid (Projects)
```css
grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
gap: 30px;
```

### Services Grid
```css
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 30px;
```

### About Grid
```css
grid-template-columns: 1fr 1fr;  → collapses to 1fr at ≤992px
gap: 4rem;
```

---

## 5. Component Library

### Navigation — Floating Capsule
- Fixed to `bottom: 2rem`, centered via `left: 50%; transform: translateX(-50%)`
- `border-radius: 99px` (perfect pill)
- Glass background `rgba(18, 18, 22, 0.65)` + `backdrop-filter: blur(24px) saturate(180%)`
- Contains: logo circle (36px), nav links, primary CTA pill button

### Status Pill
- Fixed `right: 2rem; top: 2rem`
- Mono font, emerald border glow, "● Open to Work"

### Progress Bar (Top Preloader)
- 3px height, gradient fill, fixed to viewport top
- Animates `width: 0% → 30% → 60% → 100%` during API data fetch
- Fades out on completion

### Glass Card (`.glass`)
```css
background: var(--bg-glass);
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid var(--border-glass);
box-shadow: var(--shadow-glass);
```

### Project Card
- Glass card + `border-radius: 24px`
- Thumbnail: `aspect-ratio: 16/10`, scales 1.04x on hover
- Card lifts `translateY(-8px) scale(1.015)` on hover
- Tags turn emerald on hover; title turns emerald on hover
- Arrow link shifts `translateX(4px)` on hover

### Skill Pill
- `border-radius: 99px`, near-transparent background
- On hover: lifts, scales 1.05x, emerald glow ring

### Button (`.btn`)
- Gradient fill (emerald → cyan), dark text, pill shape
- `::before` shimmer sweep on hover (left to right light band)
- Lifts `translateY(-3px) scale(1.02)` + intensified glow shadow

### Button Outline (`.btn-outline`)
- Transparent + glass border, white text
- Hover: slight white background increase, brighter border

---

## 6. Animation & Motion

| Animation | Duration | Easing | Trigger |
|---|---|---|---|
| Blob float (1, 2, 3) | 25–30s | `ease-in-out` alternate | Continuous CSS keyframes |
| Cursor blob tracking | per-frame | `lerp(0.06)` in rAF | Mousemove |
| Card hover lift | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` | `:hover` |
| Fade-in on scroll | 800ms | `cubic-bezier(0.16, 1, 0.3, 1)` | IntersectionObserver |
| Button shimmer sweep | 600ms | `ease-in-out` | `:hover` |
| Shimmer skeleton | 1600ms | `linear` infinite | While loading |
| Progress bar | 300ms | `ease` | Width transitions |

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
    .fade-in { transition: none; opacity: 1; transform: none; }
}
```

---

## 7. Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `≤992px` | About section collapses to single column |
| `≤768px` | Hero shrinks (2.25rem), hero buttons stack vertically, nav spacing tightens |
| `≤576px` | Contact form padding reduces |
| `≤480px` | Hero shrinks further (1.85rem), About/Services nav links hide |

---

## 8. Known Design Weaknesses

1. **No profile photo in hero** — text-only, no face/avatar
2. **No section visual hierarchy** — every section has identical weight/spacing
3. **Services section looks identical to Projects** — no differentiation
4. **Nav logo is 192 KB** for a 36px circle — oversized JPEG
5. **No active nav link state** on scroll
6. **Mobile nav hides links** (About, Services) instead of hamburger
7. **Bio text has no `max-width`** — uncomfortable line lengths on ultrawide
8. **Social links below contact form** — inverted CTA flow
9. **No favicon version cache-busting** — static CSS/JS paths
