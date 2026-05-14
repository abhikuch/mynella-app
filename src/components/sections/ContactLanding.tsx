import Link from "next/link";
import { socialIconSvgs } from "@/components/ui/socialIcons";
import { Logo } from "@/components/ui/Logo";
import { companyLinkedIn } from "@/lib/company-profile";
import type { ResolvedContactPage } from "@/lib/contact-page-content";
import { mergedHeroText } from "@/lib/page-copy-merge";
import type { PageCopyDoc } from "@/sanity/lib/pageCopy";
import type { ResolvedSiteChrome } from "@/lib/site-chrome-resolve";
import { socialLinks } from "@/lib/navigation";
import { ContactForm } from "./ContactForm";
import styles from "./ContactPage.module.css";

export function ContactPageView({
  copy,
  content,
  chrome,
}: {
  copy: PageCopyDoc | null;
  content: ResolvedContactPage;
  chrome: ResolvedSiteChrome;
}) {
  const h = mergedHeroText(copy, {
    line1: content.headline,
    sub: content.subtext,
  });
  const bookUrl = content.bookCallUrl?.trim() || chrome.ctaLinks.bookCall;

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.heroOverline}>— {content.eyebrow.toUpperCase()}</p>
        <h1 className={styles.heroTitle}>{h.line1}</h1>
        <p className={styles.heroSub}>{h.sub}</p>
      </header>

      <div className={styles.grid}>
        <ContactForm
          submitLabel={content.formSubmitLabel}
          placeholders={{
            firstName: content.placeholderFirstName,
            lastName: content.placeholderLastName,
            phone: content.placeholderPhone,
            email: content.placeholderEmail,
            product: content.placeholderProduct,
            message: content.placeholderMessage,
          }}
          productOptions={content.productOptions}
        />

        <aside className={styles.sidebar}>
          <div className={styles.sideBlock}>
            <h3>{content.bookCallTitle}</h3>
            <p>{content.bookCallLead}</p>
            <a className={styles.sideBtn} href={bookUrl} target="_blank" rel="noopener noreferrer">
              {content.bookCallButtonLabel}
            </a>
          </div>

          <div className={styles.sideBlock}>
            <h3>{content.contactBlockTitle}</h3>
            <div className={styles.contactLines}>
              <a href={`tel:${content.phone.replace(/\s/g, "")}`}>{content.phone}</a>
              <a href={`mailto:${content.email}`}>{content.email}</a>
              <a href={content.websiteUrl} target="_blank" rel="noopener noreferrer">
                {content.websiteLabel}
              </a>
            </div>
          </div>

          <div className={styles.sideBlock}>
            <h3>{content.officeTitle}</h3>
            <p className={styles.address}>{content.officeAddress}</p>
            <p className={styles.mapsLink}>
              <a
                href={companyLinkedIn.googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
              </a>
            </p>
          </div>

          <div className={styles.sideBlock}>
            <h3>{content.followTitle}</h3>
            <div className={styles.socialRow}>
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.social}
                  aria-label={s.label}
                >
                  {socialIconSvgs[s.id]}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className={styles.extras}>
        <div className={styles.companyBrand}>
          <Logo brand={chrome.brand} customMark={chrome.header.logo} />
        </div>

        <div className={styles.partnership}>
          <p>
            {content.partnershipText}{" "}
            <a href={content.partnershipLinkUrl} target="_blank" rel="noopener noreferrer">
              {content.partnershipLinkLabel}
            </a>
          </p>
        </div>

        <p className={styles.portal}>
          {content.investorPortalLead}{" "}
          <a href={content.investorPortalUrl} target="_blank" rel="noopener noreferrer">
            {content.investorPortalLinkLabel}
          </a>
        </p>

        <p className={styles.localGuide}>
          Searching for <strong>wealth management in Pune</strong> or comparing finance firms? Read our{" "}
          <Link href="/wealth-management-pune">Pune wealth management guide</Link> (educational), then book a call
          above.
        </p>

        <p className={styles.regulatory}>{content.regulatoryNote}</p>
      </div>
    </div>
  );
}
