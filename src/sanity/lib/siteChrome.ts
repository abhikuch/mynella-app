import { unstable_cache } from "next/cache";
import { resolveSiteChrome, type SiteChromeDoc } from "@/lib/site-chrome-resolve";
import { SANITY_NEXT_CACHE_TAG } from "./cache-tag";
import { getSanityClient } from "./client";

/** Expand partner refs, nav internal pages, and image URLs in one round-trip. */
export const siteChromeQuery = `*[_type == "siteChrome" && _id == "siteChrome"][0]{
  ...,
  "headerLogo": headerLogo{
    alt,
    "url": asset->url
  },
  "partners": partners[]->{
    name,
    href,
    sortOrder,
    publicLogoPath,
    "logoUrl": logo.asset->url
  },
  "navigation": navigation[]{
    label,
    href,
    description,
    "pathFromPage": internalPage->path,
    children[]{
      label,
      href,
      description,
      "pathFromPage": internalPage->path,
      children[]{
        label,
        href,
        "pathFromPage": internalPage->path
      }
    }
  }
}`;

export const getResolvedSiteChrome = unstable_cache(
  async () => {
    const client = getSanityClient();
    if (!client) return resolveSiteChrome(null);
    const doc = await client.fetch<SiteChromeDoc>(siteChromeQuery);
    return resolveSiteChrome(doc);
  },
  ["sanity-site-chrome"],
  { revalidate: 60, tags: [SANITY_NEXT_CACHE_TAG] },
);
