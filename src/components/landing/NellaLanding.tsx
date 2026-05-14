import Link from "next/link";
import { fraunces, dmSans } from "@/lib/fonts";
import { LandingWaitlistForm } from "@/components/landing/LandingWaitlistForm";
import { TrackedLink } from "@/components/landing/TrackedLink";
import styles from "./nella-landing.module.css";

export type LandingFaqItem = { question: string; answer: string };

export interface NellaLandingCopy {
  eyebrow?: string;
  heroTitle?: string;
  heroTitleAccent?: string;
  heroLead?: string;
  primaryCta?: string;
  secondaryCta?: string;
}

const defaultCopy: Required<NellaLandingCopy> = {
  eyebrow: "The companion app",
  heroTitle: "Your treatments,",
  heroTitleAccent: "one calm thread.",
  heroLead:
    "Nella is the personal layer for aesthetic care: fewer tabs, fewer “did I already do that?” moments, and a gentle rhythm while the full app ships.",
  primaryCta: "Join the waitlist",
  secondaryCta: "About MyNella",
};

const DEFAULT_FAQ: LandingFaqItem[] = [
  {
    question: "Is this medical advice?",
    answer:
      "No. Nella is a personal organization companion — not a clinician, not a diagnosis tool, and not a substitute for your provider’s instructions.",
  },
  {
    question: "What data do you collect on this waitlist?",
    answer:
      "We store your email and India mobile number to contact you about launches and early access. See the Privacy Policy for retention and your rights.",
  },
  {
    question: "When will the app be available?",
    answer:
      "We are in active development. Waitlist members hear first when private beta or public launch dates are set.",
  },
  {
    question: "What is MyNella vs Nella?",
    answer:
      "MyNella is this marketing site and editorial home. Nella is the companion app we are building — developed on a separate track from these pages.",
  },
];

export function NellaLanding({
  copy,
  pills,
  faq,
}: {
  copy?: NellaLandingCopy | null;
  pills: string[];
  faq?: LandingFaqItem[] | null;
}) {
  const c: Required<NellaLandingCopy> = {
    ...defaultCopy,
    ...(copy ?
      Object.fromEntries(
        Object.entries(copy).filter(
          ([, v]) => v !== undefined && v !== null && String(v).trim() !== "",
        ),
      )
    : {}),
  };
  const fontVars = `${fraunces.variable} ${dmSans.variable}`;
  const faqItems =
    faq && faq.length > 0 ? faq
    : DEFAULT_FAQ;
  const privacyHref = "/privacy";

  return (
    <div className={`${styles.root} ${fontVars}`}>
      <a className={styles.skip} href="#nl-main">
        Skip to content
      </a>

      <header className={styles.topBar}>
        <TrackedLink href="/" className={styles.brand} eventName="cta_click" eventParams={{ target: "logo_home" }}>
          Nell<em>a</em>
        </TrackedLink>
        <nav className={styles.nav} aria-label="Marketing">
          <TrackedLink
            className={styles.navLink}
            href="/about"
            eventName="cta_click"
            eventParams={{ target: "nav_about" }}
          >
            About
          </TrackedLink>
          <TrackedLink
            className={styles.navLink}
            href="/contact"
            eventName="cta_click"
            eventParams={{ target: "nav_contact" }}
          >
            Contact
          </TrackedLink>
          <TrackedLink
            className={`${styles.navLink} ${styles.navLinkEm}`}
            href="#nl-waitlist"
            eventName="cta_click"
            eventParams={{ target: "nav_waitlist" }}
          >
            Waitlist
          </TrackedLink>
        </nav>
      </header>

      <main id="nl-main">
        <section className={styles.hero} aria-labelledby="nl-hero-heading">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <p className={styles.brandClarify}>
              <strong>MyNella</strong> is this site — updates, editorial, and the waitlist.{" "}
              <strong>Nella</strong> is the app we&apos;re building.
            </p>
            <h1 id="nl-hero-heading" className={styles.heroTitle}>
              {c.heroTitle}{" "}
              <span className={styles.heroTitleAccent}>{c.heroTitleAccent}</span>
            </h1>
            <p className={styles.heroLead}>{c.heroLead}</p>
            {pills.length > 0 ? (
              <p className={styles.signalLine}>{pills.filter(Boolean).join(" · ")}</p>
            ) : null}
            <div className={styles.ctaRow}>
              <TrackedLink
                className={styles.ctaPrimary}
                href="#nl-waitlist"
                eventName="cta_click"
                eventParams={{ target: "hero_primary_waitlist" }}
              >
                {c.primaryCta}
                <span className={styles.ctaArrow} aria-hidden>
                  →
                </span>
              </TrackedLink>
              <TrackedLink
                className={styles.ctaGhost}
                href="/about"
                eventName="cta_click"
                eventParams={{ target: "hero_secondary_about" }}
              >
                {c.secondaryCta}
              </TrackedLink>
            </div>
          </div>

          <div id="nl-waitlist" className={styles.waitlistBand}>
            <LandingWaitlistForm placement="landing-hero" privacyHref={privacyHref} />
          </div>
        </section>

        <aside className={styles.trustStrip} aria-label="Site and product">
          <p>
            We read every waitlist message — it shapes what we build next. For press, partnerships, or care
            questions, use{" "}
            <Link href="/contact" className={styles.trustLink}>
              Contact
            </Link>
            .
          </p>
        </aside>

        <section className={`${styles.section} ${styles.sectionMuted}`} aria-labelledby="nl-flow-heading">
          <div className={styles.sectionInner}>
            <p className={styles.eyebrow}>How we think about it</p>
            <h2 id="nl-flow-heading" className={styles.sectionTitle}>
              Clarity before cleverness.
            </h2>
            <p className={styles.sectionLead}>
              We are not rebuilding a clinic portal. Nella is a personal layer: fewer tabs, fewer
              &quot;did I already do that?&quot; moments, and a gentle rhythm that respects how skin
              actually heals.
            </p>
            <div className={styles.flowGrid}>
              <article className={styles.flowCard}>
                <p className={styles.flowStep}>01</p>
                <h3 className={styles.flowCardTitle}>Capture the plan</h3>
                <p className={styles.flowCardBody}>
                  What you are trying, when you go back, and the one or two things your provider
                  asked you to prioritize — captured in plain language.
                </p>
              </article>
              <article className={styles.flowCard}>
                <p className={styles.flowStep}>02</p>
                <h3 className={styles.flowCardTitle}>Stay in rhythm</h3>
                <p className={styles.flowCardBody}>
                  Lightweight check-ins and timelines that read like a human wrote them, not a
                  spreadsheet. Enough structure to help; never enough to nag.
                </p>
              </article>
              <article className={styles.flowCard}>
                <p className={styles.flowStep}>03</p>
                <h3 className={styles.flowCardTitle}>Close the loop</h3>
                <p className={styles.flowCardBody}>
                  Aftercare and follow-ups sit next to the visit they belong to — so context does not
                  scatter across apps and screenshots.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="nl-features-heading">
          <div className={styles.sectionInner}>
            <p className={styles.eyebrow}>What we are building</p>
            <h2 id="nl-features-heading" className={styles.sectionTitle}>
              Designed for the in-between days.
            </h2>
            <p className={styles.sectionLead}>
              These are product directions, not promises on a spec sheet. The shipped app may look
              different — the intent is steady: reduce cognitive load around aesthetic care.
            </p>
            <div className={styles.featureGrid}>
              <article className={styles.featureCard}>
                <p className={styles.featureIndex} aria-hidden>
                  1
                </p>
                <h3 className={styles.featureTitle}>One timeline</h3>
                <p className={styles.featureBody}>
                  Visits, home routines, and notes share a single thread so you are never hunting for
                  &quot;what did we decide last time?&quot;
                </p>
              </article>
              <article className={styles.featureCard}>
                <p className={styles.featureIndex} aria-hidden>
                  2
                </p>
                <h3 className={styles.featureTitle}>Tasteful signals</h3>
                <p className={styles.featureBody}>
                  Status and urgency use color with restraint — sage for done, gold for soon, rose
                  when something actually needs attention.
                </p>
              </article>
              <article className={styles.featureCard}>
                <p className={styles.featureIndex} aria-hidden>
                  3
                </p>
                <h3 className={styles.featureTitle}>Share on your terms</h3>
                <p className={styles.featureBody}>
                  Monthly snapshots and summaries you can share with a trusted person — or keep
                  entirely to yourself.
                </p>
              </article>
            </div>

            <aside className={styles.quoteBand} aria-label="Brand note">
              <p className={styles.quoteText}>
                &ldquo;We want the product to feel embossed, warm, and cinematic in the right
                moments — never loud.&rdquo;
              </p>
              <p className={styles.quoteMeta}>From the Nella design language</p>
            </aside>
          </div>
        </section>

        <section className={styles.faqSection} aria-labelledby="nl-faq-heading">
          <div className={styles.sectionInner}>
            <p className={styles.eyebrow}>Questions</p>
            <h2 id="nl-faq-heading" className={styles.sectionTitle}>
              Before you join.
            </h2>
            <dl className={styles.faqList}>
              {faqItems.map((item, index) => (
                <div key={`${index}-${item.question.slice(0, 24)}`} className={styles.faqItem}>
                  <dt className={styles.faqQ}>{item.question}</dt>
                  <dd className={styles.faqA}>{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className={styles.bottomCta} aria-labelledby="nl-cta-heading">
          <div className={styles.bottomInner}>
            <div className={styles.bottomCopy}>
              <h2 id="nl-cta-heading" className={styles.bottomTitle}>
                Be first when the app opens up.
              </h2>
              <p className={styles.bottomLead}>
                Tell us what you wish existed for your own routine. We read every message — it
                shapes what we build next.
              </p>
            </div>
            <LandingWaitlistForm
              placement="landing-bottom"
              privacyHref={privacyHref}
              title="Join from here too"
              tone="dark"
            />
          </div>
        </section>
      </main>

      <footer className={styles.siteFooter}>
        <div className={styles.footerInner}>
          <div className={styles.footerLinks}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <p className={styles.footerNote}>
            Nella is developed separately from this marketing site (MyNella). Nothing here is
            medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
