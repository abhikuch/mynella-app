import type { Metadata } from "next";
import {
  PolarisHero,
  PolarisObjective,
  PolarisConstruction,
  PolarisHumanMachine,
  PolarisFees,
  PolarisInvestorProfile,
  PolarisTrackRecord,
  PolarisOnboarding,
  PolarisFAQ,
  PolarisCTA,
  PolarisCompoundingJourney,
} from "@/components/sections/PolarisPage";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { marketingHubMetadata } from "@/lib/page-copy-merge";
import { getFaqByPlacement } from "@/sanity/lib/faq";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { Marquee } from "@/components/sections/Marquee";
import { marqueeItemsFromPageCopy } from "@/lib/page-marquee";

const ROUTE_KEY = "algo-polaris-lite" as const;

const TEN_LAKH = 1_000_000;

export async function generateMetadata(): Promise<Metadata> {
  return marketingHubMetadata(
    ROUTE_KEY,
    ROUTE_KEY,
    {
      title: "Polaris Lite — systematic equity from ₹10L",
      description:
        "Systematic equity strategy under the Research Analyst framework from ₹10L — the Polaris engine at a lower ticket. REG-NUMBER-RA.",
    },
    "/algo/polaris-lite",
  );
}

export default async function PolarisLitePageRoute() {
  const [copy, faqItems] = await Promise.all([getPageCopy(ROUTE_KEY), getFaqByPlacement(ROUTE_KEY)]);
  const marqueeItems = marqueeItemsFromPageCopy(copy, ROUTE_KEY);
  return (
    <>
      <FaqJsonLd items={faqItems} />
      <PolarisHero copy={copy} product="lite" />
      <Marquee items={marqueeItems} />
      <PolarisObjective variant="default" />
      <PolarisConstruction variant="alt" />
      <PolarisHumanMachine variant="default" />
      <PolarisFees variant="alt" />
      <PolarisInvestorProfile variant="default" product="lite" />
      <PolarisCompoundingJourney
        variant="alt"
        defaultStartingCapital={TEN_LAKH}
        minStartingCapital={TEN_LAKH}
      />
      <PolarisTrackRecord />
      <PolarisOnboarding />
      <PolarisFAQ items={faqItems} />
      <PolarisCTA product="lite" />
    </>
  );
}
