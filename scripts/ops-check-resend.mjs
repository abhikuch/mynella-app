#!/usr/bin/env node
/**
 * Operational check: Resend API key, segment/audience ID, list access, optional create+delete probe.
 *
 * Usage (from repo root, with .env.local or .env containing RESEND_*):
 *   node scripts/ops-check-resend.mjs
 *   node scripts/ops-check-resend.mjs --write-test   # creates then removes a test contact
 *
 * Loads: .env.local, .env (root), sanity/.env — same keys as Vercel.
 */
import { loadDotenvFiles } from "./load-dotenv.mjs";

loadDotenvFiles([".env.local", ".env", "sanity/.env"]);

const { default: Resend } = await import("resend");

const apiKey = process.env.RESEND_API_KEY?.trim();
const segmentId = process.env.RESEND_LEADS_SEGMENT_ID?.trim();
const audienceId = process.env.RESEND_LEADS_AUDIENCE_ID?.trim();
const writeTest = process.argv.includes("--write-test");

async function main() {
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY (set in .env.local or export it).");
    process.exit(1);
  }

  const resend = new Resend(apiKey);

  console.log("1) API key present — listing segments (first page)…");
  const segList = await resend.segments.list({ limit: 20 });
  if (segList.error) {
    console.error("   segments.list error:", segList.error);
  } else {
    const n = segList.data?.data?.length ?? 0;
    console.log(`   OK — ${n} segment(s) visible.`);
    if (n && segList.data?.data) {
      for (const s of segList.data.data.slice(0, 5)) {
        console.log(`   - ${s.name} (${s.id})`);
      }
    }
  }

  if (segmentId) {
    console.log(`2) RESEND_LEADS_SEGMENT_ID set — listing contacts in segment…`);
    const contacts = await resend.contacts.list({ segmentId, limit: 5 });
    if (contacts.error) {
      console.error("   contacts.list error:", contacts.error);
    } else {
      const rows = contacts.data?.data ?? [];
      console.log(`   OK — ${rows.length} contact(s) in sample (limit 5).`);
      for (const c of rows) {
        console.log(`   - ${c.email}`);
      }
    }
  } else {
    console.log("2) RESEND_LEADS_SEGMENT_ID not set — skip segment contact list.");
  }

  if (audienceId && !segmentId) {
    console.log(`2b) RESEND_LEADS_AUDIENCE_ID — listing contacts in audience…`);
    const contacts = await resend.contacts.list({ audienceId, limit: 5 });
    if (contacts.error) {
      console.error("   contacts.list error:", contacts.error);
    } else {
      const rows = contacts.data?.data ?? [];
      console.log(`   OK — ${rows.length} contact(s) in sample.`);
    }
  }

  if (!segmentId && !audienceId) {
    console.warn(
      "\n   Warning: neither RESEND_LEADS_SEGMENT_ID nor RESEND_LEADS_AUDIENCE_ID is set — site will not add contacts to a list.",
    );
  }

  if (writeTest && (segmentId || audienceId)) {
    const testEmail = `clearmind.ops.${Date.now()}@example.com`;
    console.log(`3) --write-test: creating test contact ${testEmail} …`);
    const payload =
      segmentId ?
        {
          email: testEmail,
          firstName: "Ops",
          lastName: "Test",
          segments: [{ id: segmentId }],
          properties: {
            lead_source: "footer",
            phone: "+91 9999999999",
          },
        }
      : {
          email: testEmail,
          firstName: "Ops",
          lastName: "Test",
          audienceId,
          properties: {
            lead_source: "footer",
            phone: "+91 9999999999",
          },
        };

    const created = await resend.contacts.create(payload);
    if (created.error) {
      console.error("   create error:", created.error);
      process.exit(1);
    }
    console.log("   created:", created.data?.id ?? created.data);

    console.log("4) Removing test contact…");
    const removed = await resend.contacts.remove({ email: testEmail });
    if (removed.error) {
      console.error("   remove error:", removed.error);
      process.exit(1);
    }
    console.log("   OK — removed.");
  } else if (writeTest) {
    console.log("3) --write-test skipped (need segment or audience ID).");
  }

  console.log("\nOps check finished.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
