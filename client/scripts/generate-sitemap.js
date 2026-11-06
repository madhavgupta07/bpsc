import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

// Base Site URL resolution
const SITE_URL = (
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  'https://bpsc-stet.onrender.com'
).replace(/\/$/, '');

const API_BASE = (process.env.VITE_API_BASE || '').replace(/\/$/, '');

const DISALLOWED = ['/quiz/', '/test/', '/profile', '/results', '/auth/', '/admin'];

/**
 * Chapter numbers for the bundled bilingual notes. These are plain ES modules
 * with no React imports, so they load directly — the same source prerender.js
 * uses. Guarantees every /notes/N URL is in the sitemap even when the API is
 * unreachable at build time (which previously dropped all 17 note pages).
 */
async function loadBundledNoteNumbers() {
  const notesDir = path.join(ROOT, 'src', 'data', 'notes');
  const nums = [];
  for (let n = 1; n <= 17; n += 1) {
    const file = path.join(notesDir, `ch${String(n).padStart(2, '0')}.js`);
    if (!fs.existsSync(file)) continue;
    try {
      const mod = await import(pathToFileURL(file).href);
      const note = mod?.default ?? null;
      if (note?.num) nums.push(note.num);
    } catch (err) {
      console.warn(`⚠ Could not load ch${String(n).padStart(2, '0')}.js for sitemap: ${err.message}`);
    }
  }
  return nums;
}

const STATIC_ROUTES = [
  { path: '/',            freq: 'daily',   priority: '1.0' },
  { path: '/exam-info',   freq: 'weekly',  priority: '0.95' },
  { path: '/syllabus',    freq: 'weekly',  priority: '0.9' },
  { path: '/notes',       freq: 'weekly',  priority: '0.9' },
  { path: '/mock-tests',  freq: 'weekly',  priority: '0.8' },
  { path: '/leaderboard', freq: 'monthly', priority: '0.5' },
  { path: '/forum',       freq: 'weekly',  priority: '0.6' },
  { path: '/about',       freq: 'monthly', priority: '0.4' },
  { path: '/contact',     freq: 'monthly', priority: '0.3' },
  { path: '/privacy',     freq: 'yearly',  priority: '0.2' },
  { path: '/terms',       freq: 'yearly',  priority: '0.2' },
];

async function generateSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  let chapters = [];

  if (API_BASE) {
    try {
      console.log(`Fetching chapters from backend API: ${API_BASE}/api/chapters`);
      const res = await fetch(`${API_BASE}/api/chapters`);
      if (res.ok) {
        chapters = await res.json();
        console.log(`Successfully fetched ${chapters.length} chapters for sitemap.`);
      }
    } catch (err) {
      console.warn('Could not fetch dynamic chapters from API during sitemap generation:', err.message);
    }
  }

  const entry = (path, freq = 'weekly', priority = '0.7', lastmod = today) =>
    `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

  const nums = await loadBundledNoteNumbers();
  if (!nums.length) console.warn('⚠ No bundled notes found — /notes/N URLs will be missing.');

  const urls = [
    ...STATIC_ROUTES.map((r) => entry(r.path, r.freq, r.priority)),
    ...(Array.isArray(chapters) ? chapters.map((c) => entry(`/syllabus/${c._id}`, 'weekly', '0.8')) : []),
    ...nums.map((n) => entry(`/notes/${n}`, 'monthly', '0.7')),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf-8');
  console.log(`✅ Sitemap successfully generated at ${publicDir}/sitemap.xml (${urls.length} URLs)`);

  // Emitted here (not hand-maintained) so Sitemap: is always an ABSOLUTE URL —
  // Google ignores the relative form that was silently dropping discovery.
  // No Crawl-delay: it is non-standard (Google ignores it) and only throttles Bing.
  const robots = [
    'User-agent: *',
    'Allow: /',
    ...DISALLOWED.map((d) => `Disallow: ${d}`),
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf-8');
  console.log(`✅ robots.txt generated with absolute sitemap URL (${SITE_URL}/sitemap.xml)`);
}

generateSitemap().catch((err) => {
  // Never fail the deploy over a sitemap/robots problem — the committed
  // public/ copies remain valid fallbacks.
  console.warn('⚠ Sitemap/robots generation skipped:', err.message);
});
