import type { Metadata } from "next";
import type { ComponentType } from "react";
import { buildPillarArticleMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/seo-config";
import type { Crumb } from "@/components/pillar-articles/PillarArticleLayout";
import { PillarArticleLayout } from "@/components/pillar-articles/PillarArticleLayout";
import {
  pillarArticleJsonLdScript,
  pillarBreadcrumbJsonLdScript,
  pillarFaqJsonLdScript,
  pillarPersonJsonLdScript,
  type PillarFaq,
} from "@/lib/pillar-jsonld";
import {
  articleSchemaPersonFromPillarAuthor,
  DEFAULT_PILLAR_AUTHOR,
  PILLAR_CONTENT_FIRST_PUBLISHED,
  PILLAR_CONTENT_LAST_UPDATED,
  punamAbsoluteImageUrl,
  punamSameAsLinks,
  type PillarAuthor,
} from "@/lib/eeat-author";
import { getSeoFallback } from "@/lib/seo-content";
import { PillarRelatedLinks } from "@/components/pillar-articles/PillarRelatedLinks";
import { PillarArticleByline } from "@/components/pillar-articles/PillarArticleByline";

export type PillarArticlePageProps = {
  pathname: string;
  crumbs: Crumb[];
  Body: ComponentType;
  faqs?: PillarFaq[];
  /** Optional Person schema for team profiles */
  person?: {
    name: string;
    jobTitle: string;
    description: string;
    sameAs?: string[];
    image?: string;
  };
  /** Visible byline + Article `author` (Person). Defaults to Punam Kucheria. */
  author?: PillarAuthor;
  /** Hide duplicate byline on the author profile page (hero replaces it). */
  hideAuthorByline?: boolean;
  /** ISO date for “Last updated” and JSON-LD `dateModified`. Defaults to editorial baseline. */
  contentLastUpdatedIso?: string;
};

export function generatePillarMetadata(pathname: string): Promise<Metadata> {
  return Promise.resolve(buildPillarArticleMetadata(pathname));
}

export function PillarArticlePage({
  pathname,
  crumbs,
  Body,
  faqs,
  person,
  author = DEFAULT_PILLAR_AUTHOR,
  hideAuthorByline = false,
  contentLastUpdatedIso = PILLAR_CONTENT_LAST_UPDATED,
}: PillarArticlePageProps) {
  const url = `${SITE_URL}${pathname}`;
  const seo = getSeoFallback(pathname);
  const description = person?.description ?? seo.description;
  const authorArticle = articleSchemaPersonFromPillarAuthor(author);

  const jsonLdCrumbs: { name: string; item: string }[] = [{ name: "Home", item: SITE_URL }];
  for (let i = 1; i < crumbs.length; i++) {
    const c = crumbs[i];
    if (c.href) jsonLdCrumbs.push({ name: c.label, item: `${SITE_URL}${c.href}` });
  }
  const last = crumbs[crumbs.length - 1];
  if (last) jsonLdCrumbs.push({ name: last.label, item: url });

  return (
    <>
      {pillarArticleJsonLdScript({
        url,
        headline: crumbs[crumbs.length - 1]?.label ?? seo.title,
        description,
        datePublished: PILLAR_CONTENT_FIRST_PUBLISHED,
        dateModified: contentLastUpdatedIso,
        authorPerson: authorArticle,
      })}
      {pillarBreadcrumbJsonLdScript(jsonLdCrumbs)}
      {faqs?.length ? pillarFaqJsonLdScript(faqs) : null}
      {person ?
        pillarPersonJsonLdScript({
          url,
          name: person.name,
          jobTitle: person.jobTitle,
          description: person.description,
          sameAs: person.sameAs ?? punamSameAsLinks(),
          image: person.image ?? punamAbsoluteImageUrl(),
        })
      : null}
      <PillarArticleLayout crumbs={crumbs}>
        {hideAuthorByline ? null : (
          <PillarArticleByline author={author} lastUpdatedIso={contentLastUpdatedIso} />
        )}
        <Body />
        <PillarRelatedLinks pathname={pathname} />
      </PillarArticleLayout>
    </>
  );
}
