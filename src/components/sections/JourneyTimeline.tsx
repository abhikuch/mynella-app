"use client";

import { useCallback, useRef, useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { HomeJourneyMilestone } from "@/lib/home-page-content";
import styles from "./JourneyTimeline.module.css";

export type JourneyMilestone = HomeJourneyMilestone;

export function JourneyTimeline({
  eyebrow,
  title,
  lead,
  scrollLeftAria,
  scrollRightAria,
  regionAria,
  milestones,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  scrollLeftAria: string;
  scrollRightAria: string;
  regionAria: string;
  milestones: JourneyMilestone[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollByDir = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.max(240, Math.floor(el.clientWidth * 0.42));
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const nodes = el.querySelectorAll<HTMLElement>("[data-milestone-index]");
    const viewMid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    nodes.forEach((node) => {
      const i = Number(node.dataset.milestoneIndex);
      const center = node.offsetLeft + node.offsetWidth / 2;
      const d = Math.abs(center - viewMid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  const m = milestones[active] ?? milestones[0];

  return (
    <SectionWrapper>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      <p className={styles.lead}>{lead}</p>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navBtn}
          aria-label={scrollLeftAria}
          onClick={() => scrollByDir(-1)}
        >
          ←
        </button>
        <button
          type="button"
          className={styles.navBtn}
          aria-label={scrollRightAria}
          onClick={() => scrollByDir(1)}
        >
          →
        </button>
      </div>

      <div
        ref={scrollerRef}
        className={styles.scroller}
        onScroll={onScroll}
        tabIndex={0}
        role="region"
        aria-label={regionAria}
      >
        {milestones.map((item, i) => (
          <button
            key={item.year}
            type="button"
            data-milestone-index={i}
            className={styles.node}
            data-active={i === active}
            onClick={() => {
              setActive(i);
              const el = scrollerRef.current;
              const node = el?.querySelector<HTMLElement>(
                `[data-milestone-index="${i}"]`,
              );
              node?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }}
          >
            <span className={styles.nodeYear}>{item.year}</span>
            <span className={styles.nodeTitle}>{item.title}</span>
          </button>
        ))}
      </div>

      {m ? (
        <div className={styles.detail} key={m.year}>
          <div className={styles.detailYear}>{m.year}</div>
          <div className={styles.detailTitle}>{m.title}</div>
          <p className={styles.detailBody}>{m.detail}</p>
        </div>
      ) : null}
    </SectionWrapper>
  );
}
