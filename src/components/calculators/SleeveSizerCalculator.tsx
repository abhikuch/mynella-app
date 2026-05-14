"use client";

import { useState } from "react";
import Link from "next/link";
import { CalcShell } from "./CalcShell";
import styles from "./SleeveSizerCalculator.module.css";

// ─── Quiz definition ────────────────────────────────────────────────────────

interface Option {
  label: string;
  sub?: string;
  score: number; // 1 = very conservative … 5 = very aggressive
}

interface Question {
  id: string;
  question: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: "horizon",
    question: "How long can you stay invested without needing the money?",
    options: [
      { label: "Less than 1 year", score: 1 },
      { label: "1 – 2 years", score: 2 },
      { label: "2 – 5 years", score: 3 },
      { label: "5 – 10 years", score: 4 },
      { label: "10+ years", score: 5 },
    ],
  },
  {
    id: "drawdown",
    question: "Your ₹10L portfolio drops to ₹7L in 6 months. What do you do?",
    options: [
      { label: "Exit immediately", sub: "Preserve what's left", score: 1 },
      { label: "Exit most of it", sub: "Too uncomfortable", score: 2 },
      { label: "Hold and wait", sub: "Part of the game", score: 3 },
      { label: "Hold and review", sub: "Check thesis first", score: 4 },
      { label: "Buy more", sub: "Conviction stays", score: 5 },
    ],
  },
  {
    id: "income",
    question: "How stable is your income / cash flow?",
    options: [
      { label: "Very uncertain", sub: "Irregular / freelance", score: 1 },
      { label: "Somewhat stable", sub: "Variable bonuses", score: 2 },
      { label: "Stable", sub: "Salaried", score: 3 },
      { label: "Multiple sources", sub: "Job + side income", score: 4 },
      { label: "Very stable", sub: "High-earning / business", score: 5 },
    ],
  },
  {
    id: "purpose",
    question: "What is this corpus primarily for?",
    options: [
      { label: "Emergency / near-term need", score: 1 },
      { label: "A specific goal in 2–3 years", sub: "House, education…", score: 2 },
      { label: "Wealth building", sub: "5–7 year view", score: 3 },
      { label: "Retirement corpus", sub: "10–20 year view", score: 4 },
      { label: "Generational wealth", sub: "No fixed timeline", score: 5 },
    ],
  },
  {
    id: "experience",
    question: "How much investing experience do you have?",
    options: [
      { label: "None", sub: "FD / savings only", score: 1 },
      { label: "Mutual funds only", score: 2 },
      { label: "Mutual funds + some equity", score: 3 },
      { label: "Direct equity / PMS", score: 4 },
      { label: "F&O / alt strategies", sub: "Leverage familiar", score: 5 },
    ],
  },
];

// ─── Risk profiles ───────────────────────────────────────────────────────────

interface Profile {
  id: string;
  label: string;
  tagline: string;
  color: string;
  accentBg: string;
  description: string;
  maxDrawdown: string;
  expectedReturn: string;
  horizon: string;
  products: { name: string; href: string; reason: string }[];
  avoid: string;
}

const PROFILES: Profile[] = [
  {
    id: "conservative",
    label: "Conservative",
    tagline: "Capital protection first",
    color: "#94a3b8",
    accentBg: "rgba(148,163,184,0.08)",
    description:
      "You prioritise protecting your money above growth. Short horizon, low tolerance for paper losses, and likely a near-term need for the capital.",
    maxDrawdown: "5 – 10%",
    expectedReturn: "7 – 10% p.a.",
    horizon: "< 2 years",
    products: [],
    avoid: "High-volatility strategies like Optimus, Pledge+, or concentrated equity PMS.",
  },
  {
    id: "moderate",
    label: "Moderate",
    tagline: "Steady compounding over time",
    color: "#60a5fa",
    accentBg: "rgba(96,165,250,0.08)",
    description:
      "You want meaningful growth and can handle moderate swings, but aren't here to take concentrated bets. Steady, process-driven compounding over 3–5 years.",
    maxDrawdown: "15 – 20%",
    expectedReturn: "12 – 15% p.a.",
    horizon: "3 – 5 years",
    products: [
      { name: "Alpha 100 / Alpha 200", href: "/model-portfolios/alpha/alpha-100", reason: "Momentum equity with Nifty universe, systematic rebalancing" },
      { name: "Quanto series", href: "/model-portfolios/quanto", reason: "Quant-driven cap-segment portfolios, diversified" },
    ],
    avoid: "Derivatives-heavy strategies or leverage.",
  },
  {
    id: "growth",
    label: "Growth",
    tagline: "Concentrated equity, longer run",
    color: "#22c55e",
    accentBg: "rgba(34,197,94,0.08)",
    description:
      "You're comfortable with drawdowns of 25%+ and have a 5–10 year view. You understand concentration risk and are here to build real wealth, not just beat inflation.",
    maxDrawdown: "20 – 30%",
    expectedReturn: "15 – 20% p.a.",
    horizon: "5 – 10 years",
    products: [
      { name: "Polaris Lite", href: "/algo/polaris-lite", reason: "Systematic equity at ₹10L — the Polaris engine made accessible" },
      { name: "Polaris PMS", href: "/pms/polaris", reason: "Discretionary PMS with full conviction, ₹50L+ ticket" },
    ],
    avoid: "Strategies requiring active monitoring or derivatives literacy.",
  },
  {
    id: "aggressive",
    label: "Aggressive",
    tagline: "Absolute returns, full risk budget",
    color: "#f59e0b",
    accentBg: "rgba(245,158,11,0.08)",
    description:
      "You deploy serious capital, understand leverage, and expect institutional-style execution. Drawdowns don't rattle you — they're opportunities. You're here for outsized risk-adjusted returns.",
    maxDrawdown: "30 – 40%",
    expectedReturn: "20%+ p.a.",
    horizon: "5+ years",
    products: [
      { name: "Optimus", href: "/algo/optimus", reason: "Algo options strategy — market-agnostic absolute returns" },
      { name: "Pledge+ Mini", href: "/algo/pledge-plus-mini", reason: "Pledged-capital commodities derivatives strategy from ₹50L" },
      { name: "Pledge+", href: "/algo/pledge-plus", reason: "Leverage on pledged equity, for capital-efficient F&O exposure" },
    ],
    avoid: "This category is NOT suitable for first-time investors or short time horizons.",
  },
];

function scoreToProfile(avg: number): Profile {
  if (avg <= 1.8) return PROFILES[0];
  if (avg <= 2.8) return PROFILES[1];
  if (avg <= 3.8) return PROFILES[2];
  return PROFILES[3];
}

const BOOK_CALL = "https://cal.com/mynella/talk";

// ─── Component ────────────────────────────────────────────────────────────────

export function SleeveSizerCalculator() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState(false);

  const answered = Object.keys(answers).length;
  const total = QUESTIONS.length;
  const allDone = answered === total;

  const avgScore = allDone
    ? Object.values(answers).reduce((a, b) => a + b, 0) / total
    : 0;
  const profile = allDone ? scoreToProfile(avgScore) : null;

  function pick(qId: string, score: number) {
    setAnswers((prev) => ({ ...prev, [qId]: score }));
    setRevealed(false);
  }

  function reset() {
    setAnswers({});
    setRevealed(false);
  }

  // Visual score bar per profile
  const profileScores = [1.4, 2.3, 3.3, 4.4]; // representative midpoints

  return (
    <CalcShell
      title="Risk Profile Finder"
      tagline="Find your risk category"
      disclaimer="This is an educational tool based on general principles. It is NOT a SEBI-registered risk profiling service, investment advice, or a recommendation to invest in any specific product. Speak to a qualified advisor before investing."
    >
      {/* Progress bar */}
      <div className={styles.progress}>
        <div className={styles.progressBar} style={{ width: `${(answered / total) * 100}%` }} />
      </div>
      <div className={styles.progressLabel}>{answered} of {total} answered</div>

      {/* Questions */}
      <div className={styles.questions}>
        {QUESTIONS.map((q, qi) => {
          const selected = answers[q.id];
          const isAnswered = selected !== undefined;
          return (
            <div key={q.id} className={`${styles.qBlock} ${isAnswered ? styles.qAnswered : ""}`}>
              <div className={styles.qNum}>Q{qi + 1}</div>
              <div className={styles.qText}>{q.question}</div>
              <div className={styles.qOptions}>
                {q.options.map((opt) => {
                  const active = selected === opt.score;
                  return (
                    <button
                      key={opt.score}
                      className={`${styles.optBtn} ${active ? styles.optBtnActive : ""}`}
                      onClick={() => pick(q.id, opt.score)}
                    >
                      <span className={styles.optLabel}>{opt.label}</span>
                      {opt.sub && <span className={styles.optSub}>{opt.sub}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reveal button */}
      {allDone && !revealed && (
        <button className={styles.revealBtn} onClick={() => setRevealed(true)}>
          See my risk profile →
        </button>
      )}

      {/* Result */}
      {allDone && revealed && profile && (
        <div className={styles.result} style={{ background: profile.accentBg, borderColor: profile.color + "44" }}>
          {/* Profile header */}
          <div className={styles.resultHeader}>
            <div>
              <div className={styles.resultCategory} style={{ color: profile.color }}>
                Your risk category
              </div>
              <div className={styles.resultLabel} style={{ color: profile.color }}>
                {profile.label}
              </div>
              <div className={styles.resultTagline}>{profile.tagline}</div>
            </div>
            {/* Score gauge */}
            <div className={styles.gauge}>
              {PROFILES.map((p, i) => (
                <div
                  key={p.id}
                  className={`${styles.gaugeSegment} ${profile.id === p.id ? styles.gaugeActive : ""}`}
                  style={{ background: profile.id === p.id ? p.color : "rgba(255,255,255,0.08)" }}
                  title={p.label}
                />
              ))}
              <div className={styles.gaugeLabels}>
                <span>Conservative</span>
                <span>Aggressive</span>
              </div>
            </div>
          </div>

          <p className={styles.resultDesc}>{profile.description}</p>

          {/* Stats row */}
          <div className={styles.statRow}>
            <div className={styles.stat}>
              <div className={styles.statVal} style={{ color: profile.color }}>{profile.expectedReturn}</div>
              <div className={styles.statLbl}>Expected return</div>
            </div>
            <div className={styles.stat}>
              <div className={`${styles.statVal} ${styles.negVal}`}>{profile.maxDrawdown}</div>
              <div className={styles.statLbl}>Max drawdown range</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statVal}>{profile.horizon}</div>
              <div className={styles.statLbl}>Suggested horizon</div>
            </div>
          </div>

          {/* Matched products */}
          {profile.products.length > 0 && (
            <div className={styles.matchSection}>
              <div className={styles.matchTitle} style={{ color: profile.color }}>
                MyNella mandates that match your profile
              </div>
              <div className={styles.matchCards}>
                {profile.products.map((p) => (
                  <Link key={p.href} href={p.href} className={styles.matchCard} style={{ borderColor: profile.color + "33" }}>
                    <div className={styles.matchName} style={{ color: profile.color }}>{p.name}</div>
                    <div className={styles.matchReason}>{p.reason}</div>
                    <div className={styles.matchCta}>Learn more →</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Avoid note */}
          <div className={styles.avoidBox}>
            <span className={styles.avoidIcon}>⚠</span>
            <span>{profile.avoid}</span>
          </div>

          {/* CTA row */}
          <div className={styles.ctaRow}>
            <a href={BOOK_CALL} target="_blank" rel="noopener noreferrer" className={styles.ctaPrimary}>
              Book a call to discuss your profile
            </a>
            <button className={styles.ctaReset} onClick={reset}>
              Retake quiz
            </button>
          </div>
        </div>
      )}
    </CalcShell>
  );
}
