import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      description: "Social preview and Article structured data.",
      options: { hotspot: true },
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title (optional)",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description (optional)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "externalUrl",
      title: "External URL (optional)",
      type: "url",
      description:
        "If set, the blog card links here instead of an on-site article. Leave body empty for link-out posts.",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt" },
  },
  orderings: [
    {
      title: "Published date, new",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
