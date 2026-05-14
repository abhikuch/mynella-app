import { ProductHeroBrand } from "@/components/ui/ProductHeroBrand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FAQ, type FAQItem } from "@/components/ui/FAQ";
import { mergedHeroText, mergedPills } from "@/lib/page-copy-merge";
import { ctaLinks } from "@/lib/navigation";
import type { PageCopyDoc } from "@/sanity/lib/pageCopy";
import styles from "./PledgePlusPage.module.css";

export function PledgeMiniHero({ copy }: { copy?: PageCopyDoc | null }) {
  const pills = mergedPills(copy, [
    "Margin-Enhanced Strategy",
    "Commodities F&O",
    "Min. ₹50L",
  ]);
  const h = mergedHeroText(copy, {
    line1: "Pledge+ Framework.",
    emphasis: "Smaller Capital Entry.",
    sub:
      "Pledge+ Mini applies the same systematic margin-enhanced approach as Pledge+, designed for investors entering at ₹50L. Margin is generated from pledged equity and deployed only in high-liquidity commodity derivatives.",
  });
  return (
    <section className={styles.hero}>
      <div className={styles.heroGrid} />
      <div className={styles.heroGlow} />
      <div className={styles.heroContainer}>
        <ProductHeroBrand product="pledgePlus" priority title="Pledge+ Mini" />
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
          <Button href={ctaLinks.bookPledgePlus} external>
            Discuss Pledge+ Mini
          </Button>
          <Button href="#how-it-works" variant="ghost">
            See How It Works
          </Button>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <div className={[styles.statValue, styles.statValueAccent].join(" ")}>
              32–36<span className={styles.statUnit}>%</span>
            </div>
            <div className={styles.statLabel}>Targeted return</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>
              15–20<span className={styles.statUnit}>%</span>
            </div>
            <div className={styles.statLabel}>Expected drawdown</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>₹50L</div>
            <div className={styles.statLabel}>Minimum capital</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>~₹17L</div>
            <div className={styles.statLabel}>Illustrative cash buffer</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const params = [
  { key: "Minimum Capital", val: "₹50 Lakhs" },
  { key: "Cash Margin Required", val: "~₹17 Lakhs (illustrative)" },
  { key: "Targeted Return", val: "32% – 36%", accent: true },
  { key: "Expected Drawdown", val: "15% – 20%" },
  { key: "Strategy Type", val: "Directional Commodity Futures & Options" },
  { key: "Structure", val: "Margin via Pledged Equity" },
];

export function PledgeMiniExplainer() {
  return (
    <SectionWrapper>
      <Eyebrow>What Is Pledge+ Mini</Eyebrow>
      <h2>The same framework. Built for a smaller ticket.</h2>

      <div className={styles.explainerGrid}>
        <div>
          <p className={styles.explainerDesc}>
            Pledge+ Mini is the lower-ticket variant of Pledge+, built on the
            same directional derivatives framework and risk discipline.
          </p>
          <p className={styles.explainerDesc}>
            Your existing equity is pledged to create margin, then deployed into
            high-liquidity commodity futures and options. The strategy stays
            focused on commodities to keep execution tight and mandate-specific.
          </p>
          <span className={styles.explainerHighlight}>
            Capital-efficient return enhancement without liquidating your
            long-term equity holdings.
          </span>
        </div>

        <div className={styles.paramTable}>
          {params.map((p) => (
            <div key={p.key} className={styles.paramRow}>
              <span className={styles.paramKey}>{p.key}</span>
              <span
                className={[styles.paramVal, p.accent && styles.paramValAccent]
                  .filter(Boolean)
                  .join(" ")}
              >
                {p.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

const howSteps = [
  {
    title: "Equity Portfolio Pledge",
    desc: "Your existing equity holdings are pledged to generate derivative margin without selling core investments.",
    assets: null,
  },
  {
    title: "Cash Buffer Setup",
    desc: "A disciplined cash buffer (illustrative ~₹17L on ₹50L) supports mark-to-market stability and margin resilience.",
    assets: null,
  },
  {
    title: "Commodity Derivatives Deployment",
    desc: "Margin is deployed only in high-liquidity commodity futures and options under strict trade filters.",
    assets: ["Gold", "Crude", "Natural Gas"],
  },
  {
    title: "Risk Management Overlay",
    desc: "Position sizing, volatility filters, and drawdown control logic are applied on every trade cycle.",
    assets: null,
  },
];

export function PledgeMiniHowItWorks() {
  return (
    <SectionWrapper variant="alt" id="how-it-works">
      <Eyebrow>How It Works</Eyebrow>
      <h2>Four steps to disciplined leverage.</h2>

      <div className={styles.stepsGrid}>
        {howSteps.map((s, i) => (
          <div key={i} className={styles.stepCard}>
            <span className={styles.stepNum}>{i + 1}</span>
            <div className={styles.stepTitle}>{s.title}</div>
            <p className={styles.stepDesc}>{s.desc}</p>
            {s.assets && (
              <div className={styles.stepAssets}>
                {s.assets.map((a) => (
                  <span key={a} className={styles.assetTag}>
                    <span className={styles.assetDot} />
                    {a}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

const benefits = [
  {
    title: "Capital Efficiency",
    desc: "Use pledged equity to create margin and seek incremental returns without liquidating long-term holdings.",
  },
  {
    title: "Commodity Focus",
    desc: "A focused commodities mandate improves strategy clarity and execution consistency.",
  },
  {
    title: "Pledge+ Process DNA",
    desc: "Same directional framework, same risk discipline, adapted for a lower entry capital requirement.",
  },
  {
    title: "Disciplined Risk Guardrails",
    desc: "Defined drawdown expectations with active exposure controls and strict position sizing.",
  },
];

export function PledgeMiniBenefits() {
  return (
    <SectionWrapper>
      <Eyebrow>Why Pledge+ Mini</Eyebrow>
      <h2>Structured leverage with a lower capital threshold.</h2>

      <div className={styles.benefitsGrid}>
        {benefits.map((b) => (
          <div key={b.title} className={styles.benefitCard}>
            <div>
              <div className={styles.benefitTitle}>{b.title}</div>
              <p className={styles.benefitDesc}>{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

const profileItems = [
  "Holds a meaningful equity portfolio and wants to enhance return efficiency",
  "Seeks a structured commodity derivatives mandate using pledged capital",
  "Understands derivatives mechanics and margin-linked volatility",
  "Can tolerate moderate-to-high volatility and 15–20% drawdown ranges",
];

export function PledgeMiniInvestorProfile() {
  return (
    <SectionWrapper variant="alt">
      <Eyebrow>Who Is This For</Eyebrow>
      <h2>Built for informed, risk-aware capital.</h2>

      <div className={styles.profileGrid}>
        {profileItems.map((item, i) => (
          <div key={i} className={styles.profileCard}>
            <p className={styles.profileText}>{item}</p>
          </div>
        ))}
      </div>

      <div className={styles.accentCallout}>
        Pledge+ Mini is an active derivatives strategy, not a passive portfolio
        allocation.
      </div>
    </SectionWrapper>
  );
}

export function PledgeMiniFAQ({ items }: { items: FAQItem[] }) {
  return (
    <SectionWrapper variant="alt">
      <Eyebrow>Frequently Asked Questions</Eyebrow>
      <h2>Common questions, answered.</h2>
      <div style={{ marginTop: 36 }}>
        <FAQ items={items} />
      </div>
    </SectionWrapper>
  );
}

export function PledgeMiniCTA() {
  return (
    <SectionWrapper variant="alt">
      <div className={styles.ctaSection}>
        <Eyebrow>Get Started</Eyebrow>
        <h2>Explore Pledge+ Mini for your portfolio.</h2>
        <p className={styles.ctaLead}>
          Book a strategy discussion to evaluate whether the Pledge+ Mini
          mandate fits your capital profile and risk appetite.
        </p>
        <div className={styles.ctaBtns}>
          <Button href={ctaLinks.bookPledgePlus} external>
            Schedule a Pledge+ Mini Discussion
          </Button>
          <Button href="mailto:admin@mynella.com" variant="ghost" external>
            Email Us Directly
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
