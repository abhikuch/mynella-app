/**
 * Contextual internal links for pillar / SEO article pages.
 * Guides & compare hubs live under `/blog/{slug}` (see `blog-static-registry`).
 */

export type PillarInterlink = { href: string; label: string };

const CORE = {
  guides: { href: "/blog/guides", label: "Investor guides hub" },
  compare: { href: "/blog/compare", label: "Compare structures hub" },
  disclosures: { href: "/disclosures", label: "Disclosures & charters" },
  pms: { href: "/pms", label: "PMS overview" },
  polaris: { href: "/pms/polaris", label: "Polaris PMS" },
  algo: { href: "/algo", label: "Algo programmes hub" },
  howPms: { href: "/pms/how-pms-works", label: "How PMS works" },
  pmsVsMf: { href: "/pms/pms-vs-mutual-funds", label: "PMS vs mutual funds" },
  pmsVsSc: { href: "/pms/pms-vs-smallcase", label: "PMS vs smallcase" },
  pmsTax: { href: "/pms/pms-taxation-india", label: "PMS taxation themes" },
  smallcaseVsDirect: { href: "/model-portfolios/smallcase-vs-direct", label: "smallcase vs direct equities" },
  whatAlgo: { href: "/algo/what-is-algo-trading", label: "What is algo trading" },
  sebiAlgo: { href: "/algo/sebi-rules-algo-trading", label: "SEBI rules & algo" },
  optimus: { href: "/algo/optimus", label: "Optimus programme" },
  calculators: { href: "/calculators", label: "Calculators" },
  contact: { href: "/contact", label: "Contact" },
  choosePms: { href: "/blog/how-to-choose-pms", label: "How to choose a PMS" },
  checklist: { href: "/blog/pms-investor-checklist", label: "PMS investor checklist" },
  riskProfile: { href: "/blog/understanding-risk-profile", label: "Understanding risk profile" },
  taxGuide: { href: "/blog/tax-on-pms-returns", label: "Tax on PMS returns (themes)" },
  momentum: { href: "/blog/momentum-investing-india", label: "Momentum investing in India" },
  cmpPolarisSc: { href: "/blog/polaris-vs-smallcase", label: "Polaris vs smallcase" },
  cmpOptimusMf: { href: "/blog/optimus-vs-mutual-fund", label: "Optimus vs mutual fund" },
  cmpOptimusBees: { href: "/blog/optimus-vs-niftybees", label: "Optimus vs Nifty BeES" },
  cmpPmsAif: { href: "/blog/pms-vs-aif", label: "PMS vs AIF" },
  modelPortfolios: { href: "/model-portfolios", label: "Model portfolios" },
  blog: { href: "/blog", label: "Blog" },
  algoLegalIndia: {
    href: "/blog/is-algo-trading-legal-india",
    label: "Is algo trading legal in India?",
  },
  stockLossDrawdownGuide: {
    href: "/blog/stock-loss-drawdown-recovery-guide",
    label: "Stock loss & drawdown recovery guide",
  },
  drawdownCalculator: {
    href: "/calculators/drawdown-recovery",
    label: "Drawdown recovery calculator",
  },
} as const;

const DEFAULT_LINKS: PillarInterlink[] = [
  CORE.guides,
  CORE.compare,
  CORE.disclosures,
  CORE.calculators,
  CORE.contact,
];

/** Paths that receive the related-reading block */
const INTERLINKS: Record<string, PillarInterlink[]> = {
  "/team/punam-kucheria": [
    CORE.disclosures,
    CORE.guides,
    CORE.polaris,
    CORE.howPms,
    CORE.contact,
  ],
  "/disclosures": [
    CORE.guides,
    CORE.compare,
    CORE.pms,
    CORE.choosePms,
    CORE.contact,
  ],
  "/pms/how-pms-works": [
    CORE.choosePms,
    CORE.checklist,
    CORE.pmsVsMf,
    CORE.pmsTax,
    CORE.polaris,
  ],
  "/pms/pms-vs-mutual-funds": [
    CORE.pmsVsSc,
    CORE.cmpPmsAif,
    CORE.howPms,
    CORE.polaris,
    CORE.taxGuide,
  ],
  "/pms/pms-vs-smallcase": [
    CORE.pmsVsMf,
    CORE.smallcaseVsDirect,
    CORE.cmpPolarisSc,
    CORE.polaris,
  ],
  "/pms/pms-taxation-india": [
    CORE.taxGuide,
    CORE.pmsVsMf,
    CORE.checklist,
    CORE.disclosures,
  ],
  "/algo/what-is-algo-trading": [
    CORE.algoLegalIndia,
    CORE.sebiAlgo,
    CORE.optimus,
    CORE.cmpOptimusMf,
    CORE.guides,
  ],
  "/algo/sebi-rules-algo-trading": [
    CORE.whatAlgo,
    CORE.algoLegalIndia,
    CORE.optimus,
    CORE.disclosures,
    CORE.contact,
  ],
  "/model-portfolios/smallcase-vs-direct": [
    CORE.cmpPolarisSc,
    CORE.pmsVsSc,
    CORE.modelPortfolios,
    CORE.disclosures,
  ],
  "/blog/guides": [
    CORE.compare,
    CORE.choosePms,
    CORE.riskProfile,
    CORE.calculators,
  ],
  "/blog/how-to-choose-pms": [
    CORE.checklist,
    CORE.riskProfile,
    CORE.howPms,
    CORE.polaris,
    CORE.disclosures,
  ],
  "/blog/pms-investor-checklist": [
    CORE.choosePms,
    CORE.taxGuide,
    CORE.pmsTax,
    CORE.contact,
  ],
  "/blog/understanding-risk-profile": [
    CORE.choosePms,
    CORE.calculators,
    CORE.momentum,
    CORE.pms,
  ],
  "/blog/tax-on-pms-returns": [
    CORE.pmsTax,
    CORE.checklist,
    CORE.stockLossDrawdownGuide,
    CORE.pmsVsMf,
    CORE.disclosures,
  ],
  "/blog/is-algo-trading-legal-india": [
    CORE.whatAlgo,
    CORE.sebiAlgo,
    CORE.algo,
    CORE.disclosures,
  ],
  "/blog/stock-loss-drawdown-recovery-guide": [
    CORE.drawdownCalculator,
    CORE.riskProfile,
    CORE.guides,
    CORE.disclosures,
  ],
  "/blog/momentum-investing-india": [
    CORE.polaris,
    CORE.whatAlgo,
    CORE.riskProfile,
    CORE.blog,
  ],
  "/blog/compare": [
    CORE.cmpPolarisSc,
    CORE.cmpOptimusMf,
    CORE.cmpOptimusBees,
    CORE.cmpPmsAif,
    CORE.guides,
  ],
  "/blog/polaris-vs-smallcase": [
    CORE.polaris,
    CORE.smallcaseVsDirect,
    CORE.pmsVsSc,
    CORE.choosePms,
  ],
  "/blog/optimus-vs-mutual-fund": [
    CORE.optimus,
    CORE.whatAlgo,
    CORE.cmpOptimusBees,
    CORE.riskProfile,
  ],
  "/blog/optimus-vs-niftybees": [
    CORE.optimus,
    CORE.cmpOptimusMf,
    CORE.whatAlgo,
    CORE.modelPortfolios,
  ],
  "/blog/pms-vs-aif": [
    CORE.howPms,
    CORE.pmsVsMf,
    CORE.choosePms,
    CORE.disclosures,
  ],
};

export function getPillarInterlinks(pathname: string): PillarInterlink[] {
  const exact = INTERLINKS[pathname];
  if (exact?.length) return dedupeLinks(exact);
  return dedupeLinks(DEFAULT_LINKS);
}

function dedupeLinks(links: PillarInterlink[]): PillarInterlink[] {
  const seen = new Set<string>();
  const out: PillarInterlink[] = [];
  for (const l of links) {
    if (seen.has(l.href)) continue;
    seen.add(l.href);
    out.push(l);
  }
  return out;
}
