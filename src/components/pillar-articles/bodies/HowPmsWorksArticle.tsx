import Link from "next/link";
import styles from "../pillar-article.module.css";

export function HowPmsWorksArticleBody() {
  return (
    <>
      <h1>How portfolio management services (PMS) work in India</h1>
      <div className={styles.lede}>
        <p>
          A Portfolio Management Service (PMS) is a SEBI-regulated channel that allows a qualified portfolio
          manager to manage your securities portfolio within an agreed mandate. It is not a mutual fund,
          not a bank deposit, and not a guaranteed return product. For many Indian investors with larger
          ticket sizes and long horizons, PMS can be a useful structure—if the mandate fits, if fees are
          understood, and if you are prepared for equity-style volatility.
        </p>
        <p>
          This guide explains how PMS works in practice: regulation, onboarding, custody, discretion,
          reporting, fees, taxation themes (high level only), and the diligence questions that separate good
          decisions from rushed ones. It pairs naturally with MyNella&apos;s{" "}
          <Link href="/pms">PMS overview</Link> and the{" "}
          <Link href="/pms/polaris">Polaris PMS mandate page</Link>, which describe how MyNella approaches
          discretionary portfolio management within its registration (REG-NUMBER-PMS).
        </p>
      </div>

      <h2>A practical mental model: PMS as a bespoke mandate, not a shelf product</h2>
      <p>
        Mutual funds are often described as mass-manufactured vehicles: pooled capital, standardised scheme        documents, and daily liquidity conventions that many investors understand intuitively. PMS, in
        contrast, is closer to a bespoke mandate: fewer investors per strategy, potentially higher
        concentration, and a client agreement that should reflect your situation more closely—while still
        operating inside the portfolio manager&apos;s stated investment approach and regulatory boundaries.
      </p>
      <p>
        That bespoke nature is both the appeal and the risk. Customisation can mean alignment; it can also
        mean concentration that hurts more when wrong. The question is not whether PMS is “premium.” It is
        whether the incremental complexity buys you something you genuinely need—governance, reporting,
        mandate fit, tax handling discipline, or portfolio construction you cannot replicate cheaply yourself.
      </p>
      <p>
        Many investors discover only later that they misunderstood what discretion meant in practice, or
        that they assumed liquidity rules matched mutual funds when they did not. This guide is designed to
        reduce those “unknown unknowns” early.
      </p>

      <h2>The regulatory frame: why PMS exists as a separate category</h2>
      <p>
        SEBI regulates portfolio managers to ensure minimum standards for client agreements, risk        disclosures, operations, and reporting. The regulatory intent is investor protection without
        pretending that equity risk can be regulated away. A PMS can be professionally managed, transparent,
        and well governed—and still lose money in a bear market, because markets do that.
      </p>
      <p>
        Understanding the category matters because Indian investors often compare products with superficial
        similarity: “both invest in stocks.” True, but the legal wrapper, the role of the portfolio manager,
        the fee norms, the reporting cadence, and the client&apos;s responsibilities can differ materially        from mutual funds, AIFs, or direct portfolios. If you blur those differences, you may choose the
        right asset class but the wrong structure—or misunderstand liquidity.
      </p>

      <h2>Discretionary versus non-discretionary: what changes for you</h2>
      <p>
        In a discretionary PMS, the portfolio manager makes investment decisions within the mandate without
        seeking trade-by-trade approval, subject to the agreement and disclosures. In non-discretionary
        arrangements, client approval may be required for trades. Most retail-facing PMS narratives people
        discuss are discretionary in nature, but you should never assume—verify in your documentation.
      </p>
      <p>
        Discretion is not “freedom without rules.” It operates inside an investment approach that should be
        documented, inside risk limits that should be understandable, and inside operational controls that
        include custody and record-keeping. Your job as an investor is to ensure the documented approach
        matches what you believe you are buying, especially on concentration, derivatives usage (if any),
        cash ranges, and leverage.
      </p>

      <h2>Onboarding: KYC, agreements, and suitability</h2>
      <p>
        Onboarding is where many mistakes are prevented—or baked in. Expect KYC processes, risk profiling,
        and a formal agreement that spells out fees, termination, reporting, and dispute handling. Treat
        rushed onboarding as a red flag: a good manager wants clients who understand what they are signing.
      </p>
      <p>
        Suitability is not a one-time checkbox. Life changes: liquidity needs change, risk tolerance changes,
        tax situations change. A structure that was appropriate five years ago may be inappropriate after a
        major life event. The right practice is periodic review—not daily tinkering, but intentional        reassessment when circumstances shift materially.
      </p>
      <p>
        MyNella publishes educational guides such as{" "}
        <Link href="/blog/pms-investor-checklist">the PMS investor checklist</Link> and{" "}
        <Link href="/blog/how-to-choose-pms">how to choose a PMS provider</Link> to support structured
        diligence. These are not substitutes for reading your actual agreement.
      </p>

      <h2>Custody, segregation, and why “where the stocks sit” matters</h2>
      <p>
        Operational plumbing is unsexy but essential. In regulated portfolio management, assets are held in
        a structure that separates client securities from the manager&apos;s own business risks in defined
        ways, with custodial and reporting conventions governed by regulation and agreement. If you do not
        understand custody basics, ask until you do—this is not a detail reserved for accountants.
      </p>
      <p>
        Investors sometimes confuse “I can see holdings in my statement” with “I understand liquidity.”
        Visibility helps, but liquidity is also a function of market depth, position sizes, and whether the
        mandate holds concentrated names. A transparent illiquid portfolio is still illiquid in stress.
      </p>

      <h2>Fees: the shapes they take and the questions to ask</h2>
      <p>
        PMS fee structures can include fixed fees, performance-linked fees, or combinations. The key is to
        translate the structure into expectations: what do you pay in a flat market, in a strong market, and
        in a drawdown? Fee math changes compounding paths; MyNella offers educational calculators (for
        example, fee drag illustrations on the <Link href="/calculators">calculators hub</Link>) that help
        investors build intuition—not precise personal forecasts, but awareness.
      </p>
      <p>
        When comparing providers, compare net-of-fee thinking, not headline “management fee” alone. Also
        compare what is included: reporting depth, tax documentation support themes, client servicing access,
        and whether the mandate&apos;s turnover creates frictional costs beyond stated fees.
      </p>

      <h2>Reporting and review cadence: what good governance feels like</h2>
      <p>
        A PMS relationship should not feel like a black box. You should know how often you receive        portfolio reports, what metrics are shown, and how the manager explains periods when strategy
        behaviour is uncomfortable. Good reporting does not eliminate drawdowns; it reduces surprise and
        helps you avoid selling at the worst time because you finally discovered exposures you did not know
        you owned.
      </p>
      <p>
        Ask how corporate actions are handled, how cash balances are reported, and how concentrated        positions are communicated when they grow. If answers are vague, keep asking or walk away.
      </p>

      <h2>Taxation themes (high level): why your CA is essential</h2>
      <p>
        Tax treatment depends on security types, holding periods, whether instruments are treated as equity
       -oriented for tax purposes, and your own residency and entity status. Indian tax law changes; rates and
        exemptions shift in budgets. This article cannot state your liability.
      </p>
      <p>
        What we can say responsibly is: treat taxes as a first-class planning input, not an afterthought.
        Many investors focus on pre-tax returns and discover later that portfolio turnover, loss harvesting        rules (where applicable), and reporting complexity matter substantially. For a structured primer,
        read <Link href="/blog/tax-on-pms-returns">tax on PMS returns</Link> and{" "}
        <Link href="/pms/pms-taxation-india">PMS taxation themes in India</Link>, then involve a chartered
        accountant before acting.
      </p>

      <h2>Liquidity, lock-ins, and the difference between “long term” and “trapped”</h2>
      <p>
        PMS is often marketed to long-term investors, and for good reason: equity edge frequently shows up
        only across full cycles. But “long term” must be chosen, not forced by misunderstanding liquidity.
        Understand exit mechanics, notice periods if any, and how redemptions are processed in stressed
        markets. A long horizon is a strategy choice; unexpected illiquidity is an operational problem.
      </p>

      <h2>Who PMS tends to fit—and who should be cautious</h2>
      <p>
        PMS may be worth exploring when you have a sufficiently large ticket (regulatory minimums apply),
        a long horizon, capacity to withstand equity drawdowns, and a desire for a customised mandate
        relative to mass-market funds—provided you accept concentration and strategy risk. PMS may be a poor
        fit when you need near-term liquidity, cannot tolerate material drawdowns, or want a “set and        forget” product without reading periodic reporting.
      </p>
      <p>
        Ticket size alone is not suitability. Someone with large capital but short horizon may be poorly
        matched to an equity-heavy discretionary mandate. Someone with moderate capital but extreme        discipline and long horizon might still be outside PMS minimums—structures exist for different
        tickets, including research-led programmes and model portfolios described elsewhere on this site.
      </p>
      <p>
        Use the <Link href="/calculators/min-ticket">minimum ticket checker</Link> as an orientation tool, not
        a decision engine.
      </p>

      <h2>How MyNella approaches PMS within its registration</h2>
      <p>
        MyNella offers Polaris PMS as a SEBI-registered discretionary mandate blending systematic discipline
        with professional judgment—described in detail on the Polaris page. MyNella does not promise        outcomes; it publishes process, risk, and regulatory context so investors can decide whether to engage
        further.
      </p>
      <p>
        If you are comparing wrappers before you even reach product choice, read{" "}
        <Link href="/pms/pms-vs-mutual-funds">PMS versus mutual funds</Link>,{" "}
        <Link href="/pms/pms-vs-smallcase">PMS versus smallcase</Link>, and{" "}
        <Link href="/blog/pms-vs-aif">PMS versus AIF</Link>. These comparisons focus on structure and
        regulation, not “which is best,” because best is always contextual.
      </p>

      <h2>Benchmarking without fooling yourself: process versus outcome short samples</h2>
      <p>
        Investors love benchmarks because they compress uncertainty into a number. But short samples
        distort: a concentrated mandate can trail a broad index during one regime and lead in another for
        reasons that have nothing to do with “skill” in a short window—and everything to do with factor
        exposure. When evaluating PMS, ask what benchmark is intellectually honest for the mandate&apos;s
        design, what deviations should be expected, and over what horizon the mandate is meant to be judged.
      </p>
      <p>
        MyNella encourages process-first thinking: understand exposures, understand sell rules, understand
        risk controls—then judge outcomes over meaningful periods. If a provider cannot explain failure modes,
        you are not evaluating a strategy; you are buying a story.
      </p>

      <h2>Transfers, closures, and life events: plan for the boring scenarios</h2>
      <p>
        Investing advice often focuses on entry. Exit and transfer scenarios matter too: changing tax
        residency, consolidating portfolios, moving between providers, or handling family transitions. PMS
        relationships should be evaluated partly on how cleanly operational events are handled—not only on
        marketing performance narratives.
      </p>
      <p>
        Ask about account transfer mechanics, statement availability, and communication protocols for major
        life changes. The answers may matter more than a slick quarterly letter when reality hits.
      </p>

      <h2>Your next steps if you are seriously evaluating PMS</h2>
      <p>
        Read disclosures on the <Link href="/disclosures">disclosures hub</Link>, read the mandate materials,
        then book a conversation through the <Link href="/contact">contact page</Link>. Bring questions about
        drawdowns, fees, reporting, and fit. A competent team will welcome that conversation; a team that
        resists it is telling you something valuable.
      </p>
      <p>
        If you are still comparing structures, spend an hour with the comparison hub:{" "}
        <Link href="/blog/compare">MyNella comparisons</Link> are written to highlight regulation and mechanics,
        not to declare winners. The winner, if any, is the structure that matches your constraints once you
        strip marketing adjectives away.
      </p>

      <div className={styles.callout}>
        <p>
          <strong>Disclaimer:</strong> This guide is educational and not investment, legal, or tax advice.
          Securities investments are subject to market risks. Read all related documents carefully.
        </p>
      </div>

      <section className={styles.related} aria-label="Further reading">
        <h2>Further reading</h2>
        <ul>
          <li>
            <Link href="/team/punam-kucheria">Punam Kucheria — leadership and fund management at MyNella</Link>
          </li>
          <li>
            <Link href="/blog/understanding-risk-profile">Understanding risk profile for equity mandates</Link>
          </li>
          <li>
            <Link href="/calculators/polaris-compounding">Polaris compounding illustration (educational)</Link>
          </li>
        </ul>
      </section>
    </>
  );
}
