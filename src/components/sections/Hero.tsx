import { Button } from "@/components/ui/Button";
import { RevealOnView } from "@/components/ui/RevealOnView";
import type { SiteSettingsDoc } from "@/sanity/lib/site";
import type { ResolvedSiteChrome } from "@/lib/site-chrome-resolve";
import { StrategyMatcher } from "@/components/sections/StrategyMatcher";
import styles from "./Hero.module.css";

const FALLBACK_TAG =
  "SEBI Registered Portfolio Manager & Research Analyst";
const FALLBACK_TITLE_1 = "From Capital to Compounding.";
const FALLBACK_TITLE_EM = "A Systematic Wealth Creation Journey.";
const FALLBACK_SUB =
  "MyNella is a system-driven investment firm combining 30+ years of real market experience with disciplined execution. We build investment strategies that suit investor goals — without emotional bias, narrative chasing, or reactive decision-making.";

export function Hero({
  settings,
  chrome,
}: {
  settings?: SiteSettingsDoc | null;
  chrome: ResolvedSiteChrome;
}) {
  const tag = settings?.homeEyebrowTag?.trim() || FALLBACK_TAG;
  const title1 = settings?.homeTitleLine1?.trim() || FALLBACK_TITLE_1;
  const titleEm = settings?.homeTitleEmphasis?.trim() || FALLBACK_TITLE_EM;
  const sub = settings?.homeSubtitle?.trim() || FALLBACK_SUB;

  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={styles.glow} />
      <div className={styles.container}>
        <div className={styles.body}>
          <RevealOnView className={styles.tag} delayMs={0} eager>
            <span className={styles.dot} />
            {tag}
          </RevealOnView>
          <RevealOnView className={styles.title} delayMs={80} eager>
            <h1 className={styles.titleHeading}>
              {title1}
              <br />
              <em>{titleEm}</em>
            </h1>
          </RevealOnView>
          <RevealOnView className={styles.sub} delayMs={160} eager>
            <p className={styles.subText}>{sub}</p>
          </RevealOnView>
          <RevealOnView className={styles.ctas} delayMs={240} eager>
            <div className={styles.ctasInner}>
              <Button href={chrome.ctaLinks.bookCall} external>
                {chrome.hero.primaryCtaLabel}
              </Button>
              <StrategyMatcher config={chrome.strategyMatcher} />
            </div>
          </RevealOnView>
          <RevealOnView className={styles.stats} delayMs={320} eager>
            <div className={styles.statsInner}>
              {chrome.hero.stats.map((s, i) => (
                <div key={i} className={styles.stat}>
                  <div className={styles.statValue}>
                    {s.value}
                    {s.unit ? <span className={styles.statUnit}>{s.unit}</span> : null}
                  </div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </RevealOnView>
        </div>
      </div>
    </section>
  );
}
