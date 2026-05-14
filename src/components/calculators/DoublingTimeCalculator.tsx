"use client";

import { useState, useEffect, useRef, useMemo, useId } from "react";
import { CalcShell } from "./CalcShell";
import styles from "./DoublingTimeCalculator.module.css";

const PRESETS = [
  { label: "7%", value: 7, hint: "Conservative" },
  { label: "10%", value: 10, hint: "Steady" },
  { label: "12%", value: 12, hint: "Ambitious" },
  { label: "15%", value: 15, hint: "High growth" },
  { label: "18%", value: 18, hint: "Aggressive" },
] as const;

const SLIDER_MIN = 1;
const SLIDER_MAX = 100;

/** Shared scale for benchmark bars (years) — keeps bars comparable across rates */
const BENCH_MAX_YEARS = 30;

const BENCHMARK_RATES = [7, 10, 12, 15, 18] as const;

function fmtMoney(n: number) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  if (abs >= 1e7) return `${sign}₹${(abs / 1e7).toFixed(2)} Cr`;
  if (abs >= 1e5) return `${sign}₹${(abs / 1e5).toFixed(2)} L`;
  if (abs >= 1000) return `${sign}₹${Math.round(abs).toLocaleString("en-IN")}`;
  return `${sign}₹${abs.toFixed(0)}`;
}

function useAnimatedNumber(target: number | null, duration = 550) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (target === null) {
      setDisplay(0);
      return;
    }
    const start = performance.now();
    let from = 0;
    setDisplay((prev) => {
      from = prev;
      return prev;
    });
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (target - from) * ease);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

/** Years to go from 1× to 2× with annual compounding at rate r (decimal). */
function yearsToDouble(r: number): number {
  return Math.log(2) / Math.log(1 + r);
}

function breakDownYears(t: number): { years: number; months: number } {
  if (t < 1 / 12) return { years: 0, months: 0 };
  const y = Math.floor(t);
  const months = Math.round((t - y) * 12);
  if (months === 12) return { years: y + 1, months: 0 };
  return { years: y, months };
}

function ruleOf72Years(ratePercent: number): number {
  return 72 / ratePercent;
}

export function DoublingTimeCalculator() {
  const gradId = useId().replace(/:/g, "");
  const [ratePct, setRatePct] = useState(12);
  const [corpus, setCorpus] = useState("1000000");

  const r = ratePct / 100;
  const valid = r > 0;
  const exactYears = valid ? yearsToDouble(r) : null;
  const animated = useAnimatedNumber(exactYears);

  const breakdown = exactYears !== null ? breakDownYears(exactYears) : null;
  const rule72 = valid ? ruleOf72Years(ratePct) : null;
  const ruleErr =
    exactYears !== null && rule72 !== null ?
      Math.abs((rule72 - exactYears) / exactYears) * 100
    : null;

  const corpusN = parseFloat(corpus.replace(/,/g, "") || "0");
  const corpusOk = isFinite(corpusN) && corpusN > 0;

  const ringProgress = useMemo(() => {
    if (exactYears === null || exactYears <= 0) return 0;
    return Math.min(exactYears / 30, 1);
  }, [exactYears]);

  const R = 88;
  const C = 2 * Math.PI * R;
  const dashOffset = C * (1 - ringProgress);

  const activePreset = PRESETS.find((p) => Math.abs(p.value - ratePct) < 0.01);

  const compareMax =
    exactYears !== null && rule72 !== null ?
      Math.max(exactYears, rule72, 0.5) * 1.08
    : 1;

  return (
    <CalcShell
      title="Time to 100% Return"
      tagline="How long until your money doubles — at a steady annual return?"
      disclaimer="Assumes a constant annual return and annual compounding (end-of-year). Real markets are not smooth; taxes, fees, and volatility change outcomes. Illustrative only — not investment advice."
    >
      <div className={styles.layout}>
        <div className={styles.panel}>
          <div className={styles.panelTitle}>Set your expected return</div>

          <div className={styles.sliderWrap}>
            <div className={styles.sliderLabelRow}>
              <span className={styles.sliderLabel}>Annual return (CAGR-style)</span>
              <span className={styles.sliderValue}>{ratePct}%</span>
            </div>
            <input
              type="range"
              className={styles.slider}
              min={SLIDER_MIN}
              max={SLIDER_MAX}
              step={0.25}
              value={ratePct}
              onChange={(e) => setRatePct(parseFloat(e.target.value))}
              aria-valuemin={SLIDER_MIN}
              aria-valuemax={SLIDER_MAX}
              aria-valuenow={ratePct}
              aria-label="Expected annual return percent"
            />
            <div className={styles.sliderTicks}>
              <span>{SLIDER_MIN}%</span>
              <span>{SLIDER_MAX}%</span>
            </div>
          </div>

          <div className={styles.chips}>
            {PRESETS.map((p) => (
              <button
                key={p.value}
                type="button"
                className={`${styles.chip} ${activePreset?.value === p.value ? styles.chipActive : ""}`}
                onClick={() => setRatePct(p.value)}
              >
                {p.label} · {p.hint}
              </button>
            ))}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="dt-exact-rate">
              Exact % (type your own)
            </label>
            <input
              id="dt-exact-rate"
              type="number"
              className={styles.input}
              min={0.1}
              max={100}
              step={0.25}
              value={ratePct}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                if (!isNaN(v) && v > 0) setRatePct(Math.min(100, Math.max(0.1, v)));
              }}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="dt-corpus">
              Optional — starting amount (₹)
            </label>
            <input
              id="dt-corpus"
              type="text"
              inputMode="numeric"
              className={styles.input}
              style={{ maxWidth: "100%" }}
              placeholder="e.g. 1000000"
              value={corpus}
              onChange={(e) => setCorpus(e.target.value)}
              aria-describedby="dt-corpus-hint"
            />
            <p id="dt-corpus-hint" className={styles.hint}>
              Doesn’t change the time — it only personalises the “₹X → ₹Y” copy below.
            </p>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.resultCol}>
            <div className={styles.ringWrap} aria-hidden>
              <svg className={styles.ringSvg} viewBox="0 0 200 200">
                <defs>
                  <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--cm-accent)" />
                    <stop offset="100%" stopColor="color-mix(in srgb, var(--cm-accent) 40%, #fff)" />
                  </linearGradient>
                </defs>
                <circle className={styles.ringTrack} cx="100" cy="100" r={R} />
                <circle
                  className={styles.ringProg}
                  cx="100"
                  cy="100"
                  r={R}
                  stroke={`url(#${gradId})`}
                  strokeDasharray={C}
                  strokeDashoffset={dashOffset}
                />
              </svg>
              <div className={styles.ringCenter}>
                <span className={styles.ringKicker}>Double your capital</span>
                <span className={styles.bigYears} aria-live="polite">
                  {exactYears === null ? "—" : `${animated.toFixed(2)} yrs`}
                </span>
                {breakdown && exactYears !== null && (
                  <span className={styles.bigSub}>
                    {exactYears < 1 / 12 ?
                      "Under one month to double (very high assumed return)"
                    : (
                      <>
                        {breakdown.years > 0 ? `${breakdown.years} yr${breakdown.years === 1 ? "" : "s"} ` : ""}
                        {breakdown.months > 0 ? `${breakdown.months} mo` : ""}
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>

            {corpusOk && (
              <p className={styles.story}>
                At <strong>{ratePct}%</strong> a year,{" "}
                <strong>{fmtMoney(corpusN)}</strong> grows to{" "}
                <strong>{fmtMoney(corpusN * 2)}</strong> — a <strong>100% return</strong> — in about{" "}
                <strong>{exactYears !== null ? exactYears.toFixed(2) : "—"} years</strong>.
              </p>
            )}

            {!corpusOk && (
              <p className={styles.story}>
                At <strong>{ratePct}%</strong> a year, a <strong>100% cumulative return</strong> (double your money)
                takes about <strong>{exactYears !== null ? exactYears.toFixed(2) : "—"} years</strong> with annual
                compounding.
              </p>
            )}

            {rule72 !== null && exactYears !== null && (
              <div className={styles.rule72}>
                <strong>Rule of 72</strong> estimates ~{rule72.toFixed(2)} years (72 ÷ {ratePct}). The exact
                formula gives {exactYears.toFixed(2)} years
                {ruleErr !== null && ratePct >= 5 && ratePct <= 15 ?
                  ` — within ~${ruleErr.toFixed(0)}% of the shortcut,`
                : ""}{" "}
                which is why the rule is so handy for mental math.
              </div>
            )}
          </div>
        </div>
      </div>

      <section className={styles.visualSection} aria-labelledby="dt-compare-heading">
        <h3 id="dt-compare-heading" className={styles.visTitle}>
          Exact formula vs Rule of 72
        </h3>
        <p className={styles.visLead}>
          Same slider — two ways to estimate. Bar length scales to the larger value so you can see how close the shortcut lands.
        </p>
        {exactYears !== null && rule72 !== null && (
          <div className={styles.dualCompare}>
            <div className={styles.compareRow}>
              <div className={styles.compareLabel}>
                <span className={styles.compareName}>Exact (ln 2 ÷ ln(1+r))</span>
                <span className={styles.compareVal}>{exactYears.toFixed(2)} yrs</span>
              </div>
              <div className={styles.compareTrack}>
                <div
                  className={styles.compareFillExact}
                  style={{ width: `${Math.min(100, (exactYears / compareMax) * 100)}%` }}
                />
              </div>
            </div>
            <div className={styles.compareRow}>
              <div className={styles.compareLabel}>
                <span className={styles.compareName}>Rule of 72 (72 ÷ rate)</span>
                <span className={styles.compareValMuted}>{rule72.toFixed(2)} yrs</span>
              </div>
              <div className={styles.compareTrack}>
                <div
                  className={styles.compareFillRule}
                  style={{ width: `${Math.min(100, (rule72 / compareMax) * 100)}%` }}
                />
              </div>
            </div>
            <div className={styles.gapChip} role="status">
              Gap:{" "}
              <strong>{Math.abs(exactYears - rule72).toFixed(2)} yrs</strong>
              {ruleErr !== null ? (
                <span className={styles.gapPct}> (~{ruleErr.toFixed(1)}% vs exact)</span>
              ) : null}
            </div>
          </div>
        )}

        <div className={styles.timelineMini} aria-hidden>
          {exactYears !== null && rule72 !== null && (
            <svg className={styles.timelineSvg} viewBox="0 0 400 56">
              <line x1="8" y1="36" x2="392" y2="36" stroke="var(--cm-line)" strokeWidth="2" />
              <text x="8" y="20" fill="var(--cm-text-muted)" fontSize="11">
                0
              </text>
              <text x="360" y="20" fill="var(--cm-text-muted)" fontSize="11" textAnchor="end">
                {compareMax.toFixed(1)} yrs
              </text>
              <g>
                <line
                  x1={8 + (exactYears / compareMax) * 384}
                  y1="28"
                  x2={8 + (exactYears / compareMax) * 384}
                  y2="44"
                  stroke="var(--cm-accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle
                  cx={8 + (exactYears / compareMax) * 384}
                  cy="36"
                  r="5"
                  fill="var(--cm-accent)"
                />
              </g>
              <g opacity="0.85">
                <line
                  x1={8 + (rule72 / compareMax) * 384}
                  y1="28"
                  x2={8 + (rule72 / compareMax) * 384}
                  y2="44"
                  stroke="var(--cm-text-tertiary)"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <circle
                  cx={8 + (rule72 / compareMax) * 384}
                  cy="36"
                  r="4"
                  fill="var(--cm-text-tertiary)"
                />
              </g>
            </svg>
          )}
          {exactYears !== null && rule72 !== null && (
            <div className={styles.timelineLegend}>
              <span>
                <span className={styles.dotExact} /> Exact
              </span>
              <span>
                <span className={styles.dotRule} /> Rule of 72
              </span>
            </div>
          )}
        </div>
      </section>

      <section className={styles.visualSection} aria-labelledby="dt-bench-heading">
        <h3 id="dt-bench-heading" className={styles.visTitle}>
          Doubling time by return rate
        </h3>
        <p className={styles.visLead}>
          Tap a row to jump the slider — bar length is years to double (longer = more years of compounding needed).
        </p>
        <ul className={styles.benchList}>
          {!BENCHMARK_RATES.some((p) => Math.abs(ratePct - p) < 0.25) && exactYears !== null && (
            <li key="current-slider">
              <div className={`${styles.benchRow} ${styles.benchRowCurrent}`} role="presentation">
                <span className={styles.benchPct}>
                  {(Number.isInteger(ratePct) ? String(ratePct) : ratePct.toFixed(2))}% · slider
                </span>
                <span className={styles.benchBarWrap}>
                  <span className={styles.benchBarTrack}>
                    <span
                      className={styles.benchBarFillCurrent}
                      style={{
                        width: `${Math.min(100, (exactYears / BENCH_MAX_YEARS) * 100)}%`,
                      }}
                    />
                  </span>
                </span>
                <span className={styles.benchYears}>{exactYears.toFixed(1)} yrs</span>
              </div>
            </li>
          )}
          {BENCHMARK_RATES.map((pct) => {
            const y = yearsToDouble(pct / 100);
            const w = Math.min(100, (y / BENCH_MAX_YEARS) * 100);
            const isNear = Math.abs(ratePct - pct) < 0.35;
            return (
              <li key={pct}>
                <button
                  type="button"
                  className={`${styles.benchRow} ${isNear ? styles.benchRowActive : ""}`}
                  onClick={() => setRatePct(pct)}
                  title={`Set to ${pct}% — ${y.toFixed(2)} years to double`}
                >
                  <span className={styles.benchPct}>{pct}%</span>
                  <span className={styles.benchBarWrap}>
                    <span className={styles.benchBarTrack}>
                      <span className={styles.benchBarFill} style={{ width: `${w}%` }} />
                    </span>
                  </span>
                  <span className={styles.benchYears}>{y.toFixed(1)} yrs</span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <div className={styles.bottomStrip}>
        <div className={styles.statCard}>
          <div className={styles.statVal}>{exactYears !== null ? exactYears.toFixed(4) : "—"}</div>
          <div className={styles.statLbl}>Exact years (ln 2 / ln(1+r))</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statVal}>{rule72 !== null ? `${rule72.toFixed(2)} yrs` : "—"}</div>
          <div className={styles.statLbl}>Rule of 72 estimate</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statVal}>{ruleErr !== null ? `~${ruleErr.toFixed(1)}%` : "—"}</div>
          <div className={styles.statLbl}>Shortcut vs exact</div>
        </div>
      </div>
    </CalcShell>
  );
}
