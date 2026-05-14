/**
 * Responsive smoke: horizontal overflow + mobile nav visibility per viewport.
 * Requires: production server running (e.g. npm run start -- -p 3456)
 * Run: node scripts/responsive-audit.mjs
 * Uses system Chrome when available (no bundled Chromium download).
 */
import { chromium } from "playwright";

const BASE = process.env.AUDIT_BASE_URL || "http://127.0.0.1:3456";

/**
 * `AUDIT_PATHS` — comma-separated subset to limit the run (useful for quick spot-checks
 * after adding a single route). When unset, the full `PATHS` array is used.
 */
const PATHS_OVERRIDE = (process.env.AUDIT_PATHS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const ALL_PATHS = [
  "/",
  "/about",
  "/contact",
  "/blog",
  "/blog/fy-2025-26-performance",
  "/algo",
  "/algo/optimus",
  "/algo/pledge-plus",
  "/algo/pledge-plus-mini",
  "/algo/polaris-lite",
  "/pms",
  "/pms/polaris",
  "/model-portfolios",
  "/model-portfolios/alpha",
  "/model-portfolios/alpha/alpha-100",
  "/model-portfolios/alpha/alpha-200",
  "/model-portfolios/alpha/alpha-500",
  "/model-portfolios/quanto",
  "/model-portfolios/quanto/large-cap",
  "/model-portfolios/quanto/mid-cap",
  "/model-portfolios/quanto/small-cap",
  "/model-portfolios/quanto/flexi-cap",
  "/model-portfolios/quanto/multi-cap",
  "/model-portfolios/quanto/microcap",
  "/calculators",
  "/calculators/retirement",
];

const PATHS = PATHS_OVERRIDE.length > 0 ? PATHS_OVERRIDE : ALL_PATHS;

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 900 },
  { name: "laptop", width: 1024, height: 900 },
  { name: "desktop", width: 1280, height: 900 },
];

const THEMES = [
  { name: "dark", attr: null },
  { name: "light", attr: "light" },
];

async function measure(page) {
  return page.evaluate(() => {
    const el = document.documentElement;
    const body = document.body;
    const innerW = window.innerWidth;
    const innerH = window.innerHeight;
    const linksUl = document.querySelector("nav ul[class*='links']");
    const hamburgerBtn = document.querySelector("nav button[class*='hamburger']");
    const linksDisplay = linksUl ? getComputedStyle(linksUl).display : "";
    const hamburgerDisplay = hamburgerBtn ? getComputedStyle(hamburgerBtn).display : "";
    /**
     * Visible horizontal bleed: only count in-flow / relative boxes that intersect the viewport.
     * - Ignores display:none, zero opacity, and position fixed/absolute/sticky to reduce
     *   marquee/overlay false positives.
     * - Skips elements whose nearest scroll/clip ancestor (overflow-x: hidden|clip|scroll|auto)
     *   sits fully inside the viewport. Such elements are visually clipped (e.g. the .track
     *   inside a marquee with overflow:hidden), so they can't be seen or scrolled to.
     */
    function isClippedByAncestor(node) {
      let p = node.parentElement;
      while (p) {
        const ps = getComputedStyle(p);
        const ovX = ps.overflowX;
        if (ovX === "hidden" || ovX === "clip" || ovX === "scroll" || ovX === "auto") {
          const pr = p.getBoundingClientRect();
          if (pr.right <= innerW + 2) return true;
        }
        p = p.parentElement;
      }
      return false;
    }

    let maxBleed = 0;
    const walk = document.body?.querySelectorAll("*") ?? [];
    for (const node of walk) {
      if (!(node instanceof HTMLElement)) continue;
      const st = getComputedStyle(node);
      if (st.visibility === "hidden" || st.display === "none" || Number(st.opacity) === 0) continue;
      const pos = st.position;
      if (pos === "fixed" || pos === "absolute" || pos === "sticky") continue;
      const r = node.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      if (r.bottom < 0 || r.top > innerH) continue;
      if (r.left > innerW - 4 || r.right < 8) continue;
      if (r.right <= innerW) continue;
      if (isClippedByAncestor(node)) continue;
      maxBleed = Math.max(maxBleed, r.right - innerW);
    }
    const layoutBleedPx = maxBleed;
    const maxElementRight = innerW + maxBleed;
    return {
      scrollWidth: Math.max(el.scrollWidth, body?.scrollWidth ?? 0),
      clientWidth: el.clientWidth,
      innerWidth: innerW,
      maxElementRight,
      layoutBleedPx,
      linksDisplay,
      hamburgerDisplay,
    };
  });
}

async function main() {
  const browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
    headless: true,
  });

  const rows = [];
  const overflowIssues = [];
  const navIssues = [];

  try {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await context.newPage();
      try {
        for (const path of PATHS) {
          for (const theme of THEMES) {
            const url = `${BASE}${path}`;
            try {
              await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
              await page.waitForSelector("nav", { state: "visible", timeout: 15000 });
              await page.waitForTimeout(120);
              if (theme.attr) {
                await page.evaluate((t) => {
                  document.documentElement.setAttribute("data-theme", t);
                  try {
                    localStorage.setItem("cm-theme", t);
                  } catch {
                    /* ignore */
                  }
                }, theme.attr);
                await page.waitForTimeout(100);
              } else {
                await page.evaluate(() => {
                  document.documentElement.removeAttribute("data-theme");
                  try {
                    localStorage.removeItem("cm-theme");
                  } catch {
                    /* ignore */
                  }
                });
                await page.waitForTimeout(50);
              }

              const m = await measure(page);
              const overflow = m.layoutBleedPx > 2;
              rows.push({
                path,
                vp: vp.name,
                theme: theme.name,
                scrollWidth: m.scrollWidth,
                clientWidth: m.clientWidth,
                layoutBleedPx: m.layoutBleedPx,
                maxElementRight: m.maxElementRight,
                overflow,
              });
              if (overflow) {
                overflowIssues.push({
                  path,
                  vp: vp.name,
                  theme: theme.name,
                  layoutBleedPx: m.layoutBleedPx,
                  maxElementRight: m.maxElementRight,
                  innerWidth: m.innerWidth,
                });
              }
              if (vp.width < 940) {
                if (m.hamburgerDisplay === "none" || m.linksDisplay !== "none") {
                  navIssues.push({
                    path,
                    vp: vp.name,
                    theme: theme.name,
                    issue: "expected_mobile_nav_pattern",
                    linksDisplay: m.linksDisplay,
                    hamburgerDisplay: m.hamburgerDisplay,
                  });
                }
              } else if (vp.width >= 1024) {
                if (m.linksDisplay === "none" || m.hamburgerDisplay !== "none") {
                  navIssues.push({
                    path,
                    vp: vp.name,
                    theme: theme.name,
                    issue: "expected_desktop_nav_pattern",
                    linksDisplay: m.linksDisplay,
                    hamburgerDisplay: m.hamburgerDisplay,
                  });
                }
              }
            } catch (e) {
              rows.push({
                path,
                vp: vp.name,
                theme: theme.name,
                error: String(e?.message || e),
              });
            }
          }
        }
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  const summary = {
    urls: PATHS.length,
    checks: rows.filter((r) => !r.error).length,
    errors: rows.filter((r) => r.error).length,
    overflowCount: overflowIssues.length,
    navAnomalyCount: navIssues.length,
  };

  console.log(JSON.stringify({ summary, overflowIssues, navIssues, rows }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
