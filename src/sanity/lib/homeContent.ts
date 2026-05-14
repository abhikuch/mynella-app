import { unstable_cache } from "next/cache";
import type { HomeContentRaw } from "@/lib/home-page-content";
import { SANITY_NEXT_CACHE_TAG } from "./cache-tag";
import { getSanityClient } from "./client";

export const homeContentQuery = `*[_type == "homeContent" && _id == "homeContent"][0]`;

export const getHomeContent = unstable_cache(
  async (): Promise<HomeContentRaw> => {
    const client = getSanityClient();
    if (!client) return null;
    return client.fetch<HomeContentRaw>(homeContentQuery);
  },
  ["sanity-home-content"],
  { revalidate: 60, tags: [SANITY_NEXT_CACHE_TAG] },
);
