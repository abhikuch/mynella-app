import type { Metadata } from "next";
import {
  PledgeMiniHero,
  PledgeMiniExplainer,
  PledgeMiniHowItWorks,
  PledgeMiniBenefits,
  PledgeMiniInvestorProfile,
  PledgeMiniFAQ,
  PledgeMiniCTA,
} from "@/components/sections/PledgePlusMiniPage";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { marketingHubMetadata } from "@/lib/page-copy-merge";
import { getFaqByPlacement } from "@/sanity/lib/faq";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { Marquee } from "@/components/sections/Marquee";
import { marqueeItemsFromPageCopy } from "@/lib/page-marquee";

const ROUTE_KEY = "algo-pledge-plus-mini" as const;

export async function generateMetadata(): Promise<Metadata> {
  return marketingHubMetadata(
    ROUTE_KEY,
    ROUTE_KEY,
    {
      title: "Pledge+ Mini — commodity F&O on pledged equity",
      description:
        "A lower-ticket Pledge+ variant: margin-enhanced directional commodity F&O on pledged equity, built for ₹50L capital with disciplined risk controls.",
    },
    "/algo/pledge-plus-mini",
  );
}

export default async function PledgePlusMiniPageRoute() {
  const [copy, faqItems] = await Promise.all([
    getPageCopy(ROUTE_KEY),
    getFaqByPlacement(ROUTE_KEY),
  ]);
  const marqueeItems = marqueeItemsFromPageCopy(copy, ROUTE_KEY);
  return (
    <>
      <FaqJsonLd items={faqItems} />
      <PledgeMiniHero copy={copy} />
      <Marquee items={marqueeItems} />
      <PledgeMiniExplainer />
      <PledgeMiniHowItWorks />
      <PledgeMiniBenefits />
      <PledgeMiniInvestorProfile />
      <PledgeMiniFAQ items={faqItems} />
      <PledgeMiniCTA />
    </>
  );
}
