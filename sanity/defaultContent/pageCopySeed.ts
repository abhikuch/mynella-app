/**
 * Default `pageCopy` documents — one per marketing route. `_id` = `pageCopy-{routeKey}`.
 */

export type PageCopySeedRow = {
  _id: string;
  routeKey: string;
  metaTitle: string;
  metaDescription: string;
  seoKeywords?: string[];
  heroPill1?: string;
  heroPill2?: string;
  heroPill3?: string;
  heroTitleLine1?: string;
  heroTitleEmphasis?: string;
  heroSubtitle?: string;
  contentEyebrow?: string;
};

export const pageCopySeed: PageCopySeedRow[] = [
  {
    _id: "pageCopy-home",
    routeKey: "home",
    metaTitle: "MyNella — Makeup & beauty",
    metaDescription:
      "Curated makeup looks, tutorials, and honest product notes. Edit this copy in Sanity Studio.",
    contentEyebrow: "Beauty editorial",
    heroTitleLine1: "Looks you can live in",
    heroTitleEmphasis: "Honest reviews & tutorials",
    heroSubtitle:
      "MyNella is built for beauty lovers who want editorial depth without the noise. Explore routines, ingredient callouts, and launch coverage — then tell us what you want to see next.",
  },
  {
    _id: "pageCopy-about",
    routeKey: "about",
    metaTitle: "About MyNella",
    metaDescription: "The story behind MyNella and how we work with creators, readers, and brands.",
  },
  {
    _id: "pageCopy-contact",
    routeKey: "contact",
    metaTitle: "Contact MyNella",
    metaDescription: "Customer care, press, and partnership inquiries for MyNella.",
    heroTitleLine1: "Say hello",
    heroSubtitle: "We read every message and usually reply within two business days.",
  },
  {
    _id: "pageCopy-terms",
    routeKey: "terms",
    metaTitle: "Terms & Conditions | MyNella",
    metaDescription: "Terms governing use of the MyNella website.",
  },
  {
    _id: "pageCopy-privacy",
    routeKey: "privacy",
    metaTitle: "Privacy Policy | MyNella",
    metaDescription: "How MyNella collects, uses, and protects your information.",
  },
];
