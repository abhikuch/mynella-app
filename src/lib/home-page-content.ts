import { homeContentSeed } from "../../sanity/defaultContent/homeContentSeed";

export type HomeProductCard = {
  name: string;
  category: string;
  tag: string;
  min: string;
  minLakh: number;
  href: string;
};

export type HomeLadderStep = { name: string; desc: string; cap: string };

export type HomeServeTier = {
  tier: string;
  capital: string;
  risk: string;
  strategies: string[];
  desc: string;
  cta: string;
  href: string;
};

export type HomeOnboardStep = { title: string; desc: string };

export type HomeFaqPair = { question: string; answer: string };

export type HomeFeatureItem = { iconKey: number; title: string; desc: string };

export type HomeJourneyMilestone = { year: number; title: string; detail: string };

export type ComplianceTableRow = {
  source: string;
  pendingLastMonth: string;
  received: string;
  resolved: string;
  totalPending: string;
  pendingOver3m: string;
  avgResolution: string;
  isTotalRow: boolean;
};

export type ComplianceResourceLink = { label: string; url: string };

export type HomeComplianceBoard = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string | null;
  tableRows: ComplianceTableRow[];
  resourceLinks: ComplianceResourceLink[];
};

export type ResolvedHomePageContent = {
  marqueeItems: string[];
  whatWeDo: {
    eyebrow: string;
    title: string;
    lead: string;
    pill1Label: string;
    pill1Text: string;
    pill2Label: string;
    pill2Text: string;
    sortNote: string;
    accentCallout: string;
    products: HomeProductCard[];
  };
  strategyArchitecture: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: HomeLadderStep[];
  };
  whoWeServe: {
    eyebrow: string;
    title: string;
    lead: string;
    strategiesColumnTitle: string;
    footer: string;
    tiers: HomeServeTier[];
  };
  founderHome: {
    eyebrow: string;
    title: string;
    initials: string;
    name: string;
    role: string;
    creds: string;
    narrative: string;
    keyline: string;
    humanLabel: string;
    humanItem1: string;
    humanItem2: string;
    humanItem3: string;
    humanNote: string;
    machineLabel: string;
    machineItem1: string;
    machineItem2: string;
    machineItem3: string;
    machineNote: string;
    conclusion: string;
  };
  partnersStrip: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  research: {
    eyebrow: string;
    title: string;
    body: string;
    oneliner: string;
    ctaLabel: string;
    ctaHref: string;
  };
  howToEngage: {
    eyebrow: string;
    title: string;
    footer: string;
    steps: HomeOnboardStep[];
  };
  homeFaq: {
    eyebrow: string;
    title: string;
    items: HomeFaqPair[];
  };
  featuresGrid: {
    eyebrow: string;
    title: string;
    lead: string;
    items: HomeFeatureItem[];
  };
  journeyTimeline: {
    eyebrow: string;
    title: string;
    lead: string;
    scrollLeftAria: string;
    scrollRightAria: string;
    regionAria: string;
    milestones: HomeJourneyMilestone[];
  };
  homeBottomCta: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryLabel: string;
    secondaryLabel: string;
    secondaryMailto: string;
  };
  complianceBoard: HomeComplianceBoard;
};

/** Raw CMS shape (fields may be missing). */
export type HomeContentRaw = {
  marqueeItems?: string[] | null;
  whatWeDo?: Partial<ResolvedHomePageContent["whatWeDo"]> | null;
  strategyArchitecture?: Partial<ResolvedHomePageContent["strategyArchitecture"]> | null;
  whoWeServe?: Partial<ResolvedHomePageContent["whoWeServe"]> | null;
  founderHome?: Partial<ResolvedHomePageContent["founderHome"]> | null;
  partnersStrip?: Partial<ResolvedHomePageContent["partnersStrip"]> | null;
  research?: Partial<ResolvedHomePageContent["research"]> | null;
  howToEngage?: Partial<ResolvedHomePageContent["howToEngage"]> | null;
  homeFaq?: Partial<ResolvedHomePageContent["homeFaq"]> | null;
  featuresGrid?: Partial<ResolvedHomePageContent["featuresGrid"]> | null;
  journeyTimeline?: Partial<ResolvedHomePageContent["journeyTimeline"]> | null;
  homeBottomCta?: Partial<ResolvedHomePageContent["homeBottomCta"]> | null;
  complianceBoard?: Partial<HomeComplianceBoard> | null;
} | null;

const fallback: ResolvedHomePageContent = (() => {
  const { _id: _i, _type: _t, ...rest } = homeContentSeed;
  return rest as unknown as ResolvedHomePageContent;
})();

function nonemptyStrings(a: string[] | null | undefined): a is string[] {
  return Array.isArray(a) && a.length > 0 && a.every((s) => typeof s === "string" && s.length > 0);
}

function sortProducts(p: HomeProductCard[]): HomeProductCard[] {
  return [...p].sort((a, b) => a.minLakh - b.minLakh || a.name.localeCompare(b.name));
}

export function resolveHomePageContent(doc: HomeContentRaw): ResolvedHomePageContent {
  if (!doc) return fallback;

  const wdFb = fallback.whatWeDo;
  const wd = doc.whatWeDo;
  const products =
    wd?.products && wd.products.length > 0 ? sortProducts(wd.products as HomeProductCard[]) : sortProducts(wdFb.products);

  return {
    marqueeItems: nonemptyStrings(doc.marqueeItems) ? doc.marqueeItems : fallback.marqueeItems,
    whatWeDo: {
      eyebrow: wd?.eyebrow?.trim() || wdFb.eyebrow,
      title: wd?.title?.trim() || wdFb.title,
      lead: wd?.lead?.trim() || wdFb.lead,
      pill1Label: wd?.pill1Label?.trim() || wdFb.pill1Label,
      pill1Text: wd?.pill1Text?.trim() || wdFb.pill1Text,
      pill2Label: wd?.pill2Label?.trim() || wdFb.pill2Label,
      pill2Text: wd?.pill2Text?.trim() || wdFb.pill2Text,
      sortNote: wd?.sortNote?.trim() || wdFb.sortNote,
      accentCallout: wd?.accentCallout?.trim() || wdFb.accentCallout,
      products,
    },
    strategyArchitecture: mergeLadder(doc.strategyArchitecture, fallback.strategyArchitecture),
    whoWeServe: mergeServe(doc.whoWeServe, fallback.whoWeServe),
    founderHome: mergeFounder(doc.founderHome, fallback.founderHome),
    partnersStrip: mergeSimple3(doc.partnersStrip, fallback.partnersStrip),
    research: mergeResearch(doc.research, fallback.research),
    howToEngage: mergeEngage(doc.howToEngage, fallback.howToEngage),
    homeFaq: mergeHomeFaq(doc.homeFaq, fallback.homeFaq),
    featuresGrid: mergeFeaturesGrid(doc.featuresGrid, fallback.featuresGrid),
    journeyTimeline: mergeJourney(doc.journeyTimeline, fallback.journeyTimeline),
    homeBottomCta: mergeHomeBottomCta(doc.homeBottomCta, fallback.homeBottomCta),
    complianceBoard: mergeComplianceBoard(doc.complianceBoard, fallback.complianceBoard),
  };
}

function mergeLadder(
  patch: Partial<ResolvedHomePageContent["strategyArchitecture"]> | null | undefined,
  fb: ResolvedHomePageContent["strategyArchitecture"],
): ResolvedHomePageContent["strategyArchitecture"] {
  if (!patch) return fb;
  const steps =
    patch.steps && patch.steps.length > 0
      ? (patch.steps as HomeLadderStep[])
      : fb.steps;
  return {
    eyebrow: patch.eyebrow?.trim() || fb.eyebrow,
    title: patch.title?.trim() || fb.title,
    lead: patch.lead?.trim() || fb.lead,
    steps,
  };
}

function mergeServe(
  patch: Partial<ResolvedHomePageContent["whoWeServe"]> | null | undefined,
  fb: ResolvedHomePageContent["whoWeServe"],
): ResolvedHomePageContent["whoWeServe"] {
  if (!patch) return fb;
  const tiers =
    patch.tiers && patch.tiers.length > 0 ? (patch.tiers as HomeServeTier[]) : fb.tiers;
  return {
    eyebrow: patch.eyebrow?.trim() || fb.eyebrow,
    title: patch.title?.trim() || fb.title,
    lead: patch.lead?.trim() || fb.lead,
    strategiesColumnTitle:
      patch.strategiesColumnTitle?.trim() || fb.strategiesColumnTitle,
    footer: patch.footer?.trim() || fb.footer,
    tiers,
  };
}

function mergeFounder(
  patch: Partial<ResolvedHomePageContent["founderHome"]> | null | undefined,
  fb: ResolvedHomePageContent["founderHome"],
): ResolvedHomePageContent["founderHome"] {
  if (!patch) return fb;
  return {
    eyebrow: patch.eyebrow?.trim() || fb.eyebrow,
    title: patch.title?.trim() || fb.title,
    initials: patch.initials?.trim() || fb.initials,
    name: patch.name?.trim() || fb.name,
    role: patch.role?.trim() || fb.role,
    creds: patch.creds?.trim() || fb.creds,
    narrative: patch.narrative?.trim() || fb.narrative,
    keyline: patch.keyline?.trim() || fb.keyline,
    humanLabel: patch.humanLabel?.trim() || fb.humanLabel,
    humanItem1: patch.humanItem1?.trim() || fb.humanItem1,
    humanItem2: patch.humanItem2?.trim() || fb.humanItem2,
    humanItem3: patch.humanItem3?.trim() || fb.humanItem3,
    humanNote: patch.humanNote?.trim() || fb.humanNote,
    machineLabel: patch.machineLabel?.trim() || fb.machineLabel,
    machineItem1: patch.machineItem1?.trim() || fb.machineItem1,
    machineItem2: patch.machineItem2?.trim() || fb.machineItem2,
    machineItem3: patch.machineItem3?.trim() || fb.machineItem3,
    machineNote: patch.machineNote?.trim() || fb.machineNote,
    conclusion: patch.conclusion?.trim() || fb.conclusion,
  };
}

function mergeSimple3(
  patch: Partial<ResolvedHomePageContent["partnersStrip"]> | null | undefined,
  fb: ResolvedHomePageContent["partnersStrip"],
): ResolvedHomePageContent["partnersStrip"] {
  if (!patch) return fb;
  return {
    eyebrow: patch.eyebrow?.trim() || fb.eyebrow,
    title: patch.title?.trim() || fb.title,
    lead: patch.lead?.trim() || fb.lead,
  };
}

function mergeResearch(
  patch: Partial<ResolvedHomePageContent["research"]> | null | undefined,
  fb: ResolvedHomePageContent["research"],
): ResolvedHomePageContent["research"] {
  if (!patch) return fb;
  return {
    eyebrow: patch.eyebrow?.trim() || fb.eyebrow,
    title: patch.title?.trim() || fb.title,
    body: patch.body?.trim() || fb.body,
    oneliner: patch.oneliner?.trim() || fb.oneliner,
    ctaLabel: patch.ctaLabel?.trim() || fb.ctaLabel,
    ctaHref: patch.ctaHref?.trim() || fb.ctaHref,
  };
}

function mergeEngage(
  patch: Partial<ResolvedHomePageContent["howToEngage"]> | null | undefined,
  fb: ResolvedHomePageContent["howToEngage"],
): ResolvedHomePageContent["howToEngage"] {
  if (!patch) return fb;
  const steps =
    patch.steps && patch.steps.length > 0
      ? (patch.steps as HomeOnboardStep[])
      : fb.steps;
  return {
    eyebrow: patch.eyebrow?.trim() || fb.eyebrow,
    title: patch.title?.trim() || fb.title,
    footer: patch.footer?.trim() || fb.footer,
    steps,
  };
}

function mergeHomeFaq(
  patch: Partial<ResolvedHomePageContent["homeFaq"]> | null | undefined,
  fb: ResolvedHomePageContent["homeFaq"],
): ResolvedHomePageContent["homeFaq"] {
  if (!patch) return fb;
  const items =
    patch.items && patch.items.length > 0 ? (patch.items as HomeFaqPair[]) : fb.items;
  return {
    eyebrow: patch.eyebrow?.trim() || fb.eyebrow,
    title: patch.title?.trim() || fb.title,
    items,
  };
}

function mergeFeaturesGrid(
  patch: Partial<ResolvedHomePageContent["featuresGrid"]> | null | undefined,
  fb: ResolvedHomePageContent["featuresGrid"],
): ResolvedHomePageContent["featuresGrid"] {
  if (!patch) return fb;
  const items =
    patch.items && patch.items.length > 0 ? (patch.items as HomeFeatureItem[]) : fb.items;
  return {
    eyebrow: patch.eyebrow?.trim() || fb.eyebrow,
    title: patch.title?.trim() || fb.title,
    lead: patch.lead?.trim() || fb.lead,
    items,
  };
}

function mergeJourney(
  patch: Partial<ResolvedHomePageContent["journeyTimeline"]> | null | undefined,
  fb: ResolvedHomePageContent["journeyTimeline"],
): ResolvedHomePageContent["journeyTimeline"] {
  if (!patch) return fb;
  const milestones =
    patch.milestones && patch.milestones.length > 0
      ? (patch.milestones as HomeJourneyMilestone[])
      : fb.milestones;
  return {
    eyebrow: patch.eyebrow?.trim() || fb.eyebrow,
    title: patch.title?.trim() || fb.title,
    lead: patch.lead?.trim() || fb.lead,
    scrollLeftAria: patch.scrollLeftAria?.trim() || fb.scrollLeftAria,
    scrollRightAria: patch.scrollRightAria?.trim() || fb.scrollRightAria,
    regionAria: patch.regionAria?.trim() || fb.regionAria,
    milestones,
  };
}

function mergeHomeBottomCta(
  patch: Partial<ResolvedHomePageContent["homeBottomCta"]> | null | undefined,
  fb: ResolvedHomePageContent["homeBottomCta"],
): ResolvedHomePageContent["homeBottomCta"] {
  if (!patch) return fb;
  return {
    eyebrow: patch.eyebrow?.trim() || fb.eyebrow,
    title: patch.title?.trim() || fb.title,
    lead: patch.lead?.trim() || fb.lead,
    primaryLabel: patch.primaryLabel?.trim() || fb.primaryLabel,
    secondaryLabel: patch.secondaryLabel?.trim() || fb.secondaryLabel,
    secondaryMailto: patch.secondaryMailto?.trim() || fb.secondaryMailto,
  };
}

function normalizeComplianceRow(
  r: Partial<ComplianceTableRow> | null | undefined,
): ComplianceTableRow {
  return {
    source: r?.source?.trim() || "",
    pendingLastMonth: r?.pendingLastMonth?.trim() || "0",
    received: r?.received?.trim() || "0",
    resolved: r?.resolved?.trim() || "0",
    totalPending: r?.totalPending?.trim() || "0",
    pendingOver3m: r?.pendingOver3m?.trim() || "0",
    avgResolution: r?.avgResolution?.trim() || "—",
    isTotalRow: Boolean(r?.isTotalRow),
  };
}

function mergeComplianceBoard(
  patch: Partial<HomeComplianceBoard> | null | undefined,
  fb: HomeComplianceBoard,
): HomeComplianceBoard {
  if (!patch) return fb;
  const tableRows =
    patch.tableRows && patch.tableRows.length > 0
      ? patch.tableRows.map((row) => normalizeComplianceRow(row))
      : fb.tableRows;
  const resourceLinks =
    patch.resourceLinks !== undefined && patch.resourceLinks !== null
      ? patch.resourceLinks.map((l) => ({
          label: l.label?.trim() || "",
          url: l.url?.trim() || "#",
        }))
      : fb.resourceLinks;
  return {
    eyebrow: patch.eyebrow?.trim() || fb.eyebrow,
    title: patch.title?.trim() || fb.title,
    description: patch.description?.trim() || fb.description,
    lastUpdated:
      typeof patch.lastUpdated === "string" && patch.lastUpdated.trim()
        ? patch.lastUpdated.trim()
        : fb.lastUpdated,
    tableRows,
    resourceLinks,
  };
}
