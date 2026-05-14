/**
 * `unstable_cache` revalidate window for Sanity-backed fetches tagged with
 * `SANITY_NEXT_CACHE_TAG`. Busted immediately on CMS publish via
 * `/api/revalidate-sanity` — keep this high to cut origin traffic and cost.
 *
 * Keep `src/app/ai.txt/route.ts` `export const revalidate` numeric literal in sync
 * (Next.js requires a compile-time literal for route segment config).
 */
export const SANITY_UNSTABLE_CACHE_REVALIDATE_SECONDS = 3600;
