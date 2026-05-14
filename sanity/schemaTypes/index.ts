import { contactPage } from "./contactPage";
import { faqItem } from "./faqItem";
import { homeContent } from "./homeContent";
import { homeProductCard } from "./homeContentObjects";
import { marketingPage } from "./marketingPage";
import { modFaqSection, modHeadingBand, modRichText } from "./marketingModules";
import { navChild, navGrandchild, navRoot } from "./navLinkTypes";
import { pageCopy } from "./pageCopy";
import { partner } from "./partner";
import { portfolioStrategy } from "./portfolioStrategy";
import { post } from "./post";
import { siteChrome } from "./siteChrome";
import { siteSettings } from "./siteSettings";
import { teamMember } from "./teamMember";

export const schemaTypes = [
  siteSettings,
  contactPage,
  partner,
  siteChrome,
  navGrandchild,
  navChild,
  navRoot,
  homeProductCard,
  homeContent,
  pageCopy,
  modHeadingBand,
  modFaqSection,
  modRichText,
  marketingPage,
  portfolioStrategy,
  post,
  teamMember,
  faqItem,
];
