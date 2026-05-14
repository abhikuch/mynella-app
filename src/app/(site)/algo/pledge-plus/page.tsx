import type { Metadata } from "next";
import {
  PledgeHero,
  PledgeExplainer,
  PledgeHowItWorks,
  PledgeBenefits,
  PledgeInvestorProfile,
  PledgePhilosophy,
  PledgeFAQ,
  PledgeCTA,
} from "@/components/sections/PledgePlusPage";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { marketingHubMetadata } from "@/lib/page-copy-merge";
import { getFaqByPlacement } from "@/sanity/lib/faq";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { Marquee } from "@/components/sections/Marquee";
import { marqueeItemsFromPageCopy } from "@/lib/page-marquee";

const ROUTE_KEY = "algo-pledge-plus" as const;

export async function generateMetadata(): Promise<Metadata> {
  return marketingHubMetadata(
    ROUTE_KEY,
    ROUTE_KEY,
    {
      title: "Pledge+ — margin-enhanced F&O",
      description:
        "Margin-enhanced directional F&O strategy on pledged equity — for investors who want incremental return without liquidating long-term holdings. Minimum ₹1 Crore.",
    },
    "/algo/pledge-plus",
  );
}

export default async function PledgePlusPageRoute() {
  const [copy, faqItems] = await Promise.all([getPageCopy(ROUTE_KEY), getFaqByPlacement(ROUTE_KEY)]);
  const marqueeItems = marqueeItemsFromPageCopy(copy, ROUTE_KEY);
  return (
    <>
      <FaqJsonLd items={faqItems} />
      <PledgeHero copy={copy} />
      <Marquee items={marqueeItems} />
      <PledgeExplainer />
      <PledgeHowItWorks />
      <PledgeBenefits />
      <PledgeInvestorProfile />
      <PledgePhilosophy />
      <PledgeFAQ items={faqItems} />
      <PledgeCTA />
    </>
  );
}
