import { NextResponse } from "next/server";
import { DEFAULT_DESCRIPTION, SITE_URL, SITEMAP_PATHS } from "@/lib/seo-config";
import { getSiteSettings } from "@/sanity/lib/site";

/** Literal for Next segment config (imports are not allowed here). Matches `SANITY_UNSTABLE_CACHE_REVALIDATE_SECONDS`. */
export const revalidate = 3600;

export async function GET() {
  const settings = await getSiteSettings();
  const lines = [
    "# MyNella",
    "",
    `Site: ${SITE_URL}`,
    "",
    DEFAULT_DESCRIPTION,
    "",
    "## Key paths",
    ...SITEMAP_PATHS.map((p) => `- ${SITE_URL}${p}`),
    "",
  ];
  if (settings?.seoLlmsTxtExtra?.trim()) {
    lines.push(settings.seoLlmsTxtExtra.trim());
    lines.push("");
  }
  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
