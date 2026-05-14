# MyNella — separate site, same stack as Clearmind

This document is the playbook for spinning up **MyNella** as its **own** GitHub repo, **own** Vercel project (new account or new team is fine), and **own** Sanity project—while keeping the **same architecture, SEO patterns, CMS model, seeds workflow, and agent rules** as this Clearmind marketing site.

You cannot “fork” into another GitHub account in one click; use **duplicate repo** or **template** (see below).

---

## 0. What you are copying (structure parity)

| Layer | In this repo | MyNella action |
|-------|----------------|-----------------|
| App | Next.js App Router (`src/app/`) | Keep identical tree; change brand/domain/content |
| UI | CSS Modules + `src/styles/globals.css` + tokens | Keep; swap logo assets, colors if needed |
| CMS | `sanity/` schemas, `defaultContent/*`, `scripts/seedDefaults.ts` | New Sanity **projectId** + dataset; re-seed after rebrand |
| SEO | `src/lib/seo-config.ts`, `seo-content.ts`, `sitemap.ts`, JSON-LD, `buildPageMetadata` | Same files; replace defaults + `SITE_*` |
| Ops | `docs/SEO_MEASUREMENT_CHECKLIST.md`, `.cursor/rules/`, `AGENTS.md` | Copy into new repo; rewrite brand/domain bullets |
| Forms | Resend (`/api/contact`, newsletter) | New Resend domain + env keys |
| Deploy | Vercel Git → `main` | New Vercel project linked to new repo |
| Studio | `npm run studio` / hosted Studio | Deploy Studio against **new** Sanity project |

---

## 1. Accounts (manual — you own the keys)

### GitHub (`abhikuch` or org)

1. Create a **new** repository, e.g. `mynella-web` (private recommended until launch).
2. Do **not** reuse Clearmind’s remote. Use one of:
   - **Mirror push** (preserves history): from a bare clone of Clearmind, `git push --mirror git@github.com:abhikuch/mynella-web.git` then remove remotes / add normal `origin`.
   - **Fresh copy**: clone Clearmind locally, `rm -rf .git`, `git init`, commit, push to new repo (cleaner history, loses old commits).
   - **GitHub Template** (optional): mark Clearmind repo as template once, “Use template” → new repo under `abhikuch`.

### Sanity (new project)

1. [sanity.io/manage](https://www.sanity.io/manage) → **Create project** (e.g. “MyNella”).
2. Create dataset **`production`** (match seeds).
3. **API** → CORS origins: `http://localhost:3000`, preview URL, **production** `https://www.<your-mynella-domain>` (and apex if used).
4. Create **token** (Editor or deploy token) for `npm run seed` / CI; never commit it.
5. Optional: second dataset `development` for local experiments.

### Vercel (new account or new team)

1. Import the **new** GitHub repo.
2. Framework: Next.js; Root: repo root; Build: `npm run build`; Output: Next default.
3. Add **all** env vars from `.env.example` (root) + anything you use from `sanity/.env.example` for Studio deploys.
4. After first deploy, run `vercel link` locally with the **new** scope/project and refresh `pull:vercel` script (see §4).

---

## 2. Environment variables (parity checklist)

**Repo root** (see `.env.example`):

- `NEXT_PUBLIC_SANITY_PROJECT_ID` — new project  
- `NEXT_PUBLIC_SANITY_DATASET` — usually `production`  
- `NEXT_PUBLIC_SITE_URL` — canonical `https://www.<mynella-domain>` (no trailing slash)  
- `SANITY_REVALIDATE_SECRET` — new random string; same value in Sanity webhook query  
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_LEAD_TO_EMAIL` — new verified sending domain  
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — new GA4 property (or `""` to disable)  

**`sanity/.env`** (Studio + seeding):

- `SANITY_STUDIO_PROJECT_ID` — same as `NEXT_PUBLIC_SANITY_PROJECT_ID`  
- `SANITY_STUDIO_DATASET` — `production`  
- `SANITY_API_TOKEN` — for `sanity exec` / seed scripts  
- `SANITY_STUDIO_PREVIEW_URL` — production or preview URL for Presentation tool  

Follow workspace rule: **before pushing seeds to a shared dataset**, run `npm run pull:cms-seeds` (or your equivalent) and review diffs—same workflow as Clearmind.

---

## 3. Code & config rebrand (minimum viable)

These are the **highest-leverage** Clearmind-specific defaults. A full content pass is still required (seeds, blog, legal copy).

| File / area | Change |
|-------------|--------|
| `package.json` | `"name": "mynella"`; update `pull:vercel` scope to **new** Vercel team slug |
| `src/lib/seo-config.ts` | `SITE_URL`, `SITE_NAME`, `DEFAULT_DESCRIPTION`, `TWITTER_HANDLE`, default GA id |
| `sanity/sanity.config.ts` | `name`, `title` (Studio chrome) |
| `sanity/defaultContent/*.ts` | All `metaTitle` / body copy mentioning Clearmind, emails, Cal links |
| `src/lib/seo-content.ts` | Route fallbacks, keywords |
| `public/og/*`, `public/legal/*` | Replace or regenerate OG + PDFs |
| `src/components/ui/Logo*`, `ClearmindMarkImage` | Rename or duplicate components for MyNella assets |
| `src/app/layout.tsx` | Tagline if not generic (“Invest Better”) |

**Search helpers** (run in the **new** repo root after copy):

```bash
rg -i "clearmind|iamclearmind|iam_clearmind|cal\.com/iamclearmind|admin@iamclearmind"
rg "INP000009816|INH000010098"   # SEBI IDs — replace or remove if not applicable
```

---

## 4. Vercel CLI `pull:vercel` script

Clearmind pins a team scope in `package.json`:

```json
"pull:vercel": "vercel pull --yes --environment production --scope <YOUR_NEW_TEAM_SLUG>"
```

After `vercel link` in the MyNella repo, copy the scope from `.vercel/project.json` or the Vercel dashboard URL.

---

## 5. Same pipeline (CI/CD)

This repo relies primarily on **Vercel Git integration** (push to `main` → production). There is no required GitHub Actions workflow in-tree for deploy.

**Parity checklist:**

- [ ] Production branch = `main` (or align Vercel setting).  
- [ ] Preview deployments on PRs enabled.  
- [ ] Env vars set for Production + Preview (use Preview dataset only if you add one).  
- [ ] Sanity webhook → `https://www.<mynella>/api/revalidate-sanity?secret=...` after publish (optional but recommended).  

---

## 6. Same SEO & measurement guidelines

Copy into the new repo unchanged first, then edit brand/domain:

- `docs/SEO_MEASUREMENT_CHECKLIST.md`  
- `.cursor/rules/*.mdc` (especially `sanity-pull-before-push` if you keep seeds)  
- `AGENTS.md` (rewrite “Clearmind” / domains / product names; keep **process** bullets: deploy close-out, responsive audit after layout changes, GSC checklist after SEO ships)

Operational parity:

- Submit **new** GSC property + sitemap for MyNella domain.  
- `robots.txt`, `llms.txt`, `ai.txt` — regenerate or search-replace origins.  
- Re-verify Search Console / Bing tokens in Sanity `siteSettings` if stored there.

---

## 7. Sanity Studio hosted deploy

Same as Clearmind: when schema or desk structure changes, redeploy Studio so editors match production.

```bash
cd sanity && npm run studio:deploy   # or your wrapper; see package.json "studio:deploy"
```

Point Studio env at **new** `projectId` / dataset.

---

## 8. Optional hardening (same structure, less find-replace next time)

Longer-term, reduce duplicated brand strings by:

- Driving more hero/footer/nav from **Sanity only** (already partially true).  
- Adding `NEXT_PUBLIC_SITE_NAME` and reading it in `seo-config.ts` (requires a small code change in the template repo first).

That is optional; MyNella v1 can ship on search-replace + seeds.

---

## 9. Suggested order of execution

1. Create Sanity project + dataset + token.  
2. Create empty GitHub repo; push duplicated code.  
3. Replace `seo-config` + `sanity.config` + `package.json` + env examples.  
4. Global `rg` pass for domain/email/SEBI/Cal.com.  
5. `npm install` → `npm run lint` → `npm run build`.  
6. `npm run seed` (or staged seed) to new dataset **after** reading pull-before-push rule.  
7. Vercel import → env → deploy.  
8. Studio deploy + CORS + webhook.  
9. GSC + analytics + Resend domain verification.  

---

## 10. What this document does **not** do

- It does not create repos or cloud accounts for you.  
- It does not copy binary assets automatically—duplicate `public/` intentionally.  
- It does not legal-review MyNella copy; SEBI disclaimers must match **your** registrations.

When the MyNella repo exists, you can treat **this** Clearmind repo as the upstream “template” and periodically cherry-pick infra improvements (audit script, metadata fixes, etc.) if you want continued parity.
