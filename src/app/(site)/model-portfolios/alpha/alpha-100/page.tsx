import type { Metadata } from "next";
import { getMergedPortfolio } from "@/lib/model-portfolios-resolve";
import { PortfolioPage } from "@/components/sections/PortfolioPage";
import { notFound } from "next/navigation";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { portfolioPageCopyRouteKey } from "@/lib/portfolio-page-copy";
import { getPageCopy } from "@/sanity/lib/pageCopy";

const routeKey = portfolioPageCopyRouteKey("alpha", "alpha-100");

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getMergedPortfolio("alpha", "alpha-100");
  return pageMetadataForRoute(
    routeKey,
    {
title: portfolio?.name ?? "Alpha 100",
      description: portfolio?.description ?? "",
    },
    "/model-portfolios/alpha/alpha-100",
  );
}

export default async function Alpha100Page() {
  const portfolio = await getMergedPortfolio("alpha", "alpha-100");
  if (!portfolio) return notFound();
  const copy = await getPageCopy(routeKey);
  return <PortfolioPage portfolio={portfolio} copy={copy} />;
}
