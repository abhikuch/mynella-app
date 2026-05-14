import type { MetadataRoute } from "next";
import { getSanityClient } from "@/sanity/lib/client";
import { SITE_URL, SITEMAP_PATHS } from "@/lib/seo-config";

type PostSitemapRow = {
  slug: string;
  publishedAt: string | null;
  _updatedAt: string;
};

function priorityForPath(path: string): number {
  if (path === "/") return 1.0;
  if (
    [
      "/pms/polaris",
      "/algo/optimus",
      "/algo/polaris-lite",
      "/algo/pledge-plus",
      "/algo/pledge-plus-mini",
    ].includes(path)
  )
    return 0.9;
  if (["/pms", "/algo", "/model-portfolios", "/about", "/contact", "/disclosures", "/wealth-management-pune"].includes(path))
    return 0.8;
  if (path.startsWith("/model-portfolios/alpha/") || path.startsWith("/model-portfolios/quanto/")) return 0.75;
  if (path === "/calculators") return 0.8;
  if (path.startsWith("/calculators/")) return 0.7;
  if (path === "/blog") return 0.6;
  if (path.startsWith("/blog/")) return 0.65;
  if (path.startsWith("/pms/") || path.startsWith("/algo/")) return 0.75;
  if (path.startsWith("/team/")) return 0.75;
  return 0.55;
}

function changeFreqForPath(path: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (path === "/") return "weekly";
  if (path.startsWith("/calculators")) return "monthly";
  if (path.startsWith("/blog")) return "monthly";
  return "monthly";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = SITEMAP_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: changeFreqForPath(path),
    priority: priorityForPath(path),
  }));

  const client = getSanityClient();
  if (!client) return staticEntries;

  const posts = await client.fetch<PostSitemapRow[]>(
    `*[_type == "post" && defined(slug.current) && !defined(externalUrl)]{
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }`,
  );

  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt || p._updatedAt),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const e of staticEntries) byUrl.set(e.url, e);
  for (const e of blogEntries) {
    if (!byUrl.has(e.url)) byUrl.set(e.url, e);
  }
  return [...byUrl.values()];
}
