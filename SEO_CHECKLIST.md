# SEO checklist — Clearmind marketing site

Use this list before major launches or quarterly audits. Commands run from the repository root unless noted.

## Technical baseline

- **Canonical & metadata:** Marketing routes use `buildPageMetadata` / `buildMetadata` with canonical URLs, Open Graph, and Twitter cards (`src/lib/seo-metadata.ts`, `src/lib/seo.ts`). Sanity `pageCopy` can override titles and descriptions where wired.
- **Sitemap & robots:** `src/app/sitemap.ts` and `src/app/robots.ts` reference `SITE_URL` from `src/lib/seo-config.ts`. Confirm production hostname matches `SITE_URL` after deploy.
- **Structured data (pillar / long-form pages):** `PillarArticlePage` emits JSON-LD for `Article`, `BreadcrumbList`, optional `FAQPage`, and optional `Person` (team profile). Validate after template changes.

## Internal linking

- **Related reading:** Contextual links for pillar routes live in `src/lib/pillar-interlinks.ts` and render via `PillarRelatedLinks` under each pillar article.
- **Primary nav:** `Learn` mega menu (Blog, Guides → `/blog/guides`, Compare → `/blog/compare`, Disclosures, **Wealth management in Pune** → `/wealth-management-pune`) is defined in `src/lib/navigation.ts` and mirrored in `sanity/defaultContent/siteChromeSeed.ts` for CMS seeding.
- **Footer:** Company links include Guides (`/blog/guides`), Compare (`/blog/compare`), Disclosures, and `/wealth-management-pune` in the same files.

## Search Console keyword clusters (GSC)

- **Cluster → canonical URL map** and weekly review steps: [`docs/SEO_KEYWORD_CLUSTER.md`](docs/SEO_KEYWORD_CLUSTER.md), [`docs/SEO_MEASUREMENT_CHECKLIST.md`](docs/SEO_MEASUREMENT_CHECKLIST.md).

## Content length (pillar bodies)

Approximate **visible text word counts** (text between JSX tags; excludes attribute values and embedded expressions). Regenerate with:

```bash
npm run wordcount:pillars
```

Snapshot (re-run script for current numbers):

| Article (approx.) | Words |
|------------------|-------|
| CompareGenerated.tsx → CompareHubArticleBody | 1647 |
| CompareGenerated.tsx → CompareOptimusVsMutualFundBody | 1060 |
| CompareGenerated.tsx → ComparePmsVsAifBody | 1071 |
| CompareGenerated.tsx → ComparePolarisVsSmallcaseBody | 1370 |
| DisclosuresArticle.tsx → DisclosuresArticleBody | 1710 |
| GuidesGenerated.tsx → GuideHowToChoosePmsBody | 1103 |
| GuidesGenerated.tsx → GuideMomentumInvestingIndiaBody | 1036 |
| GuidesGenerated.tsx → GuidePmsInvestorChecklistBody | 967 |
| GuidesGenerated.tsx → GuidesHubArticleBody | 1291 |
| GuidesGenerated.tsx → GuideTaxOnPmsReturnsBody | 1013 |
| GuidesGenerated.tsx → GuideUnderstandingRiskProfileBody | 871 |
| HowPmsWorksArticle.tsx → HowPmsWorksArticleBody | 1762 |
| PmsCompareTaxArticles.tsx → PmsTaxationIndiaArticleBody | 1687 |
| PmsCompareTaxArticles.tsx → PmsVsMutualFundsArticleBody | 1762 |
| PmsCompareTaxArticles.tsx → PmsVsSmallcaseArticleBody | 1774 |
| PunamKucheriaArticle.tsx → PunamKucheriaArticleBody | 1850 |
| SebiAlgoRulesArticle.tsx → SebiAlgoRulesArticleBody | 1469 |
| SmallcaseVsDirectArticle.tsx → SmallcaseVsDirectArticleBody | 1724 |
| WhatIsAlgoTradingArticle.tsx → WhatIsAlgoTradingArticleBody | 1844 |

Many pillars sit between **~1,700 and ~1,850** words on this measure; guides and compare hubs were expanded and deduplicated. For a strict **2,000–3,000** word target per URL, run `npm run wordcount:pillars` after edits and extend the relevant body component in `src/components/pillar-articles/bodies/`.

## Pre-deploy QA

1. `npm run build` — must pass TypeScript and compile.
2. **Rich Results Test** — spot-check `/blog/guides`, `/blog/compare`, `/team/punam-kucheria`, and one PMS pillar for valid `Article` / `FAQ` / `BreadcrumbList` / `Person` as applicable. (Legacy `/guides` and `/compare` URLs should 301 to these.)
3. **Lighthouse (Chrome DevTools)** — performance and SEO categories on home, one product hub, and one long-form pillar.
4. **Manual crawl** — open `sitemap.xml` in staging/production and confirm new routes appear.

## Sanity dataset alignment

After changing `sanity/defaultContent/siteChromeSeed.ts`, run your normal seed workflow so Studio navigation matches code (see repo rules for `npm run seed` and backup practices).
