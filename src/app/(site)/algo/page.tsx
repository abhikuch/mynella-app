import type { Metadata } from "next";
import {
  AlgoHubHero,
  AlgoHubPhilosophy,
  AlgoHubCards,
  AlgoHubLadder,
  AlgoHubFAQ,
  AlgoHubCTA,
} from "@/components/sections/AlgoHub";
import { marketingHubMetadata } from "@/lib/page-copy-merge";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { getFaqByPlacement } from "@/sanity/lib/faq";
import { firstModFaqSection, getMarketingPageByRouteKey } from "@/sanity/lib/marketingPage";
import { getPageCopy } from "@/sanity/lib/pageCopy";

export async function generateMetadata(): Promise<Metadata> {
  return marketingHubMetadata(
    "algo",
    "algo-hub",
    {
      title: "Algorithmic investment strategies",
      description:
        "MyNella algorithmic strategies: Optimus (options), Pledge+ (margin enhancement), Polaris Lite (systematic equity from ₹10L). SEBI Research Analyst REG-NUMBER-RA.",
    },
    "/algo",
  );
}

export default async function AlgoPage() {
  const [copy, marketing, faqItems] = await Promise.all([
    getPageCopy("algo"),
    getMarketingPageByRouteKey("algo-hub"),
    getFaqByPlacement("algo-hub"),
  ]);
  const faqModule = firstModFaqSection(marketing);
  return (
    <>
      <FaqJsonLd items={faqItems} />
      <AlgoHubHero copy={copy} />
      <AlgoHubPhilosophy />
      <AlgoHubCards />
      <AlgoHubLadder />
      <AlgoHubFAQ faqModule={faqModule} items={faqItems} />
      <AlgoHubCTA />
    </>
  );
}
