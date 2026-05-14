import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { SANITY_NEXT_CACHE_TAG } from "@/sanity/lib/cache-tag";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

function unauthorized() {
  return new Response("Unauthorized", { status: 401 });
}

/**
 * Busts Next.js Data Cache for all Sanity-backed `unstable_cache` entries.
 *
 * - GET or POST `?secret=YOUR_SECRET`
 * - POST JSON body: `{ "secret": "YOUR_SECRET" }`
 *
 * Set `SANITY_REVALIDATE_SECRET` on Vercel, then call this URL from a Sanity webhook
 * (HTTP method POST, same secret in query or body).
 */
export async function GET(req: NextRequest) {
  return handle(req, req.nextUrl.searchParams.get("secret"));
}

export async function POST(req: NextRequest) {
  let bodySecret: string | null = null;
  try {
    const json = (await req.json()) as { secret?: string };
    if (json && typeof json.secret === "string") bodySecret = json.secret;
  } catch {
    /* not JSON */
  }
  const secret = bodySecret ?? req.nextUrl.searchParams.get("secret");
  return handle(req, secret);
}

async function handle(_req: NextRequest, secret: string | null) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected?.trim()) {
    return new Response("SANITY_REVALIDATE_SECRET is not configured", { status: 503 });
  }
  if (!secret || secret !== expected) return unauthorized();

  revalidateTag(SANITY_NEXT_CACHE_TAG, { expire: 0 });
  return Response.json({ ok: true, tag: SANITY_NEXT_CACHE_TAG });
}
