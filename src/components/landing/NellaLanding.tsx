import Link from "next/link";
import { fraunces, dmSans } from "@/lib/fonts";
import styles from "./nella-landing.module.css";

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
    "Nella helps you remember what you booked, what comes next, and how to care for your skin between visits — without the group-chat noise. The full app is in development; this page is an early glimpse of the world we are building.",
  primaryCta: "Get updates",
  secondaryCta: "About this site",
};

export function NellaLanding({ copy }: { copy?: NellaLandingCopy | null }) {
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

  return (
    <div className={`${styles.root} ${fontVars}`}>
      <a className={styles.skip} href="#nl-main">
        Skip to content
      </a>

      <header className={styles.topBar}>
        <Link href="/" className={styles.brand}>
          Nell<em>a</em>
        </Link>
        <nav className={styles.nav} aria-label="Marketing">
          <Link className={styles.navLink} href="/about">
            About
          </Link>
          <Link className={styles.navLink} href="/contact">
            Contact
          </Link>
          <Link className={styles.navLink} href="/contact">
            {c.primaryCta}
          </Link>
        </nav>
      </header>

      <main id="nl-main">
        <section className={styles.hero} aria-labelledby="nl-hero-heading">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h1 id="nl-hero-heading" className={styles.heroTitle}>
              {c.heroTitle}{" "}
              <span className={styles.heroTitleAccent}>{c.heroTitleAccent}</span>
            </h1>
            <p className={styles.heroLead}>{c.heroLead}</p>
            <div className={styles.pillRow} role="list">
              <span className={styles.pill} role="listitem">
                Visits &amp; reminders
              </span>
              <span className={styles.pill} role="listitem">
                Aftercare nudges
              </span>
              <span className={`${styles.pill} ${styles.pillSage}`} role="listitem">
                Private by default
              </span>
            </div>
            <div className={styles.ctaRow}>
              <Link className={styles.ctaPrimary} href="/contact">
                {c.primaryCta}
                <span className={styles.ctaArrow} aria-hidden>
                  →
                </span>
              </Link>
              <Link className={styles.ctaGhost} href="/about">
                {c.secondaryCta}
              </Link>
            </div>
          </div>
        </section>

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
                <div className={styles.featureIcon} aria-hidden />
                <h3 className={styles.featureTitle}>One timeline</h3>
                <p className={styles.featureBody}>
                  Visits, home routines, and notes share a single thread so you are never hunting for
                  &quot;what did we decide last time?&quot;
                </p>
              </article>
              <article className={styles.featureCard}>
                <div className={styles.featureIcon} aria-hidden />
                <h3 className={styles.featureTitle}>Tasteful signals</h3>
                <p className={styles.featureBody}>
                  Status and urgency use color with restraint — sage for done, gold for soon, rose
                  when something actually needs attention.
                </p>
              </article>
              <article className={styles.featureCard}>
                <div className={styles.featureIcon} aria-hidden />
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

        <section className={styles.bottomCta} aria-labelledby="nl-cta-heading">
          <div className={styles.bottomInner}>
            <div>
              <h2 id="nl-cta-heading" className={styles.bottomTitle}>
                Be first when the app opens up.
              </h2>
              <p className={styles.bottomLead}>
                Tell us what you wish existed for your own routine. We read every message — it
                shapes what we build next.
              </p>
            </div>
            <Link className={`${styles.ctaPrimary} ${styles.ctaOnDark}`} href="/contact">
              {c.primaryCta}
              <span className={styles.ctaArrow} aria-hidden>
                →
              </span>
            </Link>
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
