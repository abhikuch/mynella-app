import type { Metadata } from "next";
import type { PageCopyDoc } from "@/sanity/lib/pageCopy";
import {
  DEFAULT_DESCRIPTION,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
  absoluteOgImageUrl,
  ogAssetPathForPathname,
} from "@/lib/seo-config";

export type PageMetadataOptions = {
  pathname: string;
  openGraphType?: "website" | "article";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
  };
  ogImageUrl?: string | null;
  titleOverride?: string | null;
  descriptionOverride?: string | null;
  /** Optional extra keywords for `<meta name="keywords">`. */
  keywords?: string | string[];
  /** For long-form articles (e.g. YMYL pillars) — surfaced in HTML meta. */
  authors?: { name: string; url?: string }[];
};

function absoluteUrl(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${path}`;
}

/**
 * CMS-aware metadata with canonical URL, Open Graph, and Twitter cards.
 */
/**
 * Static routes (no CMS page copy): full canonical, Open Graph, Twitter cards, and OG image.
 */
export function staticRouteMetadata(
  fallback: { title: string; description: string },
  options: PageMetadataOptions,
): Metadata {
  return buildPageMetadata(null, fallback, options);
}

export function buildPageMetadata(
  copy: PageCopyDoc | null | undefined,
  fallback: { title: string; description: string },
  options: PageMetadataOptions,
): Metadata {
  const title =
    options.titleOverride?.trim() ||
    copy?.metaTitle?.trim() ||
    fallback.title;
  const description =
    options.descriptionOverride?.trim() ||
    copy?.metaDescription?.trim() ||
    fallback.description ||
    DEFAULT_DESCRIPTION;
  const url = absoluteUrl(options.pathname);
  const ogType = options.openGraphType ?? "website";
  const shareImageUrl =
    options.ogImageUrl?.trim() ||
    absoluteOgImageUrl(ogAssetPathForPathname(options.pathname));
  const ogImages = [
    {
      url: shareImageUrl,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt: title,
    },
  ];

  const cmsKeywords =
    copy?.seoKeywords?.map((k) => k.trim()).filter(Boolean) ?? [];
  const keywords =
    cmsKeywords.length > 0 ? cmsKeywords : options.keywords;

  /**
   * If the resolved title already contains the site name, bypass the root layout's
   * `title.template` (`%s | MyNella`) so we don't render `Foo | MyNella | MyNella`.
   * Otherwise let the template append the brand. `openGraph.title` and `twitter.title`
   * are plain strings that don't read the template, so they always render exactly `title`.
   */
  const titleField = title.includes(SITE_NAME) ? { absolute: title } : title;

  const meta: Metadata = {
    title: titleField,
    description,
    ...(options.authors?.length ? { authors: options.authors } : {}),
    ...(keywords !== undefined ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      type: ogType,
      locale: "en_IN",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [shareImageUrl],
    },
    robots: { index: true, follow: true },
  };

  const noIndex = Boolean(copy?.seoNoIndex);
  const noFollow = Boolean(copy?.seoNoFollow);
  if (noIndex || noFollow) {
    meta.robots = { index: !noIndex, follow: !noFollow };
  }

  if (ogType === "article" && options.article) {
    meta.openGraph = {
      ...meta.openGraph,
      type: "article",
      publishedTime: options.article.publishedTime,
      modifiedTime: options.article.modifiedTime,
    };
  }

  return meta;
}
