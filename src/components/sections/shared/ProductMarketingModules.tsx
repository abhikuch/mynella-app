import type { PortableTextBlock } from "@portabletext/types";
import { PostBody } from "@/components/blog/PostBody";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import type { ModRichTextDoc } from "@/sanity/lib/marketingPage";
import type { MarketingContentModule } from "@/sanity/lib/marketingPage";
import { withoutRiskDisclosureModules } from "@/lib/marketing-module-filters";

import styles from "./ProductMarketingModules.module.css";

function HeadingBandModule({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
}) {
  const t = title?.trim();
  if (!t) return null;
  return (
    <SectionWrapper>
      {eyebrow?.trim() ? <Eyebrow>{eyebrow.trim()}</Eyebrow> : null}
      <h2 className={styles.headingTitle}>{t}</h2>
      {subtitle?.trim() ?
        <p className={styles.headingSubtitle}>{subtitle.trim()}</p>
      : null}
    </SectionWrapper>
  );
}

function RichTextModule(mod: ModRichTextDoc) {
  const body = mod.body as PortableTextBlock[] | null | undefined;
  if (!body?.length) return null;
  const narrow = mod.narrow !== false;
  return (
    <SectionWrapper variant="alt">
      <div className={narrow ? styles.richNarrow : styles.richWide}>
        {mod.eyebrow?.trim() ? <Eyebrow>{mod.eyebrow.trim()}</Eyebrow> : null}
        {mod.title?.trim() ?
          <h2 className={styles.headingTitle}>{mod.title.trim()}</h2>
        : null}
        {mod.subtitle?.trim() ?
          <p className={styles.headingSubtitle}>{mod.subtitle.trim()}</p>
        : null}
        <PostBody value={body} />
      </div>
    </SectionWrapper>
  );
}

/** Renders Sanity marketing modules (heading band + rich text) after the hero, in CMS order. */
export function ProductMarketingModules({ modules }: { modules: MarketingContentModule[] }) {
  const safe = withoutRiskDisclosureModules(modules) as MarketingContentModule[];
  if (!safe.length) return null;
  return (
    <>
      {safe.map((m, i) => {
        const key = m._key ?? `${m._type}-${i}`;
        if (m._type === "modHeadingBand") {
          return (
            <HeadingBandModule
              key={key}
              eyebrow={m.eyebrow}
              title={m.title}
              subtitle={m.subtitle}
            />
          );
        }
        if (m._type === "modRichText") {
          return <RichTextModule key={key} {...m} />;
        }
        return null;
      })}
    </>
  );
}
