"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { StrategyMatcherResolved } from "@/lib/site-chrome-resolve";
import styles from "./StrategyMatcher.module.css";

type Band = "emerging" | "affluent" | "hnw";

export function StrategyMatcher({ config }: { config: StrategyMatcherResolved }) {
  const panelId = useId();
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [band, setBand] = useState<Band | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setBand(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const openDialog = useCallback(() => {
    setOpen(true);
    setBand(null);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  const selectBand = useCallback((b: Band) => {
    setBand(b);
  }, []);

  const picksFor = (b: Band) => {
    if (b === "emerging") return config.picks.emerging;
    if (b === "affluent") return config.picks.affluent;
    return config.picks.hnw;
  };

  const modal =
    open && mounted ? (
      <div className={styles.backdrop} role="presentation" onClick={close}>
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={styles.dialog}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            onClick={close}
            aria-label="Close"
          >
            <span aria-hidden>×</span>
          </button>
          <h2 id={titleId} className={styles.srOnly}>
            {config.trigger}
          </h2>
          <p className={styles.panelLead}>{config.panelLead}</p>
          <div className={styles.bandRow} role="group" aria-label={config.bandsAria}>
            {config.bands.map((b) => (
              <button
                key={b.id}
                type="button"
                className={styles.band}
                data-active={band === b.id}
                onClick={() => selectBand(b.id)}
              >
                <span className={styles.bandLabel}>{b.label}</span>
                <span className={styles.bandHint}>{b.hint}</span>
              </button>
            ))}
          </div>

          {band ? (
            <div className={styles.results}>
              <div className={styles.resultsLabel}>Typical starting points</div>
              <ul className={styles.resultList}>
                {picksFor(band).map((p) => (
                  <li key={p.title}>
                    {p.href.startsWith("http") ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.resultLink}
                      >
                        <span className={styles.resultTitle}>{p.title}</span>
                        <span className={styles.resultBlurb}>{p.blurb}</span>
                      </a>
                    ) : (
                      <Link href={p.href} className={styles.resultLink}>
                        <span className={styles.resultTitle}>{p.title}</span>
                        <span className={styles.resultBlurb}>{p.blurb}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <Link href="#products" className={styles.allProducts} onClick={close}>
                {config.browseAllLabel}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    ) : null;

  return (
    <div className={styles.wrap}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={open ? close : openDialog}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={open ? panelId : undefined}
      >
        {config.trigger}
        <span className={styles.triggerChevron} data-open={open} aria-hidden>
          ▾
        </span>
      </button>

      {mounted && modal ? createPortal(modal, document.body) : null}
    </div>
  );
}
