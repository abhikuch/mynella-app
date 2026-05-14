import { SITE_URL } from "@/lib/seo-config";

const CONTENT = `# MyNella

> MyNella is a makeup and beauty marketing site. Editorial tutorials, product storytelling, and a fast Next.js front-end with Sanity CMS.

## Site

- Home: ${SITE_URL}/
- About: ${SITE_URL}/about
- Contact: ${SITE_URL}/contact
- Terms: ${SITE_URL}/terms
- Privacy: ${SITE_URL}/privacy

## Stack

- Next.js App Router for pages and SEO metadata
- Sanity Studio for structured content (site settings, page copy, contact page, navigation)
- Deployed on Vercel with environment-based configuration

## Note

Replace this file’s copy as your product positioning evolves. It is meant for AI crawlers and assistants that read llms.txt.
`;

export function GET() {
  return new Response(CONTENT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
