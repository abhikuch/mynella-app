import type { Metadata } from "next";
import { FeeDestroyerCalculator } from "@/components/calculators/FeeDestroyerCalculator";
import { calculatorPageMetadata } from "@/lib/calculator-pages";
import { SITE_URL } from "@/lib/seo-config";

const PAGE_URL = `${SITE_URL}/calculators/fee-destroyer`;

export async function generateMetadata(): Promise<Metadata> {
  return calculatorPageMetadata("/calculators/fee-destroyer");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Calculators", item: `${SITE_URL}/calculators` },
        { "@type": "ListItem", position: 3, name: "Fee Destroyer Calculator", item: PAGE_URL },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Fee Destroyer — Investment Fee Impact Calculator",
      description: "Calculate exactly how annual fees erode your long-term investment returns over time.",
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
          name: "How much does a 1% mutual fund fee cost over 20 years?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On a ₹50 lakh investment at 12% gross CAGR over 20 years, a 1% annual fee reduces your final corpus from ~₹4.83 Cr to ~₹4.06 Cr — a difference of ₹77 lakh. The fee appears small but compounds against you over time.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between direct and regular mutual funds in India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Regular mutual fund plans have an expense ratio 0.5–1.5% higher than direct plans due to distributor commissions. Over 20 years on ₹10 lakh, this difference can compound to lakhs in foregone returns. Direct plans are available through fund houses, SEBI-registered advisors, and platforms like MF Central.",
          },
        },
      ],
    },
  ],
};

export default function FeeDestroyerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeeDestroyerCalculator />
    </>
  );
}
