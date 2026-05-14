/**
 * Canonical site URL for metadata, sitemap, and JSON-LD.
 * Override in production with NEXT_PUBLIC_SITE_URL if the domain changes.
 */
/** Canonical origin (www) — must match production for OG URLs & social previews. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mynella.com"
).replace(/\/$/, "");

export const SITE_NAME = "MyNella";

export const DEFAULT_DESCRIPTION =
  "MyNella — marketing home for Nella, a calm companion for aesthetic routines and between-visit care. Editorial surface: SEO, Sanity, and Vercel.";

/** X (Twitter) handle for twitter:site (no @ in schema.org; with @ for Twitter cards). */
export const TWITTER_HANDLE = "@mynella";

/** AI-generated assets in `public/og/` — used for Open Graph, Twitter, and JSON-LD. */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const ORGANIZATION_LOGO_PATH = "/og/default.png";

/**
 * GA4 measurement ID. Override with `NEXT_PUBLIC_GA_MEASUREMENT_ID`; set to empty string to disable.
 */
export const GOOGLE_ANALYTICS_MEASUREMENT_ID: string | null =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID === ""
    ? null
    : process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || null;

/** Absolute URL for a static asset path (leading slash), e.g. `/og/og-default.png`. */
export function absoluteOgImageUrl(assetPath: string): string {
  const p = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return `${SITE_URL}${p}`;
}

/**
 * Pick the best OG/Twitter image for a pathname (blog, PMS, algo, model portfolios, or site default).
 */
/** Static OG images in `public/og/*.png` (1200×630). */
export function ogAssetPathForPathname(pathname: string): string {
  const p = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (p === "/") return "/og/home.png";
  if (p === "/about") return "/og/about.png";
  if (p === "/contact") return "/og/contact.png";
  if (p === "/terms") return "/og/terms.png";
  if (p === "/privacy") return "/og/privacy.png";
  return "/og/default.png";
}

/** Marketing routes to include in sitemap (App Router paths, no trailing slash). */
export const SITEMAP_PATHS: string[] = ["/", "/about", "/contact", "/terms", "/privacy"];
