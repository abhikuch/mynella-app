import type { PortableTextBlock } from "@portabletext/types";
import type { FAQItem } from "@/components/ui/FAQ";
import { defaultProductPageFaqItems } from "@/lib/product-page-faqs";
import { FAQ_SEED_ROWS } from "../../sanity/defaultContent/faqExtendedSeed";
import { plainTextToAnswerBlocks } from "../../sanity/defaultContent/ptHelpers";
import type { FaqPlacement } from "../../sanity/schemaTypes/faqPlacements";

export type CmsFaqRow = { question: string; answer: PortableTextBlock[] | null };

function asBlocks(v: PortableTextBlock[]): PortableTextBlock[] {
  return v as PortableTextBlock[];
}

function seedFaqItemsForPlacement(placement: FaqPlacement): FAQItem[] {
  const rows = FAQ_SEED_ROWS.filter((r) => (r.placements ?? []).some((p) => p === placement));
  return rows
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((r) => ({
      question: r.question ?? "",
      answer: asBlocks(plainTextToAnswerBlocks(r.answerPlain ?? "", r._id ?? "faq-fallback")),
    }));
}

/** Merge CMS FAQ (Portable Text) with typed seed fallbacks per placement. */
export function faqItemsWithFallback(placement: FaqPlacement, cms: CmsFaqRow[] | null | undefined): FAQItem[] {
  if (cms && cms.length > 0) {
    return cms.map((c) => ({
      question: c.question,
      answer:
        c.answer?.length ?
          asBlocks(c.answer)
        : asBlocks(
            plainTextToAnswerBlocks("Answer pending in CMS.", `faq-fallback-${c.question.slice(0, 24)}`),
          ),
    }));
  }
  const productDefaults = defaultProductPageFaqItems(placement);
  if (productDefaults?.length) return productDefaults;
  return seedFaqItemsForPlacement(placement);
}
