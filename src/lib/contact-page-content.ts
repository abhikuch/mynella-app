import { contactPageSeed } from "../../sanity/defaultContent/contactPageSeed";

const { _id: _i, _type: _t, ...contactFallback } = contactPageSeed;

export type ContactProductOption = { label: string; value: string };

export type ResolvedContactPage = {
  eyebrow: string;
  headline: string;
  subtext: string;
  bookCallTitle: string;
  bookCallLead: string;
  bookCallButtonLabel: string;
  bookCallUrl: string | null;
  contactBlockTitle: string;
  phone: string;
  email: string;
  websiteLabel: string;
  websiteUrl: string;
  officeTitle: string;
  officeAddress: string;
  followTitle: string;
  productOptions: ContactProductOption[];
  formSubmitLabel: string;
  placeholderFirstName: string;
  placeholderLastName: string;
  placeholderPhone: string;
  placeholderEmail: string;
  placeholderProduct: string;
  placeholderMessage: string;
  mailtoEmail: string;
  partnershipText: string;
  partnershipLinkLabel: string;
  partnershipLinkUrl: string;
  investorPortalLead: string;
  investorPortalLinkLabel: string;
  investorPortalUrl: string;
  regulatoryNote: string;
};

export type ContactPageRaw = {
  eyebrow?: string | null;
  headline?: string | null;
  subtext?: string | null;
  bookCallTitle?: string | null;
  bookCallLead?: string | null;
  bookCallButtonLabel?: string | null;
  bookCallUrl?: string | null;
  contactBlockTitle?: string | null;
  phone?: string | null;
  email?: string | null;
  websiteLabel?: string | null;
  websiteUrl?: string | null;
  officeTitle?: string | null;
  officeAddress?: string | null;
  followTitle?: string | null;
  productOptions?: ContactProductOption[] | null;
  formSubmitLabel?: string | null;
  placeholderFirstName?: string | null;
  placeholderLastName?: string | null;
  placeholderPhone?: string | null;
  placeholderEmail?: string | null;
  placeholderProduct?: string | null;
  placeholderMessage?: string | null;
  mailtoEmail?: string | null;
  partnershipText?: string | null;
  partnershipLinkLabel?: string | null;
  partnershipLinkUrl?: string | null;
  investorPortalLead?: string | null;
  investorPortalLinkLabel?: string | null;
  investorPortalUrl?: string | null;
  regulatoryNote?: string | null;
} | null;

const fb = contactFallback as unknown as ResolvedContactPage;

export function resolveContactPage(doc: ContactPageRaw): ResolvedContactPage {
  if (!doc) return fb;
  const productOptions =
    doc.productOptions && doc.productOptions.length > 0 ? doc.productOptions : fb.productOptions;
  return {
    eyebrow: doc.eyebrow?.trim() || fb.eyebrow,
    headline: doc.headline?.trim() || fb.headline,
    subtext: doc.subtext?.trim() || fb.subtext,
    bookCallTitle: doc.bookCallTitle?.trim() || fb.bookCallTitle,
    bookCallLead: doc.bookCallLead?.trim() || fb.bookCallLead,
    bookCallButtonLabel: doc.bookCallButtonLabel?.trim() || fb.bookCallButtonLabel,
    bookCallUrl: doc.bookCallUrl?.trim() || null,
    contactBlockTitle: doc.contactBlockTitle?.trim() || fb.contactBlockTitle,
    phone: doc.phone?.trim() || fb.phone,
    email: doc.email?.trim() || fb.email,
    websiteLabel: doc.websiteLabel?.trim() || fb.websiteLabel,
    websiteUrl: doc.websiteUrl?.trim() || fb.websiteUrl,
    officeTitle: doc.officeTitle?.trim() || fb.officeTitle,
    officeAddress: doc.officeAddress?.trim() || fb.officeAddress,
    followTitle: doc.followTitle?.trim() || fb.followTitle,
    productOptions: productOptions.map((o) => ({
      label: o.label,
      value: o.value,
    })),
    formSubmitLabel: doc.formSubmitLabel?.trim() || fb.formSubmitLabel,
    placeholderFirstName: doc.placeholderFirstName?.trim() || fb.placeholderFirstName,
    placeholderLastName: doc.placeholderLastName?.trim() || fb.placeholderLastName,
    placeholderPhone: doc.placeholderPhone?.trim() || fb.placeholderPhone,
    placeholderEmail: doc.placeholderEmail?.trim() || fb.placeholderEmail,
    placeholderProduct: doc.placeholderProduct?.trim() || fb.placeholderProduct,
    placeholderMessage: doc.placeholderMessage?.trim() || fb.placeholderMessage,
    mailtoEmail: doc.mailtoEmail?.trim() || fb.mailtoEmail,
    partnershipText: doc.partnershipText?.trim() || fb.partnershipText,
    partnershipLinkLabel: doc.partnershipLinkLabel?.trim() || fb.partnershipLinkLabel,
    partnershipLinkUrl: doc.partnershipLinkUrl?.trim() || fb.partnershipLinkUrl,
    investorPortalLead: doc.investorPortalLead?.trim() || fb.investorPortalLead,
    investorPortalLinkLabel: doc.investorPortalLinkLabel?.trim() || fb.investorPortalLinkLabel,
    investorPortalUrl: doc.investorPortalUrl?.trim() || fb.investorPortalUrl,
    regulatoryNote: doc.regulatoryNote?.trim() || fb.regulatoryNote,
  };
}
