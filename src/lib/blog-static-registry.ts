import type { ComponentType } from "react";
import {
  CompareHubArticleBody,
  CompareOptimusVsMutualFundBody,
  CompareOptimusVsNiftyBeesBody,
  ComparePolarisVsSmallcaseBody,
  ComparePmsVsAifBody,
} from "@/components/pillar-articles/bodies/CompareGenerated";
import {
  IsAlgoTradingLegalIndiaArticleBody,
  StockLossDrawdownRecoveryGuideArticleBody,
} from "@/components/pillar-articles/bodies/BlogSeoSupportArticles";
import {
  GuideHowToChoosePmsBody,
  GuideMomentumInvestingIndiaBody,
  GuidePmsInvestorChecklistBody,
  GuidesHubArticleBody,
  GuideTaxOnPmsReturnsBody,
  GuideUnderstandingRiskProfileBody,
} from "@/components/pillar-articles/bodies/GuidesGenerated";
import type { PillarFaq } from "@/lib/pillar-jsonld";

const STANDARD_FAQS: PillarFaq[] = [
  {
    question: "Is this page investment advice?",
    answer:
      "No. This is educational content from MyNella. Investments are subject to risk; read disclosures and consult qualified professionals before acting.",
  },
  {
    question: "Where can I read MyNella regulatory documents?",
    answer: "Use the disclosures hub at /disclosures for charters and compliance PDFs.",
  },
  {
    question: "How do I contact MyNella?",
    answer: "Use the contact page at /contact to book a conversation or email the team.",
  },
];

const LEGAL_ALGO_FAQS: PillarFaq[] = [
  ...STANDARD_FAQS,
  {
    question: "Is algo trading banned in India?",
    answer:
      "There is no blanket ban on algorithmic execution in Indian markets. Brokerage, research distribution, PMS, and other activities are governed by specific SEBI and exchange rules. What matters is whether the entity and product are authorised for what they sell — verify with offering documents and regulators, not forum posts.",
  },
];

export type BlogStaticKind = "guide" | "compare";

export type BlogStaticDef = {
  /** Slug under `/blog/[slug]` */
  slug: string;
  /** Original path used for `getSeoFallback` (titles/descriptions unchanged). */
  seoSourcePath: string;
  kind: BlogStaticKind;
  /** Last breadcrumb label */
  crumbLabel: string;
  Body: ComponentType;
  faqs: PillarFaq[];
};

const DEF = (
  slug: string,
  seoSourcePath: string,
  kind: BlogStaticKind,
  crumbLabel: string,
  Body: ComponentType,
  faqs: PillarFaq[] = STANDARD_FAQS,
): BlogStaticDef => ({ slug, seoSourcePath, kind, crumbLabel, Body, faqs });

/**
 * Long-form guides & compare articles served at `/blog/{slug}` (public, no lead gate).
 * Legacy `/guides/*` and `/compare/*` URLs redirect here permanently.
 */
export const BLOG_STATIC_PAGES: BlogStaticDef[] = [
  DEF("guides", "/guides", "guide", "Investor guides hub", GuidesHubArticleBody),
  DEF("compare", "/compare", "compare", "Compare structures hub", CompareHubArticleBody),
  DEF(
    "how-to-choose-pms",
    "/guides/how-to-choose-pms",
    "guide",
    "How to choose a PMS",
    GuideHowToChoosePmsBody,
  ),
  DEF(
    "pms-investor-checklist",
    "/guides/pms-investor-checklist",
    "guide",
    "PMS investor checklist",
    GuidePmsInvestorChecklistBody,
  ),
  DEF(
    "understanding-risk-profile",
    "/guides/understanding-risk-profile",
    "guide",
    "Understanding risk profile",
    GuideUnderstandingRiskProfileBody,
  ),
  DEF(
    "tax-on-pms-returns",
    "/guides/tax-on-pms-returns",
    "guide",
    "Tax on PMS returns",
    GuideTaxOnPmsReturnsBody,
  ),
  DEF(
    "momentum-investing-india",
    "/guides/momentum-investing-india",
    "guide",
    "Momentum investing in India",
    GuideMomentumInvestingIndiaBody,
  ),
  DEF(
    "is-algo-trading-legal-india",
    "/guides/is-algo-trading-legal-india",
    "guide",
    "Is algo trading legal in India?",
    IsAlgoTradingLegalIndiaArticleBody,
    LEGAL_ALGO_FAQS,
  ),
  DEF(
    "stock-loss-drawdown-recovery-guide",
    "/guides/stock-loss-drawdown-recovery-guide",
    "guide",
    "Stock loss & drawdown recovery guide",
    StockLossDrawdownRecoveryGuideArticleBody,
  ),
  DEF(
    "polaris-vs-smallcase",
    "/compare/polaris-vs-smallcase",
    "compare",
    "Polaris vs smallcase",
    ComparePolarisVsSmallcaseBody,
  ),
  DEF(
    "optimus-vs-mutual-fund",
    "/compare/optimus-vs-mutual-fund",
    "compare",
    "Optimus vs mutual funds",
    CompareOptimusVsMutualFundBody,
  ),
  DEF(
    "optimus-vs-niftybees",
    "/compare/optimus-vs-niftybees",
    "compare",
    "Optimus vs Nifty BeES",
    CompareOptimusVsNiftyBeesBody,
  ),
  DEF("pms-vs-aif", "/compare/pms-vs-aif", "compare", "PMS vs AIF", ComparePmsVsAifBody),
];

const BY_SLUG: Record<string, BlogStaticDef> = Object.fromEntries(
  BLOG_STATIC_PAGES.map((p) => [p.slug, p]),
);

export function getBlogStaticPage(slug: string): BlogStaticDef | undefined {
  return BY_SLUG[slug];
}

export function getAllBlogStaticSlugs(): string[] {
  return BLOG_STATIC_PAGES.map((p) => p.slug);
}

/** Sitemap paths for static blog educational URLs */
export const BLOG_STATIC_SITEMAP_PATHS: string[] = BLOG_STATIC_PAGES.map((p) => `/blog/${p.slug}`);
