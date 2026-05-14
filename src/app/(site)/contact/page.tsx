import type { Metadata } from "next";
import { ContactPageView } from "@/components/sections/ContactLanding";
import { resolveContactPage } from "@/lib/contact-page-content";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { getContactPage } from "@/sanity/lib/contactPage";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { getResolvedSiteChrome } from "@/sanity/lib/siteChrome";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute(
    "contact",
    {
      title: "Contact MyNella",
      description:
        "Reach MyNella — book a strategy call on Cal.com or email admin@mynella.com. SEBI-registered Portfolio Manager & Research Analyst, Pune.",
    },
    "/contact",
  );
}

export default async function ContactPage() {
  const [copy, rawContact, chrome] = await Promise.all([
    getPageCopy("contact"),
    getContactPage(),
    getResolvedSiteChrome(),
  ]);
  const content = resolveContactPage(rawContact);
  return <ContactPageView copy={copy} content={content} chrome={chrome} />;
}
