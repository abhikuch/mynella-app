"use client";

import { useState, useMemo } from "react";
import { CalcShell } from "./CalcShell";
import styles from "./LuxuryTrapCalculator.module.css";

const PRESETS = [
  { label: "₹5L vacation", value: 500000 },
  { label: "₹15L car", value: 1500000 },
  { label: "₹30L car", value: 3000000 },
  { label: "₹50L renovation", value: 5000000 },
  { label: "₹1 Cr luxury car", value: 10000000 },
];

function fmtMoney(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export function LuxuryTrapCalculator() {
  const [purchase, setPurchase] = useState("3000000");
  const [cagr, setCagr] = useState(15);
  const [horizon, setHorizon] = useState(20);

  const cost = Math.max(0, parseFloat(purchase) || 0);
  const futureValue = cost * Math.pow(1 + cagr / 100, horizon);
  const extraCost = futureValue - cost;
  const multiplier = futureValue / cost;

  const timelines = [5, 10, 15, 20, 25, 30].map((y) => ({
    y,
    fv: cost * Math.pow(1 + cagr / 100, y),
  }));

  // SVG area chart: year-by-year from 0 to horizon
  const chartPts = useMemo(() => {
    const maxY = horizon;
    const maxVal = cost * Math.pow(1 + cagr / 100, horizon) || 1;
    // PR increased so end-of-line labels have room to render without clipping
    const W = 560; const H = 180; const PL = 64; const PR = 140; const PT = 12; const PB = 24;
    const cw = W - PL - PR; const ch = H - PT - PB;
    return {
      pts: Array.from({ length: horizon + 1 }, (_, y) => ({
        x: PL + (y / maxY) * cw,
        y: PT + ch - (cost * Math.pow(1 + cagr / 100, y) / maxVal) * ch,
        val: cost * Math.pow(1 + cagr / 100, y),
      })),
      costPts: Array.from({ length: horizon + 1 }, (_, y) => ({
        x: PL + (y / maxY) * cw,
        y: PT + ch - (cost / maxVal) * ch,
      })),
      baseY: PT + ch,
      maxVal, W, H, PL, PR, PT, PB, cw, ch,
    };
  }, [cost, cagr, horizon]);

  return (
    <CalcShell
      title="Luxury Trap"
      tagline="The hidden price tag"
      disclaimer="Illustrative only. This calculator shows opportunity cost assuming a hypothetical CAGR, not any guaranteed return. Not investment advice."
    >
      <div className={styles.layout}>
        <div className={styles.inputSection}>
          <div className={styles.field}>
            <label className={styles.label}>Purchase amount (₹)</label>
            <input
              type="number"
              className={styles.input}
              value={purchase}
              onChange={(e) => setPurchase(e.target.value)}
              placeholder="e.g. 3000000"
            />
          </div>

          <div className={styles.presets}>
            {PRESETS.map((p) => (
              <button
                key={p.value}
                className={`${styles.preset} ${cost === p.value ? styles.presetActive : ""}`}
                onClick={() => setPurchase(String(p.value))}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Hypothetical CAGR: <strong>{cagr}%</strong></label>
            <input
              type="range"
              className={styles.slider}
              min={6} max={35} step={1}
              value={cagr}
              onChange={(e) => setCagr(Number(e.target.value))}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Opportunity horizon: <strong>{horizon} years</strong></label>
            <input
              type="range"
              className={styles.slider}
              min={5} max={40} step={1}
              value={horizon}
              onChange={(e) => setHorizon(Number(e.target.value))}
            />
          </div>
        </div>

        <div className={styles.resultSection}>
          <div className={styles.priceTag}>
            <div className={styles.priceTagInner}>
              <div className={styles.priceLine}>
                <span className={styles.priceActual}>{fmtMoney(cost)}</span>
                <span className={styles.priceActualLabel}>what you pay today</span>
              </div>
              <div className={styles.priceDivider}>but really costs...</div>
              <div className={styles.priceLine}>
                <span className={styles.priceFuture}>{fmtMoney(futureValue)}</span>
                <span className={styles.priceFutureLabel}>in {horizon} years of compounding</span>
              </div>
            </div>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <div className={styles.statVal}>{multiplier.toFixed(1)}×</div>
              <div className={styles.statLbl}>multiplier</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statVal}>{fmtMoney(extraCost)}</div>
              <div className={styles.statLbl}>opportunity lost</div>
            </div>
          </div>
        </div>
      </div>

      {/* SVG area chart */}
      {cost > 0 && (
        <div className={styles.chartWrap}>
          <div className={styles.chartTitle}>What the same money grows to — vs staying flat</div>
          <svg viewBox={`0 0 ${chartPts.W} ${chartPts.H}`} className={styles.chartSvg}>
            <defs>
              <linearGradient id="luxGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="luxCostGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f87171" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#f87171" stopOpacity="0.01" />
              </linearGradient>
            </defs>
            {/* Flat "spent" line fill */}
            <polygon
              points={[
                ...chartPts.costPts.map((p) => `${p.x},${p.y}`),
                `${chartPts.costPts[chartPts.costPts.length - 1].x},${chartPts.baseY}`,
                `${chartPts.costPts[0].x},${chartPts.baseY}`,
              ].join(" ")}
              fill="url(#luxCostGrad)"
            />
            {/* Invested area */}
            <polygon
              points={[
                ...chartPts.pts.map((p) => `${p.x},${p.y}`),
                `${chartPts.pts[chartPts.pts.length - 1].x},${chartPts.baseY}`,
                `${chartPts.pts[0].x},${chartPts.baseY}`,
              ].join(" ")}
              fill="url(#luxGrad)"
            />
            {/* Invested line */}
            <polyline
              points={chartPts.pts.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinejoin="round"
            />
            {/* Flat cost line */}
            <line
              x1={chartPts.costPts[0].x} y1={chartPts.costPts[0].y}
              x2={chartPts.costPts[chartPts.costPts.length - 1].x} y2={chartPts.costPts[0].y}
              stroke="#f87171" strokeWidth="1.5" strokeDasharray="4,3"
            />
            {/* End-of-line labels — placed in the right padding zone */}
            <text x={chartPts.pts[chartPts.pts.length - 1].x + 8} y={chartPts.pts[chartPts.pts.length - 1].y + 4}
              textAnchor="start" fontSize="10" fill="#22c55e">
              {fmtMoney(futureValue)} if invested
            </text>
            <text x={chartPts.costPts[chartPts.costPts.length - 1].x + 8} y={chartPts.costPts[0].y + 4}
              textAnchor="start" fontSize="10" fill="#f87171">
              {fmtMoney(cost)} spent
            </text>
            {/* X axis labels */}
            {[0, 5, 10, 15, 20, 25, 30].filter((y) => y <= horizon).map((y) => {
              const x = chartPts.PL + (y / horizon) * chartPts.cw;
              return (
                <text key={y} x={x} y={chartPts.H - 6} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)">
                  {y}y
                </text>
              );
            })}
          </svg>
        </div>
      )}
    </CalcShell>
  );
}
