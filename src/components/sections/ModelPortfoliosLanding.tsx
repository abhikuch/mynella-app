import Link from "next/link";
import { MyNellaMarkImage } from "@/components/ui/MyNellaMarkImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FAQ, type FAQItem } from "@/components/ui/FAQ";
import { mergedHeroText, mergedPills } from "@/lib/page-copy-merge";
import type { PageCopyDoc } from "@/sanity/lib/pageCopy";
import styles from "./ModelPortfoliosLanding.module.css";

const SERIES_COPY = {
  alpha: {
    eyebrow: "Model Portfolios · Alpha",
    title: "Momentum-driven concentration across Nifty universes",
    lead: "Alpha Series portfolios hold up to ten high-conviction names drawn from Nifty 100, 200, or 500 — rebalanced on a fixed monthly cadence to capture momentum without diluting the mandate.",
    paras: [
      "Each sleeve uses the same quantitative stack: screen for relative strength, validate with quality and risk factors, then size positions for conviction rather than breadth.",
      "Pick the universe that matches your liquidity and diversification preference; the process underneath stays consistent across Alpha 100, 200, and 500.",
    ],
  },
  quanto: {
    eyebrow: "Model Portfolios · Quanto",
    title: "Cap-segment quant equity, one disciplined process",
    lead: "Quanto maps MyNella’s factor and momentum engine to Large, Mid, Small, Multi, Flexi, and Microcap sleeves — so you can align market-cap exposure with your risk budget.",
    paras: [
      "Every portfolio is rules-based: a published rebalance rhythm, pre-defined risk budgets, and no discretionary picks between rebalances.",
      "Choose the segment that fits your mandate; the engine and governance stay the same.",
    ],
  },
} as const;

/** Series landing (/model-portfolios/alpha, /quanto): narrative + link back to hub. */
export function MPSeriesIntro({ series }: { series: "alpha" | "quanto" }) {
  const c = SERIES_COPY[series];
  return (
    <SectionWrapper>
      <nav className={styles.seriesNav} aria-label="Breadcrumb">
        <Link href="/model-portfolios" className={styles.seriesBack}>
          ← All model portfolios
        </Link>
      </nav>
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <h2>{c.title}</h2>
      <p className={styles.seriesLead}>{c.lead}</p>
      {c.paras.map((p, i) => (
        <p key={i} className={styles.seriesPara}>
          {p}
        </p>
      ))}
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   Hero
   ———————————————————————————————————————————————————— */
export function MPHero({ copy }: { copy?: PageCopyDoc | null }) {
  const pills = mergedPills(copy, [
    "Moderate to High Risk",
    "Model Portfolio Based",
  ]);
  const h = mergedHeroText(copy, {
    line1: "Invest in quant-driven",
    emphasis: "model portfolios.",
    sub:
      "Concentrated, data-driven stock portfolios across market-cap segments — built on momentum, quality, and quantitative discipline.",
  });
  return (
    <section className={styles.hero}>
      <div className={styles.heroGrid} />
      <div className={styles.heroGlow} />
      <div className={styles.heroContainer}>
        <MyNellaMarkImage className={styles.mpHeroMark} sizes="240px" priority decorative />
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
          <Button href="#portfolios">Browse Portfolios</Button>
          <Button href="/contact" variant="ghost">
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————————
   What is a Model Portfolio? (Explainer)
   ———————————————————————————————————————————————————— */
const benefits = [
  { icon: "📊", title: "Own Real Stocks", desc: "Stocks sit in your demat — full ownership, full transparency." },
  { icon: "🔔", title: "Rebalance Alerts", desc: "Receive timely notifications when the portfolio rebalances." },
  { icon: "🔍", title: "Full Transparency", desc: "See every holding, allocation, and rationale before investing." },
  { icon: "⚡", title: "One-Click Execution", desc: "Execute recommended trades with a single click on supported platforms." },
];

export function MPExplainer() {
  return (
    <SectionWrapper>
      <div className={styles.explainerGrid}>
        <div className={styles.explainerLeft}>
          <Eyebrow>What Is a Model Portfolio?</Eyebrow>
          <h2>A ready-made basket of stocks, managed by experts.</h2>
          <p className={styles.explainerDesc}>
            A model portfolio is a curated collection of stocks selected using a
            systematic, rules-based approach. You subscribe, execute the
            recommended trades in your own demat account, and follow rebalance
            updates — keeping you in full control of your capital. When you stress-test
            equity drawdowns, pair this hub with MyNella&apos;s{" "}
            <Link href="/calculators/drawdown-recovery">stock loss and drawdown recovery calculator</Link> and the{" "}
            <Link href="/wealth-management-pune">Pune wealth management explainer</Link> for regulated-category context
            (educational only).
          </p>
          <span className={styles.explainerClosing}>
            No fund manager lock-in. Your stocks, your account.
          </span>
        </div>

        <div className={styles.benefitsGrid}>
          {benefits.map((b) => (
            <div key={b.title} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>{b.icon}</div>
              <div className={styles.benefitTitle}>{b.title}</div>
              <div className={styles.benefitDesc}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   Portfolio Construction Philosophy
   ———————————————————————————————————————————————————— */
const pillars = [
  {
    num: "1",
    title: "Quantitative Selection",
    desc: "Our quant engine screens 4 000+ stocks on momentum, earnings quality, and relative strength to shortlist the highest-conviction ideas.",
  },
  {
    num: "2",
    title: "Factor Validation",
    desc: "Every pick is cross-validated against back-tested factor models — value, quality, and growth — to filter out noise and survivorship bias.",
  },
  {
    num: "3",
    title: "Systematic Rebalancing",
    desc: "Portfolios are rebalanced on a fixed cadence. Rules trigger exits and entries — removing emotion from the process entirely.",
  },
];

export function MPPhilosophy() {
  return (
    <SectionWrapper variant="alt">
      <Eyebrow>Construction Philosophy</Eyebrow>
      <h2>Built on discipline, not discretion.</h2>

      <div className={styles.philGrid}>
        {pillars.map((p) => (
          <div key={p.num} className={styles.philCard}>
            <span className={styles.philNum}>{p.num}</span>
            <div className={styles.philTitle}>{p.title}</div>
            <p className={styles.philDesc}>{p.desc}</p>
          </div>
        ))}
      </div>

      <p className={styles.philClosing}>
        No discretionary overrides.{" "}
        <span className={styles.philClosingEm}>
          Discipline drives consistency.
        </span>
      </p>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   Why Choose MyNella
   ———————————————————————————————————————————————————— */
const reasons = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
      </svg>
    ),
    title: "SEBI-Registered",
    desc: "Research analyst (INH000013546) — regulated, compliant, and transparent at every step.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 5-9" />
      </svg>
    ),
    title: "Quant-First Approach",
    desc: "Multi-factor models tested across 10+ years of market data drive every decision.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83" />
      </svg>
    ),
    title: "High-Conviction Picks",
    desc: "Concentrated portfolios — no over-diversification. Every holding earns its place.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8m-4-4v4" />
      </svg>
    ),
    title: "Platform-Agnostic",
    desc: "Works with smallcase, Dhan, and other brokers — execute on the platform you trust.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Transparent Pricing",
    desc: "No hidden charges. Flat subscription with full visibility into every recommendation.",
  },
];

export function MPWhyMyNella() {
  return (
    <SectionWrapper variant="alt">
      <Eyebrow>Why MyNella</Eyebrow>
      <h2>What sets us apart.</h2>

      <div className={styles.whyGrid}>
        {reasons.map((r) => (
          <div key={r.title} className={styles.whyCard}>
            <span className={styles.whyIcon}>{r.icon}</span>
            <div>
              <div className={styles.whyTitle}>{r.title}</div>
              <p className={styles.whyDesc}>{r.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.whyClosing}>
        Performance is earned. Trust is built through transparency.
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   FAQ Section
   ———————————————————————————————————————————————————— */

export function MPFAQSection({
  faqModule,
  items,
}: {
  faqModule?: { eyebrow?: string | null; title?: string | null } | null;
  items: FAQItem[];
}) {
  const eyebrow = faqModule?.eyebrow?.trim() || "Frequently Asked Questions";
  const title = faqModule?.title?.trim() || "Common questions, answered.";
  return (
    <SectionWrapper>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      <div style={{ marginTop: 36 }}>
        <FAQ items={items} />
      </div>
    </SectionWrapper>
  );
}

/* ————————————————————————————————————————————————————
   Bottom CTA
   ———————————————————————————————————————————————————— */
export function MPCTA({
  primaryHref = "#portfolios",
  primaryLabel = "Browse portfolios",
}: {
  primaryHref?: string;
  primaryLabel?: string;
} = {}) {
  return (
    <SectionWrapper variant="alt">
      <div className={styles.ctaSection}>
        <Eyebrow>Get Started</Eyebrow>
        <h2>Find the right portfolio for you.</h2>
        <p className={styles.ctaLead}>
          Explore our quant-driven model portfolios and start building a
          data-driven equity allocation today.
        </p>
        <Button href={primaryHref}>{primaryLabel}</Button>
      </div>
    </SectionWrapper>
  );
}
