import type { Metadata } from "next";
import { RetirementCalculator } from "@/components/calculators/RetirementCalculator";
import { calculatorPageMetadata } from "@/lib/calculator-pages";
import { SITE_URL } from "@/lib/seo-config";

const PAGE_URL = `${SITE_URL}/calculators/retirement`;

export async function generateMetadata(): Promise<Metadata> {
  return calculatorPageMetadata("/calculators/retirement");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Calculators", item: `${SITE_URL}/calculators` },
        { "@type": "ListItem", position: 3, name: "Retirement (Real Number)", item: PAGE_URL },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Real Number Retirement Calculator",
      description:
        "Inflation- and tax-aware retirement corpus calculator. Projects today's expenses to retirement, funds 25–30 years of withdrawals at the real rate of return, and solves for the monthly SIP gap.",
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
          name: "Why is the corpus so much larger than I expected?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pre-retirement lifestyle inflation pushes today's expenses up to a future number, and the corpus then has to fund 25–30 years of withdrawals at the post-retirement inflation rate. Inflation compounds aggressively over multi-decade horizons.",
          },
        },
        {
          "@type": "Question",
          name: "How is the real rate of return calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The calculator uses Fisher's exact formula: real rate = (1 + post-tax nominal return) ÷ (1 + post-retirement inflation) − 1. Simple subtraction overstates returns; the geometric form is honest about purchasing-power growth.",
          },
        },
        {
          "@type": "Question",
          name: "Should I include taxes on retirement returns?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "If your retirement corpus throws off interest, dividends, or capital gains, the effective return is lower than headline. Toggle the post-tax setting and enter your blended rate. LTCG on Indian equity above ₹1.25L is 12.5%; debt and slab-rate income can be 20–30%+.",
          },
        },
        {
          "@type": "Question",
          name: "What does the SIP gap mean?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is the monthly investment required between today and retirement, on top of your existing portfolio's organic growth, to reach the target corpus at the pre-retirement return you set. Annual step-ups reduce the starting amount needed.",
          },
        },
      ],
    },
  ],
};

export default function RetirementCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RetirementCalculator />
    </>
  );
}
