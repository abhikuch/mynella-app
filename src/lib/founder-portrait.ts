import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlForImage } from "@/sanity/lib/image";

/** Default headshot when Studio has no founder portrait uploaded. */
export const FOUNDER_PORTRAIT_STATIC = "/team/punam-kucheria.png";

export function resolveFounderPortraitSrc(
  cmsPortrait: SanityImageSource | null | undefined,
): string {
  if (cmsPortrait) {
    const u =
      urlForImage(cmsPortrait)?.width(480).height(480).fit("crop").quality(90).url() ??
      null;
    if (u) return u;
  }
  return FOUNDER_PORTRAIT_STATIC;
}
