"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealOnViewProps = {
  children: ReactNode;
  className?: string;
  /** Stagger like mynella-v4 (.d1–.d4): 80, 160, 240, 320 ms */
  delayMs?: number;
  /**
   * When true, content is visible on first paint (no opacity:0). Use for above-the-fold
   * hero copy so LCP is not blocked waiting for IntersectionObserver / hydration.
   */
  eager?: boolean;
};

/**
 * Scroll-triggered fade + translateY, matching mynella-v4.html (.A → .V).
 * Respects prefers-reduced-motion.
 */
export function RevealOnView({
  children,
  className = "",
  delayMs = 0,
  eager = false,
}: RevealOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    if (eager) return;

    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  const cls = ["reveal", visible ? "visible" : "", className].filter(Boolean).join(" ");

  return (
    <div
      ref={ref}
      className={cls}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
