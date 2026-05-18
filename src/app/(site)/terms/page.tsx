import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MarketingLegalPage } from "@/components/legal/MarketingLegalPage";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { getSiteSettings } from "@/sanity/lib/site";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";

const PDF = "/legal/terms-and-conditions.pdf";

const FALLBACK_TITLE = "Terms & Conditions";
const FALLBACK_DESCRIPTION =
  "The following document governs use of MyNella services and materials. For questions, contact us through the Contact page.";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute(
    "terms",
    {
      title: `${FALLBACK_TITLE} | MyNella`,
      description: "MyNella Terms & Conditions.",
    },
    "/terms",
  );
}

export default async function TermsPage() {
  const [settings, copy] = await Promise.all([getSiteSettings(), getPageCopy("terms")]);
  const external = settings?.legalTermsUrl?.trim();
  if (external) {
    redirect(external);
  }

  const title = copy?.heroTitleLine1?.trim() || FALLBACK_TITLE;
  const description = copy?.heroSubtitle?.trim() || FALLBACK_DESCRIPTION;

  return <MarketingLegalPage title={title} description={description} pdfPath={PDF} />;
}
