// NusaStat — Indonesia in Numbers.
// Every figure below was checked against its source on 26 November 2026 and
// carries that source and year with it. Nothing here is estimated by us:
// where a series is missing a year, the year is left out rather than filled in.
//
// Sources used: BPS — Statistics Indonesia (bps.go.id); World Bank, World
// Development Indicators (data.worldbank.org); UNDP Human Development Report
// 2025 (2023 data); United Nations World Population Prospects 2024 revision.

export const META = {
  country: 'Indonesia',
  referenceYear: 2024,
  lastUpdated: '26 November 2026',
  currency: 'Indonesian rupiah (IDR)',
  capital: 'Jakarta',
  provinces: 38,
  islands: '17,000+',
  landAreaKm2: 1890180,
  exchangeRate2024: 'IDR 15,855 per US$ (annual average, 2024)',
};

// Headline indicators, reference year 2024 unless noted.
export const HEADLINES = [
  {
    id: 'population',
    label: 'Population',
    value: '283.5 million',
    detail: '4th most populous country in the world',
    year: 2024,
    source: 'World Bank, World Development Indicators',
  },
  {
    id: 'gdp',
    label: 'GDP (nominal)',
    value: 'US$1.40 trillion',
    detail: '16th largest economy in the world',
    year: 2024,
    source: 'World Bank, World Development Indicators',
  },
  {
    id: 'growth',
    label: 'GDP growth',
    value: '5.03%',
    detail: 'Real GDP growth, year on year',
    year: 2024,
    source: 'BPS — Statistics Indonesia',
  },
  {
    id: 'inflation',
    label: 'Inflation',
    value: '1.57%',
    detail: 'Consumer prices, December year on year',
    year: 2024,
    source: 'BPS — Statistics Indonesia',
  },
  {
    id: 'unemployment',
    label: 'Unemployment',
    value: '4.91%',
    detail: 'Open unemployment rate, 7.47 million people',
    year: 2024,
    source: 'BPS — Statistics Indonesia, August 2024',
  },
  {
    id: 'poverty',
    label: 'Poverty rate',
    value: '8.57%',
    detail: '24.06 million people; lowest since records began in 1960',
    year: 2024,
    source: 'BPS — Statistics Indonesia, September 2024',
  },
];

// What 2025 already shows, for the front page strip. Each figure verified.
export const UPDATE_2025 = [
  { label: 'GDP growth', value: '5.11%', source: 'BPS, Feb 2026' },
  { label: 'GDP', value: 'US$1.45 trillion', source: 'World Bank' },
  { label: 'GDP per capita', value: 'US$5,060', source: 'World Bank' },
  { label: 'Unemployment', value: '4.85%', source: 'BPS, Aug 2025' },
  { label: 'Inflation (Dec, yoy)', value: '2.92%', source: 'BPS, Dec 2025' },
  { label: 'Population', value: '285.7 million', source: 'World Bank' },
];

// Annual series. Values are [year, value] pairs.
export const SERIES = {
  population: {
    title: 'Population',
    unit: 'million people',
    source: 'World Bank, World Development Indicators',
    data: [[2019, 272.49], [2020, 274.81], [2021, 276.76], [2022, 278.83], [2023, 281.19], [2024, 283.49], [2025, 285.72]],
  },
  gdpGrowth: {
    title: 'Real GDP growth',
    unit: '% per year',
    source: 'BPS — Statistics Indonesia; World Bank',
    data: [[2019, 5.02], [2020, -2.07], [2021, 3.7], [2022, 5.31], [2023, 5.05], [2024, 5.03], [2025, 5.11]],
  },
  gdpPerCapita: {
    title: 'GDP per capita',
    unit: 'current US$',
    source: 'World Bank, World Development Indicators',
    data: [[2020, 3853.7], [2021, 4287.17], [2022, 4730.83], [2023, 4876.3], [2024, 4925.44], [2025, 5059.63]],
  },
  inflation: {
    title: 'Inflation, consumer prices',
    unit: 'annual %',
    source: 'World Bank, World Development Indicators',
    data: [[2019, 3.03], [2020, 1.92], [2021, 1.56], [2022, 4.21], [2023, 3.67], [2024, 2.18], [2025, 1.91]],
  },
  inflationDec: {
    title: 'Inflation in December',
    unit: '% year on year',
    source: 'BPS — Statistics Indonesia',
    data: [[2022, 5.51], [2023, 2.61], [2024, 1.57], [2025, 2.92]],
  },
  unemployment: {
    title: 'Open unemployment rate',
    unit: '% of labour force, August',
    source: 'BPS — Statistics Indonesia',
    data: [[2021, 6.49], [2022, 5.86], [2023, 5.32], [2024, 4.91], [2025, 4.85]],
  },
  poverty: {
    title: 'Poverty rate',
    unit: '% of population',
    source: 'BPS — Statistics Indonesia',
    data: [[2023.2, 9.36], [2024.2, 9.03], [2024.7, 8.57]],
    labels: { 2023.2: 'Mar 2023', 2024.2: 'Mar 2024', 2024.7: 'Sep 2024' },
  },
  lifeExpectancy: {
    title: 'Life expectancy at birth',
    unit: 'years',
    source: 'World Bank, World Development Indicators',
    data: [[2019, 70.35], [2020, 68.82], [2021, 67.45], [2022, 70.93], [2023, 71.15], [2024, 71.29]],
  },
  urban: {
    title: 'Urban population',
    unit: '% of total',
    source: 'World Bank, World Development Indicators',
    data: [[2019, 55.74], [2020, 56.28], [2021, 56.88], [2022, 57.49], [2023, 58.12], [2024, 58.75], [2025, 59.39]],
  },
  exports: {
    title: 'Merchandise exports',
    unit: 'US$ billion',
    source: 'BPS — Statistics Indonesia; World Bank',
    data: [[2019, 167.68], [2020, 163.31], [2021, 231.51], [2022, 291.98], [2023, 258.86], [2024, 264.71], [2025, 282.91]],
  },
  imports: {
    title: 'Merchandise imports',
    unit: 'US$ billion',
    source: 'BPS — Statistics Indonesia; World Bank',
    data: [[2019, 171.28], [2020, 141.62], [2021, 196.19], [2022, 237.45], [2023, 221.89], [2024, 233.66], [2025, 241.86]],
  },
};

// Age structure, 2024 (United Nations, World Population Prospects 2024).
export const AGE = {
  source: 'United Nations, World Population Prospects 2024',
  year: 2024,
  groups: [
    { label: 'Aged 0–14', share: 24.6 },
    { label: 'Aged 15–64', share: 68.1 },
    { label: 'Aged 65+', share: 7.3 },
  ],
  medianAge: 30.1,
  fertility: 2.11,
};

// Development snapshot.
export const DEVELOPMENT = [
  {
    label: 'Human Development Index',
    value: '0.728',
    detail: 'High human development; rank 113 of 193 countries',
    year: 2023,
    source: 'UNDP, Human Development Report 2025',
  },
  {
    label: 'Life expectancy',
    value: '71.3 years',
    detail: 'At birth, 2024; up from 70.3 in 2019',
    year: 2024,
    source: 'World Bank, World Development Indicators',
  },
  {
    label: 'Adult literacy',
    value: '96%',
    detail: 'People aged 15 and above who can read and write',
    year: 2020,
    source: 'World Bank, World Development Indicators',
  },
  {
    label: 'Urban population',
    value: '58.8%',
    detail: '166.6 million people lived in towns and cities',
    year: 2024,
    source: 'World Bank, World Development Indicators',
  },
];

// Trade, 2024 (BPS release of 15 January 2025; World Bank merchandise trade).
export const TRADE_2024 = {
  year: 2024,
  exports: 264.7,
  imports: 233.66,
  surplus: 31.04,
  source: 'BPS — Statistics Indonesia; World Bank',
  note: 'Goods trade. Exports rose 2.29% and imports 5.31% on 2023. The December 2024 surplus alone was US$2.24 billion.',
};

// All 38 provinces. Population and area are BPS mid-2025 estimates
// (via the Provinces of Indonesia table); density is people per km².
export const PROVINCES = [
  { name: 'West Java', id: 'Jawa Barat', capital: 'Bandung', region: 'Java', area: 37053.33, pop: 50759000 },
  { name: 'East Java', id: 'Jawa Timur', capital: 'Surabaya', region: 'Java', area: 48055.88, pop: 42089300 },
  { name: 'Central Java', id: 'Jawa Tengah', capital: 'Semarang', region: 'Java', area: 34347.43, pop: 38233900 },
  { name: 'North Sumatra', id: 'Sumatera Utara', capital: 'Medan', region: 'Sumatra', area: 72437.76, pop: 15785800 },
  { name: 'Banten', id: 'Banten', capital: 'Serang', region: 'Java', area: 9355.88, pop: 12537400 },
  { name: 'Jakarta', id: 'Jakarta', capital: 'Central Jakarta', region: 'Java', area: 661.53, pop: 10678000 },
  { name: 'South Sulawesi', id: 'Sulawesi Selatan', capital: 'Makassar', region: 'Sulawesi', area: 45323.98, pop: 9563100 },
  { name: 'Lampung', id: 'Lampung', capital: 'Bandar Lampung', region: 'Sumatra', area: 33570.76, pop: 9522900 },
  { name: 'South Sumatra', id: 'Sumatera Selatan', capital: 'Palembang', region: 'Sumatra', area: 86771.92, pop: 8928500 },
  { name: 'Riau', id: 'Riau', capital: 'Pekanbaru', region: 'Sumatra', area: 89900.78, pop: 6811200 },
  { name: 'West Sumatra', id: 'Sumatera Barat', capital: 'Padang', region: 'Sumatra', area: 42107.67, pop: 5914300 },
  { name: 'West Kalimantan', id: 'Kalimantan Barat', capital: 'Pontianak', region: 'Kalimantan', area: 147018.06, pop: 5766000 },
  { name: 'East Nusa Tenggara', id: 'Nusa Tenggara Timur', capital: 'Kupang', region: 'Nusa Tenggara', area: 46378.11, pop: 5742600 },
  { name: 'West Nusa Tenggara', id: 'Nusa Tenggara Barat', capital: 'Mataram', region: 'Nusa Tenggara', area: 19631.99, pop: 5731100 },
  { name: 'Aceh', id: 'Aceh', capital: 'Banda Aceh', region: 'Sumatra', area: 56835.02, pop: 5626000 },
  { name: 'Bali', id: 'Bali', capital: 'Denpasar', region: 'Nusa Tenggara', area: 5582.83, pop: 4461300 },
  { name: 'South Kalimantan', id: 'Kalimantan Selatan', capital: 'Banjarbaru', region: 'Kalimantan', area: 37125.43, pop: 4323300 },
  { name: 'East Kalimantan', id: 'Kalimantan Timur', capital: 'Samarinda', region: 'Kalimantan', area: 126951.76, pop: 4267600 },
  { name: 'Yogyakarta', id: 'Daerah Istimewa Yogyakarta', capital: 'Yogyakarta', region: 'Java', area: 3170.36, pop: 3781500 },
  { name: 'Jambi', id: 'Jambi', capital: 'Jambi', region: 'Sumatra', area: 49023.04, pop: 3768500 },
  { name: 'Central Sulawesi', id: 'Sulawesi Tengah', capital: 'Palu', region: 'Sulawesi', area: 61496.98, pop: 3156100 },
  { name: 'Central Kalimantan', id: 'Kalimantan Tengah', capital: 'Palangka Raya', region: 'Kalimantan', area: 153430.36, pop: 2845000 },
  { name: 'Southeast Sulawesi', id: 'Sulawesi Tenggara', capital: 'Kendari', region: 'Sulawesi', area: 36139.3, pop: 2836700 },
  { name: 'North Sulawesi', id: 'Sulawesi Utara', capital: 'Manado', region: 'Sulawesi', area: 14488.43, pop: 2721400 },
  { name: 'Riau Islands', id: 'Kepulauan Riau', capital: 'Tanjung Pinang', region: 'Sumatra', area: 8170.38, pop: 2213500 },
  { name: 'Bengkulu', id: 'Bengkulu', capital: 'Bengkulu', region: 'Sumatra', area: 20122.21, pop: 2138000 },
  { name: 'Maluku', id: 'Maluku', capital: 'Ambon', region: 'Maluku', area: 46133.83, pop: 1970600 },
  { name: 'Bangka Belitung Islands', id: 'Kepulauan Bangka Belitung', capital: 'Pangkal Pinang', region: 'Sumatra', area: 16690.23, pop: 1550800 },
  { name: 'West Sulawesi', id: 'Sulawesi Barat', capital: 'Mamuju', region: 'Sulawesi', area: 16590.67, pop: 1525300 },
  { name: 'Central Papua', id: 'Papua Tengah', capital: 'Nabire', region: 'Papua', area: 61079.59, pop: 1492300 },
  { name: 'Highland Papua', id: 'Papua Pegunungan', capital: 'Jayawijaya', region: 'Papua', area: 52508.66, pop: 1484900 },
  { name: 'North Maluku', id: 'Maluku Utara', capital: 'Sofifi', region: 'Maluku', area: 31465.98, pop: 1373800 },
  { name: 'Gorontalo', id: 'Gorontalo', capital: 'Gorontalo', region: 'Sulawesi', area: 12024.98, pop: 1242200 },
  { name: 'Papua', id: 'Papua', capital: 'Jayapura', region: 'Papua', area: 81383.32, pop: 1073600 },
  { name: 'North Kalimantan', id: 'Kalimantan Utara', capital: 'Tanjung Selor', region: 'Kalimantan', area: 69900.89, pop: 749400 },
  { name: 'Southwest Papua', id: 'Papua Barat Daya', capital: 'Sorong', region: 'Papua', area: 39103.06, pop: 636400 },
  { name: 'West Papua', id: 'Papua Barat', capital: 'Manokwari', region: 'Papua', area: 60308.59, pop: 587600 },
  { name: 'South Papua', id: 'Papua Selatan', capital: 'Merauke', region: 'Papua', area: 117858.97, pop: 549700 },
];

// Island groups, mid-2025 (BPS via the Provinces of Indonesia table).
export const REGIONS = [
  { name: 'Java', pop: 158079100, note: 'Six provinces; 55.4% of the country' },
  { name: 'Sumatra', pop: 62259500, note: 'Ten provinces' },
  { name: 'Sulawesi', pop: 21044800, note: 'Six provinces' },
  { name: 'Kalimantan', pop: 17951300, note: 'Five provinces' },
  { name: 'Nusa Tenggara', pop: 15935000, note: 'Three provinces' },
  { name: 'Papua', pop: 5824500, note: 'Six provinces' },
  { name: 'Maluku Islands', pop: 3344200, note: 'Two provinces' },
];

// Full source list for the About page.
export const SOURCES = [
  { name: 'BPS — Statistics Indonesia', url: 'bps.go.id', what: 'GDP growth, inflation, unemployment, poverty, trade, provincial population estimates' },
  { name: 'World Bank, World Development Indicators', url: 'data.worldbank.org', what: 'Population, GDP, GDP per capita, inflation, life expectancy, urban share, literacy, merchandise trade' },
  { name: 'UNDP, Human Development Report 2025', url: 'hdr.undp.org', what: 'Human Development Index 2023 (0.728, rank 113 of 193)' },
  { name: 'United Nations, World Population Prospects 2024', url: 'population.un.org', what: 'Age structure, median age, fertility rate' },
  { name: 'CIA World Factbook', url: 'cia.gov/the-world-factbook', what: '2024 average exchange rate (IDR 15,855 per US$)' },
];
