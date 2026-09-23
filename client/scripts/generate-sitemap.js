import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base Site URL resolution
const SITE_URL = (
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  process.env.RENDER_EXTERNAL_URL ||
  'https://bpsc-stet.onrender.com'
).replace(/\/$/, '');

const API_BASE = (process.env.VITE_API_BASE || '').replace(/\/$/, '');

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

  const urls = [
    ...STATIC_ROUTES.map((r) => entry(r.path, r.freq, r.priority)),
    ...(Array.isArray(chapters) ? chapters.map((c) => entry(`/syllabus/${c._id}`, 'weekly', '0.8')) : []),
    ...(Array.isArray(chapters) ? chapters.map((c) => entry(`/notes/${c.chapterNumber}`, 'monthly', '0.7')) : []),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf-8');
  console.log(`✅ Sitemap successfully generated at ${sitemapPath}`);
}

generateSitemap();
