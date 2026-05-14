import type { Metadata } from "next";
import { DrawdownCalculator } from "@/components/calculators/DrawdownCalculator";
import { DrawdownRecoveryEducation } from "@/components/calculators/DrawdownRecoveryEducation";
import { calculatorPageMetadata } from "@/lib/calculator-pages";
import { SITE_URL } from "@/lib/seo-config";

const PAGE_URL = `${SITE_URL}/calculators/drawdown-recovery`;

export async function generateMetadata(): Promise<Metadata> {
  return calculatorPageMetadata("/calculators/drawdown-recovery");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Calculators", item: `${SITE_URL}/calculators` },
        { "@type": "ListItem", position: 3, name: "Stock loss & drawdown recovery", item: PAGE_URL },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Stock loss and drawdown recovery calculator",
      description:
        "Illustrative calculator: enter a portfolio drawdown to see the break-even return required (drawdown asymmetry). Free for Indian investors.",
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
          name: "Is this a stock loss recovery calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, in the sense that it shows the percentage gain needed on your remaining capital after a loss (drawdown) to return to your prior peak. It uses the same asymmetry math for a single portfolio value, not per-stock tax lots or staggered purchases.",
          },
        },
        {
          "@type": "Question",
          name: "How much return do I need to recover from a 50% drawdown?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To recover from a 50% portfolio loss, you need a 100% gain. This is because you need to double a halved amount. The recovery required is always greater than the loss — this is called drawdown asymmetry.",
          },
        },
        {
          "@type": "Question",
          name: "How much return to recover from a 30% loss?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A 30% drawdown requires approximately 42.9% gain to recover. The formula is: Recovery = Drawdown / (1 - Drawdown). For 30%: 0.30 / 0.70 = 42.9%.",
          },
        },
        {
          "@type": "Question",
          name: "What is drawdown and recovery?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Drawdown is the decline from a portfolio peak, usually shown as a negative percent. Recovery is the positive return required on the smaller post-loss base to reach the old peak again. Recovery percent is larger than the drawdown percent because you earn on a reduced base.",
          },
        },
      ],
    },
  ],
};

export default function DrawdownRecoveryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DrawdownRecoveryEducation />
      <DrawdownCalculator />
    </>
  );
}
