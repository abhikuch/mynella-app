import type { ResolvedSiteChrome } from "@/lib/site-chrome-resolve";
import type { SiteSettingsDoc } from "@/sanity/lib/site";

/** Same merge rule as footer company links for Privacy Policy URL. */
export function resolvePrivacyPolicyHref(
  chrome: ResolvedSiteChrome,
  settings: SiteSettingsDoc | null,
): string {
  const merged = chrome.footerCompany.map((link) => {
    if (link.label === "Privacy Policy" && settings?.legalPrivacyUrl?.trim()) {
      return { ...link, href: settings.legalPrivacyUrl.trim() };
    }
    return link;
  });
  const p = merged.find((l) => l.label === "Privacy Policy");
  return p?.href?.trim() || "#";
}
