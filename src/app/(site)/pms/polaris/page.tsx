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

const ROUTE_KEY = "pms-polaris" as const;

export async function generateMetadata(): Promise<Metadata> {
  return marketingHubMetadata(
    ROUTE_KEY,
    ROUTE_KEY,
    {
      title: "Polaris PMS — discretionary equity mandate",
      description:
        "SEBI-registered discretionary PMS — momentum and trend following, concentrated equity, performance-aligned fees from ₹50L. REG-NUMBER-PMS.",
    },
    "/pms/polaris",
  );
}

export default async function PolarisPageRoute() {
  const [copy, faqItems] = await Promise.all([getPageCopy(ROUTE_KEY), getFaqByPlacement(ROUTE_KEY)]);
  const marqueeItems = marqueeItemsFromPageCopy(copy, ROUTE_KEY);
  return (
    <>
      <FaqJsonLd items={faqItems} />
      <PolarisHero copy={copy} />
      <Marquee items={marqueeItems} />
      <PolarisObjective variant="default" />
      <PolarisConstruction variant="alt" />
      <PolarisHumanMachine variant="default" />
      <PolarisFees variant="alt" />
      <PolarisInvestorProfile variant="default" />
      <PolarisCompoundingJourney variant="alt" />
      <PolarisTrackRecord />
      <PolarisOnboarding />
      <PolarisFAQ items={faqItems} />
      <PolarisCTA />
    </>
  );
}
