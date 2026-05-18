import type { Metadata } from "next";
import { MarketingContactView } from "@/components/sections/MarketingContactView";
import { resolveContactPage } from "@/lib/contact-page-content";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { getContactPage } from "@/sanity/lib/contactPage";
import { getPageCopy } from "@/sanity/lib/pageCopy";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute(
    "contact",
    {
      title: "Contact MyNella",
      description: "Questions about Nella, press, partnerships, or support — reach the MyNella team.",
    },
    "/contact",
  );
}

export default async function ContactPage() {
  const [copy, rawContact] = await Promise.all([getPageCopy("contact"), getContactPage()]);
  const content = resolveContactPage(rawContact);
  return <MarketingContactView copy={copy} content={content} />;
}
