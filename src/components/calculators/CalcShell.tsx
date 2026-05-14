"use client";

import Link from "next/link";
import styles from "./CalcShell.module.css";

interface CalcShellProps {
  title: string;
  tagline: string;
  disclaimer?: string;
  children: React.ReactNode;
  backLabel?: string;
}

const DEFAULT_DISCLAIMER =
  "All calculations are illustrative only. Not investment advice. Past performance is not indicative of future results.";

export function CalcShell({
  title,
  tagline,
  disclaimer = DEFAULT_DISCLAIMER,
  children,
  backLabel = "All calculators",
}: CalcShellProps) {
  return (
    <div className={styles.shell}>
      <div className={styles.decoClip} aria-hidden>
        <div className={styles.heroGrid} />
        <div className={styles.heroGlow} />
      </div>
      <div className={styles.inner}>
        <Link href="/calculators" className={styles.back}>
          ← {backLabel}
        </Link>
        <div className={styles.header}>
          <p className={styles.tagline}>{tagline}</p>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div className={styles.body}>{children}</div>
        <p className={styles.disclaimer}>{disclaimer}</p>
      </div>
    </div>
  );
}
