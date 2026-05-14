export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const navigation: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const ctaLinks = {
  investorLogin: "https://www.mynella.com",
  bookCall: "https://cal.com/mynella/talk",
  bookOptimus: "https://www.mynella.com/contact",
  bookPledgePlus: "https://www.mynella.com/contact",
  bookPolaris: "https://www.mynella.com/contact",
  bookPartnership: "https://cal.com/mynella/partnership",
} as const;

export const footerCompany = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

export const socialLinks = [
  { id: "x", label: "X (Twitter)", href: "https://x.com/iam_mynella" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/mynella" },
  { id: "substack", label: "Substack", href: "https://mynella.substack.com/" },
];
