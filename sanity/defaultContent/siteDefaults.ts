/**
 * Default CMS payload — mirrors fallbacks in the Next app (Hero, About, Footer, team, FAQ).
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
          "MyNella was built on a simple observation: the edge in public markets is rarely a secret formula — it is the ability to stay invested through cycles without abandoning process when it feels uncomfortable.",
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
          "Judgment formed across bull markets, crises, and liquidity shifts works alongside systems that enforce position sizing, rebalancing, and risk limits when emotions run high.",
        marks: [],
      },
    ],
  },
];

/** Fields for `siteSettings` (no _id / _type). */
export const siteSettingsDefaults = {
  homeEyebrowTag: "SEBI Registered Portfolio Manager & Research Analyst",
  homeTitleLine1: "From Capital to Compounding.",
  homeTitleEmphasis: "A Systematic Wealth Creation Journey.",
  homeSubtitle:
    "MyNella is a system-driven investment firm combining 30+ years of real market experience with disciplined execution. We build investment strategies that suit investor goals — without emotional bias, narrative chasing, or reactive decision-making.",
  aboutPill1: "SEBI Portfolio Manager & Research Analyst",
  aboutPill2: "Pune · India",
  aboutTitleLine1: "Institutional discipline.",
  aboutTitleEmphasis: "Built for Indian investors.",
  aboutSub:
    "SEBI-registered Portfolio Manager and Research Analyst in Pune — system-driven mandates for investors who want process, not noise.",
  founderName: "Punam Kucheria",
  founderRole: "Director & Fund Manager",
  founderInitials: "PK",
  founderCreds:
    "Symbiosis alumnus · 30+ years in Indian capital markets · SEBI Registered Research Analyst & Portfolio Manager",
  founderBio: founderBioBlocks,
  footerBrandDescription:
    "A SEBI-regulated Portfolio Manager and Research Analyst delivering institutional-grade investment strategies to every investor in India.",
  footerDisclaimer:
    "Investments in securities markets are subject to market risks. Read all related documents carefully before investing. SEBI registration does not guarantee performance or assure returns. Past performance is not indicative of future results. Please consult your financial advisor before investing.",
  legalTermsUrl: "https://www.mynella.com/terms",
  legalPrivacyUrl: "https://www.mynella.com/privacy",
  teamRosterLead:
    "When LinkedIn is listed, the icon opens that profile. Photos load when available; otherwise initials are shown.",
  seoAllowAiCrawlers: true,
};

export type TeamSeedRow = {
  _id: string;
  name: string;
  role: string;
  /** Omit or leave unset in Studio when not public. */
  linkedInUrl?: string;
  sortOrder: number;
};

export const teamMembersSeed: TeamSeedRow[] = [
  {
    _id: "teamMember-kartik-parekh",
    name: "Kartik Parekh",
    role: "Principal Officer",
    linkedInUrl: "https://www.linkedin.com/in/kartik-parekh-3172a328/",
    sortOrder: 0,
  },
  {
    _id: "teamMember-prasath-v-a-b",
    name: "Prasath V A B",
    role: "Analyst",
    linkedInUrl: "https://www.linkedin.com/in/prasath-v-a-b-262313108/",
    sortOrder: 1,
  },
  {
    _id: "teamMember-sandeep-meher",
    name: "Sandeep Meher",
    role: "Compliance Officer",
    linkedInUrl: "https://www.linkedin.com/in/sandeep-meher-a2945b19a/",
    sortOrder: 2,
  },
  {
    _id: "teamMember-aditya-pathak",
    name: "Aditya Pathak",
    role: "Developer",
    linkedInUrl: "https://www.linkedin.com/in/aditya-kumar-pathak-6870001b2/",
    sortOrder: 3,
  },
  {
    _id: "teamMember-aarya-chordiya",
    name: "Aarya Chordiya",
    role: "Analyst",
    linkedInUrl: "https://www.linkedin.com/in/aarya-chordiya-8270133a4/",
    sortOrder: 4,
  },
  {
    _id: "teamMember-ritik-yadav",
    name: "Ritik Yadav",
    role: "Developer",
    linkedInUrl: "https://www.linkedin.com/in/iritikyadav23/",
    sortOrder: 5,
  },
  {
    _id: "teamMember-abhimanyu-kucheria",
    name: "Abhimanyu Kucheria",
    role: "Consultant",
    linkedInUrl: "https://www.linkedin.com/in/abhimanyukucheria/",
    sortOrder: 6,
  },
  {
    _id: "teamMember-pranav-meher",
    name: "Pranav Meher",
    role: "Lead Developer",
    linkedInUrl: "https://www.linkedin.com/in/pranavmeher/",
    sortOrder: 7,
  },
  {
    _id: "teamMember-preet-shrishrimal",
    name: "Preet Shrishrimal",
    role: "Analyst",
    linkedInUrl: "https://www.linkedin.com/in/preet-s-925263249/",
    sortOrder: 8,
  },
  {
    _id: "teamMember-yash-panchal",
    name: "Yash Panchal",
    role: "Analyst",
    sortOrder: 9,
  },
  {
    _id: "teamMember-bhupendra-agnur",
    name: "Bhupendra Agnur",
    role: "Analyst",
    sortOrder: 10,
  },
];
