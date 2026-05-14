export const apiVersion = "2025-03-28" as const;

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

export const sanityConfigured = Boolean(projectId);
