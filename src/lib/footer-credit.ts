import type { SiteSettingsDoc } from "@/sanity/lib/site";

const DEFAULT_PREFIX = "Built with ❤️ & 💪🏻 by ";
const DEFAULT_NAME = "Futurebits";
const DEFAULT_URL = "https://futurebits.tech";

export type ResolvedFooterCredit = {
  enabled: boolean;
  prefix: string;
  name: string;
  url: string;
};

export function resolveFooterCredit(settings: SiteSettingsDoc | null): ResolvedFooterCredit {
  return {
    enabled: settings?.footerCreditEnabled !== false,
    prefix: settings?.footerCreditPrefix?.trim() || DEFAULT_PREFIX,
    name: settings?.footerCreditName?.trim() || DEFAULT_NAME,
    url: settings?.footerCreditUrl?.trim() || DEFAULT_URL,
  };
}
