import type { ArticleSchemaPerson } from "@/lib/eeat-author";
import { SITE_NAME, SITE_URL, ORGANIZATION_LOGO_PATH, absoluteOgImageUrl } from "@/lib/seo-config";

const publisherLogoUrl = absoluteOgImageUrl(ORGANIZATION_LOGO_PATH);

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  imageUrl,
  authorPerson,
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string | null;
  dateModified?: string | null;
  imageUrl?: string | null;
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
    headline: title,
    description,
    url,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: datePublished ?? undefined,
    dateModified: dateModified ?? undefined,
    author,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: publisherLogoUrl,
      },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
