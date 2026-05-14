import type { Metadata } from "next";
import { DoublingTimeCalculator } from "@/components/calculators/DoublingTimeCalculator";
import { calculatorPageMetadata } from "@/lib/calculator-pages";
import { SITE_URL } from "@/lib/seo-config";

const PAGE_URL = `${SITE_URL}/calculators/time-to-double`;

export async function generateMetadata(): Promise<Metadata> {
  return calculatorPageMetadata("/calculators/time-to-double");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Calculators", item: `${SITE_URL}/calculators` },
        { "@type": "ListItem", position: 3, name: "Time to 100% Return", item: PAGE_URL },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Time to 100% Return — Doubling Time Calculator",
      description:
        "Estimate how long it takes to double your capital at a given annual return, using annual compounding. Includes Rule of 72 comparison.",
      url: PAGE_URL,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "Annual compounding doubling time",
        "Rule of 72 comparison",
        "Preset return rates",
        "Optional corpus narrative",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What does “100% return” mean here?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A 100% cumulative return means your capital doubles: you end with 2× what you started with. This calculator shows how long that takes at a steady annual return with profits reinvested once per year.",
          },
        },
        {
          "@type": "Question",
          name: "How is doubling time calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "With annual compounding, years to double = ln(2) / ln(1 + r) where r is the annual rate as a decimal (e.g. 12% → 0.12). The Rule of 72 is a quick approximation: 72 divided by the rate in percent.",
          },
        },
      ],
    },
  ],
};

export default function TimeToDoublePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DoublingTimeCalculator />
    </>
  );
}
