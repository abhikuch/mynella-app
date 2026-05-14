import type { Metadata } from "next";
import {
  OptimusHero,
  OptimusObjective,
  OptimusInstruments,
  OptimusFramework,
  OptimusFees,
  OptimusInvestorProfile,
  OptimusFAQ,
  OptimusCTA,
} from "@/components/sections/OptimusPage";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { marketingHubMetadata } from "@/lib/page-copy-merge";
import { getFaqByPlacement } from "@/sanity/lib/faq";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { Marquee } from "@/components/sections/Marquee";
import { marqueeItemsFromPageCopy } from "@/lib/page-marquee";

const ROUTE_KEY = "algo-optimus" as const;

export async function generateMetadata(): Promise<Metadata> {
  return marketingHubMetadata(
    ROUTE_KEY,
    ROUTE_KEY,
    {
      title: "Optimus — algorithmic options strategy",
      description:
        "Market-agnostic, fully automated algorithmic options-buying strategy designed to generate absolute returns by harnessing volatility through systematic, rule-based execution.",
    },
    "/algo/optimus",
  );
}

export default async function OptimusPageRoute() {
  const [copy, faqItems] = await Promise.all([getPageCopy(ROUTE_KEY), getFaqByPlacement(ROUTE_KEY)]);
  const marqueeItems = marqueeItemsFromPageCopy(copy, ROUTE_KEY);
  return (
    <>
      <FaqJsonLd items={faqItems} />
      <OptimusHero copy={copy} />
      <Marquee items={marqueeItems} />
      <OptimusObjective />
      <OptimusInstruments />
      <OptimusFramework />
      <OptimusFees />
      <OptimusInvestorProfile />
      <OptimusFAQ items={faqItems} />
      <OptimusCTA />
    </>
  );
}
