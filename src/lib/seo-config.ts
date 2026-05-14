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
  "MyNella — a modern marketing site. Replace this description with your positioning, compliance-approved disclosures, and primary keywords.";

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
  if (p === "/wealth-management-pune") return "/og/about.png";
  if (p === "/terms") return "/og/terms.png";
  if (p === "/privacy") return "/og/privacy.png";
  if (p === "/disclosures") return "/og/disclosures.png";
  if (p.startsWith("/team")) return "/og/team.png";
  if (p === "/blog/guides") return "/og/guides.png";
  if (p === "/blog/compare") return "/og/compare.png";
  if (p === "/blog" || p.startsWith("/blog/")) return "/og/blog.png";
  if (p.startsWith("/pms")) return "/og/pms.png";
  if (p.startsWith("/algo")) return "/og/algo.png";
  if (p.startsWith("/model-portfolios")) return "/og/model-portfolios.png";
  if (p.startsWith("/calculators")) return "/og/calculators.png";
  return "/og/default.png";
}

/** Marketing routes to include in sitemap (App Router paths, no trailing slash). */
export const SITEMAP_PATHS: string[] = [
  "/",
  "/about",
  "/contact",
  "/wealth-management-pune",
  "/terms",
  "/privacy",
  // Blog
  "/blog",
  "/blog/fy-2025-26-performance",
  // PMS
  "/pms",
  "/pms/polaris",
  // Algo
  "/algo",
  "/algo/optimus",
  "/algo/pledge-plus",
  "/algo/pledge-plus-mini",
  "/algo/polaris-lite",
  // Model portfolios
  "/model-portfolios",
  "/model-portfolios/alpha",
  "/model-portfolios/alpha/alpha-100",
  "/model-portfolios/alpha/alpha-200",
  "/model-portfolios/alpha/alpha-500",
  "/model-portfolios/quanto",
  "/model-portfolios/quanto/large-cap",
  "/model-portfolios/quanto/mid-cap",
  "/model-portfolios/quanto/small-cap",
  "/model-portfolios/quanto/multi-cap",
  "/model-portfolios/quanto/flexi-cap",
  "/model-portfolios/quanto/microcap",
  // Calculators
  "/calculators",
  "/calculators/cagr",
  "/calculators/time-to-double",
  "/calculators/growth-visualiser",
  "/calculators/drawdown-recovery",
  "/calculators/panic-selling",
  "/calculators/luxury-trap",
  "/calculators/start-late",
  "/calculators/fee-destroyer",
  "/calculators/min-ticket",
  "/calculators/sleeve-sizer",
  "/calculators/martingale",
  "/calculators/polaris-compounding",
  "/calculators/retirement",
  // Team & compliance
  "/team/punam-kucheria",
  "/disclosures",
  // PMS education
  "/pms/how-pms-works",
  "/pms/pms-vs-mutual-funds",
  "/pms/pms-vs-smallcase",
  "/pms/pms-taxation-india",
  // Algo education
  "/algo/what-is-algo-trading",
  "/algo/sebi-rules-algo-trading",
  "/model-portfolios/smallcase-vs-direct",
  // Blog — long-form guides & compare (see `blog-static-registry`)
  "/blog/guides",
  "/blog/compare",
  "/blog/how-to-choose-pms",
  "/blog/pms-investor-checklist",
  "/blog/understanding-risk-profile",
  "/blog/tax-on-pms-returns",
  "/blog/is-algo-trading-legal-india",
  "/blog/stock-loss-drawdown-recovery-guide",
  "/blog/momentum-investing-india",
  "/blog/polaris-vs-smallcase",
  "/blog/optimus-vs-mutual-fund",
  "/blog/optimus-vs-niftybees",
  "/blog/pms-vs-aif",
];
