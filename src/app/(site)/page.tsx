import type { Metadata } from "next";
import { NellaLanding, type LandingFaqItem } from "@/components/landing/NellaLanding";
import { mergedHeroCtas, mergedPills, pageMetadataForRoute } from "@/lib/page-copy-merge";
import type { PageCopyDoc } from "@/sanity/lib/pageCopy";
import { getPageCopy } from "@/sanity/lib/pageCopy";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute("home", null, "/");
}

function normalizeLandingFaq(doc: PageCopyDoc | null): LandingFaqItem[] | undefined {
  const rows = doc?.landingFaq;
  if (!rows?.length) return undefined;
  const out = rows
    .map((x) => ({
      question: (x.question ?? "").trim(),
      answer: (x.answer ?? "").trim(),
    }))
    .filter((x) => x.question && x.answer);
  return out.length ? out : undefined;
}

export default async function HomePage() {
  const homeCopy = await getPageCopy("home");
  const pills = mergedPills(homeCopy, [
    "Visits & reminders",
    "Aftercare nudges",
    "Private by default",
  ]);
  const ctas = mergedHeroCtas(homeCopy, {
    primaryLabel: "Join the waitlist",
    primaryHref: "#nl-waitlist",
    primaryExternal: false,
    secondaryLabel: "About MyNella",
    secondaryHref: "/about",
    secondaryExternal: false,
  });

  return (
    <NellaLanding
      pills={pills}
      faq={normalizeLandingFaq(homeCopy)}
      copy={{
        eyebrow: homeCopy?.contentEyebrow?.trim() || undefined,
        heroTitle: homeCopy?.heroTitleLine1?.trim() || undefined,
        heroTitleAccent: homeCopy?.heroTitleEmphasis?.trim() || undefined,
        heroLead: homeCopy?.heroSubtitle?.trim() || undefined,
        primaryCta: ctas.primaryLabel,
        secondaryCta: ctas.secondaryLabel,
      }}
    />
  );
}
