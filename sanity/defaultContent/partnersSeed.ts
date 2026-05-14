/** Partner logos for the home strip — empty by default for MyNella makeup marketing. */
export type PartnerSeedRow = {
  _id: string;
  name: string;
  href: string;
  sortOrder: number;
  publicLogoPath: string;
};

export const partnersSeedRows: PartnerSeedRow[] = [];
