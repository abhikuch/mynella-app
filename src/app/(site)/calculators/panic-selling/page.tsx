import type { Metadata } from "next";
import { PanicSellingCalculator } from "@/components/calculators/PanicSellingCalculator";
import { calculatorPageMetadata } from "@/lib/calculator-pages";
import { SITE_URL } from "@/lib/seo-config";

const PAGE_URL = `${SITE_URL}/calculators/panic-selling`;

export async function generateMetadata(): Promise<Metadata> {
  return calculatorPageMetadata("/calculators/panic-selling");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Calculators", item: `${SITE_URL}/calculators` },
        { "@type": "ListItem", position: 3, name: "Cost of Panic Selling", item: PAGE_URL },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Cost of Panic Selling Calculator",
      description: "Calculate how missing the best trading days in the market reduces your long-term returns.",
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
          name: "What happens if I miss the best days in the stock market?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Missing just the 10 best trading days in the market over a 20-year period can reduce your total return by 50% or more. The best days often cluster right after the worst days — meaning panic sellers are most likely to miss them.",
          },
        },
        {
          "@type": "Question",
          name: "Why is staying invested better than timing the market?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Market returns are concentrated in a small number of days. If you are out of the market on those days due to panic selling, you permanently miss those gains. Studies consistently show that time in the market beats timing the market.",
          },
        },
      ],
    },
  ],
};

export default function PanicSellingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PanicSellingCalculator />
    </>
  );
}
