"use client";

import { useState, useMemo, useCallback } from "react";
import { CalcShell } from "./CalcShell";
import styles from "./MartingaleCalculator.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BuyLevel {
  level: number;         // averaging level (0 = original buy, 1 = first avg-down, …)
  triggerDrop: number;   // cumulative % drop from original buy that triggers this buy
  price: number;         // entry price (original × (1 − triggerDrop/100))
  units: number;         // units bought at this level (doubles each time)
  capitalDeployed: number;
  totalCapital: number;  // cumulative
  avgCost: number;       // new average cost across all holdings
  breakEvenPct: number;  // % rise needed from current price to break even
  totalUnits: number;    // cumulative units held
}

// ─── Maths ────────────────────────────────────────────────────────────────────

function buildLevels(
  originalPrice: number,
  dropPct: number,       // % drop between each averaging-down level
  initialUnits: number,  // units at level 0
  maxLevels: number,
): BuyLevel[] {
  const rows: BuyLevel[] = [];
  let totalCapital = 0;
  let totalUnits = 0;

  for (let i = 0; i <= maxLevels; i++) {
    const cumDropPct = i * dropPct;
    // Stock cannot trade below zero — beyond 100% cumulative drop from entry, model is illustrative only
    const rawPrice = originalPrice * (1 - cumDropPct / 100);
    const price = Math.max(0.01, rawPrice);
    const units = initialUnits * Math.pow(2, i); // doubles each level
    const capitalDeployed = price * units;
    totalCapital += capitalDeployed;
    totalUnits += units;
    const avgCost = totalCapital / totalUnits;
    const breakEvenPct = ((avgCost - price) / price) * 100;

    rows.push({
      level: i,
      triggerDrop: cumDropPct,
      price,
      units,
      capitalDeployed,
      totalCapital,
      avgCost,
      breakEvenPct,
      totalUnits,
    });
  }
  return rows;
}

// Probability of ruin: if each level has independent p_survival of NOT hitting
// the next trigger drop, P(ruin at level n) = (1-p)^n, but we model it as:
// given we're already at level i, what's probability stock falls another dropPct%?
// We use a simplified model: P(another -X% drop | already down cumX%) = baseP
// P(total ruin) = P(hitting all levels in sequence) = baseP^maxLevels
function ruinProbability(dropPct: number, levels: number, baseP: number): number {
  // P(stock falls another -dropPct% given it's already falling) = baseP
  // P(reaching level n) = baseP^n
  return Math.pow(baseP, levels) * 100;
}

// P(stock falls another X% given it just fell X%) — historical rough estimate
// For Indian equities: 10% drop → ~45% chance of another 10%; 20% → ~35%; 30% → ~25%
function fallProbabilityEstimate(dropPct: number): number {
  if (dropPct <= 5) return 0.55;
  if (dropPct <= 10) return 0.48;
  if (dropPct <= 15) return 0.42;
  if (dropPct <= 20) return 0.36;
  if (dropPct <= 25) return 0.30;
  if (dropPct <= 30) return 0.25;
  return 0.20;
}

// ─── Famous meltdowns ─────────────────────────────────────────────────────────

const MELTDOWNS = [
  { name: "Yes Bank (2018–20)", drop: 97, note: "₹400 → ₹5. Every avg-down was a trap." },
  { name: "DHFL (2018–19)", drop: 98, note: "₹600 → ₹12. Bankruptcy wiped shareholders." },
  { name: "Unitech (2008–13)", drop: 99, note: "₹500 → ₹2. Fraud + debt = zero." },
  { name: "Reliance Comm (2017–19)", drop: 96, note: "₹60 → ₹2. Avg-down buyers lost everything." },
  { name: "Gitanjali Gems (2018)", drop: 99, note: "₹600 → ₹6. PNB fraud. Ceased trading." },
  { name: "Satyam (2009)", drop: 92, note: "₹300 → ₹23 overnight. Accounting fraud." },
];

// ─── Formatting ───────────────────────────────────────────────────────────────

function fmtMoney(n: number): string {
  const sign = n < 0 ? "−" : "";
  const v = Math.abs(n);
  if (v >= 1e7) return `${sign}₹${(v / 1e7).toFixed(2)} Cr`;
  if (v >= 1e5) return `${sign}₹${(v / 1e5).toFixed(2)} L`;
  return `${sign}₹${Math.round(v).toLocaleString("en-IN")}`;
}

function fmtPct(n: number, d = 1): string {
  return `${n.toFixed(d)}%`;
}

// ─── SVG Drawdown Path ────────────────────────────────────────────────────────

function DrawdownSvg({
  levels,
  maxDrop,
}: {
  levels: BuyLevel[];
  maxDrop: number;
}) {
  const W = 520;
  const H = 200;
  const PL = 10;
  const PR = 10;
  const PT = 16;
  const PB = 24;
  const chartW = W - PL - PR;
  const chartH = H - PT - PB;

  const totalLevels = Math.max(1, levels.length - 1);

  // price line: starts at original price, falls -dropPct% per level
  const pricePoints = levels.map((lv, i) => {
    const x = PL + (i / totalLevels) * chartW;
    const y = PT + (lv.triggerDrop / maxDrop) * chartH;
    return { x, y, lv };
  });

  // avg cost line
  const avgPoints = levels.map((lv, i) => {
    const x = PL + (i / totalLevels) * chartW;
    const yVal = ((levels[0].price - lv.avgCost) / levels[0].price) * 100;
    const y = PT + (yVal / maxDrop) * chartH;
    return { x, y };
  });

  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  const areaPath =
    `M ${pricePoints[0].x.toFixed(1)} ${PT} ` +
    pricePoints.map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") +
    ` L ${pricePoints[totalLevels].x.toFixed(1)} ${PT} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={styles.chartSvg}
      aria-hidden
    >
      <defs>
        <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Price area fill */}
      <path d={areaPath} fill="url(#priceGrad)" />

      {/* Price line (stock falling) */}
      <path d={toPath(pricePoints)} fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Avg cost line */}
      <path d={toPath(avgPoints)} fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="5 3" strokeLinejoin="round" />

      {/* Buy markers on price line */}
      {pricePoints.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={5} fill="#ef4444" stroke="#1a1a1a" strokeWidth="1.5" />
          <text x={p.x} y={p.y - 9} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">
            {i === 0 ? "Buy" : `Avg ${i}`}
          </text>
        </g>
      ))}

      {/* Avg cost markers */}
      {avgPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="#f59e0b" opacity={0.8} />
      ))}

      {/* Legend */}
      <g transform={`translate(${PL}, ${H - PB + 8})`}>
        <line x1="0" y1="0" x2="14" y2="0" stroke="#ef4444" strokeWidth="2.5" />
        <text x="18" y="4" fontSize="9" fill="rgba(255,255,255,0.4)">Stock price</text>
        <line x1="80" y1="0" x2="94" y2="0" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="4 2" />
        <text x="98" y="4" fontSize="9" fill="rgba(255,255,255,0.4)">Avg cost</text>
      </g>
    </svg>
  );
}

// ─── Capital Exposure Bar ─────────────────────────────────────────────────────

function CapitalBar({ levels }: { levels: BuyLevel[] }) {
  const max = Math.max(1e-9, levels[levels.length - 1].totalCapital);
  const denom = Math.max(1, levels.length - 1);
  return (
    <div className={styles.capBars}>
      {levels.map((lv) => {
        const pct = Math.min(100, Math.max(0, (lv.totalCapital / max) * 100));
        return (
          <div key={lv.level} className={styles.capBarRow}>
            <div className={styles.capBarLabel}>
              <span>Level {lv.level}</span>
              <span className={styles.capBarDrop}>−{fmtPct(lv.triggerDrop)}</span>
            </div>
            <div className={styles.capBarTrackRow}>
              <div className={styles.capBarTrack}>
                <div
                  className={styles.capBarFill}
                  style={{
                    width: `${pct}%`,
                    opacity: 0.4 + 0.6 * (lv.level / denom),
                  }}
                />
              </div>
              <span className={styles.capBarAmount}>{fmtMoney(lv.totalCapital)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function MartingaleCalculator() {
  const [price, setPrice] = useState("500");
  const [dropPct, setDropPct] = useState(20);
  const [initialInvest, setInitialInvest] = useState("100000");
  const [maxLevels, setMaxLevels] = useState(5);
  const [showMeltdown, setShowMeltdown] = useState<number | null>(null);

  const originalPrice = Math.max(1, parseFloat(price) || 500);
  const initialCapital = Math.max(1000, parseFloat(initialInvest) || 100000);
  const initialUnits = Math.floor(initialCapital / originalPrice);

  const levels = useMemo(
    () => buildLevels(originalPrice, dropPct, initialUnits, maxLevels),
    [originalPrice, dropPct, initialUnits, maxLevels],
  );

  const lastLevel = levels[levels.length - 1];
  const totalCapitalNeeded = lastLevel.totalCapital;
  const fallP = fallProbabilityEstimate(dropPct);
  const ruinP = ruinProbability(dropPct, maxLevels, fallP);
  const maxDropFromOriginal = lastLevel.triggerDrop;

  // Ruin scenario: if stock falls to zero after last buy
  const totalLoss = totalCapitalNeeded;

  const getRuinColor = (p: number) => {
    if (p < 5) return "#22c55e";
    if (p < 20) return "#f59e0b";
    if (p < 50) return "#f97316";
    return "#ef4444";
  };
  const ruinColor = getRuinColor(ruinP);

  const handleDropChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setDropPct(Number(e.target.value)),
    [],
  );
  const handleLevelsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setMaxLevels(Number(e.target.value)),
    [],
  );

  return (
    <CalcShell
      title="Martingale Risk of Ruin"
      tagline="The averaging-down trap"
      disclaimer="This tool illustrates the mathematical risk of doubling down on falling stocks. It is for educational purposes only. Individual stocks can and do go to zero — the examples shown are real historical cases from Indian markets."
    >
      <div className={styles.shellInner}>
      {/* ── Intro banner ── */}
      <div className={styles.introBanner}>
        <div className={styles.introIcon}>⚠</div>
        <div>
          <div className={styles.introTitle}>The "it'll bounce back" trap</div>
          <div className={styles.introText}>
            Martingale is a betting strategy where you double your bet after every loss, assuming you'll eventually win and recover. Applied to stocks, it means buying more of a falling stock — each time at a lower price, with double the capital. The maths looks appealing. The reality is catastrophic when the stock keeps falling.
          </div>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className={styles.controls}>
        <div className={styles.field}>
          <label className={styles.label}>Stock entry price (₹)</label>
          <input
            type="number"
            className={styles.input}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 500"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Initial investment (₹)</label>
          <input
            type="number"
            className={styles.input}
            value={initialInvest}
            onChange={(e) => setInitialInvest(e.target.value)}
            placeholder="e.g. 100000"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>
            Avg-down trigger: <strong style={{ color: "#ef4444" }}>every −{dropPct}%</strong>
          </label>
          <input
            type="range"
            className={styles.sliderRed}
            min={5}
            max={40}
            step={5}
            value={dropPct}
            onChange={handleDropChange}
          />
          <div className={styles.sliderEnds}><span>−5%</span><span>−40%</span></div>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>
            Averaging levels: <strong style={{ color: "#f59e0b" }}>{maxLevels}</strong>
          </label>
          <input
            type="range"
            className={styles.sliderAmber}
            min={2}
            max={8}
            step={1}
            value={maxLevels}
            onChange={handleLevelsChange}
          />
          <div className={styles.sliderEnds}><span>2 levels</span><span>8 levels</span></div>
        </div>
      </div>

      {/* ── Hero stats ── */}
      <div className={styles.heroStats}>
        <div className={styles.heroStat}>
          <div className={styles.heroVal}>{fmtMoney(totalCapitalNeeded)}</div>
          <div className={styles.heroLbl}>Total capital needed</div>
          <div className={styles.heroSub}>{maxLevels + 1} buys, all-in</div>
        </div>
        <div className={styles.heroStat}>
          <div className={styles.heroVal} style={{ color: "#ef4444" }}>−{fmtPct(maxDropFromOriginal)}</div>
          <div className={styles.heroLbl}>Stock falls from your buy</div>
          <div className={styles.heroSub}>before your last avg-down</div>
        </div>
        <div className={styles.heroStat}>
          <div className={styles.heroVal} style={{ color: "#f59e0b" }}>+{fmtPct(lastLevel.breakEvenPct)}</div>
          <div className={styles.heroLbl}>Rally needed to break even</div>
          <div className={styles.heroSub}>from the final avg-down price</div>
        </div>
        <div className={styles.heroStat} style={{ borderColor: ruinColor + "44" }}>
          <div className={styles.heroVal} style={{ color: ruinColor }}>{fmtPct(ruinP)}</div>
          <div className={styles.heroLbl}>Estimated ruin probability</div>
          <div className={styles.heroSub}>stock keeps falling through all levels</div>
        </div>
      </div>

      {/* ── Chart ── */}
      <div className={styles.chartWrap}>
        <div className={styles.chartTitle}>Price path vs. average cost</div>
        <DrawdownSvg levels={levels} maxDrop={maxDropFromOriginal || 100} />
      </div>

      {/* ── Capital exposure ── */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Capital committed at each level (doubles every time)</div>
        <CapitalBar levels={levels} />
        <div className={styles.capWarning}>
          Level {maxLevels} alone requires{" "}
          <strong style={{ color: "#ef4444" }}>{fmtMoney(levels[maxLevels].capitalDeployed)}</strong>
          {" "}— that's{" "}
          <strong style={{ color: "#ef4444" }}>
            {Math.round(
              levels[maxLevels].capitalDeployed / Math.max(levels[0].capitalDeployed, 1e-9),
            )}
            ×
          </strong>{" "}
          your original bet.
        </div>
        {lastLevel.triggerDrop >= 100 && (
          <p className={styles.modelNote}>
            Once cumulative fall from your entry passes 100%, the share is worth ₹0 in theory. We floor the
            model at ₹0.01 so numbers stay positive — in practice there is nothing left to average into.
          </p>
        )}
      </div>

      {/* ── Breakdown table ── */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Level</th>
              <th>Stock price</th>
              <th>Drop from buy</th>
              <th>Units bought</th>
              <th>Capital this buy</th>
              <th>Total capital in</th>
              <th>Avg cost</th>
              <th>Break-even rally needed</th>
            </tr>
          </thead>
          <tbody>
            {levels.map((lv) => (
              <tr key={lv.level}>
                <td className={styles.levelCell}>
                  <span className={styles.levelBadge} style={{
                    background: lv.level === 0 ? "rgba(239,68,68,0.15)" : `rgba(239,68,68,${0.05 + lv.level * 0.06})`,
                    color: lv.level === 0 ? "#ef4444" : `rgba(239,${Math.max(68, 200 - lv.level * 20)},68,1)`,
                  }}>
                    {lv.level === 0 ? "Entry" : `Avg ${lv.level}`}
                  </span>
                </td>
                <td>₹{lv.price.toFixed(2)}</td>
                <td className={lv.triggerDrop > 0 ? styles.redCell : ""}>{lv.triggerDrop > 0 ? `−${fmtPct(lv.triggerDrop)}` : "—"}</td>
                <td>{Math.round(lv.units).toLocaleString("en-IN")}</td>
                <td>{fmtMoney(lv.capitalDeployed)}</td>
                <td className={styles.boldCell}>{fmtMoney(lv.totalCapital)}</td>
                <td>₹{lv.avgCost.toFixed(2)}</td>
                <td className={styles.amberCell}>+{fmtPct(lv.breakEvenPct)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Total loss scenario ── */}
      <div className={styles.ruinBox}>
        <div className={styles.ruinTitle}>
          <span className={styles.ruinIcon}>💀</span>
          If the stock goes to zero after your last average-down
        </div>
        <div className={styles.ruinStats}>
          <div className={styles.ruinStat}>
            <div className={styles.ruinVal}>{fmtMoney(totalLoss)}</div>
            <div className={styles.ruinLbl}>Total money lost</div>
          </div>
          <div className={styles.ruinStat}>
            <div className={styles.ruinVal}>{(totalCapitalNeeded / initialCapital).toFixed(1)}×</div>
            <div className={styles.ruinLbl}>Multiple of original bet</div>
          </div>
          <div className={styles.ruinStat}>
            <div className={styles.ruinVal} style={{ color: ruinColor }}>{fmtPct(ruinP)}</div>
            <div className={styles.ruinLbl}>Estimated probability</div>
          </div>
        </div>
      </div>

      {/* ── Real meltdowns ── */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>
          Real Indian stocks that averaged-down believers lost everything on
        </div>
        <div className={styles.meltdowns}>
          {MELTDOWNS.map((m, i) => (
            <button
              key={i}
              className={`${styles.meltdownCard} ${showMeltdown === i ? styles.meltdownCardOpen : ""}`}
              onClick={() => setShowMeltdown(showMeltdown === i ? null : i)}
            >
              <div className={styles.meltdownTop}>
                <div className={styles.meltdownName}>{m.name}</div>
                <div className={styles.meltdownDrop}>−{m.drop}%</div>
              </div>
              {showMeltdown === i && (
                <div className={styles.meltdownNote}>{m.note}</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Education ── */}
      <div className={styles.eduSection}>
        <div className={styles.eduCard}>
          <div className={styles.eduIcon}>📉</div>
          <div className={styles.eduTitle}>Stocks are not mean-reverting</div>
          <div className={styles.eduText}>
            Roulette wheels have memory — red/black always stay 50/50. Individual stocks don't. A stock that has fallen 80% can fall another 90%. The company can go bankrupt. Unlike a casino, the house edge here is called <em>insolvency</em>.
          </div>
        </div>
        <div className={styles.eduCard}>
          <div className={styles.eduIcon}>💸</div>
          <div className={styles.eduTitle}>Capital compounds faster against you</div>
          <div className={styles.eduText}>
            At each averaging level, you double your bet. After just 5 levels, you've committed 63× your initial buy — most of which is now underwater. Your break-even point is a massive rally from a stock already in free-fall.
          </div>
        </div>
        <div className={styles.eduCard}>
          <div className={styles.eduIcon}>🧠</div>
          <div className={styles.eduTitle}>Loss aversion + sunk cost = ruin loop</div>
          <div className={styles.eduText}>
            The psychological trap is powerful: you've already lost ₹X, so buying more "averages down the cost." But you're not reducing risk — you're increasing total exposure to a thesis that is already failing. Process over emotion.
          </div>
        </div>
      </div>
      </div>
    </CalcShell>
  );
}
