import type { Metadata } from "next";
import {
  PMSHubHero,
  PMSHubExplain,
  PMSHubWhy,
  PMSHubPolaris,
  PMSHubCompare,
  PMSHubInvestor,
  PMSHubProcess,
  PMSHubFAQ,
  PMSHubCTA,
} from "@/components/sections/PMSHub";
import { marketingHubMetadata } from "@/lib/page-copy-merge";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { getFaqByPlacement } from "@/sanity/lib/faq";
import { firstModFaqSection, getMarketingPageByRouteKey } from "@/sanity/lib/marketingPage";
import { getPageCopy } from "@/sanity/lib/pageCopy";

export async function generateMetadata(): Promise<Metadata> {
  return marketingHubMetadata(
    "pms",
    "pms-hub",
    {
      title: "Portfolio Management Services (PMS)",
      description:
        "SEBI-registered Portfolio Management Service from MyNella — Polaris combines discretionary judgment with systematic equity selection. Minimum ₹50L, performance-aligned fees.",
    },
    "/pms",
  );
}

export default async function PMSPage() {
  const [copy, marketing, faqItems] = await Promise.all([
    getPageCopy("pms"),
    getMarketingPageByRouteKey("pms-hub"),
    getFaqByPlacement("pms-hub"),
  ]);
  const faqModule = firstModFaqSection(marketing);
  return (
    <>
      <FaqJsonLd items={faqItems} />
      <PMSHubHero copy={copy} />
      <PMSHubExplain />
      <PMSHubWhy />
      <PMSHubPolaris />
      <PMSHubCompare />
      <PMSHubInvestor />
      <PMSHubProcess />
      <PMSHubFAQ faqModule={faqModule} items={faqItems} />
      <PMSHubCTA />
    </>
  );
}
