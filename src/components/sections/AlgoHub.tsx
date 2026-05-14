import Link from "next/link";
import { MyNellaMarkImage } from "@/components/ui/MyNellaMarkImage";
import { ProductHeroBrand } from "@/components/ui/ProductHeroBrand";
import type { ProductBrandKey } from "@/lib/brand-assets";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FAQ, type FAQItem } from "@/components/ui/FAQ";
import { mergedHeroText, mergedPills } from "@/lib/page-copy-merge";
import { ctaLinks } from "@/lib/navigation";
import type { PageCopyDoc } from "@/sanity/lib/pageCopy";
import heroStyles from "./shared/MarketingHero.module.css";
import styles from "./AlgoHub.module.css";

const strategies: {
  tag: string;
  title: string;
  desc: string;
  min: string;
  risk: string;
  href: string;
  cta: string;
  brand: ProductBrandKey;
}[] = [
  {
    tag: "Volatility / derivatives",
    title: "Optimus",
    desc: "Market-agnostic, fully automated options-buying on index derivatives — designed for absolute-return seekers who accept sharp drawdowns and high volatility.",
    min: "₹15L+",
    risk: "Very high",
    href: "/algo/optimus",
    cta: "Optimus overview",
    brand: "optimus",
  },
  {
    tag: "Margin enhancement",
    title: "Pledge+",
    desc: "Directional futures & options on margin from pledged equity — for investors who already hold a portfolio and want incremental return without fresh long-only capital.",
    min: "₹1 Cr+",
    risk: "High",
    href: "/algo/pledge-plus",
    cta: "Pledge+ overview",
    brand: "pledgePlus",
  },
  {
    tag: "Margin enhancement · commodities",
    title: "Pledge+ Mini",
    desc: "The Pledge+ framework adapted for ₹50L capital — directional commodity futures & options deployed on margin from pledged equity.",
    min: "₹50L+",
    risk: "High",
    href: "/algo/pledge-plus-mini",
    cta: "Pledge+ Mini overview",
    brand: "pledgePlus",
  },
  {
    tag: "Equity systematic",
    title: "Polaris Lite",
    desc: "The Polaris engine at a lower ticket — systematic equity selection and allocation under the Research Analyst framework, not PMS.",
    min: "₹10L+",
    risk: "Moderate–high",
    href: "/algo/polaris-lite",
    cta: "Polaris Lite overview",
    brand: "polarisLite",
  },
];


export function AlgoHubHero({ copy }: { copy?: PageCopyDoc | null }) {
  const pills = mergedPills(copy, [
    "Research Analyst · REG-NUMBER-RA",
    "Systematic & automated",
  ]);
  const h = mergedHeroText(copy, {
    line1: "Algorithms that respect",
    emphasis: "risk, rules, and your mandate.",
    sub:
      "MyNella's algo suite spans equity systems and derivatives programs — each documented, each gated by suitability, each built to remove emotion from execution.",
  });
  return (
    <section className={heroStyles.hero}>
      <div className={heroStyles.heroGrid} />
      <div className={heroStyles.heroGlow} />
      <div className={heroStyles.heroInner}>
        <MyNellaMarkImage className={styles.algoHeroMark} sizes="240px" priority decorative />
        <div className={heroStyles.heroPills}>
          {pills.map((label, i) => (
            <span key={`${label}-${i}`} className={heroStyles.pill}>
              <span className={heroStyles.pillDot} />
              {label}
            </span>
          ))}
        </div>
        <h1 className={heroStyles.heroTitle}>
          {h.line1}
          {h.emphasis ? (
            <>
              <br />
              <em>{h.emphasis}</em>
            </>
          ) : null}
        </h1>
        <p className={heroStyles.heroSub}>{h.sub}</p>
        <div className={heroStyles.heroCtas}>
          <Button href={ctaLinks.bookCall} external>
            Talk to the team
          </Button>
          <Button href="#strategies" variant="ghost">
            Compare strategies
          </Button>
        </div>
      </div>
    </section>
  );
}

export function AlgoHubPhilosophy() {
  return (
    <SectionWrapper>
      <div className={styles.philosophy}>
        <Eyebrow>Philosophy</Eyebrow>
        <h2>Speed and scale — without abandoning governance.</h2>
        <blockquote>
          &ldquo;The edge is not prediction. It is doing the same right things
          under stress, thousands of times.&rdquo;
        </blockquote>
        <cite>— How we think about systematic trading at MyNella</cite>
        <p className={styles.lead} style={{ marginTop: 28, marginLeft: "auto", marginRight: "auto" }}>
          Models generate signals; risk frameworks cap exposure; humans set the
          mandate and monitor regime risk. That division of labour is what keeps
          algos from becoming black boxes on one hand — or emotional on the
          other.
        </p>
      </div>
    </SectionWrapper>
  );
}

export function AlgoHubCards() {
  return (
    <SectionWrapper variant="alt" id="strategies">
      <Eyebrow>Strategies</Eyebrow>
      <h2>Four mandates. Four risk profiles.</h2>
      <p className={styles.lead}>
        Choose the line that matches your capital, experience with derivatives,
        and drawdown tolerance — then read the full product page before you
        commit. Translate paper losses into required gains with the{" "}
        <Link href="/calculators/drawdown-recovery">drawdown recovery calculator</Link>; for regulated-category
        diligence in Pune, see the{" "}
        <Link href="/wealth-management-pune">wealth management explainer</Link>.
      </p>
      <div className={styles.cards}>
        {strategies.map((s) => (
          <article key={s.title} className={styles.card}>
            <ProductHeroBrand product={s.brand} variant="card" title={s.title} />
            <div className={styles.cardTag}>{s.tag}</div>
            <h3 className={styles.cardTitle}>{s.title}</h3>
            <p className={styles.cardDesc}>{s.desc}</p>
            <div className={styles.metaRow}>
              <span>
                <strong>Min.</strong> {s.min}
              </span>
              <span>
                <strong>Risk</strong> {s.risk}
              </span>
            </div>
            <Button href={s.href}>{s.cta}</Button>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}

export function AlgoHubLadder() {
  return (
    <SectionWrapper>
      <Eyebrow>Capital map</Eyebrow>
      <h2>Where investors often start.</h2>
      <p className={styles.lead}>
        Not prescriptive advice — a practical map for discovery calls.
      </p>
      <div className={styles.ladder}>
        <div className={styles.ladderRow}>
          <div className={styles.ladderCap}>₹10L – ₹50L</div>
          <div className={styles.ladderBody}>
            <h3>Polaris Lite + model portfolios</h3>
            <p>
              Systematic equity at lower ticket; or subscribe to Alpha / Quanto
              baskets on partner platforms.
            </p>
          </div>
        </div>
        <div className={styles.ladderRow}>
          <div className={styles.ladderCap}>₹15L+</div>
          <div className={styles.ladderBody}>
            <h3>Optimus (if suitable)</h3>
            <p>
              Derivatives-based, automated, high volatility — only after
              explicit suitability and disclosure.
            </p>
          </div>
        </div>
        <div className={styles.ladderRow}>
          <div className={styles.ladderCap}>₹50L+ pledged</div>
          <div className={styles.ladderBody}>
            <h3>Pledge+ Mini</h3>
            <p>
              Pledged equity for margin with a commodities-only derivatives
              mandate and disciplined cash buffering.
            </p>
          </div>
        </div>
        <div className={styles.ladderRow}>
          <div className={styles.ladderCap}>₹50L+ PMS</div>
          <div className={styles.ladderBody}>
            <h3>Polaris PMS</h3>
            <p>
              Discretionary equity PMS for qualified ticket sizes — see the PMS
              section of the site.
            </p>
          </div>
        </div>
        <div className={styles.ladderRow}>
          <div className={styles.ladderCap}>₹1 Cr+ pledged</div>
          <div className={styles.ladderBody}>
            <h3>Pledge+</h3>
            <p>
              Existing equity pledged for margin; disciplined cash buffer;
              multi-asset tactical overlays.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export function AlgoHubFAQ({
  faqModule,
  items,
}: {
  faqModule?: { eyebrow?: string | null; title?: string | null } | null;
  items: FAQItem[];
}) {
  const eyebrow = faqModule?.eyebrow?.trim() || "FAQ";
  const title = faqModule?.title?.trim() || "Algo programs — common questions.";
  return (
    <SectionWrapper variant="alt">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      <div style={{ marginTop: 36 }}>
        <FAQ items={items} />
      </div>
    </SectionWrapper>
  );
}

export function AlgoHubCTA() {
  return (
    <section className={styles.ctaBand}>
      <div className={styles.ctaGlow} />
      <div className={styles.ctaInner}>
        <Eyebrow>Next step</Eyebrow>
        <h2>Pick a page. Then book a call.</h2>
        <p className={styles.ctaLead}>
          We&apos;ll confirm suitability, answer mechanics, and walk through
          onboarding — no obligation.
        </p>
        <div className={styles.ctaBtns}>
          <Button href={ctaLinks.bookCall} external>
            Book a Call
          </Button>
          <Button href="/model-portfolios" variant="ghost">
            Model portfolios
          </Button>
        </div>
      </div>
    </section>
  );
}
