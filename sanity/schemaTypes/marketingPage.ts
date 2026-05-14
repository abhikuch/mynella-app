import { defineField, defineType } from "sanity";

export const marketingPage = defineType({
  name: "marketingPage",
  title: "Marketing page (modules)",
  type: "document",
  fields: [
    defineField({
      name: "routeKey",
      title: "Route key",
      type: "string",
      description: "Stable id, e.g. pms-hub, algo-hub",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "path",
      title: "URL path",
      type: "string",
      description: "Public path for internal links, e.g. /pms",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Label (desk)",
      type: "string",
    }),
    defineField({
      name: "metaTitle",
      title: "SEO title (optional override)",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "seoOgImage",
      title: "SEO — share image",
      type: "image",
      description: "Hub-level OG image; wins over page copy image.",
      options: { hotspot: true },
    }),
    defineField({
      name: "modules",
      title: "Page modules",
      type: "array",
      of: [
        { type: "modHeadingBand" },
        { type: "modFaqSection" },
        { type: "modRichText" },
      ],
    }),
  ],
  preview: {
    select: { routeKey: "routeKey", title: "title" },
    prepare({ routeKey, title }) {
      return { title: routeKey || "page", subtitle: title };
    },
  },
});
