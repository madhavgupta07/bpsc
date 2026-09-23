const express = require('express');
const Chapter = require('../models/Chapter');
const MockTest = require('../models/MockTest');

const router = express.Router();

/** Base URL for all sitemap entries — falls back to CLIENT_URL. */
const SITE_URL = (process.env.SITE_URL || process.env.CLIENT_URL || '').replace(/\/$/, '');

// Static routes worth indexing. Quiz/test/profile pages are excluded (noindex).
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

const getSiteUrl = (req) => {
  const envUrl = process.env.SITE_URL || process.env.CLIENT_URL;
  if (envUrl) return envUrl.replace(/\/$/, '');
  const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
  const host = req.headers['x-forwarded-host'] || req.get('host');
  return `${protocol}://${host}`;
};

router.get('/robots.txt', (req, res) => {
  const siteUrl = getSiteUrl(req);
  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /quiz/',
    'Disallow: /test/',
    'Disallow: /profile',
    'Disallow: /results',
    'Disallow: /auth/',
    'Disallow: /admin',
    '',
    '# Crawl-delay for polite crawling',
    'Crawl-delay: 2',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
  ];
  res.set('Cache-Control', 'public, max-age=3600');
  res.type('text/plain').send(lines.join('\n') + '\n');
});

router.get('/sitemap.xml', async (req, res) => {
  try {
    const siteUrl = getSiteUrl(req);

    const chapters = await Chapter.find({}, 'chapterNumber slug updatedAt').lean();
    const tests = await MockTest.find({ isActive: true }, 'type').lean();
    const today = new Date().toISOString().slice(0, 10);

    const entry = (path, freq = 'weekly', priority = '0.7', lastmod = today) =>
      `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

    const urls = [
      // Static routes
      ...STATIC_ROUTES.map((r) => entry(r.path, r.freq, r.priority)),
      // Chapter detail pages
      ...chapters.map((c) => entry(`/syllabus/${c._id}`, 'weekly', '0.8')),
      // Notes pages (one per chapter)
      ...chapters.map((c) => entry(`/notes/${c.chapterNumber}`, 'monthly', '0.7')),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

    res.set('Cache-Control', 'public, max-age=3600');
    res.type('application/xml').send(xml);
  } catch (err) {
    res.status(500).type('text/plain').send(err.message);
  }
});

module.exports = router;
