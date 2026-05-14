/** Single source for FAQ placement option lists (Studio + app). */
export const FAQ_PLACEMENT_OPTIONS = [
  { title: "About page", value: "about" },
  { title: "Home (if curated separately)", value: "home" },
  { title: "PMS hub (/pms)", value: "pms-hub" },
  { title: "Algo hub (/algo)", value: "algo-hub" },
  { title: "Model portfolios landing", value: "model-portfolios" },
  { title: "Polaris PMS product", value: "pms-polaris" },
  { title: "Optimus", value: "algo-optimus" },
  { title: "Pledge+", value: "algo-pledge-plus" },
  { title: "Pledge+ Mini", value: "algo-pledge-plus-mini" },
  { title: "Polaris Lite", value: "algo-polaris-lite" },
] as const;

export type FaqPlacement = (typeof FAQ_PLACEMENT_OPTIONS)[number]["value"];
