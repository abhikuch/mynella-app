# MyNella

Marketing site for **Nella** (companion app in separate development) and MyNella editorial positioning. Stack: **Next.js (App Router)**, **Sanity CMS**, **Vercel**, **Resend** (contact + newsletter), **Git**.

## Scope (this repo)

- **Routes:** `/` (Nella-branded landing), `/about`, `/contact`, `/terms`, `/privacy`, plus `robots.txt`, `sitemap.xml`, `llms.txt`, `ai.txt`, `api/revalidate-sanity`.
- **Removed:** finance/blog/calculators/pillar UI, unused Sanity types (`post`, `faqItem`, `homeContent`, `marketingPage`, `portfolioStrategy`, …), dead libs and components.
- **Sanity Studio:** `siteSettings`, `siteChrome`, `contactPage`, `pageCopy`, `partner`, `teamMember`; desk structure under **MyNella**.

## Local development

```bash
npm install
cp .env.example .env.local   # root — Sanity + site URL + optional Resend/GA
cp sanity/.env.example sanity/.env
npm run dev
```

- App: [http://localhost:3000](http://localhost:3000)
- Studio: `npm run studio` (from repo root; see `package.json` scripts)

## Seeding CMS

```bash
npm run seed
```

Requires a **write-capable** `SANITY_API_TOKEN` in `sanity/.env`. Before overwriting shared datasets, follow your team’s pull/review discipline for seeds.

## Build

```bash
npm run lint
npm run build
```

## Deploy & ops (checklist)

1. **GitHub** — push `main`; connect to Vercel.
2. **Vercel** — set env vars from `.env.example` (production + preview).
3. **Sanity** — CORS for localhost + production origin; optional webhook to `/api/revalidate-sanity?secret=…`.
4. **Studio** — `cd sanity && npm run studio:deploy` after schema/desk changes.
5. **Search / analytics** — GSC property, sitemap submit, `NEXT_PUBLIC_GA_MEASUREMENT_ID` if used; Resend domain verification for email.

## Legacy bootstrap note

This repo was derived from a Clearmind-style marketing template. Operational parity ideas (env checklists, `pull:vercel`, measurement docs) still apply; product copy and schema are now trimmed for MyNella + Nella only.
