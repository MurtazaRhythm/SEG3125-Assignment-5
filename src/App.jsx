import { useMemo, useState } from 'react'
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList,
} from 'recharts'
import { MONTHS, ITEMS, CURRENCIES } from './data.js'
import { STRINGS, formatMonth, formatPrice } from './i18n.js'

const RANGES = { m6: 6, m12: 12, all: MONTHS.length }
const MAX_TREND_ITEMS = 3

export default function App() {
  const [lang, setLang] = useState(() =>
    new URLSearchParams(window.location.search).get('lang') === 'fr' ? 'fr' : 'en')
  const [currency, setCurrency] = useState('CAD')
  const [range, setRange] = useState('m12')
  const [trendItems, setTrendItems] = useState(['tomatoes', 'broccoli', 'cucumber'])
  const [barMonth, setBarMonth] = useState(MONTHS[MONTHS.length - 1])
  const [sortMode, setSortMode] = useState('price')

  const t = STRINGS[lang]
  const rate = CURRENCIES[currency].rate
  document.documentElement.lang = lang

  const trendData = useMemo(() => {
    const start = MONTHS.length - RANGES[range]
    return MONTHS.slice(start).map((iso, i) => {
      const row = { month: formatMonth(iso, t.locale) }
      for (const item of ITEMS) {
        if (trendItems.includes(item.id)) {
          row[item.id] = +(item.prices[start + i] * rate).toFixed(2)
        }
      }
      return row
    })
  }, [range, trendItems, rate, t.locale])

  const barData = useMemo(() => {
    const mi = MONTHS.indexOf(barMonth)
    const rows = ITEMS.map((item) => ({
      id: item.id,
      name: t.items[item.id],
      color: item.color,
      price: +(item.prices[mi] * rate).toFixed(2),
    }))
    rows.sort(sortMode === 'price'
      ? (a, b) => b.price - a.price
      : (a, b) => a.name.localeCompare(b.name, t.locale))
    return rows
  }, [barMonth, rate, sortMode, t])

  function toggleTrendItem(id) {
    setTrendItems((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((x) => x !== id) : prev
      }
      return prev.length < MAX_TREND_ITEMS ? [...prev, id] : prev
    })
  }

  const fmt = (v) => formatPrice(v, t.locale, currency)

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <div>
            <h1>{t.appTitle}</h1>
            <p className="subtitle">{t.appSubtitle}</p>
          </div>
          <div className="global-controls">
            <div className="lang-switch" role="group" aria-label="Language / Langue">
              <button lang="en"
                className={lang === 'en' ? 'seg active' : 'seg'}
                aria-pressed={lang === 'en'}
                onClick={() => setLang('en')}>English</button>
              <button lang="fr"
                className={lang === 'fr' ? 'seg active' : 'seg'}
                aria-pressed={lang === 'fr'}
                onClick={() => setLang('fr')}>Français</button>
            </div>
            <label className="control">
              <span>{t.currencyLabel}</span>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {Object.keys(CURRENCIES).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
          </div>
        </div>
        <p className="synthetic-notice">⚠️ {t.syntheticNotice}</p>
      </header>

      <main className="grid">
        <section className="card" aria-labelledby="trend-title">
          <h2 id="trend-title">{t.trendTitle}</h2>
          <p className="intro">{t.trendIntro}</p>

          <div className="filters">
            <div className="control">
              <span>{t.trendRangeLabel}</span>
              <div className="seg-group" role="group" aria-label={t.trendRangeLabel}>
                {Object.keys(RANGES).map((r) => (
                  <button key={r}
                    className={range === r ? 'seg active' : 'seg'}
                    aria-pressed={range === r}
                    onClick={() => setRange(r)}>{t.ranges[r]}</button>
                ))}
              </div>
            </div>
            <div className="control">
              <span>{t.itemsLabel} <em className="hint">({t.maxItemsHint})</em></span>
              <div className="chips">
                {ITEMS.map((item) => {
                  const on = trendItems.includes(item.id)
                  const full = !on && trendItems.length >= MAX_TREND_ITEMS
                  return (
                    <button key={item.id}
                      className={on ? 'chip active' : 'chip'}
                      aria-pressed={on}
                      disabled={full}
                      onClick={() => toggleTrendItem(item.id)}>
                      <span className="swatch" style={{ background: item.color }} />
                      {t.items[item.id]}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={trendData} margin={{ top: 12, right: 24, left: 8, bottom: 4 }}>
              <CartesianGrid stroke="#e1e0d9" strokeWidth={1} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#898781', fontSize: 12 }}
                tickLine={false} axisLine={{ stroke: '#c3c2b7' }} />
              <YAxis tick={{ fill: '#898781', fontSize: 12 }} tickLine={false}
                axisLine={false} tickFormatter={fmt}
                label={{ value: t.axisPrice(currency), angle: -90, position: 'insideLeft', offset: -2, style: { fill: '#52514e', fontSize: 12 } }}
                width={86} />
              <Tooltip formatter={(v, key) => [fmt(v), t.items[key]]}
                contentStyle={{ borderRadius: 8, border: '1px solid #e1e0d9', fontSize: 13 }} />
              <Legend formatter={(key) => <span style={{ color: '#52514e', fontSize: 13 }}>{t.items[key]}</span>} />
              {ITEMS.filter((i) => trendItems.includes(i.id)).map((item) => (
                <Line key={item.id} type="monotone" dataKey={item.id}
                  isAnimationActive={false}
                  stroke={item.color} strokeWidth={2} strokeLinecap="round"
                  dot={false} activeDot={{ r: 5, stroke: '#fcfcfb', strokeWidth: 2 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </section>

        <section className="card" aria-labelledby="compare-title">
          <h2 id="compare-title">{t.compareTitle}</h2>
          <p className="intro">{t.compareIntro}</p>

          <div className="filters">
            <label className="control">
              <span>{t.monthLabel}</span>
              <select value={barMonth} onChange={(e) => setBarMonth(e.target.value)}>
                {MONTHS.map((iso) => (
                  <option key={iso} value={iso}>{formatMonth(iso, t.locale, 'long')}</option>
                ))}
              </select>
            </label>
            <div className="control">
              <span>{t.sortLabel}</span>
              <div className="seg-group" role="group" aria-label={t.sortLabel}>
                <button className={sortMode === 'price' ? 'seg active' : 'seg'}
                  aria-pressed={sortMode === 'price'}
                  onClick={() => setSortMode('price')}>{t.sortPrice}</button>
                <button className={sortMode === 'name' ? 'seg active' : 'seg'}
                  aria-pressed={sortMode === 'name'}
                  onClick={() => setSortMode('name')}>{t.sortName}</button>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={barData} layout="vertical"
              margin={{ top: 4, right: 64, left: 8, bottom: 4 }}>
              <CartesianGrid stroke="#e1e0d9" strokeWidth={1} horizontal={false} />
              <XAxis type="number" tick={{ fill: '#898781', fontSize: 12 }}
                tickLine={false} axisLine={{ stroke: '#c3c2b7' }} tickFormatter={fmt} />
              <YAxis type="category" dataKey="name" width={170}
                tick={{ fill: '#52514e', fontSize: 12.5 }} tickLine={false} axisLine={false} />
              <Tooltip formatter={(v) => [fmt(v), t.axisPrice(currency)]}
                contentStyle={{ borderRadius: 8, border: '1px solid #e1e0d9', fontSize: 13 }} />
              <Bar dataKey="price" fill="#2a78d6" barSize={18} radius={[0, 4, 4, 0]}
                isAnimationActive={false}>
                <LabelList dataKey="price" position="right"
                  formatter={fmt} style={{ fill: '#52514e', fontSize: 12 }} />
                {barData.map((row) => <Cell key={row.id} fill="#2a78d6" />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>
      </main>

      <footer>
        <p>{t.footerSource}</p>
        <p>{t.footerCourse}</p>
      </footer>
    </div>
  )
}
