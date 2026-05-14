import type { BlogStaticDef } from "@/lib/blog-static-registry";
import { PillarArticleByline } from "@/components/pillar-articles/PillarArticleByline";
import { PillarArticleLayout } from "@/components/pillar-articles/PillarArticleLayout";
import { PillarRelatedLinks } from "@/components/pillar-articles/PillarRelatedLinks";
import {
  pillarArticleJsonLdScript,
  pillarBreadcrumbJsonLdScript,
  pillarFaqJsonLdScript,
} from "@/lib/pillar-jsonld";
import {
  articleSchemaPersonFromPillarAuthor,
  DEFAULT_PILLAR_AUTHOR,
  PILLAR_CONTENT_FIRST_PUBLISHED,
  PILLAR_CONTENT_LAST_UPDATED,
} from "@/lib/eeat-author";
import { getSeoFallback } from "@/lib/seo-content";
import { SITE_URL } from "@/lib/seo-config";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Eyebrow } from "@/components/ui/Eyebrow";
import postStyles from "@/app/(site)/blog/[slug]/post.module.css";

export function BlogStaticEducationalArticle({
  def,
}: {
  def: BlogStaticDef;
}) {
  const Body = def.Body;
  const pathname = `/blog/${def.slug}`;
  const url = `${SITE_URL}${pathname}`;
  const seo = getSeoFallback(def.seoSourcePath);
  const description = seo.description;
  const authorArticle = articleSchemaPersonFromPillarAuthor(DEFAULT_PILLAR_AUTHOR);
  const contentLastUpdatedIso = PILLAR_CONTENT_LAST_UPDATED;

  const crumbs = [
    { label: "Home", href: "/" as const },
    { label: "Blog", href: "/blog" as const },
    { label: def.crumbLabel },
  ];

  const jsonLdCrumbs: { name: string; item: string }[] = [{ name: "Home", item: SITE_URL }];
  jsonLdCrumbs.push({ name: "Blog", item: `${SITE_URL}/blog` });
  jsonLdCrumbs.push({ name: def.crumbLabel, item: url });

  const kindLabel = def.kind === "guide" ? "Guide" : "Compare";

  return (
    <>
      {pillarArticleJsonLdScript({
        url,
        headline: def.crumbLabel,
        description,
        datePublished: PILLAR_CONTENT_FIRST_PUBLISHED,
        dateModified: contentLastUpdatedIso,
        authorPerson: authorArticle,
      })}
      {pillarBreadcrumbJsonLdScript(jsonLdCrumbs)}
      {pillarFaqJsonLdScript(def.faqs)}
      <SectionWrapper variant="alt">
        <Eyebrow>Blog</Eyebrow>
        <p className={postStyles.meta}>
          {kindLabel} · Long-form
        </p>
        <PillarArticleLayout crumbs={crumbs}>
          <PillarArticleByline author={DEFAULT_PILLAR_AUTHOR} lastUpdatedIso={contentLastUpdatedIso} />
          <Body />
          <PillarRelatedLinks pathname={pathname} />
        </PillarArticleLayout>
      </SectionWrapper>
    </>
  );
}
