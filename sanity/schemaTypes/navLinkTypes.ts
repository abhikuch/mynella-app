import { defineField, defineType } from "sanity";

function hrefOrInternalMessage() {
  return "Set a URL path in href, or pick an internal marketing page.";
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
      description: "Path or URL (e.g. /pms or https://…). Leave empty if using internal page.",
    }),
    defineField({
      name: "internalPage",
      title: "Internal page",
      type: "reference",
      to: [{ type: "marketingPage" }],
      description: "Resolves to this document's path in the app when href is empty.",
    }),
  ],
  validation: (Rule) =>
    Rule.custom((obj) => {
      const o = obj as { href?: string; internalPage?: { _ref?: string } } | undefined;
      if (!o) return true;
      if (o.internalPage?._ref) return true;
      if (o.href?.trim()) return true;
      return hrefOrInternalMessage();
    }),
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
    }),
    defineField({
      name: "internalPage",
      title: "Internal page (overview)",
      type: "reference",
      to: [{ type: "marketingPage" }],
    }),
    defineField({ name: "description", type: "string" }),
    defineField({
      name: "children",
      type: "array",
      of: [{ type: "navGrandchild" }],
    }),
  ],
  validation: (Rule) =>
    Rule.custom((obj) => {
      const o = obj as { href?: string; internalPage?: { _ref?: string } } | undefined;
      if (!o) return true;
      if (o.internalPage?._ref) return true;
      if (o.href?.trim()) return true;
      return hrefOrInternalMessage();
    }),
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
    }),
    defineField({
      name: "internalPage",
      title: "Internal page",
      type: "reference",
      to: [{ type: "marketingPage" }],
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
      const o = obj as { href?: string; internalPage?: { _ref?: string } } | undefined;
      if (!o) return true;
      if (o.internalPage?._ref) return true;
      if (o.href?.trim()) return true;
      return hrefOrInternalMessage();
    }),
});
