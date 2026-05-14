import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LegalDocumentPage } from "@/components/legal/LegalDocumentPage";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { getSiteSettings } from "@/sanity/lib/site";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";

const PDF = "/legal/privacy-policy.pdf";

const FALLBACK_TITLE = "Privacy Policy";
const FALLBACK_DESCRIPTION =
  "How MyNella collects, uses, and protects your information. For requests or questions, use the Contact page.";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute(
    "privacy",
    {
      title: `${FALLBACK_TITLE} | MyNella`,
      description: "MyNella Privacy Policy.",
    },
    "/privacy",
  );
}

export default async function PrivacyPage() {
  const [settings, copy] = await Promise.all([getSiteSettings(), getPageCopy("privacy")]);
  const external = settings?.legalPrivacyUrl?.trim();
  if (external) {
    redirect(external);
  }

  const title = copy?.heroTitleLine1?.trim() || FALLBACK_TITLE;
  const description = copy?.heroSubtitle?.trim() || FALLBACK_DESCRIPTION;

  return <LegalDocumentPage title={title} description={description} pdfPath={PDF} />;
}
