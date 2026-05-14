import type { Metadata } from "next";
import { GrowthVisualiser } from "@/components/calculators/GrowthVisualiser";
import { calculatorPageMetadata } from "@/lib/calculator-pages";
import { SITE_URL } from "@/lib/seo-config";

const PAGE_URL = `${SITE_URL}/calculators/growth-visualiser`;

export async function generateMetadata(): Promise<Metadata> {
  return calculatorPageMetadata("/calculators/growth-visualiser");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Calculators", item: `${SITE_URL}/calculators` },
        { "@type": "ListItem", position: 3, name: "10 · 20 · 30 Visualiser", item: PAGE_URL },
      ],
    },
    {
      "@type": "WebApplication",
      name: "10-20-30 Compounding Growth Visualiser",
      description: "Visualise how the same capital grows at 10%, 20%, and 30% CAGR over any horizon from 5 to 40 years.",
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
          name: "What is the difference between 10%, 20%, and 30% CAGR over 20 years?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Starting with ₹1 lakh: at 10% CAGR you get ~₹6.7L, at 20% CAGR you get ~₹38.3L, and at 30% CAGR you get ~₹1.9 Cr. The 30% portfolio is nearly 29× larger than the 10% portfolio — on the exact same starting amount.",
          },
        },
        {
          "@type": "Question",
          name: "Why does a small difference in CAGR matter so much?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Compounding amplifies every percentage point of return exponentially over time. A 20% CAGR over 20 years produces nearly 6× more wealth than a 10% CAGR. Time is the multiplier — the longer your horizon, the more each extra percent matters.",
          },
        },
      ],
    },
  ],
};

export default function GrowthVisualiserPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GrowthVisualiser />
    </>
  );
}
