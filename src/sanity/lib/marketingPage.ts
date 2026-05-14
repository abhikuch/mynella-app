import { unstable_cache } from "next/cache";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { SANITY_NEXT_CACHE_TAG } from "./cache-tag";
import { getSanityClient } from "./client";

const marketingPageByRouteQuery = `*[_type == "marketingPage" && routeKey == $routeKey][0]{
  routeKey,
  path,
  title,
  metaTitle,
  metaDescription,
  seoOgImage,
  modules
}`;

export type ModFaqSectionDoc = {
  _type: "modFaqSection";
  _key?: string;
  eyebrow?: string | null;
  title?: string | null;
  placement?: string | null;
};

export type ModHeadingBandDoc = {
  _type: "modHeadingBand";
  _key?: string;
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
};

export type ModRichTextDoc = {
  _type: "modRichText";
  _key?: string;
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  narrow?: boolean | null;
  body?: PortableTextBlock[] | null;
};

export type MarketingContentModule = ModHeadingBandDoc | ModRichTextDoc;

export type MarketingPageDoc = {
  routeKey: string | null;
  path: string | null;
  title: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  seoOgImage: SanityImageSource | null;
  modules: unknown[] | null;
} | null;

export async function getMarketingPageByRouteKey(routeKey: string): Promise<MarketingPageDoc> {
  return unstable_cache(
    async () => {
      const client = getSanityClient();
      if (!client) return null;
      return client.fetch<MarketingPageDoc>(marketingPageByRouteQuery, { routeKey });
    },
    ["sanity-marketing-page", routeKey],
    { revalidate: 60, tags: [SANITY_NEXT_CACHE_TAG] },
  )();
}

export function firstModFaqSection(doc: MarketingPageDoc): ModFaqSectionDoc | null {
  if (!doc?.modules?.length) return null;
  for (const m of doc.modules) {
    if (m && typeof m === "object" && (m as ModFaqSectionDoc)._type === "modFaqSection") {
      return m as ModFaqSectionDoc;
    }
  }
  return null;
}

/** Heading bands and rich text blocks, in document order (excludes FAQ modules). */
export function marketingContentModules(doc: MarketingPageDoc): MarketingContentModule[] {
  if (!doc?.modules?.length) return [];
  const out: MarketingContentModule[] = [];
  for (const m of doc.modules) {
    if (!m || typeof m !== "object") continue;
    const t = (m as { _type?: string })._type;
    if (t === "modHeadingBand" || t === "modRichText") {
      out.push(m as MarketingContentModule);
    }
  }
  return out;
}
