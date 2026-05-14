import type { Metadata } from "next";
import { CagrCalculator } from "@/components/calculators/CagrCalculator";
import { calculatorPageMetadata } from "@/lib/calculator-pages";
import { SITE_URL } from "@/lib/seo-config";

const PAGE_URL = `${SITE_URL}/calculators/cagr`;

export async function generateMetadata(): Promise<Metadata> {
  return calculatorPageMetadata("/calculators/cagr");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Calculators", item: `${SITE_URL}/calculators` },
        { "@type": "ListItem", position: 3, name: "CAGR Calculator", item: PAGE_URL },
      ],
    },
    {
      "@type": "WebApplication",
      name: "CAGR Calculator",
      description: "Free Compound Annual Growth Rate calculator for investors. Enter starting value, ending value, and duration to calculate CAGR.",
      url: PAGE_URL,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: ["CAGR calculation", "Total return", "Rule of 72 doubling time", "Growth curve visualisation"],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is CAGR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CAGR stands for Compound Annual Growth Rate. It measures the smoothed annual rate at which an investment grows from its starting value to its ending value over a given period, assuming profits are reinvested.",
          },
        },
        {
          "@type": "Question",
          name: "How is CAGR calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CAGR = (Ending Value / Starting Value)^(1 / Number of Years) - 1. For example, ₹1 lakh growing to ₹2.59 lakh in 5 years gives a CAGR of 21%.",
          },
        },
      ],
    },
  ],
};

export default function CagrPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CagrCalculator />
    </>
  );
}
