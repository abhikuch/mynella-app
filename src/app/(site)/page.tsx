import type { Metadata } from "next";
import { NellaLanding } from "@/components/landing/NellaLanding";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { getPageCopy } from "@/sanity/lib/pageCopy";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute("home", null, "/");
}

export default async function HomePage() {
  const homeCopy = await getPageCopy("home");

  return (
    <NellaLanding
      copy={{
        eyebrow: homeCopy?.contentEyebrow?.trim() || undefined,
        heroTitle: homeCopy?.heroTitleLine1?.trim() || undefined,
        heroTitleAccent: homeCopy?.heroTitleEmphasis?.trim() || undefined,
        heroLead: homeCopy?.heroSubtitle?.trim() || undefined,
        primaryCta: "Get updates",
        secondaryCta: "About this site",
      }}
    />
  );
}
