"use client";

import { CalcShell } from "./CalcShell";
import { PolarisCycleTable } from "@/components/sections/PolarisCycleTable";

export function PolarisCompoundingCalculator() {
  return (
    <CalcShell
      title="Polaris 1× → 110×"
      tagline="Compounding after tax, fees & withdrawals"
      disclaimer="Illustrative model using Polaris-style assumptions: full 2× gross return each cycle, 12.5% LTCG on gains, 20% performance fee on post-tax profit, 10% withdrawal of starting capital per cycle. Not a guarantee of returns or MyNella product performance. See /pms/polaris for the mandate."
    >
      <PolarisCycleTable />
    </CalcShell>
  );
}
