import { unstable_cache } from "next/cache";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { SANITY_NEXT_CACHE_TAG } from "./cache-tag";
import { SANITY_UNSTABLE_CACHE_REVALIDATE_SECONDS } from "@/lib/sanity-fetch-cache";
import { getSanityClient } from "./client";

export const pageCopyByRouteQuery = `*[_type == "pageCopy" && routeKey == $routeKey][0]{
  routeKey,
  metaTitle,
  metaDescription,
  seoKeywords,
  seoOgImage,
  seoNoIndex,
  seoNoFollow,
  contentEyebrow,
  heroPill1,
  heroPill2,
  heroPill3,
  heroTitleLine1,
  heroTitleEmphasis,
  heroSubtitle,
  heroStat1Value,
  heroStat1Unit,
  heroStat1Label,
  heroStat2Value,
  heroStat2Unit,
  heroStat2Label,
  heroStat3Value,
  heroStat3Unit,
  heroStat3Label,
  heroStat4Value,
  heroStat4Unit,
  heroStat4Label,
  heroPrimaryCtaLabel,
  heroSecondaryCtaLabel,
  heroSecondaryHref,
  marqueeItems
}`;

export type PageCopyDoc = {
  routeKey: string;
  metaTitle: string | null;
  metaDescription: string | null;
  seoKeywords?: string[] | null;
  seoOgImage: SanityImageSource | null;
  seoNoIndex: boolean | null;
  seoNoFollow: boolean | null;
  contentEyebrow: string | null;
  heroPill1: string | null;
  heroPill2: string | null;
  heroPill3: string | null;
  heroTitleLine1: string | null;
  heroTitleEmphasis: string | null;
  heroSubtitle: string | null;
  heroStat1Value: string | null;
  heroStat1Unit: string | null;
  heroStat1Label: string | null;
  heroStat2Value: string | null;
  heroStat2Unit: string | null;
  heroStat2Label: string | null;
  heroStat3Value: string | null;
  heroStat3Unit: string | null;
  heroStat3Label: string | null;
  heroStat4Value: string | null;
  heroStat4Unit: string | null;
  heroStat4Label: string | null;
  heroPrimaryCtaLabel: string | null;
  heroSecondaryCtaLabel: string | null;
  heroSecondaryHref: string | null;
  marqueeItems?: string[] | null;
};

export async function getPageCopy(
  routeKey: string,
): Promise<PageCopyDoc | null> {
  const cached = unstable_cache(
    async () => {
      const client = getSanityClient();
      if (!client) return null;
      return client.fetch<PageCopyDoc | null>(pageCopyByRouteQuery, {
        routeKey,
      });
    },
    ["sanity-page-copy", routeKey],
    { revalidate: SANITY_UNSTABLE_CACHE_REVALIDATE_SECONDS, tags: [SANITY_NEXT_CACHE_TAG] },
  );
  return cached();
}
