import Image from "next/image";
import Link from "next/link";
import { MyNellaMarkImage } from "./MyNellaMarkImage";
import styles from "./Logo.module.css";

export type LogoBrand = {
  name: string;
  tagline: string;
  ariaLabel: string;
};

export type LogoCustomMark = {
  url: string;
  alt: string;
};

const FALLBACK: LogoBrand = {
  name: "MyNella",
  tagline: "Invest Better",
  ariaLabel: "MyNella — Home",
};

export function Logo({
  brand,
  customMark,
  priority,
}: {
  brand?: LogoBrand | null;
  /** Sanity header logo — replaces the default mark; wordmark still uses brand name/tagline. */
  customMark?: LogoCustomMark | null;
  /** LCP: pass true in the navbar */
  priority?: boolean;
}) {
  const b = brand ?? FALLBACK;
  return (
    <Link href="/" className={styles.logo} aria-label={b.ariaLabel}>
      {customMark ?
        <Image
          src={customMark.url}
          alt={customMark.alt}
          width={120}
          height={36}
          className={styles.markCustom}
          sizes="120px"
          priority={priority}
        />
      : <MyNellaMarkImage className={styles.mark} sizes="112px" priority={priority} decorative />}
      <div className={styles.text}>
        <span className={styles.name}>{b.name}</span>
        <span className={styles.tagline}>{b.tagline}</span>
      </div>
    </Link>
  );
}
