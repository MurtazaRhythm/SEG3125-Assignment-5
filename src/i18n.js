// Resource file for internationalization. All user-facing strings live here.
export const STRINGS = {
  en: {
    locale: 'en-CA',
    appTitle: 'Grocery Price Tracker',
    appSubtitle:
      'Average retail grocery prices in Canada, January 2024 to June 2025. Use the controls to explore price trends over time and compare items in a given month.',
    syntheticNotice:
      'Synthetic data — values are modelled on Statistics Canada food price tables for demonstration purposes and are not official statistics.',
    currencyLabel: 'Currency',
    trendTitle: 'Price trend over time',
    trendIntro:
      'How has the price of a grocery item changed month over month? Select up to three items to compare their trends.',
    trendRangeLabel: 'Time range',
    ranges: { m6: 'Last 6 months', m12: 'Last 12 months', all: 'All 18 months' },
    itemsLabel: 'Items shown',
    maxItemsHint: 'Up to 3 items',
    compareTitle: 'Price comparison by month',
    compareIntro:
      'Which items cost the most in a given month? Pick a month to compare average prices across all items.',
    monthLabel: 'Month',
    sortLabel: 'Sort',
    sortPrice: 'By price',
    sortName: 'By name',
    axisPrice: (cur) => `Average price (${cur})`,
    perUnit: 'per unit shown',
    items: {
      tomatoes: 'Tomatoes (per kg)',
      broccoli: 'Broccoli (each)',
      cucumber: 'Cucumber (each)',
      apples: 'Apples (per kg)',
      chicken: 'Chicken breast (per kg)',
      beef: 'Ground beef (per kg)',
      milk: 'Milk (2 L)',
      eggs: 'Eggs (dozen)',
    },
    footerSource:
      'Data: synthetic, modelled on Statistics Canada Table 18-10-0245-01. Exchange rates are fixed illustrative values.',
    footerCourse: 'SEG3125 Assignment 5 — Bilingual Interactive Dashboard',
  },
  fr: {
    locale: 'fr-CA',
    appTitle: 'Suivi des prix alimentaires',
    appSubtitle:
      'Prix de détail moyens des produits alimentaires au Canada, de janvier 2024 à juin 2025. Utilisez les commandes pour explorer l’évolution des prix et comparer les produits pour un mois donné.',
    syntheticNotice:
      'Données synthétiques — les valeurs sont modélisées d’après les tableaux de prix des aliments de Statistique Canada à des fins de démonstration et ne constituent pas des statistiques officielles.',
    currencyLabel: 'Devise',
    trendTitle: 'Évolution des prix dans le temps',
    trendIntro:
      'Comment le prix d’un produit alimentaire a-t-il évolué de mois en mois? Sélectionnez jusqu’à trois produits pour comparer leurs tendances.',
    trendRangeLabel: 'Période',
    ranges: { m6: '6 derniers mois', m12: '12 derniers mois', all: 'Les 18 mois' },
    itemsLabel: 'Produits affichés',
    maxItemsHint: 'Maximum de 3 produits',
    compareTitle: 'Comparaison des prix par mois',
    compareIntro:
      'Quels produits coûtent le plus cher pour un mois donné? Choisissez un mois pour comparer les prix moyens de tous les produits.',
    monthLabel: 'Mois',
    sortLabel: 'Tri',
    sortPrice: 'Par prix',
    sortName: 'Par nom',
    axisPrice: (cur) => `Prix moyen (${cur})`,
    perUnit: 'par unité indiquée',
    items: {
      tomatoes: 'Tomates (le kg)',
      broccoli: 'Brocoli (l’unité)',
      cucumber: 'Concombre (l’unité)',
      apples: 'Pommes (le kg)',
      chicken: 'Poitrine de poulet (le kg)',
      beef: 'Bœuf haché (le kg)',
      milk: 'Lait (2 L)',
      eggs: 'Œufs (la douzaine)',
    },
    footerSource:
      'Données : synthétiques, modélisées d’après le tableau 18-10-0245-01 de Statistique Canada. Les taux de change sont des valeurs fixes à titre indicatif.',
    footerCourse: 'SEG3125 Devoir 5 — Tableau de bord interactif bilingue',
  },
}

// Localized month label from ISO "YYYY-MM" (e.g. "Jan 2024" / "janv. 2024")
export function formatMonth(iso, locale, style = 'short') {
  const [y, m] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat(locale, {
    month: style,
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(y, m - 1, 1)))
}

// Localized currency formatting ($5.49 vs 5,49 $)
export function formatPrice(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
