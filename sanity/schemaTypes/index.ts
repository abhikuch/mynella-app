import { contactPage } from "./contactPage";
import { navChild, navGrandchild, navRoot } from "./navLinkTypes";
import { pageCopy } from "./pageCopy";
import { partner } from "./partner";
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
  pageCopy,
  teamMember,
];
