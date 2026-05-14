import type { Metadata } from "next";
import { LuxuryTrapCalculator } from "@/components/calculators/LuxuryTrapCalculator";
import { calculatorPageMetadata } from "@/lib/calculator-pages";
import { SITE_URL } from "@/lib/seo-config";

const PAGE_URL = `${SITE_URL}/calculators/luxury-trap`;

export async function generateMetadata(): Promise<Metadata> {
  return calculatorPageMetadata("/calculators/luxury-trap");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Calculators", item: `${SITE_URL}/calculators` },
        { "@type": "ListItem", position: 3, name: "Luxury Trap Calculator", item: PAGE_URL },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Luxury Trap — Opportunity Cost Calculator",
      description: "Calculate what a luxury purchase truly costs in compounded wealth foregone over 10–30 years.",
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
          name: "What is the true cost of buying a luxury car instead of investing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A ₹30 lakh car purchase has an opportunity cost of ₹30L compounded at your investment CAGR. At 15% CAGR over 20 years, that ₹30L would have grown to over ₹4.9 Cr — so the real cost of the car is not ₹30L but ₹4.9 Cr in foregone wealth.",
          },
        },
      ],
    },
  ],
};

export default function LuxuryTrapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LuxuryTrapCalculator />
    </>
  );
}
