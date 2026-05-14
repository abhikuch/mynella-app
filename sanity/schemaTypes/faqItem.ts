import { defineField, defineType } from "sanity";
import { FAQ_PLACEMENT_OPTIONS } from "./faqPlacements";

const placementList = FAQ_PLACEMENT_OPTIONS.map((o) => ({ title: o.title, value: o.value }));

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "document",
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
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "placements",
      title: "Show on",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: placementList,
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: { select: { title: "question", placements: "placements" } },
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
