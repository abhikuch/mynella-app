import Link from "next/link";
import { fraunces, dmSans } from "@/lib/fonts";
import { TrackedLink } from "@/components/landing/TrackedLink";
import styles from "./marketing-shell.module.css";

export type MarketingNavKey = "about" | "contact" | "delete-account";

type Props = {
  children: React.ReactNode;
  activeNav?: MarketingNavKey | null;
};

const FOOTER_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
  { href: "/delete-account", label: "Delete account" },
] as const;

export function MarketingPageShell({ children, activeNav = null }: Props) {
  const fontVars = `${fraunces.variable} ${dmSans.variable}`;

  return (
    <div className={`${styles.root} ${fontVars}`}>
      <a className={styles.skip} href="#nl-main">
        Skip to content
      </a>

      <header className={styles.topBar}>
        <TrackedLink href="/" className={styles.brand} eventName="cta_click" eventParams={{ target: "logo_home" }}>
          Nell<em>a</em>
        </TrackedLink>
        <nav className={styles.nav} aria-label="Marketing">
          <TrackedLink
            className={`${styles.navLink} ${activeNav === "about" ? styles.navLinkActive : ""}`}
            href="/about"
            eventName="cta_click"
            eventParams={{ target: "nav_about" }}
          >
            About
          </TrackedLink>
          <TrackedLink
            className={`${styles.navLink} ${activeNav === "contact" ? styles.navLinkActive : ""}`}
            href="/contact"
            eventName="cta_click"
            eventParams={{ target: "nav_contact" }}
          >
            Contact
          </TrackedLink>
          <TrackedLink
            className={`${styles.navLink} ${styles.navLinkEm}`}
            href="/#nl-waitlist"
            eventName="cta_click"
            eventParams={{ target: "nav_waitlist" }}
          >
            Waitlist
          </TrackedLink>
        </nav>
      </header>

      <main id="nl-main" className={styles.main}>
        {children}
      </main>

      <footer className={styles.siteFooter}>
        <div className={styles.footerInner}>
          <div className={styles.footerLinks}>
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
          <p className={styles.footerNote}>
            Nella is the companion app; MyNella is this marketing site. Nothing here is medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
