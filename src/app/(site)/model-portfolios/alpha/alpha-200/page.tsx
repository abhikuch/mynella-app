import type { Metadata } from "next";
import { getMergedPortfolio } from "@/lib/model-portfolios-resolve";
import { PortfolioPage } from "@/components/sections/PortfolioPage";
import { notFound } from "next/navigation";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { portfolioPageCopyRouteKey } from "@/lib/portfolio-page-copy";
import { getPageCopy } from "@/sanity/lib/pageCopy";

const routeKey = portfolioPageCopyRouteKey("alpha", "alpha-200");

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getMergedPortfolio("alpha", "alpha-200");
  return pageMetadataForRoute(
    routeKey,
    {
title: portfolio?.name ?? "Alpha 200",
      description: portfolio?.description ?? "",
    },
    "/model-portfolios/alpha/alpha-200",
  );
}

export default async function Alpha200Page() {
  const portfolio = await getMergedPortfolio("alpha", "alpha-200");
  if (!portfolio) return notFound();
  const copy = await getPageCopy(routeKey);
  return <PortfolioPage portfolio={portfolio} copy={copy} />;
}
