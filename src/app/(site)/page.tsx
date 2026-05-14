import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { CTA } from "@/components/sections/CTA";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { FAQ, type FAQItem } from "@/components/ui/FAQ";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { JourneyTimeline } from "@/components/sections/JourneyTimeline";
import { ComplianceBoard } from "@/components/sections/ComplianceBoard";
import {
  resolveHomePageContent,
  type ResolvedHomePageContent,
} from "@/lib/home-page-content";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { getHomeContent } from "@/sanity/lib/homeContent";
import { getSiteSettings, type SiteSettingsDoc } from "@/sanity/lib/site";
import { resolveFounderPortraitSrc } from "@/lib/founder-portrait";
import { getResolvedSiteChrome } from "@/sanity/lib/siteChrome";
import type { ResolvedSiteChrome } from "@/lib/site-chrome-resolve";
import styles from "./page.module.css";

function WhatWeDo({ home }: { home: ResolvedHomePageContent }) {
  const w = home.whatWeDo;
  return (
    <SectionWrapper id="products">
      <Eyebrow>{w.eyebrow}</Eyebrow>
      <h2>{w.title}</h2>
      <p className={styles.sectionLead}>{w.lead}</p>

      <div className={styles.wdPills}>
        <span className={styles.wdPill}>
          <span className={styles.wdPillLabel}>{w.pill1Label}</span> {w.pill1Text}
        </span>
        <span className={styles.wdPill}>
          <span className={styles.wdPillLabel}>{w.pill2Label}</span> {w.pill2Text}
        </span>
      </div>

      <p className={styles.productsSortNote}>{w.sortNote}</p>
      <div className={styles.productsGrid}>
        {w.products.map((p) => (
          <Link key={p.href} href={p.href} className={styles.prodCard}>
            <div className={styles.prodCategory}>{p.category}</div>
            <div className={styles.prodName}>{p.name}</div>
            <div className={styles.prodTag}>{p.tag}</div>
            <div className={styles.prodFooter}>
              <span className={styles.prodMin}>{p.min}</span>
              <span className={styles.prodChevron} aria-hidden>
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.accentCallout}>{w.accentCallout}</div>
    </SectionWrapper>
  );
}

function StrategyArchitecture({ home }: { home: ResolvedHomePageContent }) {
  const s = home.strategyArchitecture;
  return (
    <SectionWrapper variant="alt">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <h2>{s.title}</h2>
      <p className={`${styles.sectionLead} ${styles.ladderLead}`}>{s.lead}</p>
      <div className={styles.ladder}>
        {s.steps.map((step) => (
          <div key={step.name} className={styles.ladderStep}>
            <div className={styles.ladderStepName}>{step.name}</div>
            <div className={styles.ladderStepDesc}>{step.desc}</div>
            <div className={styles.ladderStepCap}>{step.cap}</div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

function WhoWeServe({ home }: { home: ResolvedHomePageContent }) {
  const w = home.whoWeServe;
  return (
    <SectionWrapper>
      <Eyebrow>{w.eyebrow}</Eyebrow>
      <h2>{w.title}</h2>
      <p className={styles.sectionLead}>{w.lead}</p>

      <div className={styles.serveGrid}>
        {w.tiers.map((t) => (
          <div key={t.tier} className={styles.serveCard}>
            <div className={styles.serveTier}>{t.tier}</div>
            <div className={styles.serveCapital}>Capital: {t.capital}</div>
            <div className={styles.serveRisk}>Risk: {t.risk}</div>
            <div className={styles.serveStrategies}>{w.strategiesColumnTitle}</div>
            <div className={styles.serveList}>
              {t.strategies.map((s, i) => (
                <div key={i} className={styles.serveListItem}>
                  {s}
                </div>
              ))}
            </div>
            <div className={styles.serveDesc}>{t.desc}</div>
            {t.href.startsWith("http") ? (
              <Button href={t.href} external size="small">
                {t.cta}
              </Button>
            ) : (
              <Button href={t.href} size="small">
                {t.cta}
              </Button>
            )}
          </div>
        ))}
      </div>

      <p className={styles.serveFooter}>{w.footer}</p>
    </SectionWrapper>
  );
}

function FounderSection({
  home,
  settings,
}: {
  home: ResolvedHomePageContent;
  settings: SiteSettingsDoc | null;
}) {
  const f = home.founderHome;
  const portraitSrc = resolveFounderPortraitSrc(settings?.founderPortrait);
  const portraitAlt = `Portrait of ${f.name}`;
  return (
    <SectionWrapper variant="alt">
      <Eyebrow>{f.eyebrow}</Eyebrow>
      <h2>{f.title}</h2>

      <div className={styles.founderGrid}>
        <div>
          <div className={styles.founderAvatar}>
            <Image
              src={portraitSrc}
              alt={portraitAlt}
              width={120}
              height={120}
              className={styles.founderAvatarImg}
              sizes="120px"
              priority={false}
            />
          </div>
          <div className={styles.founderName}>{f.name}</div>
          <span className={styles.founderRole}>{f.role}</span>
          <p className={styles.founderCreds}>{f.creds}</p>
        </div>

        <div>
          <p className={styles.founderNarrative}>{f.narrative}</p>

          <p className={styles.founderKeyline}>{f.keyline}</p>

          <div className={styles.dualCards}>
            <div className={styles.dualCard}>
              <div className={styles.dualCardLabel}>
                <span className={styles.dualCardDot} />
                {f.humanLabel}
              </div>
              <div className={styles.dualCardItem}>{f.humanItem1}</div>
              <div className={styles.dualCardItem}>{f.humanItem2}</div>
              <div className={styles.dualCardItem}>{f.humanItem3}</div>
              <p className={styles.dualCardNote}>{f.humanNote}</p>
            </div>

            <div className={styles.dualCard}>
              <div className={styles.dualCardLabel}>
                <span className={styles.dualCardDot} />
                {f.machineLabel}
              </div>
              <div className={styles.dualCardItem}>{f.machineItem1}</div>
              <div className={styles.dualCardItem}>{f.machineItem2}</div>
              <div className={styles.dualCardItem}>{f.machineItem3}</div>
              <p className={styles.dualCardNote}>{f.machineNote}</p>
            </div>
          </div>

          <p className={styles.founderConclusion}>{f.conclusion}</p>
        </div>
      </div>
    </SectionWrapper>
  );
}

function PartnersStrip({
  home,
  partners,
}: {
  home: ResolvedHomePageContent;
  partners: ResolvedSiteChrome["partners"];
}) {
  const p = home.partnersStrip;
  return (
    <SectionWrapper variant="alt">
      <Eyebrow>{p.eyebrow}</Eyebrow>
      <h2>{p.title}</h2>
      <p className={styles.partnersLead}>{p.lead}</p>

      <div className={styles.partnersTray}>
        <div className={styles.partnersStrip}>
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.partnerLink}
              aria-label={`${partner.name} (opens in new tab)`}
            >
              <span className={styles.partnerCell}>
                <span className={styles.partnerLogoWrap}>
                  <Image
                    src={partner.logo}
                    alt=""
                    width={160}
                    height={48}
                    className={[
                      styles.partnerLogo,
                      partner.name === "Nubra" ? styles.partnerLogoNubra : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                </span>
                <span className={styles.partnerName}>{partner.name}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function ResearchSection({ home }: { home: ResolvedHomePageContent }) {
  const r = home.research;
  return (
    <SectionWrapper variant="alt">
      <div className={styles.researchBlock}>
        <Eyebrow>{r.eyebrow}</Eyebrow>
        <h2>{r.title}</h2>
        <p>{r.body}</p>
        <div className={styles.researchOneliner}>{r.oneliner}</div>
        <div className={styles.researchCta}>
          <Button href={r.ctaHref} variant="ghost">
            {r.ctaLabel}
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}

function HowToEngage({ home }: { home: ResolvedHomePageContent }) {
  const h = home.howToEngage;
  return (
    <SectionWrapper>
      <Eyebrow>{h.eyebrow}</Eyebrow>
      <h2>{h.title}</h2>

      <div className={styles.onboardGrid}>
        {h.steps.map((s, i) => (
          <div key={s.title} className={styles.onboardCard}>
            <span className={styles.onboardNum}>{i + 1}</span>
            <div className={styles.onboardTitle}>{s.title}</div>
            <p className={styles.onboardDesc}>{s.desc}</p>
          </div>
        ))}
      </div>

      <p className={styles.onboardFooter}>{h.footer}</p>
    </SectionWrapper>
  );
}

function HomeFAQ({ home }: { home: ResolvedHomePageContent }) {
  const f = home.homeFaq;
  const faqItems: FAQItem[] = f.items.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));
  return (
    <>
      <FaqJsonLd items={faqItems} />
      <SectionWrapper variant="alt">
        <Eyebrow>{f.eyebrow}</Eyebrow>
        <h2>{f.title}</h2>
        <div style={{ marginTop: 36 }}>
          <FAQ items={faqItems} />
        </div>
      </SectionWrapper>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute(
    "home",
    {
      title: "Invest Better",
      description:
        "MyNella — SEBI-registered Portfolio Manager & Research Analyst. Institutional-grade, algorithm-driven equity mandates for investors who want process, not noise.",
    },
    "/",
  );
}

export default async function HomePage() {
  const [settings, rawHome, chrome] = await Promise.all([
    getSiteSettings(),
    getHomeContent(),
    getResolvedSiteChrome(),
  ]);
  const home = resolveHomePageContent(rawHome);
  const c = home.homeBottomCta;
  return (
    <>
      <Hero settings={settings} chrome={chrome} />
      <Marquee items={home.marqueeItems} />
      <WhatWeDo home={home} />
      <StrategyArchitecture home={home} />
      <WhoWeServe home={home} />
      <FounderSection home={home} settings={settings} />
      <FeaturesGrid {...home.featuresGrid} />
      <JourneyTimeline {...home.journeyTimeline} />
      <PartnersStrip home={home} partners={chrome.partners} />
      <ResearchSection home={home} />
      <HowToEngage home={home} />
      <HomeFAQ home={home} />
      <CTA
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        primaryLabel={c.primaryLabel}
        primaryHref={chrome.ctaLinks.bookCall}
        secondaryLabel={c.secondaryLabel}
        secondaryHref={c.secondaryMailto}
      />
      <ComplianceBoard data={home.complianceBoard} />
    </>
  );
}
