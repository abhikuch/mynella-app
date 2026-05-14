import type { Metadata } from "next";
import { MinTicketCalculator } from "@/components/calculators/MinTicketCalculator";
import { calculatorPageMetadata } from "@/lib/calculator-pages";
import { SITE_URL } from "@/lib/seo-config";

const PAGE_URL = `${SITE_URL}/calculators/min-ticket`;

export async function generateMetadata(): Promise<Metadata> {
  return calculatorPageMetadata("/calculators/min-ticket");
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Calculators", item: `${SITE_URL}/calculators` },
        { "@type": "ListItem", position: 3, name: "Minimum Ticket Checker", item: PAGE_URL },
      ],
    },
    {
      "@type": "WebApplication",
      name: "Minimum Ticket Checker",
      description: "Check which MyNella investment mandates are accessible based on your investable corpus amount.",
      url: PAGE_URL,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
  ],
};

export default function MinTicketPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MinTicketCalculator />
    </>
  );
}
