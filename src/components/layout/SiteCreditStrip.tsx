import type { ResolvedFooterCredit } from "@/lib/footer-credit";
import styles from "./SiteCreditStrip.module.css";

export function SiteCreditStrip({ credit }: { credit: ResolvedFooterCredit }) {
  if (!credit.enabled) return null;

  return (
    <div className={styles.strip} role="contentinfo" aria-label="Site credits">
      <div className={styles.inner}>
        <p className={styles.text}>
          <span className={styles.prefix}>{credit.prefix}</span>
          <a
            href={credit.url}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {credit.name}
          </a>
        </p>
      </div>
    </div>
  );
}
