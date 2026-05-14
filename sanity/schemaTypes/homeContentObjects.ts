import { defineField, defineType } from "sanity";

/** Reusable home “What we do” product card (preview in Studio). */
export const homeProductCard = defineType({
  name: "homeProductCard",
  title: "Product card",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tag", title: "Description", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "min", title: "Minimum (display)", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "minLakh",
      title: "Min capital (₹ Lakhs, for sort)",
      type: "number",
      description: "Used to order cards low → high. Use 0 for “Varies”.",
      validation: (r) => r.required().integer().min(0),
    }),
    defineField({ name: "href", title: "Path", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "name", subtitle: "category" },
  },
});
