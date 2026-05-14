import type { PortfolioData, PerformanceData, Platform, ReturnPeriod } from "./model-portfolios";

export type CmsPortfolioDoc = {
  slug: string;
  family: "quanto" | "alpha";
  name: string;
  tagline: string;
  description: string;
  universe: string;
  rebalance: string;
  minInvestment: string;
  riskProfile: string;
  methodology: string[];
  suitableFor: string[];
  overviewEyebrow?: string | null;
  overviewTitle?: string | null;
  methodologyColumnTitle?: string | null;
  performanceEyebrow?: string | null;
  performanceTitle?: string | null;
  performanceDisclaimer?: string | null;
  suitableEyebrow?: string | null;
  suitableTitle?: string | null;
  subscribeEyebrow?: string | null;
  subscribeTitle?: string | null;
  subscribeLead?: string | null;
  platformDisclaimer?: string | null;
  platforms?: {
    name?: string | null;
    slug?: string | null;
    href?: string | null;
    logo?: string | null;
  }[] | null;
  performance?: {
    inceptionDate?: string | null;
    cagr?: string | null;
    benchmarkName?: string | null;
    benchmarkCagr?: string | null;
    returns?: { label?: string | null; portfolio?: string | null; benchmark?: string | null }[] | null;
  } | null;
};

function mapPlatforms(
  rows: NonNullable<CmsPortfolioDoc["platforms"]>,
): Platform[] {
  return rows.map((p) => ({
    name: p.name?.trim() || "",
    slug: p.slug?.trim() || "",
    href: p.href != null && String(p.href).trim() !== "" ? String(p.href).trim() : null,
    logo: p.logo?.trim() || undefined,
  }));
}

function mapReturns(
  rows: NonNullable<NonNullable<CmsPortfolioDoc["performance"]>["returns"]>,
): ReturnPeriod[] {
  return rows.map((r) => ({
    label: r.label?.trim() || "",
    portfolio: r.portfolio?.trim() || "",
    benchmark: r.benchmark?.trim() || "",
  }));
}

function mapPerformance(per: NonNullable<CmsPortfolioDoc["performance"]>): PerformanceData {
  return {
    inceptionDate: per.inceptionDate?.trim() || "",
    cagr: per.cagr?.trim() || "",
    benchmarkName: per.benchmarkName?.trim() || "",
    benchmarkCagr: per.benchmarkCagr?.trim() || "",
    returns: per.returns?.length ? mapReturns(per.returns) : [],
  };
}

function pickUi(doc: CmsPortfolioDoc): PortfolioData["ui"] {
  const u = {
    overviewEyebrow: doc.overviewEyebrow?.trim() || undefined,
    overviewTitle: doc.overviewTitle?.trim() || undefined,
    methodologyColumnTitle: doc.methodologyColumnTitle?.trim() || undefined,
    performanceEyebrow: doc.performanceEyebrow?.trim() || undefined,
    performanceTitle: doc.performanceTitle?.trim() || undefined,
    performanceDisclaimer: doc.performanceDisclaimer?.trim() || undefined,
    suitableEyebrow: doc.suitableEyebrow?.trim() || undefined,
    suitableTitle: doc.suitableTitle?.trim() || undefined,
    subscribeEyebrow: doc.subscribeEyebrow?.trim() || undefined,
    subscribeTitle: doc.subscribeTitle?.trim() || undefined,
    subscribeLead: doc.subscribeLead?.trim() || undefined,
    platformDisclaimer: doc.platformDisclaimer?.trim() || undefined,
  };
  const has = Object.values(u).some(Boolean);
  return has ? u : undefined;
}

export function cmsPortfolioToData(doc: CmsPortfolioDoc): PortfolioData {
  const performance =
    doc.performance ? mapPerformance(doc.performance) : ({} as PerformanceData);
  return {
    slug: doc.slug,
    family: doc.family,
    name: doc.name,
    tagline: doc.tagline,
    description: doc.description,
    universe: doc.universe,
    rebalance: doc.rebalance,
    minInvestment: doc.minInvestment,
    riskProfile: doc.riskProfile,
    methodology: [...doc.methodology],
    suitableFor: [...doc.suitableFor],
    platforms: doc.platforms?.length ? mapPlatforms(doc.platforms) : [],
    performance,
    ui: pickUi(doc),
  };
}
