import { defineArrayMember, defineField, defineType } from "sanity";

const statFields = (n: 1 | 2 | 3 | 4) => [
  defineField({
    name: `heroStat${n}Value`,
    title: `Stat ${n} — value`,
    type: "string",
    description: "Main number or text (e.g. 90.73, ₹0, SEBI).",
  }),
  defineField({
    name: `heroStat${n}Unit`,
    title: `Stat ${n} — unit (optional)`,
    type: "string",
    description: "Suffix such as %, ×, + yrs. Omit for single-line stats (e.g. ₹1 Cr).",
  }),
  defineField({
    name: `heroStat${n}Label`,
    title: `Stat ${n} — label`,
    type: "string",
  }),
];

export const pageCopy = defineType({
  name: "pageCopy",
  title: "Page copy",
  type: "document",
  groups: [
    { name: "seo", title: "SEO" },
    { name: "hero", title: "Hero" },
    { name: "heroStats", title: "Hero — four stats" },
    { name: "heroCtas", title: "Hero — buttons" },
    { name: "marquee", title: "Marquee" },
  ],
  fields: [
    defineField({
      name: "routeKey",
      title: "Route key",
      type: "string",
      description:
        "Stable id for this page (e.g. contact, pms-polaris, portfolio-quanto-large-cap). Must match site code.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaTitle",
      title: "SEO — title",
      type: "string",
      description: "Shown in the browser tab; template adds “| MyNella”.",
      group: "seo",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO — description",
      type: "text",
      rows: 3,
      group: "seo",
    }),
    defineField({
      name: "seoKeywords",
      title: "SEO — keywords (optional)",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Optional `<meta name=\"keywords\">` list. When set, overrides code defaults for this route (e.g. calculator keyword lists).",
      group: "seo",
    }),
    defineField({
      name: "seoOgImage",
      title: "SEO — share image",
      type: "image",
      description: "Overrides site default for this page.",
      options: { hotspot: true },
      group: "seo",
    }),
    defineField({
      name: "seoNoIndex",
      title: "SEO — noindex",
      type: "boolean",
      initialValue: false,
      group: "seo",
    }),
    defineField({
      name: "seoNoFollow",
      title: "SEO — nofollow",
      type: "boolean",
      initialValue: false,
      group: "seo",
    }),
    defineField({
      name: "contentEyebrow",
      title: "Section eyebrow (optional)",
      type: "string",
      description: "For listing-style headers (e.g. Model Portfolios · Alpha).",
      group: "hero",
    }),
    defineField({
      name: "heroPill1",
      title: "Hero — pill 1",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroPill2",
      title: "Hero — pill 2",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroPill3",
      title: "Hero — pill 3",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTitleLine1",
      title: "Hero — title line 1",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTitleEmphasis",
      title: "Hero — title (italic line)",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero — subtitle",
      type: "text",
      rows: 4,
      group: "hero",
    }),
    ...statFields(1).map((f) => ({ ...f, group: "heroStats" as const })),
    ...statFields(2).map((f) => ({ ...f, group: "heroStats" as const })),
    ...statFields(3).map((f) => ({ ...f, group: "heroStats" as const })),
    ...statFields(4).map((f) => ({ ...f, group: "heroStats" as const })),
    defineField({
      name: "heroPrimaryCtaLabel",
      title: "Primary button label",
      type: "string",
      description: "Overrides default label; booking URL is fixed in code per product.",
      group: "heroCtas",
    }),
    defineField({
      name: "heroSecondaryCtaLabel",
      title: "Secondary button label",
      type: "string",
      group: "heroCtas",
    }),
    defineField({
      name: "heroSecondaryHref",
      title: "Secondary button link",
      type: "string",
      description: "Hash or path (e.g. #fees, #strategy-objective).",
      group: "heroCtas",
    }),
    defineField({
      name: "marqueeItems",
      title: "Marquee items",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Ticker lines under the hero. Leave empty to use built-in defaults for this route.",
      group: "marquee",
    }),
    defineField({
      name: "landingFaq",
      title: "Landing — FAQ (home only)",
      type: "array",
      group: "hero",
      description:
        "Optional Q&A shown on the Nella home landing (`routeKey` home). Leave empty to use built-in defaults in code.",
      of: [
        defineArrayMember({
          type: "object",
          name: "landingFaqItem",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { routeKey: "routeKey", metaTitle: "metaTitle" },
    prepare({ routeKey, metaTitle }) {
      return {
        title: routeKey || "Untitled route",
        subtitle: metaTitle || "—",
      };
    },
  },
});
