export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
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
      {
        label: "CAGR Calculator",
        href: "/calculators/cagr",
        description: "Turn start, end & duration into a return rate",
      },
      {
        label: "Time to 100% Return",
        href: "/calculators/time-to-double",
        description: "How long to double your money at a steady annual return",
      },
      {
        label: "10 · 20 · 30 Visualiser",
        href: "/calculators/growth-visualiser",
        description: "Watch ₹1L grow at three compounding speeds",
      },
      {
        label: "Drawdown Recovery",
        href: "/calculators/drawdown-recovery",
        description: "How much to make back what you lost",
      },
      {
        label: "Cost of Panic Selling",
        href: "/calculators/panic-selling",
        description: "What missing the best days costs you",
      },
      {
        label: "Luxury Trap",
        href: "/calculators/luxury-trap",
        description: "What your next big purchase really costs in wealth",
      },
      {
        label: "Cost of Starting Late",
        href: "/calculators/start-late",
        description: "Every year of delay has a compounding price",
      },
      {
        label: "Fee Destroyer",
        href: "/calculators/fee-destroyer",
        description: "How 1% fee wipes out decades of compounding",
      },
      {
        label: "Min. Ticket Checker",
        href: "/calculators/min-ticket",
        description: "Which MyNella mandates fit your corpus",
      },
      {
        label: "Risk Profile Finder",
        href: "/calculators/sleeve-sizer",
        description: "Find your investor risk category in 5 questions",
      },
      {
        label: "Martingale Risk of Ruin",
        href: "/calculators/martingale",
        description: "The maths of averaging down on falling stocks",
      },
      {
        label: "Polaris 1× → 110×",
        href: "/calculators/polaris-compounding",
        description: "Doubling cycles after tax, fees & withdrawals",
      },
      {
        label: "Real Number Retirement",
        href: "/calculators/retirement",
        description: "Inflation- and tax-aware corpus, plus SIP gap",
      },
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
        description: "How to compare firms, licences, and what MyNella offers in Pune",
      },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

export const ctaLinks = {
  investorLogin: "https://www.mynella.com",
  /** Generic intro call — nav, home, algo hub, about, performance report, contact (primary), etc. */
  bookCall: "https://cal.com/mynella/talk",
  bookOptimus: "https://cal.com/mynella/optimus",
  bookPledgePlus: "https://cal.com/mynella/pledgeplus",
  /** Polaris PMS and Polaris Lite (RA) */
  bookPolaris: "https://cal.com/mynella/polaris",
  /** Distributor / partnership — use on Contact page */
  bookPartnership: "https://cal.com/mynella/partnership",
} as const;

export { complianceFooterLinks as footerCompliance } from "./compliance-links";

export const footerCompany = [
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
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export const socialLinks = [
  { id: "x", label: "X (Twitter)", href: "https://x.com/iam_mynella" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/mynella" },
  { id: "stocktwits", label: "StockTwits", href: "https://stocktwits.com/Punam_Kucheria" },
  { id: "substack", label: "Substack", href: "https://mynella.substack.com/" },
  { id: "medium", label: "Medium", href: "https://medium.com/mynella" },
];
