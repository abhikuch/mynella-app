"use client";

import { useId, useState, useCallback } from "react";
import styles from "./PolarisCycleTable.module.css";

// ─── Model ───────────────────────────────────────────────────────────────────
// Each cycle: capital doubles (100% gross return).
// Tax      : 12.5% LTCG on gain
// Fee      : 20% of post-tax gain (doubling within 3 years)
// Withdrawal: 10% of starting capital for that cycle
// Reinvested: start + (gain × 0.875 × 0.80) − (start × 0.10)

interface CycleRow {
  cycle: number;
  start: number;   // capital entering cycle
  gross: number;   // value at doubling (2× start)
  tax: number;     // 12.5% of gain
  fee: number;     // 20% of post-tax gain
  withdrawal: number; // 10% of start
  netProfit: number;  // gain after tax, fee, withdrawal
  end: number;     // reinvested into next cycle
}

function buildCycles(initial: number, n: number): CycleRow[] {
  const rows: CycleRow[] = [];
  let start = initial;
  for (let i = 1; i <= n; i++) {
    const gain = start;
    const tax = gain * 0.125;
    const postTaxGain = gain - tax;
    const fee = postTaxGain * 0.20;
    const netGain = postTaxGain - fee;
    const withdrawal = start * 0.10;
    const end = start + netGain - withdrawal;
    rows.push({
      cycle: i,
      start,
      gross: start * 2,
      tax,
      fee,
      withdrawal,
      netProfit: netGain - withdrawal,
      end,
    });
    start = end;
  }
  return rows;
}

// ─── Formatting ──────────────────────────────────────────────────────────────
function fmtInr(n: number): string {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

function fmtInrFull(n: number): string {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

// ─── Quick picks ─────────────────────────────────────────────────────────────
const QUICK_PICKS = [
  { label: "₹10L", value: 1000000 },
  { label: "₹25L", value: 2500000 },
  { label: "₹50L", value: 5000000 },
  { label: "₹1 Cr", value: 10000000 },
  { label: "₹2 Cr", value: 20000000 },
  { label: "₹5 Cr", value: 50000000 },
];

const MIN_CYCLES = 3;
const MAX_CYCLES = 10;

// ─── Component ───────────────────────────────────────────────────────────────
export function PolarisCycleTable({
  defaultCapital = 5_000_000,
  minCapital = 500_000,
}: {
  /** Default starting capital in ₹ (e.g. 50L PMS hub, 10L Polaris Lite). */
  defaultCapital?: number;
  /** Floor for parsed input — matches product minimum where applicable. */
  minCapital?: number;
} = {}) {
  const baseId = useId();
  const [rawInput, setRawInput] = useState(() => String(defaultCapital));
  const [cycles, setCycles] = useState(7);

  const capital = Math.max(minCapital, parseFloat(rawInput) || defaultCapital);
  const rows = buildCycles(capital, cycles);
  const finalRow = rows[rows.length - 1];
  const multiple = finalRow.end / capital;
  const totalWithdrawn = rows.reduce((s, r) => s + r.withdrawal, 0);
  const totalFees = rows.reduce((s, r) => s + r.fee, 0);
  const totalTax = rows.reduce((s, r) => s + r.tax, 0);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRawInput(e.target.value);
  }, []);

  const inputId = `${baseId}-capital`;
  const readoutId = `${baseId}-readout`;
  const cyclesSliderId = `${baseId}-cycles`;

  return (
    <div className={styles.wrap}>
      {/* How it works — plain language */}
      <ol className={styles.steps} aria-label="How each cycle works">
        <li className={styles.step}>
          <span className={styles.stepNum}>1</span>
          <span><strong>Double</strong> — your capital is assumed to double (100% gross gain).</span>
        </li>
        <li className={styles.step}>
          <span className={styles.stepNum}>2</span>
          <span><strong>Pay</strong> — 12.5% tax on the gain, then 20% performance fee on what&apos;s left after tax.</span>
        </li>
        <li className={styles.step}>
          <span className={styles.stepNum}>3</span>
          <span><strong>Withdraw &amp; reinvest</strong> — you take out 10% of what you started the cycle with; the rest rolls forward.</span>
        </li>
      </ol>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={inputId}>
            Starting capital (type any amount in ₹, or use chips below)
          </label>
          <input
            id={inputId}
            type="number"
            className={styles.input}
            value={rawInput}
            onChange={handleInput}
            placeholder={`e.g. ${defaultCapital}`}
            min={minCapital}
            aria-describedby={readoutId}
            inputMode="numeric"
          />
          <p id={readoutId} className={styles.inputReadout} aria-live="polite">
            <span className={styles.inputReadoutLabel}>Readable amount:</span>{" "}
            <span className={styles.inputReadoutVal}>{fmtInrFull(capital)}</span>
            <span className={styles.inputReadoutParen}> ({fmtInr(capital)})</span>
          </p>
          <div className={styles.quickPicks}>
            {QUICK_PICKS.map((q) => (
              <button
                type="button"
                key={q.value}
                className={`${styles.qp} ${capital === q.value ? styles.qpActive : ""}`}
                onClick={() => setRawInput(String(q.value))}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={cyclesSliderId}>
            How many full doublings?{" "}
            <strong className={styles.cyclesStrong}>{cycles}</strong>
          </label>
          <input
            id={cyclesSliderId}
            type="range"
            className={styles.slider}
            min={MIN_CYCLES}
            max={MAX_CYCLES}
            value={cycles}
            onChange={(e) => setCycles(Number(e.target.value))}
            aria-valuemin={MIN_CYCLES}
            aria-valuemax={MAX_CYCLES}
            aria-valuenow={cycles}
            aria-valuetext={`${cycles} cycles`}
          />
          <div className={styles.sliderEnds}>
            <span>{MIN_CYCLES} doublings (fewer)</span>
            <span>{MAX_CYCLES} doublings (more)</span>
          </div>
        </div>
      </div>

      {/* Hero result */}
      <section className={styles.heroResult} aria-labelledby="polaris-summary-heading">
        <div className={styles.heroLeft}>
          <h3 id="polaris-summary-heading" className={styles.heroHeading}>
            Summary after {cycles} doublings
          </h3>
          <div className={styles.heroLabel}>What&apos;s still invested (reinvested)</div>
          <div className={styles.heroAmount}>{fmtInr(finalRow.end)}</div>
          <div className={styles.heroSub}>
            From <strong>{fmtInr(capital)}</strong> you end with about{" "}
            <strong className={styles.heroMult}>{multiple.toFixed(1)}×</strong>{" "}
            that amount — after all taxes, fees, and withdrawals above.
          </div>
        </div>
        <div className={styles.heroStats}>
          <p className={styles.heroStatsIntro}>Taken out over all {cycles} cycles (cumulative)</p>
          <div className={styles.heroStat}>
            <div className={styles.heroStatVal}>{fmtInr(totalWithdrawn)}</div>
            <div className={styles.heroStatLbl}>Withdrawals (10% each cycle)</div>
          </div>
          <div className={styles.heroStat}>
            <div className={styles.heroStatVal}>{fmtInr(totalFees)}</div>
            <div className={styles.heroStatLbl}>Performance fees (20% after tax)</div>
          </div>
          <div className={styles.heroStat}>
            <div className={styles.heroStatVal}>{fmtInr(totalTax)}</div>
            <div className={styles.heroStatLbl}>Tax on gains (12.5%)</div>
          </div>
        </div>
      </section>

      {/* Detailed table */}
      <div className={styles.tableSection}>
        <h3 className={styles.tableSectionTitle}>Full breakdown by cycle</h3>
        <p className={styles.tableSectionLead}>
          Each row is one doubling. Read left to right: what you started with → what 2× looks like → what gets deducted → what remains.
        </p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.tableCaption}>
              Polaris-style compounding: per-cycle capital, gross after double, deductions, and reinvested balance.
            </caption>
            <thead>
              <tr>
                <th scope="col">Cycle</th>
                <th scope="col">Start with</th>
                <th scope="col">After 2× (gross)</th>
                <th scope="col">Tax 12.5%</th>
                <th scope="col">Fee 20%</th>
                <th scope="col">Withdraw 10%</th>
                <th scope="col">Reinvested</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.cycle} className={r.cycle === cycles ? styles.lastRow : ""}>
                  <td className={styles.cycleCell}>
                    <span className={styles.cycleBadge}>{r.cycle}</span>
                  </td>
                  <td>{fmtInr(r.start)}</td>
                  <td className={styles.grossCell}>{fmtInr(r.gross)}</td>
                  <td className={styles.deductCell}>−{fmtInr(r.tax)}</td>
                  <td className={styles.deductCell}>−{fmtInr(r.fee)}</td>
                  <td className={styles.deductCell}>−{fmtInr(r.withdrawal)}</td>
                  <td className={styles.endCell}>{fmtInr(r.end)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" colSpan={3} className={styles.tfootLabel}>
                  Totals (all cycles)
                </th>
                <td className={styles.totalCell}>−{fmtInr(totalTax)}</td>
                <td className={styles.totalCell}>−{fmtInr(totalFees)}</td>
                <td className={styles.totalCell}>−{fmtInr(totalWithdrawn)}</td>
                <td className={styles.totalEndCell}>{fmtInr(finalRow.end)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <p className={styles.note}>
        Illustrative model only. Assumes a full 2× gross return every cycle (Polaris benchmark). Tax 12.5% on gains; performance fee 20% on post-tax profit when doubling is within 3 years; withdrawal 10% of capital at the start of each cycle. Actual results will differ.
      </p>
    </div>
  );
}
