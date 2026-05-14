import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlForImage } from "@/sanity/lib/image";
import { absoluteOgImageUrl, ogAssetPathForPathname } from "@/lib/seo-config";

export function ogUrlFromSanityImage(
  source: SanityImageSource | null | undefined,
  width = 1200,
  height = 630,
): string | null {
  if (!source) return null;
  return urlForImage(source)?.width(width).height(height).fit("crop").url() ?? null;
}

/** First usable Sanity image wins; else static OG asset for pathname. */
export function resolveShareImageUrl(
  pathname: string,
  sources: (SanityImageSource | null | undefined)[],
): string {
  for (const s of sources) {
    const u = ogUrlFromSanityImage(s);
    if (u) return u;
  }
  return absoluteOgImageUrl(ogAssetPathForPathname(pathname));
}

export function organizationLogoAbsoluteUrl(
  source: SanityImageSource | null | undefined,
): string | null {
  return ogUrlFromSanityImage(source, 512, 512);
}
