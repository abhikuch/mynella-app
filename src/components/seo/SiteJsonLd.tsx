import {
  companyLinkedIn,
  registeredOfficeGeoCoordinatesJsonLd,
  registeredOfficePostalAddressJsonLd,
} from "@/lib/company-profile";
import { socialLinks } from "@/lib/navigation";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  ORGANIZATION_LOGO_PATH,
  absoluteOgImageUrl,
} from "@/lib/seo-config";

const fallbackLogoUrl = absoluteOgImageUrl(ORGANIZATION_LOGO_PATH);

/**
 * Organization + WebSite JSON-LD for sitewide trust and rich results (schema.org).
 * @param organizationLogoUrl — from CMS when set; else built-in static logo.
 */
export function SiteJsonLd({
  organizationLogoUrl,
}: {
  organizationLogoUrl?: string | null;
} = {}) {
  const logoUrl = organizationLogoUrl?.trim() || fallbackLogoUrl;
  const sameAs = Array.from(
    new Set([
      ...socialLinks.map((s) => s.href),
      companyLinkedIn.googleMapsPlaceUrl,
    ]),
  );
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: "MyNella Consultancy Pvt. Ltd.",
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
    },
    image: logoUrl,
    address: registeredOfficePostalAddressJsonLd(),
    geo: registeredOfficeGeoCoordinatesJsonLd(),
    hasMap: companyLinkedIn.googleMapsPlaceUrl,
    sameAs,
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: logoUrl },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
