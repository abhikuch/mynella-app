/** Deterministic partner doc ids + public logo fallbacks (no binary upload in seed). */
export type PartnerSeedRow = {
  _id: string;
  name: string;
  href: string;
  sortOrder: number;
  publicLogoPath: string;
};

export const partnersSeedRows: PartnerSeedRow[] = [
  { _id: "partner-dhan", name: "Dhan", href: "https://dhan.co/", sortOrder: 0, publicLogoPath: "/partners/dhan.png" },
  { _id: "partner-nubra", name: "Nubra", href: "https://nubra.io/", sortOrder: 1, publicLogoPath: "/partners/nubra.png" },
  { _id: "partner-sebi", name: "SEBI", href: "https://www.sebi.gov.in/", sortOrder: 2, publicLogoPath: "/partners/sebi.png" },
  { _id: "partner-sbi", name: "State Bank of India", href: "https://onlinesbi.sbi.bank.in/", sortOrder: 3, publicLogoPath: "/partners/sbi.png" },
  { _id: "partner-motilal", name: "Motilal Oswal", href: "https://www.motilaloswal.com/", sortOrder: 4, publicLogoPath: "/partners/motilaloswal.png" },
  { _id: "partner-nuvama", name: "Nuvama Wealth", href: "https://www.nuvamawealth.com/", sortOrder: 5, publicLogoPath: "/partners/nuvama.png" },
  { _id: "partner-zerodha", name: "Zerodha", href: "https://zerodha.com/", sortOrder: 6, publicLogoPath: "/partners/zerodha.png" },
  { _id: "partner-smallcase", name: "smallcase", href: "https://smallcase.com/", sortOrder: 7, publicLogoPath: "/partners/smallcase.png" },
  { _id: "partner-cirrus", name: "Cirrus Trade", href: "https://cirrus.trade/", sortOrder: 8, publicLogoPath: "/partners/cirrus.png" },
];
