import type { CtaLinksResolved } from "@/lib/site-chrome-resolve";
import type { SanityPostListItem } from "@/sanity/lib/queries";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absUrl(siteUrl: string, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${p}`;
}

function postUrl(siteUrl: string, post: SanityPostListItem): string {
  const ext = post.externalUrl?.trim();
  if (ext) return ext;
  return absUrl(siteUrl, `/blog/${post.slug}`);
}

function ctaButton(href: string, label: string): string {
  const h = esc(href);
  const l = esc(label);
  return `<a href="${h}" style="display:inline-block;padding:14px 28px;background:#111827;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:600;font-size:15px;">${l}</a>`;
}

function textLink(url: string, label: string): string {
  return `${label}: ${url}`;
}

type ProductLine = { title: string; summary: string; pageUrl: string; bookUrl: string };

function productLines(siteUrl: string, cta: CtaLinksResolved): ProductLine[] {
  return [
    {
      title: "Polaris PMS",
      summary: "Discretionary portfolio management — macro + quant precision.",
      pageUrl: absUrl(siteUrl, "/pms/polaris"),
      bookUrl: cta.bookPolaris,
    },
    {
      title: "Algo strategies",
      summary: "Optimus, Pledge+, and Polaris Lite — rules-based equity mandates.",
      pageUrl: absUrl(siteUrl, "/algo"),
      bookUrl: cta.bookOptimus,
    },
    {
      title: "Model portfolios",
      summary: "Alpha and Quanto model portfolios across cap segments.",
      pageUrl: absUrl(siteUrl, "/model-portfolios"),
      bookUrl: cta.bookCall,
    },
  ];
}

function emailShell(innerHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#ececf0;color:#1a1a1e;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.55;font-size:16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:28px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:14px;border:1px solid #e4e4e8;overflow:hidden;">
<tr><td style="padding:32px 28px 28px;">
${innerHtml}
</td></tr>
<tr><td style="padding:16px 28px 24px;border-top:1px solid #ececf0;font-size:13px;color:#6b7280;">
MyNella — SEBI-registered Portfolio Manager &amp; Research Analyst. Investments are subject to market risks.
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export function buildFooterWelcomeEmail(args: {
  siteUrl: string;
  bookCallUrl: string;
  contactUrl: string;
  email: string;
  phoneDisplay: string;
}): { subject: string; text: string; html: string } {
  const { siteUrl, bookCallUrl, contactUrl, email, phoneDisplay } = args;
  const subject = "You're on the list — MyNella";
  const text = [
    "Hi,",
    "",
    "Thanks for subscribing from our website. You'll receive occasional updates on markets, mandates, and how we think about process — only when we have something material to share.",
    "",
    "Here's what we saved:",
    `• Email: ${email}`,
    `• Mobile: ${phoneDisplay}`,
    "",
    "Want to speak with the team?",
    textLink(bookCallUrl, "Book a call"),
    "",
    `More ways to reach us: ${contactUrl}`,
    "",
    "— MyNella",
  ].join("\n");

  const html = emailShell(`
<p style="margin:0 0 16px;font-size:17px;">Hi,</p>
<p style="margin:0 0 18px;color:#374151;">Thanks for subscribing from our website. You&apos;ll receive occasional updates on <strong>markets</strong>, <strong>mandates</strong>, and <strong>process</strong> — only when we have something material to share.</p>
<p style="margin:0 0 8px;font-weight:600;color:#111827;">What we have on file</p>
<ul style="margin:0 0 22px;padding-left:20px;color:#374151;">
<li style="margin-bottom:6px;">Email: <strong>${esc(email)}</strong></li>
<li>Mobile: <strong>${esc(phoneDisplay)}</strong></li>
</ul>
<p style="margin:0 0 14px;font-weight:600;color:#111827;">Book a call</p>
<p style="margin:0 0 18px;color:#374151;">Prefer a conversation first? Pick a time that works for you.</p>
<p style="margin:0 0 28px;">${ctaButton(bookCallUrl, "Book a call")}</p>
<p style="margin:0;font-size:15px;"><a href="${esc(contactUrl)}" style="color:#2563eb;">Contact page</a> — other ways to reach our team.</p>
`);

  return { subject, text, html };
}

export function buildBlogWelcomeEmail(args: {
  siteUrl: string;
  bookCallUrl: string;
  blogUrl: string;
  contactUrl: string;
  cta: CtaLinksResolved;
  email: string;
  phoneDisplay: string;
  posts: SanityPostListItem[];
}): { subject: string; text: string; html: string } {
  const { siteUrl, bookCallUrl, blogUrl, contactUrl, cta, email, phoneDisplay, posts } = args;
  const subject = "Welcome — explore the MyNella blog";
  const products = productLines(siteUrl, cta);

  const postLines =
    posts.length > 0 ?
      posts.map((p) => `• ${p.title} — ${postUrl(siteUrl, p)}`)
    : [`• Browse all posts — ${blogUrl}`];

  const text = [
    "Hi,",
    "",
    "Thanks for unlocking full articles on our blog. You can keep reading on this browser without repeating this step.",
    "",
    "Here's what we saved:",
    `• Email: ${email}`,
    `• Mobile: ${phoneDisplay}`,
    "",
    "Recent & notable reads:",
    ...postLines,
    "",
    "Explore our offerings:",
    ...products.map((p) => `• ${p.title} — ${p.pageUrl} (book: ${p.bookUrl})`),
    "",
    "Book a call with the team:",
    bookCallUrl,
    "",
    `Contact: ${contactUrl}`,
    "",
    "— MyNella",
  ].join("\n");

  const postsHtml =
    posts.length > 0 ?
      `<ul style="margin:0;padding-left:20px;color:#374151;">
${posts
  .slice(0, 5)
  .map(
    (p) =>
      `<li style="margin-bottom:10px;"><a href="${esc(postUrl(siteUrl, p))}" style="color:#2563eb;font-weight:500;">${esc(p.title)}</a></li>`,
  )
  .join("")}
</ul>`
    : `<p style="margin:0;"><a href="${esc(blogUrl)}" style="color:#2563eb;font-weight:500;">Browse the blog</a></p>`;

  const productsHtml = products
    .map(
      (p) => `
<p style="margin:0 0 6px;font-weight:600;color:#111827;">${esc(p.title)}</p>
<p style="margin:0 0 4px;color:#6b7280;font-size:15px;">${esc(p.summary)}</p>
<p style="margin:0 0 16px;font-size:14px;"><a href="${esc(p.pageUrl)}" style="color:#2563eb;">Learn more</a> · <a href="${esc(p.bookUrl)}" style="color:#2563eb;">Book a call</a></p>`,
    )
    .join("");

  const html = emailShell(`
<p style="margin:0 0 16px;font-size:17px;">Hi,</p>
<p style="margin:0 0 18px;color:#374151;">Thanks for unlocking <strong>full articles</strong> on our blog. You can keep reading on this browser without repeating this step.</p>
<p style="margin:0 0 8px;font-weight:600;color:#111827;">Your details</p>
<ul style="margin:0 0 22px;padding-left:20px;color:#374151;">
<li style="margin-bottom:6px;">Email: <strong>${esc(email)}</strong></li>
<li>Mobile: <strong>${esc(phoneDisplay)}</strong></li>
</ul>
<p style="margin:0 0 12px;font-weight:600;color:#111827;">From the blog</p>
${postsHtml}
<p style="margin:24px 0 12px;font-weight:600;color:#111827;">Our products</p>
${productsHtml}
<p style="margin:8px 0 14px;font-weight:600;color:#111827;">Book a call</p>
<p style="margin:0 0 18px;color:#374151;">Questions or fit-check? Schedule time with our team.</p>
<p style="margin:0 0 28px;">${ctaButton(bookCallUrl, "Book a call")}</p>
<p style="margin:0;font-size:15px;"><a href="${esc(contactUrl)}" style="color:#2563eb;">Contact page</a></p>
`);

  return { subject, text, html };
}

export function buildLeadInternalNotification(args: {
  label: string;
  email: string;
  phoneDisplay: string;
}): { subject: string; text: string } {
  const { label, email, phoneDisplay } = args;
  const subject = `MyNella website lead — ${label}`;
  const text = [
    `Source: ${label}`,
    `Email: ${email}`,
    `Phone: ${phoneDisplay}`,
    `Time: ${new Date().toISOString()}`,
  ].join("\n");
  return { subject, text };
}
