import type { Metadata } from "next";
import { getMergedPortfoliosByFamily } from "@/lib/model-portfolios-resolve";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { PortfolioGrid } from "@/components/sections/PortfolioListing";
import { ListingPageHeader } from "@/components/sections/ListingPageHeader";
import {
  MPSeriesIntro,
  MPExplainer,
  MPPhilosophy,
  MPWhyMyNella,
  MPFAQSection,
  MPCTA,
} from "@/components/sections/ModelPortfoliosLanding";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { getFaqByPlacement } from "@/sanity/lib/faq";
import { listingStyles } from "@/components/sections/PortfolioListing";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute(
    "model-portfolios-quanto",
    {
      title: "Quanto Series",
      description:
        "Cap-segment quantitative model portfolios spanning Large Cap, Mid Cap, Small Cap, Multi Cap, Flexi Cap, and Microcap.",
    },
    "/model-portfolios/quanto",
  );
}

export default async function QuantoPage() {
  const [copy, quantoPortfolios, faqItems] = await Promise.all([
    getPageCopy("model-portfolios-quanto"),
    getMergedPortfoliosByFamily("quanto"),
    getFaqByPlacement("model-portfolios"),
  ]);
  return (
    <>
      <FaqJsonLd items={faqItems} />
      <MPSeriesIntro series="quanto" />
      <MPExplainer />
      <MPPhilosophy />

      <SectionWrapper id="portfolios">
        <div className={listingStyles.familySection} style={{ marginTop: 0 }}>
          <ListingPageHeader
            copy={copy}
            eyebrow="Model Portfolios · Quanto"
            title="Quanto Series"
            lead="Cap-segment quantitative model portfolios — systematic, factor-driven strategies for every market segment. Choose the cap-size that matches your risk profile."
          />
          <PortfolioGrid portfolios={quantoPortfolios} />
        </div>
      </SectionWrapper>

      <MPWhyMyNella />
      <MPFAQSection faqModule={null} items={faqItems} />
      <MPCTA />
    </>
  );
}
