import Image from "next/image";
import Link from "next/link";
import { DEFAULT_PILLAR_AUTHOR } from "@/lib/eeat-author";
import styles from "../pillar-article.module.css";

/**
 * Long-form leadership profile for E-E-A-T. No performance or AUM claims.
 */
export function PunamKucheriaArticleBody() {
  const personalLinkedIn = process.env.NEXT_PUBLIC_PUNAM_LINKEDIN_URL?.trim();
  const linkedInHref =
    personalLinkedIn ?? "https://www.linkedin.com/company/mynella";
  const linkedInLabel = personalLinkedIn ? "Punam on LinkedIn" : "MyNella on LinkedIn";

  return (
    <>
      <header className={styles.authorHero}>
        <div className={styles.authorHeroMain}>
          <h1>Punam Kucheria — Director and fund manager at MyNella</h1>
          <p className={styles.authorHeroSub}>
            Director and Fund Manager, MyNella Consultancy Pvt. Ltd., Pune. Market practitioner and
            portfolio leader for MyNella&apos;s SEBI-regulated mandates and research programmes.
          </p>
          <p className={styles.authorHeroRegs}>
            SEBI Portfolio Manager registration no. {DEFAULT_PILLAR_AUTHOR.sebiPmsReg} · SEBI Research
            Analyst registration no. {DEFAULT_PILLAR_AUTHOR.sebiRaReg}
          </p>
          <div className={styles.authorHeroLinks}>
            <a href={linkedInHref} target="_blank" rel="noopener noreferrer">
              {linkedInLabel}
            </a>
            <a href="https://stocktwits.com/Punam_Kucheria" target="_blank" rel="noopener noreferrer">
              StockTwits
            </a>
            <a href="https://mynella.substack.com/" target="_blank" rel="noopener noreferrer">
              Substack
            </a>
            <Link href="/disclosures">Disclosures &amp; charters</Link>
          </div>
        </div>
        <div className={styles.authorHeroPhotoWrap}>
          <Image
            src={DEFAULT_PILLAR_AUTHOR.imagePath}
            alt="Punam Kucheria"
            width={176}
            height={220}
            className={styles.authorHeroPhoto}
            priority
          />
        </div>
      </header>

      <div className={styles.lede}>
        <p>
          This page explains how leadership, process, and regulatory accountability show up in day-to-day
          portfolio and research work—not as marketing slogans, but as the practical constraints that shape
          how mandates are designed, communicated, and reviewed.
        </p>
        <p>
          If you are evaluating whether a discretionary portfolio or a systematic research programme fits
          your situation, the most useful question is rarely “Who has the best story?” It is closer to:
          “Does this team treat risk, documentation, and investor communication with the seriousness that
          SEBI-regulated work requires?” The sections below walk through what that means in practice for
          Indian investors considering{" "}
          <Link href="/pms/polaris">MyNella&apos;s SEBI-registered Polaris PMS mandate</Link> or the
          firm&apos;s research and algo-related offerings described on the{" "}
          <Link href="/algo">algorithmic strategies hub</Link>.
        </p>
      </div>

      <h2>Why leadership quality matters in portfolio management</h2>
      <p>
        Portfolio management is not a single “model” that runs unattended. Even when execution is
        systematic, someone must own design choices, stress scenarios, operational checks, and the
        discipline of changing course when evidence warrants it. In a Portfolio Management Service (PMS),
        the portfolio manager sits at the centre of those decisions—within the boundaries of the
        agreement, the investment approach disclosed to investors, and regulatory obligations.
      </p>
      <p>
        For investors, the fund manager&apos;s role is therefore not only “picking stocks.” It is also
        maintaining a decision architecture: what signals matter, what does not, how concentration is
        governed, how liquidity is respected, and how the portfolio&apos;s behaviour is explained when
        markets are uncomfortable. Those responsibilities are especially important in India, where retail
        participation has grown rapidly, where social media can amplify noise, and where product labels can
        sound similar even when regulatory structures differ materially.
      </p>
      <p>
        Punam&apos;s public writing and interviews—across channels such as{" "}
        <a href="https://www.linkedin.com/company/mynella" rel="noopener noreferrer">
          MyNella on LinkedIn
        </a>
        ,{" "}
        <a href="https://x.com/iam_mynella" rel="noopener noreferrer">
          X (Twitter)
        </a>
        , and long-form notes on{" "}
        <a href="https://mynella.substack.com/" rel="noopener noreferrer">
          Substack
        </a>—consistently emphasise a process-led mindset: separating luck from skill, avoiding narrative
        chasing, and treating drawdowns as an expected feature of equity investing rather than a surprise
        to be “explained away.” That posture matters because it sets expectations correctly before capital
        is deployed.
      </p>

      <h2>Process over prediction: what “systematic” means in practice</h2>
      <p>
        Markets reward patience, but patience without process can become stubbornness. A systematic
        approach—whether applied in discretionary judgment with disciplined rules, or in research
        programmes with explicit protocols—aims to reduce unforced errors: panic selling at the worst
        times, over-trading after a winning streak, or confusing a good narrative with a good risk-adjusted
        outcome. The goal is not certainty (markets never offer certainty). The goal is repeatability:
        decisions that can be reviewed, improved, and audited.
      </p>
      <p>
        For Indian investors with meaningful capital—often deploying from roughly ten lakh rupees upward in
        various products, and significantly more for PMS thresholds—the practical benefit of process is
        emotional as much as analytical. When a strategy has a documented logic, investors can evaluate
        whether a period of underperformance is within the range of normal strategy behaviour, or whether
        something structural has changed. Without that anchor, every dip feels like an emergency, and
        every rally feels like proof. Neither reaction is a sound basis for long-term compounding.
      </p>
      <p>
        If you want to explore how minimum ticket sizes interact with your corpus, MyNella publishes an        illustrative{" "}
        <Link href="/calculators/min-ticket">minimum ticket checker calculator</Link>. It is educational
        and not a substitute for suitability assessment, but it helps investors orient before a        conversation.
      </p>

      <h2>Regulatory context: SEBI PMS and Research Analyst responsibilities</h2>
      <p>
        SEBI&apos;s regulatory frameworks for PMS and Research Analyst services exist to protect investors
        through disclosure, segregation of roles where required, and enforceable standards for        communication. A PMS provider must operate within a clear agreement, maintain transparency        obligations, and interact with the custodian ecosystem appropriately. A Research Analyst must
        distinguish research from other activities and present conflicts and limitations in a regulated
        format.
      </p>
      <p>
        Leadership in this environment is partly cultural: encouraging teams to treat compliance not as a
        box-check, but as a risk management function. That includes investor charters, grievance
        mechanisms, and the availability of regulatory disclosures. MyNella aggregates key documents on
        the <Link href="/disclosures">disclosures hub</Link>, which is a useful starting point before you
        commit capital or sign agreements.
      </p>
      <p>
        Nothing on this page (or elsewhere on the website) should be read as legal advice or tax advice.
        It is an orientation. Your specific situation may involve additional considerations—residency,
        entity type, existing positions, concentration limits, and more—that only a qualified professional
        can address.
      </p>

      <h2>Investor communication: what good looks like before markets turn</h2>
      <p>
        The best time to judge communication quality is before you invest. After capital is deployed,
        cognitive bias makes it harder to evaluate objectively. Before investing, look for clarity on:
        the mandate&apos;s objective, the risks being accepted, the scenarios where the strategy may lag,
        the liquidity terms, the fee structure, and how updates will be delivered when markets are volatile.
      </p>
      <p>
        Strong managers avoid two extremes: silence (which breeds suspicion) and overconfidence (which
        breeds complacency). Instead, they explain the process, show the data they monitor, and
        acknowledge uncertainty where it genuinely exists. That approach does not eliminate risk—equity
        risk remains—but it aligns expectations and reduces the odds that investors make harmful decisions
        at the worst moments.
      </p>
      <p>
        If you are early in your diligence, the{" "}
        <Link href="/blog/pms-investor-checklist">PMS investor checklist guide</Link> offers a structured
        set of questions and documents to review. It pairs well with{" "}
        <Link href="/blog/how-to-choose-pms">how to choose a PMS in India</Link>, which focuses on
        evaluation criteria rather than hype.
      </p>

      <h2>Long-horizon wealth: why “slow” is often a feature, not a bug</h2>
      <p>
        Compounding rewards continuity, but continuity is psychologically costly when headlines turn scary.
        Leadership in asset management includes repeatedly reinforcing a simple idea: the purpose of a
        mandate is not to win every quarter, but to survive sequences of quarters that test conviction.
        That idea is especially relevant for Indian investors who may be allocating a meaningful slice of
        family capital after a career of earning in salary income, where volatility feels novel even when it
        is statistically normal for equities.
      </p>
      <p>
        This is why education matters alongside portfolio construction. Tools and explainers do not remove
        risk, but they reduce preventable mistakes—misunderstanding liquidity, mis-estimating tax
        frictions, or extrapolating short samples. MyNella maintains a{" "}
        <Link href="/calculators">calculators hub</Link> for exactly that reason: to make abstract risks
        concrete enough that investors can align expectations before they sign.
      </p>

      <h2>Risk culture: concentration, liquidity, and behavioural traps</h2>
      <p>
        Many sophisticated investors understand volatility in theory but experience it differently when a
        meaningful portion of net worth is exposed. Concentrated equity mandates can be appropriate for
        certain investors with long horizons and capacity to bear drawdowns, but inappropriate for others
        who require stability or near-term liquidity. Leadership matters here because the firm must say “no”
        when a prospect&apos;s profile does not match the product&apos;s risk envelope—even when saying
        “yes” would raise assets.
      </p>
      <p>
        Behavioural traps—panic selling after drawdowns, performance chasing after rallies, overconfidence
        after a short winning streak—are universal. Education helps. MyNella publishes tools such as the{" "}
        <Link href="/calculators/drawdown-recovery">drawdown recovery calculator</Link> and the{" "}
        <Link href="/calculators/panic-selling">panic selling cost illustration</Link> to make asymmetry
        and timing risk more tangible. These are not predictions; they are arithmetic and history framed for
        learning.
      </p>

      <h2>Building a research culture inside an Indian asset-management context</h2>
      <p>
        India&apos;s capital markets have matured on multiple dimensions: broader participation, deeper
        derivatives liquidity in many names, improved market infrastructure, and a wider range of
        regulated wrappers for expressing equity views. That maturity does not make investing easy; it
        makes mistakes more expensive if investors confuse access with edge. A research culture is the
        institutional habit of writing assumptions down, testing them, admitting when they fail, and updating
        protocols rather than defending ego.
      </p>
      <p>
        In practice, that culture shows up in small, unglamorous choices: how a firm archives model
        changes, how it reviews liquidity during stress, how it handles corporate actions, how it documents
        client communications, and how it responds when a strategy&apos;s realised path diverges from its
        intended design. For prospective investors, the question is not whether a manager claims to be
        “data-driven.” Everyone claims that. The question is whether the firm can explain, in plain language,
        what would falsify its approach—what evidence would cause them to reduce risk, change a signal, or
        stop offering a product to certain client segments.
      </p>
      <p>
        MyNella&apos;s public materials emphasise systematic thinking across mandates—from discretionary
        PMS to research-driven model portfolios and algorithmic programmes—because the underlying challenge
        is the same: markets are noisy, humans are biased, and discipline is easier to advertise than to
        maintain. Leadership&apos;s job is to keep standards high when attention is scarce, especially
        during bull markets when risk feels invisible.
      </p>

      <h2>Diligence questions that reveal fit beyond the brochure</h2>
      <p>
        When you meet any portfolio manager, ask questions that separate process from storytelling. For
        example: What are the top three risks in the current portfolio construction, and how are they
        monitored? What drawdown range should a client mentally prepare for, based on the mandate&apos;s
        historical behaviour and structure—not a promise, but a scenario frame? How frequently will
        reporting arrive, and what does it include? How are fees calculated, and what happens in periods of
        negative performance? How does the firm handle liquidity if multiple clients redeem around the
        same time?
      </p>
      <p>
        Ask about conflicts and how they are disclosed. Ask how research and distribution interact. Ask
        what happens if key personnel change. These questions are not rude; they are the minimum standard
        for a relationship that may last a decade or longer. If answers feel evasive, that is data. If
        answers are precise—even when the message is uncomfortable—that is also data.
      </p>
      <p>
        You can pair those conversations with reading: MyNella&apos;s{" "}
        <Link href="/blog/polaris-vs-smallcase">Polaris PMS versus smallcase comparison</Link> helps
        clarify structural differences that are often blurred online. For taxation themes (not advice), see{" "}
        <Link href="/blog/tax-on-pms-returns">tax on PMS returns</Link> and discuss specifics with your
        chartered accountant.
      </p>

      <h2>How to engage MyNella if you are exploring a mandate</h2>
      <p>
        The firm&apos;s public materials are designed to help you narrow options before a conversation. If
        you are evaluating PMS, start with the <Link href="/pms">PMS overview</Link> and the{" "}
        <Link href="/pms/how-pms-works">how PMS works</Link> primer. If you are comparing structures, read{" "}
        <Link href="/pms/pms-vs-mutual-funds">PMS versus mutual funds</Link> and{" "}
        <Link href="/pms/pms-vs-smallcase">PMS versus smallcase baskets</Link> with an eye toward regulation,
        execution, and customization—not just headline returns.
      </p>
      <p>
        When you are ready, use the <Link href="/contact">contact page</Link> to book a strategy        conversation or reach the team by email. A good first meeting should feel like diligence, not a
        sales pitch: questions about process, risk, fees, reporting, and fit should be welcomed.
      </p>

      <p>
        Finally, remember that no article—however detailed—replaces the disclosures, agreement terms, and
        suitability conversations that should precede any investment decision. Treat this page as a map,
        not a destination: it orients you toward the questions that matter, then points you to primary
        sources and the MyNella team for specifics.
      </p>

      <div className={styles.callout}>
        <p>
          <strong>Important:</strong> Investments in securities markets are subject to risk. Past
          performance is not indicative of future results. This article is educational and does not
          constitute investment advice, an offer, or a recommendation to buy or sell any security or
          strategy.
        </p>
      </div>

      <section className={styles.related} aria-label="Further reading">
        <h2>Further reading on MyNella</h2>
        <ul>
          <li>
            <Link href="/about">About MyNella — team, registrations, and operating philosophy</Link>
          </li>
          <li>
            <Link href="/blog">Insights and research notes from the MyNella desk</Link>
          </li>
          <li>
            <Link href="/blog/understanding-risk-profile">Understanding risk profile for equity mandates</Link>
          </li>
        </ul>
      </section>
    </>
  );
}
