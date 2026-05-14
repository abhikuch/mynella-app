"use client";

import { useMemo, useState } from "react";
import { CalcShell } from "./CalcShell";
import styles from "./RetirementCalculator.module.css";

function fmtMoney(n: number) {
  if (!isFinite(n) || isNaN(n)) return "—";
  const abs = Math.abs(n);
  if (abs >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (abs >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

function fmtMonthly(n: number) {
  if (!isFinite(n) || isNaN(n) || n <= 0) return "₹0";
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

/**
 * PV of a growing annuity due (payments at start of each period).
 * Returns the present value at the start of retirement of `years` annual withdrawals
 * starting at `firstYearPayment`, where each payment grows by `g` per year, discounted at `r`.
 */
function pvGrowingAnnuityDue(
  firstYearPayment: number,
  realRate: number,
  growth: number,
  years: number,
): number {
  if (years <= 0) return 0;
  const r = realRate; // already real (post-inflation, post-tax) rate
  const g = growth; // post-retirement inflation
  const denom = r - g;
  // Standard PV-of-growing-annuity (due)
  let pv: number;
  if (Math.abs(denom) < 1e-9) {
    pv = firstYearPayment * years;
  } else {
    pv =
      (firstYearPayment / denom) *
      (1 - Math.pow((1 + g) / (1 + r), years));
  }
  return pv * (1 + r); // annuity-due adjustment (payments at start of period)
}

const FAQS: { q: string; a: string }[] = [
  {
    q: "Why is the corpus so much larger than I expected?",
    a: "Two forces collide: pre-retirement lifestyle inflation pushes today's expenses up to a future number, and the corpus then has to fund 25–30 years of withdrawals at the post-retirement inflation rate. Even modest inflation compounds aggressively over a 30+ year horizon.",
  },
  {
    q: "How is the real rate of return calculated?",
    a: "We use Fisher's exact formula: real rate = (1 + post-tax nominal return) ÷ (1 + post-retirement inflation) − 1. Using a simple subtraction overstates returns; the geometric form is honest about purchasing-power growth.",
  },
  {
    q: "Should I include taxes on retirement returns?",
    a: "If your retirement corpus throws off interest, dividends, or capital gains, the effective return is lower than headline. Toggle the post-tax setting and enter your blended rate to see a more realistic picture. LTCG on Indian equity above ₹1.25L is 12.5%; debt and slab-rate income can be 20–30%+.",
  },
  {
    q: "What does the SIP gap mean?",
    a: "It is the monthly investment required between today and your retirement age, on top of your existing portfolio's organic growth, to reach the target corpus at the pre-retirement return you set. Step-ups increase the SIP each year and reduce the starting amount needed.",
  },
  {
    q: "Why use lifestyle inflation, not just CPI?",
    a: "Headline CPI underweights housing, education, healthcare, and discretionary spend — categories that dominate a household's actual budget over decades. Most affluent Indian households experience materially higher personal inflation than the headline number suggests.",
  },
];

export function RetirementCalculator() {
  // Inputs
  const [currentAge, setCurrentAge] = useState(35);
  const [retireAge, setRetireAge] = useState(60);
  const [lifeAge, setLifeAge] = useState(90);
  const [monthlyExp, setMonthlyExp] = useState("150000");
  const [legacyStr, setLegacyStr] = useState("0");

  const [preInflation, setPreInflation] = useState(8);
  const [postInflation, setPostInflation] = useState(7);
  const [postReturn, setPostReturn] = useState(9);
  const [applyTax, setApplyTax] = useState(false);
  const [effectiveTax, setEffectiveTax] = useState(12.5);

  const [portfolio, setPortfolio] = useState("2500000");
  const [preReturn, setPreReturn] = useState(12);
  const [sipStepUp, setSipStepUp] = useState(5);

  const [showMath, setShowMath] = useState(false);

  // Derived numbers (single source of truth)
  const calc = useMemo(() => {
    const monthlyExpense = Math.max(0, parseFloat(monthlyExp) || 0);
    const legacy = Math.max(0, parseFloat(legacyStr) || 0);
    const currentPortfolio = Math.max(0, parseFloat(portfolio) || 0);

    const yearsToRetire = Math.max(0, retireAge - currentAge);
    const yearsInRetirement = Math.max(1, lifeAge - retireAge);

    const annualExpenseToday = monthlyExpense * 12;
    const annualExpenseAtRetirement =
      annualExpenseToday * Math.pow(1 + preInflation / 100, yearsToRetire);

    const grossPostReturn = postReturn / 100;
    const taxRate = applyTax ? Math.min(50, Math.max(0, effectiveTax)) / 100 : 0;
    const postTaxReturn = grossPostReturn * (1 - taxRate);
    const postInfl = postInflation / 100;

    // Fisher real rate
    const realRate = (1 + postTaxReturn) / (1 + postInfl) - 1;

    const spendingCorpus = pvGrowingAnnuityDue(
      annualExpenseAtRetirement,
      realRate,
      postInfl,
      yearsInRetirement,
    );

    const targetCorpus = spendingCorpus + legacy;

    // SIP gap
    const portfolioFv =
      currentPortfolio * Math.pow(1 + preReturn / 100, yearsToRetire);
    const gap = Math.max(0, targetCorpus - portfolioFv);

    // Annuity factor solving for a level monthly SIP that grows by step-up annually.
    // For simplicity we approximate via a series sum: each "year" contributes
    // monthlyAmount * 12 * stepUpFactor^yearIndex, growing in market at preReturn.
    // Then we solve for the starting monthly amount such that the cumulative FV equals `gap`.
    const r = preReturn / 100;
    const s = sipStepUp / 100;
    let fvFactorPerRupee = 0;
    for (let y = 0; y < yearsToRetire; y++) {
      // Each year invests monthlyAmount * 12 * (1+s)^y at start of year, grows for (yearsToRetire - y) years.
      fvFactorPerRupee += 12 * Math.pow(1 + s, y) * Math.pow(1 + r, yearsToRetire - y);
    }
    const monthlySipNeeded =
      yearsToRetire > 0 && fvFactorPerRupee > 0 ? gap / fvFactorPerRupee : 0;

    return {
      monthlyExpense,
      annualExpenseToday,
      annualExpenseAtRetirement,
      yearsToRetire,
      yearsInRetirement,
      postTaxReturn,
      realRate,
      spendingCorpus,
      legacy,
      targetCorpus,
      currentPortfolio,
      portfolioFv,
      gap,
      monthlySipNeeded,
    };
  }, [
    monthlyExp,
    legacyStr,
    portfolio,
    currentAge,
    retireAge,
    lifeAge,
    preInflation,
    postInflation,
    postReturn,
    applyTax,
    effectiveTax,
    preReturn,
    sipStepUp,
  ]);

  const corpusReady =
    calc.gap === 0 && calc.targetCorpus > 0 && calc.yearsToRetire > 0;
  const alreadyRetired = calc.yearsToRetire === 0;

  return (
    <CalcShell
      title="Real Number Retirement"
      tagline="A calculator that respects inflation, taxes, and 30-year horizons"
      disclaimer="Illustrative only. Built on a standard PV-of-growing-annuity model with optional post-tax adjustment. Inflation, returns, and tax rates change over time; treat outputs as scenarios, not predictions. Not investment advice."
    >
      <p className={styles.intro}>
        Most retirement rules of thumb were calibrated for a different India.
        Healthcare, education, and aspiration spending have outpaced headline
        inflation for decades. This tool projects today&apos;s expenses to
        your retirement date, then funds <strong>{calc.yearsInRetirement}</strong>{" "}
        years of withdrawals at the real (post-inflation, optionally post-tax)
        rate of return. Every line of math below the result is shown.
      </p>

      {/* — Inputs: Life & expenses — */}
      <div className={styles.section}>
        <div className={styles.sectionEyebrow}>Step 1 · Life & expenses</div>
        <h2 className={styles.sectionHeading}>Set your timeline and lifestyle.</h2>
        <div className={styles.controls}>
          <div className={styles.field}>
            <label className={styles.label}>
              Current age: <strong>{currentAge}</strong>
            </label>
            <input
              type="range"
              className={styles.slider}
              min={20}
              max={70}
              step={1}
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>
              Retire age: <strong>{retireAge}</strong>
            </label>
            <input
              type="range"
              className={styles.slider}
              min={Math.max(currentAge + 1, 35)}
              max={75}
              step={1}
              value={retireAge}
              onChange={(e) =>
                setRetireAge(Math.max(currentAge + 1, Number(e.target.value)))
              }
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>
              Plan to age: <strong>{lifeAge}</strong>
            </label>
            <input
              type="range"
              className={styles.slider}
              min={Math.max(retireAge + 1, 70)}
              max={100}
              step={1}
              value={lifeAge}
              onChange={(e) =>
                setLifeAge(Math.max(retireAge + 1, Number(e.target.value)))
              }
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Current monthly expenses (₹)</label>
            <input
              type="number"
              className={styles.input}
              value={monthlyExp}
              onChange={(e) => setMonthlyExp(e.target.value)}
              placeholder="e.g. 150000"
            />
            <div className={styles.helpText}>
              Family-level run-rate today. Avoid one-off lumps like school fees
              paid annually — convert them to a monthly equivalent.
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Legacy to leave (₹, optional)</label>
            <input
              type="number"
              className={styles.input}
              value={legacyStr}
              onChange={(e) => setLegacyStr(e.target.value)}
              placeholder="0"
            />
            <div className={styles.helpText}>
              Added on top of the spending corpus. Leave blank if there&apos;s no
              specific legacy goal.
            </div>
          </div>
        </div>
      </div>

      {/* — Inputs: Rates — */}
      <div className={styles.section}>
        <div className={styles.sectionEyebrow}>Step 2 · Rates</div>
        <h2 className={styles.sectionHeading}>
          Calibrate inflation and returns.
        </h2>
        <div className={styles.controls}>
          <div className={styles.field}>
            <label className={styles.label}>
              Pre-retirement lifestyle inflation:{" "}
              <strong>{preInflation}%</strong>
            </label>
            <input
              type="range"
              className={styles.slider}
              min={3}
              max={12}
              step={0.5}
              value={preInflation}
              onChange={(e) => setPreInflation(Number(e.target.value))}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>
              Post-retirement inflation:{" "}
              <strong>{postInflation}%</strong>
            </label>
            <input
              type="range"
              className={styles.slider}
              min={3}
              max={10}
              step={0.5}
              value={postInflation}
              onChange={(e) => setPostInflation(Number(e.target.value))}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>
              Post-retirement return on investment:{" "}
              <strong>{postReturn}%</strong>
            </label>
            <input
              type="range"
              className={styles.slider}
              min={4}
              max={14}
              step={0.5}
              value={postReturn}
              onChange={(e) => setPostReturn(Number(e.target.value))}
            />
          </div>
          <div
            className={`${styles.toggleRow}`}
            onClick={() => setApplyTax((v) => !v)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setApplyTax((v) => !v);
            }}
          >
            <span
              className={`${styles.toggle} ${applyTax ? styles.toggleActive : ""}`}
              aria-hidden
            >
              <span className={styles.toggleKnob} />
            </span>
            <span className={styles.toggleLabel}>
              <strong>Apply tax on retirement returns</strong>
              <br />
              {applyTax
                ? `Effective rate ${effectiveTax}% applied to post-retirement return.`
                : "Treat the post-retirement return as already post-tax."}
            </span>
          </div>
          {applyTax && (
            <div className={styles.field}>
              <label className={styles.label}>
                Effective tax rate on investment income:{" "}
                <strong>{effectiveTax}%</strong>
              </label>
              <input
                type="range"
                className={styles.slider}
                min={0}
                max={35}
                step={0.5}
                value={effectiveTax}
                onChange={(e) => setEffectiveTax(Number(e.target.value))}
              />
              <div className={styles.helpText}>
                LTCG on Indian equity is 12.5% above ₹1.25L. Debt and
                slab-rate income can be 20–30%+ depending on the source.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* — Corpus result — */}
      <div className={styles.corpusCard}>
        <div className={styles.corpusLeft}>
          <span className={styles.corpusLabel}>Corpus needed at retirement</span>
          <div className={styles.corpusValue}>{fmtMoney(calc.targetCorpus)}</div>
          <p className={styles.corpusSub}>
            Funds <strong>{calc.yearsInRetirement}</strong> years of withdrawals at
            today&apos;s {fmtMonthly(calc.monthlyExpense)}/month lifestyle, indexed
            for inflation, with a {(calc.realRate * 100).toFixed(2)}% real rate of
            return after the rates you set.
          </p>
        </div>
        <div className={styles.corpusSplit}>
          <div className={styles.splitRow}>
            <span className={styles.splitKey}>Annual spend at retirement</span>
            <span className={styles.splitVal}>
              {fmtMoney(calc.annualExpenseAtRetirement)}
            </span>
          </div>
          <div className={styles.splitRow}>
            <span className={styles.splitKey}>Spending corpus</span>
            <span className={`${styles.splitVal} ${styles.splitAccent}`}>
              {fmtMoney(calc.spendingCorpus)}
            </span>
          </div>
          <div className={styles.splitRow}>
            <span className={styles.splitKey}>Legacy target</span>
            <span className={styles.splitVal}>{fmtMoney(calc.legacy)}</span>
          </div>
          <div className={styles.splitRow}>
            <span className={styles.splitKey}>Years to retire</span>
            <span className={styles.splitVal}>{calc.yearsToRetire}</span>
          </div>
        </div>
      </div>

      {/* — Working math — */}
      <div className={styles.section}>
        <div className={styles.math}>
          <button
            type="button"
            className={styles.mathToggle}
            onClick={() => setShowMath((v) => !v)}
            aria-expanded={showMath}
          >
            <span>How we got there — no black box</span>
            <span>{showMath ? "−" : "+"}</span>
          </button>
          {showMath && (
            <div className={styles.mathBody}>
              <div className={styles.mathRow}>
                <span className={styles.mathNum}>1</span>
                <span className={styles.mathKey}>
                  Annual expenses today
                  <small>monthly × 12</small>
                </span>
                <span className={styles.mathVal}>
                  {fmtMoney(calc.annualExpenseToday)}
                </span>
              </div>
              <div className={styles.mathRow}>
                <span className={styles.mathNum}>2</span>
                <span className={styles.mathKey}>
                  Annual expense at retirement
                  <small>
                    today × (1 + {preInflation}%)^{calc.yearsToRetire}
                  </small>
                </span>
                <span className={styles.mathVal}>
                  {fmtMoney(calc.annualExpenseAtRetirement)}
                </span>
              </div>
              <div className={styles.mathRow}>
                <span className={styles.mathNum}>3</span>
                <span className={styles.mathKey}>
                  Post-tax return on investment
                  <small>
                    {postReturn}% × (1 −{" "}
                    {applyTax ? `${effectiveTax}%` : "0%"})
                  </small>
                </span>
                <span className={styles.mathVal}>
                  {(calc.postTaxReturn * 100).toFixed(2)}%
                </span>
              </div>
              <div className={styles.mathRow}>
                <span className={styles.mathNum}>4</span>
                <span className={styles.mathKey}>
                  Real rate of return in retirement
                  <small>
                    (1 + post-tax return) ÷ (1 + {postInflation}%) − 1
                  </small>
                </span>
                <span className={styles.mathVal}>
                  {(calc.realRate * 100).toFixed(2)}%
                </span>
              </div>
              <div className={styles.mathRow}>
                <span className={styles.mathNum}>5</span>
                <span className={styles.mathKey}>
                  Years your money must last
                  <small>plan to age − retire age</small>
                </span>
                <span className={styles.mathVal}>
                  {calc.yearsInRetirement}
                </span>
              </div>
              <div className={styles.mathRow}>
                <span className={styles.mathNum}>6</span>
                <span className={styles.mathKey}>
                  Spending corpus
                  <small>PV of growing annuity (due) at the real rate</small>
                </span>
                <span className={styles.mathVal}>
                  {fmtMoney(calc.spendingCorpus)}
                </span>
              </div>
              <div className={styles.mathRow}>
                <span className={styles.mathNum}>+</span>
                <span className={styles.mathKey}>
                  Legacy to leave
                  <small>added on top of the spending corpus</small>
                </span>
                <span className={styles.mathVal}>{fmtMoney(calc.legacy)}</span>
              </div>
              <div className={`${styles.mathRow} ${styles.mathFinal}`}>
                <span className={styles.mathNum}>=</span>
                <span className={styles.mathKey}>
                  Corpus needed at retirement
                </span>
                <span className={styles.mathVal}>
                  {fmtMoney(calc.targetCorpus)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* — SIP gap — */}
      <div className={styles.section}>
        <div className={styles.sectionEyebrow}>Step 3 · Closing the gap</div>
        <h2 className={styles.sectionHeading}>
          How much you need to invest from here.
        </h2>
        <p className={styles.sectionLead}>
          The corpus above is the goal. Your current portfolio compounds on its
          own; the monthly SIP fills whatever distance remains.
        </p>
        <div className={styles.controls}>
          <div className={styles.field}>
            <label className={styles.label}>Current portfolio value (₹)</label>
            <input
              type="number"
              className={styles.input}
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder="e.g. 2500000"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>
              Pre-retirement return (CAGR):{" "}
              <strong>{preReturn}%</strong>
            </label>
            <input
              type="range"
              className={styles.slider}
              min={6}
              max={20}
              step={0.5}
              value={preReturn}
              onChange={(e) => setPreReturn(Number(e.target.value))}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>
              Annual SIP step-up: <strong>{sipStepUp}%</strong>
            </label>
            <input
              type="range"
              className={styles.slider}
              min={0}
              max={15}
              step={1}
              value={sipStepUp}
              onChange={(e) => setSipStepUp(Number(e.target.value))}
            />
            <div className={styles.helpText}>
              Each year&apos;s SIP increases by this percentage — typically tied
              to income growth.
            </div>
          </div>
        </div>

        <div className={styles.sipBlock}>
          <div className={styles.sipBlockHead}>
            <span className={styles.sipLabel}>
              Monthly SIP that gets you there
            </span>
            <div className={styles.sipValue}>
              {alreadyRetired
                ? "—"
                : corpusReady
                  ? "₹0"
                  : fmtMonthly(calc.monthlySipNeeded)}
            </div>
          </div>
          {alreadyRetired ? (
            <p className={styles.sipNote}>
              Your retirement age is set to today, so the SIP step doesn&apos;t
              apply. Increase the gap between current age and retire age above
              to see what monthly investment closes the distance.
            </p>
          ) : corpusReady ? (
            <p className={styles.sipNote}>
              <span className={styles.sipNoteGood}>
                Your portfolio is already projected to exceed the target at the
                pre-retirement return you set.
              </span>{" "}
              Consider whether de-risking, distributing, or expanding your
              spending plan is the right next move.
            </p>
          ) : (
            <p className={styles.sipNote}>
              Starting at this amount and stepping up by{" "}
              <strong>{sipStepUp}%</strong> each year, your portfolio of{" "}
              <strong>{fmtMoney(calc.currentPortfolio)}</strong> grows to{" "}
              <strong>{fmtMoney(calc.portfolioFv)}</strong> and the SIP bridges
              the remaining <strong>{fmtMoney(calc.gap)}</strong>.
            </p>
          )}
        </div>
      </div>

      {/* — Capital phases — */}
      <div className={styles.section}>
        <div className={styles.sectionEyebrow}>The three phases of capital</div>
        <h2 className={styles.sectionHeading}>
          The number alone doesn&apos;t finish the job.
        </h2>
        <p className={styles.sectionLead}>
          Reaching the corpus is one problem. Holding it through volatility and
          drawing it down responsibly are two more — each with its own playbook.
        </p>
        <div className={styles.phases}>
          <div className={styles.phaseCard}>
            <span className={styles.phaseTag}>Accumulate</span>
            <h3 className={styles.phaseTitle}>Compound aggressively, on rules.</h3>
            <p className={styles.phaseDesc}>
              The decades before retirement reward consistent, systematic
              exposure to equity-heavy strategies — and ruthless discipline
              against panic selling.
            </p>
          </div>
          <div className={styles.phaseCard}>
            <span className={styles.phaseTag}>Protect</span>
            <h3 className={styles.phaseTitle}>De-risk the last mile.</h3>
            <p className={styles.phaseDesc}>
              In the five years before retirement, the order of returns matters
              more than the average. A poor year right at the start can do more
              damage than a poor decade later.
            </p>
          </div>
          <div className={styles.phaseCard}>
            <span className={styles.phaseTag}>Distribute</span>
            <h3 className={styles.phaseTitle}>Spend without breaking compounding.</h3>
            <p className={styles.phaseDesc}>
              Withdrawal rules, asset-bucket structures, and tax planning
              determine whether the corpus lasts to 90 or runs dry at 80. The
              real rate above is the operating lever.
            </p>
          </div>
        </div>
      </div>

      {/* — FAQ — */}
      <div className={styles.section}>
        <div className={styles.sectionEyebrow}>FAQ</div>
        <h2 className={styles.sectionHeading}>Common questions, answered.</h2>
        <div className={styles.faqList}>
          {FAQS.map((f) => (
            <div key={f.q} className={styles.faqItem}>
              <div className={styles.faqQ}>{f.q}</div>
              <p className={styles.faqA}>{f.a}</p>
            </div>
          ))}
        </div>
        <p className={styles.source}>
          Method: standard actuarial present-value-of-growing-annuity model.
          Inputs project today&apos;s expenses to retirement at the pre-retirement
          inflation rate, then discount the retirement-period withdrawals at the
          real (Fisher) rate of return. Long-run inflation drawn from official
          MoSPI household consumption data and RBI inflation series.
        </p>
      </div>
    </CalcShell>
  );
}
