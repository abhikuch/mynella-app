"use client";

import { useState } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import styles from "./FAQ.module.css";

export type FAQAnswer = string | PortableTextBlock[];

export interface FAQItem {
  question: string;
  answer: FAQAnswer;
}

const ptComponents: Partial<PortableTextComponents> = {
  block: {
    normal: ({ children }) => <p className={styles.answerP}>{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const rel = href.startsWith("http") ? "noopener noreferrer" : undefined;
      const target = href.startsWith("http") ? "_blank" : undefined;
      return (
        <a href={href} className={styles.answerLink} rel={rel} target={target}>
          {children}
        </a>
      );
    },
  },
};

function PlusIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M6 1v10M1 6h10" />
    </svg>
  );
}

export function FAQ({ items }: { items: FAQItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className={styles.faq}>
      {items.map((item, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i} className={styles.item}>
            <button
              className={[styles.trigger, isOpen && styles.triggerOpen]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setOpenIdx(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              {item.question}
              <span
                className={[styles.icon, isOpen && styles.iconOpen]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden
              >
                <PlusIcon />
              </span>
            </button>
            <div
              className={[styles.body, isOpen && styles.bodyOpen]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles.answerWrap}>
                {typeof item.answer === "string" ? (
                  <p className={styles.answer}>{item.answer}</p>
                ) : (
                  <div className={styles.answerPt}>
                    <PortableText value={item.answer} components={ptComponents} />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
