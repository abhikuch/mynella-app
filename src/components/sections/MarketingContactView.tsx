import Link from "next/link";
import { MarketingPageShell } from "@/components/landing/MarketingPageShell";
import shell from "@/components/landing/marketing-shell.module.css";
import type { ResolvedContactPage } from "@/lib/contact-page-content";
import { mergedHeroText } from "@/lib/page-copy-merge";
import type { PageCopyDoc } from "@/sanity/lib/pageCopy";
import { ContactForm } from "./ContactForm";
import contactStyles from "./marketing-contact.module.css";

export function MarketingContactView({
  copy,
  content,
}: {
  copy: PageCopyDoc | null;
  content: ResolvedContactPage;
}) {
  const h = mergedHeroText(copy, {
    line1: content.headline,
    sub: content.subtext,
  });
  const bookUrl = content.bookCallUrl?.trim() || "https://cal.com/mynella/talk";

  return (
    <MarketingPageShell activeNav="contact">
      <section className={shell.pageHero} aria-labelledby="contact-heading">
        <div className={shell.pageHeroInner}>
          <p className={shell.eyebrow}>{content.eyebrow}</p>
          <h1 id="contact-heading" className={shell.pageTitle}>
            {h.line1}
          </h1>
          <p className={shell.pageLead}>{h.sub}</p>
        </div>
      </section>

      <section className={shell.section} aria-labelledby="contact-form-heading">
        <div className={`${shell.sectionInner} ${contactStyles.grid}`}>
          <div>
            <h2 id="contact-form-heading" className={shell.sectionTitle}>
              Send a message
            </h2>
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
              variant="marketing"
            />
          </div>

          <aside className={contactStyles.sidebar}>
            <div className={contactStyles.sideBlock}>
              <h3>{content.bookCallTitle}</h3>
              <p>{content.bookCallLead}</p>
              <a className={contactStyles.sideBtn} href={bookUrl} target="_blank" rel="noopener noreferrer">
                {content.bookCallButtonLabel}
              </a>
            </div>

            <div className={contactStyles.sideBlock}>
              <h3>{content.contactBlockTitle}</h3>
              <div className={contactStyles.contactLines}>
                {content.phone ? (
                  <a href={`tel:${content.phone.replace(/\s/g, "")}`}>{content.phone}</a>
                ) : null}
                <a href={`mailto:${content.email}`}>{content.email}</a>
                <a href={content.websiteUrl} target="_blank" rel="noopener noreferrer">
                  {content.websiteLabel}
                </a>
              </div>
            </div>

            <p className={contactStyles.note}>{content.regulatoryNote}</p>
            <p className={contactStyles.note}>
              Need to delete your Nella app account? Use the{" "}
              <Link href="/delete-account">account deletion page</Link>.
            </p>
          </aside>
        </div>
      </section>
    </MarketingPageShell>
  );
}
