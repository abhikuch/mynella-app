import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ctaLinks } from "@/lib/navigation";
import {
  alphaVsNifty50,
  benchmarkRows,
  calloutCards,
  contextCopy,
  disclaimer,
  heroMetrics,
  heroSub,
  keyMessage,
  monthlyBarWidth,
  monthlyInsights,
  nifty50ReturnDisplay,
  optimusBigMonthBars,
  optimusExpectations,
  optimusMonthly,
  optimusStrategy,
  performanceSnapshotLead,
  performanceSnapshotRows,
  polarisExpectations,
  polarisStrategy,
  polarisVsBenchmarkBars,
  reportMeta,
} from "@/lib/performance-report-fy2026";
import styles from "./PerformanceReport.module.css";

function fmtMonthPct(n: number): string {
  const sign = n >= 0 ? "+" : "−";
  const abs = Math.abs(n).toFixed(2);
  return `${sign}${abs}%`;
}

function cellClass(v: string): string {
  if (v.startsWith("+")) return `${styles.cell} ${styles.positive}`;
  if (v.startsWith("−") || v.startsWith("-")) return `${styles.cell} ${styles.negative}`;
  return styles.cell;
}

function snapshotCellClass(v: string, highlight: boolean): string {
  const base = styles.cell;
  if (v.startsWith("+")) return `${base} ${styles.positive}`;
  if (v.startsWith("−") || v.startsWith("-")) return `${base} ${styles.negative}`;
  if (highlight) return `${base} ${styles.gold}`;
  return base;
}

export function PerformanceReport() {
  return (
    <article className={`${styles.wrap} ${styles.article}`}>
      <header className={styles.hero} aria-labelledby="pr-hero-title">
        <div className={styles.heroGrid} aria-hidden />
        <div className={styles.heroGlow} aria-hidden />
        <div className={styles.heroInner}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden />
            Annual performance report — FY 2025–26
          </div>
          <span className={styles.period}>{reportMeta.period.toUpperCase()}</span>
          <h1 id="pr-hero-title" className={styles.heroTitle}>
            Positive returns.
            <br />
            In a year markets
            <br />
            <em>delivered nothing.</em>
          </h1>
          <p className={styles.heroSub}>{heroSub}</p>

          <div className={styles.metricStrip}>
            {heroMetrics.map((m) => (
              <div
                key={m.label}
                className={`${styles.metricCell} ${styles[m.tone === "accent" ? "accent" : m.tone]}`}
              >
                <div className={styles.metricLabel}>{m.label}</div>
                <div
                  className={`${styles.metricValue} ${
                    m.tone === "positive"
                      ? styles.positive
                      : m.tone === "accent"
                        ? styles.accent
                        : m.tone === "negative"
                          ? styles.negative
                          : styles.neutral
                  }`}
                >
                  {m.value}
                </div>
                <div className={styles.metricSub}>{m.sub}</div>
              </div>
            ))}
          </div>

          <div className={styles.metaBar}>
            <time dateTime="2026-03">Published {reportMeta.publishedLabel}</time>
            <span aria-hidden>·</span>
            <span>MyNella PMS &amp; Optimus</span>
          </div>
        </div>
      </header>

      <SectionWrapper id="context">
        <Eyebrow>Market context</Eyebrow>
        <h2>
          {contextCopy.titleLine1}
          <br />
          <em>{contextCopy.titleEm}</em>
        </h2>

        <div className={styles.contextGrid}>
          <div className={styles.contextBody}>
            {contextCopy.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <blockquote className={styles.blockquote}>{contextCopy.blockquote}</blockquote>
          </div>

          <div>
            <div className={styles.tableLabel}>Benchmark performance</div>
            <div className={styles.idxTable} role="table" aria-label="Benchmark return and drawdown">
              <div className={`${styles.idxRow} ${styles.idxHead}`} role="row">
                <span role="columnheader">Index</span>
                <span role="columnheader">Return</span>
                <span role="columnheader">Max DD</span>
                <span role="columnheader">Avg DD</span>
              </div>
              {benchmarkRows.map((r) => (
                <div key={r.name} className={styles.idxRow} role="row">
                  <span className={styles.idxName} role="cell">
                    {r.name}
                  </span>
                  <span className={styles.idxNeg} role="cell">
                    {r.cagr}
                  </span>
                  <span className={styles.idxNeg} role="cell">
                    {r.dd}
                  </span>
                  <span className={styles.idxNeg} role="cell">
                    {r.avgDd}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.tableLabel} style={{ marginTop: 24 }}>
              Outperformance vs Nifty 50
            </div>
            <div className={styles.alphaPanel}>
              <div className={styles.barList}>
                {alphaVsNifty50.map((b) => (
                  <div key={b.label} className={styles.barRow}>
                    <span className={styles.barLab}>{b.label}</span>
                    <div className={styles.barTrack}>
                      <div
                        className={`${styles.barFill} ${styles[b.tone]}`}
                        style={{ width: `${b.widthPct}%` }}
                      />
                    </div>
                    <span className={`${styles.barVal} ${styles[b.tone]}`}>{b.value}</span>
                  </div>
                ))}
              </div>
              <p className={styles.alphaFoot}>Alpha vs Nifty 50 ({nifty50ReturnDisplay})</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="alt" id="performance">
        <Eyebrow>Performance snapshot</Eyebrow>
        <h2>
          Absolute &amp; risk-adjusted metrics
          <br />
          <em>across all strategies.</em>
        </h2>
        <p className={styles.sectionLead}>{performanceSnapshotLead}</p>

        <div className={styles.snapTable} role="table" aria-label="Strategy performance snapshot">
          <div className={styles.snapHead} role="row">
            <span role="columnheader">Strategy</span>
            <span role="columnheader">Return</span>
            <span role="columnheader">Max DD</span>
            <span role="columnheader">Avg DD</span>
            <span role="columnheader">Sharpe</span>
            <span role="columnheader">Sortino</span>
          </div>
          {performanceSnapshotRows.map((row) => (
            <div
              key={row.name}
              className={`${styles.snapRow} ${row.highlight ? styles.strategy : ""}`}
              role="row"
            >
              <div className={styles.snapName} role="cell">
                {row.name}{" "}
                <span
                  className={`${styles.role} ${
                    row.role === "Core PMS" ? styles.core : row.role === "Alpha" ? styles.alpha : styles.bench
                  }`}
                >
                  {row.role === "Core PMS" ? "Core PMS" : row.role}
                </span>
              </div>
              <span className={cellClass(row.cagr)} role="cell">
                {row.cagr}
              </span>
              <span className={cellClass(row.dd)} role="cell">
                {row.dd}
              </span>
              <span className={cellClass(row.avgDd)} role="cell">
                {row.avgDd}
              </span>
              <span className={snapshotCellClass(row.sharpe, row.highlight)} role="cell">
                {row.sharpe}
              </span>
              <span className={snapshotCellClass(row.sortino, row.highlight)} role="cell">
                {row.sortino}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.calloutGrid}>
          {calloutCards.map((c) => (
            <div key={c.kicker} className={styles.callout}>
              <div className={`${styles.calloutKicker} ${styles[c.tone]}`}>{c.kicker}</div>
              <div className={`${styles.calloutStat} ${styles[c.tone]}`}>{c.stat}</div>
              <p className={styles.calloutBody}>{c.body}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="strategies">
        <Eyebrow>Strategy performance</Eyebrow>
        <h2>
          How each strategy performed
          <br />
          <em>and why.</em>
        </h2>

        <div className={styles.stratGrid}>
          <div className={`${styles.stratCard} ${styles.polaris}`}>
            <div className={styles.scHead}>
              <div className={styles.scTop}>
                <Link href={polarisStrategy.href} className={styles.scName}>
                  Polaris
                </Link>
                <span className={`${styles.scBadge} ${styles.core}`}>{polarisStrategy.badge}</span>
              </div>
              <p className={styles.scDesc}>{polarisStrategy.description}</p>
            </div>
            <div className={styles.scBody}>
              <div className={styles.kpiRow}>
                {polarisStrategy.kpis.map((k) => (
                  <div key={k.label} className={styles.kpi}>
                    <div className={`${styles.kpiV} ${styles[k.tone]}`}>{k.value}</div>
                    <div className={styles.kpiL}>{k.label}</div>
                  </div>
                ))}
              </div>
              <div className={styles.tableLabel}>vs benchmarks</div>
              <div className={styles.barList} style={{ marginBottom: 22 }}>
                {polarisVsBenchmarkBars.map((b) => (
                  <div key={b.label} className={styles.barRow}>
                    <span className={styles.barLab}>{b.label}</span>
                    <div className={styles.barTrack}>
                      <div
                        className={`${styles.barFill} ${styles[b.tone]}`}
                        style={{ width: `${b.widthPct}%` }}
                      />
                    </div>
                    <span className={`${styles.barVal} ${styles[b.tone]}`}>{b.value}</span>
                  </div>
                ))}
              </div>
              <div className={styles.bullets}>
                {polarisStrategy.bullets.map((t) => (
                  <div key={t} className={styles.bullet}>
                    {t}
                  </div>
                ))}
              </div>
              <div className={styles.quoteBox}>{polarisStrategy.quote}</div>
            </div>
          </div>

          <div className={`${styles.stratCard} ${styles.optimus}`}>
            <div className={styles.scHead}>
              <div className={styles.scTop}>
                <Link href={optimusStrategy.href} className={styles.scName}>
                  Optimus
                </Link>
                <span className={`${styles.scBadge} ${styles.alpha}`}>{optimusStrategy.badge}</span>
              </div>
              <p className={styles.scDesc}>{optimusStrategy.description}</p>
            </div>
            <div className={styles.scBody}>
              <div className={styles.kpiRow}>
                {optimusStrategy.kpis.map((k) => (
                  <div key={k.label} className={styles.kpi}>
                    <div className={`${styles.kpiV} ${styles[k.tone]}`}>{k.value}</div>
                    <div className={styles.kpiL}>{k.label}</div>
                  </div>
                ))}
              </div>
              <div className={styles.tableLabel}>Big months</div>
              <div className={styles.barList} style={{ marginBottom: 22 }}>
                {optimusBigMonthBars.map((b) => (
                  <div key={b.label} className={styles.barRow}>
                    <span className={styles.barLab}>{b.label}</span>
                    <div className={styles.barTrack}>
                      <div
                        className={`${styles.barFill} ${styles[b.tone]}`}
                        style={{ width: `${b.widthPct}%` }}
                      />
                    </div>
                    <span className={`${styles.barVal} ${styles[b.tone]}`}>{b.value}</span>
                  </div>
                ))}
              </div>
              <div className={styles.bullets}>
                {optimusStrategy.bullets.map((t) => (
                  <div key={t} className={styles.bullet}>
                    {t}
                  </div>
                ))}
              </div>
              <div className={styles.quoteBox}>{optimusStrategy.quote}</div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="alt" id="monthly">
        <Eyebrow>Optimus · monthly detail</Eyebrow>
        <h2>
          Month-by-month returns
          <br />
          <em>show where alpha was made.</em>
        </h2>

        <div className={styles.monthlyGrid}>
          <div className={styles.moTable}>
            <div className={styles.moHead} role="row">
              <span role="columnheader">Month</span>
              <span role="columnheader">Return</span>
              <span role="columnheader">Distribution</span>
            </div>
            {optimusMonthly.map((m) => {
              const pos = m.ret >= 0;
              const w = monthlyBarWidth(m.ret);
              return (
                <div
                  key={m.month}
                  className={`${styles.moRow} ${m.big === "win" ? styles.win : ""} ${m.big === "loss" ? styles.loss : ""}`}
                  role="row"
                >
                  <span className={styles.moMonth} role="cell">
                    {m.month}
                  </span>
                  <span className={`${styles.moRet} ${pos ? styles.pos : styles.neg}`} role="cell">
                    {fmtMonthPct(m.ret)}
                  </span>
                  <div className={styles.moBarWrap} role="cell">
                    <div
                      className={`${styles.moBar} ${pos ? styles.pos : styles.neg}`}
                      style={{ width: `${w}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.insights}>
            {monthlyInsights.map((ins) => (
              <div
                key={ins.title}
                className={`${styles.insight} ${ins.variant === "highlight" ? styles.highlight : ""}`}
              >
                {ins.stat ? (
                  <div
                    className={`${styles.insightStat} ${ins.statTone === "negative" ? styles.neg : ""}`}
                  >
                    {ins.stat}
                  </div>
                ) : null}
                <h4>{ins.title}</h4>
                <p>{ins.body}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="expectations">
        <Eyebrow>Investor framework</Eyebrow>
        <h2>
          Different strategies require
          <br />
          <em>different expectations.</em>
        </h2>

        <div className={styles.expGrid}>
          <div className={`${styles.expCard} ${styles.polaris}`}>
            <div className={styles.expHead}>
              <div className={styles.expName}>Polaris</div>
              <span className={`${styles.scBadge} ${styles.core}`}>Core allocation</span>
            </div>
            <div className={styles.expItems}>
              {polarisExpectations.map((e) => (
                <div key={e.title} className={styles.expItem}>
                  <ExpBulletIcon className={styles.expIcon} accent="polaris" />
                  <span>
                    <strong>{e.title}.</strong> {e.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.expCard} ${styles.optimus}`}>
            <div className={styles.expHead}>
              <div className={styles.expName}>Optimus</div>
              <span className={`${styles.scBadge} ${styles.alpha}`}>Tactical allocation</span>
            </div>
            <div className={styles.expItems}>
              {optimusExpectations.map((e) => (
                <div key={e.title} className={styles.expItem}>
                  <ExpBulletIcon className={styles.expIcon} accent="optimus" />
                  <span>
                    <strong>{e.title}.</strong> {e.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.keyMessage}>
          <h3>&ldquo;{keyMessage.title}&rdquo;</h3>
          <p>{keyMessage.body}</p>
        </div>
      </SectionWrapper>

      <section className={styles.conclusion} id="conclusion" aria-labelledby="pr-conc-title">
        <div className={styles.concGlow} aria-hidden />
        <div className={styles.concShell}>
          <div className={styles.concInner}>
            <div className={styles.concEyebrowWrap}>
              <Eyebrow>Conclusion</Eyebrow>
            </div>
            <h2 id="pr-conc-title">
              Built to operate across
              <br />
              <em>market conditions.</em>
            </h2>
            <p>
              MyNella strategies are not dependent on favourable markets. In a year where Nifty 50, 100, and
              500 posted negative returns (from about −6.8% to −8.2%) with negative Sharpe and Sortino, Polaris
              preserved a modest positive absolute return with positive Sortino versus those benchmarks, while
              Optimus delivered strong asymmetry and compounding — each in line with its mandate.
            </p>

            <div className={styles.pills}>
              <span className={styles.pill}>
                <span className={`${styles.pillDot} ${styles.accent}`} aria-hidden />
                Polaris — stability &amp; compounding
              </span>
              <span className={styles.pill}>
                <span className={`${styles.pillDot} ${styles.lime}`} aria-hidden />
                Optimus — alpha &amp; asymmetry
              </span>
              <span className={styles.pill}>
                <span className={`${styles.pillDot} ${styles.muted}`} aria-hidden />
                Together — a complete solution
              </span>
            </div>

            <div className={styles.ctaRow}>
              <Button href={ctaLinks.bookCall} external>
                Book a discovery call
              </Button>
              <Button href="/" variant="ghost">
                Back to home
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.disclaimer}>
        <p>{disclaimer}</p>
      </footer>
    </article>
  );
}

function ExpBulletIcon({
  className,
  accent,
}: {
  className?: string;
  accent: "polaris" | "optimus";
}) {
  return (
    <svg
      className={[className, accent === "optimus" ? styles.expIconOptimus : ""].filter(Boolean).join(" ")}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 3v18M8 8l4-4 4 4M8 16l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
