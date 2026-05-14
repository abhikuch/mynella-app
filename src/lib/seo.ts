import type { Metadata } from "next";
import {
  buildPageMetadata,
  type PageMetadataOptions,
} from "@/lib/seo-metadata";
import {
  DEFAULT_PILLAR_AUTHOR,
  PILLAR_CONTENT_FIRST_PUBLISHED,
  PILLAR_CONTENT_LAST_UPDATED,
} from "@/lib/eeat-author";
import { getSeoFallback } from "@/lib/seo-content";
import { SITE_URL } from "@/lib/seo-config";

/**
 * Static-route metadata helper: canonical, Open Graph, Twitter, robots.
 * Prefer `pageMetadataForRoute` when Sanity `pageCopy` exists for the route.
 */
export function buildMetadata(
  pathname: string,
  extra?: Omit<PageMetadataOptions, "pathname">,
): Metadata {
  const fb = getSeoFallback(pathname);
  return buildPageMetadata(null, fb, { pathname, ...extra });
}

/**
 * Long-form pillar / education URLs: `article` Open Graph, published/modified times,
 * and HTML `authors` aligned with visible byline + JSON-LD.
 */
export function buildPillarArticleMetadata(
  pathname: string,
  opts?: { contentLastUpdatedIso?: string },
): Metadata {
  const fb = getSeoFallback(pathname);
  const modifiedDate = opts?.contentLastUpdatedIso ?? PILLAR_CONTENT_LAST_UPDATED;
  const toOgIso = (d: string) => `${d}T12:00:00+05:30`;
  const authorUrl = `${SITE_URL}${DEFAULT_PILLAR_AUTHOR.profilePath}`;
  return buildPageMetadata(null, fb, {
    pathname,
    openGraphType: "article",
    article: {
      publishedTime: toOgIso(PILLAR_CONTENT_FIRST_PUBLISHED),
      modifiedTime: toOgIso(modifiedDate),
    },
    authors: [{ name: DEFAULT_PILLAR_AUTHOR.name, url: authorUrl }],
  });
}

/**
 * Guides/compare content moved under `/blog/{slug}`: canonical is the blog URL;
 * title/description still come from the legacy `seo-content` key for that topic.
 */
export function buildBlogStaticArticleMetadata(
  canonicalBlogPathname: string,
  seoSourcePath: string,
  opts?: { contentLastUpdatedIso?: string },
): Metadata {
  const fb = getSeoFallback(seoSourcePath);
  const modifiedDate = opts?.contentLastUpdatedIso ?? PILLAR_CONTENT_LAST_UPDATED;
  const toOgIso = (d: string) => `${d}T12:00:00+05:30`;
  const authorUrl = `${SITE_URL}${DEFAULT_PILLAR_AUTHOR.profilePath}`;
  return buildPageMetadata(null, fb, {
    pathname: canonicalBlogPathname,
    openGraphType: "article",
    article: {
      publishedTime: toOgIso(PILLAR_CONTENT_FIRST_PUBLISHED),
      modifiedTime: toOgIso(modifiedDate),
    },
    authors: [{ name: DEFAULT_PILLAR_AUTHOR.name, url: authorUrl }],
  });
}
