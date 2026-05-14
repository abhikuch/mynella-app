import type { Metadata } from "next";
import { StartLateCalculator } from "@/components/calculators/StartLateCalculator";
import { calculatorPageMetadata } from "@/lib/calculator-pages";
import { SITE_URL } from "@/lib/seo-config";

const PAGE_URL = `${SITE_URL}/calculators/start-late`;

export async function generateMetadata(): Promise<Metadata> {
  return calculatorPageMetadata("/calculators/start-late");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Calculators", item: `${SITE_URL}/calculators` },
        { "@type": "ListItem", position: 3, name: "Cost of Starting Late", item: PAGE_URL },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Cost of Starting Late — SIP Calculator",
      description: "Compare retirement wealth for SIP investors starting at different ages. Shows the compounding cost of every year of delay.",
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
          name: "How much does starting SIP 10 years late cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Starting a SIP of ₹10,000/month at 35 instead of 25 (at 12% CAGR, retiring at 60) results in nearly ₹2.3 Cr less at retirement — even though you invested for 25 years vs 35 years. The first decade of compounding is disproportionately powerful.",
          },
        },
        {
          "@type": "Question",
          name: "Is it too late to start investing at 40?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is never too late to start, but starting earlier is always better. At 40, with a 20-year horizon to retirement at 60 and ₹20,000/month SIP at 12% CAGR, you can still build ₹1.9 Cr. The key is to start now rather than waiting further.",
          },
        },
      ],
    },
  ],
};

export default function StartLatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StartLateCalculator />
    </>
  );
}
