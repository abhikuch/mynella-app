import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linkedInUrl",
      title: "LinkedIn profile URL",
      type: "url",
      description: "Optional — omit when a profile is not public.",
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 0,
      description: "Lower numbers appear first.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
  orderings: [
    { title: "Sort order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] },
    { title: "Name", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],
});
