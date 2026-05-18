/**
 * SEO fallbacks for marketing routes. Sanity `pageCopy` can override when seeded/edited.
 */

export type SeoEntry = { title: string; description: string };

export const SEO_CONTENT: Record<string, SeoEntry> = {
  "/": {
    title: "Nella — calm companion for your aesthetic routine | MyNella",
    description:
      "Remember visits, aftercare, and what comes next between appointments — without group-chat noise. Join the Nella waitlist on MyNella.",
  },
  "/about": {
    title: "About MyNella",
    description:
      "Who we are, how we think about beauty, and how to reach the team behind MyNella.",
  },
  "/contact": {
    title: "Contact MyNella",
    description:
      "Questions about products, partnerships, or press? Reach MyNella — we read every message.",
  },
  "/terms": {
    title: "Terms & Conditions | MyNella",
    description: "Terms governing use of the MyNella website and services.",
  },
  "/privacy": {
    title: "Privacy Policy | MyNella",
    description: "How MyNella collects, uses, and protects your information.",
  },
  "/delete-account": {
    title: "Delete your Nella account | MyNella",
    description:
      "Request deletion of your Nella companion app account and associated personal data.",
  },
};

/** Map Sanity `pageCopy.routeKey` → canonical pathname (for metadata fallback). */
export const ROUTE_KEY_TO_PATH: Record<string, string> = {
  home: "/",
  about: "/about",
  contact: "/contact",
  terms: "/terms",
  privacy: "/privacy",
  "delete-account": "/delete-account",
};

const BLOG_CANONICAL_TO_LEGACY_SEO_KEY: Record<string, string> = {};

export function getSeoFallback(pathname: string): SeoEntry {
  const p = pathname === "" ? "/" : pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const legacyKey = BLOG_CANONICAL_TO_LEGACY_SEO_KEY[p];
  const hit = SEO_CONTENT[p] ?? (legacyKey ? SEO_CONTENT[legacyKey] : undefined);
  if (hit) return hit;
  return {
    title: "Nella — calm companion for your aesthetic routine | MyNella",
    description:
      "Join the waitlist and read updates on MyNella — marketing home for the Nella companion app.",
  };
}

export function getSeoFallbackForRouteKey(routeKey: string): SeoEntry {
  const path = ROUTE_KEY_TO_PATH[routeKey];
  if (path) return getSeoFallback(path);
  return getSeoFallback("/");
}
