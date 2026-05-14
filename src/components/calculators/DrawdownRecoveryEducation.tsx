import Link from "next/link";
import styles from "./DrawdownRecoveryEducation.module.css";

/**
 * Server-rendered explainer for drawdown / stock-loss recovery intent (SEO + AEO).
 * The interactive tool lives in {@link DrawdownCalculator}.
 */
export function DrawdownRecoveryEducation() {
  return (
    <article className={styles.article} aria-labelledby="drawdown-edu-title">
      <h2 id="drawdown-edu-title" className={styles.h2}>
        Drawdown and recovery: why the gain you need is larger than the loss
      </h2>
      <p className={styles.lead}>
        A <strong>drawdown</strong> is the peak-to-trough decline of your portfolio, often written as a negative
        percentage. <strong>Recovery</strong> is the positive return required to get back to your prior peak. Because
        you are growing from a smaller base after a loss, the recovery percentage is always larger than the loss
        percentage — this is sometimes called <strong>drawdown asymmetry</strong>.
      </p>

      <h3 className={styles.h3}>Formula (single-period, illustrative)</h3>
      <p>
        If your portfolio falls by fraction <em>d</em> (e.g. 30% → <em>d</em> = 0.30), the break-even gain{" "}
        <em>g</em> (as a decimal) satisfies <code className={styles.code}>(1 − d)(1 + g) = 1</code>, so{" "}
        <code className={styles.code}>g = d / (1 − d)</code>. Multiply by 100 for percent. Example: after −30%, you
        need about <strong>+42.9%</strong> to recover — not +30%.
      </p>

      <h3 className={styles.h3}>Worked examples</h3>
      <ul className={styles.list}>
        <li>
          <strong>−10% loss</strong> → about <strong>+11.1%</strong> gain to break even.
        </li>
        <li>
          <strong>−25% loss</strong> → <strong>+33.3%</strong> gain required.
        </li>
        <li>
          <strong>−50% loss</strong> → <strong>+100%</strong> (double) required.
        </li>
      </ul>
      <p className={styles.note}>
        These numbers describe arithmetic on a single portfolio value. Real paths involve cash flows, taxes, fees, and
        sequence of returns — use the calculator below for intuition, then discuss your situation with a qualified
        professional.
      </p>

      <h3 className={styles.h3}>“Stock loss recovery calculator” — what this tool does</h3>
      <p>
        Investors often search for a <strong>stock loss recovery calculator</strong> after a sharp correction. This
        page expresses the same idea at portfolio level: pick a drawdown, see the recovery return implied by the
        formula. It does not predict markets or recommend trades — it makes the asymmetry visible so you can plan
        conversations with discipline. For a short companion read, see the{" "}
        <Link href="/blog/stock-loss-drawdown-recovery-guide">stock loss &amp; drawdown recovery guide</Link>.
      </p>
      <p>
        Pair this with behaviour tools like the{" "}
        <Link href="/calculators/panic-selling">cost of panic selling calculator</Link> and risk education on{" "}
        <Link href="/calculators/martingale">averaging down</Link>. If you are also comparing{" "}
        <Link href="/wealth-management-pune">regulated wealth categories in Pune</Link>, read that explainer before
        shortlisting firms — educational only, not a directory.
      </p>
    </article>
  );
}
