// NusaStat entrypoint (Node 22, standard library only).
//
// The site is the plain static files in app/ next to this file: it opens at
// app/index.html in desktop Chrome and on a phone and loads nothing over the
// network. This program hands it in: it copies app/ and screenshots/ into
// /output and writes /output/dossier.json with the kit's vendored library, so
// the judge reads the screenshots, the first load's files and bytes, and the
// site's source. Leave vendor/makefun-frontend.ts untouched: the scorer
// rebuilds the dossier with its own copy and compares the two byte for byte.
//
// Run it outside the grader with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The scorer's own caps: at most 4 screenshots, none over 256 KiB; app/ at
// most 993 files and directories and 16 MiB in all; the dossier text at most
// 160 KiB. The numbers below are those caps, so a build that passes here is
// one the gate accepts on size.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
