import type { ReactNode } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { HomeFeatureItem } from "@/lib/home-page-content";
import styles from "./FeaturesGrid.module.css";

const icons: Record<number, ReactNode> = {
  0: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83" />
    </svg>
  ),
  1: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-8 4 4 5-9" />
    </svg>
  ),
  2: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  3: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 11-6.22-8.56" />
      <path d="M21 3v5h-5" />
    </svg>
  ),
  4: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8m-4-4v4" />
    </svg>
  ),
  5: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20l4-4 4 2 4-6 4 2 4-6" />
      <path d="M22 4v4h-4" />
    </svg>
  ),
};

function iconFor(item: HomeFeatureItem) {
  const k = Math.min(5, Math.max(0, Math.floor(item.iconKey)));
  return icons[k] ?? icons[0];
}

export function FeaturesGrid({
  eyebrow,
  title,
  lead,
  items,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  items: HomeFeatureItem[];
}) {
  return (
    <SectionWrapper>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      <p className={styles.lead}>{lead}</p>
      <div className={styles.grid}>
        {items.map((f) => (
          <div key={f.title} className={styles.cell}>
            <div className={styles.icon}>{iconFor(f)}</div>
            <h4 className={styles.cellTitle}>{f.title}</h4>
            <p className={styles.cellDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
