import Image from "next/image";
import Link from "next/link";
import type { PillarAuthor } from "@/lib/eeat-author";
import styles from "./pillar-article.module.css";

function formatDisplayDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function PillarArticleByline({
  author,
  lastUpdatedIso,
  className,
}: {
  author: PillarAuthor;
  /** ISO date string for `dateModified` alignment and visible “Last updated”. */
  lastUpdatedIso: string;
  className?: string;
}) {
  return (
    <aside
      className={[styles.byline, className].filter(Boolean).join(" ")}
      aria-label="Article author"
    >
      <Image
        src={author.imagePath}
        alt=""
        width={52}
        height={52}
        className={styles.bylinePhoto}
      />
      <div className={styles.bylineText}>
        <p className={styles.bylineMeta}>
          <span className={styles.bylineLabel}>By </span>
          <Link href={author.profilePath}>{author.name}</Link>
          <span className={styles.bylineSep}> · </span>
          <span>{author.jobTitle}</span>
        </p>
        <p className={styles.bylineCreds}>{author.credentialLine}</p>
        <p className={styles.bylineRegs}>
          SEBI PMS {author.sebiPmsReg} · SEBI RA {author.sebiRaReg}
        </p>
        <p className={styles.lastUpdated}>
          Last updated:{" "}
          <time dateTime={lastUpdatedIso}>{formatDisplayDate(lastUpdatedIso)}</time>
        </p>
      </div>
    </aside>
  );
}
