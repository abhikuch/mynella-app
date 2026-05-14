/**
 * TODO: Consolidate blog post listing with Sanity (queries used by sitemap and /blog).
 * Sitemap currently fetches posts directly; keep in sync when wiring this module.
 */
export type BlogPostStub = { slug: string; publishedAt?: string | null; updatedAt?: string };

export async function getAllPosts(): Promise<BlogPostStub[]> {
  return [];
}
