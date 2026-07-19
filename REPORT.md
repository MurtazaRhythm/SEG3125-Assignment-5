# SEG3125 — Assignment 5 Report
## Bilingual Interactive Dashboard: Grocery Price Tracker

> Convert this to PDF for Brightspace submission. Fill in the ⬜ placeholders
> (name, student number, portfolio link) before submitting.

---

## 1. Designer

- **Name:** ⬜ (your full name)
- **Student number:** ⬜

---

## 2. Dashboard Goal + Data

**Goal:** Let a Canadian consumer explore how average retail grocery prices have
evolved over time and compare item prices in a given month.

- **Domain:** Food prices (grocery items in Canada).
- **Dataset:** Synthetic data generated with GenAI (Claude), modelled on
  Statistics Canada's *Monthly average retail prices for selected products*,
  Table 18-10-0245-01
  (https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810024501).
  8 grocery items × 18 months (Jan 2024 – Jun 2025) with realistic seasonal
  patterns (e.g., produce cheaper in summer, steady meat/egg inflation).
- **Modifications:** No data was copied directly; values were generated to
  imitate the magnitude and seasonality of the real StatCan table. As required
  by the assignment, **the dashboard displays a clearly visible "synthetic
  data" notice banner** in both languages.
- **Inspiration:** Statistics Canada food price portal
  (https://www.statcan.gc.ca/en/topics-start/food-price) — the example given in
  the assignment description.

---

## 3. Reflection / Design

### (A) Charts

| Chart | Type | What it shows | Why this type |
|---|---|---|---|
| Price trend over time | **Line chart** | Monthly price of up to 3 selected items over a chosen time range | Lines are the standard form for continuous change over time (NN/g); slope makes seasonal trends and inflation instantly visible |
| Price comparison by month | **Horizontal bar chart** | Average price of all 8 items in a selected month | Bars are best for comparing magnitudes across categories; horizontal orientation gives room for full item labels (important in French, where labels are longer) |

The two charts complement each other: the line chart answers *"how did the
price get here?"*, the bar chart answers *"what costs most right now?"*.

### (B) The 3Cs

- **Context:** Each chart has a heading phrased around the chart's purpose plus
  a one-sentence intro phrased as the question the chart answers ("How has the
  price of a grocery item changed month over month?"). The page has a global
  title and subtitle stating scope (Canada, Jan 2024–Jun 2025). Axis labels
  state the unit and the active currency.
- **Clutter-free:** No chartjunk — no 3D, no backgrounds, no dashed grids.
  Hairline horizontal-only gridlines; axis lines mostly removed; line chart
  shows no dot markers (dots appear only on hover); the line chart is capped at
  3 simultaneous series so it never becomes spaghetti; bar values are labelled
  directly at the bar tip so the eye doesn't ping-pong to the axis.
- **Contrast:** A colour-blind-safe categorical palette where **each item keeps
  a fixed colour** in every state (colour follows the entity, never its rank) —
  the selection chips carry the same swatch as the chart line, linking control
  to mark. The bar chart uses a single blue because it encodes one measure
  (price), and sorting by price carries the comparison. Text uses dark neutral
  ink; colour is reserved for data marks. The palette was validated with an
  automated checker for colour-vision-deficiency separation.

### (C) Layout, title, interactions

- **Layout:** Single page; header (title, subtitle, global controls), synthetic
  data notice, then two full-width chart cards, then a source footer. Cards on
  a slightly darker page plane create figure/ground separation; generous
  negative space between filter row and plot.
- **Interactions (≥1 per chart, plus one global):**
  - *Line chart:* (1) time-range selector (last 6 / last 12 / all 18 months);
    (2) item selection chips — pick up to 3 items to compare.
  - *Bar chart:* (1) month dropdown (any of the 18 months); (2) sort toggle
    (by price / by name).
  - *Global:* currency toggle (CAD / USD / EUR) recomputes both charts, and
    the language switcher.

### (D) Internationalization

- **Languages:** English + French (Canada's two official languages, matching
  the StatCan-style dataset). Translations produced with GenAI and checked
  against Statistics Canada's own French terminology (e.g. « Bœuf haché »,
  « la douzaine »).
- **Language selection:** A persistent two-button toggle in the header showing
  each language **in its own language** ("English" / "Français") — per the
  localization guidelines, no flags (flags represent countries, not languages)
  and the target language is never written in the current language.
- **Scope:** The entire site is bilingual (exceeds the one-chart minimum):
  chart titles, intros, axis titles, legends, tooltips, buttons, dropdowns,
  notices, and footer.
- **Localization beyond translation:**
  - *Dates:* month names via `Intl.DateTimeFormat` — "Jan 2024" vs
    « janv. 2024 ».
  - *Numbers/currency:* `Intl.NumberFormat` — "$5.49" vs « 5,49 $ » (symbol
    position and decimal comma change, not just words).
  - *Collation:* the bar chart's "sort by name" uses locale-aware
    `localeCompare`, so French accented names sort correctly.
  - All strings live in a **resource file** (`src/i18n.js`) keyed by language
    (done even though not mandatory).
- **Translation difficulties encountered:** French strings are ~20–30% longer
  ("Last 12 months" → « 12 derniers mois », item labels like « Poitrine de
  poulet (le kg) »). This influenced design: the bar chart is horizontal with a
  wide label gutter, chips wrap to a second row, and buttons size to content.
  French also required typographic care: apostrophes (’), « » spacing rules,
  and the ligature in « Bœuf » / « Œufs ».

---

## 4. High-fidelity Prototype

**Visual design choices:**

- **Colour theme:** One consistent neutral-warm theme (off-white page
  `#f9f9f7`, card surface `#fcfcfb`, near-black ink) with a single blue accent
  `#2a78d6` used for all active/selected states and the bar series —
  consistency between UI accent and data colour.
- **Typography:** System sans throughout; hierarchy by size/weight only
  (large tight-tracked h1 → card h2 → secondary-grey intro text) so headings
  attract attention without decorative fonts.
- **Layout / negative space:** Cards with ample padding; filters grouped in a
  single labelled row above each plot; max-width container keeps line lengths
  readable.
- **Contrast, scale, balance, hierarchy:** Data marks are the most saturated
  elements on the page; grids are hairlines; footer sources are smallest and
  lightest. Titles → intro → controls → chart forms a consistent top-down
  reading order in both cards.
- **Gestalt:** *Proximity* (each filter label sits with its control; filters
  belong to their card), *similarity* (chip swatch colour = line colour;
  identical card styling signals identical structure), *figure/ground* (white
  cards on darker plane), *continuity* (smooth monotone line interpolation).
- **Usability heuristics:** Visibility of system status (active
  language/range/sort states are highlighted; chips disable with reduced
  opacity when the 3-item limit is reached, with the limit stated up front);
  match to real world (grocery items with everyday units); user control
  (everything reversible, one click); consistency (one accent colour, one
  control style); error prevention (can't deselect the last item, can't exceed
  3); recognition over recall (all options visible; hover tooltips give exact
  values); aesthetic & minimalist design (3Cs above).

**Links:**

- **Live dashboard:** https://murtazarhythm.github.io/SEG3125-Assignment-5/
- **Portfolio:** ⬜ (link to your portfolio page that links to the dashboard)

---

## 5. Code

- **GitHub:** https://github.com/MurtazaRhythm/SEG3125-Assignment-5

---

## 6. Generative AI Acknowledgement

- **Tool:** Claude Code (Anthropic, Claude Fable 5 model).
- **Prototype:** I provided the assignment requirements to Claude Code, which
  read the assignment PDF, proposed the domain/chart/interaction choices, and
  generated the React + Vite + Recharts implementation, the synthetic dataset,
  the EN/FR string resource file, and the GitHub Pages deployment workflow. It
  validated the chart palette with an automated colour-vision-deficiency
  checker and verified both language versions with rendered screenshots. I
  reviewed the design choices, tested the deployed site, and made the final
  decisions on scope.
- **Translations:** French strings were produced by the GenAI model and
  reviewed against Statistics Canada terminology.
- **Report:** Claude Code drafted this report from its design decisions; I
  edited and verified the content before submission.

---

*Note for me (not part of report): dashboard shows synthetic data, register for
the group review before midnight, and update portfolio images for all 4
projects (worth 10 pts).*
