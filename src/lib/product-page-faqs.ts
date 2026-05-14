/**
 * Default FAQ copy for product routes — same content as legacy section components
 * (OptimusPage, PledgePlusPage, PolarisPage). Used when Sanity
 * returns no `faqItem` rows for that placement.
 */
import type { FAQItem } from "@/components/ui/FAQ";
import type { FaqPlacement } from "../../sanity/schemaTypes/faqPlacements";

export const optimusProductFaqItems: FAQItem[] = [
  {
    question: "Is Optimus fully automated?",
    answer: "Yes. It is fully automated and algorithm-based.",
  },
  {
    question: "Is it market directional?",
    answer:
      "No. It is designed to be market-agnostic, capitalizing on volatility in both bullish and bearish trends.",
  },
  {
    question: "What is the win rate?",
    answer:
      "Approximately 38.64% based on our record; profitability depends on payoff ratio.",
  },
  {
    question: "What is the maximum drawdown?",
    answer: "Our live metrics indicate drawdowns of up to -25.47%.",
  },
  {
    question: "Is leverage involved?",
    answer: "Options inherently involve leveraged exposure.",
  },
  {
    question: "Is this SEBI regulated?",
    answer: "Yes. Operated under SEBI Registered Research Analyst No. REG-NUMBER-RA.",
  },
];

export const pledgePlusProductFaqItems: FAQItem[] = [
  {
    question: "What exactly gets pledged?",
    answer:
      "Your existing equity holdings (stocks in your demat account) are pledged with the broker to generate margin. The shares remain in your name and continue to earn dividends — they are not sold or transferred.",
  },
  {
    question: "Can I unpledge and sell my shares at any time?",
    answer:
      "Yes. Shares can be unpledged, though this may require reducing open derivative positions first. The process typically takes 1-2 business days.",
  },
  {
    question: "What happens if my pledged stocks fall in value?",
    answer:
      "A decline in pledged stock value reduces available margin. The cash buffer (sized per mandate, often ~⅓ of capital) is designed to absorb such fluctuations. In extreme cases, derivative positions may be scaled down.",
  },
  {
    question: "Why is a separate cash margin required?",
    answer:
      "The cash component serves as a risk buffer to cover mark-to-market losses, margin shortfalls from stock price declines, and exchange-mandated cash requirements for derivative positions. The amount is set per mandate relative to deployed capital.",
  },
  {
    question: "What asset classes does Pledge+ trade?",
    answer:
      "Pledge+ deploys into equity index futures and options (Nifty, Bank Nifty), commodity futures (gold, crude, natural gas), and volatility-sensitive setups across these markets.",
  },
  {
    question: "Is there a lock-in period?",
    answer:
      "There is no regulatory lock-in. However, the strategy performs best over a 12+ month horizon. Early exit may require unwinding derivative positions, which could impact returns.",
  },
  {
    question: "Is this SEBI regulated?",
    answer:
      "Yes. Pledge+ is operated under MyNella Consultancy Pvt. Ltd., a SEBI-Registered Research Analyst (Registration No. REG-NUMBER-RA).",
  },
];

export const pledgePlusMiniProductFaqItems: FAQItem[] = [
  {
    question: "How is Pledge+ Mini different from Pledge+?",
    answer:
      "Pledge+ Mini follows the same core framework as Pledge+, but is structured for a lower ticket size (₹50L) and currently focused on commodities-only derivatives deployment.",
  },
  {
    question: "What is the minimum capital for Pledge+ Mini?",
    answer:
      "The minimum allocation is ₹50 Lakhs, with an illustrative cash buffer sized within the mandate for margin resilience and drawdown management.",
  },
  {
    question: "What asset classes does Pledge+ Mini trade?",
    answer:
      "Pledge+ Mini is designed to trade high-liquidity commodity futures and options, such as gold, crude, and natural gas, under systematic risk controls.",
  },
  {
    question: "Do I need to sell my equity holdings to start?",
    answer:
      "No. Existing equity holdings are pledged to create margin; you continue to hold the shares in your demat account.",
  },
  {
    question: "Is there a lock-in period?",
    answer:
      "There is no regulatory lock-in, but the strategy is intended for investors who can stay through market cycles and avoid short-horizon exits.",
  },
  {
    question: "Is this SEBI regulated?",
    answer:
      "Yes. Pledge+ Mini is operated under MyNella Consultancy Pvt. Ltd., a SEBI-registered Research Analyst (REG-NUMBER-RA).",
  },
];

export const polarisPmsProductFaqItems: FAQItem[] = [
  {
    question: "What is the minimum investment for Polaris PMS?",
    answer:
      "The minimum investment is ₹50 Lakhs as per SEBI regulations for Portfolio Management Services. This ensures adequate diversification within the concentrated strategy framework.",
  },
  {
    question: "Is there a lock-in period?",
    answer:
      "There is no regulatory lock-in. However, Polaris is designed for a 3+ year investment horizon. Early withdrawals may impact performance as the strategy requires time to compound through market cycles.",
  },
  {
    question: "How is PMS taxed differently from mutual funds?",
    answer:
      "In PMS, stocks are held directly in your demat account, so capital gains tax applies on each transaction. Short-term gains (held < 1 year) are taxed at 20%, and long-term gains (held > 1 year) above ₹1.25 Lakhs are taxed at 12.5%. Your CA can optimise tax harvesting within the PMS structure.",
  },
  {
    question: "How do I track my portfolio?",
    answer:
      "You receive regular performance reports with detailed attribution analysis. Since stocks sit in your own demat account, you also have full real-time visibility through your broker platform.",
  },
  {
    question: "What benchmark does Polaris compare against?",
    answer:
      "Polaris benchmarks against the Nifty 500 Total Return Index, though the strategy's alpha-generation approach means it may deviate significantly from any single benchmark during certain market phases.",
  },
  {
    question: "How is Polaris different from a mutual fund?",
    answer:
      "Three key differences: (1) your stocks sit in your own demat — full ownership and transparency, (2) the strategy is concentrated with 15-25 high-conviction positions vs. 50-80 in most mutual funds, and (3) the fee structure is purely performance-aligned with zero fixed management fee.",
  },
  {
    question: "Can I withdraw my capital at any time?",
    answer:
      "Yes. You can request a partial or full redemption at any time. Liquidation typically takes 3-5 business days depending on market conditions. There are no exit loads or penalties.",
  },
];

export const polarisLiteProductFaqItems: FAQItem[] = [
  {
    question: "What is the minimum investment for Polaris Lite?",
    answer:
      "The minimum investment is ₹10 Lakhs. This makes the Polaris strategy accessible to a wider range of investors while maintaining the same quantitative discipline.",
  },
  {
    question: "How is Polaris Lite different from Polaris?",
    answer:
      "Polaris Lite uses the same quantitative engine, construction philosophy, and fee structure as Polaris. The key difference is accessibility — a ₹10 Lakh minimum vs. ₹50 Lakhs for the full Polaris strategy.",
  },
  {
    question: "Is there a lock-in period?",
    answer:
      "There is no lock-in. However, Polaris Lite is designed for a 3+ year investment horizon. Early withdrawals may impact performance as the strategy requires time to compound through market cycles.",
  },
  {
    question: "How do I track my portfolio?",
    answer:
      "You receive regular performance reports with detailed attribution analysis. Since stocks sit in your own demat account, you also have full real-time visibility through your broker platform.",
  },
  {
    question: "What benchmark does Polaris Lite compare against?",
    answer:
      "Polaris Lite benchmarks against the Nifty 500 Total Return Index, though the strategy's alpha-generation approach means it may deviate significantly from any single benchmark during certain market phases.",
  },
  {
    question: "How is Polaris Lite different from a mutual fund?",
    answer:
      "Three key differences: (1) your stocks sit in your own demat — full ownership and transparency, (2) the strategy is concentrated with high-conviction positions vs. 50-80 in most mutual funds, and (3) the fee structure is purely performance-aligned with zero fixed management fee.",
  },
  {
    question: "Can I withdraw my capital at any time?",
    answer:
      "Yes. You can request a partial or full redemption at any time. Liquidation typically takes 3-5 business days depending on market conditions. There are no exit loads or penalties.",
  },
];

const PRODUCT_FAQ_BY_PLACEMENT: Partial<Record<FaqPlacement, FAQItem[]>> = {
  "algo-optimus": optimusProductFaqItems,
  "algo-pledge-plus": pledgePlusProductFaqItems,
  "algo-pledge-plus-mini": pledgePlusMiniProductFaqItems,
  "pms-polaris": polarisPmsProductFaqItems,
  "algo-polaris-lite": polarisLiteProductFaqItems,
};

/** Product-page defaults when CMS has no FAQ rows for this placement. */
export function defaultProductPageFaqItems(placement: FaqPlacement): FAQItem[] | null {
  const items = PRODUCT_FAQ_BY_PLACEMENT[placement];
  return items?.length ? items : null;
}
