"use client";

import { useState, useMemo } from "react";
import { CalcShell } from "./CalcShell";
import styles from "./GrowthVisualiser.module.css";

const RATES = [
  { pct: 10, label: "10%", color: "#6b7280", fill: "rgba(107,114,128,0.08)", key: "r10" },
  { pct: 20, label: "20%", color: "#60a5fa", fill: "rgba(96,165,250,0.12)", key: "r20" },
  { pct: 30, label: "30%", color: "#22c55e", fill: "rgba(34,197,94,0.15)", key: "r30" },
];

function fmtCr(n: number): string {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

// ── Materialistic "what can you buy?" catalog ──────────────────────────────
// All price thresholds are approximate INR values (2024 India market).
// Ordered cheapest → most expensive so we can do a threshold pass.
const WEALTH_CATALOG = [
  { icon: "🛵", label: "Honda Activa", price: 90_000, unit: "" },
  { icon: "📱", label: "iPhone 16 Pro Max", price: 1_35_000, unit: "" },
  { icon: "🚗", label: "Maruti Swift", price: 7_00_000, unit: "" },
  { icon: "💎", label: "Gold brick (100 g)", price: 8_50_000, unit: "" },
  { icon: "🏎️", label: "BMW 3 Series", price: 50_00_000, unit: "" },
  { icon: "🏠", label: "2BHK flat (Tier-2 city)", price: 60_00_000, unit: "" },
  { icon: "🚀", label: "Lamborghini Huracán", price: 3_50_00_000, unit: "" },
  { icon: "🏰", label: "Sea-view penthouse (Mumbai)", price: 10_00_00_000, unit: "" },
  { icon: "🛥️", label: "Luxury yacht (50 ft)", price: 25_00_00_000, unit: "" },
  { icon: "✈️", label: "Private jet (Citation CJ3)", price: 65_00_00_000, unit: "" },
  { icon: "🏝️", label: "Private island", price: 3_00_00_00_000, unit: "" },
];

interface WealthItem {
  icon: string;
  label: string;
  price: number;
  count: number; // how many can the person afford
}

function getAffordable(amount: number): WealthItem[] {
  return WEALTH_CATALOG
    .filter((item) => amount >= item.price)
    .map((item) => ({
      ...item,
      count: Math.floor(amount / item.price),
    }))
    .reverse(); // most expensive first
}

const W = 800;
const H = 340;
const PAD = { top: 24, right: 16, bottom: 36, left: 68 };
const CHART_W = W - PAD.left - PAD.right;
const CHART_H = H - PAD.top - PAD.bottom;

function buildPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  return d;
}

function buildArea(points: { x: number; y: number }[], baseY: number): string {
  if (points.length === 0) return "";
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  return `${line} L${points[points.length - 1].x},${baseY} L${points[0].x},${baseY} Z`;
}

export function GrowthVisualiser() {
  const [capital, setCapital] = useState("100000");
  const [horizon, setHorizon] = useState(20);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const cap = Math.max(1000, parseFloat(capital) || 100000);

  const seriesData = useMemo(() => {
    return RATES.map((r) => {
      const points = Array.from({ length: horizon + 1 }, (_, y) => ({
        year: y,
        val: cap * Math.pow(1 + r.pct / 100, y),
      }));
      return { ...r, points, final: points[horizon].val, multiple: points[horizon].val / cap };
    });
  }, [cap, horizon]);

  const maxVal = seriesData[2].final;

  // Scale helpers
  const xScale = (year: number) => PAD.left + (year / horizon) * CHART_W;
  const yScale = (val: number) => PAD.top + CHART_H - (val / maxVal) * CHART_H;
  const baseY = PAD.top + CHART_H;

  // Y axis ticks (5 levels)
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    val: maxVal * t,
    y: yScale(maxVal * t),
  }));

  // X ticks
  const xTickStep = horizon <= 15 ? 5 : horizon <= 25 ? 5 : 10;
  const xTicks = Array.from(
    { length: Math.floor(horizon / xTickStep) + 1 },
    (_, i) => i * xTickStep
  ).filter((y) => y <= horizon);

  // Hover tooltip data
  const hoverData =
    hoveredYear !== null
      ? seriesData.map((s) => ({ ...s, val: s.points[hoveredYear]?.val ?? 0 }))
      : null;

  const hoverX = hoveredYear !== null ? xScale(hoveredYear) : null;

  return (
    <CalcShell
      title="10 · 20 · 30 Visualiser"
      tagline="The compounding gap"
      disclaimer="All figures are illustrative only. Actual returns depend on the investment, market conditions, and holding period. This is not a projection of any MyNella product."
    >
      <div className={styles.controls}>
        <div className={styles.field}>
          <label className={styles.label}>Starting capital (₹)</label>
          <input
            type="number"
            className={styles.input}
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            placeholder="e.g. 100000"
            min={1000}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>
            Horizon: <strong>{horizon} years</strong>
          </label>
          <input
            type="range"
            className={styles.slider}
            min={5}
            max={40}
            step={1}
            value={horizon}
            onChange={(e) => setHorizon(Number(e.target.value))}
          />
          <div className={styles.sliderTicks}>
            <span>5y</span><span>10y</span><span>20y</span><span>30y</span><span>40y</span>
          </div>
        </div>
      </div>

      {/* End-value stat cards */}
      <div className={styles.statCards}>
        {seriesData.map((s) => (
          <div key={s.key} className={styles.statCard} style={{ borderColor: s.color + "55" }}>
            <div className={styles.statCardRate} style={{ color: s.color }}>{s.label} CAGR</div>
            <div className={styles.statCardVal} style={{ color: s.color }}>{fmtCr(s.final)}</div>
            <div className={styles.statCardMult}>{s.multiple.toFixed(1)}× your money</div>
          </div>
        ))}
      </div>

      {/* ── What can you buy? ── */}
      <div className={styles.wealthSection}>
        <div className={styles.wealthTitle}>
          <span className={styles.wealthTitleIcon}>🛍️</span>
          What can you actually buy with this?
        </div>
        <div className={styles.wealthGrid}>
          {seriesData.map((s) => {
            const items = getAffordable(s.final);
            const topItem = items[0];
            return (
              <div
                key={s.key}
                className={styles.wealthCol}
                style={{ "--rate-color": s.color } as React.CSSProperties}
              >
                <div className={styles.wealthColHeader} style={{ color: s.color }}>
                  {s.label} CAGR · {fmtCr(s.final)}
                </div>
                {items.length === 0 ? (
                  <div className={styles.wealthEmpty}>Keep growing — not enough yet for any milestone.</div>
                ) : (
                  <>
                    {/* Hero biggest item */}
                    <div className={styles.wealthHero}>
                      <div className={styles.wealthHeroIcon}>{topItem.icon}</div>
                      <div className={styles.wealthHeroLabel}>{topItem.label}</div>
                      {topItem.count > 1 && (
                        <div className={styles.wealthHeroCount} style={{ color: s.color }}>
                          × {topItem.count.toLocaleString("en-IN")}
                        </div>
                      )}
                    </div>
                    {/* Rest of affordable items */}
                    <ul className={styles.wealthList}>
                      {items.slice(1).map((item) => (
                        <li key={item.label} className={styles.wealthListItem}>
                          <span className={styles.wealthItemIcon}>{item.icon}</span>
                          <span className={styles.wealthItemLabel}>{item.label}</span>
                          {item.count > 1 && (
                            <span className={styles.wealthItemCount} style={{ color: s.color }}>
                              ×{item.count.toLocaleString("en-IN")}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                    {/* Progress bar showing how far to next unlock */}
                    {(() => {
                      const next = WEALTH_CATALOG.find((c) => c.price > s.final);
                      if (!next) return null;
                      const prev = WEALTH_CATALOG.filter((c) => c.price <= s.final).slice(-1)[0];
                      const from = prev?.price ?? 0;
                      const pct = Math.min(((s.final - from) / (next.price - from)) * 100, 100);
                      return (
                        <div className={styles.nextUnlock}>
                          <div className={styles.nextUnlockLabel}>
                            <span>Next unlock: {next.icon} {next.label}</span>
                            <span style={{ color: s.color }}>
                              {fmtCr(next.price - s.final)} away
                            </span>
                          </div>
                          <div className={styles.nextUnlockBar}>
                            <div
                              className={styles.nextUnlockFill}
                              style={{ width: `${pct}%`, background: s.color }}
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SVG Area Chart */}
      <div className={styles.chartWrap}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className={styles.chart}
          onMouseLeave={() => setHoveredYear(null)}
        >
          <defs>
            {RATES.map((r) => (
              <linearGradient key={r.key} id={`grad-${r.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={r.color} stopOpacity="0.25" />
                <stop offset="100%" stopColor={r.color} stopOpacity="0.02" />
              </linearGradient>
            ))}
          </defs>

          {/* Grid lines */}
          {yTicks.map((t) => (
            <g key={t.y}>
              <line
                x1={PAD.left} y1={t.y} x2={W - PAD.right} y2={t.y}
                stroke="rgba(255,255,255,0.055)" strokeWidth="1"
              />
              <text
                x={PAD.left - 8} y={t.y + 4}
                textAnchor="end"
                fontSize="11"
                fill="rgba(255,255,255,0.35)"
              >
                {fmtCr(t.val)}
              </text>
            </g>
          ))}

          {/* X axis labels */}
          {xTicks.map((yr) => (
            <text
              key={yr}
              x={xScale(yr)} y={H - 8}
              textAnchor="middle"
              fontSize="11"
              fill="rgba(255,255,255,0.35)"
            >
              {yr}y
            </text>
          ))}

          {/* Area fills (back to front) */}
          {seriesData.map((s) => {
            const pts = s.points.map((p) => ({ x: xScale(p.year), y: yScale(p.val) }));
            return (
              <path
                key={`area-${s.key}`}
                d={buildArea(pts, baseY)}
                fill={`url(#grad-${s.key})`}
              />
            );
          })}

          {/* Lines */}
          {seriesData.map((s) => {
            const pts = s.points.map((p) => ({ x: xScale(p.year), y: yScale(p.val) }));
            return (
              <path
                key={`line-${s.key}`}
                d={buildPath(pts)}
                fill="none"
                stroke={s.color}
                strokeWidth={s.pct === 30 ? 2.5 : 1.8}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            );
          })}

          {/* Hover vertical line */}
          {hoverX !== null && (
            <line
              x1={hoverX} y1={PAD.top} x2={hoverX} y2={baseY}
              stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4,3"
            />
          )}

          {/* Hover dots */}
          {hoverData &&
            hoverData.map((s) => (
              <circle
                key={s.key}
                cx={xScale(hoveredYear!)}
                cy={yScale(s.val)}
                r={5}
                fill={s.color}
                stroke={s.color}
                strokeWidth="2"
              />
            ))}

          {/* Invisible hover capture rects */}
          {Array.from({ length: horizon + 1 }, (_, y) => (
            <rect
              key={y}
              x={xScale(y) - (CHART_W / horizon) / 2}
              y={PAD.top}
              width={CHART_W / horizon}
              height={CHART_H}
              fill="transparent"
              onMouseEnter={() => setHoveredYear(y)}
            />
          ))}

          {/* Divergence annotation at horizon */}
          {horizon >= 10 && (
            <>
              <line
                x1={xScale(horizon)} y1={yScale(seriesData[0].final)}
                x2={xScale(horizon)} y2={yScale(seriesData[2].final)}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
              <text
                x={xScale(horizon) + 8}
                y={(yScale(seriesData[0].final) + yScale(seriesData[2].final)) / 2}
                fontSize="11"
                fill="rgba(255,255,255,0.5)"
              >
                {(seriesData[2].final / seriesData[0].final).toFixed(0)}×
              </text>
              <text
                x={xScale(horizon) + 8}
                y={(yScale(seriesData[0].final) + yScale(seriesData[2].final)) / 2 + 14}
                fontSize="10"
                fill="rgba(255,255,255,0.3)"
              >
                gap
              </text>
            </>
          )}
        </svg>

        {/* Tooltip */}
        {hoverData && hoveredYear !== null && (
          <div
            className={styles.tooltip}
            style={{
              left: `${((xScale(hoveredYear) - PAD.left) / CHART_W) * 100}%`,
            }}
          >
            <div className={styles.tooltipYear}>Year {hoveredYear}</div>
            {hoverData.map((s) => (
              <div key={s.key} className={styles.tooltipRow}>
                <span className={styles.tooltipDot} style={{ background: s.color }} />
                <span style={{ color: s.color }}>{s.label}</span>
                <span className={styles.tooltipVal}>{fmtCr(s.val)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Milestone table */}
      <div className={styles.tableSection}>
        <div className={styles.tableTitle}>Key milestones</div>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Year</th>
                {RATES.map((r) => (
                  <th key={r.key} style={{ color: r.color }}>{r.label}</th>
                ))}
                <th className={styles.gapCol}>Gap (30÷10)</th>
              </tr>
            </thead>
            <tbody>
              {[0, 5, 10, 15, 20, 25, 30].filter((y) => y <= horizon).map((y) => {
                const vals = RATES.map((r) => cap * Math.pow(1 + r.pct / 100, y));
                return (
                  <tr key={y} className={y === horizon ? styles.lastRow : undefined}>
                    <td>{y === 0 ? "Start" : `${y}y`}</td>
                    {vals.map((v, i) => <td key={i}>{fmtCr(v)}</td>)}
                    <td className={styles.gapCol} style={{ color: "#22c55e" }}>
                      {y === 0 ? "1×" : `${(vals[2] / vals[0]).toFixed(1)}×`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.insight}>
        <strong>The gap after {horizon} years:</strong> At 30% CAGR your capital is{" "}
        <span style={{ color: "#22c55e" }}>
          {(seriesData[2].final / seriesData[0].final).toFixed(1)}×
        </span>{" "}
        larger than at 10% CAGR — on the exact same starting amount.
        A single extra percentage point, compounded for decades, is the single greatest wealth lever.
      </div>
    </CalcShell>
  );
}
