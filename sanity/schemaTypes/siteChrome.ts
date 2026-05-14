import { defineField, defineType } from "sanity";

const labelHrefFields = [
  defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  defineField({ name: "href", type: "string", validation: (r) => r.required() }),
];

const socialFields = [
  defineField({ name: "id", type: "string", validation: (r) => r.required() }),
  defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  defineField({ name: "href", type: "string", validation: (r) => r.required() }),
];

const matcherPickFields = [
  defineField({ name: "title", type: "string", validation: (r) => r.required() }),
  defineField({ name: "href", type: "string", validation: (r) => r.required() }),
  defineField({ name: "blurb", type: "text", rows: 2, validation: (r) => r.required() }),
];

const matcherBandFields = [
  defineField({ name: "id", type: "string", description: "emerging | affluent | hnw", validation: (r) => r.required() }),
  defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  defineField({ name: "hint", type: "string", validation: (r) => r.required() }),
];

export const siteChrome = defineType({
  name: "siteChrome",
  title: "Site chrome (nav, CTAs, partners, global UI)",
  type: "document",
  preview: { prepare: () => ({ title: "Site chrome" }) },
  fields: [
    defineField({
      name: "navigation",
      title: "Main navigation",
      type: "array",
      of: [{ type: "navRoot" }],
    }),
    defineField({
      name: "ctaInvestorLogin",
      title: "CTA — Investor login URL",
      type: "string",
    }),
    defineField({ name: "ctaBookCall", title: "CTA — Book call (generic)", type: "string" }),
    defineField({ name: "ctaBookOptimus", title: "CTA — Optimus", type: "string" }),
    defineField({ name: "ctaBookPledgePlus", title: "CTA — Pledge+", type: "string" }),
    defineField({ name: "ctaBookPolaris", title: "CTA — Polaris / RA", type: "string" }),
    defineField({ name: "ctaBookPartnership", title: "CTA — Partnership", type: "string" }),
    defineField({
      name: "footerCompliance",
      title: "Footer — compliance links",
      type: "array",
      of: [{ type: "object", fields: labelHrefFields }],
    }),
    defineField({
      name: "footerCompany",
      title: "Footer — company links",
      type: "array",
      of: [{ type: "object", fields: labelHrefFields }],
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [{ type: "object", fields: socialFields }],
    }),
    defineField({
      name: "partners",
      title: "Partner logos (home strip)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "partner" }] }],
    }),
    defineField({ name: "brandName", type: "string" }),
    defineField({ name: "brandTagline", type: "string" }),
    defineField({ name: "logoAriaLabel", type: "string" }),
    defineField({ name: "heroPrimaryCtaLabel", type: "string" }),
    defineField({ name: "heroStat1Value", type: "string" }),
    defineField({ name: "heroStat1Unit", type: "string" }),
    defineField({ name: "heroStat1Label", type: "string" }),
    defineField({ name: "heroStat2Value", type: "string" }),
    defineField({ name: "heroStat2Label", type: "string" }),
    defineField({ name: "heroStat3Value", type: "string" }),
    defineField({ name: "heroStat3Unit", type: "string" }),
    defineField({ name: "heroStat3Label", type: "string" }),
    defineField({ name: "heroStat4Value", type: "string" }),
    defineField({ name: "heroStat4Label", type: "string" }),
    defineField({ name: "strategyMatcherTrigger", type: "string" }),
    defineField({ name: "strategyMatcherPanelLead", type: "text", rows: 3 }),
    defineField({ name: "strategyMatcherBrowseAllLabel", type: "string" }),
    defineField({ name: "strategyMatcherBandsAria", type: "string" }),
    defineField({
      name: "strategyMatcherBands",
      type: "array",
      of: [{ type: "object", fields: matcherBandFields }],
    }),
    defineField({
      name: "strategyMatcherPicksEmerging",
      type: "array",
      of: [{ type: "object", fields: matcherPickFields }],
    }),
    defineField({
      name: "strategyMatcherPicksAffluent",
      type: "array",
      of: [{ type: "object", fields: matcherPickFields }],
    }),
    defineField({
      name: "strategyMatcherPicksHnw",
      type: "array",
      of: [{ type: "object", fields: matcherPickFields }],
    }),
    defineField({ name: "navMobileInvestorLogin", type: "string" }),
    defineField({ name: "navMobileBookCall", type: "string" }),
    defineField({ name: "navOverviewSuffix", type: "string", description: 'e.g. "Overview"' }),
    defineField({ name: "navToggleAria", type: "string" }),
    defineField({ name: "footerProductsTitle", type: "string" }),
    defineField({ name: "footerComplianceTitle", type: "string" }),
    defineField({ name: "footerCompanyTitle", type: "string" }),
    defineField({ name: "footerSebiLine1", type: "string" }),
    defineField({ name: "footerSebiLine2", type: "string" }),
    defineField({ name: "footerSebiLine3", type: "string" }),
    defineField({ name: "footerCopyrightPrefix", type: "string", description: "e.g. © 2026" }),
    defineField({ name: "footerCopyrightOrg", type: "string" }),
    defineField({ name: "skipToContentLabel", type: "string" }),
    defineField({ name: "companyLinkedInUrl", type: "string" }),
    defineField({ name: "companyTagline", type: "text", rows: 2 }),
    defineField({ name: "companyAbout", type: "text", rows: 3 }),
    defineField({ name: "companyIndustry", type: "string" }),
    defineField({ name: "companySizeBand", type: "string" }),
    defineField({ name: "companyHeadquarters", type: "string" }),
    defineField({
      name: "companyLocations",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "lines", type: "array", of: [{ type: "string" }] }),
          ],
        },
      ],
    }),
    defineField({ name: "companySpecialties", type: "array", of: [{ type: "string" }] }),
  ],
});
