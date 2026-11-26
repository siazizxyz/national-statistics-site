// NusaStat router and controls. Hash routes, one page per section:
//
//   #/             overview
//   #/economy      economy
//   #/people       people
//   #/provinces    provinces (search, filter, sort)
//   #/about        about and sources
//
// The provinces table and the trade chart are live: searching, filtering,
// sorting and switching the trade view re-render from data.js, never from
// the network. window.__shotReady is false while a page renders and true
// once it is on screen, so a screenshot script knows when to capture.

import { barChart, groupedBars } from './charts.js';
import { PROVINCES, SERIES } from './data.js';
import {
  about, economy, missing, overview, provinceRow, provincesShell, top10Chart, people,
} from './views.js';

const app = document.getElementById('app');
const NAV = [
  ['#/', 'Overview'],
  ['#/economy', 'Economy'],
  ['#/people', 'People'],
  ['#/provinces', 'Provinces'],
  ['#/about', 'About'],
];

function navBar(current) {
  return `<nav class="site-nav" aria-label="Sections">${NAV.map(([href, label]) => `<a href="${href}"${href === current ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav>`;
}

// ---- provinces table state ----
const provState = { query: '', region: 'all', sort: 'pop', dir: -1 };

function filteredProvinces() {
  const q = provState.query.trim().toLowerCase();
  let rows = PROVINCES.filter((p) => (provState.region === 'all' || p.region === provState.region)
    && (!q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)));
  const key = provState.sort;
  const dir = provState.dir;
  rows = [...rows].sort((a, b) => {
    const av = key === 'density' ? a.pop / a.area : a[key];
    const bv = key === 'density' ? b.pop / b.area : b[key];
    if (typeof av === 'string') return dir * av.localeCompare(bv);
    return dir * (av - bv);
  });
  return rows;
}

function renderProvinceTable() {
  const body = document.getElementById('prov-body');
  const count = document.getElementById('prov-count');
  if (!body) return;
  const rows = filteredProvinces();
  body.innerHTML = rows.map(provinceRow).join('')
    || '<tr><td colspan="6">No province matches that search.</td></tr>';
  count.textContent = rows.length === PROVINCES.length
    ? `Showing all ${PROVINCES.length} provinces.`
    : `Showing ${rows.length} of ${PROVINCES.length} provinces.`;
}

function wireProvinces() {
  const search = document.getElementById('prov-search');
  if (!search) return;
  search.addEventListener('input', () => {
    provState.query = search.value;
    renderProvinceTable();
  });
  document.querySelectorAll('[data-region]').forEach((btn) => {
    btn.addEventListener('click', () => {
      provState.region = btn.dataset.region;
      document.querySelectorAll('[data-region]').forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      renderProvinceTable();
    });
  });
  document.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      if (provState.sort === key) provState.dir *= -1;
      else {
        provState.sort = key;
        provState.dir = key === 'name' || key === 'capital' || key === 'region' ? 1 : -1;
      }
      renderProvinceTable();
    });
  });
  const top10 = document.getElementById('top10-chart');
  if (top10) top10.innerHTML = top10Chart();
  renderProvinceTable();
}

// ---- economy trade chart ----
function renderTrade(mode) {
  const el = document.getElementById('trade-chart');
  if (!el) return;
  if (mode === 'balance') {
    const balance = SERIES.exports.data.map(([y, v], i) => [y, Math.round((v - SERIES.imports.data[i][1]) * 100) / 100]);
    el.innerHTML = barChart({ title: 'Trade balance', unit: 'US$ billion', source: SERIES.exports.source, data: balance });
  } else {
    el.innerHTML = groupedBars(SERIES.exports, SERIES.imports);
  }
}

function wireTrade() {
  const buttons = document.querySelectorAll('[data-trade]');
  if (!buttons.length) return;
  renderTrade('flows');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      renderTrade(btn.dataset.trade);
    });
  });
}

// ---- router ----
const ROUTES = {
  '#/': overview,
  '#/economy': economy,
  '#/people': people,
  '#/provinces': provincesShell,
  '#/about': about,
};

const TITLES = {
  '#/': 'NusaStat — Indonesia in Numbers',
  '#/economy': 'Economy | NusaStat',
  '#/people': 'People | NusaStat',
  '#/provinces': 'Provinces | NusaStat',
  '#/about': 'About & sources | NusaStat',
};

function render() {
  window.__shotReady = false;
  const hash = location.hash || '#/';
  const page = ROUTES[hash] || missing;
  const current = ROUTES[hash] ? hash : '#/';
  document.title = TITLES[current] || 'NusaStat — Indonesia in Numbers';
  app.innerHTML = navBar(current) + page();
  if (hash === '#/provinces') wireProvinces();
  if (hash === '#/economy') wireTrade();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
