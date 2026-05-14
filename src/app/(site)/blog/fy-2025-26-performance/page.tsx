import type { Metadata } from "next";
import { cookies } from "next/headers";
import { BlogLeadGate } from "@/components/leads/BlogLeadGate";
import { PerformanceReport } from "@/components/sections/PerformanceReport";
import { CM_BLOG_ACCESS_COOKIE } from "@/lib/lead-capture-constants";
import { resolvePrivacyPolicyHref } from "@/lib/legal-links";
import { reportMeta } from "@/lib/performance-report-fy2026";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { getSiteSettings } from "@/sanity/lib/site";
import { getResolvedSiteChrome } from "@/sanity/lib/siteChrome";

const fallbackDescription = `FY 2025–26 performance: Polaris PMS & Optimus vs Nifty 50, 100, and 500 — returns, drawdowns, and risk-adjusted metrics through March 2026.`;

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pathname = `/blog/${reportMeta.slug}`;
  return pageMetadataForRoute(
    "blog-fy-2025-26-performance",
    { title: reportMeta.title, description: fallbackDescription },
    pathname,
    {
      openGraphType: "article",
      article: { publishedTime: "2026-03-01T00:00:00.000Z" },
    },
  );
}

export default async function FyPerformanceReportPage() {
  const [settings, chrome, cookieJar] = await Promise.all([
    getSiteSettings(),
    getResolvedSiteChrome(),
    cookies(),
  ]);
  const hasBlogAccess = cookieJar.get(CM_BLOG_ACCESS_COOKIE)?.value === "1";
  const privacyHref = resolvePrivacyPolicyHref(chrome, settings);

  return (
    <BlogLeadGate initialHasAccess={hasBlogAccess} privacyHref={privacyHref}>
      <PerformanceReport />
    </BlogLeadGate>
  );
}
