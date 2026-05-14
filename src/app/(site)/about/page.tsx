import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { getSiteSettings } from "@/sanity/lib/site";
import aboutLocalStyles from "./about-local.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute(
    "about",
    {
      title: "About MyNella",
      description: "How MyNella thinks about beauty content, collaborators, and the stack behind the site.",
    },
    "/about",
  );
}

export default async function AboutPage() {
  const [settings, aboutCopy] = await Promise.all([getSiteSettings(), getPageCopy("about")]);

  const title1 = settings?.aboutTitleLine1?.trim() || "Built for creators";
  const titleEm = settings?.aboutTitleEmphasis?.trim() || "and curious readers.";
  const sub = settings?.aboutSub?.trim() || aboutCopy?.heroSubtitle?.trim() || "";

  return (
    <>
      <SectionWrapper>
        <Eyebrow>{aboutCopy?.contentEyebrow?.trim() || "About"}</Eyebrow>
        <h1 className={aboutLocalStyles.h1}>
          {title1} <em>{titleEm}</em>
        </h1>
        {sub ? <p className={aboutLocalStyles.p}>{sub}</p> : null}
        <p className={aboutLocalStyles.p}>
          MyNella is not a finance product. This repository keeps the essentials — Next.js for pages, Sanity for structured
          content, Vercel for hosting, and Git for change control — so your team can focus on campaigns, launches, and
          storytelling.
        </p>
        <div className={aboutLocalStyles.actions}>
          <Button href="/contact">Work with us</Button>
          <Button href="/" variant="ghost">
            Back home
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
