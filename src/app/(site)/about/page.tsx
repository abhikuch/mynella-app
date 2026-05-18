import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPageShell } from "@/components/landing/MarketingPageShell";
import shell from "@/components/landing/marketing-shell.module.css";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { getSiteSettings } from "@/sanity/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute(
    "about",
    {
      title: "About MyNella",
      description:
        "How MyNella and the Nella companion app think about calm aesthetic care, visits, and aftercare.",
    },
    "/about",
  );
}

export default async function AboutPage() {
  const [settings, aboutCopy] = await Promise.all([getSiteSettings(), getPageCopy("about")]);

  const title1 = settings?.aboutTitleLine1?.trim() || "Built for calm";
  const titleEm = settings?.aboutTitleEmphasis?.trim() || "between visits.";
  const sub = settings?.aboutSub?.trim() || aboutCopy?.heroSubtitle?.trim() || "";

  return (
    <MarketingPageShell activeNav="about">
      <section className={shell.pageHero} aria-labelledby="about-heading">
        <div className={shell.pageHeroInner}>
          <p className={shell.eyebrow}>{aboutCopy?.contentEyebrow?.trim() || "About"}</p>
          <h1 id="about-heading" className={shell.pageTitle}>
            {title1} <em>{titleEm}</em>
          </h1>
          {sub ? <p className={shell.pageLead}>{sub}</p> : null}
          <p className={shell.pageLead}>
            MyNella is the public home for <strong>Nella</strong> — a calm companion for visits,
            aftercare, and the space between appointments. We ship updates here first: waitlist, launch
            notes, and how we think about the product.
          </p>
          <div className={shell.ctaRow}>
            <Link href="/contact" className={shell.ctaPrimary}>
              Contact us
            </Link>
            <Link href="/#nl-waitlist" className={shell.ctaGhost}>
              Join waitlist
            </Link>
          </div>
        </div>
      </section>

      <section className={`${shell.section} ${shell.sectionMuted}`} aria-labelledby="about-story-heading">
        <div className={shell.sectionInner}>
          <h2 id="about-story-heading" className={shell.sectionTitle}>
            How we think
          </h2>
          <p className={shell.body}>
            Beauty and aesthetic care should feel organized, not noisy. Nella is the personal layer —
            fewer tabs, fewer &ldquo;did I already do that?&rdquo; moments, and a gentle rhythm while the
            full app ships.
          </p>
          <p className={shell.body}>
            MyNella is separate: editorial, waitlist, and transparency while we build. Nothing on this
            site is medical advice.
          </p>
        </div>
      </section>

      <section className={shell.section} aria-labelledby="about-build-heading">
        <div className={shell.sectionInner}>
          <h2 id="about-build-heading" className={shell.sectionTitle}>
            What we are building
          </h2>
          <ul className={shell.list}>
            <li>Visit memory and gentle reminders between appointments</li>
            <li>Aftercare notes you can trust without group-chat noise</li>
            <li>A calm thread for your routine — private by default</li>
          </ul>
          <div className={shell.ctaRow}>
            <Link href="/" className={shell.ctaGhost}>
              Back home
            </Link>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
