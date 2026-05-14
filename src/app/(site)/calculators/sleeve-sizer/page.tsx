import type { Metadata } from "next";
import { SleeveSizerCalculator } from "@/components/calculators/SleeveSizerCalculator";
import { calculatorPageMetadata } from "@/lib/calculator-pages";
import { SITE_URL } from "@/lib/seo-config";

const PAGE_URL = `${SITE_URL}/calculators/sleeve-sizer`;

export async function generateMetadata(): Promise<Metadata> {
  return calculatorPageMetadata("/calculators/sleeve-sizer");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Calculators", item: `${SITE_URL}/calculators` },
        { "@type": "ListItem", position: 3, name: "Risk Profile Finder", item: PAGE_URL },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Investor Risk Profile Finder — MyNella",
      description:
        "A 5-question quiz to determine your investor risk category (conservative, moderate, growth, aggressive) and match you with suitable investment mandates.",
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
          name: "What is an investor risk profile?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An investor risk profile classifies how much risk you can tolerate based on your investment horizon, income stability, reaction to losses, and financial goals. Common categories are conservative, moderate, growth-oriented, and aggressive.",
          },
        },
        {
          "@type": "Question",
          name: "How is my risk category determined?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This tool asks 5 questions covering your investment horizon, reaction to drawdowns, income stability, purpose of funds, and prior investing experience. Your answers are scored and mapped to a risk category.",
          },
        },
        {
          "@type": "Question",
          name: "Which MyNella products suit a moderate risk profile?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Moderate risk investors typically suit systematic model portfolios like Alpha 100, Alpha 200, and the Quanto series — diversified, process-driven equity strategies with 3-5 year horizons.",
          },
        },
      ],
    },
  ],
};

export default function SleeveSizerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SleeveSizerCalculator />
    </>
  );
}
