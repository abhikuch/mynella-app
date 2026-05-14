"use client";

import { useState, useMemo } from "react";
import { CalcShell } from "./CalcShell";
import styles from "./DrawdownCalculator.module.css";

const PRESETS = [10, 20, 30, 40, 50, 60, 75];

function fmt(n: number, d = 2) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: d });
}

/** Polar arc: returns SVG path for an arc at center (cx,cy), radius r, from startAngle to endAngle (degrees, 0=right) */
function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startDeg));
  const y1 = cy + r * Math.sin(toRad(startDeg));
  const x2 = cx + r * Math.cos(toRad(endDeg));
  const y2 = cy + r * Math.sin(toRad(endDeg));
  const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
}

// Semi-circle from 180° to 0° (left to right across top)
const GAUGE_START = 180;
const GAUGE_END = 360;
const CX = 160;
const CY = 140;
const R_OUTER = 110;
const R_INNER = 78;

export function DrawdownCalculator() {
  const [drawdown, setDrawdown] = useState(30);

  const recovery = drawdown >= 100 ? Infinity : (drawdown / (100 - drawdown)) * 100;
  const ratio = recovery / drawdown;

  // Gauge angles
  const drawdownAngle = GAUGE_START + (drawdown / 100) * 180;
  const recoveryClipped = Math.min(recovery, 200);
  const recoveryAngle = GAUGE_START + (Math.min(recoveryClipped, 200) / 200) * 180;

  // Curve data: drawdown on x-axis 1..95, recovery on y-axis
  const curvePoints = useMemo(() => {
    const W = 480; const H = 200;
    const PL = 52; const PR = 16; const PT = 16; const PB = 32;
    const cw = W - PL - PR; const ch = H - PT - PB;
    return Array.from({ length: 95 }, (_, i) => i + 1).map((d) => {
      const r = Math.min((d / (100 - d)) * 100, 300);
      return {
        x: PL + (d / 95) * cw,
        y: PT + ch - (r / 300) * ch,
        d, r,
      };
    });
  }, []);

  const activePt = curvePoints[drawdown - 1];

  const rows = PRESETS.map((d) => ({
    d,
    r: (d / (100 - d)) * 100,
    isActive: d === drawdown,
  }));

  return (
    <CalcShell
      title="Stock loss & drawdown recovery"
      tagline="See the return needed after a portfolio drop — drawdown asymmetry"
      disclaimer="Illustrative math only. Actual recovery depends on your strategy, the nature of the drawdown, and market conditions. Not investment advice."
    >
      <div className={styles.layout}>
        {/* Controls */}
        <div className={styles.inputSection}>
          <div className={styles.fieldHead}>
            <label className={styles.label}>Portfolio drawdown</label>
            <span className={styles.drawdownVal}>−{drawdown}%</span>
          </div>
          <input
            type="range"
            className={styles.slider}
            min={1} max={95} step={1}
            value={drawdown}
            onChange={(e) => setDrawdown(Number(e.target.value))}
          />
          <div className={styles.sliderEnds}><span>−1%</span><span>−95%</span></div>
          <div className={styles.presets}>
            {PRESETS.map((p) => (
              <button
                key={p}
                className={`${styles.preset} ${p === drawdown ? styles.presetActive : ""}`}
                onClick={() => setDrawdown(p)}
              >
                −{p}%
              </button>
            ))}
          </div>

          {/* Asymmetry curve SVG */}
          <div className={styles.curveWrap}>
            <div className={styles.curveTitle}>Asymmetry curve — loss vs recovery required</div>
            <svg viewBox="0 0 480 200" className={styles.curveSvg}>
              <defs>
                <linearGradient id="curveGrad" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#f87171" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[0, 50, 100, 150, 200, 300].map((v) => {
                const y = 16 + 152 - (Math.min(v, 300) / 300) * 152;
                return (
                  <g key={v}>
                    <line x1={52} y1={y} x2={464} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    <text x={46} y={y + 4} textAnchor="end" fontSize="9" fill="rgba(255,255,255,0.3)">
                      {v}%
                    </text>
                  </g>
                );
              })}
              {/* X axis labels */}
              {[10, 25, 50, 75, 90].map((d) => {
                const x = 52 + (d / 95) * (480 - 52 - 16);
                return (
                  <text key={d} x={x} y={196} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)">
                    −{d}%
                  </text>
                );
              })}
              {/* Diagonal reference (y=x) */}
              <line
                x1={curvePoints[0].x} y1={curvePoints[0].y}
                x2={curvePoints[94]?.x ?? 0} y2={16 + 152 - (95 / 300) * 152}
                stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4,4"
              />
              {/* Curve */}
              <polyline
                points={curvePoints.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="url(#curveGrad)"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Fill under curve */}
              <polygon
                points={[
                  ...curvePoints.map((p) => `${p.x},${p.y}`),
                  `${curvePoints[curvePoints.length - 1].x},${168}`,
                  `${curvePoints[0].x},${168}`,
                ].join(" ")}
                fill="url(#curveGrad)"
                opacity="0.08"
              />
              {/* Active dot */}
              {activePt && (
                <>
                  <line
                    x1={activePt.x} y1={16} x2={activePt.x} y2={168}
                    stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3,3"
                  />
                  <circle cx={activePt.x} cy={activePt.y} r={6} fill="#22c55e" stroke="#fff" strokeWidth="1.5" />
                  <rect
                    x={Math.min(activePt.x - 34, 400)} y={activePt.y - 30}
                    width={68} height={22} rx={4}
                    fill="rgba(30,35,42,0.92)"
                    stroke="rgba(255,255,255,0.1)" strokeWidth="1"
                  />
                  <text
                    x={Math.min(activePt.x, 434)} y={activePt.y - 15}
                    textAnchor="middle" fontSize="10" fill="#22c55e" fontWeight="bold"
                  >
                    +{fmt(activePt.r, 1)}%
                  </text>
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Gauge + result */}
        <div className={styles.gaugeSection}>
          <svg viewBox="0 0 320 175" className={styles.gaugeSvg}>
            <defs>
              <linearGradient id="lossGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f87171" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f87171" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="recovGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="1" />
              </linearGradient>
            </defs>
            {/* Background track */}
            <path
              d={describeArc(CX, CY, (R_OUTER + R_INNER) / 2, GAUGE_START, GAUGE_END)}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={R_OUTER - R_INNER}
              strokeLinecap="butt"
            />
            {/* Loss arc (red) */}
            <path
              d={describeArc(CX, CY, (R_OUTER + R_INNER) / 2, GAUGE_START, drawdownAngle)}
              fill="none"
              stroke="url(#lossGrad)"
              strokeWidth={R_OUTER - R_INNER}
              strokeLinecap="butt"
            />
            {/* Recovery arc (green) — starts at the loss end */}
            {recoveryAngle > drawdownAngle && (
              <path
                d={describeArc(CX, CY, (R_OUTER + R_INNER) / 2, drawdownAngle, Math.min(recoveryAngle, GAUGE_END))}
                fill="none"
                stroke="url(#recovGrad)"
                strokeWidth={R_OUTER - R_INNER}
                strokeLinecap="butt"
              />
            )}
            {/* Center labels */}
            <text x={CX} y={CY - 20} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.4)">
              To break even
            </text>
            <text x={CX} y={CY + 14} textAnchor="middle" fontSize="30" fontWeight="bold" fill="#22c55e"
              fontFamily="Georgia, serif">
              +{fmt(recovery, 1)}%
            </text>
            <text x={CX} y={CY + 36} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.4)">
              {fmt(ratio, 2)}× the loss magnitude
            </text>
            {/* Scale labels */}
            <text x={PAD_LABEL_LEFT()} y={CY + 28} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.3)">0%</text>
            <text x={PAD_LABEL_RIGHT()} y={CY + 28} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.3)">−100%</text>
          </svg>

          <div className={styles.gaugeStats}>
            <div className={`${styles.gaugeStat} ${styles.gaugeStatLoss}`}>
              <div className={styles.gsVal} style={{ color: "#f87171" }}>−{drawdown}%</div>
              <div className={styles.gsLbl}>Portfolio loss</div>
            </div>
            <div className={styles.gaugeSep}>→</div>
            <div className={`${styles.gaugeStat} ${styles.gaugeStatRecov}`}>
              <div className={styles.gsVal} style={{ color: "#22c55e" }}>+{fmt(recovery, 1)}%</div>
              <div className={styles.gsLbl}>Recovery needed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reference table */}
      <div className={styles.tableSection}>
        <div className={styles.tableTitle}>Drawdown vs recovery — quick reference</div>
        <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Drawdown</th>
              <th>Recovery needed</th>
              <th>Multiplier</th>
              <th>Pain bar</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.d} className={r.isActive ? styles.activeRow : undefined}
                onClick={() => setDrawdown(r.d)} style={{ cursor: "pointer" }}>
                <td className={styles.neg}>−{r.d}%</td>
                <td className={styles.pos}>+{fmt(r.r)}%</td>
                <td>{fmt(r.r / r.d)}×</td>
                <td>
                  <div className={styles.painTrack}>
                    <div
                      className={styles.painFill}
                      style={{ width: `${Math.min((r.r / 300) * 100, 100)}%` }}
                    />
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

// Gauge label X positions (computed from arc geometry)
function PAD_LABEL_LEFT() {
  return CX - (R_OUTER + 12);
}
function PAD_LABEL_RIGHT() {
  return CX + (R_OUTER + 12);
}
