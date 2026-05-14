import { BRAND_ASSETS } from "@/lib/brand-assets";
import { ThemedBrandImage } from "./ThemedBrandImage";

const DIM = 1080;

export function MyNellaMarkImage({
  className,
  sizes = "200px",
  priority,
  decorative = true,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  return (
    <ThemedBrandImage
      lightSrc={BRAND_ASSETS.mynellaMark.light}
      darkSrc={BRAND_ASSETS.mynellaMark.dark}
      alt={decorative ? "" : "MyNella"}
      width={DIM}
      height={DIM}
      sizes={sizes}
      priority={priority}
      decorative={decorative}
      className={className}
    />
  );
}
