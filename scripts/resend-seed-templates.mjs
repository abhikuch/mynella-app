#!/usr/bin/env node
/**
 * Create draft email templates in Resend via API (visible in Dashboard → Templates).
 * Edit copy and publish there, or use template_id when sending if you switch sends to templates.
 *
 * Usage:
 *   node scripts/resend-seed-templates.mjs
 *   node scripts/resend-seed-templates.mjs --dry-run   # print only, no API calls
 *
 * Requires RESEND_API_KEY. Templates are created as drafts (not auto-published).
 */
import { loadDotenvFiles } from "./load-dotenv.mjs";

loadDotenvFiles([".env.local", ".env", "sanity/.env"]);

const dryRun = process.argv.includes("--dry-run");

const templates = [
  {
    name: "Clearmind / Newsletter welcome (draft)",
    subject: "You're on the list",
    html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111;max-width:560px;margin:24px;">
  <p>Hi there,</p>
  <p>Thanks for subscribing to Clearmind updates. We'll only write when we have something worth your time.</p>
  <p style="color:#555;font-size:14px;">— Clearmind</p>
</body></html>`,
  },
  {
    name: "Clearmind / Contact follow-up (draft)",
    subject: "We received your message",
    html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111;max-width:560px;margin:24px;">
  <p>Hi {{firstName}},</p>
  <p>Thanks for reaching out through our website. Our team will review your note and respond shortly.</p>
  <p style="color:#555;font-size:14px;">— Clearmind</p>
</body></html>`,
    variables: [{ key: "firstName", type: "string", fallbackValue: "there" }],
  },
];

async function main() {
  if (dryRun) {
    console.log("[dry-run] Would create templates:\n", templates.map((t) => t.name).join("\n "));
    return;
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY.");
    process.exit(1);
  }

  const { default: Resend } = await import("resend");
  const resend = new Resend(apiKey);

  for (const t of templates) {
    console.log(`Creating draft: ${t.name}…`);
    const { data, error } = await resend.templates.create({
      name: t.name,
      subject: t.subject,
      html: t.html,
      ...(t.variables ? { variables: t.variables } : {}),
    });
    if (error) {
      console.error("  Error:", error);
      continue;
    }
    console.log("  OK draft id:", data?.id, "(publish in Resend Dashboard when ready)");
  }

  console.log("\nDone. Open Resend → Templates to edit and publish.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
