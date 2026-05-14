import type { Metadata } from "next";
import { getMergedPortfoliosByFamily } from "@/lib/model-portfolios-resolve";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { PortfolioGrid, listingStyles } from "@/components/sections/PortfolioListing";
import {
  MPHero,
  MPExplainer,
  MPPhilosophy,
  MPWhyMyNella,
  MPFAQSection,
  MPCTA,
} from "@/components/sections/ModelPortfoliosLanding";
import { marketingHubMetadata } from "@/lib/page-copy-merge";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { getFaqByPlacement } from "@/sanity/lib/faq";
import { firstModFaqSection, getMarketingPageByRouteKey } from "@/sanity/lib/marketingPage";
import { getPageCopy } from "@/sanity/lib/pageCopy";

export async function generateMetadata(): Promise<Metadata> {
  return marketingHubMetadata(
    "model-portfolios",
    "model-portfolios",
    {
      title: "Model equity portfolios",
      description:
        "Concentrated, data-driven stock portfolios across market-cap segments — built on momentum, quality, and quantitative discipline.",
    },
    "/model-portfolios",
  );
}

export default async function ModelPortfoliosPage() {
  const [copy, quantoPortfolios, alphaPortfolios, marketing, faqItems] = await Promise.all([
    getPageCopy("model-portfolios"),
    getMergedPortfoliosByFamily("quanto"),
    getMergedPortfoliosByFamily("alpha"),
    getMarketingPageByRouteKey("model-portfolios"),
    getFaqByPlacement("model-portfolios"),
  ]);
  const faqModule = firstModFaqSection(marketing);
  return (
    <>
      <FaqJsonLd items={faqItems} />
      <MPHero copy={copy} />
      <MPExplainer />
      <MPPhilosophy />

      <SectionWrapper id="portfolios">
        <div className={listingStyles.familySection} style={{ marginTop: 0 }}>
          <div className={listingStyles.familyTitle}>
            <span className={listingStyles.familyDot} />
            <h3>Quanto Series</h3>
          </div>
          <PortfolioGrid portfolios={quantoPortfolios} />
        </div>

        <div className={listingStyles.familySection}>
          <div className={listingStyles.familyTitle}>
            <span className={listingStyles.familyDot} />
            <h3>Alpha Series</h3>
          </div>
          <PortfolioGrid portfolios={alphaPortfolios} />
        </div>
      </SectionWrapper>

      <MPWhyMyNella />
      <MPFAQSection faqModule={faqModule} items={faqItems} />
      <MPCTA />
    </>
  );
}
