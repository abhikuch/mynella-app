import type { Metadata } from "next";
import Link from "next/link";
import {
  AboutHero,
  AboutTeam,
  AboutCredentials,
  AboutFAQ,
  AboutCTA,
} from "@/components/sections/AboutLanding";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { companyLinkedIn } from "@/lib/company-profile";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { getSiteSettings, getTeamMembersFromCms } from "@/sanity/lib/site";
import { getFaqByPlacement } from "@/sanity/lib/faq";
import { Marquee } from "@/components/sections/Marquee";
import { marqueeItemsFromPageCopy } from "@/lib/page-marquee";
import aboutLocalStyles from "./about-local.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute(
    "about",
    {
      title: "About MyNella — SEBI PMS & Research Analyst in Pune",
      description: `${companyLinkedIn.tagline} ${companyLinkedIn.headquarters} · SEBI registrations, team, and systematic mandates.`,
    },
    "/about",
  );
}

export default async function AboutPage() {
  const [settings, cmsTeam, faqItems, aboutCopy] = await Promise.all([
    getSiteSettings(),
    getTeamMembersFromCms(),
    getFaqByPlacement("about"),
    getPageCopy("about"),
  ]);
  const marqueeItems = marqueeItemsFromPageCopy(aboutCopy, "about");

  return (
    <>
      <FaqJsonLd items={faqItems} />
      <AboutHero settings={settings} />
      <Marquee items={marqueeItems} />
      <SectionWrapper>
        <Eyebrow>Pune</Eyebrow>
        <h2 className={aboutLocalStyles.h2}>Evaluating wealth management firms in Pune?</h2>
        <p className={aboutLocalStyles.p}>
          MyNella is based in Pune and regulated as a SEBI Portfolio Manager and Research Analyst — not a generic
          directory listing. If you arrived from searches like{" "}
          <strong>wealth management companies Pune</strong> or <strong>finance companies in Pune</strong>, read our
          short guide on how to compare licences and products, then return here for team and registration detail.
        </p>
        <p className={aboutLocalStyles.p}>
          <Link href="/wealth-management-pune" className={aboutLocalStyles.link}>
            Wealth management in Pune — how to compare firms
          </Link>
          {" · "}
          <Link href="/calculators/drawdown-recovery" className={aboutLocalStyles.link}>
            Drawdown &amp; stock loss recovery calculator
          </Link>
        </p>
      </SectionWrapper>
      <AboutTeam settings={settings} cmsTeam={cmsTeam} />
      <AboutCredentials />
      <AboutFAQ items={faqItems} />
      <AboutCTA />
    </>
  );
}
