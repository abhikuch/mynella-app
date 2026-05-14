import { SITE_NAME, SITE_URL } from "@/lib/seo-config";

/** Editorial “freshness” baseline for pillar SEO pages — bump when content materially changes. */
export const PILLAR_CONTENT_FIRST_PUBLISHED = "2025-06-01";
export const PILLAR_CONTENT_LAST_UPDATED = "2026-04-02";

/** Primary YMYL author for long-form education (pillars + blog when no per-post author in CMS). */
export type PillarAuthor = {
  name: string;
  jobTitle: string;
  profilePath: `/team/${string}`;
  imagePath: string;
  credentialLine: string;
  sebiPmsReg: string;
  sebiRaReg: string;
};

export const DEFAULT_PILLAR_AUTHOR: PillarAuthor = {
  name: "Punam Kucheria",
  jobTitle: "Director & Fund Manager",
  profilePath: "/team/punam-kucheria",
  imagePath: "/team/punam-kucheria.png",
  credentialLine:
    "MyNella Consultancy Pvt. Ltd. — SEBI-registered Portfolio Manager & Research Analyst; leadership profile and regulatory context on her author page.",
  sebiPmsReg: "REG-NUMBER-PMS",
  sebiRaReg: "REG-NUMBER-RA",
};

export function punamAbsoluteImageUrl(): string {
  const p = DEFAULT_PILLAR_AUTHOR.imagePath.startsWith("/")
    ? DEFAULT_PILLAR_AUTHOR.imagePath
    : `/${DEFAULT_PILLAR_AUTHOR.imagePath}`;
  return `${SITE_URL}${p}`;
}

/**
 * URLs for Person `sameAs`. Set `NEXT_PUBLIC_PUNAM_LINKEDIN_URL` when the personal profile is public.
 */
export function punamSameAsLinks(): string[] {
  const personalLinkedIn = process.env.NEXT_PUBLIC_PUNAM_LINKEDIN_URL?.trim();
  const out: string[] = [];
  if (personalLinkedIn) out.push(personalLinkedIn);
  out.push(
    "https://www.linkedin.com/company/mynella",
    "https://stocktwits.com/Punam_Kucheria",
    "https://mynella.substack.com/",
    "https://x.com/iam_mynella",
  );
  return out;
}

export type ArticleSchemaPerson = {
  "@type": "Person";
  name: string;
  url: string;
  jobTitle: string;
  image?: string;
  sameAs?: string[];
  worksFor: { "@type": "Organization"; name: string; url: string };
};

export function articleSchemaPersonFromPillarAuthor(a: PillarAuthor): ArticleSchemaPerson {
  return {
    "@type": "Person",
    name: a.name,
    url: `${SITE_URL}${a.profilePath}`,
    jobTitle: a.jobTitle,
    image: punamAbsoluteImageUrl(),
    sameAs: punamSameAsLinks(),
    worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}
