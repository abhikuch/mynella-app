import type { ArticleSchemaPerson } from "@/lib/eeat-author";
import {
  registeredOfficeGeoCoordinatesJsonLd,
  registeredOfficePostalAddressJsonLd,
} from "@/lib/company-profile";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo-config";

export type PillarFaq = { question: string; answer: string };

export function pillarArticleJsonLdScript({
  url,
  headline,
  description,
  datePublished,
  dateModified,
  authorPerson,
}: {
  url: string;
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  /** When set (default on pillar pages), Article author is a Person — preferred for YMYL finance content. */
  authorPerson?: ArticleSchemaPerson | null;
}) {
  const author =
    authorPerson ??
    ({
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    } as const);

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    author,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    datePublished: datePublished ?? undefined,
    dateModified: dateModified ?? undefined,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function pillarBreadcrumbJsonLdScript(
  items: { name: string; item: string }[],
) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.item,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function pillarFaqJsonLdScript(faqs: PillarFaq[]) {
  if (!faqs.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function pillarPersonJsonLdScript({
  url,
  name,
  jobTitle,
  description,
  sameAs,
  image,
}: {
  url: string;
  name: string;
  jobTitle: string;
  description: string;
  sameAs?: string[];
  image?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    url,
    image: image?.trim() ? image : undefined,
    worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    sameAs: sameAs?.length ? sameAs : undefined,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Sitewide FinancialService — complements Organization / WebSite in `SiteJsonLd`. */
export function financialServiceJsonLdScript() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: `${SITE_NAME} — portfolio management & investment research`,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      address: registeredOfficePostalAddressJsonLd(),
      geo: registeredOfficeGeoCoordinatesJsonLd(),
    },
    areaServed: { "@type": "Country", name: "India" },
    serviceType: ["Portfolio management services", "Investment research", "Systematic equity programmes"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function pillarWebPageJsonLdScript({
  url,
  name,
  description,
}: {
  url: string;
  name: string;
  description: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
