import Link from "next/link";
import { complianceFooterLinks } from "@/lib/compliance-links";
import styles from "../pillar-article.module.css";

/** Regulatory disclosures hub — educational framing; PDFs are source of truth. */
export function DisclosuresArticleBody() {
  return (
    <>
      <h1>Regulatory disclosures for MyNella investors</h1>
      <div className={styles.lede}>
        <p>
          This page brings together MyNella&apos;s key regulatory disclosures and compliance documents
          for investors evaluating—or already using—the firm&apos;s SEBI-registered Portfolio Management
          Service (PMS registration no. REG-NUMBER-PMS) and Research Analyst services (registration no.
          REG-NUMBER-RA). The goal is simple: make it easier to find primary documents, understand what they
          are for, and know how grievance and dispute-resolution pathways work in practice.
        </p>
        <p>
          Nothing here replaces the PDFs themselves, your signed agreements, or advice from qualified
          professionals. If a summary conflicts with a regulator-published document, the regulator-published
          document wins. When in doubt, download the latest file from this site or request it through{" "}
          <Link href="/contact">the contact page</Link>.
        </p>
      </div>

      <h2>Corporate entity and registrations: what the fine print is anchoring</h2>
      <p>
        MyNella Consultancy Pvt. Ltd. operates within India&apos;s company law framework; the firm&apos;s
        corporate identity number (CIN) is U74900PN2010PTC137497. Regulatory permissions are activity-specific:
        managing discretionary portfolios under the PMS route requires the PMS registration, while publishing
        research for client consideration under the RA route requires the Research Analyst registration.
        These are not interchangeable labels—each channel has its own compliance obligations and client-facing
        documentation norms.
      </p>
      <p>
        If you are evaluating any provider, a practical diligence step is to cross-check registrations on
        SEBI&apos;s public records and read the latest circulars that apply to the activity. Regulations evolve,
        and responsible investors update their understanding as rules change. This website cannot reproduce
        every circular in full; treat SEBI as the authoritative source for regulatory text.
      </p>
      <p>
        When you read MyNella&apos;s materials alongside these PDFs, you should see consistency: the same
        registration numbers, the same entity name, and the same clarity about which product falls under which
        permission. If anything ever looks inconsistent, treat it as a question to resolve before investing,
        not a detail to ignore.
      </p>

      <h2>Why disclosures matter more than marketing in regulated investing</h2>
      <p>
        In wealth management, marketing tells a story; disclosures define the contract between you and
        reality. SEBI&apos;s frameworks for PMS and Research Analyst activities exist precisely because
        asymmetric information is normal: the provider always knows more about the product mechanics than a
        typical client. Disclosures reduce that asymmetry by forcing clarity on fees, risks, conflicts,
        grievance routes, and the regulatory permissions that bound what can legally be offered.
      </p>
      <p>
        For Indian investors—especially those deploying larger sums where mistakes are costly—disclosures
        are also a diligence tool. A firm that treats compliance documents as buried PDFs is telling you
        something. A firm that places them prominently is not guaranteeing outcomes; it is making it easier
        for you to verify claims, compare structures, and ask better questions before you sign.
      </p>
      <p>
        If you are new to PMS, start with{" "}
        <Link href="/pms/how-pms-works">how portfolio management services work in India</Link>, then return
        here to download charters and status documents with context.
      </p>

      <h2>Investor charters: what they are—and what they are not</h2>
      <p>
        An investor charter is a regulatory instrument intended to set expectations about investor rights
        and responsibilities, as well as the service provider&apos;s commitments in key areas such as
        transparency and grievance handling. It is not a performance promise, and it is not a substitute
        for reading your specific agreement, offer documents (where applicable), and fee schedules.
      </p>
      <p>
        MyNella hosts separate charters for Research Analyst and PMS activities because the regulatory
        obligations and client journeys differ. If you are evaluating{" "}
        <Link href="/pms/polaris">Polaris PMS</Link>, the PMS charter is directly relevant. If you are
        evaluating research-driven model portfolios or other Research Analyst offerings described on the{" "}
        <Link href="/model-portfolios">model portfolios hub</Link>, the RA charter is a core reference.
      </p>
      <ul>
        <li>
          <a href="/legal/investor-charter-ra.pdf">Investor Charter — Research Analyst (PDF)</a>
        </li>
        <li>
          <a href="/legal/investor-charter-pms.pdf">Investor Charter — PMS (PDF)</a>
        </li>
      </ul>

      <h2>Compliant status disclosures: reading them without over-interpreting</h2>
      <p>
        “Compliant status” documents are part of the regulatory posture: they help investors and        supervisors understand whether the entity is operating within the compliance framework applicable to
        its registrations. These documents are not a market forecast, a rating, or an endorsement of any
        strategy&apos;s suitability for you personally.
      </p>
      <p>
        When you read compliant status materials, use them for what they are: a checkpoint in operational
        and regulatory hygiene. Pair that reading with questions about how reporting works, how portfolios
        are administered, and how client instructions are documented—especially for discretionary mandates
        where day-to-day decisions sit with the portfolio manager within the mandate&apos;s stated approach.
      </p>
      <ul>
        <li>
          <a href="/legal/compliant-status-ra.pdf">Compliant Status — Research Analyst (PDF)</a>
        </li>
        <li>
          <a href="/legal/compliant-status-pms.pdf">Compliant Status — PMS (PDF)</a>
        </li>
      </ul>

      <h2>Grievance redressal: escalation paths that protect both parties</h2>
      <p>
        Even in well-run firms, misunderstandings happen: a communication gap, a processing delay, a
        mismatch between client expectations and mandate design. A grievance mechanism is not an admission
        that problems are frequent; it is an admission that markets involve humans, and humans require
        process when friction appears.
      </p>
      <p>
        When you invest through regulated channels, treat grievance documentation like a map. Know the first
        step, the timelines, and what information you should keep (emails, account statements, agreement
        references). The goal is to resolve issues early, with facts, before positions harden. MyNella
        publishes a consolidated grievance redressal document here:
      </p>
      <ul>
        <li>
          <a href="/legal/grievance-redressal.pdf">Grievance Redressal (PDF)</a>
        </li>
      </ul>
      <p>
        If you are unsure whether something is a “grievance” versus a normal market outcome (for example,
        strategy underperformance during a broad equity correction), start with client servicing contact
        routes on the <Link href="/contact">contact page</Link>. Many issues are clarified with reporting        and context; true grievances deserve the formal path.
      </p>

      <h2>Accredited investor frameworks: why they exist in Indian markets</h2>
      <p>
        Regulatory frameworks sometimes differentiate investors who can access certain complex or
        higher-risk structures from those who should not, based on experience, net worth, or income
        thresholds—exact criteria evolve and must be verified from current rules and your own situation. The
        intent is consumer protection: some strategies are harder to understand, more volatile, or more
        operationally intricate, and not every investor has the margin of safety to bear those risks.
      </p>
      <p>
        MyNella hosts the accredited investor framework document for transparency. Whether a particular
        mandate requires accredited investor status depends on the product, channel, and prevailing        regulations. Do not assume; verify in disclosures and in direct conversation with the firm.
      </p>
      <ul>
        <li>
          <a href="/legal/accredited-investor.pdf">Accredited Investor Framework (PDF)</a>
        </li>
      </ul>

      <h2>Online Dispute Resolution (ODR): when an external portal is appropriate</h2>
      <p>
        The ODR portal is an external mechanism intended to support dispute resolution in eligible cases.
        MyNella links to the Smart ODR portal as a regulatory reference point. It is not a substitute for
        speaking with the firm first when the issue may be informational, and it is not a “fast track” for
        investment losses caused by market risk rather than service failure.
      </p>
      <p>
        Think of ODR as part of a layered system: direct resolution, internal escalation, regulatory
        pathways where applicable, and dispute resolution infrastructure where appropriate. The right layer
        depends on facts.
      </p>
      <ul>
        <li>
          <a href="https://smartodr.in/login" rel="noopener noreferrer">
            Smart ODR portal (external)
          </a>
        </li>
      </ul>

      <h2>Common misconceptions investors should avoid</h2>
      <p>
        First, a disclosure pack is not “due diligence completed.” It is the baseline. You still need to
        understand the mandate, the risks, the liquidity terms, and whether the strategy matches your
        horizon. Second, a compliant status document is not a substitute for performance analysis—nor is
        performance analysis a substitute for understanding drawdowns and tail risks. Third, reading a
        charter does not mean you understand the agreement you will sign; agreements contain specifics that
        charters summarise at a high level.
      </p>
      <p>
        If you notice yourself rushing because markets are moving fast, pause. Speed is an enemy of good
        decisions in product selection. The market will still be there after you read, ask questions, and
        sleep on large commitments.
      </p>

      <h2>Quick directory: all compliance links in one list</h2>
      <p>
        The following list mirrors the site&apos;s standard footer compliance set. Bookmark this section if
        you want a single place to download everything before signing agreements.
      </p>
      <ul>
        {complianceFooterLinks.map((l) => (
          <li key={l.href}>
            <a href={l.href} {...(l.href.startsWith("http") ? { rel: "noopener noreferrer" } : {})}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <h2>How to use these documents alongside MyNella&apos;s public education pages</h2>
      <p>
        Disclosures answer “What are we allowed to do, and how must we behave?” Education pages answer
        “How should I think about risk, structure, and fit?” Together, they support better decisions. If
        you are comparing wrappers, read{" "}
        <Link href="/blog/pms-vs-aif">PMS versus AIF</Link> and{" "}
        <Link href="/pms/pms-vs-mutual-funds">PMS versus mutual funds</Link>. If you are focused on tax
        themes at a high level (not personal advice), read{" "}
        <Link href="/blog/tax-on-pms-returns">tax on PMS returns</Link> and involve a chartered accountant
        before acting.
      </p>
      <p>
        For operational orientation on minimums and eligibility illustrations, see the{" "}
        <Link href="/calculators/min-ticket">minimum ticket checker</Link>. For drawdown psychology and
        recovery arithmetic, see the{" "}
        <Link href="/calculators/drawdown-recovery">drawdown recovery calculator</Link>.
      </p>

      <h2>Records, statements, and reporting: what to keep as an investor</h2>
      <p>
        Good disclosure hygiene is bilateral: regulators require firms to publish certain documents, but
        investors also benefit from maintaining their own records. Keep copies of agreements, fee schedules,
        risk disclosures, onboarding confirmations, and periodic portfolio statements in a secure place.
        If you ever need to reconstruct a timeline—whether for tax filing support or for a servicing
        question—those records matter as much as market commentary.
      </p>
      <p>
        If you use multiple channels (for example, a PMS alongside direct equities or mutual funds), keep
        the roles separate in your mind and in your files. Different wrappers have different reporting
        conventions, and mixing them mentally can lead to incorrect conclusions about exposure, leverage,
        or cash balances.
      </p>

      <h2>NRIs and overseas persons: extra layers of rules may apply</h2>
      <p>
        If you are not a resident Indian investor, additional constraints may apply: exchange control rules,
        tax residency, permissible routes for investing in Indian securities, and documentation standards.
        This site cannot address every jurisdiction-specific issue. Treat overseas investing as its own
        diligence workstream involving qualified legal and tax counsel in both countries where relevant.
      </p>
      <p>
        When in doubt, ask early. It is cheaper to clarify eligibility before transferring funds than to
        unwind a structure that never complied with applicable rules.
      </p>

      <h2>What MyNella will—and will not—claim on this website</h2>
      <p>
        MyNella will explain processes, regulations at a high level, and product structures as they are
        commonly understood in Indian markets. MyNella will not guarantee returns, will not tell you that
        any strategy is “safe,” and will not use disclosures as a marketing trick to bypass diligence. If
        you want certainty, equities are the wrong asset class; if you want a regulated, documented        framework for taking equity risk with professional management, PMS and related channels may be worth
        exploring—subject to fit.
      </p>
      <p>
        Market risk includes the possibility of loss. Past performance is not indicative of future results.
        Investors should read all scheme-/mandate-related documents carefully before investing.
      </p>

      <div className={styles.callout}>
        <p>
          <strong>Note:</strong> PDF filenames and paths may be updated for consistency; if a link fails,
          return to this hub or email the team via the contact page for the latest copy.
        </p>
      </div>

      <section className={styles.related} aria-label="Related pages">
        <h2>Related pages</h2>
        <ul>
          <li>
            <Link href="/pms">Portfolio management services overview</Link>
          </li>
          <li>
            <Link href="/terms">Terms and conditions</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy policy</Link>
          </li>
        </ul>
      </section>
    </>
  );
}
