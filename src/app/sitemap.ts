import type { MetadataRoute } from "next";
import { SITE_URL, SITEMAP_PATHS } from "@/lib/seo-config";

function priorityForPath(path: string): number {
  if (path === "/") return 1.0;
  if (path === "/about" || path === "/contact") return 0.85;
  return 0.6;
}

function changeFreqForPath(path: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path === "/") return "weekly";
  return "monthly";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return SITEMAP_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: changeFreqForPath(path),
    priority: priorityForPath(path),
  }));
}
