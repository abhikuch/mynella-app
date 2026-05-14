import Link from "next/link";
import styles from "./pillar-article.module.css";

export type Crumb = { label: string; href?: string };

export function PillarArticleLayout({
  crumbs,
  children,
}: {
  crumbs: Crumb[];
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrap}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <ol>
          {crumbs.map((c, i) => (
            <li key={`${c.label}-${i}`}>
              {c.href ? (
                <Link href={c.href}>{c.label}</Link>
              ) : (
                <span aria-current="page">{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <article className={styles.article}>{children}</article>
    </div>
  );
}
