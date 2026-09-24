/**
 * Build-time Prerender — emits crawlable, bilingual (English/हिंदी) static
 * HTML per route into `client/dist`.
 *
 * WHY: this app is deployed as a STATIC React SPA on Render. Every URL in
 * `sitemap.xml` (41 content URLs) returns the same empty `<div id="root">`
 * shell, so Google's "Discovered – currently not indexed" status — a pure
 * JS-only site that never executes for new domains — stays stuck.
 *
 * HOW: after `vite build` this script reads `dist/index.html` once, then for
 * each route writes `dist/<route>/index.html` with:
 *   1. Real bilingual <title> / meta description / canonical / OG / JSON-LD
 *      (identical to what the SPA's <Seo/> renders, but as crawlable HTML).
 *   2. A <noscript> block containing the ACTUAL bilingual chapter text
 *      (English + Hindi) rendered from the same bundled bilingual NOTES data
 *      the SPA renders — pure, crawlable, no-JS bilingual content.
 *
 * Zero new dependencies — plain Node ESM + the modular bilingual data already
 * shipping in the client bundle.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

/* ---------------- Site config ---------------- */
const SITE_URL = (
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  'https://bpsc-stet.onrender.com'
).replace(/\/$/, '');
const SITE_NAME = 'Bihar STET & BPSC CS | बिहार STET एवं BPSC CS';

const DIST = path.join(ROOT, 'dist');
const SHELL = path.join(DIST, 'index.html');
if (!fs.existsSync(SHELL)) {
  console.error('✗ dist/index.html not found — run `vite build` first.');
  process.exit(1);
}
const SHELL_HTML = fs.readFileSync(SHELL, 'utf-8');

/* ---------------- Escape + language helpers ---------------- */
const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Bilingual tuples are [en, hi]. */
const en = (v) => (Array.isArray(v) ? String(v[0] ?? '') : String(v ?? ''));
const hi = (v) =>
  Array.isArray(v) ? String(v[1] !== undefined && v[1] !== '' ? v[1] : v[0] ?? '') : String(v ?? '');

/* ---------------- Bilingual block renderers ---------------- */

/** Render a single [en,hi] pair as two bilingual lines/paragraphs. */
function pairHtml(v) {
  if (Array.isArray(v) && Array.isArray(v[0])) {
    // Nested arrays (e.g. a block whose payload is a list of pairs) → list.
    return listHtml(v);
  }
  const enText = en(v);
  const hiText = hi(v);
  return `<p>${esc(enText)}</p><p class="hi-lang">${esc(hiText)}</p>`;
}

/** List of [en,hi] items → two <ul> (English + Hindi). */
function listHtml(items) {
  if (!Array.isArray(items)) return '';
  const enItems = items.map((i) => `<li>${esc(en(i))}</li>`).join('');
  const hiItems = items.map((i) => `<li>${esc(hi(i))}</li>`).join('');
  return `<ul>${enItems}</ul><ul class="hi-lang">${hiItems}</ul>`;
}

/** Table: [headers, rows] where header & cell values are [en,hi] pairs. */
function tableHtml(headers, rows) {
  const th = (h) => `<th>${esc(en(h))}</th>`;
  const td = (c) => `<td>${esc(en(c))}</td>`;
  const hiTd = (c) => `<td>${esc(hi(c))}</td>`;
  const thead = `<thead><tr>${(headers || []).map(th).join('')}</tr></thead>`;
  const enBody = (rows || [])
    .map((r) => `<tr>${r.map(td).join('')}</tr>`)
    .join('');
  const hiBody = (rows || [])
    .map((r) => `<tr>${r.map(hiTd).join('')}</tr>`)
    .join('');
  return `<table><caption>English — अंग्रेज़ी</caption>${thead}<tbody>${enBody}</tbody></table>` +
    `<table class="hi-lang"><caption>हिंदी (Hindi)</caption>${thead}<tbody>${hiBody}</tbody></table>`;
}

/** Render one block kind — mirrors NoteBlocks.jsx bilingual rendering. */
function blockHtml(block) {
  if (!Array.isArray(block)) return `<p>${esc(en(block))}</p>`;
  if (typeof block[0] === 'string') {
    // (kind, payload): kinds 'h2'|'h3'|'p'|'ul'|'table'|'code'|'callout'|'pyq'
    const [kind, payload] = block;
    switch (kind) {
      case 'h2':
        return `<h2>${esc(en(payload))}</h2><h2 class="hi-lang">${esc(hi(payload))}</h2>`;
      case 'h3':
        return `<h3>${esc(en(payload))}</h3><h3 class="hi-lang">${esc(hi(payload))}</h3>`;
      case 'p':
        return `<p>${esc(en(payload))}</p><p class="hi-lang">${esc(hi(payload))}</p>`;
      case 'ul':
        return listHtml(payload);
      case 'table':
        // Real payload shape: [headerRow, row1, row2, …] where headerRow IS the
        // first row and every following element is a data row (each a row of
        // bilingual [en,hi] cell pairs).
        return tableHtml(payload[0], payload.slice(1));
      case 'code':
        return `<pre><code>${esc(en(payload))}</code></pre><pre class="hi-lang"><code>${esc(hi(payload))}</code></pre>`;
      case 'callout':
        return `<blockquote>${esc(en(payload))}</blockquote><blockquote class="hi-lang">${esc(hi(payload))}</blockquote>`;
      case 'pyq':
        return `<details class="pyq"><summary>Previous Year Question — पिछले वर्ष का प्रश्न</summary><p>${esc(en(payload))}</p><p class="hi-lang">${esc(hi(payload))}</p></details>`;
      default:
        return `<p>${esc(en(payload))}</p><p class="hi-lang">${esc(hi(payload))}</p>`;
    }
  }
  // Plain [en,hi] pair
  return pairHtml(block);
}

/** A chapter note's sections → full bilingual noscript body HTML. */
function noteBodyHtml(note) {
  const out = [
    `<h1>${esc(en(note.title))}</h1><h1 class="hi-lang">${esc(hi(note.title))}</h1>`,
  ];
  if (Array.isArray(note?.intro)) out.push(pairHtml(note.intro), listHtml(note.intro));
  if (Array.isArray(note?.sections)) {
    for (const sec of note.sections) {
      if (sec?.title) {
        out.push(`<h2>${esc(en(sec.title))}</h2><h2 class="hi-lang">${esc(hi(sec.title))}</h2>`);
      }
      if (Array.isArray(sec?.blocks)) {
        for (const b of sec.blocks) out.push(blockHtml(b));
      }
    }
  }
  return out.join('\n');
}

/* ---------------- Head / meta generation ---------------- */
const JSONLD = (title, description, canonical) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title.split(' | ')[0],
  description,
  url: `${SITE_URL}${canonical === '/' ? '' : canonical}`,
  inLanguage: ['en', 'hi'],
  publisher: { '@type': 'Organization', name: SITE_NAME },
});

function headTags({ title, description, canonical , keywords = '' }) {
  const fullTitle = title.includes('|') ? title : `${title} | ${SITE_NAME}`;
  const canon = `${SITE_URL}${canonical === '/' ? '' : canonical}`;
  const ld = JSONLD(fullTitle, description, canonical);
  return [
    `<title>${esc(fullTitle)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    keywords && `<meta name="keywords" content="${esc(keywords)}" />`,
    `<link rel="canonical" href="${esc(canon)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:title" content="${esc(fullTitle)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(canon)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:locale:alternate" content="hi_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(fullTitle)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<script type="application/ld+json">${esc(JSON.stringify(ld))}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');
}

/* ---------------- Route definitions ---------------- */
const STATIC_ROUTES = [
  {
    path: '/',
    title: 'Bihar STET & BPSC CS — Free Notes, Quizzes & Mock Tests | बिहार STET एवं BPSC CS',
    description:
      'Free bilingual Bihar STET Paper II & BPSC TRE Computer Science preparation — 17 chapters of notes, 700+ MCQs, quizzes & CBT mock tests in English and Hindi. बिहार STET एवं BPSC CS — मुफ्त नोट्स, क्विज़ और मॉक टेस्ट।',
    canonical: '/',
  },
  {
    path: '/exam-info',
    title: 'Bihar STET & BPSC CS Exam Info — Pattern, Eligibility, Syllabus | बिहार STET परीक्षा जानकारी',
    description:
      'Bihar STET Paper II & BPSC TRE Computer Science exam pattern, eligibility, syllabus, weightage & roadmap — bilingual. बिहार STET एवं BPSC परीक्षा पैटर्न, पात्रता एवं सिलेबस।',
    canonical: '/exam-info',
  },
  {
    path: '/syllabus',
    title: 'Bihar STET & BPSC CS Syllabus — 17 Chapters | बिहार STET सिलेबस',
    description:
      'Free bilingual Bihar STET & BPSC TRE Computer Science syllabus — all 17 chapters with weightage. Bihar STET एवं BPSC CS सिलेबस — सभी 17 अध्याय।',
    canonical: '/syllabus',
  },
  {
    path: '/notes',
    title: 'Bihar STET & BPSC CS Notes — 17 Chapters Free | बिहार STET नोट्स',
    description:
      'Free bilingual notes for all 17 Bihar STET & BPSC TRE Computer Science chapters — theory, examples, PYQs in English & Hindi. बिहार STET नोट्स — सभी 17 अध्याय।',
    canonical: '/notes',
  },
  {
    path: '/mock-tests',
    title: 'Bihar STET & BPSC CS Mock Tests — Free CBT | बिहार STET मॉक टेस्ट',
    description:
      'Free bilingual Bihar STET & BPSC TRE Computer Science CBT mock tests — full-length & chapter-wise with instant results. बिहार STET मॉक टेस्ट।',
    canonical: '/mock-tests',
  },
  {
    path: '/leaderboard',
    title: 'Bihar STET & BPSC CS Leaderboard | बिहार STET लीडरबोर्ड',
    description:
      'Bihar STET & BPSC CS top scorers leaderboard — quizzes & mock tests rankings. बिहार STET लीडरबोर्ड।',
    canonical: '/leaderboard',
  },
  {
    path: '/forum',
    title: 'Bihar STET & BPSC CS Forum — Ask Doubts | बिहार STET फोरम',
    description:
      'Bihar STET & BPSC CS community forum — ask doubts, discuss topics & help fellow aspirants. बिहार STET फोरम।',
    canonical: '/forum',
  },
  {
    path: '/about',
    title: 'About — Bihar STET & BPSC CS | बिहार STET एवं BPSC CS के बारे में',
    description:
      'About the Bihar STET & BPSC CS free bilingual prep platform — mission, team & approach. बिहार STET एवं BPSC CS के बारे में।',
    canonical: '/about',
  },
  {
    path: '/contact',
    title: 'Contact — Bihar STET & BPSC CS | बिहार STET एवं BPSC CS संपर्क',
    description:
      'Contact the Bihar STET & BPSC CS team — questions, feedback or suggestions. बिहार STET संपर्क।',
    canonical: '/contact',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy — Bihar STET & BPSC CS | गोपनीयता नीति',
    description:
      'How Bihar STET & BPSC CS collects, uses & protects your data — privacy policy. गोपनीयता नीति।',
    canonical: '/privacy',
  },
  {
    path: '/terms',
    title: 'Terms & Conditions — Bihar STET & BPSC CS | नियम एवं शर्तें',
    description:
      'Terms governing use of Bihar STET & BPSC CS prep platform. नियम एवं शर्तें।',
    canonical: '/terms',
  },
];

/* ---------------- Main ---------------- */
async function main() {
  let NOTES = [];
  // The 17 chapter notes are plain bilingual ES modules (no React imports).
  // index.js uses extensionless relative imports (fine for Vite, rejected by
  // plain Node ESM), so we import each chXY.js directly with an explicit .js
  // extension — each is a fully standalone module with the exact content the
  // SPA renders.
  const notesDir = path.join(ROOT, 'src', 'data', 'notes');
  for (let n = 1; n <= 17; n += 1) {
    const file = path.join(notesDir, `ch${String(n).padStart(2, '0')}.js`);
    if (!fs.existsSync(file)) continue;
    try {
      const mod = await import(pathToFileURL(file).href);
      const note = mod?.default ?? null;
      if (note?.num) NOTES.push(note);
    } catch (err) {
      console.warn(`⚠ Could not load ch${String(n).padStart(2, '0')}.js: ${err.message}`);
    }
  }
  if (!NOTES.length) console.warn('⚠ No bundled notes data — note pages will be metadata-only.');

  const routes = [...STATIC_ROUTES];

  for (const note of NOTES) {
    routes.push({
      path: `/notes/${note.num}`,
      title: `Chapter ${note.num}: ${en(note.title)} — Bihar STET & BPSC CS Notes | बिहार STET अध्याय ${note.num} नोट्स`,
      description: `Free bilingual chapter ${note.num} notes (English/हिंदी) for Bihar STET & BPSC TRE Computer Science — ${en(note.title)}. बिहार STET अध्याय ${note.num} नोट्स।`,
      canonical: `/notes/${note.num}`,
    });
  }

  const written = [];

  for (const r of routes) {
    const dir = r.path === '/' ? DIST : path.join(DIST, r.path);
    fs.mkdirSync(dir, { recursive: true });
    const head = headTags({
      title: r.title,
      description: r.description,
      canonical: r.canonical || r.path,
      keywords: r.keywords || '',
    });
    const note = NOTES.find((x) => `/notes/${x.num}` === r.path);
    const noscript = note
      ? `<noscript><div style="max-width:760px;margin:0 auto;padding:32px 20px;font-family:system-ui,sans-serif;color:#0f172a;line-height:1.65">${noteBodyHtml(note)}</div></noscript>`
      : '<noscript><div style="padding:32px 20px;font-family:system-ui,sans-serif;color:#0f172a">This page requires JavaScript to explore the interactive app. The bilingual content is available below.</div></noscript>';
    const html = SHELL_HTML
      .replace(/<title>[^<]*<\/title>/, head)
      .replace('<div id="root"></div>', `<div id="root"></div>\n${noscript}`)
      .replace(
        /<html([^>]*)>/,
        `<html$1 lang="en">`
      );
    fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
    written.push(r.path);
  }

  console.log(`\n✅ Prerendered ${written.length} routes into ${DIST}:`);
  for (const p of written) console.log(`  ${SITE_URL}${p === '/' ? '' : p}`);
}

main().catch((err) => {
  console.error('✗ Prerender failed:', err);
  process.exit(1);
});
