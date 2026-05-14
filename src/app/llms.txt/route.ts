import { SITE_URL } from "@/lib/seo-config";

const CONTENT = `# MyNella

> SEBI-registered Portfolio Manager (REG-NUMBER-PMS) and Research Analyst (REG-NUMBER-RA). MyNella builds institutional-grade, algorithm-driven investment mandates for serious capital — equity, options, and derivatives — where process replaces noise.

MyNella is founded by practitioners with 25+ years of market experience. The firm operates under SEBI regulation and manages capital across discretionary PMS, algorithmic strategies, and model portfolios. All mandates are process-driven, systematically executed, and performance-fee aligned.

## Products

### Polaris PMS
- URL: ${SITE_URL}/pms/polaris
- Type: SEBI-registered discretionary Portfolio Management Service
- Minimum: ₹50 Lakhs (SEBI PMS threshold)
- Fee: Zero fixed management fee. Performance fee only — charged as a share of profit, tiered by capital-doubling speed.
- Strategy: Momentum and trend-following, concentrated equity. Thematic screening + multi-factor filtering. Human judgment layer (macro, cycles, events) combined with machine layer (signals, backtests, execution).
- Registration: REG-NUMBER-PMS

### Optimus
- URL: ${SITE_URL}/algo/optimus
- Type: Algorithmic options-buying strategy (Research Analyst framework)
- Minimum: ₹15 Lakhs
- Fee: Management fee up to 1.5% of AUM. Performance fee 25% above a 10% hurdle rate.
- Strategy: Market-agnostic absolute return strategy. Rule-based options buying designed to harvest volatility across market regimes. Fully automated execution.
- Registration: REG-NUMBER-RA

### Pledge+
- URL: ${SITE_URL}/algo/pledge-plus
- Type: Margin-enhanced directional F&O strategy (Research Analyst framework)
- Minimum: ₹1 Crore
- Strategy: Systematic leverage strategy using pledged equity margins. Deploys idle margin into high-liquidity futures and options without liquidating long-term positions. For investors seeking capital-efficient incremental returns.
- Registration: REG-NUMBER-RA

### Pledge+ Mini
- URL: ${SITE_URL}/algo/pledge-plus-mini
- Type: Margin-enhanced directional commodity F&O strategy (Research Analyst framework)
- Minimum: ₹50 Lakhs
- Strategy: Lower-ticket variant of Pledge+ using pledged equity margins; deployment remains commodity-focused (gold, crude, natural gas) under systematic risk filters.
- Registration: REG-NUMBER-RA

### Polaris Lite
- URL: ${SITE_URL}/algo/polaris-lite
- Type: Systematic equity strategy (Research Analyst / Smallcase framework)
- Minimum: ₹10 Lakhs
- Fee: Performance-only fee structure.
- Strategy: The Polaris systematic equity engine made accessible at a lower ticket. Adaptive stock selection and allocation from ₹10L. Same process discipline as Polaris PMS.
- Registration: REG-NUMBER-RA

### Alpha Model Portfolios
- Alpha 100: ${SITE_URL}/model-portfolios/alpha/alpha-100 — Momentum-led concentrated picks from the Nifty 100 universe.
- Alpha 200: ${SITE_URL}/model-portfolios/alpha/alpha-200 — Momentum-led concentrated picks from the Nifty 200 universe (wider, captures mid-cap momentum).
- Minimum: ₹5 Lakhs (platform-dependent)

### Quanto Model Portfolios
- Hub: ${SITE_URL}/model-portfolios/quanto
- Variants: Large Cap, Mid Cap, Small Cap, Multi Cap, Flexi Cap, Microcap
- Strategy: Quantitative cap-segment model portfolios. Rules-based rebalancing across market capitalisation bands.
- Minimum: Platform-dependent (typically ₹5 Lakhs)

## Performance

Latest performance data (through March 2026):
- Optimus: +45.88% return, Max drawdown −26.13%, Sharpe 1.04, Sortino 1.14
- Polaris PMS: +0.63% return (through Mar 2026), Max drawdown −17.75%, Sharpe 0.12
- Nifty 50: −8.23% return, Max drawdown −14.78%
- Nifty 100: −7.92% return, Max drawdown −14.45%
- Nifty 500: −6.82% return, Max drawdown −14.23%

Full performance report: ${SITE_URL}/blog/fy-2025-26-performance

## Fee Philosophy

MyNella does not charge fixed management fees on discretionary mandates. Fees are performance-linked — the manager earns only when the investor earns. This aligns incentives structurally rather than contractually.

## Regulatory

- SEBI Portfolio Manager: REG-NUMBER-PMS
- SEBI Research Analyst: REG-NUMBER-RA
- Grievance officer and compliance details available on the Polaris PMS and About pages.

## Local / regulatory education

- Wealth management in Pune (regulated categories, not a firm directory): ${SITE_URL}/wealth-management-pune

## Calculators (Free tools)

Interactive investor tools at ${SITE_URL}/calculators:
- CAGR Calculator: ${SITE_URL}/calculators/cagr
- Time to 100% Return (doubling time): ${SITE_URL}/calculators/time-to-double
- 10·20·30 Growth Visualiser: ${SITE_URL}/calculators/growth-visualiser
- Drawdown Recovery Calculator: ${SITE_URL}/calculators/drawdown-recovery
- Cost of Panic Selling: ${SITE_URL}/calculators/panic-selling
- Luxury Trap Calculator: ${SITE_URL}/calculators/luxury-trap
- Cost of Starting Late: ${SITE_URL}/calculators/start-late
- Fee Destroyer: ${SITE_URL}/calculators/fee-destroyer
- Min. Ticket Checker: ${SITE_URL}/calculators/min-ticket
- Risk Profile Finder: ${SITE_URL}/calculators/sleeve-sizer
- Martingale Risk of Ruin: ${SITE_URL}/calculators/martingale
- Polaris 1× → 110× (compounding): ${SITE_URL}/calculators/polaris-compounding
- Real Number Retirement Calculator: ${SITE_URL}/calculators/retirement

## About

- About MyNella: ${SITE_URL}/about
- Contact: ${SITE_URL}/contact
- Blog: ${SITE_URL}/blog
- Is algo trading legal in India (educational): ${SITE_URL}/blog/is-algo-trading-legal-india
- Stock loss & drawdown recovery guide: ${SITE_URL}/blog/stock-loss-drawdown-recovery-guide

## Important Disclaimers

- Past performance is not indicative of future returns.
- All performance figures are illustrative or historical and should not be construed as a promise or guarantee of future returns.
- Investments in securities markets are subject to market risks. Read all scheme-related documents carefully.
- This website is intended for informational purposes only and does not constitute investment advice.
- SEBI registration does not guarantee performance or protect against loss.
`;

export function GET() {
  return new Response(CONTENT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
