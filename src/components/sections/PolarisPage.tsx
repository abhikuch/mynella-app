import { ProductHeroBrand } from "@/components/ui/ProductHeroBrand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FAQ, type FAQItem } from "@/components/ui/FAQ";
import { mergedHeroText, mergedPills } from "@/lib/page-copy-merge";
import { ctaLinks } from "@/lib/navigation";
import type { PageCopyDoc } from "@/sanity/lib/pageCopy";
import { PolarisCycleTable } from "./PolarisCycleTable";
import styles from "./PolarisPage.module.css";

export type PolarisPageProduct = "pms" | "lite";

/* ————————————————————————————————————————————————————
   1. Hero
   ———————————————————————————————————————————————————— */
export function PolarisHero({
  copy,
  product = "pms",
}: {
  copy?: PageCopyDoc | null;
  product?: PolarisPageProduct;
}) {
  const defaultPills: [string, string, string] =
    product === "lite"
      ? ["Research Analyst", "SEBI Registered", "Min. ₹10 Lakhs"]
      : ["Portfolio Management Service", "SEBI Registered", "Min. ₹50 Lakhs"];
  const pills = mergedPills(copy, defaultPills);
  const defaultSub =
    product === "lite"
      ? "Systematic investments in equity markets with adaptive and objective methods of stock selection and allocation — starting at ₹10 Lakhs."
      : "Systematic investments in equity markets with adaptive and objective methods of stock selection and allocation.";
  const h = mergedHeroText(copy, {
    line1: "A wealth creation journey",
    emphasis: "from 1x to 110x.",
    sub: defaultSub,
  });
  const brandProduct = product === "lite" ? "polarisLite" : "polaris";
  const regLabel = product === "lite" ? "REG-NUMBER-RA" : "REG-NUMBER-PMS";

  return (
    <section className={styles.hero}>
      <div className={styles.heroGrid} />
      <div className={styles.heroGlow} />
      <div className={styles.heroContainer}>
        <ProductHeroBrand
          product={brandProduct}
          priority
          title={product === "lite" ? "Polaris Lite" : "Polaris"}
        />
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
          <Button href={ctaLinks.bookPolaris} external>
            Book a Call
          </Button>
          <Button href="#fees" variant="ghost">
            See Fee Structure
          </Button>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>
              25<span className={styles.statUnit}>+ yrs</span>
            </div>
            <div className={styles.statLabel}>Market experience</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>₹0</div>
            <div className={styles.statLabel}>Fixed management fee</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>Profit</div>
            <div className={styles.statLabel}>Performance-only fee</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>SEBI</div>
            <div className={styles.statLabel}>{regLabel}</div>
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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83" />
      </svg>
    ),
    title: "Concentrated exposure to high-momentum equities",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 5-9" />
      </svg>
    ),
    title: "Market-aware allocation shifts",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8m-4-4v4" />
      </svg>
    ),
    title: "Systematic execution discipline",
  },
];

export function PolarisObjective({ variant = "default" }: { variant?: "default" | "alt" }) {
  return (
    <SectionWrapper variant={variant}>
      <Eyebrow>Strategy Objective</Eyebrow>
      <h2>Polaris aims to generate consistent alpha through:</h2>

      <div className={styles.objGrid}>
        {objectives.map((o) => (
          <div key={o.title} className={styles.objCard}>
            <div className={styles.objIcon}>{o.icon}</div>
            <div className={styles.objTitle}>{o.title}</div>
          </div>
        ))}
      </div>

      <div className={styles.accentCallout}>
        It is designed for investors seeking strategy-driven, non-emotional equity investing aligned to a 3+ year horizon.
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   3. Portfolio Construction
   ———————————————————————————————————————————————————— */
const steps = [
  {
    title: "Regime Identification",
    desc: "Determining where the market stands in its cycle before a single position is taken.",
  },
  {
    title: "Thematic Screening",
    desc: "Isolating sectors and themes with structural tailwinds aligned to the prevailing regime.",
  },
  {
    title: "Quantitative Filtering",
    desc: "Running candidates through a multi-factor model to rank quality, momentum, and risk.",
  },
  {
    title: "Trend Confirmation",
    desc: "Validating that price behaviour supports the thesis before committing capital.",
  },
  {
    title: "Position Sizing & Allocation",
    desc: "Deploying capital with conviction while keeping risk concentration in check.",
  },
];

export function PolarisConstruction({ variant = "alt" }: { variant?: "default" | "alt" }) {
  return (
    <SectionWrapper variant={variant}>
      <Eyebrow>Portfolio Construction Logic</Eyebrow>
      <h2>Polaris follows a structured framework.</h2>

      <div className={styles.timeline}>
        {steps.map((s, i) => (
          <div key={i} className={styles.timelineStep}>
            <span className={styles.stepNum}>{i + 1}</span>
            <div className={styles.stepContent}>
              <div className={styles.stepTitle}>{s.title}</div>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   4. Human + Machine
   ———————————————————————————————————————————————————— */
const humanItems = [
  {
    title: "Structural cycle interpretation",
    desc: "We read where markets are in the long and short-term debt cycle to position ahead of regime shifts.",
  },
  {
    title: "Event risk assessment",
    desc: "Discretionary overlays account for geopolitical, macro, and policy-driven tail risks before they hit portfolios.",
  },
  {
    title: "Thematic bias selection",
    desc: "Human judgment identifies high-conviction secular themes aligned with the current market regime.",
  },
];

const machineItems = [
  {
    title: "Multi-factor signal generation",
    desc: "Proprietary algorithms score stocks across momentum, quality, and value factors simultaneously.",
  },
  {
    title: "Backtesting across cycles",
    desc: "Every signal is stress-tested against historical bull, bear, and sideways market environments.",
  },
  {
    title: "Real-time execution",
    desc: "Algorithmic order routing ensures speed, precision, and zero emotional interference at entry and exit.",
  },
  {
    title: "Continuous model optimization",
    desc: "The system self-refines as new data arrives, keeping the edge sharp across changing conditions.",
  },
];

export function PolarisHumanMachine({ variant = "default" }: { variant?: "default" | "alt" }) {
  return (
    <SectionWrapper variant={variant}>
      <Eyebrow>Market + Quant Integration</Eyebrow>
      <h2>Judgment at the top. Discipline in execution.</h2>

      <div className={styles.dualGrid}>
        <div className={styles.dualColumn}>
          <div className={styles.dualLabel}>
            <span className={styles.dualLabelDot} />
            Our Human Layer
          </div>
          {humanItems.map((item) => (
            <div key={item.title} className={styles.dualItem}>
              <div className={styles.dualItemTitle}>{item.title}</div>
              <p className={styles.dualItemDesc}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.dualColumn}>
          <div className={styles.dualLabel}>
            <span className={styles.dualLabelDot} />
            Our Machine Layer
          </div>
          {machineItems.map((item) => (
            <div key={item.title} className={styles.dualItem}>
              <div className={styles.dualItemTitle}>{item.title}</div>
              <p className={styles.dualItemDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.integrationConclusion}>
        <p className={styles.integrationConclusionLabel}>Conclusion</p>
        <p className={styles.integrationConclusionText}>
          The integration enhances adaptability and consistency. When human foresight guides the strategy and machines handle execution, the result is a portfolio that thinks clearly and acts decisively — in every market environment.
        </p>
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   5. Fee Structure
   ———————————————————————————————————————————————————— */
export function PolarisFees({ variant = "default" }: { variant?: "default" | "alt" }) {
  return (
    <SectionWrapper variant={variant} id="fees">
      <div className={styles.feeHeader}>
        <Eyebrow>Fee Structure</Eyebrow>
        <h2>Performance-Aligned. Investor-First.</h2>
        <p className={styles.feeSub}>Polaris is structured on a capital-doubling performance model.</p>
        <ul className={styles.feePrinciples}>
          <li>No fixed management fee</li>
          <li>No performance fee until initial capital is doubled</li>
        </ul>
      </div>

      <div className={styles.feeGrid}>
        <div className={[styles.feeCard, styles.feeCardHighlight].join(" ")}>
          <div className={[styles.feePercent, styles.feePercentAccent].join(" ")}>20%</div>
          <div className={styles.feeLabel}>of PAT</div>
          <div className={styles.feePeriod}>Doubling within 3 years</div>
        </div>
        <div className={styles.feeCard}>
          <div className={styles.feePercent}>15%</div>
          <div className={styles.feeLabel}>of PAT</div>
          <div className={styles.feePeriod}>Doubling between 3–4 years</div>
        </div>
        <div className={styles.feeCard}>
          <div className={[styles.feePercent, styles.feePercentAccent].join(" ")}>0%</div>
          <div className={styles.feeLabel}>of PAT (no performance fee)</div>
          <div className={styles.feePeriod}>Doubling after 4+ years</div>
        </div>
      </div>

      <p className={styles.feeNote}>
        For staggered additions, performance is calculated using a 26% XIRR hurdle (3-year equivalent).
      </p>

      <div className={styles.accentCallout}>
        Incentive alignment is not a feature. It is the foundation.
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   5b. Compounding Journey Calculator
   ———————————————————————————————————————————————————— */
export function PolarisCompoundingJourney({
  variant,
  defaultStartingCapital = 5_000_000,
  minStartingCapital = 500_000,
}: {
  variant: "default" | "alt";
  defaultStartingCapital?: number;
  minStartingCapital?: number;
}) {
  return (
    <SectionWrapper variant={variant} id="compounding">
      <Eyebrow>1x to 110x</Eyebrow>
      <h2>Your compounding journey, cycle by cycle.</h2>
      <p className={styles.feeSub}>
        Model below uses MyNella&apos;s published fee and withdrawal assumptions. Adjust starting capital and number of doublings to explore your own scenario.
      </p>
      <PolarisCycleTable defaultCapital={defaultStartingCapital} minCapital={minStartingCapital} />
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   6. Ideal Investor Profile
   ———————————————————————————————————————————————————— */
function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12">
      <path d="M2 6l3 3 5-5" />
    </svg>
  );
}

const profileItemsPms = [
  "Can allocate ₹50L+",
  "Seek structured, strategy-driven equity exposure",
  "Prefer systematic execution over discretionary stock picking",
  "Accept moderate-to-high volatility",
  "Commit to a 3+ year horizon",
];

const profileItemsLite = [
  "Can allocate ₹10L+",
  "Seek structured, strategy-driven equity exposure",
  "Prefer systematic execution over discretionary stock picking",
  "Accept moderate-to-high volatility",
  "Commit to a 3+ year horizon",
];

export function PolarisInvestorProfile({
  variant = "alt",
  product = "pms",
}: {
  variant?: "default" | "alt";
  product?: PolarisPageProduct;
}) {
  const profileItems = product === "lite" ? profileItemsLite : profileItemsPms;

  return (
    <SectionWrapper variant={variant}>
      <Eyebrow>Ideal Investor Profile</Eyebrow>
      <h2>Polaris is suitable for investors who:</h2>

      <div className={styles.profileGrid}>
        {profileItems.map((item, i) => (
          <div key={i} className={styles.profileCard}>
            <span className={styles.profileIcon}>
              <CheckIcon />
            </span>
            <p className={styles.profileText}>{item}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   7. Track Record (Placeholder)
   ———————————————————————————————————————————————————— */
export function PolarisTrackRecord() {
  return (
    <SectionWrapper variant="default">
      <Eyebrow>Performance</Eyebrow>
      <h2>Track record.</h2>

      <div className={styles.trackPlaceholder}>
        <p>
          Audited performance data will be published once the strategy completes
          its first full reporting cycle. Until then, back-tested model results
          and live portfolio metrics are available upon request during a
          discovery call.
        </p>
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   8. Onboarding
   ———————————————————————————————————————————————————— */
const onboardSteps = [
  {
    title: "Book a Discovery Call",
    desc: "Understand how Polaris aligns with your financial goals, risk appetite, and investment horizon.",
  },
  {
    title: "KYC + PMS Agreement",
    desc: "Complete your Know-Your-Customer documentation and sign the PMS agreement digitally.",
  },
  {
    title: "Fund Your Account",
    desc: "Transfer capital to your designated PMS account. Your funds remain in your name at all times.",
  },
  {
    title: "Portfolio Goes Live",
    desc: "Polaris begins deploying capital according to the current market regime and model signals.",
  },
];

export function PolarisOnboarding() {
  return (
    <SectionWrapper variant="alt">
      <Eyebrow>Getting Started</Eyebrow>
      <h2>Four steps to your portfolio.</h2>

      <div className={styles.onboardGrid}>
        {onboardSteps.map((s, i) => (
          <div key={i} className={styles.onboardCard}>
            <span className={styles.onboardNum}>{i + 1}</span>
            <div className={styles.onboardTitle}>{s.title}</div>
            <p className={styles.onboardDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   9. FAQ
   ———————————————————————————————————————————————————— */
export function PolarisFAQ({ items }: { items: FAQItem[] }) {
  return (
    <SectionWrapper variant="default">
      <Eyebrow>Frequently Asked Questions</Eyebrow>
      <h2>Common questions, answered.</h2>
      <div style={{ marginTop: 36 }}>
        <FAQ items={items} />
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   10. Bottom CTA
   ———————————————————————————————————————————————————— */
export function PolarisCTA({ product = "pms" }: { product?: PolarisPageProduct }) {
  const title = product === "lite" ? "Start your Polaris Lite journey." : "Start your Polaris journey.";
  const lead =
    product === "lite"
      ? "Polaris Lite is open to investors with a 3+ year horizon and moderate-to-high risk appetite. Book a call to understand if it fits your financial goals."
      : "POLARIS is open to investors with a 3+ year horizon and moderate-to-high risk appetite. Book a call to understand if Polaris fits your financial goals.";

  return (
    <SectionWrapper variant="alt">
      <div className={styles.ctaSection}>
        <Eyebrow>Start Your Journey</Eyebrow>
        <h2>{title}</h2>
        <p className={styles.ctaLead}>{lead}</p>
        <div className={styles.ctaBtns}>
          <Button href={ctaLinks.bookPolaris} external>
            Book a Call
          </Button>
          <Button href="mailto:admin@mynella.com" variant="ghost" external>
            Email Us Directly
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
