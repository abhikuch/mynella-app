"use client";

import { useState, useMemo } from "react";
import { CalcShell } from "./CalcShell";
import styles from "./StartLateCalculator.module.css";

function fmtMoney(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

function sipFV(monthlyAmount: number, annualCagr: number, years: number): number {
  if (years <= 0) return 0;
  const r = annualCagr / 100 / 12;
  const n = years * 12;
  return monthlyAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

const RETIREMENT_AGE = 60;
const START_AGES = [25, 30, 35, 40, 45];

const COLORS = ["#22c55e", "#4ade80", "#60a5fa", "#fb923c", "#f87171"];

const W = 640; const H = 260;
const PL = 68; const PR = 16; const PT = 16; const PB = 28;
const CW = W - PL - PR; const CH = H - PT - PB;

export function StartLateCalculator() {
  const [sip, setSip] = useState("10000");
  const [cagr, setCagr] = useState(12);
  const [activeAge, setActiveAge] = useState<number | null>(null);

  const monthly = Math.max(100, parseFloat(sip) || 10000);

  const scenarios = useMemo(() => START_AGES.map((age, idx) => {
    const years = Math.max(0, RETIREMENT_AGE - age);
    const invested = monthly * 12 * years;
    const corpus = sipFV(monthly, cagr, years);
    // Year-by-year SIP FV series (relative to age 25 start = year 0)
    const maxYears = RETIREMENT_AGE - 25;
    const startOffset = age - 25;
    const pts = Array.from({ length: maxYears + 1 }, (_, i) => {
      const yearsInvested = Math.max(0, i - startOffset);
      return {
        age: 25 + i,
        val: yearsInvested > 0 ? sipFV(monthly, cagr, yearsInvested) : 0,
      };
    });
    return { age, years, invested, corpus, gain: corpus - invested, color: COLORS[idx], pts };
  }), [monthly, cagr]);

  const best = scenarios[0];
  const maxCorpus = best.corpus;
  const maxYears = RETIREMENT_AGE - 25;

  const xS = (age: number) => PL + ((age - 25) / maxYears) * CW;
  const yS = (v: number) => PT + CH - (v / maxCorpus) * CH;
  const baseY = PT + CH;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    val: maxCorpus * t, y: yS(maxCorpus * t),
  }));

  return (
    <CalcShell
      title="Cost of Starting Late"
      tagline="Time is the ultimate compound"
      disclaimer="Illustrative only. Uses a simplified SIP model with fixed CAGR and assumes monthly investments until age 60. Not investment advice."
    >
      <div className={styles.controls}>
        <div className={styles.field}>
          <label className={styles.label}>Monthly SIP (₹)</label>
          <input type="number" className={styles.input} value={sip} onChange={(e) => setSip(e.target.value)} placeholder="e.g. 10000" />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Expected CAGR: <strong>{cagr}%</strong></label>
          <input type="range" className={styles.slider} min={6} max={30} step={1} value={cagr} onChange={(e) => setCagr(Number(e.target.value))} />
        </div>
      </div>

      {/* SVG Mountain chart */}
      <div className={styles.chartWrap}>
        <div className={styles.chartLegend}>
          {scenarios.map((s) => (
            <span
              key={s.age}
              className={`${styles.legendItem} ${activeAge === s.age ? styles.legendActive : ""}`}
              style={{ color: s.color }}
              onMouseEnter={() => setActiveAge(s.age)}
              onMouseLeave={() => setActiveAge(null)}
            >
              <span className={styles.legendDot} style={{ background: s.color }} />
              Start {s.age}
            </span>
          ))}
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.chart}>
          <defs>
            {scenarios.map((s) => (
              <linearGradient key={s.age} id={`slGrad${s.age}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0.02" />
              </linearGradient>
            ))}
          </defs>
          {/* Grid */}
          {yTicks.map((t) => (
            <g key={t.y}>
              <line x1={PL} y1={t.y} x2={W - PR} y2={t.y} stroke="rgba(255,255,255,0.055)" strokeWidth="1" />
              <text x={PL - 6} y={t.y + 4} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.3)">{fmtMoney(t.val)}</text>
            </g>
          ))}
          {/* Age x-axis */}
          {[25, 30, 35, 40, 45, 50, 55, 60].map((age) => (
            <text key={age} x={xS(age)} y={H - 8} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.3)">
              {age}
            </text>
          ))}
          <text x={W / 2} y={H - 1} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.2)">Age →</text>
          {/* Areas and lines (back to front) */}
          {[...scenarios].reverse().map((s) => {
            const isDim = activeAge !== null && activeAge !== s.age;
            return (
              <g key={s.age} opacity={isDim ? 0.2 : 1}
                onMouseEnter={() => setActiveAge(s.age)}
                onMouseLeave={() => setActiveAge(null)}
                style={{ cursor: "pointer" }}>
                <polygon
                  points={[
                    ...s.pts.map((p) => `${xS(p.age)},${yS(p.val)}`),
                    `${xS(60)},${baseY}`, `${xS(25)},${baseY}`,
                  ].join(" ")}
                  fill={`url(#slGrad${s.age})`}
                />
                <polyline
                  points={s.pts.map((p) => `${xS(p.age)},${yS(p.val)}`).join(" ")}
                  fill="none" stroke={s.color}
                  strokeWidth={activeAge === s.age ? 2.8 : 1.8}
                  strokeLinejoin="round"
                />
                {/* End dot */}
                <circle cx={xS(60)} cy={yS(s.corpus)} r={4} fill={s.color} />
                <text x={xS(60) - 6} y={yS(s.corpus) - 7} textAnchor="end" fontSize="9" fill={s.color}>
                  {fmtMoney(s.corpus)}
                </text>
              </g>
            );
          })}
          {/* Retirement line */}
          <line x1={xS(60)} y1={PT} x2={xS(60)} y2={baseY} stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4,3" />
          <text x={xS(60) + 4} y={PT + 12} fontSize="9" fill="rgba(255,255,255,0.3)">Retirement</text>
        </svg>
      </div>

      {/* Scenario cards */}
      <div className={styles.scenarios}>
        {scenarios.map((s) => {
          const barWidth = (s.corpus / best.corpus) * 100;
          return (
            <div
              key={s.age}
              className={`${styles.scenario} ${s.age === 25 ? styles.scenarioBest : ""} ${activeAge === s.age ? styles.scenarioActive : ""}`}
              style={{ borderColor: activeAge === s.age ? s.color : s.age === 25 ? s.color + "55" : undefined, gridColumn: s.age === 25 ? "1 / -1" : undefined }}
              onMouseEnter={() => setActiveAge(s.age)}
              onMouseLeave={() => setActiveAge(null)}
            >
              <div className={styles.scHeader}>
                <div>
                  <span className={styles.scAge} style={{ color: s.color }}>Start at {s.age}</span>
                  <span className={styles.scYears}> · {s.years}y of investing</span>
                </div>
                <div className={styles.scCorpus} style={{ color: s.color }}>{fmtMoney(s.corpus)}</div>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.barFill} style={{ width: `${barWidth}%`, background: s.color }} />
              </div>
              <div className={styles.scMeta}>
                <span>Invested: {fmtMoney(s.invested)}</span>
                <span style={{ color: s.color }}>Gains: +{fmtMoney(s.gain)}</span>
                {s.age !== 25 && (
                  <span className={styles.scCost}>vs 25: −{fmtMoney(best.corpus - s.corpus)}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.insight}>
        <strong>The compounding gap:</strong> Starting at 25 vs 45 produces{" "}
        <span style={{ color: "var(--cm-accent)" }}>
          {(best.corpus / (scenarios[scenarios.length - 1].corpus || 1)).toFixed(1)}×
        </span>{" "}
        more wealth with the same monthly SIP. The only difference is time. You cannot buy back lost years.
      </div>
    </CalcShell>
  );
}
