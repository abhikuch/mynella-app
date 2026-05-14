/**
 * SEO fallbacks for marketing routes. Sanity `pageCopy` can override when seeded/edited.
 */

export type SeoEntry = { title: string; description: string };

export const SEO_CONTENT: Record<string, SeoEntry> = {
  "/": {
    title: "MyNella — Makeup & beauty",
    description:
      "Discover MyNella — looks, tutorials, and product drops. Built with Next.js, Sanity CMS, and SEO-ready metadata.",
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
};

/** Map Sanity `pageCopy.routeKey` → canonical pathname (for metadata fallback). */
export const ROUTE_KEY_TO_PATH: Record<string, string> = {
  home: "/",
  about: "/about",
  contact: "/contact",
  terms: "/terms",
  privacy: "/privacy",
};

const BLOG_CANONICAL_TO_LEGACY_SEO_KEY: Record<string, string> = {};

export function getSeoFallback(pathname: string): SeoEntry {
  const p = pathname === "" ? "/" : pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const legacyKey = BLOG_CANONICAL_TO_LEGACY_SEO_KEY[p];
  const hit = SEO_CONTENT[p] ?? (legacyKey ? SEO_CONTENT[legacyKey] : undefined);
  if (hit) return hit;
  return {
    title: "MyNella — Makeup & beauty",
    description: "MyNella — beauty content and products. Edit copy in Sanity or update SEO fallbacks in code.",
  };
}

export function getSeoFallbackForRouteKey(routeKey: string): SeoEntry {
  const path = ROUTE_KEY_TO_PATH[routeKey];
  if (path) return getSeoFallback(path);
  return getSeoFallback("/");
}
