import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { BlogStaticEducationalArticle } from "@/components/blog/BlogStaticEducationalArticle";
import { PillarArticleByline } from "@/components/pillar-articles/PillarArticleByline";
import { ArticleJsonLd } from "@/components/seo/ArticleJsonLd";
import { BlogLeadGate } from "@/components/leads/BlogLeadGate";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { PostBody } from "@/components/blog/PostBody";
import { CM_BLOG_ACCESS_COOKIE } from "@/lib/lead-capture-constants";
import { getBlogStaticPage } from "@/lib/blog-static-registry";
import { buildBlogStaticArticleMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/seo-config";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { resolveShareImageUrl } from "@/lib/seo-sanity";
import { fetchPostBySlug } from "@/sanity/lib/queries";
import { articleSchemaPersonFromPillarAuthor, DEFAULT_PILLAR_AUTHOR } from "@/lib/eeat-author";
import { formatPostDate } from "@/lib/format-post-date";
import { getSanityClient } from "@/sanity/lib/client";
import { getSiteSettings } from "@/sanity/lib/site";
import { getResolvedSiteChrome } from "@/sanity/lib/siteChrome";
import { resolvePrivacyPolicyHref } from "@/lib/legal-links";
import { getAllBlogStaticSlugs } from "@/lib/blog-static-registry";
import styles from "./post.module.css";

type Props = { params: Promise<{ slug: string }> };

/** Blog gate reads cookies; render per request (listing pages stay ISR). */
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const client = getSanityClient();
  const cmsSlugs =
    client ?
      await client.fetch<string[]>(`*[_type == "post" && defined(slug.current)].slug.current`)
    : [];
  const staticSlugs = getAllBlogStaticSlugs();
  const merged = new Set([...cmsSlugs, ...staticSlugs]);
  return [...merged].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const staticDef = getBlogStaticPage(slug);
  if (staticDef) {
    return buildBlogStaticArticleMetadata(`/blog/${slug}`, staticDef.seoSourcePath);
  }

  const [post, settings] = await Promise.all([fetchPostBySlug(slug), getSiteSettings()]);
  if (!post) return { title: "Post" };
  const title = post.seoTitle?.trim() || post.title;
  const description =
    post.seoDescription?.trim() || post.excerpt?.trim() || post.title;
  const pathname = `/blog/${slug}`;
  const ogImageUrl = resolveShareImageUrl(pathname, [
    post.coverImage,
    settings?.seoDefaultOgImage,
  ]);
  return buildPageMetadata(null, { title: post.title, description: post.excerpt?.trim() || post.title }, {
    pathname,
    openGraphType: "article",
    article: {
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post._updatedAt ?? undefined,
    },
    ogImageUrl,
    titleOverride: title,
    descriptionOverride: description,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const staticDef = getBlogStaticPage(slug);
  if (staticDef) {
    return <BlogStaticEducationalArticle def={staticDef} />;
  }

  const post = await fetchPostBySlug(slug);
  if (!post) notFound();
  if (post.externalUrl) redirect(post.externalUrl);

  const [settings, chrome] = await Promise.all([getSiteSettings(), getResolvedSiteChrome()]);
  const cookieJar = await cookies();
  const hasBlogAccess = cookieJar.get(CM_BLOG_ACCESS_COOKIE)?.value === "1";
  const privacyHref = resolvePrivacyPolicyHref(chrome, settings);

  const articleUrl = `${SITE_URL}/blog/${slug}`;
  const shareImage = resolveShareImageUrl(`/blog/${slug}`, [
    post.coverImage,
    settings?.seoDefaultOgImage,
  ]);
  const title = post.seoTitle?.trim() || post.title;
  const lastUpdatedIso =
    post._updatedAt?.slice(0, 10) ??
    post.publishedAt?.slice(0, 10) ??
    `${new Date().getFullYear()}-01-01`;

  return (
    <>
      <ArticleJsonLd
        title={title}
        description={post.seoDescription?.trim() || post.excerpt?.trim() || post.title}
        url={articleUrl}
        datePublished={post.publishedAt}
        dateModified={post._updatedAt}
        imageUrl={shareImage}
        authorPerson={articleSchemaPersonFromPillarAuthor(DEFAULT_PILLAR_AUTHOR)}
      />
      <SectionWrapper variant="alt">
        <BlogLeadGate initialHasAccess={hasBlogAccess} privacyHref={privacyHref}>
          <Eyebrow>Blog</Eyebrow>
          <p className={styles.meta}>{formatPostDate(post.publishedAt)}</p>
          <h1 className={styles.title}>{post.title}</h1>
          {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}
          <PillarArticleByline author={DEFAULT_PILLAR_AUTHOR} lastUpdatedIso={lastUpdatedIso} />
          <PostBody value={post.body ?? []} />
        </BlogLeadGate>
      </SectionWrapper>
    </>
  );
}
