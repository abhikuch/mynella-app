import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getSanityClient } from "./client";

export const postsListQuery = `*[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _updatedAt) desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  externalUrl
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  publishedAt,
  _updatedAt,
  excerpt,
  externalUrl,
  body,
  coverImage,
  seoTitle,
  seoDescription
}`;

export type SanityPostListItem = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string | null;
  excerpt: string | null;
  externalUrl: string | null;
};

export type SanityPostDetail = SanityPostListItem & {
  body: PortableTextBlock[] | null;
  _updatedAt?: string;
  coverImage: SanityImageSource | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

export async function fetchPostList(): Promise<SanityPostListItem[]> {
  const client = getSanityClient();
  if (!client) return [];
  return client.fetch<SanityPostListItem[]>(postsListQuery);
}

export async function fetchPostBySlug(
  slug: string,
): Promise<SanityPostDetail | null> {
  const client = getSanityClient();
  if (!client) return null;
  return client.fetch<SanityPostDetail | null>(postBySlugQuery, { slug });
}
