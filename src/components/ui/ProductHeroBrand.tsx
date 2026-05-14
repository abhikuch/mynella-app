import { BRAND_ASSETS, type ProductBrandKey } from "@/lib/brand-assets";
import { ThemedBrandImage } from "./ThemedBrandImage";
import styles from "./ProductHeroBrand.module.css";

const DIM = 1080;

type Variant = "hero" | "card" | "polarisFeature";

const variantClass: Record<Variant, string> = {
  hero: styles.heroBrand,
  card: styles.cardBrand,
  polarisFeature: styles.polarisFeatureBrand,
};

export function ProductHeroBrand({
  product,
  variant = "hero",
  className,
  priority,
  title,
}: {
  product: ProductBrandKey;
  variant?: Variant;
  className?: string;
  priority?: boolean;
  /** Visible strategy name next to the mark (logos are not always self-explanatory). */
  title?: string;
}) {
  const pair = BRAND_ASSETS.products[product];
  const img = (
    <ThemedBrandImage
      lightSrc={pair.light}
      darkSrc={pair.dark}
      alt=""
      width={DIM}
      height={DIM}
      sizes={variant === "card" ? "180px" : "280px"}
      priority={priority}
      decorative
      className={[variantClass[variant], title ? styles.withTitleInner : "", className]
        .filter(Boolean)
        .join(" ")}
    />
  );

  if (!title) return img;

  return (
    <div
      className={[
        styles.withTitle,
        variant === "hero" && styles.withTitleHero,
        variant === "card" && styles.withTitleCard,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {img}
      <span className={[styles.titleLabel, variant === "card" && styles.titleLabelCard].filter(Boolean).join(" ")}>
        {title}
      </span>
    </div>
  );
}
