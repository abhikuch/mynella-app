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
    "model-portfolios-alpha",
    {
      title: "Alpha Series",
      description:
        "Momentum-driven concentrated stock picks from Nifty 100, 200, and 500 universes.",
    },
    "/model-portfolios/alpha",
  );
}

export default async function AlphaPage() {
  const [copy, alphaPortfolios, faqItems] = await Promise.all([
    getPageCopy("model-portfolios-alpha"),
    getMergedPortfoliosByFamily("alpha"),
    getFaqByPlacement("model-portfolios"),
  ]);
  return (
    <>
      <FaqJsonLd items={faqItems} />
      <MPSeriesIntro series="alpha" />
      <MPExplainer />
      <MPPhilosophy />

      <SectionWrapper id="portfolios">
        <div className={listingStyles.familySection} style={{ marginTop: 0 }}>
          <ListingPageHeader
            copy={copy}
            eyebrow="Model Portfolios · Alpha"
            title="Alpha Series"
            lead="Momentum-driven concentrated stock picks. Top 10 highest-conviction positions across Nifty 100, 200, and 500 universes — rebalanced monthly for maximum alpha."
          />
          <PortfolioGrid portfolios={alphaPortfolios} />
        </div>
      </SectionWrapper>

      <MPWhyMyNella />
      <MPFAQSection faqModule={null} items={faqItems} />
      <MPCTA />
    </>
  );
}
