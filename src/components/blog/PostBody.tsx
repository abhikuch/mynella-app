import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import styles from "./PostBody.module.css";

const components: Partial<PortableTextComponents> = {
  block: {
    h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
    normal: ({ children }) => <p className={styles.p}>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className={styles.ul}>{children}</ul>,
    number: ({ children }) => <ol className={styles.ol}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className={styles.li}>{children}</li>,
    number: ({ children }) => <li className={styles.li}>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
    em: ({ children }) => <em className={styles.em}>{children}</em>,
    link: ({ value, children }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const rel = href.startsWith("http") ? "noopener noreferrer" : undefined;
      const target = href.startsWith("http") ? "_blank" : undefined;
      return (
        <a href={href} className={styles.a} rel={rel} target={target}>
          {children}
        </a>
      );
    },
  },
};

export function PostBody({
  value,
  className,
  variant,
}: {
  value: PortableTextBlock[];
  className?: string;
  /** Tighter spacing when nested (e.g. founder bio on About). */
  variant?: "default" | "inline";
}) {
  if (!value?.length) return null;
  return (
    <div
      className={[styles.root, variant === "inline" && styles.inline, className]
        .filter(Boolean)
        .join(" ")}
    >
      <PortableText value={value} components={components} />
    </div>
  );
}
