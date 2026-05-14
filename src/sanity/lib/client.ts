import { createClient, type SanityClient } from "@sanity/client";
import { apiVersion, dataset, projectId, sanityConfigured } from "../env";

export function getSanityClient(): SanityClient | null {
  if (!sanityConfigured) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    /** API origin — avoids Sanity CDN lag so published edits show up with the next cache refresh. */
    useCdn: process.env.SANITY_API_USE_CDN === "true",
  });
}
