# MyNella — Sanity Studio

Edit blog posts and CMS content here. The marketing site reads the same project via `NEXT_PUBLIC_SANITY_*` in the repo root.

### API token for `npm run seed` (required)

Create a token at [sanity.io/manage](https://www.sanity.io/manage) → **API** → **Tokens** with **Editor** (or **Developer**) access so it can **create** and **update** documents. **Viewer** / read-only tokens will fail with `permission "create" required`. Put the token in `sanity/.env` as `SANITY_API_TOKEN=...`.

### Repo defaults → dataset (required)

Whenever **default content is changed in this repo**—especially `sanity/defaultContent/*` and anything **upserted by** `sanity/scripts/seedDefaults.ts`—run **`npm run seed`** from the **repository root** (same as `cd sanity && npm run seed`) so **Sanity Studio / the Content Lake** match the repo. Committing seed files alone does not update a deployed dataset.

If you are about to **overwrite production** and editors may have work only in the cloud, run **`npm run pull:sanity`** from the repo root first, review the export, then seed.

**Sanity docs (LLM index):** [sanity.io/docs/llms.txt](https://www.sanity.io/docs/llms.txt) — Next.js, GROQ, Presentation / Visual Editing, webhooks, and optional TypeGen.

## 1. Create or pick a project

1. Go to [sanity.io/manage](https://www.sanity.io/manage).
2. Open an existing project or **Create project**.
3. Copy **Project ID** and note the **dataset** (default `production`).

## 2. Configure this Studio

```bash
cd sanity
cp .env.example .env
```

Edit `.env`:

```env
SANITY_STUDIO_PROJECT_ID=pasteYourProjectId
SANITY_STUDIO_DATASET=production
```

Install and run:

```bash
npm install
npm run dev
```

Open the URL shown (usually **http://localhost:3333**).

From the **repo root** you can run: `npm run studio` (same thing).

## 3. Configure the Next.js site

So `/blog` loads your documents:

```bash
cd ..   # repo root
cp .env.example .env.local
```

Set:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=sameProjectIdAsAbove
NEXT_PUBLIC_SANITY_DATASET=production
```

Then `npm run dev` and open **http://localhost:3000/blog**.

## 4. CORS (required for the browser)

In [sanity.io/manage](https://www.sanity.io/manage) → your project → **API** → **CORS origins**:

- Add `http://localhost:3000`

## 5. Content model: **Page copy**

One document per URL “route key” (see `sanity/defaultContent/pageCopySeed.ts`). Used for **SEO title/description** and **hero** text on marketing pages. After changing content, the site revalidates within ~60s.

Run **`npm run seed`** in `sanity/` to create/update all default page copy documents (requires `SANITY_API_TOKEN` in `sanity/.env` or `sanity login` — see seed script header).

| Route key examples | Page |
|--------------------|------|
| `home`, `about`, `contact`, `blog` | Core |
| `pms`, `pms-polaris` | PMS |
| `algo`, `algo-optimus`, `algo-pledge-plus`, `algo-polaris-lite` | Algo |
| `model-portfolios`, `model-portfolios-alpha`, `model-portfolios-quanto` | Model portfolio hubs |
| `portfolio-quanto-large-cap`, `portfolio-alpha-alpha-100`, … | Portfolio detail |
| `blog-fy-2025-26-performance` | Performance report |

## 6. Content model: **Blog post**

| Field           | Purpose |
|----------------|---------|
| Title          | Headline |
| Slug           | URL: `/blog/{slug}` |
| Published at   | Shown on cards |
| Excerpt        | Card + SEO blurb |
| External URL   | Optional: card links out; on-site page redirects there |
| Body           | Portable Text for full article |

Avoid using slug `fy-2025-26-performance` — that page is still built in code.

## 7. Content model: **Site settings** (singleton)

Create **one** document the site reads by id `siteSettings`:

1. In the desk, open **Site settings** (or create a document of type *Site settings* with **Document ID** `siteSettings` in Vision/import — the desk shortcut targets this id).
2. Fill any fields you want; empty fields fall back to built-in copy on the site.

| Field group | Purpose |
|-------------|---------|
| Home hero | Tag, title lines, subtitle on `/` |
| About | Pills, title, subtitle on `/about` hero |
| Founder | Name, role, initials, creds, Portable Text bio (replaces code bio when set) |
| Footer | Brand blurb, disclaimer paragraph; optional Terms / Privacy URLs override footer links |
| Team roster | Lead sentence above the LinkedIn grid |

## 8. Content model: **Team member**

Add roster cards for `/about`. **Sort order** controls listing (then name). Each row needs **name**, **role**, **LinkedIn URL**.

If there are **no** team member documents, the site uses the static list in code.

## 9. Content model: **FAQ item**

**Question**, **answer** (Portable Text), **placements** (where the item appears: about, PMS hub, algo hub, model portfolios, etc.), and **order**. If the CMS returns nothing for a placement, the site uses the matching defaults from `sanity/defaultContent/faqExtendedSeed.ts`.

## 10. Host Studio on the web (optional)

```bash
cd sanity
npm run deploy
```

Follow the CLI to get a `*.sanity.studio` URL so editors don’t need this repo.
