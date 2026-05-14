/**
 * Company facts aligned with the public LinkedIn profile:
 * https://www.linkedin.com/company/mynella
 * (Cross-check legal / SEBI filings where numbers or dates differ.)
 */

export const companyLinkedIn = {
  url: "https://www.linkedin.com/company/mynella",
  /** As shown on the company page headline */
  tagline:
    "MyNella — beauty editorial, the Nella companion app, and a calm marketing surface powered by Next.js and Sanity.",
  /** “About us” block on LinkedIn */
  about:
    "Editorial makeup and skincare content, plus early access communication for the Nella app. Not medical or investment advice.",
  industry: "Beauty & personal care",
  /** LinkedIn company size band */
  sizeBand: "2–10 employees",
  type: "Privately held",
  /** Public “founded” story; CIN year (2010) is legal incorporation only. */
  foundedYearOnProfile: "2015",
  headquarters: "Pune, Maharashtra",
  /** Mirrored from https://mynella.com footer (Contact). */
  locations: [
    {
      label: "Registered office — Pune",
      lines: [
        "106, 1st Floor, Jewel Square Mall, Koregaon Park",
        "Next to North Main Road Petrol Pump",
        "Pune, Maharashtra 411001, India",
      ],
    },
  ],
  /**
   * Canonical Google Maps place + share link — same pin as Google Business Profile listing.
   * Resolved from https://maps.app.goo.gl/qzZTsEMNskvXLK5r6 (MyNella consultancy).
   */
  googleMapsPlaceUrl:
    "https://www.google.com/maps/place/MyNella+consultancy/@18.538958,73.8859181,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c1041af6754d:0xab3e96a8762e382!8m2!3d18.538958!4d73.8859181!16s%2Fg%2F11cnx_q214",
  googleMapsShareUrl: "https://maps.app.goo.gl/qzZTsEMNskvXLK5r6",
  /** Coordinates from the Maps place URL above */
  registeredOfficeGeo: { latitude: 18.538958, longitude: 73.8859181 } as const,
  specialties: [
    "Beauty",
    "Editorial",
    "Skincare",
    "Makeup",
    "Content",
    "Web",
  ],
} as const;

/** Postal address for JSON-LD — matches registered office copy + Google Maps listing. */
export function registeredOfficePostalAddressJsonLd() {
  return {
    "@type": "PostalAddress" as const,
    streetAddress:
      "106, 1st Floor, Jewel Square Mall, Koregaon Park, Next to North Main Road Petrol Pump",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411001",
    addressCountry: "IN",
  };
}

export function registeredOfficeGeoCoordinatesJsonLd() {
  const { latitude, longitude } = companyLinkedIn.registeredOfficeGeo;
  return {
    "@type": "GeoCoordinates" as const,
    latitude,
    longitude,
  };
}
