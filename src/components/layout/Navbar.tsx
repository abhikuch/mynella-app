"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import type { NavItem } from "@/lib/navigation";
import type { ResolvedSiteChrome } from "@/lib/site-chrome-resolve";
import styles from "./Navbar.module.css";

function ChevronDown() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M2 3.5l3.5 3.5L9 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MegaDropdown({ item }: { item: NavItem }) {
  return (
    <div className={styles.mega}>
      {item.children?.map((child) => (
        <div key={`${child.label}-${child.href}`} className={styles.megaGroup}>
          <Link href={child.href} className={styles.megaTitle}>
            {child.label}
            {child.description && (
              <span className={styles.megaDesc}>{child.description}</span>
            )}
          </Link>
          {child.children && (
            <div className={styles.megaSubs}>
              {child.children.map((sub) => (
                <Link key={sub.href} href={sub.href} className={styles.megaSub}>
                  {sub.label}
                  <ArrowRight />
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MobileAccordionInner({
  items,
  onClose,
  overviewSuffix,
  investorLoginHref,
  bookCallHref,
  investorCtaLabel,
  bookCtaLabel,
  showInvestorLogin,
  showBookCall,
}: {
  items: NavItem[];
  onClose: () => void;
  overviewSuffix: string;
  investorLoginHref: string;
  bookCallHref: string;
  investorCtaLabel: string;
  bookCtaLabel: string;
  showInvestorLogin: boolean;
  showBookCall: boolean;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className={styles.mobileMenu}>
      {items.map((item, i) => (
        <div key={item.href} className={styles.mobileItem}>
          {item.children ? (
            <>
              <button
                className={styles.mobileLink}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                {item.label}
                <ChevronDown />
              </button>
              {openIdx === i && (
                <div className={styles.mobileSub}>
                  <Link href={item.href} className={styles.mobileSubLink} onClick={onClose}>
                    {item.label} {overviewSuffix}
                  </Link>
                  {item.children.map((child) => (
                    <div key={`${child.label}-${child.href}`}>
                      <Link href={child.href} className={styles.mobileSubLink} onClick={onClose}>
                        {child.label}
                      </Link>
                      {child.children?.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={styles.mobileSubSubLink}
                          onClick={onClose}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Link href={item.href} className={styles.mobileLink} onClick={onClose}>
              {item.label}
            </Link>
          )}
        </div>
      ))}
      {(showInvestorLogin || showBookCall) && (
        <div className={styles.mobileCtas}>
          {showInvestorLogin && (
            <a
              href={investorLoginHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileGhost}
            >
              {investorCtaLabel}
            </a>
          )}
          {showBookCall && (
            <a
              href={bookCallHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobilePrimary}
            >
              {bookCtaLabel}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function UtilityLink({
  label,
  href,
  openInNewTab,
}: {
  label: string;
  href: string;
  openInNewTab: boolean;
}) {
  const external = href.startsWith("http");
  const blank = openInNewTab || external;
  if (blank) {
    return (
      <a href={href} className={styles.utilityLink} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={styles.utilityLink}>
      {label}
    </Link>
  );
}

export function Navbar({ chrome }: { chrome: ResolvedSiteChrome }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigation = chrome.navigation;
  const { header } = chrome;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 941px)");
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  function isActive(href: string) {
    if (!mounted) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav className={styles.nav}>
      {header.utilityLinks.length > 0 && (
        <div className={styles.utilityBar}>
          <div className={styles.utilityInner}>
            {header.utilityLinks.map((u) => (
              <UtilityLink key={`${u.href}-${u.label}`} {...u} />
            ))}
          </div>
        </div>
      )}
      <div className={styles.inner}>
        <Logo brand={chrome.brand} customMark={header.logo} priority />

        <ul className={styles.links}>
          {navigation.map((item) => (
            <li
              key={item.href}
              className={[
                styles.linkItem,
                item.children && styles.hasDropdown,
              ].filter(Boolean).join(" ")}
            >
              {item.children ? (
                <>
                  <Link
                    href={item.href}
                    className={[
                      styles.link,
                      isActive(item.href) && styles.active,
                    ].filter(Boolean).join(" ")}
                  >
                    {item.label}
                    <ChevronDown />
                  </Link>
                  <MegaDropdown item={item} />
                </>
              ) : (
                <Link
                  href={item.href}
                  className={[
                    styles.link,
                    isActive(item.href) && styles.active,
                  ].filter(Boolean).join(" ")}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {(header.showInvestorLogin || header.showBookCall) && (
          <div className={styles.ctas}>
            {header.showInvestorLogin && (
              <a
                href={chrome.ctaLinks.investorLogin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ghostBtn}
              >
                {header.investorCtaLabel}
              </a>
            )}
            {header.showBookCall && (
              <a
                href={chrome.ctaLinks.bookCall}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                {header.bookCtaLabel}
              </a>
            )}
          </div>
        )}

        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={chrome.navUi.toggleAria}
        >
          <span className={mobileOpen ? styles.x1 : undefined} />
          <span className={mobileOpen ? styles.x2 : undefined} />
          <span className={mobileOpen ? styles.x3 : undefined} />
        </button>
      </div>

      {mobileOpen && (
        <div
          className={styles.mobileOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation menu"
        >
          <div className={styles.mobileOverlayHeader}>
            <Logo brand={chrome.brand} customMark={header.logo} />
            <button
              type="button"
              className={styles.mobileClose}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                <path
                  d="M4 4l14 14M18 4L4 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className={styles.mobileOverlayBody}>
            <MobileAccordionInner
              items={navigation}
              onClose={() => setMobileOpen(false)}
              overviewSuffix={chrome.navUi.overviewSuffix}
              investorLoginHref={chrome.ctaLinks.investorLogin}
              bookCallHref={chrome.ctaLinks.bookCall}
              investorCtaLabel={header.investorCtaLabel}
              bookCtaLabel={header.bookCtaLabel}
              showInvestorLogin={header.showInvestorLogin}
              showBookCall={header.showBookCall}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
