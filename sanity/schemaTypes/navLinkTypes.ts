import { defineField, defineType } from "sanity";

function hrefRequiredMessage() {
  return "Set a URL path in href (e.g. /about).";
}

/** Third-level mega-menu link */
export const navGrandchild = defineType({
  name: "navGrandchild",
  title: "Nav sub-link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      type: "string",
      description: "Path or URL (e.g. /about or https://…).",
      validation: (r) => r.required(),
    }),
  ],
});

/** Second-level nav group */
export const navChild = defineType({
  name: "navChild",
  title: "Nav group",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      type: "string",
      description: "Overview link path or URL.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "string" }),
    defineField({
      name: "children",
      type: "array",
      of: [{ type: "navGrandchild" }],
    }),
  ],
});

/** Top-level nav item */
export const navRoot = defineType({
  name: "navRoot",
  title: "Nav item",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      type: "string",
      description: "Top-level path or URL.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", type: "string" }),
    defineField({
      name: "children",
      type: "array",
      of: [{ type: "navChild" }],
    }),
  ],
  validation: (Rule) =>
    Rule.custom((obj) => {
      const o = obj as { href?: string | null } | undefined;
      if (!o) return true;
      if (o.href?.trim()) return true;
      return hrefRequiredMessage();
    }),
});
