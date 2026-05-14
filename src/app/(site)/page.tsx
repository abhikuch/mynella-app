import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { getSiteSettings } from "@/sanity/lib/site";
import { getResolvedSiteChrome } from "@/sanity/lib/siteChrome";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute(
    "home",
    null,
    "/",
  );
}

export default async function HomePage() {
  const [settings, chrome, homeCopy] = await Promise.all([
    getSiteSettings(),
    getResolvedSiteChrome(),
    getPageCopy("home"),
  ]);

  const introTitle = homeCopy?.heroTitleLine1?.trim() || "Looks you can live in";
  const introEm = homeCopy?.heroTitleEmphasis?.trim() || "Honest reviews & tutorials";
  const introSub =
    homeCopy?.heroSubtitle?.trim() ||
    "MyNella is built for beauty lovers who want editorial depth without the noise. Explore routines, ingredient callouts, and launch coverage — then tell us what you want to see next.";

  return (
    <>
      <Hero settings={settings} chrome={chrome} />

      <SectionWrapper id="intro">
        <Eyebrow>{homeCopy?.contentEyebrow?.trim() || "Editorial"}</Eyebrow>
        <h2 className={styles.h2}>
          {introTitle} <em className={styles.em}>{introEm}</em>
        </h2>
        <p className={styles.lead}>{introSub}</p>
      </SectionWrapper>

      <SectionWrapper variant="alt" id="stack">
        <Eyebrow>For operators</Eyebrow>
        <h2 className={styles.h2}>SEO, Sanity, Vercel, Git — already wired.</h2>
        <p className={styles.lead}>
          This repo is intentionally lean: one marketing surface you can extend with real catalog or app links later.
          Content editors use Sanity; engineers ship through Git and Vercel previews.
        </p>
        <div className={styles.ctaRow}>
          <Button href="/about">About MyNella</Button>
          <Button href="/contact" variant="ghost">
            Contact
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
