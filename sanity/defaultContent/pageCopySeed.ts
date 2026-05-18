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
  landingFaq?: { question: string; answer: string }[];
};

export const pageCopySeed: PageCopySeedRow[] = [
  {
    _id: "pageCopy-home",
    routeKey: "home",
    metaTitle: "Nella — calm companion for your aesthetic routine | MyNella",
    metaDescription:
      "Nella helps you remember visits, aftercare, and what comes next between appointments — without group-chat noise. Join the waitlist on MyNella.",
    contentEyebrow: "The companion app",
    heroPill1: "Visits & reminders",
    heroPill2: "Aftercare nudges",
    heroPill3: "Private by default",
    heroTitleLine1: "Your treatments,",
    heroTitleEmphasis: "one calm thread.",
    heroSubtitle:
      "Nella is the personal layer for aesthetic care: fewer tabs, fewer “did I already do that?” moments, and a gentle rhythm while the full app ships. MyNella is where we share progress and take waitlist signups.",
    landingFaq: [
      {
        question: "Is this medical advice?",
        answer:
          "No. Nella is a personal organization companion — not a clinician, not a diagnosis tool, and not a substitute for your provider’s instructions.",
      },
      {
        question: "What data do you collect on this waitlist?",
        answer:
          "We store your email and India mobile number to contact you about launches and early access. See the Privacy Policy for retention and your rights.",
      },
      {
        question: "When will the app be available?",
        answer:
          "We are in active development. Waitlist members hear first when private beta or public launch dates are set.",
      },
      {
        question: "What is MyNella vs Nella?",
        answer:
          "MyNella is this marketing site and editorial home. Nella is the companion app we are building — developed on a separate track from these pages.",
      },
    ],
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
  {
    _id: "pageCopy-delete-account",
    routeKey: "delete-account",
    metaTitle: "Delete your Nella account | MyNella",
    metaDescription:
      "Request deletion of your Nella companion app account and associated personal data.",
  },
];
