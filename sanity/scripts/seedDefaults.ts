/**
 * Upserts site settings, page copy, team roster, and FAQ items.
 *
 * Run from `sanity/`:
 *   npm run seed
 *
 * Loads `sanity/.env` for SANITY_API_TOKEN. Without a token, use `sanity login` and run with
 * `sanity exec ./scripts/seedDefaults.ts --with-user-token`.
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createClient, type SanityClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";
import { contactPageSeed } from "../defaultContent/contactPageSeed";
import { homeContentSeed } from "../defaultContent/homeContentSeed";
import { pageCopySeed } from "../defaultContent/pageCopySeed";
import { siteChromeSeed } from "../defaultContent/siteChromeSeed";
import { faqDocFromRow, FAQ_SEED_ROWS } from "../defaultContent/faqExtendedSeed";
import { partnersSeedRows } from "../defaultContent/partnersSeed";
import { siteSettingsDefaults, teamMembersSeed } from "../defaultContent/siteDefaults";
import {
  alphaPortfolios,
  quantoPortfolios,
  type PortfolioData,
} from "../../src/lib/model-portfolios";

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

function portfolioToStrategyDoc(p: PortfolioData) {
  return {
    _id: `portfolioStrategy-${p.family}-${p.slug}`,
    _type: "portfolioStrategy" as const,
    slug: p.slug,
    family: p.family,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    universe: p.universe,
    rebalance: p.rebalance,
    minInvestment: p.minInvestment,
    riskProfile: p.riskProfile,
    methodology: p.methodology,
    suitableFor: p.suitableFor,
    platforms: p.platforms.map((pl) => ({
      name: pl.name,
      slug: pl.slug,
      href: pl.href ?? "",
      logo: pl.logo ?? "",
    })),
    performance: {
      inceptionDate: p.performance.inceptionDate,
      cagr: p.performance.cagr,
      benchmarkName: p.performance.benchmarkName,
      benchmarkCagr: p.performance.benchmarkCagr,
      returns: p.performance.returns.map((r) => ({
        label: r.label,
        portfolio: r.portfolio,
        benchmark: r.benchmark,
      })),
    },
  };
}

export default async function seedDefaults() {
  const client = getWriteClient();

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    ...siteSettingsDefaults,
  });

  const { _id: _homeId, ...homeFields } = homeContentSeed;
  await client.createOrReplace({
    _id: "homeContent",
    _type: "homeContent",
    ...homeFields,
  });

  const { _id: _cpId, _type: _cpType, ...contactFields } = contactPageSeed;
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    ...contactFields,
  });

  for (const row of partnersSeedRows) {
    const { _id, ...pr } = row;
    await client.createOrReplace({
      _id,
      _type: "partner",
      ...pr,
    });
  }

  const { _id: _scId, _type: _sct, ...chromeFields } = siteChromeSeed;
  await client.createOrReplace({
    _id: "siteChrome",
    _type: "siteChrome",
    ...chromeFields,
    partners: partnersSeedRows.map((p, i) => ({
      _key: `pref-${i}`,
      _type: "reference" as const,
      _ref: p._id,
    })),
  });

  await client.createOrReplace({
    _id: "marketingPage-pms-hub",
    _type: "marketingPage",
    routeKey: "pms-hub",
    path: "/pms",
    title: "PMS hub",
    modules: [
      {
        _key: "mod-faq-pms",
        _type: "modFaqSection",
        eyebrow: "FAQ",
        title: "PMS questions — quick answers.",
        placement: "pms-hub",
      },
    ],
  });

  await client.createOrReplace({
    _id: "marketingPage-algo-hub",
    _type: "marketingPage",
    routeKey: "algo-hub",
    path: "/algo",
    title: "Algo hub",
    modules: [
      {
        _key: "mod-faq-algo",
        _type: "modFaqSection",
        eyebrow: "FAQ",
        title: "Algo programs — common questions.",
        placement: "algo-hub",
      },
    ],
  });

  await client.createOrReplace({
    _id: "marketingPage-model-portfolios",
    _type: "marketingPage",
    routeKey: "model-portfolios",
    path: "/model-portfolios",
    title: "Model portfolios",
    modules: [
      {
        _key: "mod-faq-mp",
        _type: "modFaqSection",
        eyebrow: "Frequently Asked Questions",
        title: "Common questions, answered.",
        placement: "model-portfolios",
      },
    ],
  });

  /** Product pages: FAQ stub for Studio; page bodies are built in React (`*Page.tsx`), not from these modules. */
  const productMarketingPages: {
    _id: string;
    routeKey: string;
    path: string;
    title: string;
    placement:
      | "pms-polaris"
      | "algo-optimus"
      | "algo-pledge-plus"
      | "algo-pledge-plus-mini"
      | "algo-polaris-lite";
  }[] = [
    {
      _id: "marketingPage-pms-polaris",
      routeKey: "pms-polaris",
      path: "/pms/polaris",
      title: "Polaris PMS — product",
      placement: "pms-polaris",
    },
    {
      _id: "marketingPage-algo-optimus",
      routeKey: "algo-optimus",
      path: "/algo/optimus",
      title: "Optimus — product",
      placement: "algo-optimus",
    },
    {
      _id: "marketingPage-algo-pledge-plus",
      routeKey: "algo-pledge-plus",
      path: "/algo/pledge-plus",
      title: "Pledge+ — product",
      placement: "algo-pledge-plus",
    },
    {
      _id: "marketingPage-algo-pledge-plus-mini",
      routeKey: "algo-pledge-plus-mini",
      path: "/algo/pledge-plus-mini",
      title: "Pledge+ Mini — product",
      placement: "algo-pledge-plus-mini",
    },
    {
      _id: "marketingPage-algo-polaris-lite",
      routeKey: "algo-polaris-lite",
      path: "/algo/polaris-lite",
      title: "Polaris Lite — product",
      placement: "algo-polaris-lite",
    },
  ];

  for (const p of productMarketingPages) {
    const extraIds = await client.fetch<string[]>(
      `*[_type == "marketingPage" && routeKey == $rk && _id != $cid]._id`,
      { rk: p.routeKey, cid: p._id },
    );
    for (const id of extraIds) {
      await client.delete(id);
    }
    await client.createOrReplace({
      _id: p._id,
      _type: "marketingPage",
      routeKey: p.routeKey,
      path: p.path,
      title: p.title,
      modules: [
        {
          _key: "mod-faq-product",
          _type: "modFaqSection",
          eyebrow: "Frequently Asked Questions",
          title: "Common questions, answered.",
          placement: p.placement,
        },
      ],
    });
  }

  for (const p of [...quantoPortfolios, ...alphaPortfolios]) {
    await client.createOrReplace(portfolioToStrategyDoc(p));
  }

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

  for (const row of FAQ_SEED_ROWS) {
    await client.createOrReplace(faqDocFromRow(row));
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
  const nPortfolios = quantoPortfolios.length + alphaPortfolios.length;
  console.log(
    "Seeded: siteSettings + siteChrome + homeContent + contactPage +",
    nPortfolios,
    "portfolio strategies +",
    pageCopySeed.length,
    "page copies +",
    teamMembersSeed.length,
    "team +",
    FAQ_SEED_ROWS.length,
    "FAQ +",
    partnersSeedRows.length,
    "partners + 8 marketing pages (3 hubs + 5 product).",
  );
}

void seedDefaults().catch((err) => {
  console.error(err);
  process.exit(1);
});
