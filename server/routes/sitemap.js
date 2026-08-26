const express = require('express');
const Chapter = require('../models/Chapter');

const router = express.Router();

/** Base URL for all sitemap entries — falls back to CLIENT_URL. */
const SITE_URL = (process.env.SITE_URL || process.env.CLIENT_URL || '').replace(/\/$/, '');

// Static routes worth indexing. Quiz/test/profile pages are excluded (noindex).
const STATIC_ROUTES = ['/', '/syllabus', '/notes', '/mock-tests', '/leaderboard'];

router.get('/robots.txt', (_, res) => {
  const lines = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /quiz/',
    'Disallow: /test/',
    'Disallow: /profile',
    'Disallow: /results',
    'Disallow: /auth/',
  ];
  if (SITE_URL) lines.push(`Sitemap: ${SITE_URL}/sitemap.xml`);
  res.set('Cache-Control', 'public, max-age=3600');
  res.type('text/plain').send(lines.join('\n') + '\n');
});

router.get('/sitemap.xml', async (_, res) => {
  try {
    if (!SITE_URL) return res.status(500).type('text/plain').send('SITE_URL or CLIENT_URL not configured');

    const chapters = await Chapter.find({}, 'chapterNumber updatedAt').lean();
    const today = new Date().toISOString().slice(0, 10);

    const entry = (path, freq = 'weekly', priority = '0.7', lastmod = today) =>
      `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;

    const urls = [
      entry('/', 'daily', '1.0'),
      ...STATIC_ROUTES.slice(1).map((p) => entry(p)),
      // Chapter detail + matching notes page for every chapter.
      ...chapters.map((c) => entry(`/syllabus/${c._id}`, 'weekly', '0.8')),
      ...chapters.map((c) => entry(`/notes/${c.chapterNumber}`, 'monthly', '0.6')),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

    res.set('Cache-Control', 'public, max-age=3600');
    res.type('application/xml').send(xml);
  } catch (err) {
    res.status(500).type('text/plain').send(err.message);
  }
});

module.exports = router;
