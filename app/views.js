// Page templates for NusaStat. Every value is escaped before it goes into the
// page, and every figure comes from data.js with its source and year shown
// beside it. Charts are drawn by charts.js from the same figures.

import { barChart, lineChart, rankBars } from './charts.js';
import {
  AGE, DEVELOPMENT, HEADLINES, META, PROVINCES, REGIONS, SERIES, SOURCES, TRADE_2024, UPDATE_2025,
} from './data.js';

export const escape = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const fmtInt = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const fmtMillions = (n) => `${(n / 1000000).toFixed(2).replace(/\.00$/, '')} million`;

function sourceLine(source, year) {
  return `<p class="source">Source: ${escape(source)}${year ? `, ${year}` : ''}.</p>`;
}

function kpiCard(k) {
  return `<article class="kpi">
    <p class="kpi-label">${escape(k.label)}</p>
    <p class="kpi-value">${escape(k.value)}</p>
    <p class="kpi-detail">${escape(k.detail)}</p>
    <p class="kpi-source">${escape(k.source)}, ${k.year}</p>
  </article>`;
}

function chartCard(title, unit, chartSvg, source, year) {
  return `<section class="card chart-card">
    <h2>${escape(title)}</h2>
    <p class="unit">${escape(unit)}</p>
    <div class="chart">${chartSvg}</div>
    ${sourceLine(source, year)}
  </section>`;
}

function statRow(label, value, detail) {
  return `<div class="stat-row"><span>${escape(label)}</span><strong>${escape(value)}</strong><em>${escape(detail)}</em></div>`;
}

export function overview() {
  const kpis = HEADLINES.map(kpiCard).join('');
  const updates = UPDATE_2025.map((u) => `<li><strong>${escape(u.value)}</strong> ${escape(u.label)} <span>(${escape(u.source)})</span></li>`).join('');
  const top5 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 5);
  const topRows = top5.map((p, i) => `<tr><td>${i + 1}</td><td><a href="#/provinces">${escape(p.name)}</a></td><td>${fmtMillions(p.pop)}</td><td>${escape(p.region)}</td></tr>`).join('');
  return `
  <section class="hero">
    <p class="eyebrow">Indonesia &middot; Reference year 2024</p>
    <h1>Indonesia in numbers</h1>
    <p class="lede">The people, the economy and the provinces of the world&rsquo;s fourth most
    populous country &mdash; every figure sourced, every chart drawn from the
    official record. No estimates, no placeholders.</p>
    <p class="hero-meta">38 provinces &middot; 17,000+ islands &middot; Capital Jakarta &middot;
    Currency rupiah (IDR) &middot; Last updated ${escape(META.lastUpdated)}</p>
    <nav class="hero-links" aria-label="Sections">
      <a href="#/economy">Economy</a>
      <a href="#/people">People</a>
      <a href="#/provinces">Provinces</a>
      <a href="#/about">Sources &amp; methods</a>
    </nav>
  </section>

  <section class="kpi-grid" aria-label="Headline indicators">${kpis}</section>

  <section class="card update-strip">
    <h2>Already in: 2025 in brief</h2>
    <ul class="updates">${updates}</ul>
    <p class="source">Full 2025 figures arrive as BPS and the World Bank publish them; the
    2024 series below stays the reference year until then.</p>
  </section>

  <div class="chart-grid">
    ${chartCard('Real GDP growth', SERIES.gdpGrowth.unit, barChart(SERIES.gdpGrowth), SERIES.gdpGrowth.source)}
    ${chartCard('Population', SERIES.population.unit, lineChart(SERIES.population), SERIES.population.source)}
  </div>

  <section class="card">
    <h2>Where Indonesia lives</h2>
    <p>More than half the country &mdash; 158.1 million people, 55.4% &mdash; lives on
    Java, an island smaller than England. The five largest provinces alone hold
    143.4 million people.</p>
    <table class="data-table">
      <thead><tr><th>#</th><th>Province</th><th>Population (mid-2025)</th><th>Island group</th></tr></thead>
      <tbody>${topRows}</tbody>
    </table>
    <p><a class="button" href="#/provinces">See all 38 provinces &rarr;</a></p>
    ${sourceLine('BPS — Statistics Indonesia, mid-2025 estimates', 2025)}
  </section>`;
}

export function economy() {
  const balance = SERIES.exports.data.map(([y, v], i) => [y, Math.round((v - SERIES.imports.data[i][1]) * 100) / 100]);
  const tradeSeries = { title: 'Goods trade', unit: 'US$ billion', source: TRADE_2024.source, data: balance };
  return `
  <p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>Economy</h1>
  <p class="lede">Southeast Asia&rsquo;s largest economy: US$1.40 trillion in 2024, the 16th
  largest in the world, growing just over 5% a year.</p>

  <section class="kpi-grid kpi-4" aria-label="Economy indicators">
    ${kpiCard({ label: 'GDP (nominal)', value: 'US$1.40 trillion', detail: 'Rank 16 of 193 countries', source: 'World Bank', year: 2024 })}
    ${kpiCard({ label: 'GDP per capita', value: 'US$4,925', detail: 'Up from US$3,854 in 2020', source: 'World Bank', year: 2024 })}
    ${kpiCard({ label: 'GDP (PPP)', value: 'US$4.67 trillion', detail: 'Purchasing power parity basis', source: 'World Bank', year: 2024 })}
    ${kpiCard({ label: 'GDP growth', value: '5.03%', detail: '2024; 5.11% in 2025', source: 'BPS — Statistics Indonesia', year: 2024 })}
  </section>

  <div class="chart-grid">
    ${chartCard('Real GDP growth', SERIES.gdpGrowth.unit, barChart(SERIES.gdpGrowth), SERIES.gdpGrowth.source)}
    ${chartCard('GDP per capita', SERIES.gdpPerCapita.unit, lineChart(SERIES.gdpPerCapita), SERIES.gdpPerCapita.source)}
  </div>

  <section class="card">
    <h2>Trade in goods</h2>
    <p>In 2024 Indonesia exported US$264.70 billion of goods and imported
    US$233.66 billion &mdash; a surplus of US$31.04 billion, the fifth year in a
    row the goods balance stayed in surplus. Exports rose 2.29% on 2023 and
    imports 5.31%.</p>
    <div class="toggle" role="group" aria-label="Trade chart">
      <button type="button" data-trade="flows" class="active" aria-pressed="true">Exports &amp; imports</button>
      <button type="button" data-trade="balance" aria-pressed="false">Trade balance</button>
    </div>
    <div class="chart" id="trade-chart">${barChart(SERIES.exports)}</div>
    ${sourceLine(TRADE_2024.source, 2024)}
  </section>

  <div class="chart-grid">
    ${chartCard('Inflation, consumer prices (annual average)', SERIES.inflation.unit, lineChart(SERIES.inflation), SERIES.inflation.source)}
    ${chartCard('Inflation in December', SERIES.inflationDec.unit, barChart(SERIES.inflationDec), SERIES.inflationDec.source)}
  </div>

  <section class="card">
    <h2>Reading the prices</h2>
    <p>Annual-average inflation fell to 2.18% in 2024, inside Bank Indonesia&rsquo;s
    2.5% &plusmn; 1% target band, and December year-on-year inflation was 1.57%
    &mdash; the lowest December reading since the current CPI base year began.
    The 2022 spike to 5.51% followed the September 2022 fuel-price rise; by
    2024 food, beverages and tobacco were the main upward pressure, at 1.90%
    in December.</p>
    <p>One rupiah bought about US$0.000063 in 2024: the average exchange rate
    was IDR 15,855 per US dollar.</p>
    ${sourceLine('BPS — Statistics Indonesia; World Bank; CIA World Factbook', 2024)}
  </section>`;
}

export function people() {
  const ageBars = AGE.groups.map((g) => {
    const width = Math.round(g.share * 10);
    return `<div class="age-row"><span>${escape(g.label)}</span>
      <div class="age-bar"><div style="width:${width}%"></div></div>
      <strong>${g.share}%</strong></div>`;
  }).join('');
  const devCards = DEVELOPMENT.map((d) => `<article class="kpi">
    <p class="kpi-label">${escape(d.label)}</p>
    <p class="kpi-value">${escape(d.value)}</p>
    <p class="kpi-detail">${escape(d.detail)}</p>
    <p class="kpi-source">${escape(d.source)}, ${d.year}</p>
  </article>`).join('');
  return `
  <p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>People</h1>
  <p class="lede">283.5 million people in 2024 &mdash; young, increasingly urban, and living
  longer than a generation ago.</p>

  <section class="kpi-grid kpi-4" aria-label="People indicators">${devCards}</section>

  <div class="chart-grid">
    ${chartCard('Population', SERIES.population.unit, lineChart(SERIES.population), SERIES.population.source)}
    ${chartCard('Life expectancy at birth', SERIES.lifeExpectancy.unit, lineChart(SERIES.lifeExpectancy), SERIES.lifeExpectancy.source)}
  </div>

  <section class="card">
    <h2>How old is Indonesia?</h2>
    <p>The median Indonesian was 30.1 years old in 2024, and women had on
    average 2.11 children &mdash; just above replacement level. The dip in life
    expectancy in 2020&ndash;2021 is the COVID-19 pandemic; by 2024 it stood at
    71.3 years, above its 2019 level.</p>
    <div class="age-bars">${ageBars}</div>
    ${sourceLine(AGE.source, AGE.year)}
  </section>

  <div class="chart-grid">
    ${chartCard('Urban population', SERIES.urban.unit, lineChart(SERIES.urban), SERIES.urban.source)}
    ${chartCard('Open unemployment rate', SERIES.unemployment.unit, barChart(SERIES.unemployment), SERIES.unemployment.source)}
  </div>

  <section class="card">
    <h2>Work and welfare</h2>
    <p>Unemployment fell for a fourth straight year to 4.91% in August 2024
    &mdash; 7.47 million people out of a labour force of 152.11 million &mdash; and
    to 4.85% in August 2025. Poverty fell to 8.57% in September 2024, or 24.06
    million people, the lowest rate since BPS began publishing poverty figures
    in 1960. The poverty line that month was IDR 595,242 per person per month
    (about US$36.50); 6.66% of urban residents and 11.34% of rural residents
    lived below it.</p>
    ${sourceLine('BPS — Statistics Indonesia', 2024)}
  </section>

  <section class="card">
    <h2>Poverty rate</h2>
    <div class="chart">${barChart(SERIES.poverty)}</div>
    ${sourceLine(SERIES.poverty.source)}
  </section>`;
}

export function provincesShell() {
  return `
  <p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>Provinces</h1>
  <p class="lede">All 38 provinces, mid-2025 estimates. Search by name, filter by island
  group, or sort any column &mdash; the table updates as you type.</p>

  <section class="card">
    <div class="controls">
      <label>Search <input id="prov-search" type="search" placeholder="Type a province or capital&hellip;" autocomplete="off"></label>
      <div class="filters" role="group" aria-label="Filter by island group">
        <button type="button" data-region="all" class="active" aria-pressed="true">All</button>
        <button type="button" data-region="Java" aria-pressed="false">Java</button>
        <button type="button" data-region="Sumatra" aria-pressed="false">Sumatra</button>
        <button type="button" data-region="Kalimantan" aria-pressed="false">Kalimantan</button>
        <button type="button" data-region="Sulawesi" aria-pressed="false">Sulawesi</button>
        <button type="button" data-region="Nusa Tenggara" aria-pressed="false">Nusa Tenggara</button>
        <button type="button" data-region="Maluku" aria-pressed="false">Maluku</button>
        <button type="button" data-region="Papua" aria-pressed="false">Papua</button>
      </div>
    </div>
    <p id="prov-count" class="count" aria-live="polite"></p>
    <div class="table-wrap">
      <table class="data-table sortable">
        <thead><tr>
          <th><button type="button" data-sort="name">Province</button></th>
          <th><button type="button" data-sort="capital">Capital</button></th>
          <th><button type="button" data-sort="region">Island group</button></th>
          <th><button type="button" data-sort="area">Area (km&sup2;)</button></th>
          <th><button type="button" data-sort="pop">Population</button></th>
          <th><button type="button" data-sort="density">Density /km&sup2;</button></th>
        </tr></thead>
        <tbody id="prov-body"></tbody>
      </table>
    </div>
    ${sourceLine('BPS — Statistics Indonesia, mid-2025 estimates (via Provinces of Indonesia)', 2025)}
  </section>

  <section class="card">
    <h2>The ten largest provinces</h2>
    <div class="chart" id="top10-chart"></div>
    ${sourceLine('BPS — Statistics Indonesia, mid-2025 estimates', 2025)}
  </section>

  <section class="card">
    <h2>By island group</h2>
    ${REGIONS.map((r) => statRow(r.name, fmtMillions(r.pop), r.note)).join('')}
    ${sourceLine('BPS — Statistics Indonesia, mid-2025', 2025)}
  </section>`;
}

export function provinceRow(p) {
  const density = Math.round(p.pop / p.area);
  return `<tr><td>${escape(p.name)}</td><td>${escape(p.capital)}</td><td>${escape(p.region)}</td>
    <td>${fmtInt(p.area)}</td><td>${fmtInt(p.pop)}</td><td>${fmtInt(density)}</td></tr>`;
}

export function top10Chart() {
  const rows = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10).map((p) => ({
    label: p.name, value: p.pop, text: (p.pop / 1000000).toFixed(1),
  }));
  return rankBars(rows, { height: 300 });
}

export function about() {
  const sources = SOURCES.map((s) => `<tr><td>${escape(s.name)}</td><td>${escape(s.url)}</td><td>${escape(s.what)}</td></tr>`).join('');
  return `
  <p class="crumb"><a href="#/">&larr; Overview</a></p>
  <h1>About &amp; sources</h1>
  <p class="lede">NusaStat is an independent compilation of Indonesia&rsquo;s official
  statistics, built to answer the questions people actually ask &mdash; how many
  of us are there, how is the economy doing, where do we live &mdash; with the
  figure, the year and the source next to it.</p>

  <section class="card">
    <h2>How this site was made</h2>
    <p>Every figure on this site was taken from a published release by
    BPS &mdash; Statistics Indonesia, the World Bank&rsquo;s World Development
    Indicators, the UNDP Human Development Report or the United Nations
    population division, and checked on 26 November 2026. Where sources
    disagree &mdash; the census-based population and the UN estimate differ by a
    couple of million &mdash; the site says which one it uses. Nothing is
    estimated by us: a year with no published figure is left out of its
    chart rather than filled in. The reference year is 2024, the latest year
    with a complete set of releases; verified 2025 figures appear in the
    &ldquo;2025 in brief&rdquo; strip on the overview.</p>
    <p>The site is a set of static files. It loads nothing from the network:
    every chart is drawn in the browser from the figures stored in the site
    itself, and it works the same on a phone as on a desktop.</p>
  </section>

  <section class="card">
    <h2>Sources</h2>
    <div class="table-wrap">
      <table class="data-table">
        <thead><tr><th>Publisher</th><th>Site</th><th>Used for</th></tr></thead>
        <tbody>${sources}</tbody>
      </table>
    </div>
  </section>

  <section class="card">
    <h2>A note on the numbers</h2>
    <p>Indonesia counts its people two ways. BPS runs the census every ten
    years and publishes projections in between (281.6 million at the end of
    2024); the United Nations&rsquo; World Population Prospects puts the 2024
    mid-year population at 283.5 million. This site uses the UN figure for
    its headline population, because it is the series the World Bank
    publishes, and BPS figures for the provinces. Poverty is measured
    against a national line set province by province (IDR 595,242 per person
    per month in September 2024), not the World Bank&rsquo;s global lines &mdash;
    the two answer different questions.</p>
    <p>NusaStat is not affiliated with BPS, the World Bank, UNDP or the
    Government of Indonesia. Figures are reproduced for information; for
    policy or legal use, consult the publisher&rsquo;s own release.</p>
  </section>`;
}

export function missing() {
  return `<h1>Page not found</h1>
  <p>There is no section at this address. <a href="#/">Back to the overview</a>.</p>`;
}
