/**
 * Performance blocks below are synced from smallcase index-series CSV export
 * (sc_mynella_indexSeries_2026-03-26). Last row in files ≈ 2026-03-25.
 * CAGR and period returns are computed from normalized index levels (100 at series start).
 */

export type Platform = {
  name: string;
  slug: string;
  href: string | null;
  logo?: string;
};

export type ReturnPeriod = {
  label: string;
  portfolio: string;
  benchmark: string;
};

export type PerformanceData = {
  inceptionDate: string;
  cagr: string;
  benchmarkName: string;
  benchmarkCagr: string;
  returns: ReturnPeriod[];
};

/** Optional CMS copy for portfolio detail chrome (labels + disclaimers). */
export type PortfolioUiCopy = {
  overviewEyebrow?: string;
  overviewTitle?: string;
  methodologyColumnTitle?: string;
  performanceEyebrow?: string;
  performanceTitle?: string;
  performanceDisclaimer?: string;
  suitableEyebrow?: string;
  suitableTitle?: string;
  subscribeEyebrow?: string;
  subscribeTitle?: string;
  subscribeLead?: string;
  platformDisclaimer?: string;
};

export type PortfolioData = {
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
  platforms: Platform[];
  performance: PerformanceData;
  ui?: PortfolioUiCopy;
};

function makeSmallcasePlatform(href: string): Platform {
  return { name: "smallcase", slug: "smallcase", href };
}

function makePlaceholderPlatforms(): Platform[] {
  return [
    { name: "Dhan", slug: "dhan", href: null },
    { name: "Cirrus", slug: "cirrus", href: null },
    { name: "Motilal Oswal", slug: "motilal-oswal", href: null },
  ];
}

export const quantoPortfolios: PortfolioData[] = [
  {
    slug: "large-cap",
    family: "quanto",
    name: "Quanto Large Cap",
    tagline: "Systematic exposure to India's blue-chip companies",
    description:
      "A quantitative model portfolio focused on India's top 100 companies by market capitalization. Designed to deliver stable, risk-managed returns through systematic factor-based selection — targeting consistent alpha over the Nifty 100 benchmark.",
    universe: "Nifty 100",
    rebalance: "Quarterly",
    minInvestment: "Varies by platform",
    riskProfile: "Low–Medium",
    methodology: [
      "Multi-factor scoring combining momentum, quality, and value signals",
      "Market-cap weighted allocation within the Nifty 100 universe",
      "Quarterly rebalancing with systematic entry/exit rules",
      "Drawdown management through position sizing and diversification",
    ],
    suitableFor: [
      "Investors seeking equity exposure with lower volatility",
      "Those looking for a systematic alternative to large-cap mutual funds",
      "Long-term wealth compounding with institutional-grade discipline",
    ],
    platforms: [
      makeSmallcasePlatform("https://mynella.smallcase.com/smallcase/CLIMMX_0002"),
      ...makePlaceholderPlatforms(),
    ],
    performance: {
      inceptionDate: "Sept 2025",
      cagr: "42.4%",
      benchmarkName: "NIFTY 100",
      benchmarkCagr: "-11.2%",
      returns: [
        { label: "6M", portfolio: "16.6%", benchmark: "-7.6%" },
        { label: "Since inception", portfolio: "21.0%", benchmark: "-6.2%" },
      ],
    },
  },
  {
    slug: "multi-cap",
    family: "quanto",
    name: "Quanto Multi Cap",
    tagline: "Diversified quant exposure across all market capitalizations",
    description:
      "A quantitative multi-cap model portfolio that dynamically allocates across large, mid, and small-cap segments. Uses factor-based signals to identify the best risk-adjusted opportunities across the entire Indian equity spectrum.",
    universe: "NSE 500+",
    rebalance: "Quarterly",
    minInvestment: "Varies by platform",
    riskProfile: "Medium",
    methodology: [
      "Dynamic cap-segment allocation driven by momentum and breadth signals",
      "Multi-factor stock selection across the entire market-cap spectrum",
      "Quarterly rebalancing with tactical overweight/underweight across segments",
      "Built-in diversification across sectors and market caps",
    ],
    suitableFor: [
      "Investors wanting broad market exposure without active cap-segment timing",
      "Those seeking a single-portfolio solution across all cap segments",
      "Medium-term to long-term systematic wealth creation",
    ],
    platforms: [
      makeSmallcasePlatform("https://mynella.smallcase.com/smallcase/CLIMMX_0005"),
      ...makePlaceholderPlatforms(),
    ],
    performance: {
      inceptionDate: "Sept 2025",
      cagr: "18.5%",
      benchmarkName: "NIFTY 100",
      benchmarkCagr: "-11.1%",
      returns: [
        { label: "Since inception", portfolio: "8.6%", benchmark: "-5.5%" },
      ],
    },
  },
  {
    slug: "flexi-cap",
    family: "quanto",
    name: "Quanto Flexi Cap",
    tagline: "Flexible allocation with quant-driven conviction",
    description:
      "A flexi-cap model portfolio with no fixed cap-segment mandate. Uses quantitative signals to go where the opportunity is — concentrating in large, mid, or small caps based on market regime and factor momentum.",
    universe: "NSE 500+",
    rebalance: "Quarterly",
    minInvestment: "Varies by platform",
    riskProfile: "Medium–High",
    methodology: [
      "Unconstrained allocation — no fixed large/mid/small cap ratio",
      "Regime-aware factor model adjusts exposure to prevailing market conditions",
      "Concentrated high-conviction picks across the NSE 500+ universe",
      "Quarterly rebalancing with discretionary overlays for extreme conditions",
    ],
    suitableFor: [
      "Investors comfortable with flexible, opportunity-driven allocation",
      "Those who want quant discipline without rigid cap-segment constraints",
      "Wealth builders with a 3–5 year horizon and moderate risk appetite",
    ],
    platforms: [
      makeSmallcasePlatform("https://mynella.smallcase.com/smallcase/CLIMMO_0005"),
      ...makePlaceholderPlatforms(),
    ],
    performance: {
      inceptionDate: "Jul 2024",
      cagr: "8.0%",
      benchmarkName: "NIFTY 100",
      benchmarkCagr: "-2.8%",
      returns: [
        { label: "6M", portfolio: "1.9%", benchmark: "-7.6%" },
        { label: "1Y", portfolio: "18.3%", benchmark: "-1.0%" },
        { label: "Since inception", portfolio: "14.3%", benchmark: "-4.8%" },
      ],
    },
  },
  {
    slug: "small-cap",
    family: "quanto",
    name: "Quanto Small Cap",
    tagline: "High-growth potential from India's emerging companies",
    description:
      "A quantitative small-cap model portfolio targeting high-growth opportunities in India's emerging company segment. Applies strict quality and momentum filters to navigate the higher-volatility small-cap space with discipline.",
    universe: "Nifty Smallcap 250",
    rebalance: "Quarterly",
    minInvestment: "Varies by platform",
    riskProfile: "High",
    methodology: [
      "Quality-first screening eliminates weak balance sheets and governance risks",
      "Momentum and earnings-growth factors drive stock selection",
      "Position sizing accounts for liquidity and volatility constraints",
      "Quarterly rebalancing with tighter stop-loss discipline than larger-cap portfolios",
    ],
    suitableFor: [
      "Investors with high risk tolerance and a 5+ year investment horizon",
      "Those seeking alpha from India's under-researched small-cap segment",
      "Satellite allocation alongside large-cap core holdings",
    ],
    platforms: [
      makeSmallcasePlatform("https://mynella.smallcase.com/smallcase/CLIMMX_0003"),
      ...makePlaceholderPlatforms(),
    ],
    performance: {
      inceptionDate: "Sept 2025",
      cagr: "10.4%",
      benchmarkName: "NIFTY 100",
      benchmarkCagr: "-11.2%",
      returns: [
        { label: "6M", portfolio: "7.6%", benchmark: "-7.6%" },
        { label: "Since inception", portfolio: "5.5%", benchmark: "-6.2%" },
      ],
    },
  },
  {
    slug: "mid-cap",
    family: "quanto",
    name: "Quanto Mid Cap",
    tagline: "The sweet spot — growth with manageable risk",
    description:
      "A quantitative mid-cap model portfolio focused on India's next tier of market leaders. Targets the mid-cap segment's structural growth advantage while managing downside through systematic factor-based selection.",
    universe: "Nifty Midcap 150",
    rebalance: "Quarterly",
    minInvestment: "Varies by platform",
    riskProfile: "Medium–High",
    methodology: [
      "Blend of momentum, quality, and value factors tuned for mid-cap dynamics",
      "Sector diversification prevents over-concentration in trending themes",
      "Quarterly rebalancing captures mid-cap rotation opportunities",
      "Volatility-adjusted position sizing for smoother ride",
    ],
    suitableFor: [
      "Investors seeking higher growth than large-caps with controlled risk",
      "Those with a 3–5 year horizon looking for systematic mid-cap exposure",
      "Core-satellite strategy — mid-cap as the growth engine",
    ],
    platforms: [
      makeSmallcasePlatform("https://mynella.smallcase.com/smallcase/CLIMMX_0001"),
      ...makePlaceholderPlatforms(),
    ],
    performance: {
      inceptionDate: "Sept 2025",
      cagr: "27.7%",
      benchmarkName: "NIFTY 100",
      benchmarkCagr: "-11.2%",
      returns: [
        { label: "6M", portfolio: "10.0%", benchmark: "-7.6%" },
        { label: "Since inception", portfolio: "14.1%", benchmark: "-6.2%" },
      ],
    },
  },
  {
    slug: "microcap",
    family: "quanto",
    name: "Quanto Microcap",
    tagline: "Venture-style equity in listed micro-cap opportunities",
    description:
      "A quantitative microcap model portfolio venturing into India's smallest listed companies. Applies rigorous quantitative filters to find hidden gems with strong fundamentals in the most volatile and rewarding corner of the market.",
    universe: "Sub-Nifty Smallcap 250",
    rebalance: "Quarterly",
    minInvestment: "Varies by platform",
    riskProfile: "Very High",
    methodology: [
      "Strict liquidity, governance, and fundamental quality gates",
      "Earnings momentum and insider activity signals for conviction",
      "Smaller position sizes and wider diversification to manage single-stock risk",
      "Quarterly rebalancing with active monitoring for corporate events",
    ],
    suitableFor: [
      "Sophisticated investors with very high risk tolerance",
      "Those with a 5–7 year horizon comfortable with significant drawdowns",
      "Small satellite allocation (5–15% of total portfolio)",
    ],
    platforms: [
      makeSmallcasePlatform("https://mynella.smallcase.com/smallcase/CLIMMX_0004"),
      ...makePlaceholderPlatforms(),
    ],
    performance: {
      inceptionDate: "Sept 2025",
      cagr: "1.1%",
      benchmarkName: "NIFTY 100",
      benchmarkCagr: "-11.2%",
      returns: [
        { label: "6M", portfolio: "4.0%", benchmark: "-7.6%" },
        { label: "Since inception", portfolio: "0.6%", benchmark: "-6.2%" },
      ],
    },
  },
];

export const alphaPortfolios: PortfolioData[] = [
  {
    slug: "alpha-100",
    family: "alpha",
    name: "Alpha 100",
    tagline: "10 high-conviction picks from India's top 100",
    description:
      "A concentrated momentum portfolio of 10 stocks drawn from the Nifty 100 universe. Targets blue-chip momentum plays with a medium-risk profile, delivering significantly higher returns than the benchmark through precise, algorithm-driven stock selection.",
    universe: "Nifty 100",
    rebalance: "Monthly",
    minInvestment: "Varies by platform",
    riskProfile: "Medium",
    methodology: [
      "Momentum-first stock selection from the Nifty 100 universe",
      "Concentrated 10-stock portfolio for maximum conviction",
      "Monthly rebalancing captures shorter-term momentum cycles",
      "Risk-managed through universe constraint — only blue-chip stocks",
    ],
    suitableFor: [
      "Investors seeking alpha over Nifty 100 with a concentrated, high-conviction approach",
      "Those comfortable with monthly turnover and concentrated positions",
      "Core portfolio allocation for momentum-oriented investors",
    ],
    platforms: [
      makeSmallcasePlatform("https://mynella.smallcase.com/smallcase/CLIMMO_0004"),
      ...makePlaceholderPlatforms(),
    ],
    performance: {
      inceptionDate: "Jan 2024",
      cagr: "9.5%",
      benchmarkName: "NIFTY Multi Cap",
      benchmarkCagr: "4.6%",
      returns: [
        { label: "6M", portfolio: "-3.2%", benchmark: "-7.9%" },
        { label: "1Y", portfolio: "0.6%", benchmark: "0.2%" },
        { label: "2Y", portfolio: "8.3%", benchmark: "7.4%" },
        { label: "Since inception", portfolio: "22.1%", benchmark: "10.4%" },
      ],
    },
  },
  {
    slug: "alpha-200",
    family: "alpha",
    name: "Alpha 200",
    tagline: "Momentum-driven picks from the broader Nifty 200",
    description:
      "A momentum-driven model portfolio selecting top-performing stocks from the Nifty 200 universe. Wider opportunity set than Alpha 100, capturing mid-cap momentum alongside large-cap leaders for a balanced growth profile.",
    universe: "Nifty 200",
    rebalance: "Monthly",
    minInvestment: "Varies by platform",
    riskProfile: "Medium–High",
    methodology: [
      "Momentum and relative-strength screening across 200 stocks",
      "Dynamic allocation between large and mid-cap segments based on momentum breadth",
      "Monthly rebalancing adapts to shifting market leadership",
      "Quality filter prevents momentum traps in deteriorating fundamentals",
    ],
    suitableFor: [
      "Investors who want broader momentum exposure beyond the top 100",
      "Those seeking a blend of large-cap stability and mid-cap growth",
      "Momentum-strategy enthusiasts with a 1–3 year allocation horizon",
    ],
    platforms: [
      makeSmallcasePlatform("https://mynella.smallcase.com/smallcase/CLIMMO_0002"),
      ...makePlaceholderPlatforms(),
    ],
    performance: {
      inceptionDate: "Sept 2023",
      cagr: "21.5%",
      benchmarkName: "NIFTY 100",
      benchmarkCagr: "8.3%",
      returns: [
        { label: "6M", portfolio: "0.4%", benchmark: "-7.6%" },
        { label: "1Y", portfolio: "4.5%", benchmark: "-1.0%" },
        { label: "2Y", portfolio: "19.7%", benchmark: "5.7%" },
        { label: "Since inception", portfolio: "64.4%", benchmark: "22.7%" },
      ],
    },
  },
  {
    slug: "alpha-500",
    family: "alpha",
    name: "Alpha 500",
    tagline: "Full-spectrum momentum across the entire NSE 500",
    description:
      "The broadest Alpha portfolio, scanning the entire NSE 500 universe for the strongest momentum opportunities. Unconstrained by cap-segment, this portfolio goes where the momentum is — large, mid, or small.",
    universe: "NSE 500",
    rebalance: "Monthly",
    minInvestment: "Varies by platform",
    riskProfile: "High",
    methodology: [
      "Full-universe momentum scan across 500 stocks for maximum opportunity set",
      "Cap-agnostic selection — follows momentum regardless of company size",
      "Monthly rebalancing with sector-level diversification constraints",
      "Multi-signal approach combining price momentum, volume, and earnings momentum",
    ],
    suitableFor: [
      "Aggressive investors who want full-spectrum momentum exposure",
      "Those comfortable with higher turnover and broader risk",
      "Satellite allocation for investors seeking outsized alpha potential",
    ],
    platforms: [
      makeSmallcasePlatform("https://mynella.smallcase.com/smallcase/CLIMMO_0003"),
      ...makePlaceholderPlatforms(),
    ],
    performance: {
      inceptionDate: "Sept 2023",
      cagr: "9.6%",
      benchmarkName: "NIFTY Multi Cap",
      benchmarkCagr: "9.1%",
      returns: [
        { label: "6M", portfolio: "-8.3%", benchmark: "-7.9%" },
        { label: "1Y", portfolio: "0.2%", benchmark: "0.2%" },
        { label: "2Y", portfolio: "7.2%", benchmark: "7.4%" },
        { label: "Since inception", portfolio: "26.5%", benchmark: "25.0%" },
      ],
    },
  },
];

export function getPortfolio(
  family: "quanto" | "alpha",
  slug: string,
): PortfolioData | undefined {
  const list = family === "quanto" ? quantoPortfolios : alphaPortfolios;
  return list.find((p) => p.slug === slug);
}

export function getPortfoliosByFamily(
  family: "quanto" | "alpha",
): PortfolioData[] {
  return family === "quanto" ? quantoPortfolios : alphaPortfolios;
}
