import type { PortableTextBlock } from "@portabletext/types";
import type { FAQItem } from "@/components/ui/FAQ";
import { portableTextToPlain } from "@/lib/pt-plain";

function answerPlain(item: FAQItem): string {
  if (typeof item.answer === "string") return item.answer;
  return portableTextToPlain(item.answer as PortableTextBlock[]);
}

/** FAQPage structured data — keep in sync with visible FAQ content. */
export function FaqJsonLd({ items }: { items: FAQItem[] }) {
  if (!items.length) return null;
  const mainEntity = items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answerPlain(item),
    },
  }));
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
