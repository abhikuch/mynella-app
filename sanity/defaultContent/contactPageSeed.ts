/**
 * Singleton `contactPage` — edit in Studio under Globals → Contact page.
 */

export const contactPageSeed = {
  _id: "contactPage" as const,
  _type: "contactPage" as const,
  eyebrow: "Contact",
  headline: "We would love to hear from you.",
  subtext: "Press, creators, retail partners, or product questions — use the form and we will route it to the right person.",
  bookCallTitle: "Book time",
  bookCallLead: "Prefer a live conversation? Grab a slot that works for you.",
  bookCallButtonLabel: "Open calendar",
  contactBlockTitle: "Details",
  phone: "",
  email: "hello@mynella.com",
  websiteLabel: "www.mynella.com",
  websiteUrl: "https://www.mynella.com/",
  officeTitle: "Studio",
  officeAddress: "Update this address in Sanity Studio when you have a public location.",
  followTitle: "Social",
  productOptions: [
    { label: "Press & media", value: "Press" },
    { label: "Brand partnership", value: "Partnership" },
    { label: "Product question", value: "Product" },
    { label: "Something else", value: "General" },
  ],
  formSubmitLabel: "Send message",
  placeholderFirstName: "Alex",
  placeholderLastName: "Rivera",
  placeholderPhone: "+1 555 0100",
  placeholderEmail: "you@example.com",
  placeholderProduct: "Topic",
  placeholderMessage: "Tell us what you are working on…",
  mailtoEmail: "hello@mynella.com",
  partnershipText: "Brands & creators — want to collaborate?",
  partnershipLinkLabel: "Partnership calendar",
  partnershipLinkUrl: "https://cal.com/mynella/partnership",
  investorPortalLead: "",
  investorPortalLinkLabel: "",
  investorPortalUrl: "https://www.mynella.com",
  regulatoryNote:
    "MyNella provides general beauty content, not medical advice. Patch-test products and read ingredient labels.",
} as const;
