import type { PageCopyDoc } from "@/sanity/lib/pageCopy";
import {
  buildPageMetadata,
  type PageMetadataOptions,
} from "@/lib/seo-metadata";
import type { Metadata } from "next";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { getSiteSettings } from "@/sanity/lib/site";
import { getMarketingPageByRouteKey } from "@/sanity/lib/marketingPage";
import { resolveShareImageUrl } from "@/lib/seo-sanity";
import { getSeoFallback } from "@/lib/seo-content";

/** @see buildPageMetadata — canonical, Open Graph, Twitter, robots */
export function pageMetadata(
  copy: PageCopyDoc | null | undefined,
  fallback: { title: string; description: string },
  options: PageMetadataOptions,
): Metadata {
  return buildPageMetadata(copy, fallback, options);
}

/** Fetches page copy + site settings; resolves OG from CMS with static fallback. */
export async function pageMetadataForRoute(
  routeKey: string,
  fallback: { title: string; description: string } | null,
  pathname: string,
  extra?: Pick<
    PageMetadataOptions,
    | "openGraphType"
    | "article"
    | "titleOverride"
    | "descriptionOverride"
    | "ogImageUrl"
    | "keywords"
  >,
): Promise<Metadata> {
  const fb = fallback ?? getSeoFallback(pathname);
  const [copy, settings] = await Promise.all([getPageCopy(routeKey), getSiteSettings()]);
  const ogImageUrl =
    extra?.ogImageUrl ??
    resolveShareImageUrl(pathname, [copy?.seoOgImage, settings?.seoDefaultOgImage]);
  return buildPageMetadata(copy, fb, { pathname, ogImageUrl, ...extra });
}

/** Hub pages: marketing meta + page copy + site default OG. */
export async function marketingHubMetadata(
  pageCopyRouteKey: string,
  marketingRouteKey: string,
  fallback: { title: string; description: string } | null,
  pathname: string,
): Promise<Metadata> {
  const fb = fallback ?? getSeoFallback(pathname);
  const [copy, marketing, settings] = await Promise.all([
    getPageCopy(pageCopyRouteKey),
    getMarketingPageByRouteKey(marketingRouteKey),
    getSiteSettings(),
  ]);
  const title =
    marketing?.metaTitle?.trim() || copy?.metaTitle?.trim() || fb.title;
  const description =
    marketing?.metaDescription?.trim() ||
    copy?.metaDescription?.trim() ||
    fb.description;
  const ogImageUrl = resolveShareImageUrl(pathname, [
    marketing?.seoOgImage,
    copy?.seoOgImage,
    settings?.seoDefaultOgImage,
  ]);
  return buildPageMetadata(copy, fb, {
    pathname,
    ogImageUrl,
    titleOverride: title,
    descriptionOverride: description,
  });
}

export function mergedPills(
  copy: PageCopyDoc | null | undefined,
  defaults: [string?, string?, string?],
): string[] {
  const out = [
    copy?.heroPill1?.trim() || defaults[0],
    copy?.heroPill2?.trim() || defaults[1],
    copy?.heroPill3?.trim() || defaults[2],
  ];
  return out.filter((x): x is string => Boolean(x));
}

export function mergedHeroText(
  copy: PageCopyDoc | null | undefined,
  defaults: { line1: string; emphasis?: string; sub: string },
) {
  return {
    line1: copy?.heroTitleLine1?.trim() || defaults.line1,
    emphasis:
      copy?.heroTitleEmphasis?.trim() || defaults.emphasis?.trim() || "",
    sub: copy?.heroSubtitle?.trim() || defaults.sub,
  };
}

export function mergedEyebrow(
  copy: PageCopyDoc | null | undefined,
  fallback: string,
) {
  return copy?.contentEyebrow?.trim() || fallback;
}

export type HeroStatSlot = { value: string; unit?: string; label: string };

export function mergedHeroFourStats(
  copy: PageCopyDoc | null | undefined,
  defaults: [HeroStatSlot, HeroStatSlot, HeroStatSlot, HeroStatSlot],
): HeroStatSlot[] {
  const keys = [1, 2, 3, 4] as const;
  return keys.map((n, i) => {
    const d = defaults[i];
    const value = (copy as Record<string, string | null | undefined>)[`heroStat${n}Value`]?.trim() || d.value;
    const unitRaw = (copy as Record<string, string | null | undefined>)[`heroStat${n}Unit`]?.trim();
    const unit = unitRaw !== undefined && unitRaw !== "" ? unitRaw : d.unit;
    const label = (copy as Record<string, string | null | undefined>)[`heroStat${n}Label`]?.trim() || d.label;
    return { value, unit, label };
  });
}

export function mergedHeroCtas(
  copy: PageCopyDoc | null | undefined,
  defaults: {
    primaryLabel: string;
    primaryHref: string;
    primaryExternal?: boolean;
    secondaryLabel: string;
    secondaryHref: string;
    secondaryExternal?: boolean;
  },
) {
  return {
    primaryLabel: copy?.heroPrimaryCtaLabel?.trim() || defaults.primaryLabel,
    primaryHref: defaults.primaryHref,
    primaryExternal: defaults.primaryExternal ?? true,
    secondaryLabel: copy?.heroSecondaryCtaLabel?.trim() || defaults.secondaryLabel,
    secondaryHref: copy?.heroSecondaryHref?.trim() || defaults.secondaryHref,
    secondaryExternal: defaults.secondaryExternal ?? false,
  };
}
