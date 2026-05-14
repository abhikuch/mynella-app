import type { PortfolioData } from "@/lib/model-portfolios";

/** Matches `pageCopy` seed `routeKey` for portfolio detail routes. */
export function portfolioPageCopyRouteKey(
  family: PortfolioData["family"],
  slug: string,
): string {
  return `portfolio-${family}-${slug}`;
}
