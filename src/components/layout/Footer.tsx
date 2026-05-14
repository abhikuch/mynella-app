import type { CSSProperties } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { socialIconSvgs } from "@/components/ui/socialIcons";
import type { SiteSettingsDoc } from "@/sanity/lib/site";
import type { ResolvedSiteChrome } from "@/lib/site-chrome-resolve";
import { resolvePrivacyPolicyHref } from "@/lib/legal-links";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { NewsletterForm } from "@/components/leads/NewsletterForm";
import styles from "./Footer.module.css";

const DEFAULT_BRAND_DESC =
  "A SEBI-regulated Portfolio Manager and Research Analyst delivering institutional-grade investment strategies to every investor in India.";

const DEFAULT_DISCLAIMER_BODY =
  "Investments in securities markets are subject to market risks. Read all related documents carefully before investing. SEBI registration does not guarantee performance or assure returns. Past performance is not indicative of future results. Please consult your financial advisor before investing.";

function mergeCompanyLinks(
  chrome: ResolvedSiteChrome,
  settings: SiteSettingsDoc | null,
) {
  return chrome.footerCompany.map((link) => {
    if (link.label === "Terms & Conditions" && settings?.legalTermsUrl?.trim()) {
      return { ...link, href: settings.legalTermsUrl.trim() };
    }
    if (link.label === "Privacy Policy" && settings?.legalPrivacyUrl?.trim()) {
      return { ...link, href: settings.legalPrivacyUrl.trim() };
    }
    return link;
  });
}

function SocialLink({ id, label, href }: { id: string; label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.social}
      aria-label={label}
    >
      {socialIconSvgs[id]}
    </a>
  );
}

function ChromeHref({
  label,
  href,
  openInNewTab,
}: {
  label: string;
  href: string;
  openInNewTab: boolean;
}) {
  const external = href.startsWith("http");
  if (external || openInNewTab) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  return <Link href={href}>{label}</Link>;
}

export function Footer({
  settings,
  chrome,
}: {
  settings?: SiteSettingsDoc | null;
  chrome: ResolvedSiteChrome;
}) {
  const fo = chrome.footerOptions;
  const productItems =
    fo.showProductsColumn ?
      chrome.navigation.filter((n) => fo.productNavLabels.includes(n.label))
    : [];

  const gridTemplateColumns = (() => {
    const parts: string[] = ["1.35fr"];
    if (fo.showProductsColumn) parts.push("1fr");
    parts.push("1fr", "1fr");
    for (let i = 0; i < fo.extraColumns.length; i++) parts.push("1fr");
    return parts.join(" ");
  })();

  const brandDesc =
    settings?.footerBrandDescription?.trim() || DEFAULT_BRAND_DESC;
  const disclaimerBody =
    settings?.footerDisclaimer?.trim() || DEFAULT_DISCLAIMER_BODY;
  const companyLinks = mergeCompanyLinks(chrome, settings ?? null);
  const privacyHref = resolvePrivacyPolicyHref(chrome, settings ?? null);
  const [sebi1, sebi2, sebi3] = chrome.footerUi.sebiLines;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div
          className={styles.grid}
          style={{ "--footer-grid-columns": gridTemplateColumns } as CSSProperties}
        >
          <div className={styles.brand}>
            <Logo brand={chrome.brand} customMark={chrome.header.logo} />
            <p className={styles.brandDesc}>{brandDesc}</p>
            {fo.showSebiBlock && (
              <div className={styles.sebi}>
                <p>{sebi1}</p>
                <p>{sebi2}</p>
                <p>{sebi3}</p>
              </div>
            )}
          </div>

          {fo.showProductsColumn && (
            <div className={styles.col}>
              <h5 className={styles.colTitle}>{chrome.footerUi.productsTitle}</h5>
              <ul className={styles.colList}>
                {productItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                    {item.children && (
                      <ul className={styles.subList}>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href}>{child.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.col}>
            <h5 className={styles.colTitle}>{chrome.footerUi.complianceTitle}</h5>
            <ul className={styles.colList}>
              {chrome.footerCompliance.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("http") ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h5 className={styles.colTitle}>{chrome.footerUi.companyTitle}</h5>
            <ul className={styles.colList}>
              {companyLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("http") ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {fo.extraColumns.map((col, i) => (
            <div key={`${col.title}-${i}`} className={styles.col}>
              <h5 className={styles.colTitle}>{col.title}</h5>
              <ul className={styles.colList}>
                {col.links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <ChromeHref {...link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {fo.showNewsletter && (
          <section className={styles.newsletterBand} aria-labelledby="footer-newsletter-heading">
            <div className={styles.newsletterBandInner}>
              <div className={styles.newsletterBandCopy}>
                <p className={styles.newsletterBandKicker}>Investor updates</p>
                <p className={styles.newsletterBandLead}>
                  Research notes, regulatory context, and product news—delivered when we have
                  something material to share.
                </p>
              </div>
              <NewsletterForm
                privacyHref={privacyHref}
                layout="footerBand"
                titleId="footer-newsletter-heading"
              />
            </div>
          </section>
        )}

        <div className={styles.disclaimer}>
          <p>
            <strong>Disclaimer:</strong> {disclaimerBody}
          </p>
        </div>

        <div className={styles.bottom}>
          <p>
            {chrome.footerUi.copyrightPrefix} {new Date().getFullYear()}{" "}
            {chrome.footerUi.copyrightOrg}. All rights reserved.
          </p>
          <div className={styles.bottomEnd}>
            {fo.showThemeToggle && <ThemeToggle />}
            {fo.showSocial && (
              <div className={styles.socialRow}>
                {chrome.socialLinks.map((s) => (
                  <SocialLink key={s.id} id={s.id} label={s.label} href={s.href} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
