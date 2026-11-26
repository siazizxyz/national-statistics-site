# national-statistics-site

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/siazizxyz/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/siazizxyz/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

NusaStat — Indonesia in numbers. Population, economy, people and all 38
provinces, every figure sourced from BPS — Statistics Indonesia, the World
Bank and UNDP. Reference year 2024, with verified 2025 figures in the
overview strip. Static files only: no build step, no network requests, no
tracking. Charts are drawn in the browser from the figures in `app/data.js`;
the provinces table searches, filters by island group and sorts every column.

## Run it

```sh
node serve.ts
# then open http://localhost:8080
```

Or open `app/index.html` directly in a browser (ES modules need
`--allow-file-access-from-files` for `file://` in Chrome; the server is the
easy path).

## Structure

- `app/index.html` — page shell
- `app/data.js` — every figure, with its source and year
- `app/charts.js` — dependency-free SVG bar/line/rank charts
- `app/views.js` — page templates (Overview, Economy, People, Provinces, About)
- `app/main.js` — hash router and the live controls
- `app/style.css` — the paper/ink/red design, responsive to phones
- `main.ts` — entrypoint: copies `app/` and `screenshots/` to the output and
  writes `dossier.json`
- `serve.ts` — tiny static server for local testing
- `screenshots/` — the four judged screenshots (desktop overview, economy,
  provinces; phone overview)
- `shots.json` — which screenshot is which page and viewport

## Sources

BPS — Statistics Indonesia (bps.go.id), World Bank World Development
Indicators (data.worldbank.org), UNDP Human Development Report 2025,
United Nations World Population Prospects 2024. See the About page in the
site for the full source list and the notes on where sources disagree.

---

<sub>Entered on [make.fun](https://make.fun/?ref=0ey3csgv&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
