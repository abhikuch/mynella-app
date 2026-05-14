import { ProductHeroBrand } from "@/components/ui/ProductHeroBrand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FAQ, type FAQItem } from "@/components/ui/FAQ";
import { mergedHeroText, mergedPills } from "@/lib/page-copy-merge";
import { ctaLinks } from "@/lib/navigation";
import type { PageCopyDoc } from "@/sanity/lib/pageCopy";
import styles from "./OptimusPage.module.css";

/* ————————————————————————————————————————————————————
   1. Hero
   ———————————————————————————————————————————————————— */
export function OptimusHero({ copy }: { copy?: PageCopyDoc | null }) {
  const pills = mergedPills(copy, [
    "Algorithmic Strategy",
    "Fully Automated",
    "Min. ₹15L+",
  ]);
  const h = mergedHeroText(copy, {
    line1: "Market-agnostic. Fully automated.",
    emphasis: "Built for volatility.",
    sub:
      "Optimus focuses on capitalizing on rapid market movements whether upward or downward using systematic options buying.",
  });

  return (
    <section className={styles.hero}>
      <div className={styles.heroGrid} />
      <div className={styles.heroGlow} />
      <div className={styles.heroContainer}>
        <ProductHeroBrand product="optimus" priority title="Optimus" />
        <div className={styles.heroPills}>
          {pills.map((label, i) => (
            <span key={`${label}-${i}`} className={styles.pill}>
              <span className={styles.pillDot} />
              {label}
            </span>
          ))}
        </div>

        <h1 className={styles.heroTitle}>
          {h.line1}
          {h.emphasis ? (
            <>
              <br />
              <em>{h.emphasis}</em>
            </>
          ) : null}
        </h1>

        <p className={styles.heroSub}>{h.sub}</p>

        <div className={styles.heroCtaWrap}>
          <Button href={ctaLinks.bookOptimus} external>
            Schedule an Optimus Strategy Call
          </Button>
          <Button href="#strategy-objective" variant="ghost">
            Strategy overview
          </Button>
        </div>

        <div className={styles.heroStats} aria-label="Key live metrics">
          <div className={styles.stat}>
            <div className={[styles.statValue, styles.statValueAccent].join(" ")}>
              90.73<span className={styles.statUnit}>%</span>
            </div>
            <div className={styles.statLabel}>CAGR (live)</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>
              38.64<span className={styles.statUnit}>%</span>
            </div>
            <div className={styles.statLabel}>Win rate</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>
              3.57<span className={styles.statUnit}>×</span>
            </div>
            <div className={styles.statLabel}>Profit factor</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>
              −25.47<span className={styles.statUnit}>%</span>
            </div>
            <div className={styles.statLabel}>Max drawdown (live)</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————————
   2. Strategy Objective
   ———————————————————————————————————————————————————— */
const objectives = [
  {
    title: "Capture volatility expansion",
    desc: "By entering positions when market movement accelerates and pricing inefficiencies emerge.",
  },
  {
    title: "Participate in strong directional moves",
    desc: "Through structured options deployment aligned with confirmed trend signals.",
  },
  {
    title: "Remain market-agnostic",
    desc: "Generating opportunities in both bullish and bearish environments without directional bias.",
  },
  {
    title: "Deliver non-linear return potential",
    desc: "Where limited risk per trade can produce asymmetric payoff outcomes.",
  },
];

export function OptimusObjective() {
  return (
    <SectionWrapper id="strategy-objective">
      <Eyebrow>Strategy objective</Eyebrow>
      <h2 className={styles.sectionH2}>Absolute returns through volatility</h2>
      <p className={styles.sectionLead}>
        Optimus focuses on capitalizing on rapid market movements whether upward or downward using systematic options
        buying.
      </p>

      <div className={styles.objGrid}>
        {objectives.map((o) => (
          <div key={o.title} className={styles.objCard}>
            <div className={styles.objCardInner}>
              <div className={styles.objTitle}>{o.title}</div>
              <p className={styles.objDesc}>{o.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.conclusionCard}>
        <p className={styles.conclusionLine}>
          The strategy does not trade continuously. It activates when predefined data-driven signals align.
        </p>
        <p className={styles.conclusionLineMuted}>This is selective participation, not constant exposure.</p>
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   3. Instruments Used
   ———————————————————————————————————————————————————— */
const enables = [
  {
    title: "Participation in both bullish and bearish markets",
    desc: "By deploying call or put options based on signal direction.",
  },
  {
    title: "Defined downside per trade",
    desc: "The maximum loss is limited to the premium paid for each position.",
  },
  {
    title: "Asymmetric payoff potential",
    desc: "When markets move sharply, gains can significantly exceed the initial capital deployed in that trade.",
  },
];

const caveats = [
  "Monthly returns can fluctuate meaningfully.",
  "The strategy may have a lower win rate compared to traditional investing.",
  "Profitability depends on payoff asymmetry, not trade accuracy alone.",
];

export function OptimusInstruments() {
  return (
    <SectionWrapper variant="alt" id="instruments">
      <Eyebrow>Instruments used</Eyebrow>
      <h2 className={styles.sectionH2}>Structured options buying on index derivatives</h2>
      <p className={styles.instrumentKicker}>Optimus primarily operates through index options, using a pure options-buying framework.</p>
      <p className={styles.sectionLead}>
        In simple terms, options buying allows the strategy to take defined-risk positions when volatility and directional
        momentum align. This enables:
      </p>

      <ul className={styles.enableList}>
        {enables.map((e) => (
          <li key={e.title} className={styles.enableItem}>
            <span className={styles.enableMark} aria-hidden />
            <div className={styles.enableCopy}>
              <span className={styles.enableTitle}>{e.title}</span>
              <span className={styles.enableDesc}>{e.desc}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.realitiesBlock}>
        <p className={styles.realitiesTitle}>However, options buying comes with important realities:</p>
        <ul className={styles.caveatSimpleList}>
          {caveats.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>

      <div className={styles.liveMetrics}>
        <p className={styles.liveMetricsLabel}>Our live performance metrics indicate:</p>
        <div className={styles.liveMetricsGrid}>
          <div className={styles.liveMetric}>
            <span className={styles.liveMetricValue}>38.64%</span>
            <span className={styles.liveMetricKey}>Win rate</span>
          </div>
          <div className={styles.liveMetric}>
            <span className={styles.liveMetricValue}>3.57</span>
            <span className={styles.liveMetricKey}>Profit factor</span>
          </div>
          <div className={styles.liveMetric}>
            <span className={[styles.liveMetricValue, styles.liveMetricNeg].join(" ")}>−11.27%</span>
            <span className={styles.liveMetricKey}>Max drawdown</span>
          </div>
        </div>
        <p className={styles.liveMetricsFoot}>
          This means fewer winning trades — but larger average gains relative to losses.
        </p>
        <p className={styles.instrumentBody}>
          In options strategies, discipline matters more than accuracy. Structure ensures consistency, not constant winning.
        </p>
        <p className={styles.instrumentTagline}>Structure ensures discipline — not accuracy alone.</p>
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   4. Automated Execution Framework
   ———————————————————————————————————————————————————— */
const frameworkSteps = [
  {
    title: "Signal generation through market analysis",
    desc: "Identifying momentum and volatility triggers using predefined quantitative criteria.",
  },
  {
    title: "Volatility-based filtering",
    desc: "Activating trades only when market conditions meet defined expansion thresholds.",
  },
  {
    title: "Stop-loss enforcement",
    desc: "Limiting downside through disciplined exit parameters.",
  },
  {
    title: "Precise timing logic",
    desc: "Optimizing entry and exit points based on real-time signal confirmation.",
  },
  {
    title: "Real-time automated execution",
    desc: "Ensuring orders are executed instantly and consistently without manual intervention.",
  },
];

const systemGoals = ["Maintain consistency", "Avoid emotional bias", "Enforce capital protection rules"];

export function OptimusFramework() {
  return (
    <SectionWrapper id="execution-framework">
      <Eyebrow>Automated execution framework</Eyebrow>
      <h2 className={styles.sectionH2}>Data-driven. Fully systematic.</h2>
      <p className={styles.frameworkIntro}>
        Optimus operates on a structured quantitative engine designed to identify, validate, and execute high-probability
        volatility setups without emotional interference.
      </p>
      <p className={styles.frameworkSub}>The framework includes:</p>

      <ol className={styles.frameworkList}>
        {frameworkSteps.map((s, i) => (
          <li key={s.title} className={styles.frameworkItem}>
            <span className={styles.frameworkIndex}>{String(i + 1).padStart(2, "0")}</span>
            <div className={styles.frameworkBody}>
              <h3 className={styles.frameworkItemTitle}>{s.title}</h3>
              <p className={styles.frameworkItemDesc}>{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className={styles.noDiscretionary}>
        <p className={styles.noDiscretionaryLead}>There are no discretionary overrides. The system is designed to:</p>
        <div className={styles.systemGoalGrid}>
          {systemGoals.map((g) => (
            <div key={g} className={styles.systemGoal}>
              {g}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   5. Fee Structure
   ———————————————————————————————————————————————————— */
export function OptimusFees() {
  return (
    <SectionWrapper variant="alt" id="fees">
      <div className={styles.feeHeader}>
        <Eyebrow>Fee structure</Eyebrow>
        <h2 className={styles.sectionH2}>Active management. Performance-aligned.</h2>
      </div>

      <div className={styles.feeGrid}>
        <div className={styles.feeCard}>
          <div className={styles.feePeriod}>Management fee</div>
          <div className={styles.feePercent}>Up to 1.5%</div>
          <div className={styles.feeLabel}>of AUM</div>
        </div>
        <div className={[styles.feeCard, styles.feeCardHighlight].join(" ")}>
          <div className={styles.feePeriod}>Performance fee</div>
          <div className={[styles.feePercent, styles.feePercentAccent].join(" ")}>25%</div>
          <div className={styles.feeLabel}>above 10% hurdle rate</div>
        </div>
      </div>

      <p className={styles.feeCosts}>Additional operational and regulatory costs applicable.</p>

      <div className={styles.accentCallout}>Our fee structure aligns active strategy management with performance delivery.</div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   6. Suitable Investor
   ———————————————————————————————————————————————————— */
function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden>
      <path d="M2 6l3 3 5-5" />
    </svg>
  );
}

const profileItems = [
  "Allocate ₹15L+ to high-volatility strategies",
  "Understand options and leverage mechanics",
  "Accept sharp monthly fluctuations",
  "Can tolerate drawdowns",
  "Seek absolute-return exposure beyond long-only equity",
];

export function OptimusInvestorProfile() {
  return (
    <SectionWrapper id="suitable-investor">
      <Eyebrow>Suitable investor</Eyebrow>
      <h2 className={styles.sectionH2}>Optimus is appropriate for investors who:</h2>

      <ul className={styles.profileList}>
        {profileItems.map((item) => (
          <li key={item} className={styles.profileRow}>
            <span className={styles.profileIcon}>
              <CheckIcon />
            </span>
            <span className={styles.profileText}>{item}</span>
          </li>
        ))}
      </ul>

      <p className={styles.suitabilityNote}>Suitability assessment is mandatory prior to activation.</p>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   7. FAQ
   ———————————————————————————————————————————————————— */
export function OptimusFAQ({ items }: { items: FAQItem[] }) {
  return (
    <SectionWrapper variant="alt" className={styles.faqSection}>
      <Eyebrow>Frequently asked questions</Eyebrow>
      <h2 className={styles.sectionH2}>Common questions, answered.</h2>
      <div className={styles.faqMount}>
        <FAQ items={items} />
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   8. Bottom CTA
   ———————————————————————————————————————————————————— */
export function OptimusCTA() {
  return (
    <SectionWrapper>
      <div className={styles.ctaBand}>
        <p className={styles.ctaEyebrow}>Get started</p>
        <h2 className={styles.ctaTitle}>Ready to participate in structured, market-agnostic volatility?</h2>
        <div className={styles.ctaBtns}>
          <Button href={ctaLinks.bookOptimus} external>
            Schedule an Optimus Strategy Call
          </Button>
          <Button href="mailto:admin@mynella.com" variant="ghost" external>
            Email us directly
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
