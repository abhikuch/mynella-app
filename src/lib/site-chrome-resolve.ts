import { partnersSeedRows } from "../../sanity/defaultContent/partnersSeed";
import { siteChromeSeed } from "../../sanity/defaultContent/siteChromeSeed";
import type { NavItem } from "./navigation";

/** CMS exports may omit newer chrome fields; keep runtime fallbacks off the seed object. */
type ChromeHrefLinkSeed = { label: string; href: string; openInNewTab: boolean };
type FooterExtraColumnSeed = { title: string; links: ChromeHrefLinkSeed[] };

const chromeSeedRecord = siteChromeSeed as Record<string, unknown>;

function seedChromeHrefLinks(): ChromeHrefLinkSeed[] {
  const v = chromeSeedRecord.headerUtilityLinks;
  return Array.isArray(v) ? (v as ChromeHrefLinkSeed[]) : [];
}

function seedFooterExtraColumns(): FooterExtraColumnSeed[] {
  const v = chromeSeedRecord.footerExtraColumns;
  return Array.isArray(v) ? (v as FooterExtraColumnSeed[]) : [];
}

function seedChromeBool(key: string, defaultVal: boolean): boolean {
  const v = chromeSeedRecord[key];
  return typeof v === "boolean" ? v : defaultVal;
}

function seedProductNavLabels(): string[] {
  const v = chromeSeedRecord.footerProductNavLabels;
  if (Array.isArray(v) && v.length > 0) return v as string[];
  return ["PMS", "Algo", "Model Portfolios"];
}

const defaultPartners = [...partnersSeedRows]
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .map((p) => ({
    name: p.name,
    href: p.href,
    logo: (p.publicLogoPath ?? "").trim(),
  }));

export type CtaLinksResolved = {
  investorLogin: string;
  bookCall: string;
  bookOptimus: string;
  bookPledgePlus: string;
  bookPolaris: string;
  bookPartnership: string;
};

function resolveHref(href?: string | null, pathFromPage?: string | null): string {
  const h = href?.trim();
  if (h) return h;
  const p = pathFromPage?.trim();
  if (p) return p;
  return "/";
}

type NavGrandchildRaw = {
  label?: string | null;
  href?: string | null;
  pathFromPage?: string | null;
};

type NavChildRaw = {
  label?: string | null;
  href?: string | null;
  pathFromPage?: string | null;
  description?: string | null;
  children?: NavGrandchildRaw[] | null;
};

type NavRootRaw = {
  label?: string | null;
  href?: string | null;
  pathFromPage?: string | null;
  description?: string | null;
  children?: NavChildRaw[] | null;
};

export type SiteChromeDoc = {
  navigation?: NavRootRaw[] | null;
  ctaInvestorLogin?: string | null;
  ctaBookCall?: string | null;
  ctaBookOptimus?: string | null;
  ctaBookPledgePlus?: string | null;
  ctaBookPolaris?: string | null;
  ctaBookPartnership?: string | null;
  footerCompliance?: { label?: string | null; href?: string | null }[] | null;
  footerCompany?: { label?: string | null; href?: string | null }[] | null;
  socialLinks?: { id?: string | null; label?: string | null; href?: string | null }[] | null;
  partners?:
    | {
        name?: string | null;
        href?: string | null;
        sortOrder?: number | null;
        publicLogoPath?: string | null;
        logoUrl?: string | null;
      }[]
    | null;
  brandName?: string | null;
  brandTagline?: string | null;
  logoAriaLabel?: string | null;
  heroPrimaryCtaLabel?: string | null;
  heroStat1Value?: string | null;
  heroStat1Unit?: string | null;
  heroStat1Label?: string | null;
  heroStat2Value?: string | null;
  heroStat2Label?: string | null;
  heroStat3Value?: string | null;
  heroStat3Unit?: string | null;
  heroStat3Label?: string | null;
  heroStat4Value?: string | null;
  heroStat4Label?: string | null;
  strategyMatcherTrigger?: string | null;
  strategyMatcherPanelLead?: string | null;
  strategyMatcherBrowseAllLabel?: string | null;
  strategyMatcherBandsAria?: string | null;
  strategyMatcherBands?: { id?: string | null; label?: string | null; hint?: string | null }[] | null;
  strategyMatcherPicksEmerging?: { title?: string | null; href?: string | null; blurb?: string | null }[] | null;
  strategyMatcherPicksAffluent?: { title?: string | null; href?: string | null; blurb?: string | null }[] | null;
  strategyMatcherPicksHnw?: { title?: string | null; href?: string | null; blurb?: string | null }[] | null;
  navMobileInvestorLogin?: string | null;
  navMobileBookCall?: string | null;
  navOverviewSuffix?: string | null;
  navToggleAria?: string | null;
  footerProductsTitle?: string | null;
  footerComplianceTitle?: string | null;
  footerCompanyTitle?: string | null;
  footerSebiLine1?: string | null;
  footerSebiLine2?: string | null;
  footerSebiLine3?: string | null;
  footerCopyrightPrefix?: string | null;
  footerCopyrightOrg?: string | null;
  skipToContentLabel?: string | null;
  companyLinkedInUrl?: string | null;
  companyTagline?: string | null;
  companyAbout?: string | null;
  companyIndustry?: string | null;
  companySizeBand?: string | null;
  companyHeadquarters?: string | null;
  companyLocations?: { label?: string | null; lines?: string[] | null }[] | null;
  companySpecialties?: string[] | null;
  headerUtilityLinks?: { label?: string | null; href?: string | null; openInNewTab?: boolean | null }[] | null;
  headerLogo?: { url?: string | null; alt?: string | null } | null;
  headerShowInvestorLogin?: boolean | null;
  headerShowBookCall?: boolean | null;
  headerNavInvestorLabel?: string | null;
  headerNavBookLabel?: string | null;
  footerShowProductsColumn?: boolean | null;
  footerProductNavLabels?: string[] | null;
  footerExtraColumns?:
    | {
        title?: string | null;
        links?: { label?: string | null; href?: string | null; openInNewTab?: boolean | null }[] | null;
      }[]
    | null;
  footerShowNewsletter?: boolean | null;
  footerShowSocial?: boolean | null;
  footerShowThemeToggle?: boolean | null;
  footerShowSebiBlock?: boolean | null;
} | null;

function toNavItem(n: NavRootRaw): NavItem {
  return {
    label: n.label ?? "",
    href: resolveHref(n.href, n.pathFromPage),
    description: n.description ?? undefined,
    children: n.children?.map((c) => ({
      label: c.label ?? "",
      href: resolveHref(c.href, c.pathFromPage),
      description: c.description ?? undefined,
      children: c.children?.map((g) => ({
        label: g.label ?? "",
        href: resolveHref(g.href, g.pathFromPage),
      })),
    })),
  };
}

function mapNav(list: NavRootRaw[] | null | undefined, fb: typeof siteChromeSeed.navigation): NavItem[] {
  if (list && list.length > 0) return list.map(toNavItem);
  return (fb as unknown as NavRootRaw[]).map(toNavItem);
}

function pickLinks(
  doc: SiteChromeDoc,
  key: "footerCompliance" | "footerCompany",
  fb: readonly { label: string; href: string }[],
): { label: string; href: string }[] {
  const raw = doc?.[key];
  if (raw && raw.length > 0) {
    return raw.map((r) => ({
      label: r.label?.trim() || "",
      href: r.href?.trim() || "#",
    }));
  }
  return fb.map((r) => ({ ...r }));
}

export type StrategyMatcherResolved = {
  trigger: string;
  panelLead: string;
  browseAllLabel: string;
  bandsAria: string;
  bands: { id: "emerging" | "affluent" | "hnw"; label: string; hint: string }[];
  picks: {
    emerging: { title: string; href: string; blurb: string }[];
    affluent: { title: string; href: string; blurb: string }[];
    hnw: { title: string; href: string; blurb: string }[];
  };
};

export type ResolvedSiteChrome = {
  navigation: NavItem[];
  ctaLinks: CtaLinksResolved;
  footerCompliance: { label: string; href: string }[];
  footerCompany: { label: string; href: string }[];
  socialLinks: { id: string; label: string; href: string }[];
  partners: { name: string; href: string; logo: string }[];
  brand: { name: string; tagline: string; ariaLabel: string };
  hero: {
    primaryCtaLabel: string;
    stats: { value: string; label: string; unit?: string }[];
  };
  strategyMatcher: StrategyMatcherResolved;
  navUi: {
    mobileInvestorLogin: string;
    mobileBookCall: string;
    overviewSuffix: string;
    toggleAria: string;
  };
  footerUi: {
    productsTitle: string;
    complianceTitle: string;
    companyTitle: string;
    sebiLines: [string, string, string];
    copyrightPrefix: string;
    copyrightOrg: string;
  };
  skipToContentLabel: string;
  company: {
    linkedInUrl: string;
    tagline: string;
    about: string;
    industry: string;
    sizeBand: string;
    headquarters: string;
    locations: { label: string; lines: string[] }[];
    specialties: string[];
  };
  header: {
    utilityLinks: { label: string; href: string; openInNewTab: boolean }[];
    logo: { url: string; alt: string } | null;
    showInvestorLogin: boolean;
    showBookCall: boolean;
    investorCtaLabel: string;
    bookCtaLabel: string;
  };
  footerOptions: {
    showProductsColumn: boolean;
    productNavLabels: string[];
    extraColumns: { title: string; links: { label: string; href: string; openInNewTab: boolean }[] }[];
    showNewsletter: boolean;
    showSocial: boolean;
    showThemeToggle: boolean;
    showSebiBlock: boolean;
  };
};

function mapMatcherBands(
  raw: SiteChromeDoc,
  fb: typeof siteChromeSeed.strategyMatcherBands,
): StrategyMatcherResolved["bands"] {
  const list = raw?.strategyMatcherBands?.length ? raw.strategyMatcherBands : fb;
  return list.map((b) => ({
    id: (b.id === "emerging" || b.id === "affluent" || b.id === "hnw" ? b.id : "emerging") as
      | "emerging"
      | "affluent"
      | "hnw",
    label: b.label?.trim() || "",
    hint: b.hint?.trim() || "",
  }));
}

function mapPicks(
  raw: { title?: string | null; href?: string | null; blurb?: string | null }[] | null | undefined,
  fb: readonly { title: string; href: string; blurb: string }[],
): { title: string; href: string; blurb: string }[] {
  if (raw && raw.length > 0) {
    return raw.map((p) => ({
      title: p.title?.trim() || "",
      href: p.href?.trim() || "#",
      blurb: p.blurb?.trim() || "",
    }));
  }
  return fb.map((p) => ({ title: p.title, href: p.href, blurb: p.blurb }));
}

function mapChromeHrefLinks(
  raw: { label?: string | null; href?: string | null; openInNewTab?: boolean | null }[] | null | undefined,
  fb: { label: string; href: string; openInNewTab: boolean }[],
): { label: string; href: string; openInNewTab: boolean }[] {
  if (raw && raw.length > 0) {
    return raw.map((r) => ({
      label: r.label?.trim() || "",
      href: r.href?.trim() || "#",
      openInNewTab: Boolean(r.openInNewTab),
    }));
  }
  return fb.map((x) => ({ ...x }));
}

function mapFooterExtraColumns(
  raw: NonNullable<SiteChromeDoc>["footerExtraColumns"],
  fb: FooterExtraColumnSeed[],
): ResolvedSiteChrome["footerOptions"]["extraColumns"] {
  if (raw && raw.length > 0) {
    return raw.map((col) => ({
      title: col.title?.trim() || "",
      links: mapChromeHrefLinks(col.links, []),
    }));
  }
  return fb.map((c) => ({
    title: c.title,
    links: c.links.map((l) => ({ ...l })),
  }));
}

function resolveBool(v: boolean | null | undefined, fallback: boolean): boolean {
  return v === undefined || v === null ? fallback : v;
}

function mapPartners(
  raw: NonNullable<NonNullable<SiteChromeDoc>["partners"]> | null | undefined,
): { name: string; href: string; logo: string }[] {
  if (raw && raw.length > 0) {
    const list = raw.filter((x): x is NonNullable<typeof x> => x != null && typeof x === "object");
    if (list.length === 0) return defaultPartners.map((p) => ({ ...p }));
    return [...list]
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((p) => ({
        name: p.name?.trim() || "",
        href: p.href?.trim() || "#",
        logo: (p.logoUrl?.trim() || p.publicLogoPath?.trim() || "").trim(),
      }));
  }
  return defaultPartners.map((p) => ({ ...p }));
}

export function resolveSiteChrome(doc: SiteChromeDoc): ResolvedSiteChrome {
  const fb = siteChromeSeed;
  return {
    navigation: mapNav(doc?.navigation ?? null, fb.navigation),
    ctaLinks: {
      investorLogin: doc?.ctaInvestorLogin?.trim() || fb.ctaInvestorLogin,
      bookCall: doc?.ctaBookCall?.trim() || fb.ctaBookCall,
      bookOptimus: doc?.ctaBookOptimus?.trim() || fb.ctaBookOptimus,
      bookPledgePlus: doc?.ctaBookPledgePlus?.trim() || fb.ctaBookPledgePlus,
      bookPolaris: doc?.ctaBookPolaris?.trim() || fb.ctaBookPolaris,
      bookPartnership: doc?.ctaBookPartnership?.trim() || fb.ctaBookPartnership,
    },
    footerCompliance: pickLinks(doc, "footerCompliance", fb.footerCompliance),
    footerCompany: pickLinks(doc, "footerCompany", fb.footerCompany),
    socialLinks:
      doc?.socialLinks?.length ?
        doc.socialLinks.map((s) => ({
          id: s.id?.trim() || "",
          label: s.label?.trim() || "",
          href: s.href?.trim() || "#",
        }))
      : fb.socialLinks.map((s) => ({ ...s })),
    partners: mapPartners(doc?.partners ?? null),
    brand: {
      name: doc?.brandName?.trim() || fb.brandName,
      tagline: doc?.brandTagline?.trim() || fb.brandTagline,
      ariaLabel: doc?.logoAriaLabel?.trim() || fb.logoAriaLabel,
    },
    hero: {
      primaryCtaLabel: doc?.heroPrimaryCtaLabel?.trim() || fb.heroPrimaryCtaLabel,
      stats: [
        {
          value: doc?.heroStat1Value?.trim() || fb.heroStat1Value,
          unit: doc?.heroStat1Unit?.trim() || fb.heroStat1Unit,
          label: doc?.heroStat1Label?.trim() || fb.heroStat1Label,
        },
        {
          value: doc?.heroStat2Value?.trim() || fb.heroStat2Value,
          label: doc?.heroStat2Label?.trim() || fb.heroStat2Label,
        },
        {
          value: doc?.heroStat3Value?.trim() || fb.heroStat3Value,
          unit: doc?.heroStat3Unit?.trim() || fb.heroStat3Unit,
          label: doc?.heroStat3Label?.trim() || fb.heroStat3Label,
        },
        {
          value: doc?.heroStat4Value?.trim() || fb.heroStat4Value,
          label: doc?.heroStat4Label?.trim() || fb.heroStat4Label,
        },
      ],
    },
    strategyMatcher: {
      trigger: doc?.strategyMatcherTrigger?.trim() || fb.strategyMatcherTrigger,
      panelLead: doc?.strategyMatcherPanelLead?.trim() || fb.strategyMatcherPanelLead,
      browseAllLabel: doc?.strategyMatcherBrowseAllLabel?.trim() || fb.strategyMatcherBrowseAllLabel,
      bandsAria: doc?.strategyMatcherBandsAria?.trim() || fb.strategyMatcherBandsAria,
      bands: mapMatcherBands(doc, fb.strategyMatcherBands),
      picks: {
        emerging: mapPicks(doc?.strategyMatcherPicksEmerging, fb.strategyMatcherPicksEmerging),
        affluent: mapPicks(doc?.strategyMatcherPicksAffluent, fb.strategyMatcherPicksAffluent),
        hnw: mapPicks(doc?.strategyMatcherPicksHnw, fb.strategyMatcherPicksHnw),
      },
    },
    navUi: {
      mobileInvestorLogin: doc?.navMobileInvestorLogin?.trim() || fb.navMobileInvestorLogin,
      mobileBookCall: doc?.navMobileBookCall?.trim() || fb.navMobileBookCall,
      overviewSuffix: doc?.navOverviewSuffix?.trim() || fb.navOverviewSuffix,
      toggleAria: doc?.navToggleAria?.trim() || fb.navToggleAria,
    },
    footerUi: {
      productsTitle: doc?.footerProductsTitle?.trim() || fb.footerProductsTitle,
      complianceTitle: doc?.footerComplianceTitle?.trim() || fb.footerComplianceTitle,
      companyTitle: doc?.footerCompanyTitle?.trim() || fb.footerCompanyTitle,
      sebiLines: [
        doc?.footerSebiLine1?.trim() || fb.footerSebiLine1,
        doc?.footerSebiLine2?.trim() || fb.footerSebiLine2,
        doc?.footerSebiLine3?.trim() || fb.footerSebiLine3,
      ],
      copyrightPrefix: doc?.footerCopyrightPrefix?.trim() || fb.footerCopyrightPrefix,
      copyrightOrg: doc?.footerCopyrightOrg?.trim() || fb.footerCopyrightOrg,
    },
    skipToContentLabel: doc?.skipToContentLabel?.trim() || fb.skipToContentLabel,
    company: {
      linkedInUrl: doc?.companyLinkedInUrl?.trim() || fb.companyLinkedInUrl,
      tagline: doc?.companyTagline?.trim() || fb.companyTagline,
      about: doc?.companyAbout?.trim() || fb.companyAbout,
      industry: doc?.companyIndustry?.trim() || fb.companyIndustry,
      sizeBand: doc?.companySizeBand?.trim() || fb.companySizeBand,
      headquarters: doc?.companyHeadquarters?.trim() || fb.companyHeadquarters,
      locations:
        doc?.companyLocations?.length ?
          doc.companyLocations.map((loc) => ({
            label: loc.label?.trim() || "",
            lines: loc.lines?.filter(Boolean) ?? [],
          }))
        : fb.companyLocations.map((l) => ({ ...l, lines: [...l.lines] })),
      specialties:
        doc?.companySpecialties?.length ? (doc.companySpecialties.filter(Boolean) as string[]) : [...fb.companySpecialties],
    },
    header: {
      utilityLinks: mapChromeHrefLinks(doc?.headerUtilityLinks, seedChromeHrefLinks()),
      logo:
        doc?.headerLogo?.url?.trim() && doc?.headerLogo?.alt?.trim() ?
          { url: doc.headerLogo.url.trim(), alt: doc.headerLogo.alt.trim() }
        : null,
      showInvestorLogin: resolveBool(doc?.headerShowInvestorLogin, seedChromeBool("headerShowInvestorLogin", true)),
      showBookCall: resolveBool(doc?.headerShowBookCall, seedChromeBool("headerShowBookCall", true)),
      investorCtaLabel: (() => {
        const h = doc?.headerNavInvestorLabel?.trim();
        if (h) return h;
        return doc?.navMobileInvestorLogin?.trim() || fb.navMobileInvestorLogin;
      })(),
      bookCtaLabel: (() => {
        const h = doc?.headerNavBookLabel?.trim();
        if (h) return h;
        return doc?.navMobileBookCall?.trim() || fb.navMobileBookCall;
      })(),
    },
    footerOptions: {
      showProductsColumn: resolveBool(doc?.footerShowProductsColumn, seedChromeBool("footerShowProductsColumn", true)),
      productNavLabels:
        doc?.footerProductNavLabels?.length ?
          (doc.footerProductNavLabels.map((s) => s.trim()).filter(Boolean) as string[])
        : [...seedProductNavLabels()],
      extraColumns: mapFooterExtraColumns(doc?.footerExtraColumns ?? null, seedFooterExtraColumns()),
      showNewsletter: resolveBool(doc?.footerShowNewsletter, seedChromeBool("footerShowNewsletter", true)),
      showSocial: resolveBool(doc?.footerShowSocial, seedChromeBool("footerShowSocial", true)),
      showThemeToggle: resolveBool(doc?.footerShowThemeToggle, seedChromeBool("footerShowThemeToggle", true)),
      showSebiBlock: resolveBool(doc?.footerShowSebiBlock, seedChromeBool("footerShowSebiBlock", true)),
    },
  };
}
