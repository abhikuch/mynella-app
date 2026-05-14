import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FAQ, type FAQItem } from "@/components/ui/FAQ";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import {
  mergedEyebrow,
  mergedHeroText,
  pageMetadataForRoute,
} from "@/lib/page-copy-merge";
import { SITE_URL } from "@/lib/seo-config";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { ctaLinks } from "@/lib/navigation";
import styles from "./wealth-management-pune.module.css";

const PAGE_PATH = "/wealth-management-pune";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const KEYWORDS = [
  "wealth management companies pune",
  "finance companies in pune",
  "portfolio manager pune",
  "SEBI PMS Pune",
  "investment advisory Pune",
  "MyNella Pune",
];

/** Single source for visible FAQ + FAQPage JSON-LD (Search Console / AEO alignment). */
const WEALTH_PUNE_FAQ_ITEMS: FAQItem[] = [
  {
    question: "How should I compare wealth management companies in Pune?",
    answer:
      "Start with regulatory category: SEBI-registered Portfolio Management Services (PMS), SEBI Research Analyst (RA), mutual fund distribution (AMFI ARN), and other licensed activities are different services with different minimums and documentation. Verify registrations on SEBI’s records, read scheme/PMS documents, and ask how reporting and grievance handling work before allocating capital.",
  },
  {
    question: "Are “finance companies in Pune” the same as portfolio managers?",
    answer:
      "Not necessarily. The phrase can include banks, NBFCs, brokers, distributors, and registered investment managers. A discretionary PMS is a specific SEBI-regulated structure with defined minimums and agreements. Treat directory-style labels as a prompt to verify licences and product type, not as proof of a particular service.",
  },
  {
    question: "Is MyNella an investment bank?",
    answer:
      "No. MyNella Consultancy is a SEBI-registered Portfolio Manager (REG-NUMBER-PMS) and Research Analyst (REG-NUMBER-RA). It does not offer investment banking, lending, or deposit-taking services described in that category.",
  },
  {
    question: "What documents should I request before choosing a portfolio manager or wealth service in Pune?",
    answer:
      "Ask for SEBI registration proof for the exact legal entity, draft agreements, investor charters, sample reporting packs, fee schedules in writing, and grievance redressal details. Verify that names match across the website, agreements, and regulatory records. Do not transfer funds until contracts are reviewed—preferably with a chartered accountant when tax treatment matters.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Wealth management in Pune", item: PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: WEALTH_PUNE_FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: typeof item.answer === "string" ? item.answer : "",
        },
      })),
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute(
    "wealth-management-pune",
    null,
    PAGE_PATH,
    { keywords: KEYWORDS },
  );
}

export default async function WealthManagementPunePage() {
  const copy = await getPageCopy("wealth-management-pune");
  const eyebrow = mergedEyebrow(copy, "Pune investors");
  const h = mergedHeroText(copy, {
    line1: "Wealth management in Pune:",
    emphasis: "compare firms without category errors.",
    sub: "Regulated portfolio management and research look different from generic “finance company” lists. Use this page to separate SEBI PMS, RA, and distribution — then decide who to talk to next.",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className={styles.heroBand}>
        <div className={styles.heroInner}>
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
          <div className={styles.heroCtas}>
            <Button href={ctaLinks.bookCall} external>
              Book a conversation
            </Button>
            <Button href="/about" variant="ghost">
              About MyNella
            </Button>
          </div>
        </div>
      </div>

      <SectionWrapper>
        <h2 className={styles.h2}>What searches like “wealth management companies Pune” really mean</h2>
        <p className={styles.p}>
          Many investors begin with a city plus a broad label. The useful split is <strong>what licence</strong> a firm
          holds and <strong>what product</strong> you would actually sign — not the brand tagline. In India, common
          regulated lanes include discretionary PMS (high minimums, bespoke mandate), Research Analyst–led research
          and model portfolios, mutual fund distribution, and advisory structures. Each has different contracts,
          risks, and fee mechanics.
        </p>
        <p className={styles.p}>
          MyNella is headquartered in <strong>Pune</strong> and operates as a{" "}
          <strong>SEBI-registered Portfolio Manager</strong> and <strong>Research Analyst</strong>. This page is
          educational; it does not rank or review other firms. Use it to build a question list before you meet anyone —
          including us.
        </p>
      </SectionWrapper>

      <SectionWrapper variant="alt">
        <h2 className={styles.h2}>“Finance companies in Pune” — diligence checklist</h2>
        <ul className={styles.ul}>
          <li>Confirm the entity name matches SEBI/AMFI/RBI records for the activity advertised.</li>
          <li>Ask for the governing agreement (PMS agreement, research terms, or distribution form) before transferring money.</li>
          <li>Map who executes trades, where custody sits, and how you will receive contract notes and tax reporting.</li>
          <li>
            Read the{" "}
            <Link href="/disclosures">disclosures hub</Link> on any provider you evaluate — including MyNella.
          </li>
        </ul>
      </SectionWrapper>

      <SectionWrapper>
        <h2 className={styles.h2}>Investment banking vs portfolio management (plain English)</h2>
        <p className={styles.p}>
          Searches for <strong>investment banking companies in Pune</strong> often reflect confusion between corporate
          finance (capital raising, M&A advisory) and personal wealth management. A SEBI-registered PMS is not an
          investment bank; it manages client securities under a defined mandate within PMS regulations. If you need
          capital markets banking services, you would engage a different category of institution entirely.
        </p>
      </SectionWrapper>

      <SectionWrapper variant="alt">
        <h2 className={styles.h2}>Stress-test assumptions before you allocate</h2>
        <p className={styles.p}>
          Whether you work with MyNella or another manager, translate marketing percentages into rupees and recovery
          paths. Our{" "}
          <Link href="/calculators/drawdown-recovery">drawdown and stock loss recovery calculator</Link> shows how
          deep losses require larger percentage gains to break even — useful context when sizing equity risk.
        </p>
        <p className={styles.p}>
          Explore mandates on the <Link href="/pms">PMS hub</Link>, <Link href="/algo">algo hub</Link>, and{" "}
          <Link href="/model-portfolios">model portfolios</Link> pages, then use <Link href="/contact">contact</Link>{" "}
          when you are ready for a fit conversation.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <h2 className={styles.h2}>Common questions</h2>
        <p className={styles.p}>
          Short answers below mirror the structured data on this page for consistency between humans and search systems.
        </p>
        <div style={{ marginTop: 20 }}>
          <FAQ items={WEALTH_PUNE_FAQ_ITEMS} />
        </div>
      </SectionWrapper>
    </>
  );
}
