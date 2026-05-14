import type { Metadata } from "next";
import { getMergedPortfolio } from "@/lib/model-portfolios-resolve";
import { PortfolioPage } from "@/components/sections/PortfolioPage";
import { notFound } from "next/navigation";
import { pageMetadataForRoute } from "@/lib/page-copy-merge";
import { portfolioPageCopyRouteKey } from "@/lib/portfolio-page-copy";
import { getPageCopy } from "@/sanity/lib/pageCopy";

const routeKey = portfolioPageCopyRouteKey("quanto", "microcap");

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getMergedPortfolio("quanto", "microcap");
  return pageMetadataForRoute(
    routeKey,
    {
title: portfolio?.name ?? "Quanto Microcap",
      description: portfolio?.description ?? "",
    },
    "/model-portfolios/quanto/microcap",
  );
}

export default async function MicrocapPage() {
  const portfolio = await getMergedPortfolio("quanto", "microcap");
  if (!portfolio) return notFound();
  const copy = await getPageCopy(routeKey);
  return <PortfolioPage portfolio={portfolio} copy={copy} />;
}
