import type { Metadata } from "next";
import { getMergedPortfolio } from "@/lib/model-portfolios-resolve";
import { PortfolioPage } from "@/components/sections/PortfolioPage";
import { notFound } from "next/navigation";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { portfolioPageCopyRouteKey } from "@/lib/portfolio-page-copy";
import { getPageCopy } from "@/sanity/lib/pageCopy";

const routeKey = portfolioPageCopyRouteKey("quanto", "large-cap");

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getMergedPortfolio("quanto", "large-cap");
  return pageMetadataForRoute(
    routeKey,
    {
title: portfolio?.name ?? "Quanto Large Cap",
      description: portfolio?.description ?? "",
    },
    "/model-portfolios/quanto/large-cap",
  );
}

export default async function LargeCapPage() {
  const portfolio = await getMergedPortfolio("quanto", "large-cap");
  if (!portfolio) return notFound();
  const copy = await getPageCopy(routeKey);
  return <PortfolioPage portfolio={portfolio} copy={copy} />;
}
