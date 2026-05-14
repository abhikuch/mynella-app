/** Leadership & team — single source for About (and links from elsewhere). */

import { companyLinkedIn } from "./company-profile";

export const leadership = {
  name: "Punam Kucheria",
  role: "Director & Fund Manager",
  initials: "PK",
  creds:
    "Symbiosis alumnus · 30+ years in Indian capital markets · SEBI Registered Research Analyst & Portfolio Manager",
  bio: [
    "MyNella was built on a simple observation: the edge in public markets is rarely a secret formula — it is the ability to stay invested through cycles without abandoning process when it feels uncomfortable.",
    "Judgment formed across bull markets, crises, and liquidity shifts works alongside systems that enforce position sizing, rebalancing, and risk limits when emotions run high.",
  ],
};

/** Functional areas — add named members here when you publish bios. */
export const teamFunctions = [
  {
    title: "Investment leadership",
    desc: "Mandate design, regime view, and portfolio oversight sit with the fund manager, with documented process for every product.",
  },
  {
    title: "Quantitative research & systems",
    desc: "Signal design, model validation, and automated execution pipelines support consistent, rules-based deployment across mandates.",
  },
  {
    title: "Client & compliance",
    desc: "Onboarding, reporting coordination, and regulatory documentation run through systematic workflows aligned with SEBI requirements.",
  },
] as const;

export type TeamMember = {
  name: string;
  role: string;
  /** Empty when no public LinkedIn — portrait still works via `portraitUrl`. */
  linkedInUrl: string;
  /** Sanity CDN URL, or first-party path under `/team/` from `public/team/`. */
  portraitUrl?: string | null;
};

/** Vanity slug from `https://www.linkedin.com/in/{slug}/` */
export function linkedInVanitySlug(url: string): string {
  try {
    const u = new URL(url.trim());
    const parts = u.pathname.split("/").filter(Boolean);
    const inIdx = parts.indexOf("in");
    if (inIdx >= 0 && parts[inIdx + 1]) {
      return decodeURIComponent(parts[inIdx + 1]);
    }
  } catch {
    /* invalid URL */
  }
  return "";
}

/**
 * Avatar URL via unavatar (LinkedIn resolver). Not affiliated with LinkedIn.
 * Prefer a **portrait** uploaded in Sanity on the team member; if that fails or is
 * missing, this URL is used, then initials.
 */
export function teamMemberAvatarUrl(linkedInUrl: string): string {
  const slug = linkedInVanitySlug(linkedInUrl);
  if (!slug) return "";
  return `https://unavatar.io/linkedin/${encodeURIComponent(slug)}`;
}

/** Derive two-letter initials from a display name. */
export function teamMemberInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const first = parts[0][0];
    const last = parts[parts.length - 1][0];
    return (first + last).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

/**
 * Team roster (excludes Punam — she is in `leadership` above).
 * Order is stable for layout; edit roles/URLs in one place.
 */
export const teamMembers: TeamMember[] = [
  {
    name: "Kartik Parekh",
    role: "Principal Officer",
    linkedInUrl: "https://www.linkedin.com/in/kartik-parekh-3172a328/",
    portraitUrl: "/team/kartik-parekh.png",
  },
  {
    name: "Prasath V A B",
    role: "Analyst",
    linkedInUrl: "https://www.linkedin.com/in/prasath-v-a-b-262313108/",
    portraitUrl: "/team/prasath-v-a-b.png",
  },
  {
    name: "Sandeep Meher",
    role: "Compliance Officer",
    linkedInUrl: "https://www.linkedin.com/in/sandeep-meher-a2945b19a/",
    portraitUrl: "/team/sandeep-meher.png",
  },
  {
    name: "Aditya Pathak",
    role: "Developer",
    linkedInUrl: "https://www.linkedin.com/in/aditya-kumar-pathak-6870001b2/",
    portraitUrl: "/team/aditya-pathak.png",
  },
  {
    name: "Aarya Chordiya",
    role: "Analyst",
    linkedInUrl: "https://www.linkedin.com/in/aarya-chordiya-8270133a4/",
    portraitUrl: "/team/aarya-chordiya.png",
  },
  {
    name: "Ritik Yadav",
    role: "Developer",
    linkedInUrl: "https://www.linkedin.com/in/iritikyadav23/",
    portraitUrl: "/team/ritik-yadav.png",
  },
  {
    name: "Abhimanyu Kucheria",
    role: "Consultant",
    linkedInUrl: "https://www.linkedin.com/in/abhimanyukucheria/",
    portraitUrl: "/team/abhimanyu-kucheria.png",
  },
  {
    name: "Pranav Meher",
    role: "Lead Developer",
    linkedInUrl: "https://www.linkedin.com/in/pranavmeher/",
    portraitUrl: "/team/pranav-meher.png",
  },
  {
    name: "Preet Shrishrimal",
    role: "Analyst",
    linkedInUrl: "https://www.linkedin.com/in/preet-s-925263249/",
    portraitUrl: "/team/preet-shrishrimal.png",
  },
  {
    name: "Yash Panchal",
    role: "Analyst",
    linkedInUrl: "",
    portraitUrl: "/team/yash-panchal.png",
  },
  {
    name: "Bhupendra Agnur",
    role: "Analyst",
    linkedInUrl: "",
    portraitUrl: "/team/bhupendra-agnur.png",
  },
];

/**
 * Legacy note: extra `public/team/` assets may exist before roster rows — add `teamMembers`
 * entries (+ optional LinkedIn) when you publish them.
 */

export const teamRosterFootnote = {
  label: "MyNella on LinkedIn",
  href: companyLinkedIn.url,
  hint: "Company updates and full directory on our LinkedIn company page.",
};

/** CMS row shape (Sanity team list) — kept loose to avoid importing Sanity types here. */
export type TeamMemberCmsShape = {
  name: string;
  role: string;
  linkedInUrl?: string | null;
  portraitUrl?: string | null;
};

function normPersonName(s: string) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * When Studio lists team members but omits portraits, fill from `teamMembers` static paths
 * (`/team/*.png`) by matching LinkedIn URL or display name.
 *
 * Rows present in `teamMembers` but not yet in the CMS dataset (e.g. before `npm run seed`)
 * are appended so new hires show on the site immediately; once seeded, CMS carries them.
 */
export function rosterWithStaticPortraits(cmsTeam: TeamMemberCmsShape[]): TeamMember[] {
  if (cmsTeam.length === 0) return teamMembers;

  const mapRow = (m: TeamMemberCmsShape): TeamMember => {
    const li = m.linkedInUrl?.trim() ?? "";
    const fromCms = m.portraitUrl?.trim();
    if (fromCms) {
      return {
        name: m.name,
        role: m.role,
        linkedInUrl: li,
        portraitUrl: fromCms,
      };
    }
    const fb =
      (li &&
        teamMembers.find((t) => t.linkedInUrl && t.linkedInUrl === li)) ||
      teamMembers.find((t) => normPersonName(t.name) === normPersonName(m.name));
    return {
      name: m.name,
      role: m.role,
      linkedInUrl: li,
      portraitUrl: fb?.portraitUrl?.trim() || null,
    };
  };

  const fromCms = cmsTeam.map(mapRow);
  const cmsNames = new Set(fromCms.map((row) => normPersonName(row.name)));
  const extras = teamMembers.filter((t) => !cmsNames.has(normPersonName(t.name)));
  return extras.length ? [...fromCms, ...extras] : fromCms;
}
