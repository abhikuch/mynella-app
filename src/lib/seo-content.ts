/**
 * Central, reviewable SEO titles and descriptions (marketing site).
 * Titles target ≤~60 chars; descriptions ≤~155 chars where noted.
 * Sanity `pageCopy` can override when seeded/edited.
 */

export type SeoEntry = { title: string; description: string };

export const SEO_CONTENT: Record<string, SeoEntry> = {
  "/": {
    title: "SEBI Registered PMS & Quant Strategies in India | MyNella",
    description:
      "MyNella is a SEBI-registered Portfolio Manager (REG-NUMBER-PMS) offering systematic PMS, quant algo strategies and model portfolios for ₹10L–₹5Cr+ investors across India.",
  },
  "/about": {
    title: "About MyNella — SEBI PMS & Research Analyst in Pune",
    description:
      "MyNella Consultancy — SEBI-registered Portfolio Manager (REG-NUMBER-PMS) and Research Analyst (REG-NUMBER-RA), based in Pune. Team, registrations, and systematic mandates for Indian investors.",
  },
  "/contact": {
    title: "Contact MyNella — Pune · Book a Strategy Call",
    description:
      "Book a strategy call on Cal.com or email admin@mynella.com. SEBI-registered Portfolio Manager & Research Analyst in Pune. We aim to respond within two business days.",
  },
  "/blog": {
    title: "Insights & Research — MyNella Blog",
    description:
      "Notes from the MyNella desk — annual reviews, market context, and how we think about systematic equity and risk for Indian investors.",
  },
  "/blog/fy-2025-26-performance": {
    title: "FY 2025–26 Performance Report | MyNella",
    description:
      "FY 2025–26 performance: Polaris PMS & Optimus vs Nifty 50, 100, and 500 — returns, drawdowns, and risk-adjusted metrics through March 2026.",
  },
  "/terms": {
    title: "Terms & Conditions | MyNella",
    description: "MyNella Terms & Conditions governing use of our services and materials.",
  },
  "/privacy": {
    title: "Privacy Policy | MyNella",
    description:
      "How MyNella collects, uses, and protects your information. For requests, use the Contact page.",
  },
  "/pms": {
    title: "PMS in India — SEBI-Registered Portfolio Management | MyNella",
    description:
      "SEBI-registered PMS (REG-NUMBER-PMS) — Polaris combines discretionary judgment with systematic equity selection. Minimum ₹50L, performance-aligned fees.",
  },
  "/pms/polaris": {
    title: "Polaris PMS — SEBI-Registered Discretionary Portfolio | MyNella",
    description:
      "SEBI-registered discretionary PMS — momentum and trend following, concentrated equity, performance-aligned fees from ₹50L. REG-NUMBER-PMS.",
  },
  "/algo": {
    title: "Algo Trading Strategies — SEBI Research Analyst | MyNella",
    description:
      "MyNella algo suite: Optimus, Pledge+, Polaris Lite — systematic equity and derivatives programs, each gated by suitability. REG-NUMBER-RA.",
  },
  "/algo/optimus": {
    title: "Optimus — Automated Options Strategy | MyNella",
    description:
      "Market-agnostic, automated options-buying strategy designed for absolute returns via systematic, rule-based execution. For qualified investors.",
  },
  "/algo/pledge-plus": {
    title: "Pledge+ — Margin-Enhanced F&O on Pledged Equity | MyNella",
    description:
      "Margin-enhanced directional F&O on pledged equity — incremental return without liquidating long-term holdings. Minimum ₹1 Cr. Risk disclosures apply.",
  },
  "/algo/pledge-plus-mini": {
    title: "Pledge+ Mini — Commodity F&O on Pledged Equity | MyNella",
    description:
      "A lower-ticket Pledge+ variant from ₹50L: margin-enhanced directional commodity futures and options on pledged equity, with systematic risk controls.",
  },
  "/algo/polaris-lite": {
    title: "Polaris Lite — Systematic Equity from ₹10L | MyNella",
    description:
      "Systematic equity under the Research Analyst framework from ₹10L — the Polaris engine at a lower ticket. REG-NUMBER-RA.",
  },
  "/model-portfolios": {
    title: "Model Portfolios — Quant-Driven Stock Baskets | MyNella",
    description:
      "Concentrated, data-driven model portfolios across market caps — momentum, quality, and quantitative discipline for Indian equities.",
  },
  "/model-portfolios/alpha": {
    title: "Alpha Model Portfolios — Momentum Stock Picks | MyNella",
    description:
      "Momentum-driven concentrated picks from Nifty 100, 200, and 500 universes — monthly rebalance, transparency in your demat.",
  },
  "/model-portfolios/quanto": {
    title: "Quanto Model Portfolios — Cap-Segment Strategies | MyNella",
    description:
      "Quantitative model portfolios by cap segment — Large, Mid, Small, Multi, Flexi, Microcap — factor-driven, systematic rebalancing.",
  },
  "/model-portfolios/alpha/alpha-100": {
    title: "Alpha 100 Model Portfolio | MyNella",
    description:
      "Top 10 momentum picks from the Nifty 100 universe — monthly rebalance, full transparency. For investors who accept concentration risk.",
  },
  "/model-portfolios/alpha/alpha-200": {
    title: "Alpha 200 Model Portfolio | MyNella",
    description:
      "High-conviction positions from the Nifty 200 universe — systematic momentum with monthly rebalancing.",
  },
  "/model-portfolios/alpha/alpha-500": {
    title: "Alpha 500 Model Portfolio | MyNella",
    description:
      "Broad-universe momentum — top 10 picks from Nifty 500 with disciplined monthly rebalancing.",
  },
  "/model-portfolios/quanto/large-cap": {
    title: "Quanto Large Cap Model Portfolio | MyNella",
    description:
      "Quantitative large-cap model focused on India’s top 100 companies — factor-based selection vs Nifty 100 benchmark framing.",
  },
  "/model-portfolios/quanto/mid-cap": {
    title: "Quanto Mid Cap Model Portfolio | MyNella",
    description:
      "Systematic mid-cap exposure with momentum and quality signals across the Nifty Midcap universe.",
  },
  "/model-portfolios/quanto/small-cap": {
    title: "Quanto Small Cap Model Portfolio | MyNella",
    description:
      "Small-cap model portfolio with factor-based risk management — higher volatility; suitability matters.",
  },
  "/model-portfolios/quanto/multi-cap": {
    title: "Quanto Multi Cap Model Portfolio | MyNella",
    description:
      "Dynamic allocation across large, mid, and small caps using multi-factor signals.",
  },
  "/model-portfolios/quanto/flexi-cap": {
    title: "Quanto Flexi Cap Model Portfolio | MyNella",
    description:
      "Flexible cap allocation adapting systematically across market caps based on factor signals.",
  },
  "/model-portfolios/quanto/microcap": {
    title: "Quanto Microcap Model Portfolio | MyNella",
    description:
      "Concentrated systematic microcap exposure with quantitative screening and disciplined rebalancing.",
  },
  "/calculators": {
    title: "Free Investment Calculators for Indian Investors | MyNella",
    description:
      "Free calculators for Indian investors: CAGR, doubling time, stock loss & drawdown recovery, fee drag, panic selling, compounding, and more — illustrative tools, no account required.",
  },
  "/calculators/cagr": {
    title: "CAGR Calculator — Compound Annual Growth Rate | MyNella",
    description:
      "Calculate CAGR from starting value, ending value, and years. Free compound annual growth rate tool for Indian investors.",
  },
  "/calculators/time-to-double": {
    title: "Time to Double Money Calculator — Rule of 72 | MyNella",
    description:
      "See how many years to a 100% return at any annual rate. Compare exact math with the Rule of 72.",
  },
  "/calculators/polaris-compounding": {
    title: "Polaris Compounding Calculator — Tax & Fee Cycles | MyNella",
    description:
      "Model doubling cycles with LTCG, performance fee, and withdrawal assumptions — illustrative compounding tool.",
  },
  "/calculators/growth-visualiser": {
    title: "10·20·30 Compounding Visualiser | MyNella",
    description:
      "See what ₹1 lakh becomes at 10%, 20%, and 30% CAGR over 5–40 years — compounding gap visualisation.",
  },
  "/calculators/drawdown-recovery": {
    title: "Stock Loss Recovery Calculator — Break-Even After Drawdown | MyNella",
    description:
      "Free stock loss recovery calculator: enter a portfolio drawdown and see the break-even return needed (drawdown asymmetry). Matches stock loss recovery & drawdown recovery searches—illustrative, not advice.",
  },
  "/calculators/panic-selling": {
    title: "Cost of Panic Selling Calculator | MyNella",
    description:
      "Illustrative cost of missing the best market days — behaviour and timing risk education.",
  },
  "/calculators/luxury-trap": {
    title: "Luxury Trap — Opportunity Cost Calculator | MyNella",
    description:
      "Estimate compounded opportunity cost of a large discretionary purchase versus investing.",
  },
  "/calculators/start-late": {
    title: "Cost of Starting Late — SIP Age Comparison | MyNella",
    description:
      "Compare wealth at retirement when starting SIP at different ages — same contribution, different outcomes.",
  },
  "/calculators/fee-destroyer": {
    title: "Fee Drag Calculator — Expense Ratio Impact | MyNella",
    description:
      "See how annual fees erode long-term wealth — illustrative mutual fund / fee drag visualisation.",
  },
  "/calculators/min-ticket": {
    title: "Minimum Ticket Checker — PMS & Mandates | MyNella",
    description:
      "Enter corpus to see which MyNella mandates may fit by minimum ticket — illustrative eligibility only.",
  },
  "/calculators/sleeve-sizer": {
    title: "Risk Profile Finder — Investor Questionnaire | MyNella",
    description:
      "Five questions to explore risk category — educational; not personal advice. See suitability disclaimers.",
  },
  "/calculators/martingale": {
    title: "Martingale / Averaging Down Risk Calculator | MyNella",
    description:
      "Illustrative capital required when averaging down — risk education, not a recommendation.",
  },
  "/calculators/retirement": {
    title: "Retirement Calculator — Real Number for Indian Investors | MyNella",
    description:
      "Inflation- and tax-aware retirement corpus calculator. Funds 25–30 years of withdrawals at the real rate of return, with a transparent SIP-gap solver. Every formula on screen.",
  },
  /* ——— Phase 2 scaffold routes ——— */
  "/team/punam-kucheria": {
    title: "Punam Kucheria — Director & Fund Manager | MyNella",
    description:
      "Leadership at MyNella — SEBI-registered PMS (REG-NUMBER-PMS) and Research Analyst (REG-NUMBER-RA) in Pune. Process, governance, and how to evaluate fit before you allocate.",
  },
  "/disclosures": {
    title: "Regulatory Disclosures — SEBI PMS & RA | MyNella",
    description:
      "Aggregated disclosures, charters, and compliance links for MyNella PMS and Research Analyst offerings.",
  },
  "/pms/how-pms-works": {
    title: "How PMS Works in India — Process & Suitability | MyNella",
    description:
      "What portfolio management service is, how onboarding works, and what investors should verify before investing.",
  },
  "/pms/pms-vs-mutual-funds": {
    title: "PMS vs Mutual Funds — Key Differences for Investors | MyNella",
    description:
      "Compare structure, minimums, customisation, taxation themes, and suitability — educational overview, not advice.",
  },
  "/pms/pms-vs-smallcase": {
    title: "PMS vs Smallcase — Which Fits Your Mandate? | MyNella",
    description:
      "Differences between discretionary PMS and smallcase baskets — execution, regulation, and ticket size themes.",
  },
  "/pms/pms-taxation-india": {
    title: "PMS Taxation in India — Themes Investors Should Discuss | MyNella",
    description:
      "High-level taxation themes for PMS investors — always confirm with a qualified tax advisor for your situation.",
  },
  "/algo/what-is-algo-trading": {
    title: "What Is Algo Trading in India? Meaning, Rules & Risks | MyNella",
    description:
      "What algo trading means in India: definitions, retail hype vs regulated programmes, and diligence before you trade or invest — educational; not legal advice. Read disclosures.",
  },
  "/algo/sebi-rules-algo-trading": {
    title: "SEBI Rules & Algo Trading — Compliance Overview | MyNella",
    description:
      "Orientation to regulatory context for algo strategies and research offerings — not legal advice.",
  },
  "/model-portfolios/smallcase-vs-direct": {
    title: "Smallcase vs Direct Equities — Model Portfolio Angles | MyNella",
    description:
      "How model baskets differ from direct stock picking — execution, discipline, and concentration themes.",
  },
  "/guides": {
    title: "Investor Guides — PMS, Risk & Tax Themes | MyNella",
    description:
      "Pillar guides for Indian investors considering PMS, algos, and model portfolios — process, risk, and checklist content.",
  },
  "/guides/how-to-choose-pms": {
    title: "How to Choose a PMS in India — Due Diligence Checklist | MyNella",
    description:
      "Framework for evaluating PMS providers — process, fit, and questions to ask. Educational only.",
  },
  "/guides/pms-investor-checklist": {
    title: "PMS Investor Checklist Before You Commit Capital | MyNella",
    description:
      "Document and process checklist before signing PMS agreements — suitability and disclosure themes.",
  },
  "/guides/understanding-risk-profile": {
    title: "Understanding Risk Profile for Equity Mandates | MyNella",
    description:
      "Why risk profiling matters for PMS and algo programs — volatility, horizon, and capacity for loss.",
  },
  "/guides/tax-on-pms-returns": {
    title: "PMS Tax Treatment in India — CA Checklist & Documentation | MyNella",
    description:
      "Tax treatment for PMS returns: gain themes, record-keeping, and questions for your CA—not personalised advice. India investors comparing “tax treatment for PMS” before filing.",
  },
  "/guides/is-algo-trading-legal-india": {
    title: "Is Algo Trading Legal in India? SEBI Context for Investors | MyNella",
    description:
      "Algo trading is not broadly banned; brokers, RA, PMS, and vendors operate under rules. Plain-English orientation—not legal advice. Links to what is algo trading & SEBI rules pages.",
  },
  "/guides/stock-loss-drawdown-recovery-guide": {
    title: "Stock Loss & Drawdown Recovery Guide — Break-Even Math | MyNella",
    description:
      "Why recovery return exceeds loss % after a drawdown; links to MyNella’s stock loss recovery calculator and risk guides—illustrative education for Indian investors.",
  },
  "/guides/momentum-investing-india": {
    title: "Momentum Investing in India — Systematic Equity Lens | MyNella",
    description:
      "What momentum strategies emphasise — discipline, turnover, and cycle risk. Not a recommendation.",
  },
  "/compare": {
    title: "Compare Strategies — PMS, Algos & Baskets | MyNella",
    description:
      "Side-by-side hub for MyNella offerings and common alternatives — educational comparisons.",
  },
  "/compare/polaris-vs-smallcase": {
    title: "Polaris PMS vs Smallcase — Comparison Overview | MyNella",
    description:
      "Structural comparison themes — not performance claims. Read disclosures and speak to us before investing.",
  },
  "/compare/optimus-vs-mutual-fund": {
    title: "Optimus Algo vs Mutual Funds — Structural Comparison | MyNella",
    description:
      "How an automated options program differs from mutual fund investing — risk, liquidity, and suitability.",
  },
  "/compare/optimus-vs-niftybees": {
    title: "Optimus vs Nifty BeES — ETF vs Options Programme | MyNella",
    description:
      "Structural comparison: index ETF exposure versus MyNella Optimus — liquidity, costs, and risk signatures. Educational only.",
  },
  "/compare/pms-vs-aif": {
    title: "PMS vs AIF — Structural Differences for Investors | MyNella",
    description:
      "High-level comparison of portfolio management service and alternative investment funds — regulatory and access themes.",
  },
  "/wealth-management-pune": {
    title: "Wealth Management in Pune — How to Compare Firms | MyNella",
    description:
      "Educational guide: wealth management and finance firms in Pune — SEBI PMS vs RA vs distribution, questions to ask, and how MyNella fits as a SEBI-registered manager.",
  },
};

/** Map Sanity `pageCopy.routeKey` → canonical pathname (for metadata fallback). */
export const ROUTE_KEY_TO_PATH: Record<string, string> = {
  home: "/",
  about: "/about",
  contact: "/contact",
  blog: "/blog",
  "blog-fy-2025-26-performance": "/blog/fy-2025-26-performance",
  terms: "/terms",
  privacy: "/privacy",
  calculators: "/calculators",
  pms: "/pms",
  "pms-polaris": "/pms/polaris",
  algo: "/algo",
  "algo-optimus": "/algo/optimus",
  "algo-pledge-plus": "/algo/pledge-plus",
  "algo-pledge-plus-mini": "/algo/pledge-plus-mini",
  "algo-polaris-lite": "/algo/polaris-lite",
  "model-portfolios": "/model-portfolios",
  "model-portfolios-alpha": "/model-portfolios/alpha",
  "model-portfolios-quanto": "/model-portfolios/quanto",
  "portfolio-quanto-large-cap": "/model-portfolios/quanto/large-cap",
  "portfolio-quanto-mid-cap": "/model-portfolios/quanto/mid-cap",
  "portfolio-quanto-small-cap": "/model-portfolios/quanto/small-cap",
  "portfolio-quanto-multi-cap": "/model-portfolios/quanto/multi-cap",
  "portfolio-quanto-flexi-cap": "/model-portfolios/quanto/flexi-cap",
  "portfolio-quanto-microcap": "/model-portfolios/quanto/microcap",
  "portfolio-alpha-alpha-100": "/model-portfolios/alpha/alpha-100",
  "portfolio-alpha-alpha-200": "/model-portfolios/alpha/alpha-200",
  "portfolio-alpha-alpha-500": "/model-portfolios/alpha/alpha-500",
  "calculator-cagr": "/calculators/cagr",
  "calculator-time-to-double": "/calculators/time-to-double",
  "calculator-polaris-compounding": "/calculators/polaris-compounding",
  "calculator-growth-visualiser": "/calculators/growth-visualiser",
  "calculator-drawdown-recovery": "/calculators/drawdown-recovery",
  "calculator-panic-selling": "/calculators/panic-selling",
  "calculator-luxury-trap": "/calculators/luxury-trap",
  "calculator-start-late": "/calculators/start-late",
  "calculator-fee-destroyer": "/calculators/fee-destroyer",
  "calculator-min-ticket": "/calculators/min-ticket",
  "calculator-sleeve-sizer": "/calculators/sleeve-sizer",
  "calculator-martingale": "/calculators/martingale",
  "calculator-retirement": "/calculators/retirement",
  "wealth-management-pune": "/wealth-management-pune",
};

/**
 * Canonical `/blog/{slug}` → legacy `SEO_CONTENT` key (same copy as `/guides/*` and `/compare/*`).
 * Keep aligned with `BLOG_STATIC_PAGES` in `src/lib/blog-static-registry.ts`.
 */
const BLOG_CANONICAL_TO_LEGACY_SEO_KEY: Record<string, string> = {
  "/blog/guides": "/guides",
  "/blog/compare": "/compare",
  "/blog/how-to-choose-pms": "/guides/how-to-choose-pms",
  "/blog/pms-investor-checklist": "/guides/pms-investor-checklist",
  "/blog/understanding-risk-profile": "/guides/understanding-risk-profile",
  "/blog/tax-on-pms-returns": "/guides/tax-on-pms-returns",
  "/blog/is-algo-trading-legal-india": "/guides/is-algo-trading-legal-india",
  "/blog/stock-loss-drawdown-recovery-guide": "/guides/stock-loss-drawdown-recovery-guide",
  "/blog/momentum-investing-india": "/guides/momentum-investing-india",
  "/blog/polaris-vs-smallcase": "/compare/polaris-vs-smallcase",
  "/blog/optimus-vs-mutual-fund": "/compare/optimus-vs-mutual-fund",
  "/blog/optimus-vs-niftybees": "/compare/optimus-vs-niftybees",
  "/blog/pms-vs-aif": "/compare/pms-vs-aif",
};

export function getSeoFallback(pathname: string): SeoEntry {
  const p = pathname === "" ? "/" : pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const legacyKey = BLOG_CANONICAL_TO_LEGACY_SEO_KEY[p];
  const hit = SEO_CONTENT[p] ?? (legacyKey ? SEO_CONTENT[legacyKey] : undefined);
  if (hit) return hit;
  return {
    title: "MyNella — SEBI PMS & Research Analyst",
    description:
      "SEBI-registered Portfolio Manager (REG-NUMBER-PMS) and Research Analyst (REG-NUMBER-RA). Systematic mandates for Indian investors.",
  };
}

export function getSeoFallbackForRouteKey(routeKey: string): SeoEntry {
  const path = ROUTE_KEY_TO_PATH[routeKey];
  if (path) return getSeoFallback(path);
  return getSeoFallback("/");
}
