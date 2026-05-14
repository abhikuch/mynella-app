"use client";

import { useState, useEffect, useRef } from "react";
import { CalcShell } from "./CalcShell";
import styles from "./CagrCalculator.module.css";

// ─── Formatters ─────────────────────────────────────────────────────────────

function fmt(n: number, decimals = 2) {
  return n.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function fmtMoney(n: number) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  if (abs >= 1e7) return `${sign}₹${(abs / 1e7).toFixed(2)} Cr`;
  if (abs >= 1e5) return `${sign}₹${(abs / 1e5).toFixed(2)} L`;
  if (abs >= 1000) return `${sign}₹${Math.round(abs).toLocaleString("en-IN")}`;
  return `${sign}₹${abs.toFixed(2)}`;
}

// ─── Animated counter ────────────────────────────────────────────────────────
// Captures `from` inside the effect so stale display state never bleeds in.

function useAnimatedNumber(target: number | null, duration = 500) {
  const [display, setDisplay] = useState<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (target === null) {
      setDisplay(0);
      return;
    }
    const start = performance.now();
    // capture the current rendered value as from-value
    let from = 0;
    setDisplay((prev) => { from = prev; return prev; });

    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3); // cubic ease-out
      setDisplay(from + (target - from) * ease);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

// ─── Sparkline geometry ──────────────────────────────────────────────────────

const TL_W = 560;
const TL_H = 140;
const TL_PL = 56; // left pad for y-axis labels
const TL_PR = 12;
const TL_PT = 16;
const TL_PB = 28;

interface SparkPt { x: number; y: number; val: number; yr: number }

function buildSparkline(
  startVal: number,
  endVal: number,
  totalYears: number,
): { pts: SparkPt[]; baseY: number; cw: number; ch: number } | null {
  if (startVal <= 0 || endVal <= 0 || totalYears <= 0) return null;

  // Derive CAGR from the actual start/end (handles 0% case too)
  const cagrFrac = Math.pow(endVal / startVal, 1 / totalYears) - 1;

  // Use enough points for a smooth curve regardless of short duration
  const numPts = Math.max(Math.round(totalYears * 12), 24); // monthly resolution
  const raw = Array.from({ length: numPts + 1 }, (_, i) => {
    const yr = (i / numPts) * totalYears;
    return { yr, val: startVal * Math.pow(1 + cagrFrac, yr) };
  });

  const cw = TL_W - TL_PL - TL_PR;
  const ch = TL_H - TL_PT - TL_PB;

  // Always use start value as the visual minimum so negative slopes go DOWN
  const visMin = Math.min(startVal, endVal) * 0.97;
  const visMax = Math.max(startVal, endVal) * 1.03;
  const range = visMax - visMin || 1;

  const xS = (yr: number) => TL_PL + (yr / totalYears) * cw;
  const yS = (v: number) => TL_PT + ch - ((v - visMin) / range) * ch;

  const baseY = TL_PT + ch; // bottom of chart area

  const pts: SparkPt[] = raw.map((p) => ({ x: xS(p.yr), y: yS(p.val), val: p.val, yr: p.yr }));
  return { pts, baseY, cw, ch };
}

// ─── Component ───────────────────────────────────────────────────────────────

export function CagrCalculator() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("0");

  const startN = parseFloat(start);
  const endN = parseFloat(end);
  const yearsN = parseFloat(years) || 0;
  const monthsN = parseFloat(months) || 0;
  const totalYears = yearsN + monthsN / 12;

  // All inputs must be valid positive numbers and duration > 0
  // (allow endN === startN for 0% CAGR)
  const valid =
    isFinite(startN) && startN > 0 &&
    isFinite(endN) && endN > 0 &&
    totalYears > 0;

  const cagr = valid ? (Math.pow(endN / startN, 1 / totalYears) - 1) * 100 : null;
  const totalReturn = valid ? ((endN - startN) / startN) * 100 : null;
  const isPositive = cagr !== null && cagr >= 0;
  const doublingYears = cagr !== null && cagr > 0 ? 72 / cagr : null;

  const animatedCagr = useAnimatedNumber(cagr);
  const animatedReturn = useAnimatedNumber(totalReturn);

  // Validation messages
  const errors: string[] = [];
  if (start !== "" && (isNaN(startN) || startN <= 0)) errors.push("Starting value must be greater than 0.");
  if (end !== "" && (isNaN(endN) || endN <= 0)) errors.push("Ending value must be greater than 0.");
  if ((years !== "" || months !== "0") && totalYears <= 0) errors.push("Duration must be greater than 0.");

  const spark = valid ? buildSparkline(startN, endN, totalYears) : null;

  // Doubling milestone dots on sparkline
  const doublingMilestones = (() => {
    if (!spark || !doublingYears || doublingYears <= 0) return [];
    const { pts, cw } = spark;
    const cagrFrac = Math.pow(endN / startN, 1 / totalYears) - 1;
    const visMin = Math.min(startN, endN) * 0.97;
    const visMax = Math.max(startN, endN) * 1.03;
    const range = visMax - visMin || 1;
    const ch = TL_H - TL_PT - TL_PB;
    const xS = (yr: number) => TL_PL + (yr / totalYears) * cw;
    const yS = (v: number) => TL_PT + ch - ((v - visMin) / range) * ch;
    const out = [];
    let d = doublingYears;
    while (d <= totalYears && out.length < 6) {
      const val = startN * Math.pow(1 + cagrFrac, d);
      out.push({ x: xS(d), y: yS(val), n: out.length + 2 });
      d += doublingYears;
    }
    return out;
  })();

  // Y-axis ticks for sparkline
  const yAxisTicks = (() => {
    if (!spark) return [];
    const { ch } = spark;
    const visMin = Math.min(startN, endN) * 0.97;
    const visMax = Math.max(startN, endN) * 1.03;
    const range = visMax - visMin || 1;
    const yS = (v: number) => TL_PT + ch - ((v - visMin) / range) * ch;
    // 3–4 evenly spaced ticks
    return [visMin, visMin + range * 0.33, visMin + range * 0.67, visMax].map((v) => ({
      val: v,
      y: yS(v),
    }));
  })();

  const color = isPositive ? "#22c55e" : "#f87171";

  return (
    <CalcShell title="CAGR Calculator" tagline="Compound Annual Growth Rate">
      <div className={styles.layout}>
        {/* ── Inputs ── */}
        <div className={styles.inputs}>
          <div className={styles.field}>
            <label className={styles.label}>Starting value (₹)</label>
            <input
              type="number"
              className={`${styles.input} ${start !== "" && (isNaN(startN) || startN <= 0) ? styles.inputError : ""}`}
              placeholder="e.g. 100000"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              min={0}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Ending value (₹)</label>
            <input
              type="number"
              className={`${styles.input} ${end !== "" && (isNaN(endN) || endN <= 0) ? styles.inputError : ""}`}
              placeholder="e.g. 250000"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              min={0}
            />
          </div>

          <div className={styles.dualField}>
            <div className={styles.field}>
              <label className={styles.label}>Years</label>
              <input
                type="number"
                className={styles.input}
                placeholder="e.g. 5"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                min={0}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Months</label>
              <select
                className={styles.select}
                value={months}
                onChange={(e) => setMonths(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>{i} mo</option>
                ))}
              </select>
            </div>
          </div>

          {/* Inline error messages */}
          {errors.map((e, i) => (
            <div key={i} className={styles.errorMsg}>{e}</div>
          ))}
        </div>

        {/* ── Result panel ── */}
        <div className={styles.result}>
          {cagr === null ? (
            <div className={styles.placeholder}>
              <div className={styles.placeholderNum}>—</div>
              <div className={styles.placeholderLabel}>
                {start || end || years || months !== "0"
                  ? "Complete all fields above"
                  : "Enter start, end & duration"}
              </div>
            </div>
          ) : (
            <div className={styles.resultInner}>
              <div className={`${styles.bigNum} ${isPositive ? styles.positive : styles.negative}`}>
                {isPositive ? "+" : "−"}{Math.abs(animatedCagr).toFixed(2)}%
              </div>
              <div className={styles.bigLabel}>CAGR per year</div>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <div className={`${styles.statVal} ${isPositive ? styles.positive : styles.negative}`}>
                    {(totalReturn ?? 0) >= 0 ? "+" : "−"}{Math.abs(animatedReturn).toFixed(1)}%
                  </div>
                  <div className={styles.statLbl}>Total return</div>
                </div>
                <div className={styles.stat}>
                  <div className={`${styles.statVal} ${endN - startN >= 0 ? styles.positive : styles.negative}`}>
                    {fmtMoney(endN - startN)}
                  </div>
                  <div className={styles.statLbl}>Abs. gain / loss</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statVal}>{fmt(totalYears, 1)}y</div>
                  <div className={styles.statLbl}>Duration</div>
                </div>
              </div>

              {cagr === 0 && (
                <div className={styles.zeroNote}>
                  0% CAGR — your investment neither grew nor shrank over this period.
                </div>
              )}

              {doublingYears !== null && isPositive && (
                <div className={styles.rule72}>
                  Rule of 72 · doubles every{" "}
                  <strong style={{ color: "var(--cm-accent)" }}>
                    {doublingYears < 1
                      ? `${Math.round(doublingYears * 12)} months`
                      : `${fmt(doublingYears, 1)} years`}
                  </strong>
                </div>
              )}

              {!isPositive && cagr !== 0 && (
                <div className={styles.rule72Loss}>
                  At this rate, capital halves every{" "}
                  <strong style={{ color: "var(--cm-negative)" }}>
                    {fmt(Math.abs(72 / cagr), 1)} years
                  </strong>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Sparkline ── */}
      {spark && (
        <div className={styles.spark}>
          <div className={styles.sparkTitle}>
            {isPositive ? "Growth" : "Decline"} curve — {fmtMoney(startN)} → {fmtMoney(endN)} over {fmt(totalYears, 1)} years
          </div>
          <svg viewBox={`0 0 ${TL_W} ${TL_H}`} className={styles.sparkSvg}>
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Y-axis grid + labels */}
            {yAxisTicks.map((t, i) => (
              <g key={i}>
                <line
                  x1={TL_PL} y1={t.y} x2={TL_W - TL_PR} y2={t.y}
                  stroke="rgba(255,255,255,0.055)" strokeWidth="1"
                />
                <text x={TL_PL - 4} y={t.y + 4} textAnchor="end" fontSize="9" fill="rgba(255,255,255,0.3)">
                  {fmtMoney(t.val)}
                </text>
              </g>
            ))}

            {/* Area fill */}
            <polygon
              points={[
                ...spark.pts.map((p) => `${p.x},${p.y}`),
                `${spark.pts[spark.pts.length - 1].x},${spark.baseY}`,
                `${spark.pts[0].x},${spark.baseY}`,
              ].join(" ")}
              fill="url(#sparkGrad)"
            />

            {/* Line */}
            <polyline
              points={spark.pts.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke={color}
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Doubling milestone dots */}
            {doublingMilestones.map((m, i) => (
              <g key={i}>
                <circle cx={m.x} cy={m.y} r={5} fill={color} stroke="#fff" strokeWidth="1.5" />
                <text
                  x={m.x} y={TL_H - 8}
                  textAnchor="middle" fontSize="9"
                  fill={`${color}cc`}
                >
                  ×{m.n}
                </text>
              </g>
            ))}

            {/* Start dot */}
            <circle cx={spark.pts[0].x} cy={spark.pts[0].y} r={4} fill={color} opacity="0.6" />

            {/* End dot */}
            <circle
              cx={spark.pts[spark.pts.length - 1].x}
              cy={spark.pts[spark.pts.length - 1].y}
              r={5} fill={color} stroke="#fff" strokeWidth="1.5"
            />

            {/* Start label — always bottom-left area */}
            <text
              x={spark.pts[0].x + 6}
              y={spark.pts[0].y + (isPositive ? 14 : -8)}
              fontSize="9" fill="rgba(255,255,255,0.45)"
            >
              {fmtMoney(startN)}
            </text>

            {/* End label — avoid overlap with start by anchoring to right edge */}
            <text
              x={spark.pts[spark.pts.length - 1].x - 4}
              y={spark.pts[spark.pts.length - 1].y + (isPositive ? -8 : 14)}
              textAnchor="end" fontSize="9" fill={`${color}cc`}
              fontWeight="bold"
            >
              {fmtMoney(endN)}
            </text>

            {/* X-axis duration labels */}
            {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
              const yr = frac * totalYears;
              const x = TL_PL + frac * spark.cw;
              const label = yr === 0 ? "0" : yr < 1 ? `${Math.round(yr * 12)}mo` : `${fmt(yr, 0)}y`;
              return (
                <text key={frac} x={x} y={TL_H - 8} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)">
                  {label}
                </text>
              );
            })}
          </svg>
        </div>
      )}
    </CalcShell>
  );
}
