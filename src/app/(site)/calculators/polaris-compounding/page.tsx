import type { Metadata } from "next";
import { PolarisCompoundingCalculator } from "@/components/calculators/PolarisCompoundingCalculator";
import { calculatorPageMetadata } from "@/lib/calculator-pages";
import { SITE_URL } from "@/lib/seo-config";

const PAGE_URL = `${SITE_URL}/calculators/polaris-compounding`;

export async function generateMetadata(): Promise<Metadata> {
  return calculatorPageMetadata("/calculators/polaris-compounding");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Calculators", item: `${SITE_URL}/calculators` },
        { "@type": "ListItem", position: 3, name: "Polaris 1× → 110×", item: PAGE_URL },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Polaris 1× → 110× Compounding Calculator",
      description:
        "Interactive table modelling sequential capital doublings with tax, performance fee, and withdrawal assumptions aligned with MyNella Polaris messaging.",
      url: PAGE_URL,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a “cycle” in this calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "One cycle assumes your capital doubles in gross terms (100% return). Then 12.5% tax is applied to the gain, 20% performance fee on the post-tax gain, and you withdraw 10% of the capital you started the cycle with. The remainder is reinvested into the next cycle.",
          },
        },
        {
          "@type": "Question",
          name: "Is this the same as on the Polaris PMS page?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — it uses the same model and table as the compounding section on the MyNella Polaris PMS product page, so you can bookmark or share this calculator link directly.",
          },
        },
      ],
    },
  ],
};

export default function PolarisCompoundingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PolarisCompoundingCalculator />
    </>
  );
}
