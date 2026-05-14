/**
 * Default `pageCopy` documents — one per marketing route. `_id` = `pageCopy-{routeKey}`.
 */

export type PageCopySeedRow = {
  _id: string;
  routeKey: string;
  metaTitle: string;
  metaDescription: string;
  seoKeywords?: string[];
  heroPill1?: string;
  heroPill2?: string;
  heroPill3?: string;
  heroTitleLine1?: string;
  heroTitleEmphasis?: string;
  heroSubtitle?: string;
  contentEyebrow?: string;
};

export const pageCopySeed: PageCopySeedRow[] = [
  {
    _id: "pageCopy-home",
    routeKey: "home",
    metaTitle: "Invest Better",
    metaDescription:
      "MyNella — SEBI-registered Portfolio Manager & Research Analyst. Institutional-grade, algorithm-driven equity mandates for investors who want process, not noise.",
  },
  {
    _id: "pageCopy-about",
    routeKey: "about",
    metaTitle: "About MyNella — SEBI PMS & Research Analyst in Pune",
    metaDescription:
      "Meet MyNella Consultancy — SEBI-registered Portfolio Manager (REG-NUMBER-PMS) and Research Analyst (REG-NUMBER-RA) in Pune. Team, registrations, and systematic mandates for Indian investors.",
  },
  {
    _id: "pageCopy-contact",
    routeKey: "contact",
    metaTitle: "Contact MyNella — Pune",
    metaDescription:
      "Reach MyNella in Pune — book a strategy call on Cal.com or email hello@mynella.com. SEBI-registered Portfolio Manager & Research Analyst.",
    heroTitleLine1: "Contact MyNella",
    heroSubtitle:
      "Book a strategy call or write to us—whichever fits your pace. We aim to respond within two business days.",
  },
  {
    _id: "pageCopy-blog",
    routeKey: "blog",
    metaTitle: "Insights & research",
    metaDescription:
      "Notes from the MyNella desk — annual reviews, market context, and how we think about systematic equity and risk.",
  },
  {
    _id: "pageCopy-calculators",
    routeKey: "calculators",
    metaTitle: "Free Investment Calculators for Indian Investors",
    metaDescription:
      "12 free calculators: CAGR, doubling time, stock loss & drawdown recovery, fee drag, panic selling, Polaris compounding, and more — built for Indian investors. Illustrative only.",
    contentEyebrow: "Tools & calculators",
    heroTitleLine1: "Numbers that make you",
    heroTitleEmphasis: "think differently.",
    heroSubtitle:
      "Twelve calculators. Each built to reveal something real about how compounding, time, fees, and behaviour shape wealth. All illustrative — no account required.",
  },
  {
    _id: "pageCopy-blog-fy-2025-26-performance",
    routeKey: "blog-fy-2025-26-performance",
    metaTitle: "FY 2025–26 Performance Report",
    metaDescription:
      "FY 2025–26 performance: Polaris PMS & Optimus vs Nifty 50, 100, and 500 — returns, drawdowns, and risk-adjusted metrics through March 2026.",
  },
  {
    _id: "pageCopy-pms",
    routeKey: "pms",
    metaTitle: "PMS",
    metaDescription:
      "SEBI-registered Portfolio Management Service from MyNella — Polaris combines discretionary judgment with systematic equity selection. Minimum ₹50L, performance-aligned fees.",
    heroPill1: "SEBI Registered PMS",
    heroPill2: "REG-NUMBER-PMS",
    heroTitleLine1: "Discretionary portfolios.",
    heroTitleEmphasis: "Built for conviction and compounding.",
    heroSubtitle:
      "Our PMS offering is for investors who want a dedicated equity mandate — combining macro and thematic judgment with quantitative execution and strict risk discipline.",
  },
  {
    _id: "pageCopy-pms-polaris",
    routeKey: "pms-polaris",
    metaTitle: "Polaris PMS",
    metaDescription:
      "SEBI-registered discretionary PMS — momentum and trend following, concentrated equity, performance-aligned fees from ₹50L. REG-NUMBER-PMS.",
    heroPill1: "Portfolio Management Service",
    heroPill2: "SEBI Registered",
    heroPill3: "Min. ₹50 Lakhs",
    heroTitleLine1: "A wealth creation journey",
    heroTitleEmphasis: "from 1x to 110x.",
    heroSubtitle:
      "Systematic investments in equity markets with adaptive and objective methods of stock selection and allocation.",
  },
  {
    _id: "pageCopy-algo",
    routeKey: "algo",
    metaTitle: "Algo Strategies",
    metaDescription:
      "MyNella algorithmic strategies: Optimus (options), Pledge+ (margin enhancement), Pledge+ Mini (commodities from ₹50L), and Polaris Lite (systematic equity from ₹10L). SEBI Research Analyst REG-NUMBER-RA.",
    heroPill1: "Research Analyst · REG-NUMBER-RA",
    heroPill2: "Systematic & automated",
    heroTitleLine1: "Algorithms that respect",
    heroTitleEmphasis: "risk, rules, and your mandate.",
    heroSubtitle:
      "MyNella's algo suite spans equity systems and derivatives programs — each documented, each gated by suitability, each built to remove emotion from execution.",
  },
  {
    _id: "pageCopy-algo-optimus",
    routeKey: "algo-optimus",
    metaTitle: "Optimus",
    metaDescription:
      "Market-agnostic, fully automated algorithmic options-buying strategy designed to generate absolute returns by harnessing volatility through systematic, rule-based execution.",
    heroPill1: "Algorithmic Strategy",
    heroPill2: "Fully Automated",
    heroPill3: "Min. ₹15L+",
    heroTitleLine1: "Market-Agnostic. Fully Automated.",
    heroTitleEmphasis: "Built for Volatility.",
    heroSubtitle:
      "MyNella's algorithmic options-buying strategy designed to generate market-agnostic absolute returns by harnessing volatility through systematic, rule-based execution.",
  },
  {
    _id: "pageCopy-algo-pledge-plus",
    routeKey: "algo-pledge-plus",
    metaTitle: "Pledge+",
    metaDescription:
      "Margin-enhanced directional F&O strategy on pledged equity — for investors who want incremental return without liquidating long-term holdings. Minimum ₹1 Crore.",
    heroPill1: "Margin-Enhanced Strategy",
    heroPill2: "Directional F&O",
    heroPill3: "Min. ₹1 Cr",
    heroTitleLine1: "Generate Additional Returns.",
    heroTitleEmphasis: "Without Additional Capital.",
    heroSubtitle:
      "A systematic margin-enhanced strategy built on your existing equity portfolio. Deploy idle margin into high-liquidity futures and options without liquidating long-term positions.",
  },
  {
    _id: "pageCopy-algo-pledge-plus-mini",
    routeKey: "algo-pledge-plus-mini",
    metaTitle: "Pledge+ Mini",
    metaDescription:
      "The Pledge+ framework adapted for ₹50L capital: margin-enhanced directional commodity F&O on pledged equity with disciplined risk controls.",
    heroPill1: "Margin-Enhanced Strategy",
    heroPill2: "Commodities F&O",
    heroPill3: "Min. ₹50L",
    heroTitleLine1: "Pledge+ Framework.",
    heroTitleEmphasis: "Smaller Capital Entry.",
    heroSubtitle:
      "A lower-ticket Pledge+ variant that deploys pledged-capital margin into high-liquidity commodity derivatives with systematic risk management.",
  },
  {
    _id: "pageCopy-algo-polaris-lite",
    routeKey: "algo-polaris-lite",
    metaTitle: "Polaris Lite",
    metaDescription:
      "Systematic equity strategy under the Research Analyst framework from ₹10L — the Polaris engine at a lower ticket. REG-NUMBER-RA.",
    heroPill1: "Algorithmic Strategy",
    heroPill2: "SEBI Registered",
    heroPill3: "Min. ₹10 Lakhs",
    heroTitleLine1: "A wealth creation journey",
    heroTitleEmphasis: "from 1x to 110x.",
    heroSubtitle:
      "The Polaris engine made accessible. Systematic investments in equity markets with adaptive and objective methods of stock selection and allocation — starting at ₹10 Lakhs.",
  },
  {
    _id: "pageCopy-model-portfolios",
    routeKey: "model-portfolios",
    metaTitle: "Model Portfolios",
    metaDescription:
      "Concentrated, data-driven stock portfolios across market-cap segments — built on momentum, quality, and quantitative discipline.",
    heroPill1: "Moderate to High Risk",
    heroPill2: "Model Portfolio Based",
    heroTitleLine1: "Invest in quant-driven",
    heroTitleEmphasis: "model portfolios.",
    heroSubtitle:
      "Concentrated, data-driven stock portfolios across market-cap segments — built on momentum, quality, and quantitative discipline.",
  },
  {
    _id: "pageCopy-model-portfolios-alpha",
    routeKey: "model-portfolios-alpha",
    metaTitle: "Alpha Series",
    metaDescription:
      "Momentum-driven concentrated stock picks from Nifty 100, 200, and 500 universes.",
    contentEyebrow: "Model Portfolios · Alpha",
    heroTitleLine1: "Alpha Series",
    heroSubtitle:
      "Momentum-driven concentrated stock picks. Top 10 highest-conviction positions across Nifty 100, 200, and 500 universes — rebalanced monthly for maximum alpha.",
  },
  {
    _id: "pageCopy-model-portfolios-quanto",
    routeKey: "model-portfolios-quanto",
    metaTitle: "Quanto Series",
    metaDescription:
      "Cap-segment quantitative model portfolios spanning Large Cap, Mid Cap, Small Cap, Multi Cap, Flexi Cap, and Microcap.",
    contentEyebrow: "Model Portfolios · Quanto",
    heroTitleLine1: "Quanto Series",
    heroSubtitle:
      "Cap-segment quantitative model portfolios — systematic, factor-driven strategies for every market segment. Choose the cap-size that matches your risk profile.",
  },
  /* ——— Portfolio detail pages (meta + optional hero overrides) ——— */
  {
    _id: "pageCopy-portfolio-quanto-large-cap",
    routeKey: "portfolio-quanto-large-cap",
    metaTitle: "Quanto Large Cap",
    metaDescription:
      "A quantitative model portfolio focused on India's top 100 companies by market capitalization. Systematic factor-based selection targeting consistent alpha over Nifty 100.",
  },
  {
    _id: "pageCopy-portfolio-quanto-mid-cap",
    routeKey: "portfolio-quanto-mid-cap",
    metaTitle: "Quanto Mid Cap",
    metaDescription:
      "Quantitative mid-cap exposure with systematic momentum and quality signals across the Nifty Midcap universe.",
  },
  {
    _id: "pageCopy-portfolio-quanto-small-cap",
    routeKey: "portfolio-quanto-small-cap",
    metaTitle: "Quanto Small Cap",
    metaDescription:
      "Systematic small-cap model portfolio targeting higher growth potential with disciplined factor-based risk management.",
  },
  {
    _id: "pageCopy-portfolio-quanto-multi-cap",
    routeKey: "portfolio-quanto-multi-cap",
    metaTitle: "Quanto Multi Cap",
    metaDescription:
      "Dynamic allocation across large, mid, and small-cap segments using multi-factor signals across the Indian equity spectrum.",
  },
  {
    _id: "pageCopy-portfolio-quanto-flexi-cap",
    routeKey: "portfolio-quanto-flexi-cap",
    metaTitle: "Quanto Flexi Cap",
    metaDescription:
      "Flexible cap-allocation model portfolio adapting systematically across market caps based on factor signals.",
  },
  {
    _id: "pageCopy-portfolio-quanto-microcap",
    routeKey: "portfolio-quanto-microcap",
    metaTitle: "Quanto Microcap",
    metaDescription:
      "Concentrated systematic exposure to microcap opportunities with quantitative screening and disciplined rebalancing.",
  },
  {
    _id: "pageCopy-portfolio-alpha-alpha-100",
    routeKey: "portfolio-alpha-alpha-100",
    metaTitle: "Alpha 100",
    metaDescription:
      "Top 10 momentum-driven concentrated picks from the Nifty 100 universe — monthly rebalance, full transparency in your demat.",
  },
  {
    _id: "pageCopy-portfolio-alpha-alpha-200",
    routeKey: "portfolio-alpha-alpha-200",
    metaTitle: "Alpha 200",
    metaDescription:
      "Top 10 high-conviction positions from the Nifty 200 universe — systematic momentum strategy with monthly rebalancing.",
  },
  {
    _id: "pageCopy-portfolio-alpha-alpha-500",
    routeKey: "portfolio-alpha-alpha-500",
    metaTitle: "Alpha 500",
    metaDescription:
      "Broad-universe momentum portfolio — top 10 picks from Nifty 500 with disciplined monthly rebalancing.",
  },
  /* ——— Legal (PDF viewers) ——— */
  {
    _id: "pageCopy-terms",
    routeKey: "terms",
    metaTitle: "Terms & Conditions | MyNella",
    metaDescription: "MyNella Terms & Conditions.",
    heroTitleLine1: "Terms & Conditions",
    heroSubtitle:
      "The following document governs use of MyNella services and materials. For questions, contact us through the Contact page.",
  },
  {
    _id: "pageCopy-privacy",
    routeKey: "privacy",
    metaTitle: "Privacy Policy | MyNella",
    metaDescription: "MyNella Privacy Policy.",
    heroTitleLine1: "Privacy Policy",
    heroSubtitle:
      "How MyNella collects, uses, and protects your information. For requests or questions, use the Contact page.",
  },
  /* ——— Calculator tools (SEO; keywords editable via optional seoKeywords or code defaults) ——— */
  {
    _id: "pageCopy-calculator-cagr",
    routeKey: "calculator-cagr",
    metaTitle: "CAGR Calculator — Free Compound Annual Growth Rate Tool | MyNella",
    metaDescription:
      "Calculate CAGR instantly. Enter your starting value, ending value, and duration to get the exact Compound Annual Growth Rate. Free, no sign-up required.",
  },
  {
    _id: "pageCopy-calculator-time-to-double",
    routeKey: "calculator-time-to-double",
    metaTitle: "Time to 100% Return Calculator — How Long to Double Your Money? | MyNella",
    metaDescription:
      "Interactive calculator: see how many years it takes to earn a 100% return (double your money) at any annual rate. Compare the exact formula with the Rule of 72. Free, no sign-up.",
  },
  {
    _id: "pageCopy-calculator-polaris-compounding",
    routeKey: "calculator-polaris-compounding",
    metaTitle: "Polaris 1× → 110× Calculator — Compounding After Tax & Fees | MyNella",
    metaDescription:
      "Model Polaris-style doubling cycles: see wealth left after each round with 12.5% LTCG, 20% performance fee, and 10% withdrawal — same tool as on the Polaris PMS page.",
  },
  {
    _id: "pageCopy-calculator-growth-visualiser",
    routeKey: "calculator-growth-visualiser",
    metaTitle: "10-20-30 Compounding Visualiser — See the Wealth Gap | MyNella",
    metaDescription:
      "See what ₹1 lakh becomes at 10%, 20%, and 30% CAGR over 5–40 years. The difference is staggering — and this tool makes it impossible to ignore.",
  },
  {
    _id: "pageCopy-calculator-drawdown-recovery",
    routeKey: "calculator-drawdown-recovery",
    metaTitle: "Stock Loss Recovery Calculator — Break-Even After Drawdown | MyNella",
    metaDescription:
      "Free stock loss recovery calculator: enter a drawdown and see the break-even return (drawdown asymmetry). For stock loss recovery and drawdown and recovery intent—illustrative, not advice.",
  },
  {
    _id: "pageCopy-wealth-management-pune",
    routeKey: "wealth-management-pune",
    metaTitle: "Wealth Management in Pune — How to Compare Firms | MyNella",
    metaDescription:
      "Educational guide: wealth management and finance firms in Pune — SEBI PMS vs RA vs distribution, diligence questions, and how MyNella fits as a SEBI-registered manager.",
    contentEyebrow: "Pune investors",
    heroTitleLine1: "Wealth management in Pune:",
    heroTitleEmphasis: "compare firms without category errors.",
    heroSubtitle:
      "Regulated portfolio management and research look different from generic “finance company” lists. Here is a practical frame — plus where MyNella sits as a SEBI-registered Portfolio Manager and Research Analyst.",
  },
  {
    _id: "pageCopy-calculator-panic-selling",
    routeKey: "calculator-panic-selling",
    metaTitle: "Cost of Panic Selling Calculator — Missing Best Market Days | MyNella",
    metaDescription:
      "Missing the 10 best stock market days can cut your returns by half. See the exact cost of panic selling and market timing with this free calculator.",
  },
  {
    _id: "pageCopy-calculator-luxury-trap",
    routeKey: "calculator-luxury-trap",
    metaTitle: "Luxury Trap Calculator — Real Cost of Lifestyle Spending | MyNella",
    metaDescription:
      "Find the true compounding cost of a luxury purchase. That ₹30L car doesn't just cost ₹30L — it costs ₹2 Cr+ in compounded wealth over 20 years.",
  },
  {
    _id: "pageCopy-calculator-start-late",
    routeKey: "calculator-start-late",
    metaTitle: "Cost of Starting Late — SIP Investment at 25 vs 35 vs 45 | MyNella",
    metaDescription:
      "Starting SIP at 25 vs 35 vs 45: same monthly investment, same returns — but wildly different retirement wealth. See the compounding cost of every year you wait.",
  },
  {
    _id: "pageCopy-calculator-fee-destroyer",
    routeKey: "calculator-fee-destroyer",
    metaTitle: "Fee Destroyer — Real Cost of Mutual Fund Expense Ratios | MyNella",
    metaDescription:
      "A 1% annual fee destroys more wealth than you think. On ₹50L over 20 years at 12% CAGR, a 1% fee silently takes ₹53L from you. See the true fee drag.",
  },
  {
    _id: "pageCopy-calculator-min-ticket",
    routeKey: "calculator-min-ticket",
    metaTitle: "Minimum Ticket Checker — Which Investments Can You Access? | MyNella",
    metaDescription:
      "Enter your investable corpus and instantly see which MyNella investment mandates — PMS, smallcase, model portfolios — are accessible to you based on minimum ticket sizes.",
  },
  {
    _id: "pageCopy-calculator-sleeve-sizer",
    routeKey: "calculator-sleeve-sizer",
    metaTitle: "Risk Profile Finder — What Kind of Investor Are You? | MyNella",
    metaDescription:
      "Answer 5 questions to discover your investor risk category — conservative, moderate, growth, or aggressive — and see which MyNella mandates match your profile.",
  },
  {
    _id: "pageCopy-calculator-martingale",
    routeKey: "calculator-martingale",
    metaTitle: "Martingale Risk of Ruin — The Averaging-Down Trap | MyNella",
    metaDescription:
      "See exactly how doubling down on a falling stock destroys capital. Input any stock, drop%, and averaging levels — watch capital needs explode and ruin probability mount.",
  },
  {
    _id: "pageCopy-calculator-retirement",
    routeKey: "calculator-retirement",
    metaTitle: "Retirement Calculator — Real Number for Indian Investors | MyNella",
    metaDescription:
      "Inflation- and tax-aware retirement corpus calculator. Funds 25–30 years of withdrawals at the real rate of return, with a transparent SIP-gap solver. Every formula on screen.",
    heroTitleLine1: "Real Number Retirement",
    heroSubtitle:
      "A calculator that respects inflation, taxes, and 30-year horizons. Tune your assumptions and see every line of the math behind the number.",
  },
];
