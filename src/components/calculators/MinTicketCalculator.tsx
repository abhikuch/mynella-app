"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CalcShell } from "./CalcShell";
import styles from "./MinTicketCalculator.module.css";

const MANDATES = [
  {
    name: "Alpha 100",
    href: "/model-portfolios/alpha/alpha-100",
    min: 500000,
    desc: "Momentum-led concentrated picks from the Nifty 100 universe",
    category: "Model Portfolio",
    tag: "Nifty 100",
  },
  {
    name: "Alpha 200",
    href: "/model-portfolios/alpha/alpha-200",
    min: 500000,
    desc: "Momentum-led concentrated picks from the Nifty 200 universe",
    category: "Model Portfolio",
    tag: "Nifty 200",
  },
  {
    name: "Quanto series",
    href: "/model-portfolios/quanto",
    min: 500000,
    desc: "Cap-segment quantitative model portfolios across large, mid, small & flexi cap",
    category: "Model Portfolio",
    tag: "Quant",
  },
  {
    name: "Polaris Lite",
    href: "/algo/polaris-lite",
    min: 1000000,
    desc: "The Polaris systematic equity engine made accessible under the RA framework",
    category: "Algo",
    tag: "RA Smallcase",
  },
  {
    name: "Optimus",
    href: "/algo/optimus",
    min: 1500000,
    desc: "Market-agnostic algo options strategy for absolute returns",
    category: "Algo",
    tag: "Options algo",
  },
  {
    name: "Polaris PMS",
    href: "/pms/polaris",
    min: 5000000,
    desc: "Flagship Portfolio Management Service — systematic equity, ₹50L minimum as per SEBI PMS regulations",
    category: "PMS",
    tag: "SEBI PMS",
  },
  {
    name: "Pledge+ Mini",
    href: "/algo/pledge-plus-mini",
    min: 5000000,
    desc: "Pledge+ framework at a lower ticket — commodity derivatives on pledged equity margin",
    category: "Algo",
    tag: "Commodities",
  },
  {
    name: "Pledge+",
    href: "/algo/pledge-plus",
    min: 10000000,
    desc: "Margin-enhanced directional F&O on pledged equity — for capital-efficient leverage at scale",
    category: "Algo",
    tag: "Derivatives",
  },
];

const BOOK_CALL = "https://cal.com/mynella/talk";

function fmtMoney(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(0)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(0)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

const QUICK_PICKS = [
  { label: "₹5L", value: 500000 },
  { label: "₹10L", value: 1000000 },
  { label: "₹15L", value: 1500000 },
  { label: "₹50L", value: 5000000 },
  { label: "₹1 Cr", value: 10000000 },
  { label: "₹5 Cr", value: 50000000 },
];

export function MinTicketCalculator() {
  const [corpus, setCorpus] = useState("5000000"); // ₹50L default

  const cap = Math.max(0, parseFloat(corpus) || 0);
  const eligible = MANDATES.filter((m) => cap >= m.min);
  const notEligible = MANDATES.filter((m) => cap < m.min);

  // Progress gauge: how far along the "ladder" of mandates
  const maxMin = MANDATES[MANDATES.length - 1].min;
  const gaugeProgress = useMemo(() => Math.min((cap / maxMin) * 100, 100), [cap]);
  // Next milestone
  const nextMandate = notEligible[0];
  const progressToNext = nextMandate
    ? Math.min((cap / nextMandate.min) * 100, 100)
    : 100;
  void progressToNext;

  return (
    <CalcShell
      title="Min. Ticket Checker"
      tagline="Find your path"
      disclaimer="Minimum investment thresholds shown are indicative. Actual eligibility depends on current product availability, regulatory requirements, and onboarding at the time of application."
    >
      <div className={styles.inputRow}>
        <div className={styles.field}>
          <label className={styles.label}>Your investable corpus (₹)</label>
          <input
            type="number"
            className={styles.input}
            value={corpus}
            onChange={(e) => setCorpus(e.target.value)}
            placeholder="e.g. 5000000"
          />
        </div>
        <div className={styles.quickPicks}>
          {QUICK_PICKS.map((q) => (
            <button
              key={q.value}
              className={`${styles.qp} ${cap === q.value ? styles.qpActive : ""}`}
              onClick={() => setCorpus(String(q.value))}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mandate ladder SVG */}
      {cap > 0 && (
        <div className={styles.ladder}>
          <div className={styles.ladderTitle}>Your corpus on the mandate ladder</div>
          <div className={styles.ladderTrack}>
            <div className={styles.ladderFill} style={{ width: `${gaugeProgress}%` }} />
            {MANDATES.map((m) => {
              const pos = (m.min / maxMin) * 100;
              const unlocked = cap >= m.min;
              return (
                <div
                  key={m.name}
                  className={`${styles.ladderMark} ${unlocked ? styles.ladderMarkOn : ""}`}
                  style={{ left: `${pos}%` }}
                  title={`${m.name} — min ${fmtMoney(m.min)}`}
                />
              );
            })}
            <div className={styles.ladderCursor} style={{ left: `${gaugeProgress}%` }} />
          </div>
          <div className={styles.ladderLabels}>
            <span>₹0</span>
            {MANDATES.map((m) => (
              <span key={m.name} style={{ left: `${(m.min / maxMin) * 100}%`, position: "absolute", transform: "translateX(-50%)", fontSize: "0.6rem", color: "var(--cm-text-muted)" }}>
                {fmtMoney(m.min)}
              </span>
            ))}
          </div>
          {nextMandate && (
            <div className={styles.ladderNext}>
              Next unlock: <strong style={{ color: "var(--cm-accent)" }}>{nextMandate.name}</strong> in{" "}
              <strong>{fmtMoney(nextMandate.min - cap)}</strong> more
            </div>
          )}
        </div>
      )}

      {cap === 0 ? (
        <div className={styles.empty}>Enter your corpus to see which mandates are accessible.</div>
      ) : (
        <>
          {eligible.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionHead}>
                <span className={styles.sectionCheck}>✓</span>
                <span>{eligible.length} mandate{eligible.length > 1 ? "s" : ""} accessible for {fmtMoney(cap)}</span>
              </div>
              <div className={styles.cards}>
                {eligible.map((m) => (
                  <div key={m.name} className={styles.card}>
                    <div className={styles.cardTop}>
                      <div>
                        <div className={styles.cardCategory}>{m.category}</div>
                        <div className={styles.cardName}>{m.name}</div>
                      </div>
                      <div className={styles.cardTag}>{m.tag}</div>
                    </div>
                    <div className={styles.cardDesc}>{m.desc}</div>
                    <div className={styles.cardBottom}>
                      <span className={styles.cardMin}>Min: {fmtMoney(m.min)}</span>
                      <div className={styles.cardCtas}>
                        <Link href={m.href} className={styles.ctaLearn}>Learn more</Link>
                        <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className={styles.ctaBook}>Book a call →</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {notEligible.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionHeadLocked}>
                <span>Requires higher capital</span>
              </div>
              <div className={styles.lockedCards}>
                {notEligible.map((m) => (
                  <div key={m.name} className={styles.lockedCard}>
                    <div className={styles.lockedName}>{m.name}</div>
                    <div className={styles.lockedMin}>Min: {fmtMoney(m.min)}</div>
                    <div className={styles.lockedNeeds}>
                      Need {fmtMoney(m.min - cap)} more
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {eligible.length === 0 && (
            <div className={styles.noEligible}>
              <p>Your corpus of {fmtMoney(cap)} is below the minimum for all current mandates.</p>
              <p>The lowest entry point is {fmtMoney(MANDATES[0].min)}.</p>
              <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className={styles.ctaBook}>
                Book a call to discuss your options →
              </a>
            </div>
          )}
        </>
      )}
    </CalcShell>
  );
}
