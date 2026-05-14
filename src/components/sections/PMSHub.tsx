import Link from "next/link";
import { MyNellaMarkImage } from "@/components/ui/MyNellaMarkImage";
import { ProductHeroBrand } from "@/components/ui/ProductHeroBrand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FAQ, type FAQItem } from "@/components/ui/FAQ";
import { mergedHeroText, mergedPills } from "@/lib/page-copy-merge";
import { ctaLinks } from "@/lib/navigation";
import type { PageCopyDoc } from "@/sanity/lib/pageCopy";
import heroStyles from "./shared/MarketingHero.module.css";
import styles from "./PMSHub.module.css";


export function PMSHubHero({ copy }: { copy?: PageCopyDoc | null }) {
  const pills = mergedPills(copy, ["SEBI Registered PMS", "REG-NUMBER-PMS"]);
  const h = mergedHeroText(copy, {
    line1: "Discretionary portfolios.",
    emphasis: "Built for conviction and compounding.",
    sub:
      "Our PMS offering is for investors who want a dedicated equity mandate — combining macro and thematic judgment with quantitative execution and strict risk discipline.",
  });
  return (
    <section className={heroStyles.hero}>
      <div className={heroStyles.heroGrid} />
      <div className={heroStyles.heroGlow} />
      <div className={heroStyles.heroInner}>
        <MyNellaMarkImage className={styles.pmsHeroMark} sizes="240px" priority decorative />
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
          <Button href="/pms/polaris">View Polaris PMS</Button>
          <Button href={ctaLinks.bookPolaris} external variant="ghost">
            Book a call
          </Button>
        </div>
      </div>
    </section>
  );
}

export function PMSHubExplain() {
  return (
    <SectionWrapper>
      <div className={styles.split}>
        <div>
          <Eyebrow>What you get</Eyebrow>
          <h2>A regulated mandate — not informal advice.</h2>
          <p className={styles.lead}>
            Under PMS, strategy, risk limits, and reporting are governed by your
            agreement and SEBI rules. You delegate execution to the portfolio
            manager while retaining visibility into holdings and performance.
          </p>
        </div>
        <div>
          <Eyebrow>Why consider it</Eyebrow>
          <h2>When a pooled fund is too blunt.</h2>
          <p className={styles.lead}>
            PMS suits investors who need a tailored equity book, can tolerate
            concentration, and want alignment between fees and outcomes — not
            a one-size-fits-all index-hugging product.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}

export function PMSHubWhy() {
  return (
    <SectionWrapper variant="alt">
      <Eyebrow>Why MyNella PMS</Eyebrow>
      <h2>Macro context + quant discipline.</h2>
      <div className={styles.whyGrid}>
        <div className={styles.whyCard}>
          <h3>Regime-aware positioning</h3>
          <p>
            We interpret where markets sit in the cycle before sizing risk —
            then use systematic signals for stock selection and execution.
          </p>
        </div>
        <div className={styles.whyCard}>
          <h3>Concentrated, high-conviction</h3>
          <p>
            Polaris targets a focused set of equities — built for investors who
            accept volatility in exchange for potential alpha.
          </p>
        </div>
        <div className={styles.whyCard}>
          <h3>Fee alignment</h3>
          <p>
            No fixed management fee on Polaris; our economics tie to performance
            milestones — so incentives stay pointed in your direction.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}

export function PMSHubPolaris() {
  return (
    <SectionWrapper>
      <Eyebrow>Our PMS strategy</Eyebrow>
      <h2>Polaris — the flagship mandate.</h2>
      <ProductHeroBrand product="polaris" variant="polarisFeature" title="Polaris" />
      <p className={styles.lead}>
        One strategy today under the PMS licence: Polaris. Everything you need
        — objective, construction, fees, onboarding — lives on the dedicated page.
      </p>

      <div className={styles.polarisFeature}>
        <div className={styles.polarisLeft}>
          <div className={styles.polarisKicker}>Live mandate</div>
          <h3 className={styles.polarisTitle}>
            A wealth creation journey from 1x to 110x.
          </h3>
          <p className={styles.polarisDesc}>
            Systematic equity exposure with adaptive stock selection and
            allocation — for investors with a multi-year horizon and
            moderate-to-high risk appetite.
          </p>
          <div className={styles.polarisStats}>
            <div className={styles.polarisStat}>
              <div className={styles.polarisStatVal}>₹50L+</div>
              <div className={styles.polarisStatLab}>Minimum ticket</div>
            </div>
            <div className={styles.polarisStat}>
              <div className={styles.polarisStatVal}>₹0</div>
              <div className={styles.polarisStatLab}>Fixed mgmt fee</div>
            </div>
            <div className={styles.polarisStat}>
              <div className={styles.polarisStatVal}>Profit</div>
              <div className={styles.polarisStatLab}>Performance-only fee</div>
            </div>
          </div>
          <Button href="/pms/polaris">Full Polaris overview</Button>
        </div>
        <div className={styles.polarisRight}>
          <ul className={styles.polarisList}>
            <li>Regime identification before deployment</li>
            <li>Thematic screening + multi-factor filtering</li>
            <li>Human layer: cycle, events, secular themes</li>
            <li>Machine layer: signals, backtests, execution</li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
}

export function PMSHubCompare() {
  return (
    <SectionWrapper variant="alt">
      <Eyebrow>Choose the right wrapper</Eyebrow>
      <h2>PMS vs mutual fund vs model portfolio.</h2>
      <p className={styles.lead}>
        High-level comparison — not tax or legal advice. Confirm specifics with
        your professional advisors.
      </p>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Dimension</th>
              <th>PMS (Polaris)</th>
              <th>Typical mutual fund</th>
              <th>Model portfolio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ownership</td>
              <td>Stocks in your demat</td>
              <td>Units of pooled scheme</td>
              <td>You execute trades; stocks in your demat</td>
            </tr>
            <tr>
              <td>Concentration</td>
              <td>Higher — focused book</td>
              <td>Often more diversified</td>
              <td>Varies by strategy</td>
            </tr>
            <tr>
              <td>Minimum ticket</td>
              <td>₹50L+ (regulatory)</td>
              <td>Low</td>
              <td>Platform-dependent</td>
            </tr>
            <tr>
              <td>Fee shape</td>
              <td>Performance-aligned (Polaris)</td>
              <td>TER + loads per scheme</td>
              <td>Platform + asset fees</td>
            </tr>
          </tbody>
        </table>
      </div>
    </SectionWrapper>
  );
}

export function PMSHubInvestor() {
  return (
    <SectionWrapper>
      <Eyebrow>Suitability</Eyebrow>
      <h2>PMS is not for everyone — by design.</h2>
      <div className={styles.investorGrid}>
        <div className={styles.investorCard}>
          <strong>Strong fit</strong>
          ₹50L+ single-strategy allocation, 3+ year horizon, comfortable with
          concentrated equity and drawdowns, wants discretionary management with
          regulatory oversight.
        </div>
        <div className={styles.investorCard}>
          <strong>Consider alternatives</strong>
          Smaller ticket or lower volatility preference → explore Polaris Lite,
          model portfolios, or large-cap quant baskets before PMS.
        </div>
      </div>
      <p className={styles.lead}>
        Stress-test how deep losses map to required gains with the{" "}
        <Link href="/calculators/drawdown-recovery">drawdown recovery calculator</Link>. If you are comparing regulated
        categories in Pune, start with the{" "}
        <Link href="/wealth-management-pune">wealth management explainer</Link> (educational, not a directory of firms).
      </p>
    </SectionWrapper>
  );
}

export function PMSHubProcess() {
  return (
    <SectionWrapper variant="alt">
      <Eyebrow>Onboarding</Eyebrow>
      <h2>Four steps to a live PMS account.</h2>
      <div className={styles.steps}>
        {[
          {
            title: "Strategy call",
            desc: "Align on objectives, risk, and whether Polaris is appropriate.",
          },
          {
            title: "Documentation",
            desc: "KYC, risk profile, and PMS agreement per regulatory requirements.",
          },
          {
            title: "Funding",
            desc: "Transfer to designated accounts; securities routed per mandate.",
          },
          {
            title: "Go-live",
            desc: "Portfolio deployed per current model; reporting schedule begins.",
          },
        ].map((s, i) => (
          <div key={s.title} className={styles.step}>
            <div className={styles.stepNum}>{i + 1}</div>
            <div className={styles.stepTitle}>{s.title}</div>
            <p className={styles.stepDesc}>{s.desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export function PMSHubFAQ({
  faqModule,
  items,
}: {
  faqModule?: { eyebrow?: string | null; title?: string | null } | null;
  items: FAQItem[];
}) {
  const eyebrow = faqModule?.eyebrow?.trim() || "FAQ";
  const title = faqModule?.title?.trim() || "PMS questions — quick answers.";
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

export function PMSHubCTA() {
  return (
    <section className={styles.ctaBand}>
      <div className={styles.ctaGlow} />
      <div className={styles.ctaInner}>
        <Eyebrow>Take the next step</Eyebrow>
        <h2>See if Polaris fits your mandate.</h2>
        <p className={styles.ctaLead}>
          Book a call with our team or open the full Polaris page for fees, FAQ,
          and risk disclosures.
        </p>
        <div className={styles.ctaBtns}>
          <Button href={ctaLinks.bookPolaris} external>
            Book a Call
          </Button>
          <Button href="/pms/polaris" variant="ghost">
            Polaris details
          </Button>
        </div>
      </div>
    </section>
  );
}
