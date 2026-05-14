# Clearmind — Design Guidelines

Source: `clearmind-v4.html` (landing prototype). Use this as the single reference when building pages one by one.

## Brand & voice

- **Positioning:** Institutional, SEBI-regulated, quant-driven wealth management — confident but not flashy.
- **Tone:** Precise, transparent, investor-first. Short labels; compliance-friendly where needed.
- **Visual metaphor:** Dark “terminal / private bank” base with **one** accent — **profit green** (positive / up) — used sparingly for emphasis, live states, and highlights — never rainbow UI.

## Color system

| Role | Token | Hex / value | Usage |
|------|--------|-------------|--------|
| Base ink | `--ink` | `#08090b` | Page background, logo mark inner |
| Elevated | `--ink2` | `#0d0f12` | Alternate sections, marquee, CTA band |
| Surface step | `--ink3` | `#111316` | Nested panels, table header/footer |
| Card / panel | `--s1`–`--s3` | `#171a1e` → `#21252b` | Cards, inputs, icon wells |
| Lines | `--ln`, `--ln2`, `--ln3` | White 5.5% / 10% / 16% | Dividers, borders, hairlines |
| Text primary | `--w1` | `#f2f3f5` | Headings, strong |
| Text body | `--w2` | `#c8cbd2` | Body, secondary UI |
| Text tertiary | `--w3` | `#9299a8` | Supporting copy, links idle (~7:1 on ink) |
| Text muted | `--w4` | `#6b7280` | Eyebrows, labels, table headers (~4.1:1 on ink) |
| **Accent** | `--g` | `#22c55e` | Profit / positive green — badges, role labels, emphasis, live dot |
| Accent wash | `--gd` | `rgba(34,197,94,0.12)` | Badge backgrounds, highlighted callout borders |

**Rules**

- Do not introduce second accent colors for marketing UI.
- Primary CTA = **light fill** (`--w1` on `--ink`), not green fills.
- Profit green appears in: small dots, tier/role text, gradient top borders on hero cards, optional border on “highlight” panels.

## Typography

| Use | Family | Weights | Notes |
|-----|--------|---------|--------|
| Display / section titles | **Playfair Display** | 600–700 | `h1`–`h2`, product names, stat numbers, fee figures |
| UI & body | **Inter** | 300–800 | Nav, body, labels, forms — superior number rendering, tabular figures, industry standard for finance |
| Load fonts | `next/font/google` | `Inter: 300–800`, `Playfair Display: 400 italic, 600–700` | Self-hosted via next/font for perf |

**Scale (rem-based — respects user browser font-size preferences)**

All font sizes use `rem` units (or `clamp()` with rem values for responsive headings) so text scales with the user's root font-size setting (WCAG accessibility best practice). Use design tokens exclusively — never hardcode `px` for font-size.

| Token | rem | ~px at 16px root | Usage |
|-------|-----|-------------------|-------|
| `--cm-text-2xs` | 0.625rem | 10px | Logo tagline only |
| `--cm-text-xs` | 0.6875rem | 11px | Tier labels, smallest UI |
| `--cm-text-xs-lg` | 0.75rem | 12px | Eyebrows, marquee, overlines, footer fine print |
| `--cm-text-sm` | 0.8125rem | 13px | Captions, meta, social icons, avatar labels |
| `--cm-text-sm-body` | 0.875rem | 14px | Nav items, card descriptions, small buttons |
| `--cm-text-base` | 0.9375rem | 15px | Buttons, subheadings, form labels |
| `--cm-text-body` | 1rem | 16px | Body copy default |
| `--cm-text-body-lg` | 1.125rem | 18px | Lead paragraphs |
| `--cm-text-h4` | 1.0625rem | 17px | Card titles, feature headings |
| `--cm-text-h3-ui` | 1.25rem | 20px | Section h3 |
| `--cm-text-h3-card` | 1.5rem | 24px | Product card titles |
| `--cm-text-stat` | 2.25rem | 36px | Hero stat numbers |

- `h1`: `clamp(2.5rem, 5.5vw, 4.625rem)`, Playfair 700, letter-spacing `-0.025em`, line-height ~1.12
- `h2`: `clamp(1.75rem, 3.2vw, 3rem)`, Playfair 600
- **Rule:** Never use raw `px` for `font-size`. Always reference a `--cm-text-*` token or rem-based `clamp()`.

**Emphasis:** Use `<em>` for italic accent phrases in hero display; color often `--w3` for softer emphasis inside headlines.

## Layout

- **Max content width:** `1120px`, horizontal padding `44px` (desktop); `20px` below ~940px.
- **Section vertical rhythm:** `96px` padding top/bottom (desktop); `64px` on small screens.
- **Grids:** Product cards `14px` gap; 3-column grids collapse to 1 column under 940px.
- **Nav:** Fixed, `60px` height, below-content scroll; glass: `rgba(8,9,11,0.94)` + blur ~22px.

## Components (patterns to reuse)

1. **Eyebrow** — Label + optional 16×1px line; muted uppercase.
2. **Primary button** — White fill, dark text, 8px radius, 14px semibold, hover ~opacity 0.88.
3. **Secondary button** — Ghost: border `--ln2`, text `--w3`, hover to `--w1` / stronger border.
4. **Nav CTA** — Slightly smaller radius (7px) than hero buttons.
5. **Pill / tag** — Hero pill: full radius, border, subtle fill; product badge: profit-green border + `--gd` fill + blinking dot.
6. **Cards** — `--s1` fill, `1px` `--ln` or `--ln2`, radius **12px** (standard) or **16px** (featured split card).
7. **Featured product (PMS)** — Top gradient line (profit green–white–profit green), two-column split; right column darker `--ink3`.
8. **Stat row** — Top border, 4 columns; Playfair numbers, small caps labels.
9. **Marquee** — Uppercase micro text, dot separators, slow infinite scroll.
10. **Feature grid** — 1px gap “grid lines” using border + `--ln` trick; cells `--s1`, hover `--s2`.
11. **FAQ** — Full-width row, circular + control, open state inverts to white circle.
12. **Forms** — Labels uppercase micro; inputs `--s1`, 8px radius, focus border step `--ln2`.
13. **Footer** — Multi-column; SEBI block in nested panel; disclaimer in bordered box.

## Motion

- **Scroll reveal:** Elements start `opacity: 0`, `translateY(18px)`; class `V` on intersect; duration ~0.6s ease; stagger classes `d1`–`d4` (~80ms steps).
- **Micro-interactions:** Link color 0.18s; card border/background 0.2s; CTA opacity hover.
- **Live / pulse:** Profit-green dot `blink` keyframes ~2–2.4s (opacity + scale).
- **Marquee:** Linear infinite ~30s.

## Imagery & decoration

- **Hero:** Subtle square grid (80px), radial mask; soft profit-green radial glow top-right (low opacity).
- **CTA section:** Centered profit-green radial glow behind copy.
- **Icons:** Emoji in rounded square wells (44px) for feature grid; SVG chevrons for links (stroke 1.4, round caps).

## Logo

- Hex mark + wordmark: **Inter** 800 for name, 10px muted tagline “Invest Better”, tight negative tracking on name.

## Accessibility & quality bar

- Maintain contrast: text on `--ink` uses `--w1`–`w2` for body; `--w4` only for non-essential labels.
- Focus states: extend prototype’s input focus (border brighten) to all interactive elements in production.
- Prefer semantic headings in order per page; one `h1` per view.

## External references (prototype)

- Booking: `https://cal.com/iamclearmind/talk`
- Smallcase: `https://iamclearmind.smallcase.com`
- Email: `admin@iamclearmind.com`

---

When adding new pages, rely on **`src/styles/tokens.css`** (pulled in via `src/styles/globals.css`) and match component classes or re-map tokens to your framework (Tailwind, CSS modules, etc.) using the same values.
