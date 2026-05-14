import type { Metadata } from "next";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";

type CalculatorDef = {
  routeKey: string;
  fallback: { title: string; description: string };
  keywords: string[];
};

/**
 * Each tool page uses a matching `pageCopy` route key (seeded) so SEO title, description,
 * share image, robots, and optional keywords are editable in Sanity.
 */
export const CALCULATOR_PAGE_DEFS: Record<string, CalculatorDef> = {
  "/calculators/cagr": {
    routeKey: "calculator-cagr",
    fallback: {
      title: "CAGR Calculator — Free Compound Annual Growth Rate Tool | MyNella",
      description:
        "Calculate CAGR instantly. Enter your starting value, ending value, and duration to get the exact Compound Annual Growth Rate. Free, no sign-up required.",
    },
    keywords: [
      "CAGR calculator",
      "compound annual growth rate calculator",
      "CAGR formula India",
      "investment return calculator",
      "annual return calculator",
      "portfolio CAGR calculator",
      "how to calculate CAGR",
    ],
  },
  "/calculators/time-to-double": {
    routeKey: "calculator-time-to-double",
    fallback: {
      title: "Time to 100% Return Calculator — How Long to Double Your Money? | MyNella",
      description:
        "Interactive calculator: see how many years it takes to earn a 100% return (double your money) at any annual rate. Compare the exact formula with the Rule of 72. Free, no sign-up.",
    },
    keywords: [
      "double money calculator India",
      "time to double investment calculator",
      "100 percent return calculator",
      "Rule of 72 calculator",
      "years to double CAGR",
      "how long to double money",
      "compound doubling time",
      "MyNella calculator",
    ],
  },
  "/calculators/polaris-compounding": {
    routeKey: "calculator-polaris-compounding",
    fallback: {
      title: "Polaris 1× → 110× Calculator — Compounding After Tax & Fees | MyNella",
      description:
        "Model Polaris-style doubling cycles: see wealth left after each round with 12.5% LTCG, 20% performance fee, and 10% withdrawal — same tool as on the Polaris PMS page.",
    },
    keywords: [
      "Polaris PMS calculator",
      "1x to 110x wealth calculator India",
      "performance fee compounding calculator",
      "PMS doubling cycle calculator",
      "MyNella Polaris compounding",
      "capital doubling after tax calculator",
      "wealth compounding table India",
    ],
  },
  "/calculators/growth-visualiser": {
    routeKey: "calculator-growth-visualiser",
    fallback: {
      title: "10-20-30 Compounding Visualiser — See the Wealth Gap | MyNella",
      description:
        "See what ₹1 lakh becomes at 10%, 20%, and 30% CAGR over 5–40 years. The difference is staggering — and this tool makes it impossible to ignore.",
    },
    keywords: [
      "compounding calculator India",
      "10 20 30 CAGR comparison",
      "compound interest visualiser",
      "wealth growth calculator",
      "investment compounding India",
      "long term investment calculator",
      "power of compounding calculator",
    ],
  },
  "/calculators/drawdown-recovery": {
    routeKey: "calculator-drawdown-recovery",
    fallback: {
      title: "Stock Loss Recovery Calculator — Break-Even After Drawdown | MyNella",
      description:
        "Free stock loss recovery calculator: enter a portfolio drawdown and see the break-even return needed (drawdown asymmetry). For investors searching stock loss recovery or drawdown and recovery—education only, not advice.",
    },
    keywords: [
      "stock loss recovery calculator",
      "drawdown and recovery",
      "drawdown recovery calculator",
      "portfolio drawdown calculator",
      "how much return to recover loss",
      "investment loss recovery India",
      "drawdown asymmetry",
      "portfolio loss calculator",
      "recovery from market crash calculator",
    ],
  },
  "/calculators/panic-selling": {
    routeKey: "calculator-panic-selling",
    fallback: {
      title: "Cost of Panic Selling Calculator — Missing Best Market Days | MyNella",
      description:
        "Missing the 10 best stock market days can cut your returns by half. See the exact cost of panic selling and market timing with this free calculator.",
    },
    keywords: [
      "cost of panic selling calculator",
      "market timing calculator India",
      "missing best market days cost",
      "staying invested calculator",
      "equity investing behaviour India",
      "investor behaviour calculator",
      "stock market panic selling",
    ],
  },
  "/calculators/luxury-trap": {
    routeKey: "calculator-luxury-trap",
    fallback: {
      title: "Luxury Trap Calculator — Real Cost of Lifestyle Spending | MyNella",
      description:
        "Find the true compounding cost of a luxury purchase. That ₹30L car doesn't just cost ₹30L — it costs ₹2 Cr+ in compounded wealth over 20 years.",
    },
    keywords: [
      "luxury trap calculator",
      "opportunity cost calculator India",
      "real cost of luxury spending",
      "car vs investment calculator India",
      "opportunity cost of spending",
      "lifestyle inflation calculator",
      "invest vs spend calculator India",
    ],
  },
  "/calculators/start-late": {
    routeKey: "calculator-start-late",
    fallback: {
      title: "Cost of Starting Late — SIP Investment at 25 vs 35 vs 45 | MyNella",
      description:
        "Starting SIP at 25 vs 35 vs 45: same monthly investment, same returns — but wildly different retirement wealth. See the compounding cost of every year you wait.",
    },
    keywords: [
      "cost of starting late calculator",
      "SIP age comparison calculator India",
      "invest early vs late calculator",
      "early investing calculator India",
      "SIP at 25 vs 35 calculator",
      "power of starting early investing",
      "retirement savings start age calculator",
    ],
  },
  "/calculators/fee-destroyer": {
    routeKey: "calculator-fee-destroyer",
    fallback: {
      title: "Fee Destroyer — Real Cost of Mutual Fund Expense Ratios | MyNella",
      description:
        "A 1% annual fee destroys more wealth than you think. On ₹50L over 20 years at 12% CAGR, a 1% fee silently takes ₹53L from you. See the true fee drag.",
    },
    keywords: [
      "mutual fund fee calculator India",
      "expense ratio impact calculator",
      "fee drag calculator",
      "investment fee calculator India",
      "direct vs regular mutual fund calculator",
      "TER impact calculator",
      "cost of fees on investment India",
    ],
  },
  "/calculators/min-ticket": {
    routeKey: "calculator-min-ticket",
    fallback: {
      title: "Minimum Ticket Checker — Which Investments Can You Access? | MyNella",
      description:
        "Enter your investable corpus and instantly see which MyNella investment mandates — PMS, smallcase, model portfolios — are accessible to you based on minimum ticket sizes.",
    },
    keywords: [
      "minimum investment PMS India",
      "PMS minimum ticket size",
      "smallcase minimum investment",
      "which investment I can afford India",
      "minimum corpus for PMS",
      "investment eligibility checker",
      "MyNella minimum investment",
    ],
  },
  "/calculators/sleeve-sizer": {
    routeKey: "calculator-sleeve-sizer",
    fallback: {
      title: "Risk Profile Finder — What Kind of Investor Are You? | MyNella",
      description:
        "Answer 5 questions to discover your investor risk category — conservative, moderate, growth, or aggressive — and see which MyNella mandates match your profile.",
    },
    keywords: [
      "investor risk profile India",
      "risk category calculator India",
      "am I a conservative or aggressive investor",
      "investment risk profiling tool",
      "which mutual fund for my risk appetite",
      "investor profile quiz India",
      "PMS risk category India",
      "MyNella investor profile",
    ],
  },
  "/calculators/martingale": {
    routeKey: "calculator-martingale",
    fallback: {
      title: "Martingale Risk of Ruin — The Averaging-Down Trap | MyNella",
      description:
        "See exactly how doubling down on a falling stock destroys capital. Input any stock, drop%, and averaging levels — watch capital needs explode and ruin probability mount.",
    },
    keywords: [
      "averaging down stocks risk calculator",
      "martingale strategy stocks India",
      "risk of ruin calculator India",
      "buying falling stocks danger",
      "averaging down trap investor education",
      "Yes Bank DHFL stock averaging down loss",
      "sunk cost fallacy investing India",
      "when to cut losses stocks India",
    ],
  },
  "/calculators/retirement": {
    routeKey: "calculator-retirement",
    fallback: {
      title: "Retirement Calculator — Real Number for Indian Investors | MyNella",
      description:
        "Inflation- and tax-aware retirement corpus calculator. Funds 25–30 years of withdrawals at the real rate of return, with a transparent SIP-gap solver. Every formula on screen.",
    },
    keywords: [
      "retirement calculator India",
      "retirement corpus calculator",
      "inflation adjusted retirement calculator",
      "retirement SIP gap calculator",
      "FIRE corpus calculator India",
      "real rate of return retirement",
      "retirement planning calculator India",
      "MyNella retirement calculator",
    ],
  },
};

export async function calculatorPageMetadata(pathname: string): Promise<Metadata> {
  const def = CALCULATOR_PAGE_DEFS[pathname];
  if (!def) {
    throw new Error(`Calculator metadata not configured for ${pathname}`);
  }
  return pageMetadataForRoute(def.routeKey, def.fallback, pathname, {
    keywords: def.keywords,
  });
}
