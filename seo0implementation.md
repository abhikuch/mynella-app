# SEO implementation — spec vs codebase (living)

This file compares the **SEO / YMYL strategy** described in planning (and stakeholder notes) with what is **implemented in this repo**.  
If you meant a different filename (e.g. `SEO_IMPLEMENTATION.md`), treat this as the canonical audit table.

---

## Legend

| Status | Meaning |
|--------|--------|
| **Yes** | Implemented in code or config (verify in production). |
| **Partial** | Some plumbing exists; process, content, or ops still required. |
| **No** | Not implemented; or only documented as a follow-up. |

---

## 1. E-E-A-T — author (Punam Kucheria)

| Item | Status | Where / notes |
|------|--------|----------------|
| Dedicated author profile URL | **Yes** | `/team/punam-kucheria` |
| Credentials & SEBI registration numbers on profile | **Yes** | Body copy + structured data |
| LinkedIn (company + other social) | **Partial** | Company LinkedIn + X + Stocktwits + Substack in `sameAs`; **personal LinkedIn `/in/...`** should be added when you have a stable public URL |
| Photo | **Yes** | `public/team/punam-kucheria.png` + hero on profile page |
| **Byline on every pillar / educational article** | **Yes** | `PillarArticleByline` via `PillarArticlePage` (hidden on the profile page to avoid duplication) |
| Article `author` in JSON-LD = **Person** (not only Organization) | **Yes** | `pillarArticleJsonLdScript` uses Person `Punam Kucheria` with `url`, `image`, `jobTitle`, `sameAs` |
| `Person` schema on profile | **Yes** | `pillarPersonJsonLdScript` on `/team/punam-kucheria` |

---

## 2. High-intent comparison content

| Item | Status | Where / notes |
|------|--------|----------------|
| Polaris vs smallcase | **Yes** | `/blog/polaris-vs-smallcase` (legacy `/compare/polaris-vs-smallcase` → 301) |
| PMS vs mutual fund (pillar) | **Yes** | `/pms/pms-vs-mutual-funds` |
| Optimus vs mutual fund | **Yes** | `/blog/optimus-vs-mutual-fund` (legacy `/compare/optimus-vs-mutual-fund` → 301) |
| **Optimus vs Nifty BeES** | **Yes** | `/blog/optimus-vs-niftybees` (legacy `/compare/optimus-vs-niftybees` → 301; ETF / index fund wrapper comparison) |
| “Best PMS in India” listicle intent | **No** | Needs a dedicated **listicle / comparison** page matching SERP format—not a product homepage. |

---

## 3. Original data, screenshots, equity curves

| Item | Status | Notes |
|------|--------|--------|
| Actual performance / drawdown on site | **Partial** | Performance report route exists (`/blog/fy-2025-26-performance`); embed **curves + disclaimers** where marketing approves |
| Screenshots in articles | **No** | Add to CMS or static MDX when assets exist |

---

## 4. Freshness — “Last updated” & quarterly updates

| Item | Status | Where / notes |
|------|--------|----------------|
| “Last updated” on pillar articles | **Yes** | `PillarArticleByline` + `dateModified` in Article JSON-LD (`src/lib/eeat-author.ts` — `PILLAR_CONTENT_LAST_UPDATED`) |
| Quarterly review process for top 20 URLs | **No** | **Process + calendar**; bump `PILLAR_CONTENT_LAST_UPDATED` or per-page dates when you refresh |

---

## 5. Schema markup (Day 1)

| Type | Status | Where / notes |
|------|--------|----------------|
| `Article` | **Yes** | Pillar pages |
| `FAQPage` | **Yes** | Where FAQs present |
| `BreadcrumbList` | **Yes** | Pillar pages |
| `Person` | **Yes** | Profile + as Article `author` |
| `Organization` + `WebSite` | **Yes** | `SiteJsonLd` |
| `FinancialService` | **Yes** | `FinancialServiceJsonLd` in root layout (alongside `SiteJsonLd`) |
| `Product` | **Partial** | **Optional** — add `Product` / `Service` JSON-LD on flagship product URLs (e.g. `/pms/polaris`, `/algo/optimus`) when copy is stable |

---

## 6. Calculators as linkable assets

| Item | Status | Notes |
|------|--------|--------|
| Multiple calculators (12+) | **Yes** | `/calculators/*` |
| One new calculator per month (roadmap) | **No** | **Process**; not enforced in code |

---

## 7. Tier-1 citations & PR

| Item | Status | Notes |
|------|--------|--------|
| MoneyControl / Mint / ET / BQ / Capitalmind citations | **No** | **Outreach** (HARO, Qwoted, journalists); not tracked in repo |

---

## 8. Search intent & format

| Item | Status | Notes |
|------|--------|--------|
| Match format of top results for target keywords | **Partial** | Pillar pages are long-form; **listicle intent** for “best PMS” still missing |

---

## 9. Internal linking — blog → product

| Item | Status | Notes |
|------|--------|--------|
| Footer / nav links | **Yes** | Nav, Learn, related reading |
| **Every blog post: ≥1 contextual inline link to a product page** | **No** | Requires **editorial rule** + Sanity Portable Text links or a `post.relatedProductLinks` field; not auto-injected |

---

## 10. Measurement — GSC + GA4

| Item | Status | Where / notes |
|------|--------|----------------|
| GA4 | **Yes** | `GoogleAnalytics` + `NEXT_PUBLIC_GA_MEASUREMENT_ID` (`src/lib/seo-config.ts`) |
| `google-site-verification` meta | **Yes** | From Sanity `siteSettings` when set (`src/app/layout.tsx`) |
| **GSC property + sitemap** | **Partial** | **Ops**: submit `https://www.iamclearmind.com/sitemap.xml` in Search Console; see `PENDING-YOUR-SIDE.md` |

---

## Priority fixes applied in this repo (E-E-A-T first)

1. **Person** as `Article` author in JSON-LD + visible **byline** (photo, credentials, link to profile) on all pillar articles.  
2. **Last updated** date + `dateModified` in Article schema.  
3. **Richer** `/team/punam-kucheria` hero (photo + SEBI lines + social).  
4. **`FinancialService`** JSON-LD sitewide.  
5. **Optimus vs Nifty BeES** comparison route.

---

## Still on you (non-code)

- Personal LinkedIn URL for Punam in `sameAs` when public.  
- Quarterly content refresh + bump `PILLAR_CONTENT_LAST_UPDATED` or per-route dates.  
- Tier-1 PR and “best PMS” listicle page.  
- Blog inline product links (editorial + optional CMS field).  
- Performance charts with compliance sign-off.
