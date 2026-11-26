// Small SVG chart builders for NusaStat. No library: every chart is drawn from
// the figures in data.js, so the site stays light and works offline.
//
// barChart(series, opts) — vertical bars, one per year, value labels on top.
// lineChart(series, opts) — a line with dots and value labels.
// Both return an SVG string sized to their container by viewBox.

const INK = '#1d2f42';
const GRID = '#e3ddd2';
const RED = '#b3202e';
const TEAL = '#0e6b6b';
const GOLD = '#c8932a';

function niceMax(values) {
  const max = Math.max(...values.map(Math.abs));
  if (max <= 0) return 1;
  const step = 10 ** Math.floor(Math.log10(max));
  return Math.ceil(max / step) * step;
}

function fmt(v) {
  if (Number.isInteger(v)) return String(v);
  return String(Math.round(v * 100) / 100);
}

// Axis labels drop decimals the eye does not need, so a four-figure value
// like 5240.52 reads as 5,241 and fits the left margin.
function axisLabel(v) {
  const a = Math.abs(v);
  if (a >= 1000) return Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  if (a >= 100) return String(Math.round(v));
  if (a >= 10) return String(Math.round(v * 10) / 10);
  return String(Math.round(v * 100) / 100);
}

// Left margin wide enough for the longest axis label, so no digit is cut.
function leftPad(gridLabels) {
  return Math.max(44, Math.max(...gridLabels.map((s) => s.length)) * 7 + 12);
}

// Clamp a centred label so it stays inside the drawing area.
function clampLabel(x, label, width) {
  const half = (label.length * 6.5) / 2 + 2;
  return Math.min(Math.max(x, half), width - half);
}

function labelsOf(series) {
  return series.data.map(([year]) => (series.labels && series.labels[year]) || String(year));
}

export function barChart(series, { height = 220, color = RED, baseline = false } = {}) {
  const width = 640;
  const padR = 12;
  const padT = 26;
  const padB = 30;
  const values = series.data.map(([, v]) => v);
  const labels = labelsOf(series);
  const lo = baseline ? Math.min(0, ...values) : Math.min(0, ...values);
  const hi = niceMax(values);
  const span = hi - lo || 1;
  const gridVals = [0, 1, 2, 3, 4].map((g) => lo + (span * g) / 4);
  const gridLabels = gridVals.map(axisLabel);
  const padL = leftPad(gridLabels);
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const y = (v) => padT + plotH - ((v - lo) / span) * plotH;
  const slot = plotW / values.length;
  const barW = Math.min(46, slot * 0.62);
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${series.title} chart">`;
  for (let g = 0; g <= 4; g += 1) {
    const gy = y(gridVals[g]);
    svg += `<line x1="${padL}" y1="${gy}" x2="${width - padR}" y2="${gy}" stroke="${GRID}" stroke-width="1"/>`;
    svg += `<text x="${padL - 6}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#6b7280">${gridLabels[g]}</text>`;
  }
  if (lo < 0) svg += `<line x1="${padL}" y1="${y(0)}" x2="${width - padR}" y2="${y(0)}" stroke="${INK}" stroke-width="1"/>`;
  values.forEach((v, i) => {
    const x = padL + slot * i + (slot - barW) / 2;
    const top = y(Math.max(v, 0));
    const bottom = y(Math.min(v, 0));
    const fill = v < 0 ? GOLD : color;
    svg += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${barW.toFixed(1)}" height="${Math.max(1, bottom - top).toFixed(1)}" rx="3" fill="${fill}"/>`;
    svg += `<text x="${(x + barW / 2).toFixed(1)}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${fmt(v)}</text>`;
    svg += `<text x="${(x + barW / 2).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="#6b7280">${labels[i]}</text>`;
  });
  return `${svg}</svg>`;
}

export function lineChart(series, { height = 220, color = TEAL } = {}) {
  const width = 640;
  const padR = 16;
  const padT = 26;
  const padB = 30;
  const values = series.data.map(([, v]) => v);
  const labels = labelsOf(series);
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const floor = lo - (hi - lo) * 0.15;
  const ceil = hi + (hi - lo) * 0.15;
  const span = ceil - floor || 1;
  const gridVals = [0, 1, 2, 3, 4].map((g) => floor + (span * g) / 4);
  const gridLabels = gridVals.map(axisLabel);
  const padL = leftPad(gridLabels);
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const x = (i) => padL + (plotW * i) / (values.length - 1);
  const y = (v) => padT + plotH - ((v - floor) / span) * plotH;
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${series.title} chart">`;
  for (let g = 0; g <= 4; g += 1) {
    const gy = y(gridVals[g]);
    svg += `<line x1="${padL}" y1="${gy}" x2="${width - padR}" y2="${gy}" stroke="${GRID}" stroke-width="1"/>`;
    svg += `<text x="${padL - 6}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#6b7280">${gridLabels[g]}</text>`;
  }
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  svg += `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
  values.forEach((v, i) => {
    svg += `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="4" fill="#faf7f2" stroke="${color}" stroke-width="2.5"/>`;
    const label = fmt(v);
    svg += `<text x="${clampLabel(x(i), label, width).toFixed(1)}" y="${(y(v) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${label}</text>`;
    svg += `<text x="${clampLabel(x(i), labels[i], width).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="#6b7280">${labels[i]}</text>`;
  });
  return `${svg}</svg>`;
}

// Grouped bars for two series sharing the same years (exports vs imports).
export function groupedBars(seriesA, seriesB, { height = 220 } = {}) {
  const width = 640;
  const padR = 12;
  const padT = 26;
  const padB = 30;
  const values = [...seriesA.data.map(([, v]) => v), ...seriesB.data.map(([, v]) => v)];
  const labels = labelsOf(seriesA);
  const lo = Math.min(0, ...values);
  const hi = niceMax(values);
  const span = hi - lo || 1;
  const gridVals = [0, 1, 2, 3, 4].map((g) => lo + (span * g) / 4);
  const gridLabels = gridVals.map(axisLabel);
  const padL = leftPad(gridLabels);
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const y = (v) => padT + plotH - ((v - lo) / span) * plotH;
  const slot = plotW / values.length * 2;
  const barW = Math.min(20, slot * 0.3);
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${seriesA.title} and ${seriesB.title} chart">`;
  for (let g = 0; g <= 4; g += 1) {
    const gy = y(gridVals[g]);
    svg += `<line x1="${padL}" y1="${gy}" x2="${width - padR}" y2="${gy}" stroke="${GRID}" stroke-width="1"/>`;
    svg += `<text x="${padL - 6}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#6b7280">${gridLabels[g]}</text>`;
  }
  seriesA.data.forEach(([year, v], i) => {
    const cx = padL + slot * i + slot / 2;
    const v2 = seriesB.data[i][1];
    svg += `<rect x="${(cx - barW - 2).toFixed(1)}" y="${y(v).toFixed(1)}" width="${barW}" height="${(y(0) - y(v)).toFixed(1)}" rx="2" fill="${RED}"/>`;
    svg += `<rect x="${(cx + 2).toFixed(1)}" y="${y(v2).toFixed(1)}" width="${barW}" height="${(y(0) - y(v2)).toFixed(1)}" rx="2" fill="${TEAL}"/>`;
    svg += `<text x="${cx.toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="#6b7280">${labels[i]}</text>`;
  });
  svg += `<g font-size="12" fill="${INK}"><rect x="${padL}" y="2" width="12" height="12" rx="2" fill="${RED}"/><text x="${padL + 18}" y="12">Exports</text><rect x="${padL + 90}" y="2" width="12" height="12" rx="2" fill="${TEAL}"/><text x="${padL + 108}" y="12">Imports</text></g>`;
  return `${svg}</svg>`;
}

// Horizontal bars for a ranked list (top provinces). Each row: label, value,
// and a bar scaled to the largest value.
export function rankBars(rows, { height = 300, color = RED } = {}) {
  const width = 640;
  const rowH = height / rows.length;
  const max = Math.max(...rows.map((r) => r.value));
  const labelW = 150;
  const valueW = 70;
  let svg = `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Ranked bars">`;
  rows.forEach((r, i) => {
    const y = rowH * i + rowH / 2;
    const barW = ((width - labelW - valueW - 16) * r.value) / max;
    svg += `<text x="0" y="${(y + 4).toFixed(1)}" font-size="12" fill="${INK}">${r.label}</text>`;
    svg += `<rect x="${labelW}" y="${(y - 8).toFixed(1)}" width="${Math.max(2, barW).toFixed(1)}" height="16" rx="3" fill="${i === 0 ? color : TEAL}"/>`;
    svg += `<text x="${(labelW + barW + 8).toFixed(1)}" y="${(y + 4).toFixed(1)}" font-size="12" font-weight="600" fill="${INK}">${r.text}</text>`;
  });
  return `${svg}</svg>`;
}
