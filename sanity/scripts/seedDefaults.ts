/**
 * Upserts site settings, page copy, contact page, and site chrome for MyNella (minimal makeup marketing site).
 *
 * Run from repo root: `npm run seed`
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createClient, type SanityClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";
import { contactPageSeed } from "../defaultContent/contactPageSeed";
import { pageCopySeed } from "../defaultContent/pageCopySeed";
import { siteChromeSeed } from "../defaultContent/siteChromeSeed";
import { siteSettingsDefaults, teamMembersSeed } from "../defaultContent/siteDefaults";

function loadSanityDotenv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const key = t.slice(0, i).trim();
    let val = t.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (key && process.env[key] === undefined) process.env[key] = val;
  }
}

loadSanityDotenv();

function getWriteClient(): SanityClient {
  const token = process.env.SANITY_API_TOKEN?.trim();
  if (token) {
    const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
    const dataset = process.env.SANITY_STUDIO_DATASET || "production";
    if (!projectId) {
      throw new Error("SANITY_STUDIO_PROJECT_ID is missing (sanity/.env).");
    }
    return createClient({
      projectId,
      dataset,
      apiVersion: "2024-12-17",
      token,
      useCdn: false,
    });
  }
  return getCliClient({ apiVersion: "2024-12-17" });
}

export default async function seedDefaults() {
  const client = getWriteClient();

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    ...siteSettingsDefaults,
  });

  const { _id: _cpId, _type: _cpType, ...contactFields } = contactPageSeed;
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    ...contactFields,
  });

  const { _id: _scId, _type: _sct, ...chromeFields } = siteChromeSeed;
  await client.createOrReplace({
    _id: "siteChrome",
    _type: "siteChrome",
    ...chromeFields,
    partners: [],
  });

  for (const row of teamMembersSeed) {
    const { _id, linkedInUrl, ...rest } = row;
    const doc: Record<string, unknown> = {
      _id,
      _type: "teamMember",
      ...rest,
    };
    if (linkedInUrl?.trim()) {
      doc.linkedInUrl = linkedInUrl.trim();
    }
    await client.createOrReplace(doc);
  }

  for (const row of pageCopySeed) {
    const { _id, ...fields } = row;
    await client.createOrReplace({
      _id,
      _type: "pageCopy",
      ...fields,
    });
  }

  // eslint-disable-next-line no-console
  console.log(
    "Seeded: siteSettings, siteChrome (no partners), contactPage,",
    pageCopySeed.length,
    "pageCopy docs,",
    teamMembersSeed.length,
    "team members.",
  );
}

void seedDefaults().catch((err) => {
  console.error(err);
  process.exit(1);
});
