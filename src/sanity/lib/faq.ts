import { unstable_cache } from "next/cache";
import { faqItemsWithFallback, type CmsFaqRow } from "@/lib/faq-items";
import type { FaqPlacement } from "../../../sanity/schemaTypes/faqPlacements";
import { SANITY_NEXT_CACHE_TAG } from "./cache-tag";
import { getSanityClient } from "./client";

const faqByPlacementQuery = `*[_type == "faqItem" && $placement in placements]|order(order asc){
  question,
  answer
}`;

export async function getFaqByPlacement(placement: FaqPlacement) {
  const rows = await unstable_cache(
    async () => {
      const client = getSanityClient();
      if (!client) return [];
      return client.fetch<CmsFaqRow[]>(faqByPlacementQuery, { placement });
    },
    ["sanity-faq-placement", placement],
    { revalidate: 60, tags: [SANITY_NEXT_CACHE_TAG] },
  )();
  return faqItemsWithFallback(placement, rows);
}
