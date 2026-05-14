import Link from "next/link";
import type { PortfolioData } from "@/lib/model-portfolios";
import { ProductHeroBrand } from "@/components/ui/ProductHeroBrand";
import styles from "./PortfolioListing.module.css";

function PortfolioCard({ portfolio }: { portfolio: PortfolioData }) {
  const familyLabel = portfolio.family === "quanto" ? "Quanto" : "Alpha";
  const href =
    portfolio.family === "quanto"
      ? `/model-portfolios/quanto/${portfolio.slug}`
      : `/model-portfolios/alpha/${portfolio.slug}`;

  const brandProduct = portfolio.family === "quanto" ? "quanto" : "alpha";
  const brandTitle = portfolio.family === "quanto" ? "Quanto" : "Alpha";

  return (
    <Link href={href} className={styles.card}>
      <div className={styles.cardMark}>
        <ProductHeroBrand product={brandProduct} variant="card" title={brandTitle} />
      </div>
      <span className={styles.cardBadge}>{familyLabel}</span>
      <span className={styles.cardName}>{portfolio.name.replace(`${familyLabel} `, "")}</span>
      <span className={styles.cardTagline}>{portfolio.tagline}</span>
      <div className={styles.cardMeta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Universe</span>
          <span className={styles.metaValue}>{portfolio.universe}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Risk</span>
          <span className={styles.metaValue}>{portfolio.riskProfile}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Rebalance</span>
          <span className={styles.metaValue}>{portfolio.rebalance}</span>
        </div>
      </div>
      <span className={styles.cardArrow}>
        View portfolio <span>→</span>
      </span>
    </Link>
  );
}

export function PortfolioGrid({
  portfolios,
}: {
  portfolios: PortfolioData[];
}) {
  return (
    <div className={styles.grid}>
      {portfolios.map((p) => (
        <PortfolioCard key={p.slug} portfolio={p} />
      ))}
    </div>
  );
}

export { styles as listingStyles };
