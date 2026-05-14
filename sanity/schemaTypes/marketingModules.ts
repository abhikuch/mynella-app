import { defineField, defineType } from "sanity";
import { FAQ_PLACEMENT_OPTIONS } from "./faqPlacements";

const placementList = FAQ_PLACEMENT_OPTIONS.map((o) => ({ title: o.title, value: o.value }));

export const modFaqSection = defineType({
  name: "modFaqSection",
  title: "FAQ section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Heading", type: "string" }),
    defineField({
      name: "placement",
      title: "FAQ placement",
      type: "string",
      options: { list: [...placementList] },
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "title", placement: "placement" },
    prepare({ title, placement }) {
      return { title: title || "FAQ block", subtitle: placement };
    },
  },
});

export const modRichText = defineType({
  name: "modRichText",
  title: "Rich text",
  type: "object",
  fields: [
    defineField({
      name: "narrow",
      title: "Narrow column",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      validation: (r) => r.min(1),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Rich text" };
    },
  },
});

export const modHeadingBand = defineType({
  name: "modHeadingBand",
  title: "Heading band",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "title" },
  },
});
