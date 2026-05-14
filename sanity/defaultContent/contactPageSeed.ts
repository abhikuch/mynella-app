/**
 * Singleton `contactPage` — edit in Studio under Globals → Contact page.
 */

export const contactPageSeed = {
  _id: "contactPage" as const,
  _type: "contactPage" as const,
  eyebrow: "Get in touch",
  headline: "Start your investment journey.",
  subtext:
    "Interested in POLARIS PMS, the Smallcase series, or our RA portfolios? Let's talk.",
  bookCallTitle: "Book a Call",
  bookCallLead: "Prefer to speak directly? Schedule a time that works for you.",
  bookCallButtonLabel: "Book on Cal.com",
  contactBlockTitle: "Contact",
  phone: "+91 93728 10916",
  email: "hello@mynella.com",
  websiteLabel: "www.mynella.com",
  websiteUrl: "https://www.mynella.com/",
  officeTitle: "Office",
  officeAddress:
    "106, 1st Floor, Jewel Square Mall, Koregaon Park, Pune 411001, Maharashtra, India.",
  followTitle: "Follow Us",
  productOptions: [
    { label: "Polaris PMS", value: "Polaris PMS" },
    { label: "Algo — Optimus", value: "Optimus" },
    { label: "Algo — Pledge+", value: "Pledge+" },
    { label: "Algo — Pledge+ Mini", value: "Pledge+ Mini" },
    { label: "Algo — Polaris Lite", value: "Polaris Lite" },
    { label: "Model portfolios — Alpha series", value: "Alpha model portfolios" },
    { label: "Model portfolios — Quanto series", value: "Quanto model portfolios" },
    { label: "Research / RA mandates", value: "RA / research" },
    { label: "General inquiry", value: "General" },
  ],
  formSubmitLabel: "Send Message",
  placeholderFirstName: "Rahul",
  placeholderLastName: "Sharma",
  placeholderPhone: "+91 98765 43210",
  placeholderEmail: "rahul@example.com",
  placeholderProduct: "Select a product",
  placeholderMessage: "Tell us about your investment goals…",
  mailtoEmail: "hello@mynella.com",
  partnershipText:
    "Distributors & partners — exploring distribution or collaboration?",
  partnershipLinkLabel: "Book a partnership call",
  partnershipLinkUrl: "https://cal.com/mynella/partnership",
  investorPortalLead: "Existing client?",
  investorPortalLinkLabel: "Investor portal",
  investorPortalUrl: "https://www.mynella.com",
  regulatoryNote:
    "MyNella is registered with SEBI as a Portfolio Manager and Research Analyst. This page is not investment advice or an offer. Investments involve risk; read all documents before investing.",
} as const;
