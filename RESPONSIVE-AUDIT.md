# Responsive audit — Clearmind website

_Date: 29 March 2026_

## Executive summary

- **URLs covered:** 23 static routes (see below), each checked at **390×844**, **768×900**, **1024×900**, and **1280×900**, in **dark** and **light** theme (`data-theme` + `localStorage`), **184 checks** total.
- **Automated result:** **0** nav breakpoint anomalies and **0** in-flow horizontal bleed flags (see methodology). Re-run `node scripts/responsive-audit.mjs` (with the site up) to capture fresh JSON on stdout; large snapshot files are not kept in repo.
- **Critical fix applied during audit:** `@media (max-width: var(--cm-bp-*))` was **ignored in Chromium**, so mobile nav and responsive rules did not apply. All such rules were replaced with **literal** `940px`, `640px`, and `560px` (matching [`src/styles/tokens.css`](src/styles/tokens.css)). Production CSS now contains e.g. `@media (max-width:940px){...}`.

## URL inventory (in scope)

| Path |
|------|
| `/` |
| `/about` |
| `/contact` |
| `/blog` |
| `/blog/fy-2025-26-performance` |
| `/algo` |
| `/algo/optimus` |
| `/algo/pledge-plus` |
| `/algo/polaris-lite` |
| `/pms` |
| `/pms/polaris` |
| `/model-portfolios` |
| `/model-portfolios/alpha` |
| `/model-portfolios/alpha/alpha-100` |
| `/model-portfolios/alpha/alpha-200` |
| `/model-portfolios/alpha/alpha-500` |
| `/model-portfolios/quanto` |
| `/model-portfolios/quanto/large-cap` |
| `/model-portfolios/quanto/mid-cap` |
| `/model-portfolios/quanto/small-cap` |
| `/model-portfolios/quanto/flexi-cap` |
| `/model-portfolios/quanto/multi-cap` |
| `/model-portfolios/quanto/microcap` |

**Not in this pass:** dynamic `/blog/[slug]` beyond the FY performance URL (same layout as other posts); `robots.txt`, `sitemap.xml`, `ai.txt`, `llms.txt`, `icon.png`.

## Methodology

1. **Server:** `npm run build` then `npm run start -- -p 3456` (or any port; override with `AUDIT_BASE_URL`).
2. **Tool:** Playwright (Chrome channel) — [`scripts/responsive-audit.mjs`](scripts/responsive-audit.mjs).
3. **Nav check:** Below **940px** viewport width, desktop `<ul class*="links">` must be `display: none` and the hamburger control not `none`. From **1024px** up, the opposite.
4. **Overflow check:** `body` uses `overflow-x: hidden`, so `scrollWidth` alone is misleading. The script flags **in-flow** (`position` static/relative) elements that intersect the viewport vertically and extend past `window.innerWidth` by more than 2px. **Fixed/absolute/sticky** nodes are skipped to reduce false positives from overlays and marquees.

## Media query verification

- **Before fix:** Compiled bundles contained `@media (max-width: var(--cm-bp-lg))`; Playwright showed **desktop nav at 390px** (92/184 failures).
- **After fix:** Bundles contain `@media (max-width:940px)` (and 640px / 560px where used). **Safari:** recommend a quick smoke (same viewports) on a real device; Chromium-based audit passes.

## Hotspots — manual follow-up (P2)

Automated pass does not open the **Strategy Matcher** drawer, scroll long **performance report** sections, or submit **contact** forms. Recommended quick manual checks:

| Area | Action |
|------|--------|
| [`StrategyMatcher`](src/components/sections/StrategyMatcher.tsx) | On `/` at **390px**, open matcher, scroll panel, close; repeat light theme. |
| [`PerformanceReport`](src/components/sections/PerformanceReport.module.css) | On `/blog/fy-2025-26-performance`, scroll all chart/table blocks; confirm readability and any inner scroll if content is wide. |
| [`ContactPage`](src/components/sections/ContactPage.module.css) | At **390px**, focus fields and submit control; no zoom trap on iOS if font-size &lt; 16px on inputs. |
| **Hero `vh`** | On long pages, resize mobile browser chrome (iOS Safari) to ensure hero CTAs are not permanently clipped. |

## Severity log

| ID | Severity | Item | Status |
|----|----------|------|--------|
| R1 | **P0** | `var()` inside `@media` breakpoints ignored in Chromium — mobile layout broken | **Fixed** (literal `px` in all affected `.module.css` + `globals.css`) |
| R2 | P2 | Strategy Matcher / FY report / contact — interaction & long-content QA | **Open** (manual) |
| R3 | P2 | `/blog/[slug]` other posts | **Open** (spot-check when new posts ship) |

## Re-run

```bash
npm run build && npm run start -- -p 3456
# other terminal:
PLAYWRIGHT_CHANNEL=chrome npm run audit:responsive
# optional: append `> reports/audit.json` to save output
```

`PLAYWRIGHT_CHANNEL=chrome` uses installed Google Chrome; omit to use Playwright’s bundled Chromium after `npx playwright install chromium`.
