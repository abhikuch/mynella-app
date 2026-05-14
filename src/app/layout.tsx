import type { Metadata, Viewport } from "next";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { inter, playfair } from "@/lib/fonts";
import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
} from "@/lib/seo-config";
import { organizationLogoAbsoluteUrl, resolveShareImageUrl } from "@/lib/seo-sanity";
import { getSiteSettings } from "@/sanity/lib/site";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import "@/styles/globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090b" },
    { media: "(prefers-color-scheme: light)", color: "#f4f5f7" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const defaultOgUrl = resolveShareImageUrl("/", [settings?.seoDefaultOgImage]);
  const defaultOgImages = [
    {
      url: defaultOgUrl,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt: `${SITE_NAME} — Invest Better`,
    },
  ];
  const verification: Metadata["verification"] = {};
  if (settings?.seoGoogleSiteVerification?.trim()) {
    verification.google = settings.seoGoogleSiteVerification.trim();
  }
  if (settings?.seoBingSiteVerification?.trim()) {
    verification.other = {
      "msvalidate.01": settings.seoBingSiteVerification.trim(),
    };
  }
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — Invest Better`,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    applicationName: SITE_NAME,
    referrer: "origin-when-cross-origin",
    formatDetection: { email: false, address: false, telephone: false },
    ...(Object.keys(verification).length ? { verification } : {}),
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: SITE_URL,
      siteName: SITE_NAME,
      title: `${SITE_NAME} — Invest Better`,
      description: DEFAULT_DESCRIPTION,
      images: defaultOgImages,
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title: `${SITE_NAME} — Invest Better`,
      description: DEFAULT_DESCRIPTION,
      images: [defaultOgUrl],
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const logoUrl =
    organizationLogoAbsoluteUrl(settings?.seoOrganizationLogo) ?? null;

  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <ThemeScript />
      </head>
      <body>
        <GoogleAnalytics />
        <SiteJsonLd organizationLogoUrl={logoUrl} />
        {children}
      </body>
    </html>
  );
}
