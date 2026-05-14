import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo-config";
import { getSiteSettings } from "@/sanity/lib/site";

const AI_USER_AGENTS = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "CCBot",
  "anthropic-ai",
  "Claude-Web",
];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSiteSettings();
  const allowAi = settings?.seoAllowAiCrawlers !== false;
  const rules: MetadataRoute.Robots["rules"] = [{ userAgent: "*", allow: "/" }];
  if (!allowAi) {
    for (const ua of AI_USER_AGENTS) {
      rules.push({ userAgent: ua, disallow: "/" });
    }
  }
  return {
    rules,
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: new URL(SITE_URL).host,
  };
}
