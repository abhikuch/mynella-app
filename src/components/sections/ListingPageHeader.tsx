import { Eyebrow } from "@/components/ui/Eyebrow";
import { mergedEyebrow, mergedHeroText } from "@/lib/page-copy-merge";
import type { PageCopyDoc } from "@/sanity/lib/pageCopy";
import { listingStyles } from "@/components/sections/PortfolioListing";

export function ListingPageHeader({
  copy,
  eyebrow,
  title,
  lead,
}: {
  copy?: PageCopyDoc | null;
  eyebrow: string;
  title: string;
  lead: string;
}) {
  const h = mergedHeroText(copy, { line1: title, sub: lead });
  return (
    <div className={listingStyles.header}>
      <Eyebrow>{mergedEyebrow(copy, eyebrow)}</Eyebrow>
      <h1>{h.line1}</h1>
      <p className={listingStyles.lead}>{h.sub}</p>
    </div>
  );
}
