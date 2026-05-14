/**
 * Default site chrome — nav, CTAs, partners, matcher, footer labels, company facts.
 * Seeded as document id `siteChrome`.
 */

export const siteChromeSeed = {
  _id: "siteChrome" as const,
  _type: "siteChrome" as const,
  navigation: [
    { label: "About", href: "/about" },
    {
      label: "PMS",
      href: "/pms",
      children: [
        {
          label: "Polaris",
          href: "/pms/polaris",
          description: "Discretionary macro + quant precision PMS",
        },
      ],
    },
    {
      label: "Algo",
      href: "/algo",
      children: [
        {
          label: "Optimus",
          href: "/algo/optimus",
          description: "Multi-factor quant equity strategy",
        },
        {
          label: "Pledge+",
          href: "/algo/pledge-plus",
          description: "Pledged-margin optimised algo strategy",
        },
        {
          label: "Pledge+ Mini",
          href: "/algo/pledge-plus-mini",
          description: "Commodities-only pledged-margin variant from ₹50L",
        },
        {
          label: "Polaris Lite",
          href: "/algo/polaris-lite",
          description: "Lightweight version of the Polaris engine",
        },
      ],
    },
    {
      label: "Model Portfolios",
      href: "/model-portfolios",
      children: [
        {
          label: "Alpha",
          href: "/model-portfolios/alpha",
          description: "Momentum-driven concentrated stock picks",
          children: [
            { label: "Alpha 100", href: "/model-portfolios/alpha/alpha-100" },
            { label: "Alpha 200", href: "/model-portfolios/alpha/alpha-200" },
            { label: "Alpha 500", href: "/model-portfolios/alpha/alpha-500" },
          ],
        },
        {
          label: "Quanto",
          href: "/model-portfolios/quanto",
          description: "Cap-segment quantitative model portfolios",
          children: [
            { label: "Large Cap", href: "/model-portfolios/quanto/large-cap" },
            { label: "Mid Cap", href: "/model-portfolios/quanto/mid-cap" },
            { label: "Small Cap", href: "/model-portfolios/quanto/small-cap" },
            { label: "Multi Cap", href: "/model-portfolios/quanto/multi-cap" },
            { label: "Flexi Cap", href: "/model-portfolios/quanto/flexi-cap" },
            { label: "Microcap", href: "/model-portfolios/quanto/microcap" },
          ],
        },
      ],
    },
    {
      label: "Calculators",
      href: "/calculators",
      children: [
        { label: "CAGR Calculator", href: "/calculators/cagr", description: "Turn start, end & duration into a return rate" },
        {
          label: "Time to 100% Return",
          href: "/calculators/time-to-double",
          description: "How long to double your money at a steady annual return",
        },
        { label: "10 · 20 · 30 Visualiser", href: "/calculators/growth-visualiser", description: "Watch ₹1L grow at three compounding speeds" },
        { label: "Drawdown Recovery", href: "/calculators/drawdown-recovery", description: "How much to make back what you lost" },
        { label: "Cost of Panic Selling", href: "/calculators/panic-selling", description: "What missing the best days costs you" },
        { label: "Luxury Trap", href: "/calculators/luxury-trap", description: "What your next big purchase really costs in wealth" },
        { label: "Cost of Starting Late", href: "/calculators/start-late", description: "Every year of delay has a compounding price" },
        { label: "Fee Destroyer", href: "/calculators/fee-destroyer", description: "How 1% fee wipes out decades of compounding" },
        { label: "Min. Ticket Checker", href: "/calculators/min-ticket", description: "Which MyNella mandates fit your corpus" },
        { label: "Risk Profile Finder", href: "/calculators/sleeve-sizer", description: "Find your investor risk category in 5 questions" },
        { label: "Martingale Risk of Ruin", href: "/calculators/martingale", description: "The maths of averaging down on falling stocks" },
        { label: "Polaris 1× → 110×", href: "/calculators/polaris-compounding", description: "Doubling cycles after tax, fees & withdrawals" },
        { label: "Real Number Retirement", href: "/calculators/retirement", description: "Inflation- and tax-aware corpus, plus SIP gap" },
      ],
    },
    {
      label: "Learn",
      href: "/blog",
      children: [
        {
          label: "Blog",
          href: "/blog",
          description: "Insights, research, and updates from the desk",
        },
        {
          label: "Guides",
          href: "/blog/guides",
          description: "Diligence, risk, tax themes, and factor primers",
        },
        {
          label: "Compare",
          href: "/blog/compare",
          description: "PMS, AIF, mutual funds, and platform mechanics",
        },
        {
          label: "Disclosures",
          href: "/disclosures",
          description: "Charters, compliance PDFs, and grievance paths",
        },
        {
          label: "Wealth management in Pune",
          href: "/wealth-management-pune",
          description: "Compare firms, licences, and what MyNella offers in Pune",
        },
      ],
    },
    { label: "Contact Us", href: "/contact" },
  ],
  ctaInvestorLogin: "https://www.mynella.com",
  ctaBookCall: "https://cal.com/mynella/talk",
  ctaBookOptimus: "https://cal.com/mynella/optimus",
  ctaBookPledgePlus: "https://cal.com/mynella/pledgeplus",
  ctaBookPolaris: "https://cal.com/mynella/polaris",
  ctaBookPartnership: "https://cal.com/mynella/partnership",
  footerCompliance: [
    { label: "Investor Charter RA", href: "/assets/investor-charter.pdf" },
    { label: "Investor Charter PMS", href: "/assets/Investor Charter PMS.pdf" },
    { label: "Grievance Redressal", href: "/assets/Grievance Redressal RA & PMS_3.pdf" },
    { label: "Accredited Investor", href: "/assets/Accredited-investor.pdf" },
    { label: "ODR Portal", href: "https://smartodr.in/login" },
  ],
  footerCompany: [
    { label: "About", href: "/about" },
    { label: "Wealth management in Pune", href: "/wealth-management-pune" },
    { label: "Leadership", href: "/team/punam-kucheria" },
    { label: "Guides", href: "/blog/guides" },
    { label: "Compare", href: "/blog/compare" },
    { label: "Disclosures", href: "/disclosures" },
    { label: "Blog", href: "/blog" },
    { label: "Calculators", href: "/calculators" },
    { label: "Time to 100% return", href: "/calculators/time-to-double" },
    { label: "Contact Us", href: "/contact" },
    { label: "Terms & Conditions", href: "https://www.mynella.com/terms" },
    { label: "Privacy Policy", href: "https://www.mynella.com/privacy" },
  ],
  socialLinks: [
    { id: "x", label: "X (Twitter)", href: "https://x.com/iam_mynella" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/mynella" },
    { id: "stocktwits", label: "StockTwits", href: "https://stocktwits.com/Punam_Kucheria" },
    { id: "substack", label: "Substack", href: "https://www.mynella.com/blog" },
    { id: "medium", label: "Medium", href: "https://medium.com/@mynella" },
  ],

  brandName: "MyNella",
  brandTagline: "Invest Better",
  logoAriaLabel: "MyNella — Home",
  heroPrimaryCtaLabel: "Schedule Strategy Call",
  heroStat1Value: "30",
  heroStat1Unit: "+ yrs",
  heroStat1Label: "Market experience",
  heroStat2Value: "₹0",
  heroStat2Label: "Fixed management fee",
  heroStat3Value: "100",
  heroStat3Unit: "Cr+",
  heroStat3Label: "Assets under management",
  heroStat4Value: "SEBI",
  heroStat4Label: "REG-NUMBER-PMS · REG-NUMBER-RA",
  strategyMatcherTrigger: "Discover your ideal strategy",
  strategyMatcherPanelLead:
    "Pick a capital band — we'll suggest where most clients start. No form; open a path and refine on a call.",
  strategyMatcherBrowseAllLabel: "Browse all products by minimum capital →",
  strategyMatcherBandsAria: "Capital band",
  strategyMatcherBands: [
    { id: "emerging", label: "₹10L – ₹50L", hint: "Systematic equity & lite mandates" },
    { id: "affluent", label: "₹50L – ₹5 Cr", hint: "PMS, algo & model portfolios" },
    { id: "hnw", label: "₹5 Cr+", hint: "Institutional-style allocation" },
  ],
  strategyMatcherPicksEmerging: [
    {
      title: "Polaris Lite",
      href: "/algo/polaris-lite",
      blurb: "Disciplined PM-style process at a lower capital bar.",
    },
    {
      title: "Alpha series",
      href: "/model-portfolios/alpha",
      blurb: "Momentum-led model portfolios across Nifty universes.",
    },
    {
      title: "Quanto series",
      href: "/model-portfolios/quanto",
      blurb: "Cap-segment quantitative equity sleeves.",
    },
  ],
  strategyMatcherPicksAffluent: [
    {
      title: "Polaris PMS",
      href: "/pms/polaris",
      blurb: "Flagship portfolio management for serious capital.",
    },
    {
      title: "Optimus",
      href: "/algo/optimus",
      blurb: "Systematic derivatives strategy for volatility-aware investors.",
    },
    {
      title: "Pledge+ Mini",
      href: "/algo/pledge-plus-mini",
      blurb: "Pledged-capital commodities strategy at a ₹50L entry point.",
    },
    {
      title: "Model portfolios",
      href: "/model-portfolios/alpha",
      blurb: "Rule-based equity sleeves alongside core mandates.",
    },
  ],
  strategyMatcherPicksHnw: [
    {
      title: "Polaris PMS",
      href: "/pms/polaris",
      blurb: "Primary mandate for large, long-horizon capital.",
    },
    {
      title: "Pledge+",
      href: "/algo/pledge-plus",
      blurb: "Systematic leverage for capital-efficient deployment.",
    },
    {
      title: "Book a strategy call",
      href: "https://cal.com/mynella/talk",
      blurb: "Align mandate, risk & documentation with the team.",
    },
  ],
  navMobileInvestorLogin: "Investor Login",
  navMobileBookCall: "Book a Call",
  navOverviewSuffix: "Overview",
  navToggleAria: "Toggle navigation",
  footerProductsTitle: "Products & education",
  footerComplianceTitle: "Compliance",
  footerCompanyTitle: "Company",
  footerSebiLine1: "Portfolio Manager · REG-NUMBER-PMS · Perpetual",
  footerSebiLine2: "Research Analyst · REG-NUMBER-RA · Perpetual",
  footerSebiLine3: "CIN · U74900PN2010PTC137497",
  footerCopyrightPrefix: "©",
  footerCopyrightOrg: "MyNella Consultancy Pvt. Ltd.",
  skipToContentLabel: "Skip to content",
  companyLinkedInUrl: "https://www.linkedin.com/company/mynella",
  companyTagline:
    "Helping investors create wealth over the long term via a systematic and objective market approach. SEBI-registered PMS & RA.",
  companyAbout:
    "SEBI-registered PMS and RA. Wealth generation through a systematic approach to markets — enabling objective, adaptive decision-making.",
  companyIndustry: "Financial Services",
  companySizeBand: "2–10 employees",
  companyHeadquarters: "Pune, Maharashtra",
  companyLocations: [
    {
      label: "Primary — Pune",
      lines: ["North Main Road", "Floor 1", "Pune, Maharashtra 411001, India"],
    },
    {
      label: "Mumbai",
      lines: ["Mumbai, Maharashtra 400001, India"],
    },
  ],
  companySpecialties: [
    "Finance",
    "Software",
    "Strategy",
    "Equity",
    "Investing",
    "Options",
    "Futures",
    "Derivatives",
    "Trading",
  ],

  /** Top bar — quick paths to education hubs (shown above main nav when set). */
  headerUtilityLinks: [
    { label: "Guides", href: "/blog/guides", openInNewTab: false },
    { label: "Compare", href: "/blog/compare", openInNewTab: false },
    { label: "Calculators", href: "/calculators", openInNewTab: false },
  ],

  /**
   * Which main-nav sections appear under footer “Products”.
   * Include Learn + Calculators so education pages are discoverable without opening mega menus.
   */
  footerProductNavLabels: ["PMS", "Algo", "Model Portfolios", "Learn", "Calculators"],
};
