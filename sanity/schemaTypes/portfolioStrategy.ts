import { defineField, defineType } from "sanity";

const returnRow = [
  defineField({ name: "label", type: "string", validation: (r) => r.required() }),
  defineField({ name: "portfolio", type: "string", validation: (r) => r.required() }),
  defineField({ name: "benchmark", type: "string", validation: (r) => r.required() }),
];

export const portfolioStrategy = defineType({
  name: "portfolioStrategy",
  title: "Model portfolio strategy",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug (URL segment)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "family",
      title: "Family",
      type: "string",
      options: { list: ["quanto", "alpha"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({ name: "universe", type: "string", validation: (r) => r.required() }),
    defineField({ name: "rebalance", type: "string", validation: (r) => r.required() }),
    defineField({ name: "minInvestment", type: "string", validation: (r) => r.required() }),
    defineField({ name: "riskProfile", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "methodology",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "suitableFor",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "platforms",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "slug", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", type: "string" }),
            defineField({ name: "logo", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "performance",
      type: "object",
      fields: [
        defineField({ name: "inceptionDate", type: "string", validation: (r) => r.required() }),
        defineField({ name: "cagr", type: "string", validation: (r) => r.required() }),
        defineField({ name: "benchmarkName", type: "string", validation: (r) => r.required() }),
        defineField({ name: "benchmarkCagr", type: "string", validation: (r) => r.required() }),
        defineField({
          name: "returns",
          type: "array",
          of: [{ type: "object", fields: returnRow }],
        }),
      ],
    }),
  ],
  preview: {
    select: { name: "name", family: "family", slug: "slug" },
    prepare({ name, family, slug }) {
      return { title: name || slug, subtitle: `${family} · ${slug}` };
    },
  },
});
