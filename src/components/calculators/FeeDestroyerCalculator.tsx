"use client";

import { useState, useMemo } from "react";
import { CalcShell } from "./CalcShell";
import styles from "./FeeDestroyerCalculator.module.css";

function fmtMoney(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

const FEE_SCENARIOS = [0, 0.5, 1, 1.5, 2, 2.5, 3];

const W = 640; const H = 260;
const PL = 68; const PR = 16; const PT = 16; const PB = 28;
const CW = W - PL - PR; const CH = H - PT - PB;

export function FeeDestroyerCalculator() {
  const [corpus, setCorpus] = useState("5000000");
  const [grossCagr, setGrossCagr] = useState(15);
  const [fee, setFee] = useState(1);
  const [years, setYears] = useState(20);
  const [hoverYear, setHoverYear] = useState<number | null>(null);

  const cap = Math.max(1000, parseFloat(corpus) || 5000000);
  const netCagr = Math.max(0, grossCagr - fee);

  // Year-by-year series
  const { grossPts, netPts, maxVal } = useMemo(() => {
    const g = Array.from({ length: years + 1 }, (_, y) => ({
      y, val: cap * Math.pow(1 + grossCagr / 100, y),
    }));
    const n = Array.from({ length: years + 1 }, (_, y) => ({
      y, val: cap * Math.pow(1 + netCagr / 100, y),
    }));
    return { grossPts: g, netPts: n, maxVal: g[years].val };
  }, [cap, grossCagr, netCagr, years]);

  const xS = (yr: number) => PL + (yr / years) * CW;
  const yS = (v: number) => PT + CH - (v / maxVal) * CH;
  const baseY = PT + CH;

  const withFee = cap * Math.pow(1 + netCagr / 100, years);
  const noFee = cap * Math.pow(1 + grossCagr / 100, years);
  const feeCost = noFee - withFee;
  const feePctOfTotal = (feeCost / noFee) * 100;

  const rows = FEE_SCENARIOS.map((f) => {
    const net = Math.max(0, grossCagr - f);
    const c = cap * Math.pow(1 + net / 100, years);
    return { f, corpus: c, diff: noFee - c };
  });

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    val: maxVal * t,
    y: yS(maxVal * t),
  }));

  const hoverGross = hoverYear !== null ? grossPts[hoverYear]?.val : null;
  const hoverNet = hoverYear !== null ? netPts[hoverYear]?.val : null;
  const hoverGap = hoverGross !== null && hoverNet !== null ? hoverGross - hoverNet : null;

  return (
    <CalcShell
      title="Fee Destroyer"
      tagline="The silent wealth killer"
      disclaimer="Illustrative only. Fee models vary and may be performance-based, tiered, or fixed. This calculator shows a simplified drag effect. Not investment advice."
    >
      <div className={styles.controls}>
        <div className={styles.field}>
          <label className={styles.label}>Starting corpus (₹)</label>
          <input type="number" className={styles.input} value={corpus} onChange={(e) => setCorpus(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Gross return: <strong>{grossCagr}%</strong></label>
          <input type="range" className={styles.slider} min={6} max={35} step={1} value={grossCagr} onChange={(e) => setGrossCagr(Number(e.target.value))} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Annual fee: <strong style={{ color: "var(--cm-negative)" }}>{fee}%</strong></label>
          <input type="range" className={`${styles.slider} ${styles.sliderRed}`} min={0} max={3} step={0.25} value={fee} onChange={(e) => setFee(Number(e.target.value))} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Horizon: <strong>{years} years</strong></label>
          <input type="range" className={styles.slider} min={5} max={40} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} />
        </div>
      </div>

      {/* Result cards */}
      <div className={styles.resultGrid}>
        <div className={styles.card}>
          <div className={styles.cardLabel}>Before fees</div>
          <div className={styles.bigNum}>{fmtMoney(noFee)}</div>
          <div className={styles.subline}>{grossCagr}% CAGR · {years}y</div>
        </div>
        <div className={`${styles.card} ${styles.cardFee}`}>
          <div className={styles.cardLabel}>After {fee}% fee</div>
          <div className={`${styles.bigNum} ${styles.bigNumDim}`}>{fmtMoney(withFee)}</div>
          <div className={styles.subline}>{netCagr.toFixed(2)}% net · {years}y</div>
        </div>
        <div className={`${styles.card} ${styles.cardLost}`}>
          <div className={styles.cardLabel}>Stolen by fees</div>
          <div className={`${styles.bigNum} ${styles.bigNumNeg}`}>−{fmtMoney(feeCost)}</div>
          <div className={styles.subline}>{feePctOfTotal.toFixed(1)}% of potential wealth</div>
        </div>
      </div>

      {/* SVG Dual-line chart */}
      <div className={styles.chartWrap}>
        <div className={styles.chartLegend}>
          <span className={styles.legendItem}><span className={styles.legendDot} style={{ background: "#22c55e" }} />Gross ({grossCagr}%)</span>
          <span className={styles.legendItem}><span className={styles.legendDot} style={{ background: "#f87171" }} />Net after {fee}% fee ({netCagr.toFixed(1)}%)</span>
          {hoverGap !== null && (
            <span className={styles.legendGap}>Gap at yr {hoverYear}: −{fmtMoney(hoverGap)}</span>
          )}
        </div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className={styles.chart}
          onMouseLeave={() => setHoverYear(null)}
        >
          <defs>
            <linearGradient id="feeGrossGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="feeNetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f87171" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#f87171" stopOpacity="0.01" />
            </linearGradient>
            {/* Gap fill */}
            <clipPath id="gapClip">
              <polygon points={[
                ...grossPts.map((p) => `${xS(p.y)},${yS(p.val)}`),
                ...netPts.slice().reverse().map((p) => `${xS(p.y)},${yS(p.val)}`),
              ].join(" ")} />
            </clipPath>
          </defs>
          {/* Grid */}
          {yTicks.map((t) => (
            <g key={t.y}>
              <line x1={PL} y1={t.y} x2={W - PR} y2={t.y} stroke="rgba(255,255,255,0.055)" strokeWidth="1" />
              <text x={PL - 6} y={t.y + 4} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.3)">
                {fmtMoney(t.val)}
              </text>
            </g>
          ))}
          {/* X labels */}
          {[0, 5, 10, 15, 20, 25, 30, 35, 40].filter((y) => y <= years).map((y) => (
            <text key={y} x={xS(y)} y={H - 8} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.3)">
              {y}y
            </text>
          ))}
          {/* Gap fill between lines */}
          <polygon
            points={[
              ...grossPts.map((p) => `${xS(p.y)},${yS(p.val)}`),
              ...netPts.slice().reverse().map((p) => `${xS(p.y)},${yS(p.val)}`),
            ].join(" ")}
            fill="rgba(248,113,113,0.07)"
          />
          {/* Gross area */}
          <polygon
            points={[
              ...grossPts.map((p) => `${xS(p.y)},${yS(p.val)}`),
              `${xS(years)},${baseY}`, `${xS(0)},${baseY}`,
            ].join(" ")}
            fill="url(#feeGrossGrad)"
          />
          {/* Net area */}
          <polygon
            points={[
              ...netPts.map((p) => `${xS(p.y)},${yS(p.val)}`),
              `${xS(years)},${baseY}`, `${xS(0)},${baseY}`,
            ].join(" ")}
            fill="url(#feeNetGrad)"
          />
          {/* Gross line */}
          <polyline
            points={grossPts.map((p) => `${xS(p.y)},${yS(p.val)}`).join(" ")}
            fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinejoin="round"
          />
          {/* Net line */}
          <polyline
            points={netPts.map((p) => `${xS(p.y)},${yS(p.val)}`).join(" ")}
            fill="none" stroke="#f87171" strokeWidth="2.2" strokeLinejoin="round" strokeDasharray="5,3"
          />
          {/* Hover */}
          {hoverYear !== null && (
            <>
              <line x1={xS(hoverYear)} y1={PT} x2={xS(hoverYear)} y2={baseY}
                stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="4,3" />
              <circle cx={xS(hoverYear)} cy={yS(grossPts[hoverYear]?.val ?? 0)} r={4} fill="#22c55e" />
              <circle cx={xS(hoverYear)} cy={yS(netPts[hoverYear]?.val ?? 0)} r={4} fill="#f87171" />
            </>
          )}
          {/* Invisible hover capture */}
          {Array.from({ length: years + 1 }, (_, y) => (
            <rect key={y} x={xS(y) - CW / years / 2} y={PT} width={CW / years} height={CH}
              fill="transparent" onMouseEnter={() => setHoverYear(y)} />
          ))}
        </svg>
      </div>

      {/* Table */}
      <div className={styles.tableSection}>
        <div className={styles.tableTitle}>Fee comparison — {years}y horizon</div>
        <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Fee %</th>
              <th>Net CAGR</th>
              <th>Final corpus</th>
              <th>Lost to fees</th>
              <th>Drag bar</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.f} className={r.f === fee ? styles.activeRow : undefined}>
                <td className={r.f > 0 ? styles.neg : styles.pos}>{r.f}%</td>
                <td>{Math.max(0, grossCagr - r.f).toFixed(2)}%</td>
                <td>{fmtMoney(r.corpus)}</td>
                <td className={r.diff > 0 ? styles.neg : ""}>{r.diff > 0 ? `−${fmtMoney(r.diff)}` : "—"}</td>
                <td>
                  <div className={styles.dragTrack}>
                    <div className={styles.dragFill} style={{ width: `${(r.diff / feeCost || 0) * 100 * (fee / 3)}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </CalcShell>
  );
}
