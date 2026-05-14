# Pending on your side — Clearmind website

Living checklist of decisions, assets, and ops only you still need to handle.  
_Last updated: 29 March 2026._
can 
---

## Ops & env (production)

| Item | Notes |
|------|--------|
| **Resend** | **`RESEND_API_KEY`**, **`RESEND_FROM_EMAIL`**, **`RESEND_LEAD_TO_EMAIL`** on Vercel **production** for newsletter + blog gate. See [.env.example](.env.example). |
| **Sanity CORS** | [sanity.io/manage](https://www.sanity.io/manage) → API → CORS: include your public site URL + localhost. |
| **Vercel ↔ same Sanity project** | **`NEXT_PUBLIC_SANITY_PROJECT_ID`** and **`NEXT_PUBLIC_SANITY_DATASET`** must match the project/dataset you edit in Studio (usually `production`). If they differ, the site will show **seed/fallback** copy, not your edits. |
| **Cache refresh after publish** | Edits go live on the API immediately; the site also uses a short server cache (≈60s). For **instant** updates, set **`SANITY_REVALIDATE_SECRET`** on Vercel and add a Sanity **webhook** (or open once in a browser): `POST https://clearmind-web.vercel.app/api/revalidate-sanity?secret=YOUR_SECRET`. In Studio, use **Publish** — drafts do not appear on the public site. |

---

## Content & approvals

| Item | Notes |
|------|--------|
| **Hero “by the numbers”** | Confirm the four stats in **Site chrome** (Studio) are approved for public marketing. |
| **Tagline / About** | Optional: adjust copy in [`src/lib/company-profile.ts`](src/lib/company-profile.ts) or **Site settings** vs LinkedIn defaults. |
| **Team photos** | Optional: add **Photo** on **Sanity → Team member** for anyone who should not rely on LinkedIn avatars. |
| **Medium → blog** | Create **`post`** documents in Studio (or paste `externalUrl` for Medium links). The RSS import script was removed with the CMS rollback. |

---

## Legal, compliance, launch

| Item | Notes |
|------|--------|
| **Terms & Privacy** | When the **canonical domain** is final, align **Site settings** legal URLs and any hard-coded links. |
| **Compliance PDFs** | Keep PDFs on **iamclearmind.com** current; if paths change, update **Site chrome** footer links and **Home content → Compliance**. |
| **Performance report** | Confirm **numbers and disclaimers** with compliance before major promotion. |
| **`NEXT_PUBLIC_SITE_URL` / domain** | Set on Vercel to match the public URL; add **custom domain** in Vercel + DNS; then CORS / SEO as needed. |
| **Search Console** | Submit **`/sitemap.xml`** when the public URL is final; review **`robots.txt`**. |
| **Analytics** | Not in repo — add (Plausible, GA, etc.) if you want on-site analytics. |

---

## Reference (not tasks)

| What | Where |
|------|--------|
| Git / Vercel / Studio URLs | Same as before: GitHub `main`, **clearmind-web** on Vercel, Studio deploy via `cd sanity && npm run deploy`. |
| Full re-seed | `cd sanity && npm run seed` — only when you intentionally reset defaults (needs token / login). |

---

When something is finished, delete its row here so the list stays honest.
