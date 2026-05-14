import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { CM_BLOG_ACCESS_COOKIE } from "@/lib/lead-capture-constants";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { getPageCopy } from "@/sanity/lib/pageCopy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { reportMeta } from "@/lib/performance-report-fy2026";
import { formatPostDate } from "@/lib/format-post-date";
import { socialLinks } from "@/lib/navigation";
import { fetchPostList } from "@/sanity/lib/queries";
import { BLOG_STATIC_PAGES } from "@/lib/blog-static-registry";
import { getSeoFallback } from "@/lib/seo-content";
import styles from "./blog.module.css";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadataForRoute(
    "blog",
    {
      title: "Insights & research",
      description:
        "Notes from the MyNella desk — annual reviews, market context, and how we think about systematic equity and risk.",
    },
    "/blog",
  );
}

type ListPost = {
  key: string;
  href: string;
  meta: string;
  title: string;
  description: string;
  external: boolean;
};

export default async function BlogPage() {
  const [cmsPosts, cookieJar] = await Promise.all([fetchPostList(), cookies()]);
  const hasBlogAccess = cookieJar.get(CM_BLOG_ACCESS_COOKIE)?.value === "1";

  const staticFeatured: ListPost = {
    key: `static-${reportMeta.slug}`,
    href: `/blog/${reportMeta.slug}`,
    meta: reportMeta.publishedLabel,
    title: reportMeta.title,
    description: `${reportMeta.subtitle}. Period: ${reportMeta.period}.`,
    external: false,
  };

  const staticSlugs = new Set(BLOG_STATIC_PAGES.map((p) => p.slug));

  const fromRegistry: ListPost[] = BLOG_STATIC_PAGES.map((p) => {
    const seo = getSeoFallback(p.seoSourcePath);
    return {
      key: `registry-${p.slug}`,
      href: `/blog/${p.slug}`,
      meta: p.kind === "guide" ? "Guide" : "Compare",
      title: seo.title.replace(/\s*\|\s*MyNella\s*$/i, "").trim() || p.crumbLabel,
      description: seo.description,
      external: false,
    };
  });

  const fromCms: ListPost[] = cmsPosts
    .filter((p) => p.slug !== reportMeta.slug && !staticSlugs.has(p.slug))
    .map((p) => ({
      key: p._id,
      href: p.externalUrl ?? `/blog/${p.slug}`,
      meta: formatPostDate(p.publishedAt),
      title: p.title,
      description: p.excerpt ?? "",
      external: Boolean(p.externalUrl),
    }));

  const merged = [staticFeatured, ...fromRegistry, ...fromCms];

  const externalWritings = socialLinks.filter((s) =>
    ["substack", "medium"].includes(s.id),
  );

  return (
    <>
      <SectionWrapper>
        <Eyebrow>From the blog</Eyebrow>
        <h1>Insights from our research desk.</h1>
        <p className={styles.lead}>
          Actionable context for long-term investors — published by the MyNella
          team. The performance report lives here; other posts are edited in{" "}
          <strong>Sanity</strong> and appear below when published.
        </p>
      </SectionWrapper>

      <SectionWrapper variant="alt">
        <Eyebrow>Latest</Eyebrow>
        <h2>Posts</h2>
        <ul className={styles.list}>
          {merged.map((post) => (
            <li key={post.key}>
              {post.external ? (
                <a
                  href={post.href}
                  className={styles.card}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.cardMeta}>{post.meta}</div>
                  <div className={styles.cardTitle}>{post.title}</div>
                  {post.description ? (
                    <p className={styles.cardDesc}>{post.description}</p>
                  ) : null}
                </a>
              ) : (
                <Link href={post.href} className={styles.card}>
                  <div className={styles.cardMeta}>{post.meta}</div>
                  <div className={styles.cardTitle}>{post.title}</div>
                  {hasBlogAccess && post.description ? (
                    <p className={styles.cardDesc}>{post.description}</p>
                  ) : !hasBlogAccess ? (
                    <p className={styles.cardDescLocked}>
                      Open the article and complete the email step to read the full piece.
                    </p>
                  ) : null}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.external}>
          <div className={styles.externalTitle}>Also on</div>
          <div className={styles.externalLinks}>
            {externalWritings.map((s) => (
              <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
