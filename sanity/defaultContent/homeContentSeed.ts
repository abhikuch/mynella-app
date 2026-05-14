/**
 * Mirrors `src/app/(site)/page.tsx` + `Marquee.tsx` — seeded via `npm run seed`.
 */

export const homeContentSeed = {
  _id: "homeContent" as const,
  _type: "homeContent" as const,
  marqueeItems: [
    "Process over prediction",
    "Regime-aware risk staging",
    "Performance-aligned fees · zero fixed management fee",
    "Human layer + machine layer",
    "SEBI PMS · REG-NUMBER-PMS",
    "SEBI Research Analyst · REG-NUMBER-RA",
    "Disciplined execution · not narrative chasing",
    "Transparency in rules, sizing & reviews",
    "Model portfolios · thematic & cap sleeves",
    "Pune · serving investors across India",
  ],
  whatWeDo: {
    eyebrow: "What We Do",
    title: "Systematic Investing Across Market Cycles.",
    lead:
      "MyNella builds investment strategies designed to suit your financial goals. As a SEBI-registered investment research and portfolio management firm, we operate within an adaptive and objective decision-making framework with systematic execution.",
    pill1Label: "Adaptive",
    pill1Text: "Adjusting to market scenarios",
    pill2Label: "Objective",
    pill2Text: "Without personal bias",
    sortNote:
      "Ordered by typical minimum capital (low to high). Select a card to open the product page.",
    accentCallout:
      "We blend market judgment with quantitative discipline to create repeatable, process-driven wealth strategies.",
    products: [
      {
        _type: "homeProductCard",
        name: "Alpha Series",
        category: "Model portfolios",
        tag: "Momentum-driven concentrated stock picks from Nifty 100, 200, and 500 universes. Three portfolios built for disciplined growth.",
        min: "Varies",
        minLakh: 0,
        href: "/model-portfolios/alpha",
      },
      {
        _type: "homeProductCard",
        name: "Quanto Series",
        category: "Model portfolios",
        tag: "Cap-segment quantitative model portfolios spanning large, mid, small, flexi, multi, and microcap universes.",
        min: "Varies",
        minLakh: 0,
        href: "/model-portfolios/quanto",
      },
      {
        _type: "homeProductCard",
        name: "Polaris Lite",
        category: "Algo · systematic",
        tag: "A systematic introduction to disciplined portfolio management. The Polaris engine made accessible for emerging capital.",
        min: "₹10 Lakhs",
        minLakh: 10,
        href: "/algo/polaris-lite",
      },
      {
        _type: "homeProductCard",
        name: "Optimus",
        category: "Algo · systematic",
        tag: "Fully algorithmic strategies designed to harness market volatility. Rule-based options strategies for investors comfortable with higher volatility.",
        min: "₹15 Lakhs",
        minLakh: 15,
        href: "/algo/optimus",
      },
      {
        _type: "homeProductCard",
        name: "Polaris",
        category: "PMS",
        tag: "Institutional-grade portfolio management for serious capital. Momentum and trend following at the core — for ₹50L+ and a 3-year+ horizon.",
        min: "₹50 Lakhs",
        minLakh: 50,
        href: "/pms/polaris",
      },
      {
        _type: "homeProductCard",
        name: "Pledge+ Mini",
        category: "Algo · systematic",
        tag: "The Pledge+ framework adapted for ₹50L with a commodities-only pledged-capital mandate.",
        min: "₹50 Lakhs",
        minLakh: 50,
        href: "/algo/pledge-plus-mini",
      },
      {
        _type: "homeProductCard",
        name: "Pledge+",
        category: "Algo · systematic",
        tag: "Using leverage to make your capital work harder. Borrow against existing assets to deploy more capital within a systematic risk framework.",
        min: "₹1 Crore",
        minLakh: 100,
        href: "/algo/pledge-plus",
      },
    ],
  },
  strategyArchitecture: {
    eyebrow: "Strategy Architecture",
    title: "Capital Framework, Not a Product Menu.",
    lead:
      "MyNella offers systematic strategies aligned to capital size, risk appetite, and investment horizon.",
    steps: [
      {
        name: "Alpha & Quanto",
        desc: "Rule-based equity sleeves — model portfolios across universes and cap segments.",
        cap: "Varies",
      },
      {
        name: "Polaris Lite",
        desc: "Systematic portfolio management for emerging capital.",
        cap: "₹10L+",
      },
      {
        name: "Optimus",
        desc: "Systematic derivatives strategy for volatility-aware, rules-first investors.",
        cap: "₹15L+",
      },
      {
        name: "Polaris",
        desc: "Institutional-grade PMS for long-horizon capital.",
        cap: "₹50L+",
      },
      {
        name: "Pledge+ Mini",
        desc: "Commodity-focused pledged-capital derivatives mandate.",
        cap: "₹50L+",
      },
      {
        name: "Pledge+",
        desc: "Capital-efficiency structure for advanced allocation.",
        cap: "₹1 Cr+",
      },
    ],
  },
  whoWeServe: {
    eyebrow: "Who We Serve",
    title: "The right strategy starts with the right investor.",
    lead:
      "Not every strategy fits every investor. Capital size, risk tolerance, and time horizon define the right mandate.",
    strategiesColumnTitle: "Suitable Strategies",
    footer:
      "Capital allocation should be intentional. Choose the structure that aligns with your capital and conviction.",
    tiers: [
      {
        tier: "High Net Worth Individuals",
        capital: "₹5 Cr+",
        risk: "Moderate to High",
        strategies: [
          "Polaris PMS — Systematic portfolio management built to compound capital across market cycles.",
          "Pledge+ — Unlock capital efficiency with systematic leverage designed for sophisticated allocation.",
        ],
        desc: "Designed for investors seeking institutional-grade portfolio management with regime-aware capital deployment.",
        cta: "Discuss Your Allocation Framework",
        href: "https://cal.com/mynella/talk",
      },
      {
        tier: "Mass Affluent Investors",
        capital: "₹50L – ₹5 Cr",
        risk: "Moderate to Growth-Oriented",
        strategies: [
          "Polaris PMS — Navigate market regimes with structure, not speculation.",
          "Optimus — Turning volatility into opportunity through disciplined execution.",
        ],
        desc: "Built for serious capital seeking systematic compounding without reactive decision-making.",
        cta: "Explore Polaris",
        href: "/pms/polaris",
      },
      {
        tier: "Emerging Systematic Capital",
        capital: "₹10L – ₹50L",
        risk: "Moderate, long-term focused",
        strategies: [
          "Polaris Lite — A systematic introduction to disciplined portfolio management.",
          "Alpha 100/200/500 — Disciplined equity strategies focused on top companies for risk-aware compounding.",
        ],
        desc: "Designed for investors beginning systematic capital management with defined mandates and disciplined rebalancing.",
        cta: "View Equity & Lite Strategies",
        href: "/algo/polaris-lite",
      },
    ],
  },
  founderHome: {
    eyebrow: "Founder-Led. System-Driven.",
    title: "Experience Shapes Direction. Systems Ensure Discipline.",
    initials: "PK",
    name: "Punam Kucheria",
    role: "Director & Fund Manager",
    creds:
      "Symbiosis alumnus · 30+ years in Indian capital markets · SEBI Registered Research Analyst & Portfolio Manager",
    narrative:
      "MyNella was founded by Punam Kucheria, a SEBI-registered Research Analyst and market practitioner with over 30 years of real participation across bull cycles, credit expansions, crises, liquidity shocks, and structural regime shifts. The firm was built on a simple belief: investing is neither purely art nor purely science. It is systematic judgment executed with precision.",
    keyline:
      "The founder's experience shapes the directional view. The system ensures disciplined execution.",
    humanLabel: "Human Layer",
    humanItem1: "Market regime identification",
    humanItem2: "Capital allocation decisions",
    humanItem3: "Risk calibration across cycles",
    humanNote:
      "This layer reflects accumulated experience — understanding when to lean in, when to preserve capital, and when to recalibrate exposure.",
    machineLabel: "Machine Layer",
    machineItem1: "Quantitative signal generation",
    machineItem2: "Portfolio sizing discipline",
    machineItem3: "Automated execution precision",
    machineNote: "This layer removes emotional interference and enforces process integrity.",
    conclusion:
      "Together, this dual-engine framework reduces behavioral bias and strengthens consistency — allowing capital to transition from volatility to systematic, long-term compounding.",
  },
  partnersStrip: {
    eyebrow: "Execution & market access",
    title: "Brokers, platforms & regulators.",
    lead: "Brokers, thematic investing, and execution rails we connect with — pick what fits your workflow.",
  },
  research: {
    eyebrow: "Research & Market Outlook",
    title: "Insight Before Allocation.",
    body:
      "Capital should not move without context. We publish systematic market commentary covering regime transitions, liquidity cycles, sector rotation themes, volatility behaviour, and portfolio positioning outlook.",
    oneliner:
      "Investing without context leads to wrong decisions. Systematic research builds conviction.",
    ctaLabel: "Read insights on our blog →",
    ctaHref: "/blog",
  },
  howToEngage: {
    eyebrow: "How to Engage",
    title: "A Systematic Onboarding Process.",
    footer: "We prioritize alignment before allocation.",
    steps: [
      {
        title: "Goal Alignment",
        desc: "Understand your capital structure, risk tolerance, and investment horizon through a systematic strategy discussion.",
      },
      {
        title: "Strategy Discussion",
        desc: "Map your goals to the right MyNella strategy — whether PMS, Algo, or Model Portfolios.",
      },
      {
        title: "Documentation & Deployment",
        desc: "Complete KYC, sign agreements, and deploy capital into your chosen mandate with full transparency.",
      },
    ],
  },
  homeFaq: {
    eyebrow: "Frequently Asked Questions",
    title: "Common Questions, Answered.",
    items: [
      {
        question: "What does MyNella do?",
        answer:
          "MyNella is a SEBI-registered investment research and portfolio management firm offering systematic PMS, equity portfolios, and systematic derivatives strategies designed for long-term wealth creation.",
      },
      {
        question: "Who is MyNella suitable for?",
        answer:
          "Investors allocating systematic capital — from ₹10L to ₹5Cr+ — seeking disciplined, process-driven investment management.",
      },
      {
        question: "What is the minimum investment for PMS?",
        answer:
          "Polaris PMS is for ₹50L+ capital, while Polaris Lite and Alpha portfolios serve lower capital brackets starting from ₹10L.",
      },
      {
        question: "How is MyNella different from traditional PMS firms?",
        answer:
          "MyNella integrates market judgment with quantitative execution, combining human insight with systematic discipline to reduce emotional bias. Our fee structure is purely performance-aligned with zero fixed management fee.",
      },
      {
        question: "Is algorithmic trading part of your offering?",
        answer:
          "Yes. Optimus is a systematic derivatives strategy designed for investors comfortable with higher volatility and systematic risk frameworks. It is fully automated and algorithm-based.",
      },
      {
        question: "How do I know which strategy fits me?",
        answer:
          "Schedule a strategy discussion or use the investor segmentation on this page to determine alignment based on your capital size, risk profile, and investment horizon.",
      },
    ],
  },
  featuresGrid: {
    eyebrow: "Why Choose MyNella",
    title: "Systematic Investing Built for Risk-Adjusted Growth.",
    lead:
      "MyNella is a SEBI-registered investment firm offering Portfolio Management Services and quantitative investment strategies designed for disciplined, long-term wealth creation.",
    items: [
      {
        iconKey: 0,
        title: "Objective & Adaptive Investing",
        desc: "Rule-based models replace guesswork. They adapt as regimes shift—capital moves on evidence, not instinct or noise.",
      },
      {
        iconKey: 1,
        title: "Strategic Asset Allocation",
        desc: "Macro, volatility, and correlations inform how we build and tilt exposure—chasing upside with the downside in frame.",
      },
      {
        iconKey: 2,
        title: "Advanced Risk Management",
        desc: "Sharpe, VaR, and drawdown limits target return per unit of risk. You can’t erase risk—you can engineer how you carry it.",
      },
      {
        iconKey: 3,
        title: "Dynamic Rebalancing Framework",
        desc: "Rebalancing follows signals, not the calendar—weights stay aligned with the market you have, not the date on the sheet.",
      },
      {
        iconKey: 4,
        title: "AI-Driven Stock Screening",
        desc: "AI ranks strength, price action, and trend; the team sets the mandate. High-conviction ideas inside clear, defined universes.",
      },
      {
        iconKey: 5,
        title: "Momentum & Smart Beta Strategies",
        desc: "Momentum and smart beta capture durable trends—rule-based weights, disciplined process, no drifting into ad-hoc bets.",
      },
    ],
  },
  journeyTimeline: {
    eyebrow: "Our journey",
    title: "2016 — 2026 · Built in public markets.",
    lead:
      "Tap a year or drag the rail — each milestone adds context to how mandates, regulation and product depth evolved together.",
    scrollLeftAria: "Scroll timeline left",
    scrollRightAria: "Scroll timeline right",
    regionAria: "Company timeline by year",
    milestones: [
      {
        year: 2016,
        title: "Research depth",
        detail:
          "Formalised systematic equity research and advisory workflows from Pune — building the quant + judgment spine the firm still runs on.",
      },
      {
        year: 2017,
        title: "Client mandates scale",
        detail:
          "Expanded systematic portfolio work for HNI and family-office style accounts; emphasis on process documentation and repeatable reviews.",
      },
      {
        year: 2018,
        title: "SEBI Research Analyst",
        detail:
          "Registration granted (REG-NUMBER-RA) — public-facing research and model portfolios published under a regulated framework.",
      },
      {
        year: 2019,
        title: "Regime tooling",
        detail:
          "Sharpened macro and volatility dashboards used internally to stage risk — later feeding Optimus and PMS sleeve design.",
      },
      {
        year: 2020,
        title: "Crisis playbook",
        detail:
          "Liquidity shock year: stress-tested execution, margin and communication protocols that hardened operational discipline.",
      },
      {
        year: 2021,
        title: "Optimus live",
        detail:
          "Fully systematic derivatives strategy deployed for suitable investors — rules-based entries, sizing and risk overlays.",
      },
      {
        year: 2022,
        title: "smallcase distribution",
        detail:
          "Alpha & Quanto model portfolios launched for wider access — same research stack, smaller ticket sizes.",
      },
      {
        year: 2023,
        title: "Stack & compliance",
        detail:
          "Upgraded trading, reporting and audit trails ahead of PMS authorisation; investor reporting made continuous, not episodic.",
      },
      {
        year: 2024,
        title: "Polaris PMS",
        detail:
          "SEBI Portfolio Manager registration (REG-NUMBER-PMS) and Polaris goes live — flagship discretionary mandate for long-horizon capital.",
      },
      {
        year: 2025,
        title: "Pledge+ & Polaris Lite",
        detail:
          "Capital-efficiency (Pledge+) and a lower-minimum Polaris sleeve (Lite) to span more investor profiles without diluting process.",
      },
      {
        year: 2026,
        title: "Scale & AUM",
        detail:
          "₹100 Cr+ assets under management across mandates — founder-led oversight with machine-layer execution and expanding partner rails.",
      },
    ],
  },
  complianceBoard: {
    eyebrow: "Regulatory",
    title: "Compliance Board",
    description:
      "Full transparency on investor grievances and resolution status per SEBI requirements.",
    lastUpdated: "2024-11-27",
    tableRows: [
      {
        source: "Support",
        pendingLastMonth: "0",
        received: "0",
        resolved: "0",
        totalPending: "0",
        pendingOver3m: "0",
        avgResolution: "—",
        isTotalRow: false,
      },
      {
        source: "SEBI Scored",
        pendingLastMonth: "0",
        received: "0",
        resolved: "0",
        totalPending: "0",
        pendingOver3m: "0",
        avgResolution: "—",
        isTotalRow: false,
      },
      {
        source: "Other Sources",
        pendingLastMonth: "0",
        received: "0",
        resolved: "0",
        totalPending: "0",
        pendingOver3m: "0",
        avgResolution: "—",
        isTotalRow: false,
      },
      {
        source: "Grand Total",
        pendingLastMonth: "0",
        received: "0",
        resolved: "0",
        totalPending: "0",
        pendingOver3m: "0",
        avgResolution: "—",
        isTotalRow: true,
      },
    ],
    resourceLinks: [],
  },
  homeBottomCta: {
    eyebrow: "Start Your Journey",
    title: "Start Your Systematic Wealth Journey.",
    lead:
      "Whether you're allocating ₹10 Lakhs or ₹5 Crore — we build the strategy around your capital, your conviction, and your timeline.",
    primaryLabel: "Schedule Strategy Call",
    secondaryLabel: "Email Us Directly",
    secondaryMailto: "mailto:hello@mynella.com",
  },
} as const;
