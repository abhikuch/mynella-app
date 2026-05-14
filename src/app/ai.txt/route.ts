import { NextResponse } from "next/server";
import { DEFAULT_DESCRIPTION, SITE_URL, SITEMAP_PATHS } from "@/lib/seo-config";
import { getSiteSettings } from "@/sanity/lib/site";

export const revalidate = 60;

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
