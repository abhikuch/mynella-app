import Link from "next/link";
import styles from "../pillar-article.module.css";

/** Blog · Is algo trading legal — targets “is algo trading legal in india” intent. */
export function IsAlgoTradingLegalIndiaArticleBody() {
  return (
    <>
      <h1>Is algo trading legal in India?</h1>
      <div className={styles.lede}>
        <p>
          <strong>Algorithmic (“algo”) trading is not banned in India</strong>, but how you access it—and who is allowed
          to sell it—depends on securities law, exchange rules, and whether you trade as retail through a broker, use a
          vendor strategy, or invest through a regulated programme such as Research Analyst–led research or Portfolio
          Management Services. Nothing here is legal advice; treat this as orientation before reading offering documents
          and exchange circulars.
        </p>
        <p>
          If you landed here after searching{" "}
          <strong>what is algo trading</strong> or <strong>algo trading meaning</strong>, start with our deeper explainer{" "}
          <Link href="/algo/what-is-algo-trading">what is algorithmic trading</Link>, then{" "}
          <Link href="/algo/sebi-rules-algo-trading">SEBI rules &amp; algo trading</Link> for regulatory framing. MyNella
          publishes educational material only — see <Link href="/disclosures">disclosures</Link> for charters and registrations.
        </p>
      </div>

      <h2>What regulators care about</h2>
      <p>
        SEBI and exchanges care about fairness, transparency, investor protection, and risk controls: who approved the
        algo, whether risk limits exist, how orders are transmitted, and how grievances are handled. “Legal” versus
        “risky” are different questions—you can comply with rules and still lose capital if leverage, volatility, or behaviour
        are mismatched with your tolerance.
      </p>

      <h2>Common paths investors encounter</h2>
      <p>
        <strong>Broker-provided algos:</strong> Often embedded in terminals or APIs; suitability and exchange-level
        checks matter. Read tariff notes and risk disclosures before enabling automation.
      </p>
      <p>
        <strong>Vendor / marketplace strategies:</strong> Packaging varies; verify whether you are subscribing to signals,
        copying trades, or entering a supervised framework — and whether the intermediary is authorised for that activity.
      </p>
      <p>
        <strong>Regulated investment programmes:</strong> Discretionary PMS or RA-led systematic strategies operate under
        defined agreements — different from casually renting an indicator on a forum. Explore <Link href="/algo">MyNella
          algo programmes</Link> only after reading product-specific PDFs.
      </p>

      <h2>Questions to ask before enabling anything</h2>
      <ul>
        <li>Which entity is contractually responsible — broker, adviser, RA, or PMS?</li>
        <li>Where are charters, grievance escalation, and fee mechanics documented?</li>
        <li>What kill-switches or drawdown behaviours apply when volatility spikes?</li>
      </ul>

      <div className={styles.callout}>
        <p>
          Educational only—not legal advice. Laws and circulars evolve; verify live rules with regulators and professionals.
        </p>
      </div>
    </>
  );
}

/** Blog · Drawdown guide — strengthens internal links to /calculators/drawdown-recovery. */
export function StockLossDrawdownRecoveryGuideArticleBody() {
  return (
    <>
      <h1>Stock loss recovery &amp; drawdown recovery — break-even return math</h1>
      <div className={styles.lede}>
        <p>
          Searches such as <strong>stock loss recovery calculator</strong>, <strong>drawdown recovery</strong>, and{" "}
          <strong>drawdown and recovery</strong> usually reflect the same anxiety: after a portfolio drop, how large a
          gain must you earn on the remaining capital just to reach your old peak? That relationship is asymmetric —{" "}
          <strong>a 50% loss requires a 100% gain</strong> on what is left — not a 50% rebound.
        </p>
        <p>
          Use MyNella&apos;s free interactive tool — the{" "}
          <Link href="/calculators/drawdown-recovery">stock loss and drawdown recovery calculator</Link> — to illustrate
          single-period math for one portfolio figure. Pair it with behaviour tools like{" "}
          <Link href="/calculators/panic-selling">panic-selling cost</Link> if you tend to react to headlines.
        </p>
      </div>

      <h2>Why “recovery %” exceeds “loss %”</h2>
      <p>
        After a drawdown you earn returns on a smaller base. If you lose fraction <em>d</em> of peak value, break-even gain{" "}
        <em>g</em> satisfies <code>(1 − d)(1 + g) = 1</code>, so <em>g = d / (1 − d)</em>. That is
        why recovery feels harder than the loss suggests — not because markets are “unfair,” but because arithmetic on a
        shrunken denominator demands a larger percentage climb.
      </p>

      <h2>Portfolio-level vs stock-by-stock reality</h2>
      <p>
        The calculator treats one aggregate portfolio value for intuition. Real portfolios include taxes, fees, staggered
        purchases, and uneven positions—discuss specifics with your adviser or chartered accountant before drawing
        conclusions about your own book.
      </p>

      <h2>Risk profiling before you chase recovery</h2>
      <p>
        Emotional recovery timelines often drive poor timing. Refresh your plan with{" "}
        <Link href="/blog/understanding-risk-profile">understanding risk profile</Link>, review{" "}
        <Link href="/blog/how-to-choose-pms">how to choose a PMS</Link> if relevant, and keep{" "}
        <Link href="/disclosures">disclosures</Link> accessible before changing mandate size.
      </p>

      <div className={styles.callout}>
        <p>Illustrative education only—not investment advice. Securities involve risk of loss.</p>
      </div>
    </>
  );
}
