# MyNella & Nella — Design system

Single source of truth for **color**, **typography**, **layout**, and **interaction** across this repo.  
Implementation lives in CSS Modules + `src/styles/tokens.css` + `src/lib/fonts.ts`; this document describes **intent** and **canonical values** so new work stays consistent and avoids generic “template” UI.

**Shorthand:** **“L”** = **landing page** (`/`). The full contract for that route is **Appendix L** below.

---

## 1. Product context

| Name | Role |
|------|------|
| **Nella** | Companion app (separate codebase). Calm, personal layer for visits, aftercare, and rhythm between appointments. |
| **MyNella** | Marketing site + waitlist + editorial home (`www.mynella.com` or equivalent). |

**Voice:** Warm, precise, never clinical jargon unless quoted; honest about pre-launch state.  
**Locale default:** `en-IN` in metadata; copy may reference India mobile format where forms require it.

---

## 2. Two visual surfaces (do not mix tokens blindly)

### 2.1 Surface A — **Nella landing** (`/`)

- **Scope:** `src/components/landing/*` only. Root wrapper applies **`--nl-*`** custom properties on `.root`.
- **Metaphor:** Editorial print — paper, ink, hairline rules, minimal chrome. Light mode only (`color-scheme: light`).
- **Do not:** Stack gradients on every block, pill “tag” rows, faux device frames, heavy card shadows, rainbow accents.

### 2.2 Surface B — **Inner marketing shell** (`/about`, `/contact`, `/terms`, `/privacy`, …)

- **Scope:** Global `src/styles/tokens.css` — **`--cm-*`** tokens. Dark shell tuned for long reading + forms.
- **Metaphor:** Restrained dark UI (legacy stack from the Clearmind-era template); primary UI text and surfaces use `--cm-text-*` / `--cm-surface-*`.
- **Caution:** `--cm-accent` is still **green** (`#22c55e`) from the old template. For **Nella-specific emphasis** on inner pages, prefer **warm gold** (`#c9a227` or similar) in **local** module overrides (see About) rather than spreading green as a second brand accent.

---

## 3. Color — Nella landing (`--nl-*`)

Defined on `.root` in `src/components/landing/nella-landing.module.css`. Use **only** these (or `color-mix` / opacity derived from them) on the landing.

| Token | Hex / value | Usage |
|--------|----------------|--------|
| `--nl-paper` | `#f4f1eb` | Page background |
| `--nl-paper-2` | `#ebe6dc` | Muted section fill (`sectionMuted`) |
| `--nl-ink` | `#1a1512` | Primary text, primary buttons, footer bar |
| `--nl-ink-soft` | `#3d342c` | Hero lead, secondary body emphasis |
| `--nl-muted` | `#6b625a` | Secondary text, nav idle |
| `--nl-rule` | `rgba(26, 21, 18, 0.12)` | Hairlines, borders, grid lines |
| `--nl-accent` | `#7a5c32` | Eyebrows, display accent, rules, pull-quote wash |
| `--nl-accent-soft` | `rgba(122, 92, 50, 0.14)` | Pull-quote background mix |

**Rules**

1. **Contrast:** Body text is ink on paper; links on dark bands use light ink (see `LandingWaitlistForm` `tone="dark"`).
2. **No second accent hue** on the landing (no purple, no bright green CTAs).
3. **Borders over blobs:** Prefer `1px solid var(--nl-rule)` over soft glows.

---

## 4. Color — Inner shell (`--cm-*`)

Canonical table in `src/styles/tokens.css` (`:root`). Highlights:

| Role | Token | Example |
|------|--------|---------|
| Page bg | `--cm-ink` | `#08090b` |
| Elevated surfaces | `--cm-surface-1` … `--cm-surface-3` | `#171a1e` → `#21252b` |
| Primary text | `--cm-text-primary` | `#f2f3f5` |
| Body / secondary | `--cm-text-secondary`, `--cm-text-tertiary` | See file |
| Legacy accent | `--cm-accent` | `#22c55e` — use sparingly; not Nella brand core |

**Rules**

1. New inner-page sections should use **existing** `--cm-*` variables, not raw hex, unless documenting a one-off here.
2. When inner pages are eventually **aligned** to Nella warm paper, do it as a **planned migration** (new token file or `:root` theme switch), not scattered hex.

---

## 5. Typography

### 5.1 Font loading (`src/lib/fonts.ts`)

| Export | CSS variable | Source | Weights | Where used |
|--------|----------------|--------|---------|------------|
| `fraunces` | `--font-fraunces` | Google Fraunces | 400, 600, 700 + italic | **Nella landing** display |
| `dmSans` | `--font-dm-sans` | Google DM Sans | 400–700 | **Nella landing** UI + body |
| `playfair` | `--font-playfair` | Google Playfair | 400, 600, 700 + italic | **Root layout** / inner pages (via `--cm-font-display`) |
| `inter` | `--font-inter` | Google Inter | 400–800 | **Root layout** / inner pages (via `--cm-font-ui`) |

Root `src/app/layout.tsx` applies **`inter` + `playfair`** to the document for inner routes and shared chrome.  
`NellaLanding` applies **`fraunces` + `dmSans`** on its own root for `/` only.

### 5.2 Nella landing type rules

| Element | Family | Notes |
|---------|--------|--------|
| Wordmark “Nella” (`em` in brand link) | Fraunces italic | Accent color `--nl-accent` |
| H1, section H2, quote, FAQ questions | Fraunces | Weight 600; tight tracking |
| Body, nav, buttons, form labels | DM Sans | Weight 400–600 |
| Eyebrow | DM Sans | Uppercase, `letter-spacing: 0.22em`, size ~`0.6875rem`, color `--nl-accent` |
| Hero lead | DM Sans | Slightly larger than body (`~1.0625rem`), color `--nl-ink-soft` |

**Measure:** `--nl-measure` = `38rem` max for comfortable reading; `--nl-max` = `56rem` for overall content width.

### 5.3 Inner shell type rules (`--cm-*`)

Mapped in `tokens.css`: `--cm-font-display` → Playfair, `--cm-font-ui` → Inter. Use the **`--cm-text-*`** scale for sizes (`--cm-text-body`, `--cm-text-sm-body`, etc.).

---

## 6. Radius, elevation, motion

### Nella landing

| Pattern | Value | Notes |
|---------|--------|--------|
| Default radius | **2px** | Buttons, inputs, skip link — reads editorial, not “app store” |
| Cards / flow | Hairline grid or **top border accent** | Avoid 16–20px radius + inner gradient on every tile |
| Motion | Hover = **opacity / border** only | No `translateY` on primary story blocks unless subtle and `prefers-reduced-motion` respected |

### Inner shell

Use `--cm-radius-*`, `--cm-duration-*`, `--cm-ease-*` from `tokens.css`. Glass nav uses `--cm-nav-bg` + `--cm-blur-nav` where Navbar applies it.

---

## 7. Layout & grid

### Landing

- Horizontal padding: `--nl-gutter` = `clamp(1.15rem, 4vw, 2rem)`.
- Content max: `--nl-max` = `56rem` centered.
- **Sticky header:** Thin bar, bottom border `--nl-rule`, background slightly transparent paper (`color-mix`).

### Inner pages

- Content max: `--cm-max-width` (1180px) with `--cm-page-gutter`.
- **Alignment:** Section copy left-aligned; reserve centering for narrow CTAs or stats only.

---

## 8. Components — where things live

| Area | Path |
|------|------|
| Nella landing shell | `src/components/landing/NellaLanding.tsx`, `nella-landing.module.css` |
| Waitlist forms | `src/components/landing/LandingWaitlistForm.tsx`, `landing-waitlist.module.css` |
| Tracked links / GA | `src/components/landing/TrackedLink.tsx`, `src/lib/gtag.ts` |
| Site chrome (inner) | `src/components/layout/Navbar.tsx`, `Footer.tsx`, `*.module.css` |
| Contact | `src/components/sections/ContactLanding.tsx`, `ContactForm.tsx`, `ContactPage.module.css` |
| Legal | `src/components/legal/LegalDocumentPage.tsx` |
| Buttons (inner) | `src/components/ui/Button.tsx`, `Button.module.css` |

---

## 9. Imagery & illustration

1. **No stock “happy team” grids** without real photography.
2. **No fake phone UI** as hero proof; prefer copy, timeline words, or **real** product shots when available.
3. **OG / share images:** `public/og/` + Sanity `seoOgImage`; keep aspect **1200×630**.

---

## 10. Accessibility

1. **Skip link** on landing (`Skip to content` → `#nl-main`).
2. **Focus:** Visible focus rings on interactive elements; landing waitlist uses high-contrast ring on fields.
3. **Forms:** Labels, `aria-describedby` for phone hints, honeypot hidden from AT.
4. **Color-scheme:** `light` on landing; `dark` on `:root` for inner shell — match `theme-color` in layout viewport meta where relevant.

---

## 11. Anti–“vibecoded” checklist (mandatory for new UI)

Before shipping a new block, confirm:

- [ ] No **purple / blue / pink gradient** hero unrelated to brand.
- [ ] No **three equal cards** with identical icon wells and lorem unless content truly warrants symmetry.
- [ ] No **Inter-only** stack on the Nella landing (use Fraunces + DM Sans there).
- [ ] No **pill forest** (more than one row of capsule tags above the fold).
- [ ] No **glassmorphism + neon** combo unless explicitly art-directed.
- [ ] **One** primary CTA per viewport region; secondary is outline or text.

---

## 12. CMS (Sanity) alignment

- **Landing hero / FAQ / meta:** `pageCopy` with `routeKey` `home`; optional `landingFaq` array.
- **Inner chrome:** `siteChrome`, `siteSettings`.
- **Contact:** `contactPage` + `pageCopy` `contact`.

Editors should **not** paste hex in Portable Text to “fix” color — request a token or schema field change.

---

## 13. Change control

1. Update **this file** when adding a new token or changing a canonical hex.
2. Update **`nella-landing.module.css`** / **`tokens.css`** in the same PR as DESIGN changes.
3. Run `npm run lint` and `npm run build` before merge.

---

## Appendix A — Token quick reference (copy-paste)

**Nella landing (CSS on `.root`):**  
`--nl-paper`, `--nl-paper-2`, `--nl-ink`, `--nl-ink-soft`, `--nl-muted`, `--nl-rule`, `--nl-accent`, `--nl-accent-soft`, `--nl-font-display`, `--nl-font-ui`, `--nl-measure`, `--nl-max`, `--nl-gutter`

**Inner shell:** see `:root` in `src/styles/tokens.css` (`--cm-*`).

---

## Appendix L — Landing page (`/`)

**“L”** = this route only: the **Nella marketing landing** implemented by `NellaLanding` + `LandingWaitlistForm` + `TrackedLink`. Not About, Contact, or legal pages. What follows is the **composition contract** for that surface.

### L.1 Information order (top → bottom)

1. **Sticky header:** Wordmark (Nella, italic *a*), links About · Contact · Waitlist (`#nl-waitlist`).
2. **Hero:** Eyebrow → MyNella vs Nella clarification line → H1 (line + italic accent) → lead paragraph → **signal line** (pills joined by ` · `, single muted line) → primary CTA (scroll to waitlist) + secondary (About).
3. **Waitlist band:** `LandingWaitlistForm` `placement="landing-hero"`, `tone="light"`, `id="nl-waitlist"` for scroll-margin.
4. **Trust strip:** Short reassurance + link to Contact.
5. **Section “How we think”:** Muted background; three flow cells on a **hairline grid** (desktop).
6. **Section “What we are building”:** Three feature columns with **numeric index** + title + body; **pull quote** (left border + soft wash).
7. **FAQ:** `dl` list, rules between items; questions Fraunces-weighted.
8. **Bottom CTA:** Dark `--nl-ink` background; copy column + `LandingWaitlistForm` `tone="dark"`.
9. **Footer:** Legal links + disclaimer.

### L.2 Forbidden on landing

- Faux device / screenshot mock as hero art without real product.
- More than **one** full-width gradient “emotion” block (the old rose gradient band).
- Green **profit** accent from `--cm-accent` on this surface.
- Dashboard-style **stat tiles** unless they reflect real, sourced numbers.

### L.3 Analytics

- `TrackedLink` emits `cta_click` with `target` param.
- Successful waitlist posts emit `waitlist_submit` with `form_placement` `hero` | `bottom`.

### L.4 Responsive (implemented)

- **≤780px:** Flow grid and feature grid collapse to **single column**; flow cards stack with **1px borders** instead of a multi-column grid.
- **≥800px:** Bottom CTA becomes **two columns** (copy + waitlist form).
- **Sticky header:** `scroll-margin-top` on `#nl-waitlist` so in-page anchors clear the bar (~`5rem`).

### L.5 Future work (optional)

- Unify inner shell to **warm light** or **shared bronze accent** to match Nella landing.
- Add real **product photography** slot in hero when assets exist (document dimensions here when added).

---

*End of DESIGN.md — last reviewed with codebase May 2026.*
