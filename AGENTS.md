## Learned User Preferences

- When work is ready, the user often asks to push or go live; treat deploy as the expected close-out unless they say otherwise.
- Prefer executing agreed plans and finishing task lists over stopping mid-stream once direction is set.
- After SEO-related changes ship, follow the weekly steps in `docs/SEO_MEASUREMENT_CHECKLIST.md` (GSC queries, page rows, indexing, CWV).
- Use dezerv.in as a recurring competitive benchmark for site structure, content depth, and technical SEO.
- Keep marketing pages as deliberate section-based layouts; avoid turning them into generic long-form or document-like pages unless that is explicitly requested and approved.
- For responsive work, stay mobile-first and allow separately designed sections below a breakpoint when shrinking the desktop layout is a poor fit.
- After meaningful layout changes, run `npm run audit:responsive`; use `AUDIT_FULL=1` when a full sweep is requested.
- Footer Compliance entries should be real destinations (pages or redirects); PDFs should use redirect behavior when specified.
- When fixing scroll or overflow globally, prefer minimal overrides on top of restored marketing CSS rather than rewriting restored section styles.

## Learned Workspace Facts

- This repo is the Clearmind public marketing site: Next.js App Router, CSS Modules with shared design tokens, and Sanity as the primary CMS.
- Primary information architecture includes Home, About, PMS (e.g. Polaris), Algo strategies (e.g. Optimus, Pledge+, Polaris Lite), Model Portfolios (nested Alpha and Quanto families), Blog, and Contact.
- Investor login is intended to point at `strategy.iamclearmind.com`; the primary book-a-call flow uses `cal.com/iamclearmind`.
- Sanity alignment matters for marketing chrome and pages via seeds and document types such as home content, site chrome, site settings, and team members; keep Studio schema and seeds consistent with the live UI.
- `docs/SEO_MEASUREMENT_CHECKLIST.md` is the operational checklist for ongoing SEO measurement after deploys.
- Hosted Sanity Studio should be redeployed when desk or schema structure changes so the editing UI matches production.
