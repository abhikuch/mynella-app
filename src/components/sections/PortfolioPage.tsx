import Link from "next/link";
import type { PortfolioData } from "@/lib/model-portfolios";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { mergedHeroText } from "@/lib/page-copy-merge";
import type { PageCopyDoc } from "@/sanity/lib/pageCopy";
import styles from "./PortfolioPage.module.css";

const suitableIcons = ["🎯", "📊", "🛡️"];

const DEFAULT_PERF_DISCLAIMER =
  "Past performance is not indicative of future results. Returns shown are backtested / model portfolio returns and may not reflect actual investor returns. All figures are pre-tax and pre-transaction cost unless stated otherwise.";

const DEFAULT_PLATFORM_DISCLAIMER =
  "Investments in securities market are subject to market risks. Read all the related documents carefully before investing. Registration granted by SEBI, membership of BSE and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.";

function Breadcrumb({ portfolio }: { portfolio: PortfolioData }) {
  const familyLabel = portfolio.family === "quanto" ? "Quanto" : "Alpha";
  const familyHref =
    portfolio.family === "quanto"
      ? "/model-portfolios/quanto"
      : "/model-portfolios/alpha";

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/model-portfolios">Model Portfolios</Link>
      <span className={styles.breadcrumbSep}>/</span>
      <Link href={familyHref}>{familyLabel}</Link>
      <span className={styles.breadcrumbSep}>/</span>
      <span className={styles.breadcrumbCurrent}>{portfolio.name.replace(`${familyLabel} `, "")}</span>
    </nav>
  );
}

function HeroSection({
  portfolio,
  copy,
}: {
  portfolio: PortfolioData;
  copy?: PageCopyDoc | null;
}) {
  const familyLabel = portfolio.family === "quanto" ? "Quanto" : "Alpha";
  const h = mergedHeroText(copy, {
    line1: portfolio.name,
    sub: portfolio.tagline,
  });

  return (
    <SectionWrapper className={styles.hero}>
      <Breadcrumb portfolio={portfolio} />

      <div className={styles.heroHeader}>
        <div className={styles.heroLeft}>
          <div className={styles.familyBadge}>
            <span className={styles.familyDot} />
            {familyLabel} Series
          </div>
          <h1 className={styles.title}>{h.line1}</h1>
          <p className={styles.tagline}>{h.sub}</p>
        </div>
      </div>

      <div className={styles.statsStrip}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Universe</span>
          <span className={styles.statValue}>{portfolio.universe}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Rebalance</span>
          <span className={styles.statValue}>{portfolio.rebalance}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Risk</span>
          <span className={styles.statValue}>{portfolio.riskProfile}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Min. Investment</span>
          <span className={styles.statValue}>{portfolio.minInvestment}</span>
        </div>
      </div>
    </SectionWrapper>
  );
}

function OverviewSection({ portfolio }: { portfolio: PortfolioData }) {
  const ui = portfolio.ui;
  return (
    <SectionWrapper variant="alt">
      <div className={styles.overview}>
        <div>
          <Eyebrow>{ui?.overviewEyebrow ?? "Overview"}</Eyebrow>
          <h2>{ui?.overviewTitle ?? "How it works"}</h2>
          <p className={styles.overviewDesc}>{portfolio.description}</p>
        </div>
        <div className={styles.overviewRight}>
          <h3>{ui?.methodologyColumnTitle ?? "Methodology"}</h3>
          <div className={styles.numberedList}>
            {portfolio.methodology.map((item, i) => (
              <div key={i} className={styles.numberedItem}>
                <span className={styles.numBadge}>{i + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function parsePercent(s: string): number {
  return parseFloat(s.replace("%", ""));
}

/** Maps value to Y position % from bottom of plot (minNeg → 0%, maxPos → 100%). */
function scaleY(
  v: number,
  minNeg: number,
  maxPos: number,
  span: number,
): number {
  return ((v - minNeg) / span) * 100;
}

/** Bar segment from 0% baseline: positive grows up, negative grows down. */
function barDimensions(
  v: number,
  minNeg: number,
  maxPos: number,
  span: number,
): { bottomPct: number; heightPct: number } {
  const z = scaleY(0, minNeg, maxPos, span);
  const sv = scaleY(v, minNeg, maxPos, span);
  if (v >= 0) {
    return {
      bottomPct: z,
      heightPct: Math.max(0, sv - z),
    };
  }
  return {
    bottomPct: sv,
    heightPct: Math.max(0, z - sv),
  };
}

function PerformanceSection({ portfolio }: { portfolio: PortfolioData }) {
  const { performance } = portfolio;
  const ui = portfolio.ui;
  const allVals = performance.returns.flatMap((r) => [
    parsePercent(r.portfolio),
    parsePercent(r.benchmark),
  ]);
  const maxPos = Math.max(0, ...allVals);
  const minNeg = Math.min(0, ...allVals);
  const span = maxPos - minNeg || 1;
  const zeroY = scaleY(0, minNeg, maxPos, span);
  const showZeroLine = minNeg < 0 && maxPos > 0;

  return (
    <SectionWrapper>
      <div className={styles.perfHeader}>
        <div className={styles.perfHeaderLeft}>
          <Eyebrow>{ui?.performanceEyebrow ?? "Performance"}</Eyebrow>
          <h2>{ui?.performanceTitle ?? "Track record"}</h2>
        </div>
        <div className={styles.perfMeta}>
          <div className={styles.perfMetaItem}>
            <span className={styles.perfMetaLabel}>Portfolio CAGR</span>
            <span className={styles.perfMetaValue}>{performance.cagr}</span>
          </div>
          <div className={styles.perfMetaItem}>
            <span className={styles.perfMetaLabel}>{performance.benchmarkName}</span>
            <span className={styles.perfMetaBenchmark}>{performance.benchmarkCagr}</span>
          </div>
          <div className={styles.perfMetaItem}>
            <span className={styles.perfMetaLabel}>Since</span>
            <span className={styles.perfMetaBenchmark}>{performance.inceptionDate}</span>
          </div>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.chartPlot}>
          <div className={styles.chartYLabels} aria-hidden>
            {[0, 25, 50, 75, 100].map((tick) => (
              <span
                key={tick}
                className={styles.yLabel}
                style={{ top: `${100 - tick}%` }}
              >
                {Math.round(minNeg + (tick / 100) * span)}%
              </span>
            ))}
          </div>
          <div className={styles.chartGrid}>
            {[0, 25, 50, 75, 100].map((tick) => (
              <div key={tick} className={styles.gridLine} style={{ bottom: `${tick}%` }} />
            ))}
            {showZeroLine ?
              <div
                className={styles.zeroLine}
                style={{ bottom: `${zeroY}%` }}
                aria-hidden
              />
            : null}
          </div>
          <div className={styles.chartBarValues}>
            {performance.returns.map((row) => (
              <div key={row.label} className={styles.barGroupValues}>
                <span className={styles.barValue}>{row.portfolio}</span>
                <span className={styles.barValueBench}>{row.benchmark}</span>
              </div>
            ))}
          </div>
          <div className={styles.chartBars}>
          {performance.returns.map((row) => {
            const pVal = parsePercent(row.portfolio);
            const bVal = parsePercent(row.benchmark);
            const pBar = barDimensions(pVal, minNeg, maxPos, span);
            const bBar = barDimensions(bVal, minNeg, maxPos, span);
            const alphaNum = pVal - bVal;
            const alpha =
              alphaNum > 0 ? `+${alphaNum.toFixed(1)}%` : `${alphaNum.toFixed(1)}%`;

            return (
              <div key={row.label} className={styles.barGroup}>
                <div className={styles.barPair}>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.bar}
                      data-type="portfolio"
                      data-sign={pVal >= 0 ? "pos" : "neg"}
                      style={{
                        bottom: `${pBar.bottomPct}%`,
                        height: `${Math.max(pBar.heightPct, pVal === 0 ? 0 : 0.35)}%`,
                      }}
                    />
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.bar}
                      data-type="benchmark"
                      data-sign={bVal >= 0 ? "pos" : "neg"}
                      style={{
                        bottom: `${bBar.bottomPct}%`,
                        height: `${Math.max(bBar.heightPct, bVal === 0 ? 0 : 0.35)}%`,
                      }}
                    />
                  </div>
                </div>
                <span className={styles.barLabel}>{row.label}</span>
                <span className={styles.barAlpha}>{alpha}</span>
              </div>
            );
          })}
          </div>
        </div>
        <p className={styles.chartFootnote}>
          Bars extend from 0% (horizontal axis); positive returns above, negative below. Axis scales to
          the range on this page.
        </p>
      </div>

      <div className={styles.returnsLegend}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendDotPortfolio}`} />
          {portfolio.name}
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendDotBenchmark}`} />
          {performance.benchmarkName}
        </span>
      </div>

      <p className={styles.perfDisclaimer}>
        {ui?.performanceDisclaimer ?? DEFAULT_PERF_DISCLAIMER}
      </p>
    </SectionWrapper>
  );
}

function SuitableForSection({ portfolio }: { portfolio: PortfolioData }) {
  const ui = portfolio.ui;
  return (
    <SectionWrapper>
      <Eyebrow>{ui?.suitableEyebrow ?? "Who is this for"}</Eyebrow>
      <h2>{ui?.suitableTitle ?? "Suitable for"}</h2>
      <div className={styles.suitableGrid}>
        {portfolio.suitableFor.map((item, i) => (
          <div key={i} className={styles.suitableCard}>
            <div className={styles.suitableIcon}>
              {suitableIcons[i % suitableIcons.length]}
            </div>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

function SubscribeSection({ portfolio }: { portfolio: PortfolioData }) {
  const ui = portfolio.ui;
  const platformAbbrevs: Record<string, string> = {
    smallcase: "sc",
    dhan: "Dh",
    cirrus: "Ci",
    "motilal-oswal": "MO",
  };

  return (
    <SectionWrapper variant="alt" id="subscribe">
      <div className={styles.subscribeSection}>
        <Eyebrow>{ui?.subscribeEyebrow ?? "Subscribe"}</Eyebrow>
        <h2>{ui?.subscribeTitle ?? "Subscribe on your platform"}</h2>
        <p className={styles.subscribeLead}>
          {ui?.subscribeLead ??
            `${portfolio.name} is available across multiple investment platforms. Choose your preferred broker to get started.`}
        </p>
        <div className={styles.platformsGrid}>
          {portfolio.platforms.map((platform) => {
            const isActive = platform.href !== null;
            return (
              <div key={platform.slug} className={styles.platformCard}>
                <div className={styles.platformLogo}>
                  {platformAbbrevs[platform.slug] ?? platform.name.slice(0, 2)}
                </div>
                <span className={styles.platformName}>{platform.name}</span>
                {isActive ? (
                  <a
                    href={platform.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.platformBtn} ${styles.platformBtnActive}`}
                  >
                    Subscribe <span className={styles.platformArrow}>→</span>
                  </a>
                ) : (
                  <span
                    className={`${styles.platformBtn} ${styles.platformBtnDisabled}`}
                  >
                    Coming soon
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.disclaimer}>
        <p>
          {ui?.platformDisclaimer ?
            ui.platformDisclaimer
          : <>
              <strong>Disclaimer:</strong> {DEFAULT_PLATFORM_DISCLAIMER}
            </>
          }
        </p>
      </div>
    </SectionWrapper>
  );
}

export function PortfolioPage({
  portfolio,
  copy,
}: {
  portfolio: PortfolioData;
  copy?: PageCopyDoc | null;
}) {
  return (
    <>
      <HeroSection portfolio={portfolio} copy={copy} />
      <OverviewSection portfolio={portfolio} />
      <PerformanceSection portfolio={portfolio} />
      <SuitableForSection portfolio={portfolio} />
      <SubscribeSection portfolio={portfolio} />
    </>
  );
}
