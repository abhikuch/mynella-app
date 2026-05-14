import type { Metadata } from "next";
import { getMergedPortfolio } from "@/lib/model-portfolios-resolve";
import { PortfolioPage } from "@/components/sections/PortfolioPage";
import { notFound } from "next/navigation";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { portfolioPageCopyRouteKey } from "@/lib/portfolio-page-copy";
import { getPageCopy } from "@/sanity/lib/pageCopy";

const routeKey = portfolioPageCopyRouteKey("alpha", "alpha-500");

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getMergedPortfolio("alpha", "alpha-500");
  return pageMetadataForRoute(
    routeKey,
    {
title: portfolio?.name ?? "Alpha 500",
      description: portfolio?.description ?? "",
    },
    "/model-portfolios/alpha/alpha-500",
  );
}

export default async function Alpha500Page() {
  const portfolio = await getMergedPortfolio("alpha", "alpha-500");
  if (!portfolio) return notFound();
  const copy = await getPageCopy(routeKey);
  return <PortfolioPage portfolio={portfolio} copy={copy} />;
}
