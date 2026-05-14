/**
 * Default CMS payload — mirrors fallbacks in the Next app (Hero, About, Footer).
 * Used by Studio `initialValue` and by `npm run seed`.
 */

export const founderBioBlocks = [
  {
    _type: "block" as const,
    _key: "bio-1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "bio-1-span",
        text:
          "MyNella started as a small editorial project: honest swatches, wearable looks, and zero gatekeeping around who gets to play with makeup.",
        marks: [],
      },
    ],
  },
  {
    _type: "block" as const,
    _key: "bio-2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span" as const,
        _key: "bio-2-span",
        text:
          "Today the site is powered by the same stack we recommend to beauty brands — Next.js for speed, Sanity for content, and SEO patterns you can extend as you grow.",
        marks: [],
      },
    ],
  },
];

/** Fields for `siteSettings` (no _id / _type). */
export const siteSettingsDefaults = {
  homeEyebrowTag: "Makeup · tutorials · drops",
  homeTitleLine1: "Your look,",
  homeTitleEmphasis: "your story.",
  homeSubtitle:
    "MyNella is a beauty-first marketing site. Swap this hero copy in Sanity Studio under Site settings — keep it fresh for launches, seasons, and campaigns.",
  aboutPill1: "Editorial",
  aboutPill2: "Sanity CMS",
  aboutTitleLine1: "Built for creators",
  aboutTitleEmphasis: "and curious readers.",
  aboutSub:
    "We publish looks you can actually wear, explain what worked (and what did not), and keep the site fast with a modern stack.",
  founderName: "Founder name",
  founderRole: "Editor-in-chief",
  founderInitials: "MN",
  founderCreds: "Update credentials and portrait in Sanity after launch.",
  founderBio: founderBioBlocks,
  footerBrandDescription:
    "MyNella is an editorial makeup destination — replace this line with your positioning, ingredients story, or brand promise.",
  footerDisclaimer:
    "Content is for general information. Patch-test products, read labels, and consult a professional for medical skin concerns.",
  legalTermsUrl: "",
  legalPrivacyUrl: "",
  teamRosterLead: "Add your core team in Sanity — photos and roles show here automatically.",
  seoAllowAiCrawlers: true,
};

export type TeamSeedRow = {
  _id: string;
  name: string;
  role: string;
  linkedInUrl?: string;
  sortOrder: number;
};

/** Optional: add real people in Studio; seed ships empty for a clean slate. */
export const teamMembersSeed: TeamSeedRow[] = [];
