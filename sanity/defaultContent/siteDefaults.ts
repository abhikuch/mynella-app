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
          "MyNella exists to share how we are building Nella — a calm companion for aesthetic routines — and to collect the stories that should shape it.",
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
          "The site runs on Next.js and Sanity so we can iterate quickly on copy, waitlist flows, and compliance-friendly pages without shipping a new build for every tweak.",
        marks: [],
      },
    ],
  },
];

/** Fields for `siteSettings` (no _id / _type). */
export const siteSettingsDefaults = {
  homeEyebrowTag: "Nella · companion app",
  homeTitleLine1: "Your treatments,",
  homeTitleEmphasis: "one calm thread.",
  homeSubtitle:
    "Waitlist and updates for Nella — a personal layer for visits, aftercare, and what comes next. Edit this block in Sanity under Site settings.",
  aboutPill1: "Editorial",
  aboutPill2: "Sanity CMS",
  aboutTitleLine1: "Built for people",
  aboutTitleEmphasis: "who live in their skin.",
  aboutSub:
    "We publish here first: how we think about the product, what we are learning, and where to sign up for early access.",
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
