import { defineField, defineType } from "sanity";
import { siteSettingsDefaults } from "../defaultContent/siteDefaults";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  initialValue: () => ({ ...siteSettingsDefaults }),
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
  fields: [
    defineField({
      name: "homeEyebrowTag",
      title: "Home — eyebrow (pill)",
      type: "string",
      description: "Line next to the green dot under the nav.",
    }),
    defineField({
      name: "homeTitleLine1",
      title: "Home — title line 1",
      type: "string",
    }),
    defineField({
      name: "homeTitleEmphasis",
      title: "Home — title (italic line)",
      type: "string",
    }),
    defineField({
      name: "homeSubtitle",
      title: "Home — subtitle paragraph",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "aboutPill1",
      title: "About — pill 1",
      type: "string",
    }),
    defineField({
      name: "aboutPill2",
      title: "About — pill 2",
      type: "string",
    }),
    defineField({
      name: "aboutTitleLine1",
      title: "About — title line 1",
      type: "string",
    }),
    defineField({
      name: "aboutTitleEmphasis",
      title: "About — title (italic)",
      type: "string",
    }),
    defineField({
      name: "aboutSub",
      title: "About — hero subtitle",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "founderName",
      title: "Founder — name",
      type: "string",
    }),
    defineField({
      name: "founderRole",
      title: "Founder — role",
      type: "string",
    }),
    defineField({
      name: "founderInitials",
      title: "Founder — initials (avatar fallback)",
      type: "string",
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "founderCreds",
      title: "Founder — credential line",
      type: "string",
    }),
    defineField({
      name: "founderBio",
      title: "Founder — bio",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "footerBrandDescription",
      title: "Footer — brand blurb",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "footerDisclaimer",
      title: "Footer — disclaimer",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "legalTermsUrl",
      title: "Legal — Terms & Conditions URL",
      type: "url",
    }),
    defineField({
      name: "legalPrivacyUrl",
      title: "Legal — Privacy policy URL",
      type: "url",
    }),
    defineField({
      name: "teamRosterLead",
      title: "About — team roster intro",
      type: "text",
      rows: 2,
      description: "Paragraph above the team grid.",
    }),
    defineField({
      name: "seoDefaultOgImage",
      title: "SEO — default share image",
      type: "image",
      description: "Overrides the built-in default Open Graph image when set (~1200×630).",
      options: { hotspot: true },
    }),
    defineField({
      name: "seoOrganizationLogo",
      title: "SEO — organization logo (structured data)",
      type: "image",
      description: "Optional; replaces the default logo in Organization JSON-LD.",
      options: { hotspot: true },
    }),
    defineField({
      name: "seoGoogleSiteVerification",
      title: "SEO — Google Search Console",
      type: "string",
      description: "google-site-verification content value only.",
    }),
    defineField({
      name: "seoBingSiteVerification",
      title: "SEO — Bing Webmaster",
      type: "string",
      description: "msvalidate.01 meta content value.",
    }),
    defineField({
      name: "seoLlmsTxtExtra",
      title: "LLM — extra llms.txt",
      type: "text",
      rows: 10,
      description: "Appended to /llms.txt and /ai.txt after auto-generated site summary.",
    }),
    defineField({
      name: "seoAllowAiCrawlers",
      title: "LLM — allow AI crawlers in robots.txt",
      type: "boolean",
      description: "Off = disallow common training crawlers (GPTBot, Claude-Web, CCBot, etc.).",
      initialValue: true,
    }),
  ],
});
