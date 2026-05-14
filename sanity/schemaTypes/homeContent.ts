import { defineField, defineType } from "sanity";

export const homeContent = defineType({
  name: "homeContent",
  title: "Home page — body copy",
  type: "document",
  preview: { prepare: () => ({ title: "Home page content" }) },
  groups: [
    { name: "marquee", title: "Marquee" },
    { name: "whatWeDo", title: "What we do" },
    { name: "ladder", title: "Strategy architecture" },
    { name: "serve", title: "Who we serve" },
    { name: "founder", title: "Founder" },
    { name: "partners", title: "Partners strip" },
    { name: "research", title: "Research" },
    { name: "engage", title: "How to engage" },
    { name: "faq", title: "Home FAQ" },
    { name: "features", title: "Features grid" },
    { name: "journey", title: "Journey timeline" },
    { name: "homeCta", title: "Home bottom CTA" },
    { name: "compliance", title: "Compliance board (home)" },
    { name: "labels", title: "Micro labels" },
  ],
  fields: [
    defineField({
      name: "marqueeItems",
      title: "Marquee lines",
      type: "array",
      group: "marquee",
      of: [{ type: "string" }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "whatWeDo",
      title: "What we do",
      type: "object",
      group: "whatWeDo",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "lead", title: "Lead paragraph", type: "text", rows: 4 }),
        defineField({ name: "pill1Label", type: "string" }),
        defineField({ name: "pill1Text", type: "string" }),
        defineField({ name: "pill2Label", type: "string" }),
        defineField({ name: "pill2Text", type: "string" }),
        defineField({ name: "sortNote", type: "text", rows: 2 }),
        defineField({ name: "accentCallout", type: "text", rows: 2 }),
        defineField({
          name: "products",
          title: "Product cards",
          type: "array",
          of: [{ type: "homeProductCard" }],
        }),
      ],
    }),
    defineField({
      name: "strategyArchitecture",
      title: "Strategy architecture (ladder)",
      type: "object",
      group: "ladder",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "lead", type: "text", rows: 3 }),
        defineField({
          name: "steps",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "name", type: "string", validation: (r) => r.required() }),
                defineField({ name: "desc", type: "text", rows: 2, validation: (r) => r.required() }),
                defineField({ name: "cap", type: "string", validation: (r) => r.required() }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "whoWeServe",
      title: "Who we serve",
      type: "object",
      group: "serve",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "lead", type: "text", rows: 3 }),
        defineField({
          name: "strategiesColumnTitle",
          title: "“Suitable strategies” column title",
          type: "string",
        }),
        defineField({ name: "footer", type: "text", rows: 2 }),
        defineField({
          name: "tiers",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "tier", type: "string", validation: (r) => r.required() }),
                defineField({ name: "capital", type: "string", validation: (r) => r.required() }),
                defineField({ name: "risk", type: "string", validation: (r) => r.required() }),
                defineField({
                  name: "strategies",
                  type: "array",
                  of: [{ type: "string" }],
                  validation: (r) => r.min(1),
                }),
                defineField({ name: "desc", type: "text", rows: 3, validation: (r) => r.required() }),
                defineField({ name: "cta", type: "string", validation: (r) => r.required() }),
                defineField({ name: "href", type: "string", validation: (r) => r.required() }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "founderHome",
      title: "Founder section (home)",
      type: "object",
      group: "founder",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "initials", type: "string" }),
        defineField({ name: "name", type: "string" }),
        defineField({ name: "role", type: "string" }),
        defineField({ name: "creds", type: "text", rows: 2 }),
        defineField({ name: "narrative", type: "text", rows: 6 }),
        defineField({ name: "keyline", type: "text", rows: 2 }),
        defineField({ name: "humanLabel", type: "string" }),
        defineField({ name: "humanItem1", type: "string" }),
        defineField({ name: "humanItem2", type: "string" }),
        defineField({ name: "humanItem3", type: "string" }),
        defineField({ name: "humanNote", type: "text", rows: 3 }),
        defineField({ name: "machineLabel", type: "string" }),
        defineField({ name: "machineItem1", type: "string" }),
        defineField({ name: "machineItem2", type: "string" }),
        defineField({ name: "machineItem3", type: "string" }),
        defineField({ name: "machineNote", type: "text", rows: 2 }),
        defineField({ name: "conclusion", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "partnersStrip",
      title: "Partners / execution strip",
      type: "object",
      group: "partners",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "lead", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "research",
      title: "Research & insights",
      type: "object",
      group: "research",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "body", type: "text", rows: 4 }),
        defineField({ name: "oneliner", type: "text", rows: 2 }),
        defineField({ name: "ctaLabel", type: "string" }),
        defineField({ name: "ctaHref", type: "string" }),
      ],
    }),
    defineField({
      name: "howToEngage",
      title: "How to engage",
      type: "object",
      group: "engage",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "footer", type: "string" }),
        defineField({
          name: "steps",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", type: "string", validation: (r) => r.required() }),
                defineField({ name: "desc", type: "text", rows: 3, validation: (r) => r.required() }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "homeFaq",
      title: "Home FAQ",
      type: "object",
      group: "faq",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({
          name: "items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "question", type: "string", validation: (r) => r.required() }),
                defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "featuresGrid",
      title: "Features grid (Why Clearmind)",
      type: "object",
      group: "features",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "lead", type: "text", rows: 4 }),
        defineField({
          name: "items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "iconKey",
                  title: "Icon (0–5)",
                  type: "number",
                  validation: (r) => r.required().integer().min(0).max(5),
                }),
                defineField({ name: "title", type: "string", validation: (r) => r.required() }),
                defineField({ name: "desc", type: "text", rows: 4, validation: (r) => r.required() }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "journeyTimeline",
      title: "Journey timeline",
      type: "object",
      group: "journey",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "lead", type: "text", rows: 2 }),
        defineField({ name: "scrollLeftAria", type: "string" }),
        defineField({ name: "scrollRightAria", type: "string" }),
        defineField({ name: "regionAria", type: "string" }),
        defineField({
          name: "milestones",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "year", type: "number", validation: (r) => r.required().integer() }),
                defineField({ name: "title", type: "string", validation: (r) => r.required() }),
                defineField({ name: "detail", type: "text", rows: 3, validation: (r) => r.required() }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "homeBottomCta",
      title: "Home bottom CTA band",
      type: "object",
      group: "homeCta",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "lead", type: "text", rows: 3 }),
        defineField({ name: "primaryLabel", type: "string" }),
        defineField({ name: "secondaryLabel", type: "string" }),
        defineField({ name: "secondaryMailto", type: "string" }),
      ],
    }),
    defineField({
      name: "complianceBoard",
      title: "Compliance board",
      type: "object",
      group: "compliance",
      description: "Shown above the site footer on the home page only.",
      fields: [
        defineField({ name: "eyebrow", type: "string", initialValue: "Regulatory" }),
        defineField({ name: "title", type: "string", initialValue: "Compliance Board" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({
          name: "lastUpdated",
          title: "Last updated",
          type: "date",
        }),
        defineField({
          name: "tableRows",
          title: "Grievance table rows",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "source", type: "string", validation: (r) => r.required() }),
                defineField({
                  name: "pendingLastMonth",
                  title: "Pending (last month)",
                  type: "string",
                  initialValue: "0",
                }),
                defineField({ name: "received", type: "string", initialValue: "0" }),
                defineField({ name: "resolved", type: "string", initialValue: "0" }),
                defineField({ name: "totalPending", type: "string", initialValue: "0" }),
                defineField({
                  name: "pendingOver3m",
                  title: "Pending > 3M",
                  type: "string",
                  initialValue: "0",
                }),
                defineField({
                  name: "avgResolution",
                  title: "Avg. resolution",
                  type: "string",
                  initialValue: "—",
                }),
                defineField({
                  name: "isTotalRow",
                  title: "Style as grand total",
                  type: "boolean",
                  initialValue: false,
                }),
              ],
              preview: {
                select: { source: "source", total: "isTotalRow" },
                prepare({ source, total }) {
                  return { title: source || "Row", subtitle: total ? "Total" : "" };
                },
              },
            },
          ],
        }),
        defineField({
          name: "resourceLinks",
          title: "Regulatory links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", type: "string", validation: (r) => r.required() }),
                defineField({ name: "url", type: "url", validation: (r) => r.required() }),
              ],
              preview: { select: { t: "label" }, prepare: ({ t }) => ({ title: t }) },
            },
          ],
        }),
      ],
    }),
  ],
});
