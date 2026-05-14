import type { Metadata } from "next";
import { MartingaleCalculator } from "@/components/calculators/MartingaleCalculator";
import { calculatorPageMetadata } from "@/lib/calculator-pages";
import { SITE_URL } from "@/lib/seo-config";

const PAGE_URL = `${SITE_URL}/calculators/martingale`;

export async function generateMetadata(): Promise<Metadata> {
  return calculatorPageMetadata("/calculators/martingale");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Calculators", item: `${SITE_URL}/calculators` },
        { "@type": "ListItem", position: 3, name: "Martingale Risk of Ruin", item: PAGE_URL },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Martingale Risk of Ruin — Averaging Down Calculator",
      description:
        "Interactive calculator showing how capital exposure doubles and ruin probability rises when averaging down on a falling stock across multiple levels.",
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
          name: "What is the Martingale strategy in investing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Martingale is a strategy where you double your position every time the price falls, betting that a recovery will recover all losses. In gambling it's theoretically sound with unlimited capital and no table limits. In stocks, companies can go bankrupt, meaning the price can go to zero — wiping out all averaged-down capital permanently.",
          },
        },
        {
          "@type": "Question",
          name: "Why is averaging down on stocks dangerous?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Each averaging-down level doubles the capital deployed. After 5 levels you've committed 63× your original investment. Simultaneously, your break-even price requires an enormous rally from an already-falling stock. If the company faces structural issues (fraud, debt, sector decline), the stock can fall 90-99% — as seen with Yes Bank, DHFL, Unitech, and Satyam in India.",
          },
        },
        {
          "@type": "Question",
          name: "What is 'risk of ruin' in stock investing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Risk of ruin is the probability that a strategy results in complete loss of capital. For a Martingale averaging-down approach, it is the probability that the stock falls through every averaging level you've set, ultimately going to near-zero and wiping out the total accumulated position.",
          },
        },
      ],
    },
  ],
};

export default function MartingalePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MartingaleCalculator />
    </>
  );
}
