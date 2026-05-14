/** Filters legacy risk-disclosure blocks from Sanity marketing module arrays. */

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

/** In-page risk blocks removed site-wide; CMS may still contain legacy `*-risk` / "Risk Disclosure" modules. */
function isRiskDisclosureRichTextModule(m: unknown): boolean {
  if (!isRecord(m) || m._type !== "modRichText") return false;
  const key = typeof m._key === "string" ? m._key : "";
  if (key.endsWith("-risk")) return true;
  const title = typeof m.title === "string" ? m.title.trim() : "";
  const eyebrow = typeof m.eyebrow === "string" ? m.eyebrow.trim() : "";
  return title === "Risk Disclosure" || eyebrow === "Risk Disclosure";
}

export function withoutRiskDisclosureModules(modules: unknown[]): unknown[] {
  return modules.filter((x) => !isRiskDisclosureRichTextModule(x));
}
