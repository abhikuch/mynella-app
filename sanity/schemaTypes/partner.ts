import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner / logo",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "Website URL",
      type: "url",
      validation: (r) => r.required().uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "logo",
      title: "Logo (Sanity image)",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
        }),
      ],
    }),
    defineField({
      name: "publicLogoPath",
      title: "Fallback — path under /public",
      type: "string",
      description: "Used when no Sanity image is set, e.g. /partners/dhan.png",
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
  orderings: [
    { title: "Sort order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] },
  ],
});
