/**
 * Minimal site chrome for MyNella (beauty / makeup marketing site).
 */

export const siteChromeSeed = {
  _id: "siteChrome" as const,
  _type: "siteChrome" as const,
  navigation: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  ctaInvestorLogin: "https://www.mynella.com",
  ctaBookCall: "https://cal.com/mynella/talk",
  ctaBookOptimus: "https://www.mynella.com/contact",
  ctaBookPledgePlus: "https://www.mynella.com/contact",
  ctaBookPolaris: "https://www.mynella.com/contact",
  ctaBookPartnership: "https://www.mynella.com/contact",
  footerCompliance: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
  ],
  footerCompany: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
  ],
  socialLinks: [
    { id: "x", label: "X", href: "https://x.com/mynella" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/mynella" },
    { id: "substack", label: "Newsletter", href: "https://www.mynella.com" },
  ],
  brandName: "MyNella",
  brandTagline: "Makeup & beauty",
  logoAriaLabel: "MyNella — Home",
  navMobileInvestorLogin: "Account",
  navMobileBookCall: "Book a call",
  navOverviewSuffix: "Overview",
  navToggleAria: "Toggle navigation",
  footerProductsTitle: "Explore",
  footerComplianceTitle: "Legal",
  footerCompanyTitle: "Company",
  footerSebiLine1: "MyNella is a content and commerce brand.",
  footerSebiLine2: "Replace these lines in Sanity with your registered business details.",
  footerSebiLine3: "© MyNella. All rights reserved.",
  footerCopyrightPrefix: "©",
  footerCopyrightOrg: "MyNella",
  skipToContentLabel: "Skip to content",
  companyLinkedInUrl: "https://www.linkedin.com/company/mynella",
  companyTagline: "Makeup tutorials, honest reviews, and editorial beauty content.",
  companyAbout:
    "MyNella is the public marketing site for a modern makeup brand. Swap this copy in Sanity Studio under Site chrome.",
  companyIndustry: "Beauty & personal care",
  companySizeBand: "Small team",
  companyHeadquarters: "Remote-first",
  companyLocations: [
    {
      label: "HQ",
      lines: ["Update in Sanity with your studio or office address."],
    },
  ],
  companySpecialties: ["Makeup", "Skincare", "Editorial", "Tutorials", "Product reviews"],
  headerUtilityLinks: [],
  footerProductNavLabels: [] as string[],
} as const;
