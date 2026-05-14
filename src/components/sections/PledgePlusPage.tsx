import { ProductHeroBrand } from "@/components/ui/ProductHeroBrand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FAQ, type FAQItem } from "@/components/ui/FAQ";
import { mergedHeroText, mergedPills } from "@/lib/page-copy-merge";
import { ctaLinks } from "@/lib/navigation";
import type { PageCopyDoc } from "@/sanity/lib/pageCopy";
import styles from "./PledgePlusPage.module.css";

/* ————————————————————————————————————————————————————
   1. Hero
   ———————————————————————————————————————————————————— */
export function PledgeHero({ copy }: { copy?: PageCopyDoc | null }) {
  const pills = mergedPills(copy, [
    "Margin-Enhanced Strategy",
    "Directional F&O",
    "Min. ₹1 Cr",
  ]);
  const h = mergedHeroText(copy, {
    line1: "Generate Additional Returns.",
    emphasis: "Without Additional Capital.",
    sub:
      "A systematic margin-enhanced strategy built on your existing equity portfolio. Deploy idle margin into high-liquidity futures and options without liquidating long-term positions.",
  });
  return (
    <section className={styles.hero}>
      <div className={styles.heroGrid} />
      <div className={styles.heroGlow} />
      <div className={styles.heroContainer}>
        <ProductHeroBrand product="pledgePlus" priority title="Pledge+" />
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
            Discuss Pledge+ Strategy
          </Button>
          <Button href="#how-it-works" variant="ghost">
            See How It Works
          </Button>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.stat}>
            <div className={[styles.statValue, styles.statValueAccent].join(" ")}>
              36–40<span className={styles.statUnit}>%</span>
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
            <div className={styles.statValue}>₹1 Cr</div>
            <div className={styles.statLabel}>Minimum capital</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>~₹33L</div>
            <div className={styles.statLabel}>Illustrative cash buffer</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————————
   2. What Is Pledge+
   ———————————————————————————————————————————————————— */
const params = [
  { key: "Minimum Capital", val: "₹1 Crore" },
  { key: "Cash Margin Required", val: "~₹33 Lakhs (illustrative)" },
  { key: "Targeted Return", val: "36% – 40%", accent: true },
  { key: "Expected Drawdown", val: "15% – 20%" },
  { key: "Strategy Type", val: "Directional Futures & Options" },
  { key: "Structure", val: "Margin via Pledged Equity" },
];

export function PledgeExplainer() {
  return (
    <SectionWrapper>
      <Eyebrow>What Is Pledge+</Eyebrow>
      <h2>Your equity works twice.</h2>

      <div className={styles.explainerGrid}>
        <div>
          <p className={styles.explainerDesc}>
            Pledge+ is a directional futures &amp; options strategy designed to
            generate incremental returns using margin created from an
            already-held equity portfolio.
          </p>
          <p className={styles.explainerDesc}>
            Instead of deploying fresh capital, your equity holdings are pledged
            to create margin, which is then deployed into high-liquidity futures
            and options across commodities and indices.
          </p>
          <span className={styles.explainerHighlight}>
            Enhance portfolio returns without liquidating long-term equity
            positions.
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

/* ————————————————————————————————————————————————————
   3. How It Works
   ———————————————————————————————————————————————————— */
const howSteps = [
  {
    title: "Equity Portfolio Pledge",
    desc: "Your existing equity holdings are pledged to generate margin — no need to sell.",
    assets: null,
  },
  {
    title: "Cash Buffer",
    desc: "A disciplined cash margin buffer (illustrative ~⅓ of capital, e.g. ~₹33L on ₹1 Cr) supports stability and risk absorption.",
    assets: null,
  },
  {
    title: "Active Derivatives Deployment",
    desc: "Margin is deployed into directional futures and options across diversified asset classes.",
    assets: ["Equity Indices", "Commodities", "Volatility Setups"],
  },
  {
    title: "Risk Management Overlay",
    desc: "Strict position sizing, volatility filters, and drawdown controls applied on every deployment.",
    assets: null,
  },
];

export function PledgeHowItWorks() {
  return (
    <SectionWrapper variant="alt" id="how-it-works">
      <Eyebrow>How It Works</Eyebrow>
      <h2>Four steps to enhanced returns.</h2>

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

/* ————————————————————————————————————————————————————
   4. Why Pledge+
   ———————————————————————————————————————————————————— */
const benefits = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Capital Efficiency",
    desc: "Generate incremental returns without selling long-term equity holdings. Your portfolio works double.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Multi-Asset Diversification",
    desc: "Exposure across indices and commodities reduces single-asset dependency and correlation risk.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Tactical Agility",
    desc: "Futures and options allow rapid response to changing market conditions across asset classes.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
      </svg>
    ),
    title: "Disciplined risk framework",
    desc: "Defined drawdown expectations (15–20%) with disciplined exposure controls and position sizing.",
  },
];

export function PledgeBenefits() {
  return (
    <SectionWrapper>
      <Eyebrow>Why Pledge+</Eyebrow>
      <h2>The case for margin-enhanced returns.</h2>

      <div className={styles.benefitsGrid}>
        {benefits.map((b) => (
          <div key={b.title} className={styles.benefitCard}>
            <span className={styles.benefitIcon}>{b.icon}</span>
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

/* ————————————————————————————————————————————————————
   5. Suitable Investor
   ———————————————————————————————————————————————————— */
function CheckIcon() {
  return (
    <svg viewBox="0 0 12 12">
      <path d="M2 6l3 3 5-5" />
    </svg>
  );
}

const profileItems = [
  "Already holds a substantial equity portfolio (₹1 Crore+ allocation)",
  "Comfortable with derivatives and margin-based trading mechanics",
  "Seeks enhanced returns without deploying fresh capital",
  "Accepts moderate volatility and drawdowns of 15–20%",
];

export function PledgeInvestorProfile() {
  return (
    <SectionWrapper variant="alt">
      <Eyebrow>Who Is This For</Eyebrow>
      <h2>Built for the capital-efficient investor.</h2>

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

      <div className={styles.accentCallout}>
        This is not a passive strategy. It is an actively managed,
        risk-calibrated derivatives program.
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   6. Philosophy
   ———————————————————————————————————————————————————— */
export function PledgePhilosophy() {
  return (
    <SectionWrapper>
      <Eyebrow>The Philosophy</Eyebrow>
      <h2>Capital should work twice.</h2>

      <div className={styles.philBlock}>
        <p className={styles.philQuote}>
          &ldquo;If capital is already deployed in long-term equities,
          <br />
          it should <em>work twice.</em>&rdquo;
        </p>
        <p className={styles.philDesc}>
          Pledge+ creates a return-enhancement layer — disciplined,
          diversified, and risk-aware. Your long-term equity thesis stays intact
          while idle margin generates an additional source of alpha.
        </p>
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   7. FAQ
   ———————————————————————————————————————————————————— */
export function PledgeFAQ({ items }: { items: FAQItem[] }) {
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

/* ————————————————————————————————————————————————————
   8. Bottom CTA
   ———————————————————————————————————————————————————— */
export function PledgeCTA() {
  return (
    <SectionWrapper variant="alt">
      <div className={styles.ctaSection}>
        <Eyebrow>Get Started</Eyebrow>
        <h2>Unlock more from your existing portfolio.</h2>
        <p className={styles.ctaLead}>
          Schedule a strategy discussion with the MyNella team to understand
          if Pledge+ fits your portfolio profile and risk appetite.
        </p>
        <div className={styles.ctaBtns}>
          <Button href={ctaLinks.bookPledgePlus} external>
            Schedule a Pledge+ Discussion
          </Button>
          <Button href="mailto:admin@mynella.com" variant="ghost" external>
            Email Us Directly
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
