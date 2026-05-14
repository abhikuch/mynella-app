/** FY 2025–26 PMS performance report — content source: mynella-performance-report.html */

export const reportMeta = {
  slug: "fy-2025-26-performance",
  title: "FY 2025–26 Performance Report",
  subtitle: "Polaris PMS & Optimus — annual review",
  period: "April 2025 — March 2026",
  publishedLabel: "March 2026",
};

/** Headline Nifty 50 return for footnotes and alpha copy */
export const nifty50ReturnDisplay = "−8.23%";

export const heroMetrics = [
  {
    label: "Polaris Return",
    value: "+0.63%",
    sub: "Till March 2026 · vs Nifty 50 at −8.23%",
    tone: "positive" as const,
  },
  {
    label: "Optimus Return",
    value: "+45.88%",
    sub: "Volatility capture — full year",
    tone: "accent" as const,
  },
  {
    label: "Nifty 50",
    value: "−8.23%",
    sub: "Benchmark — FY 2025–26",
    tone: "negative" as const,
  },
  {
    label: "Nifty 500",
    value: "−6.82%",
    sub: "Benchmark — FY 2025–26",
    tone: "negative" as const,
  },
];

export const heroSub =
  "FY 2025–26 punished passive equity: broad indices finished with negative returns from about −6.8% (Nifty 500) to −8.2% (Nifty 50), with peak drawdowns near 14–15% and negative Sharpe/Sortino on all three benchmarks. MyNella strategies diverged — Polaris delivered a modest absolute gain with positive Sortino versus indices in the red; Optimus compounded at a strong double-digit return with Sharpe and Sortino above 1.";

export const contextCopy = {
  titleLine1: "FY 2025–26 — A harsh tape",
  titleEm: "for buy-and-hold indices.",
  paragraphs: [
    "The year was defined by uneven trends, repeated risk-off phases, and stretches where broad Indian equities simply did not reward exposure. Nifty 50, Nifty 100, and Nifty 500 all finished the period with meaningfully negative returns — not a shallow dip, but a full-year headwind for long-only benchmarks.",
    "Peak-to-trough stress was material: maximum drawdowns clustered around 14–15% across these indices, while average drawdowns stayed negative through the cycle — the classic profile of a year where patience alone did not pay.",
    "In that setting, capital preservation and asymmetry mattered. Polaris aimed for steady, process-driven participation in equities; Optimus was positioned to harvest volatility when regimes shifted. Both reported outcomes that diverged from the benchmark experience — in scale and in character.",
  ],
  blockquote:
    '"All pain, no Sharpe" — how broad indices felt for many allocators in FY 2025–26: deep enough drawdowns with negative risk-adjusted returns.',
};

export const performanceSnapshotLead =
  "Metrics through March 2026: MyNella mandates vs Nifty 50, Nifty 100, and Nifty 500 (returns, drawdowns, Sharpe, Sortino).";

export const polarisStrategy = {
  href: "/pms/polaris" as const,
  badge: "Core Allocation",
  description:
    "Discretionary PMS focused on conviction, risk control, and compounding across cycles — tested in a year when indices did not cooperate.",
  kpis: [
    { label: "Return", value: "+0.63%", tone: "positive" as const },
    { label: "Max DD", value: "−17.75%", tone: "negative" as const },
    { label: "Sharpe", value: "0.12", tone: "accent" as const },
    { label: "Sortino", value: "0.25", tone: "accent" as const },
  ],
  bullets: [
    "Positive absolute return through March 2026 while Nifty 50 returned −8.23%, Nifty 100 about −7.9%, and Nifty 500 about −6.8% — meaningful relative resilience",
    "Sortino 0.25 and Sharpe 0.12 vs negative Sharpe/Sortino on all three headline indices — better downside-efficiency signature than passive beta",
    "Drawdowns were real (max −17.75%) but sat in line with a difficult equity year; average drawdown −4.06% reflects shorter, shallower stress than max peak-to-trough",
    "Narrative shift: this was not a high-teens Polaris return year — it was a capital-preservation-and-process year versus a benchmark rout",
  ],
  quote:
    "Polaris does not promise outperformance every year — it promises a disciplined mandate. In FY 2025–26, that showed up as staying afloat while indices sank.",
};

export const optimusStrategy = {
  href: "/algo/optimus" as const,
  badge: "Alpha Generator",
  description:
    "Algorithmic options-buying designed for asymmetric payoffs when volatility expands — returns remain episodic and path-dependent by design.",
  kpis: [
    { label: "Return", value: "+45.88%", tone: "positive" as const },
    { label: "Max DD", value: "−26.13%", tone: "negative" as const },
    { label: "Sharpe", value: "1.04", tone: "accent" as const },
    { label: "Sortino", value: "1.14", tone: "accent" as const },
  ],
  bullets: [
    "Full-year return 45.88% with Sharpe 1.04 and Sortino 1.14 — strong risk-adjusted outcome versus benchmarks at negative Sharpe/Sortino",
    "Return profile remains concentrated: a minority of high-volatility months typically drive most of the year — check the month-by-month strip for timing context",
    "Max drawdown −26.13% and average drawdown −8.26% reflect the cost of harvesting convexity — not every month participates",
    "Optimus is not a substitute for core equity; it is a volatility sleeve for investors who accept drawdowns in exchange for asymmetry",
  ],
  quote: "Optimus is not designed for consistency — it is designed for asymmetry when conditions align.",
};

export const monthlyInsights = [
  {
    variant: "default" as const,
    stat: null as string | null,
    statTone: null as "positive" | "negative" | null,
    title: "Where the alpha came from",
    body:
      "Volatility-oriented strategies tend to print in bursts: a handful of months often explain most of the annual outcome. That pattern is visible in the monthly series — concentrated wins separated by quieter or negative stretches.",
  },
  {
    variant: "default" as const,
    stat: "Episodic",
    statTone: "positive" as const,
    title: "Return vs calendar path",
    body:
      "The published ~45.9% return is a compound summary; it does not imply linear monthly progress. Large positive months can coexist with sharp drawdown months (e.g. stress during low-volatility or wrong-regime phases) within the same fiscal year.",
  },
  {
    variant: "default" as const,
    stat: "−26.13%",
    statTone: "negative" as const,
    title: "Maximum drawdown context",
    body:
      "The worst peak-to-trough episode in the series remains material (−26.13%). That is consistent with a long-volatility, options-buying engine — investors should budget emotionally and in portfolio sizing for that magnitude of swing.",
  },
  {
    variant: "highlight" as const,
    stat: null,
    statTone: null,
    title: "The key insight",
    body:
      "Optimus returns come in bursts, not linearly. Expect flat or painful intervals between events — that is the strategy working as designed, not a malfunction.",
  },
];

export const keyMessage = {
  title:
    "Different strategies require different expectations. Misaligned expectations lead to poor investment decisions.",
  body: "Understanding what a strategy is designed to do — and what it is not — is the most important factor in determining whether it is right for your portfolio.",
};

export const disclaimer =
  "Past performance is not indicative of future results. Investments in securities markets are subject to market risks. Returns stated are for the period indicated and may not be replicated. This report is for informational purposes only and does not constitute investment advice. SEBI Registered Portfolio Manager: REG-NUMBER-PMS. Research Analyst: REG-NUMBER-RA.";

export const benchmarkRows = [
  { name: "Nifty 100", cagr: "−7.92%", dd: "−14.45%", avgDd: "−2.61%" },
  { name: "Nifty 50", cagr: "−8.23%", dd: "−14.78%", avgDd: "−2.76%" },
  { name: "Nifty 500", cagr: "−6.82%", dd: "−14.23%", avgDd: "−2.74%" },
];

export const alphaVsNifty50 = [
  { label: "Polaris", value: "+8.86%", tone: "positive" as const, widthPct: 100 },
  { label: "Optimus", value: "+54.11%", tone: "accent" as const, widthPct: 100 },
  { label: "N100", value: "+0.31%", tone: "muted" as const, widthPct: 12 },
  { label: "N500", value: "+1.41%", tone: "muted" as const, widthPct: 14 },
];

export const polarisVsBenchmarkBars = [
  { label: "Polaris", value: "+0.63%", tone: "positive" as const, widthPct: 100 },
  { label: "Nifty 50", value: "−8.23%", tone: "negative" as const, widthPct: 100 },
  { label: "Nifty 500", value: "−6.82%", tone: "negative" as const, widthPct: 83 },
];

export const optimusBigMonthBars = [
  { label: "Apr '25", value: "+26.12%", tone: "positive" as const, widthPct: 100 },
  { label: "Oct '25", value: "+25.43%", tone: "accent" as const, widthPct: 97 },
  { label: "Feb '25", value: "+12.22%", tone: "positive" as const, widthPct: 47 },
  { label: "Nov '25", value: "−26.13%", tone: "negative" as const, widthPct: 100 },
];

export const performanceSnapshotRows = [
  {
    name: "Nifty 100",
    role: "Benchmark" as const,
    cagr: "−7.92%",
    dd: "−14.45%",
    avgDd: "−2.61%",
    sharpe: "−0.53",
    sortino: "−0.53",
    highlight: false,
  },
  {
    name: "Nifty 50",
    role: "Benchmark" as const,
    cagr: "−8.23%",
    dd: "−14.78%",
    avgDd: "−2.76%",
    sharpe: "−0.56",
    sortino: "−0.58",
    highlight: false,
  },
  {
    name: "Nifty 500",
    role: "Benchmark" as const,
    cagr: "−6.82%",
    dd: "−14.23%",
    avgDd: "−2.74%",
    sharpe: "−0.43",
    sortino: "−0.44",
    highlight: false,
  },
  {
    name: "Optimus",
    role: "Alpha" as const,
    cagr: "+45.88%",
    dd: "−26.13%",
    avgDd: "−8.26%",
    sharpe: "1.04",
    sortino: "1.14",
    highlight: true,
  },
  {
    name: "Polaris (through Mar 2026)",
    role: "Core PMS" as const,
    cagr: "+0.63%",
    dd: "−17.75%",
    avgDd: "−4.06%",
    sharpe: "0.12",
    sortino: "0.25",
    highlight: true,
  },
];

export const calloutCards = [
  {
    kicker: "Polaris edge",
    stat: "+8.86%",
    body: "Excess return vs Nifty 50 with positive Sortino (0.25) while the index posted negative Sharpe/Sortino — relative strength in a down year.",
    tone: "positive" as const,
  },
  {
    kicker: "Optimus edge",
    stat: "45.88%",
    body: "Return with Sharpe 1.04 and Sortino 1.14 — asymmetry delivered alongside materially better risk-adjusted metrics than broad equity beta.",
    tone: "accent" as const,
  },
  {
    kicker: "Benchmarks",
    stat: "−0.56",
    body: "Nifty 50 Sharpe −0.56 / Sortino −0.58; sister indices similarly negative — a year where taking passive equity risk did not pay on a risk-adjusted basis.",
    tone: "negative" as const,
  },
];

export const optimusMonthly = [
  { month: "Jan 2025", ret: -0.28, big: null as "win" | "loss" | null },
  { month: "Feb 2025", ret: 12.22, big: "win" },
  { month: "Mar 2025", ret: 3.07, big: null },
  { month: "Apr 2025", ret: 26.12, big: "win" },
  { month: "May 2025", ret: -0.3, big: null },
  { month: "Jun 2025", ret: 3.98, big: null },
  { month: "Jul 2025", ret: 2.26, big: null },
  { month: "Aug 2025", ret: -2.2, big: null },
  { month: "Sep 2025", ret: 1.25, big: null },
  { month: "Oct 2025", ret: 25.43, big: "win" },
  { month: "Nov 2025", ret: -26.13, big: "loss" },
  { month: "Dec 2025", ret: 3.07, big: null },
  { month: "Jan 2026", ret: 10.54, big: "win" },
  { month: "Feb 2026", ret: -2.11, big: null },
  { month: "Mar 2026", ret: 6.65, big: null },
];

const MAX_MO = 26.13;

export function monthlyBarWidth(ret: number): number {
  return Math.min(100, (Math.abs(ret) / MAX_MO) * 100);
}

export const polarisExpectations = [
  {
    title: "Multi-cycle compounding",
    desc: "Built for steady compounding over full cycles — not guaranteed outperformance every quarter.",
  },
  {
    title: "Patience in tracking",
    desc: "Short-term correlation with markets is normal; edge shows over 3–5+ year horizons.",
  },
  {
    title: "Drawdowns & recovery",
    desc: "Drawdowns occur; process aims for faster recovery than passive benchmarks through active risk management.",
  },
  {
    title: "Core allocation",
    desc: "Suited as a long-term anchor for wealth, alongside your broader plan.",
  },
];

export const optimusExpectations = [
  {
    title: "Sharp drawdowns",
    desc: "Large month-to-month swings are part of how the strategy harvests volatility — not necessarily malfunction.",
  },
  {
    title: "Quiet periods",
    desc: "Flat or muted stretches between major volatility events are expected.",
  },
  {
    title: "Burst returns",
    desc: "A minority of months typically drive most of the year — asymmetry by design.",
  },
  {
    title: "Tactical sleeve",
    desc: "Not a substitute for core equity; for investors who accept episodic risk.",
  },
];
