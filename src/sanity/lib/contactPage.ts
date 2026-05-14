import { unstable_cache } from "next/cache";
import type { ContactPageRaw } from "@/lib/contact-page-content";
import { SANITY_NEXT_CACHE_TAG } from "./cache-tag";
import { SANITY_UNSTABLE_CACHE_REVALIDATE_SECONDS } from "@/lib/sanity-fetch-cache";
import { getSanityClient } from "./client";

const contactPageQuery = `*[_type == "contactPage" && _id == "contactPage"][0]{
  eyebrow,
  headline,
  subtext,
  bookCallTitle,
  bookCallLead,
  bookCallButtonLabel,
  bookCallUrl,
  contactBlockTitle,
  phone,
  email,
  websiteLabel,
  websiteUrl,
  officeTitle,
  officeAddress,
  followTitle,
  productOptions[]{ label, value },
  formSubmitLabel,
  placeholderFirstName,
  placeholderLastName,
  placeholderPhone,
  placeholderEmail,
  placeholderProduct,
  placeholderMessage,
  mailtoEmail,
  partnershipText,
  partnershipLinkLabel,
  partnershipLinkUrl,
  investorPortalLead,
  investorPortalLinkLabel,
  investorPortalUrl,
  regulatoryNote
}`;

export const getContactPage = unstable_cache(
  async (): Promise<ContactPageRaw> => {
    const client = getSanityClient();
    if (!client) return null;
    return client.fetch<ContactPageRaw>(contactPageQuery);
  },
  ["sanity-contact-page"],
  { revalidate: SANITY_UNSTABLE_CACHE_REVALIDATE_SECONDS, tags: [SANITY_NEXT_CACHE_TAG] },
);
