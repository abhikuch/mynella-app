import Image from "next/image";
import styles from "./ThemedBrandImage.module.css";

type Props = {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Decorative lockups (hero marks next to headings) */
  decorative?: boolean;
};

export function ThemedBrandImage({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
  className,
  sizes = "200px",
  priority,
  decorative,
}: Props) {
  return (
    <span
      className={[styles.wrap, className].filter(Boolean).join(" ")}
      aria-hidden={decorative ? true : undefined}
    >
      {/* Toggle visibility on wrappers so Next/Image’s outer span cannot leave a second logo visible. */}
      <span className={styles.layerDark}>
        <Image
          src={darkSrc}
          alt={decorative ? "" : alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          className={styles.img}
        />
      </span>
      <span className={styles.layerLight}>
        <Image
          src={lightSrc}
          alt={decorative ? "" : alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          className={styles.img}
        />
      </span>
    </span>
  );
}
