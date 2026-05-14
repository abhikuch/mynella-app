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
    defineField({
      name: "headerUtilityLinks",
      title: "Header utility links (optional)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", type: "string", validation: (r) => r.required() }),
            defineField({ name: "openInNewTab", type: "boolean", initialValue: false }),
          ],
        },
      ],
    }),
    defineField({
      name: "headerLogo",
      title: "Header logo override (optional)",
      type: "object",
      fields: [
        defineField({ name: "url", type: "url" }),
        defineField({ name: "alt", type: "string" }),
      ],
    }),
    defineField({ name: "headerShowInvestorLogin", type: "boolean" }),
    defineField({ name: "headerShowBookCall", type: "boolean" }),
    defineField({ name: "headerNavInvestorLabel", type: "string" }),
    defineField({ name: "headerNavBookLabel", type: "string" }),
    defineField({ name: "footerShowProductsColumn", type: "boolean" }),
    defineField({ name: "footerProductNavLabels", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "footerExtraColumns",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
                    defineField({ name: "href", type: "string", validation: (r) => r.required() }),
                    defineField({ name: "openInNewTab", type: "boolean", initialValue: false }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({ name: "footerShowNewsletter", type: "boolean" }),
    defineField({ name: "footerShowSocial", type: "boolean" }),
    defineField({ name: "footerShowThemeToggle", type: "boolean" }),
    defineField({ name: "footerShowSebiBlock", type: "boolean" }),
  ],
});
