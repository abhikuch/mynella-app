# Search Console — measurement checklist

Use the **same Google Search Console property** as your query export (typically URL prefix **`https://www.iamclearmind.com/`** or the domain property). Steps below require a browser login to Search Console; they are not automated in this repo.

---

## After each production deploy (within 24–48 hours)

Run **A** immediately. Run **B** the same day or the next business day once production is stable.

### A. Quick URL checks (terminal)

Expect **HTTP 200** for each path:

```bash
for path in "" "calculators/drawdown-recovery" "wealth-management-pune" "calculators" "sitemap.xml"; do
  code=$(curl -sS -o /dev/null -w "%{http_code}" -L "https://www.iamclearmind.com/${path}")
  echo "/${path} -> HTTP ${code}"
done
```

If any path fails, fix routing or deploy before relying on Search Console data.

### B. Google Search Console (manual)

1. **Performance → Search results**
   - Date range: **Last 7 days** (note impressions, clicks, average position, CTR).
   - Add filters **Query contains** (run separately or combine per UI):  
     `drawdown` · `recovery` · `stock loss` · `wealth management pune` · `finance companies pune`  
   - Compare to the **prior 7 days** (change date range) or keep a weekly spreadsheet.

2. **Performance → Pages**
   - Review rows for (full URLs as shown in GSC):
     - `/calculators/drawdown-recovery`
     - `/algo/what-is-algo-trading`
     - `/blog/tax-on-pms-returns`
     - `/blog/stock-loss-drawdown-recovery-guide`
     - `/blog/is-algo-trading-legal-india`
    - `/algo/pledge-plus-mini`
     - `/wealth-management-pune`
     - `/calculators`
     - `/about`
     - `/contact`
   - Flag sudden CTR or position drops (snippets, technical, or competition).

3. **Indexing → Pages**
   - Confirm **`/wealth-management-pune`** and other new URLs show **Indexed** where expected, or capture the status reason (e.g. crawled not indexed).

4. **URL Inspection** (top search bar)
  - Inspect `https://www.iamclearmind.com/wealth-management-pune` and `https://www.iamclearmind.com/algo/pledge-plus-mini` (and other new URLs if needed).
   - Use **Request indexing** only when the URL is new or materially changed — avoid abuse.

5. **Experience → Core Web Vitals**
   - **Mobile**: review **Largest Contentful Paint (LCP)** and any URL groups flagged.
   - After an LCP-related deploy has been live for several days, open the relevant issue group → **Validate fix** and allow up to **~28 days** for validation to complete.

---

## Weekly rhythm (weeks 1–8 after SEO / LCP changes)

Every week on the same weekday (~15–20 minutes):

- Repeat **B.1–B.5** (Performance queries + pages, Indexing, URL inspection if needed, CWV / LCP validation state).

## Success signals (directional)

- Tier 1 queries: average position moving toward **≤10** with stable or rising impressions.
- Drawdown calculator: **CTR** up on similar impressions (title/description match intent).
- Pune explainer: first **clicks** from local-intent queries within a few weeks.
- CWV: mobile LCP issue groups trend toward **passing** after fixes and validation.

## Iterate

- If impressions rise but CTR is flat: refresh title/meta and first-screen H1/lead in CMS (`pageCopy`) or code fallbacks.
- If position stalls: add internal links from guides/blog posts; expand FAQ to match exact question phrasing.
- If LCP validation fails: re-check Lighthouse on **home** and **drawdown recovery** in Chrome DevTools (mobile throttling), then adjust layout/fonts/hero paint path and redeploy.
