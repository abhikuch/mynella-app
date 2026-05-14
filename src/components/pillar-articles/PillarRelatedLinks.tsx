import Link from "next/link";
import { getPillarInterlinks } from "@/lib/pillar-interlinks";
import styles from "./PillarRelatedLinks.module.css";

function ArrowIcon() {
  return (
    <svg
      className={styles.arrow}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 4l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PillarRelatedLinks({ pathname }: { pathname: string }) {
  const links = getPillarInterlinks(pathname).filter((l) => l.href !== pathname);
  if (!links.length) return null;

  return (
    <aside className={styles.wrap} aria-labelledby="related-reading-heading">
      <div className={styles.header}>
        <p className={styles.kicker}>Continue exploring</p>
        <h2 id="related-reading-heading" className={styles.title}>
          Related reading
        </h2>
        <p className={styles.sub}>
          Next pages in the MyNella library — same disclosure standards, structured for diligence.
        </p>
      </div>
      <ul className={styles.grid}>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={styles.card}>
              <span className={styles.cardLabel}>{l.label}</span>
              <ArrowIcon />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
