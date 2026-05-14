import { unstable_cache } from "next/cache";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { SANITY_NEXT_CACHE_TAG } from "./cache-tag";
import { getSanityClient } from "./client";
import { urlForImage } from "./image";

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

export const teamMembersFromCmsQuery = `*[_type == "teamMember"] | order(sortOrder asc, name asc) {
  name,
  role,
  "linkedInUrl": coalesce(linkedInUrl, ""),
  portrait
}`;

type CmsTeamMemberRaw = {
  name: string;
  role: string;
  linkedInUrl: string | null;
  portrait: SanityImageSource | null;
};

export type CmsTeamMember = {
  name: string;
  role: string;
  linkedInUrl: string;
  portraitUrl: string | null;
};

function portraitUrlFromCms(portrait: SanityImageSource | null): string | null {
  if (!portrait) return null;
  return (
    urlForImage(portrait)?.width(112).height(112).fit("crop").quality(85).url() ??
    null
  );
}

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettingsDoc | null> => {
    const client = getSanityClient();
    if (!client) return null;
    return client.fetch<SiteSettingsDoc | null>(siteSettingsQuery);
  },
  ["sanity-site-settings"],
  { revalidate: 60, tags: [SANITY_NEXT_CACHE_TAG] },
);

export const getTeamMembersFromCms = unstable_cache(
  async (): Promise<CmsTeamMember[]> => {
    const client = getSanityClient();
    if (!client) return [];
    const rows = await client.fetch<CmsTeamMemberRaw[]>(teamMembersFromCmsQuery);
    return rows.map((m) => ({
      name: m.name,
      role: m.role,
      linkedInUrl: m.linkedInUrl?.trim() ?? "",
      portraitUrl: portraitUrlFromCms(m.portrait),
    }));
  },
  ["sanity-team-members"],
  { revalidate: 60, tags: [SANITY_NEXT_CACHE_TAG] },
);
