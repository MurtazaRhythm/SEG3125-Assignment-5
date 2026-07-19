// Synthetic monthly average retail grocery prices (CAD), modelled on
// Statistics Canada Table 18-10-0245-01 "Monthly average retail prices for
// selected products". Values are illustrative, NOT official statistics.

// Months: Jan 2024 .. Jun 2025 (18 months), ISO "YYYY-MM"
export const MONTHS = [
  '2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06',
  '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12',
  '2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06',
]

// Each item keeps a FIXED color slot (color follows the entity, never rank).
export const ITEMS = [
  { id: 'tomatoes',  color: '#2a78d6', prices: [5.49, 5.62, 5.38, 5.10, 4.85, 4.52, 4.30, 4.21, 4.44, 4.78, 5.15, 5.58, 5.81, 5.95, 5.66, 5.24, 4.92, 4.61] },
  { id: 'broccoli',  color: '#008300', prices: [3.89, 4.05, 3.92, 3.71, 3.48, 3.30, 3.22, 3.19, 3.35, 3.60, 3.88, 4.12, 4.28, 4.35, 4.10, 3.85, 3.62, 3.44] },
  { id: 'cucumber',  color: '#e87ba4', prices: [2.19, 2.28, 2.15, 1.99, 1.86, 1.75, 1.69, 1.66, 1.78, 1.92, 2.10, 2.25, 2.38, 2.45, 2.29, 2.12, 1.95, 1.82] },
  { id: 'apples',    color: '#eda100', prices: [4.85, 4.92, 4.99, 5.05, 5.12, 5.20, 5.14, 4.95, 4.72, 4.60, 4.66, 4.74, 4.88, 4.96, 5.05, 5.15, 5.22, 5.28] },
  { id: 'chicken',   color: '#1baf7a', prices: [13.45, 13.60, 13.72, 13.85, 14.02, 14.18, 14.25, 14.31, 14.40, 14.52, 14.68, 14.85, 15.02, 15.18, 15.30, 15.41, 15.55, 15.70] },
  { id: 'beef',      color: '#eb6834', prices: [11.80, 11.95, 12.10, 12.28, 12.45, 12.66, 12.80, 12.95, 13.12, 13.35, 13.58, 13.80, 14.05, 14.28, 14.50, 14.72, 14.90, 15.10] },
  { id: 'milk',      color: '#4a3aa7', prices: [4.62, 4.62, 4.65, 4.65, 4.68, 4.68, 4.70, 4.70, 4.72, 4.75, 4.75, 4.78, 4.82, 4.82, 4.85, 4.85, 4.88, 4.88] },
  { id: 'eggs',      color: '#e34948', prices: [4.15, 4.22, 4.30, 4.38, 4.45, 4.55, 4.62, 4.70, 4.82, 4.95, 5.10, 5.28, 5.45, 5.60, 5.72, 5.80, 5.88, 5.95] },
]

// Fixed illustrative conversion rates from CAD (not live market rates)
export const CURRENCIES = {
  CAD: { rate: 1 },
  USD: { rate: 0.73 },
  EUR: { rate: 0.68 },
}
