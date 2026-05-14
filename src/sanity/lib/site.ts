import { unstable_cache } from "next/cache";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { SANITY_NEXT_CACHE_TAG } from "./cache-tag";
import { SANITY_UNSTABLE_CACHE_REVALIDATE_SECONDS } from "@/lib/sanity-fetch-cache";
import { getSanityClient } from "./client";

export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  homeEyebrowTag,
  homeTitleLine1,
  homeTitleEmphasis,
  homeSubtitle,
  aboutPill1,
  aboutPill2,
  aboutTitleLine1,
  aboutTitleEmphasis,
  aboutSub,
  founderName,
  founderRole,
  founderInitials,
  founderCreds,
  founderBio,
  founderPortrait,
  footerBrandDescription,
  footerDisclaimer,
  footerCreditEnabled,
  footerCreditPrefix,
  footerCreditName,
  footerCreditUrl,
  legalTermsUrl,
  legalPrivacyUrl,
  teamRosterLead,
  seoDefaultOgImage,
  seoOrganizationLogo,
  seoGoogleSiteVerification,
  seoBingSiteVerification,
  seoLlmsTxtExtra,
  seoAllowAiCrawlers
}`;

export type SiteSettingsDoc = {
  homeEyebrowTag: string | null;
  homeTitleLine1: string | null;
  homeTitleEmphasis: string | null;
  homeSubtitle: string | null;
  aboutPill1: string | null;
  aboutPill2: string | null;
  aboutTitleLine1: string | null;
  aboutTitleEmphasis: string | null;
  aboutSub: string | null;
  founderName: string | null;
  founderRole: string | null;
  founderInitials: string | null;
  founderCreds: string | null;
  founderBio: PortableTextBlock[] | null;
  founderPortrait: SanityImageSource | null;
  footerBrandDescription: string | null;
  footerDisclaimer: string | null;
  footerCreditEnabled: boolean | null;
  footerCreditPrefix: string | null;
  footerCreditName: string | null;
  footerCreditUrl: string | null;
  legalTermsUrl: string | null;
  legalPrivacyUrl: string | null;
  teamRosterLead: string | null;
  seoDefaultOgImage: SanityImageSource | null;
  seoOrganizationLogo: SanityImageSource | null;
  seoGoogleSiteVerification: string | null;
  seoBingSiteVerification: string | null;
  seoLlmsTxtExtra: string | null;
  seoAllowAiCrawlers: boolean | null;
};

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettingsDoc | null> => {
    const client = getSanityClient();
    if (!client) return null;
    return client.fetch<SiteSettingsDoc | null>(siteSettingsQuery);
  },
  ["sanity-site-settings"],
  { revalidate: SANITY_UNSTABLE_CACHE_REVALIDATE_SECONDS, tags: [SANITY_NEXT_CACHE_TAG] },
);
