# SEG3125 Assignment 5 — Bilingual Interactive Dashboard

**Grocery Price Tracker / Suivi des prix alimentaires**

A bilingual (English/French) interactive dashboard visualizing synthetic monthly
average retail grocery prices in Canada, modelled on Statistics Canada
Table 18-10-0245-01.

**Live site:** https://murtazarhythm.github.io/SEG3125-Assignment-5/
(French version: https://murtazarhythm.github.io/SEG3125-Assignment-5/?lang=fr)

## Features

- **Line chart** — price trend over time for up to 3 selected items, with a
  6/12/18-month time-range selector
- **Bar chart** — price comparison across all 8 items for a chosen month, with
  price/name sorting
- **Global currency toggle** (CAD / USD / EUR, fixed illustrative rates)
- **Full EN/FR localization** — all UI text, chart axes, legends, tooltips,
  month names, and currency formats via `Intl` APIs and a string resource file

## Tech stack

React 18 + Vite + Recharts. Deployed on GitHub Pages via GitHub Actions.

## Running locally

```
npm install
npm run dev
```
