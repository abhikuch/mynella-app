import type { PageCopyDoc } from "@/sanity/lib/pageCopy";

/** Routes that render the page-level marquee; CMS `marqueeItems` overrides these. */
const MARQUEE_FALLBACKS = {
  "algo-polaris-lite": [
    "Research Analyst · REG-NUMBER-RA",
    "Systematic equity from ₹10L",
    "Polaris engine · accessible ticket",
    "Rules-based selection & allocation",
    "No fixed management fee",
    "Process over narrative",
    "Disciplined execution",
  ],
  "pms-polaris": [
    "SEBI PMS · REG-NUMBER-PMS",
    "Discretionary equity mandate",
    "Minimum ₹50L · performance-aligned fees",
    "Momentum & trend following",
    "Concentrated, high-conviction book",
    "25+ years market experience",
    "Aligned incentives",
  ],
  "algo-optimus": [
    "Fully automated execution",
    "Market-agnostic options program",
    "Harness volatility · systematic rules",
    "Absolute return orientation",
    "No discretionary overrides",
    "Documented process",
    "Suitability-gated access",
  ],
  "algo-pledge-plus": [
    "Margin-enhanced directional F&O",
    "Pledge equity · stay invested",
    "Systematic minimums",
    "Incremental return on idle margin",
    "High-liquidity instruments",
    "No need to liquidate holdings",
    "Risk & suitability first",
  ],
  "algo-pledge-plus-mini": [
    "Pledge+ framework · lower ticket",
    "Commodities-only directional F&O",
    "Pledge equity · stay invested",
    "Built for ₹50L capital",
    "Illustrative cash buffer discipline",
    "Systematic risk overlays",
    "Suitability first",
  ],
  about: [
    "SEBI PM & Research Analyst",
    "REG-NUMBER-PMS · REG-NUMBER-RA",
    "Pune · institutional-grade process",
    "Human judgment + systematic execution",
    "Transparency & compliance",
    "Built for long horizons",
    "MyNella Consultancy",
  ],
} as const;

export type PageMarqueeRouteKey = keyof typeof MARQUEE_FALLBACKS;

export function marqueeItemsFromPageCopy(
  copy: PageCopyDoc | null | undefined,
  routeKey: PageMarqueeRouteKey,
): string[] {
  const trimmed = copy?.marqueeItems
    ?.map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter((s): s is string => s.length > 0);
  if (trimmed && trimmed.length > 0) return trimmed;
  return [...MARQUEE_FALLBACKS[routeKey]];
}
