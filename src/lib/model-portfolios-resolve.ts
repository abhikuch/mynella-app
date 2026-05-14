import { unstable_cache } from "next/cache";
import type { CmsPortfolioDoc } from "./portfolio-cms-map";
import { cmsPortfolioToData } from "./portfolio-cms-map";
import {
  getPortfolio as getPortfolioLib,
  getPortfoliosByFamily as getPortfoliosByFamilyLib,
  type PortfolioData,
} from "./model-portfolios";
import { SANITY_NEXT_CACHE_TAG } from "@/sanity/lib/cache-tag";
import { getSanityClient } from "@/sanity/lib/client";

const allPortfoliosQuery = `*[_type == "portfolioStrategy"] | order(family asc, name asc) {
  slug,
  family,
  name,
  tagline,
  description,
  universe,
  rebalance,
  minInvestment,
  riskProfile,
  methodology,
  suitableFor,
  overviewEyebrow,
  overviewTitle,
  methodologyColumnTitle,
  performanceEyebrow,
  performanceTitle,
  performanceDisclaimer,
  suitableEyebrow,
  suitableTitle,
  subscribeEyebrow,
  subscribeTitle,
  subscribeLead,
  platformDisclaimer,
  platforms[]{ name, slug, href, logo },
  performance {
    inceptionDate,
    cagr,
    benchmarkName,
    benchmarkCagr,
    returns[]{ label, portfolio, benchmark }
  }
}`;

const getAllCmsPortfolios = unstable_cache(
  async (): Promise<CmsPortfolioDoc[]> => {
    const client = getSanityClient();
    if (!client) return [];
    return client.fetch<CmsPortfolioDoc[]>(allPortfoliosQuery);
  },
  ["sanity-all-portfolio-strategies"],
  { revalidate: 60, tags: [SANITY_NEXT_CACHE_TAG] },
);

export async function getMergedPortfoliosByFamily(
  family: "quanto" | "alpha",
): Promise<PortfolioData[]> {
  const lib = getPortfoliosByFamilyLib(family);
  const allCms = await getAllCmsPortfolios();
  const cmsRows = allCms.filter((r) => r.family === family);
  if (!cmsRows.length) return lib;
  const bySlug = new Map(cmsRows.map((r) => [r.slug, cmsPortfolioToData(r)]));
  const merged = lib.map((p) => bySlug.get(p.slug) ?? p);
  const libSlugs = new Set(lib.map((p) => p.slug));
  const extras = cmsRows.filter((r) => !libSlugs.has(r.slug)).map(cmsPortfolioToData);
  return [...merged, ...extras];
}

export async function getMergedPortfolio(
  family: "quanto" | "alpha",
  slug: string,
): Promise<PortfolioData | undefined> {
  const list = await getMergedPortfoliosByFamily(family);
  return list.find((p) => p.slug === slug) ?? getPortfolioLib(family, slug);
}
