import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { mergedEyebrow, mergedHeroText, pageMetadataForRoute } from "@/lib/page-copy-merge";
import { SITE_URL } from "@/lib/seo-config";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import styles from "./calculators.module.css";

const WHY_PILLARS = [
  {
    title: "Compounding, time, and fees",
    desc: "See how small changes in return, costs, or starting age move the finish line — before you commit capital.",
  },
  {
    title: "Behaviour beats timing",
    desc: "Tools for panic selling, luxury spending, and late starts — where investor psychology meets arithmetic.",
  },
  {
    title: "Illustrative, not advice",
    desc: "Every output is a scenario. No log-in — tune inputs, export intuition, then talk to a professional.",
  },
] as const;

const CALC_KEYWORDS = [
  "investment calculator India",
  "CAGR calculator",
  "compounding calculator India",
  "drawdown recovery calculator",
  "stock loss recovery calculator",
  "drawdown and recovery",
  "SIP calculator",
  "retirement calculator India",
  "retirement corpus calculator",
  "fee impact calculator",
  "portfolio calculator India",
  "wealth calculator",
  "MyNella calculators",
];

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute(
    "calculators",
    {
      title: "Free Investment Calculators for Indian Investors",
      description:
        "13 free investment calculators: CAGR, retirement (real number), time to 100% return, Polaris compounding, drawdown recovery, panic selling, luxury trap, fee drag, martingale risk, and more. Built for Indian investors.",
    },
    "/calculators",
    { keywords: CALC_KEYWORDS },
  );
}

const calculators = [
  {
    href: "/calculators/cagr",
    emoji: "📐",
    title: "CAGR Calculator",
    desc: "Put in start, end, and duration. Get your actual compound annual return — no guessing.",
    tag: "Math tool",
    accent: false,
  },
  {
    href: "/calculators/time-to-double",
    emoji: "⏱️",
    title: "Time to 100% Return",
    desc: "Slide the rate, watch the clock: how many years to double your money and earn a full 100% gain? Rule of 72 included.",
    tag: "Doubling time",
    accent: true,
  },
  {
    href: "/calculators/growth-visualiser",
    emoji: "🚀",
    title: "10 · 20 · 30 Visualiser",
    desc: "Same capital. Three speeds. See how dramatically outcomes diverge over your investment horizon.",
    tag: "Mind-bender",
    accent: true,
  },
  {
    href: "/calculators/drawdown-recovery",
    emoji: "📉",
    title: "Drawdown Recovery",
    desc: "Down 30%? You need +43% just to break even. See the brutal math of loss recovery.",
    tag: "Risk reality",
    accent: false,
  },
  {
    href: "/calculators/panic-selling",
    emoji: "😱",
    title: "Cost of Panic Selling",
    desc: "Missing just 10 of the best market days can cut your wealth in half. This calculator shows exactly how much.",
    tag: "Behaviour",
    accent: true,
  },
  {
    href: "/calculators/luxury-trap",
    emoji: "🚗",
    title: "Luxury Trap",
    desc: "Your ₹30L car doesn't cost ₹30L. It costs decades of compounding. Find the real price tag.",
    tag: "Opportunity cost",
    accent: false,
  },
  {
    href: "/calculators/start-late",
    emoji: "⏰",
    title: "Cost of Starting Late",
    desc: "Starting at 25 vs 35 vs 45 — same SIP, same returns, wildly different destinations. Time is the only unfair advantage.",
    tag: "Time is money",
    accent: true,
  },
  {
    href: "/calculators/fee-destroyer",
    emoji: "🔥",
    title: "Fee Destroyer",
    desc: "A 1% annual fee sounds harmless. Over 20 years on ₹50L, it quietly steals ₹50L+ from you.",
    tag: "Fee drag",
    accent: false,
  },
  {
    href: "/calculators/min-ticket",
    emoji: "🎯",
    title: "Min. Ticket Checker",
    desc: "Enter your investable corpus and see which MyNella mandates are within your reach — instantly.",
    tag: "Routing tool",
    accent: false,
  },
  {
    href: "/calculators/sleeve-sizer",
    emoji: "⚖️",
    title: "Risk Profile Finder",
    desc: "Answer 5 questions to discover your investor risk category and see which MyNella mandates match your profile.",
    tag: "Investor profiling",
    accent: false,
  },
  {
    href: "/calculators/martingale",
    emoji: "💀",
    title: "Martingale Risk of Ruin",
    desc: "See how doubling down on a falling stock explodes your capital exposure — and why averaging down can destroy your portfolio.",
    tag: "Risk education",
    accent: false,
  },
  {
    href: "/calculators/polaris-compounding",
    emoji: "✦",
    title: "Polaris 1× → 110×",
    desc: "Model sequential doublings like Polaris: tax, performance fee, and 10% withdrawal each cycle — full table, same as on the PMS page.",
    tag: "PMS compounding",
    accent: true,
  },
  {
    href: "/calculators/retirement",
    emoji: "🪷",
    title: "Real Number Retirement",
    desc: "Project today's expenses to retirement, fund 25–30 years of withdrawals at the real rate of return, and see the SIP gap. Every formula on screen.",
    tag: "Retirement reality",
    accent: true,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Calculators", item: `${SITE_URL}/calculators` },
      ],
    },
    {
      "@type": "ItemList",
      name: "Investment Calculators",
      description: "Free investment calculators for Indian investors",
      numberOfItems: calculators.length,
      itemListElement: calculators.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.title,
        description: c.desc,
        url: `${SITE_URL}${c.href}`,
      })),
    },
  ],
};

export default async function CalculatorsPage() {
  const copy = await getPageCopy("calculators");
  const eyebrow = mergedEyebrow(copy, "Tools & calculators");
  const h = mergedHeroText(copy, {
    line1: "Numbers that make you",
    emphasis: "think differently.",
    sub: "Thirteen calculators. Each built to reveal something real about how compounding, time, fees, and behaviour shape wealth. All illustrative — no account required.",
  });

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.heroGrid} aria-hidden />
      <div className={styles.heroGlow} aria-hidden />

      <div className={styles.inner}>
        <header className={styles.hero}>
          <Eyebrow>{eyebrow}</Eyebrow>
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
          <p className={styles.heroIntent}>
            Popular:{" "}
            <Link href="/calculators/drawdown-recovery">stock loss &amp; drawdown recovery</Link>
            {" · "}
            <Link href="/calculators/cagr">CAGR</Link>
            {" · "}
            <Link href="/calculators/fee-destroyer">fee drag</Link>
          </p>
        </header>

        <div className={styles.grid}>
          {calculators.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={`${styles.card} ${c.accent ? styles.accent : ""}`}
            >
              <div className={styles.cardEmoji}>{c.emoji}</div>
              <div className={styles.cardTag}>{c.tag}</div>
              <h2 className={styles.cardTitle}>{c.title}</h2>
              <p className={styles.cardDesc}>{c.desc}</p>
              <span className={styles.cardArrow}>Open →</span>
            </Link>
          ))}
        </div>

        <SectionWrapper variant="alt" className={styles.whyBand}>
          <Eyebrow>Why these tools</Eyebrow>
          <h2 className={styles.whyTitle}>Clarity before conviction.</h2>
          <p className={styles.whyLead}>
            Use them to stress-test assumptions — how fees erode wealth, how drawdowns bite, and how few great days
            actually matter.
          </p>
          <div className={styles.whyGrid}>
            {WHY_PILLARS.map((p) => (
              <div key={p.title} className={styles.whyCard}>
                <div className={styles.whyCardTitle}>{p.title}</div>
                <p className={styles.whyCardDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <p className={styles.disclaimer}>
          All calculators are illustrative only. Not investment advice. Figures do not represent MyNella product returns or
          guarantees. Past performance is not indicative of future results.
        </p>
      </div>
    </div>
  );
}
