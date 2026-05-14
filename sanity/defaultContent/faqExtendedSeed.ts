import type { FaqPlacement } from "../schemaTypes/faqPlacements";
import { plainTextToAnswerBlocks } from "./ptHelpers";

export type FaqSeedExtendedRow = {
  _id: string;
  question: string;
  answerPlain: string;
  placements: FaqPlacement[];
  order: number;
};

export const FAQ_SEED_ROWS: FaqSeedExtendedRow[] = [
  {
    _id: "faqItem-where-based",
    question: "Where is MyNella based?",
    answerPlain:
      "MyNella Consultancy Pvt. Ltd. is headquartered in Pune, Maharashtra. We work with investors across India through regulated channels and digital onboarding.",
    placements: ["about"],
    order: 0,
  },
  {
    _id: "faqItem-registrations",
    question: "What registrations does MyNella hold?",
    answerPlain:
      "We are SEBI-registered as a Portfolio Manager (REG-NUMBER-PMS) and as a Research Analyst (REG-NUMBER-RA). Registration does not guarantee returns; it reflects regulatory oversight of our activities.",
    placements: ["about"],
    order: 1,
  },
  {
    _id: "faqItem-who-leads",
    question: "Who leads investment decisions?",
    answerPlain:
      "The firm is founder-led by Punam Kucheria, a market practitioner with 30+ years of experience. Strategic direction combines human judgment on regime and risk with systematic models for screening, sizing, and execution.",
    placements: ["about"],
    order: 2,
  },
  {
    _id: "faqItem-only-pms",
    question: "Do you offer only PMS?",
    answerPlain:
      "No. In addition to discretionary PMS (Polaris), we offer algorithmic strategies (Optimus, Pledge+, Polaris Lite) and model portfolios on partner platforms — so capital can be deployed in line with ticket size and risk appetite.",
    placements: ["about"],
    order: 3,
  },
  {
    _id: "faqItem-become-client",
    question: "How do I become a client?",
    answerPlain:
      "Start with a strategy conversation to align mandate, risk, and horizon. We then guide you through KYC, agreements, and deployment. Use Book a Call on the site or email hello@mynella.com.",
    placements: ["about"],
    order: 4,
  },
  {
    _id: "faqItem-follow-research",
    question: "How can I follow your research?",
    answerPlain:
      "We publish commentary on Medium and Substack. Links are in the site footer and on the home page under Research & Market Outlook.",
    placements: ["about"],
    order: 5,
  },
  {
    _id: "faqItem-pms-what",
    question: "What is Portfolio Management Service (PMS)?",
    answerPlain:
      "PMS is a discretionary investment service where a SEBI-registered portfolio manager makes investment decisions on your behalf within an agreed mandate. Securities are typically held in your demat account, with transparency and reporting as per regulations.",
    placements: ["pms-hub"],
    order: 10,
  },
  {
    _id: "faqItem-pms-min",
    question: "What is the minimum investment for MyNella PMS?",
    answerPlain:
      "Polaris PMS is designed for investors who can allocate ₹50 Lakhs or more, in line with regulatory thresholds and the concentrated nature of the strategy.",
    placements: ["pms-hub"],
    order: 11,
  },
  {
    _id: "faqItem-pms-fees",
    question: "How does MyNella charge for Polaris?",
    answerPlain:
      "Polaris uses a performance-aligned fee model with no fixed management fee. Performance fees apply based on capital-doubling milestones and hurdle rates — full detail is on the Polaris page under Fee Structure.",
    placements: ["pms-hub"],
    order: 12,
  },
  {
    _id: "faqItem-pms-vs-mf",
    question: "How is PMS different from a mutual fund?",
    answerPlain:
      "You own stocks directly (not units of a pooled scheme), the portfolio can be more concentrated, and fee structures differ. Tax treatment and reporting also vary — your advisor can help compare for your situation.",
    placements: ["pms-hub"],
    order: 13,
  },
  {
    _id: "faqItem-pms-withdraw",
    question: "Can I withdraw from PMS?",
    answerPlain:
      "Liquidity is subject to the PMS agreement and market conditions; redemptions are typically processed within a few business days. Polaris is designed for a 3+ year horizon even though regulatory lock-in may not apply.",
    placements: ["pms-hub"],
    order: 14,
  },
  {
    _id: "faqItem-pms-only-way",
    question: "Is PMS the only way to work with MyNella?",
    answerPlain:
      "No. If ticket size or risk preference does not fit PMS, consider Polaris Lite, algo strategies, or model portfolios on partner platforms — all linked from the main navigation.",
    placements: ["pms-hub"],
    order: 15,
  },
  {
    _id: "faqItem-algo-meaning",
    question: "What does \"algo\" mean at MyNella?",
    answerPlain:
      "It covers rule-based and automated strategies: from systematic equity (Polaris Lite) to derivatives-focused programs (Optimus, Pledge+). Each has a clear mandate, risk label, and minimum ticket.",
    placements: ["algo-hub"],
    order: 20,
  },
  {
    _id: "faqItem-algo-suitable",
    question: "Are algo strategies suitable for everyone?",
    answerPlain:
      "No. Optimus and Pledge+ use derivatives and can experience large swings. Suitability checks apply before activation. Polaris Lite is equity-focused but still requires tolerance for volatility.",
    placements: ["algo-hub"],
    order: 21,
  },
  {
    _id: "faqItem-algo-optimus-auto",
    question: "Is Optimus fully automated?",
    answerPlain:
      "Yes. Optimus runs on a systematic engine without discretionary overrides during live trading — as described on the Optimus product page.",
    placements: ["algo-hub"],
    order: 22,
  },
  {
    _id: "faqItem-algo-lite-vs-pms",
    question: "How is Polaris Lite different from Polaris PMS?",
    answerPlain:
      "Polaris PMS is a discretionary portfolio management service (higher ticket, PMS regulations). Polaris Lite delivers a similar systematic equity approach under the RA framework starting at ₹10L — see the Polaris Lite page for detail.",
    placements: ["algo-hub"],
    order: 23,
  },
  {
    _id: "faqItem-algo-combine",
    question: "Can I combine algo with model portfolios?",
    answerPlain:
      "Allocation across products should follow your risk budget and overlap rules. We discuss portfolio construction on strategy calls to avoid unintended concentration.",
    placements: ["algo-hub"],
    order: 24,
  },
  {
    _id: "faqItem-algo-start",
    question: "How do I start?",
    answerPlain:
      "Pick the strategy page that matches your capital and risk profile, read disclosures, then book a call or email hello@mynella.com.",
    placements: ["algo-hub"],
    order: 25,
  },
  {
    _id: "faqItem-pledge-mini-diff",
    question: "How is Pledge+ Mini different from Pledge+?",
    answerPlain:
      "Pledge+ Mini uses the same strategy DNA as Pledge+ but is structured for ₹50L capital and currently stays focused on commodities-only derivatives deployment.",
    placements: ["algo-pledge-plus-mini"],
    order: 40,
  },
  {
    _id: "faqItem-pledge-mini-minimum",
    question: "What is the minimum capital for Pledge+ Mini?",
    answerPlain:
      "The minimum allocation is ₹50 Lakhs. A disciplined cash buffer is maintained within the mandate to support margin resilience and risk control.",
    placements: ["algo-pledge-plus-mini"],
    order: 41,
  },
  {
    _id: "faqItem-pledge-mini-assets",
    question: "What does Pledge+ Mini trade?",
    answerPlain:
      "Pledge+ Mini is designed to trade high-liquidity commodity futures and options, such as gold, crude, and natural gas, under systematic trade filters.",
    placements: ["algo-pledge-plus-mini"],
    order: 42,
  },
  {
    _id: "faqItem-pledge-mini-pledge",
    question: "Do I need to sell existing equity to start?",
    answerPlain:
      "No. Equity holdings are pledged to generate margin while remaining in your demat account. Shares are not sold for mandate activation.",
    placements: ["algo-pledge-plus-mini"],
    order: 43,
  },
  {
    _id: "faqItem-pledge-mini-regulated",
    question: "Is Pledge+ Mini SEBI regulated?",
    answerPlain:
      "Yes. The strategy is operated under MyNella Consultancy Pvt. Ltd. as a SEBI-registered Research Analyst (REG-NUMBER-RA).",
    placements: ["algo-pledge-plus-mini"],
    order: 44,
  },
  {
    _id: "faqItem-mp-invest",
    question: "How do I invest in a model portfolio?",
    answerPlain:
      "Subscribe to any portfolio on a supported platform (smallcase, Dhan, etc.), review the stock recommendations, and execute the trades in your own demat account. Rebalance updates are sent when the portfolio is rebalanced.",
    placements: ["model-portfolios"],
    order: 30,
  },
  {
    _id: "faqItem-mp-manage",
    question: "Do you manage my money directly?",
    answerPlain:
      "No. MyNella is a SEBI-registered research analyst. We provide stock recommendations via model portfolios. Your money stays in your own brokerage account — we never hold or manage client funds.",
    placements: ["model-portfolios"],
    order: 31,
  },
  {
    _id: "faqItem-mp-rebalance",
    question: "How often are portfolios rebalanced?",
    answerPlain:
      "Most portfolios follow a quarterly rebalance cycle. Some strategies (like Micro Cap) may rebalance monthly. The cadence is specified on each portfolio detail page.",
    placements: ["model-portfolios"],
    order: 32,
  },
  {
    _id: "faqItem-mp-min",
    question: "What is the minimum amount to start?",
    answerPlain:
      "It depends on the portfolio. Each portfolio page displays the current minimum investment required. Typical ranges are ₹25,000 to ₹5,00,000.",
    placements: ["model-portfolios"],
    order: 33,
  },
  {
    _id: "faqItem-mp-custom",
    question: "Can I customise the stock selection?",
    answerPlain:
      "Model portfolios follow a fixed, rules-based methodology. Customisation would break the integrity of the quant framework. For bespoke needs, explore our PMS offerings instead.",
    placements: ["model-portfolios"],
    order: 34,
  },
];

export function faqDocFromRow(row: FaqSeedExtendedRow) {
  return {
    _id: row._id,
    _type: "faqItem" as const,
    question: row.question,
    answer: plainTextToAnswerBlocks(row.answerPlain, row._id),
    placements: row.placements,
    order: row.order,
  };
}
