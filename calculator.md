# Clearmind Investment Calculators

Nine interactive tools for the `/calculators` hub. Each is a standalone Next.js page under `src/app/(site)/calculators/` with a matching component in `src/components/calculators/`.

All calculators are illustrative only — not investment advice, not product projections.

---

## 1. CAGR Calculator
**Route:** `/calculators/cagr`  
**Brief:** Enter start value, end value, and duration (years + optional months). Instantly outputs CAGR%, total return%, absolute gain/loss, and a Rule of 72 doubling insight.  
**UI:** Two-column split — inputs left, live result panel right. Big display number animates on change.  
**Status:** ✅ Built

---

## 2. 10 · 20 · 30 Growth Visualiser
**Route:** `/calculators/growth-visualiser`  
**Brief:** Same starting capital, same horizon, three compounding speeds (10%, 20%, 30% CAGR). Horizontal bar chart shows the divergence. Year-by-year table at key milestones. Horizon slider 5–40y.  
**UI:** Capital input + range slider for horizon. Animated horizontal bars. Summary table.  
**Status:** ✅ Built

---

## 3. Drawdown & Recovery
**Route:** `/calculators/drawdown-recovery`  
**Brief:** Input or slide a drawdown % (1–95%). Instantly shows the exact rebound % needed to break even. Highlights the brutal asymmetry: −30% needs +43%. Preset buttons for common drawdowns. Reference table.  
**UI:** Large negative number in red, large recovery number in green. Three-bar visualisation. Quick-reference table.  
**Status:** ✅ Built

---

## 4. Cost of Panic Selling
**Route:** `/calculators/panic-selling`  
**Brief:** Shows how missing the N best trading days in a multi-year period destroys compounding. Inputs: corpus, horizon, best days missed (slider 0–50). Uses a simplified model (~0.35% CAGR penalty per best day missed at 12% base).  
**UI:** Three result cards (stayed invested / missed days / cost). Comparative table for 0, 5, 10, 20, 30, 40, 50 missed days.  
**Status:** ✅ Built

---

## 5. Luxury Trap
**Route:** `/calculators/luxury-trap`  
**Brief:** Shows the opportunity cost of a large discretionary purchase. Input: purchase amount (presets: ₹5L, ₹15L, ₹30L, ₹50L, ₹1Cr), hypothetical CAGR, horizon. Output: what that money would be worth if invested instead. Strikethrough price-tag visual.  
**UI:** Preset chips, strikethrough-style "price tag" card, vertical bar timeline.  
**Status:** ✅ Built

---

## 6. Cost of Starting Late
**Route:** `/calculators/start-late`  
**Brief:** Compare SIP outcomes at retirement (age 60) for someone starting at 25, 30, 35, 40, 45. Same monthly SIP, same CAGR. Shows corpus, total invested, gains, and gap vs the earliest starter.  
**UI:** Stacked scenario cards with horizontal progress bars (width = fraction of best). Inputs: monthly SIP, CAGR slider.  
**Status:** ✅ Built

---

## 7. Fee Destroyer
**Route:** `/calculators/fee-destroyer`  
**Brief:** Show how annual fees (0–3%) erode long-term wealth. Inputs: corpus, gross CAGR, fee %, horizon. Three result cards (gross / net / fee cost). Fee comparison table at all fee levels.  
**Status:** ✅ Built

---

## 8. Minimum Ticket Checker
**Route:** `/calculators/min-ticket`  
**Brief:** Enter corpus → see which Clearmind mandates are accessible. All mandates shown with min ticket, description, category, and CTAs to product page + book call. Locked mandates show how much more is needed.  
**Mandates (indicative):** Polaris Lite (₹5L), Alpha 100/200 (₹5L), Quanto (₹10L), Optimus (₹15L), Pledge+ (₹20L), Polaris PMS (₹50L).  
**UI:** Quick-pick corpus buttons (₹5L…₹5Cr). Eligible mandate cards with green border. Locked cards with opacity + gap indicator.  
**Status:** ✅ Built

---

## 9. Risk Budget Sizer
**Route:** `/calculators/sleeve-sizer`  
**Brief:** Split corpus between a core sleeve and a tactical sleeve. Slider for tactical % (0–80%). Shows blended CAGR, vol, and max drawdown. Per-sleeve breakdown with 10-year FV. Simplified model with illustrative assumptions.  
**UI:** Two-tone horizontal bar (green = core, blue = tactical). Side-by-side sleeve cards. Blended result row.  
**Status:** ✅ Built

---

## Calculator Ideas (Future Builds)

The following were generated during ideation — may be built in a future sprint:

| Idea | One-line brief | Complexity |
|------|----------------|------------|
| Inflation-adjusted return | Real CAGR after CPI erosion | Low |
| Sequence-of-returns risk | Shows how bad timing of withdrawals destroys retirement | Medium |
| SIP vs lumpsum race | Who wins over 10/20/30y? | Low |
| Tax drag calculator | LTCG/STCG impact on compounding | Medium |
| Leverage ruin simulator | Shows how borrowed capital blows up on drawdowns | High |
| Goal-based SIP reverse | Target corpus → required monthly SIP | Low |
| Reinvestment vs withdrawal | Keep compounding vs draw income | Medium |
| Alpha needed to justify active fees | Active vs passive breakeven fee | Medium |
| Cognitive bias cost | Anchoring, overconfidence, recency — modelled scenarios | High |
| Options leverage trap | How theta decay and leverage combine to destroy capital | High |
