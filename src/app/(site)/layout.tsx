import { headers } from "next/headers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SiteCreditStrip } from "@/components/layout/SiteCreditStrip";
import { resolveFooterCredit } from "@/lib/footer-credit";
import { getSiteSettings } from "@/sanity/lib/site";
import { getResolvedSiteChrome } from "@/sanity/lib/siteChrome";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isNellaLandingHome = pathname === "/";

  const [settings, chrome] = await Promise.all([getSiteSettings(), getResolvedSiteChrome()]);
  const footerCredit = resolveFooterCredit(settings);
  const mainPadTop =
    chrome.header.utilityLinks.length > 0 ?
      "calc(env(safe-area-inset-top, 0px) + var(--cm-nav-utility) + var(--cm-nav-height))"
    : "calc(env(safe-area-inset-top, 0px) + var(--cm-nav-height))";

  if (isNellaLandingHome) {
    return <>{children}</>;
  }

  return (
    <>
      <a href="#main" className="skip-to-content">
        {chrome.skipToContentLabel}
      </a>
      <Navbar chrome={chrome} />
      <main id="main" className="site-main" style={{ paddingTop: mainPadTop }}>
        {children}
      </main>
      <Footer settings={settings} chrome={chrome} />
      <SiteCreditStrip credit={footerCredit} />
    </>
  );
}
