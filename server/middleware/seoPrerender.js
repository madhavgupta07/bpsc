/**
 * SEO Pre-rendering & Metadata Injection Middleware.
 *
 * Intercepts GET requests for HTML pages (from crawlers or browser entry hits)
 * and dynamically injects accurate, route-specific Open Graph, Twitter cards,
 * meta tags, JSON-LD structured data, and <noscript> content into the SPA HTML
 * shell before returning it to the client.
 */

const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const MockTest = require('../models/MockTest');

const SITE_NAME = 'Bihar STET & BPSC CS';
const SITE_URL = (process.env.SITE_URL || process.env.CLIENT_URL || '').replace(/\/$/, '');

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

/** Escape HTML entities to prevent XSS in injected content. */
function esc(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

/** Build an <noscript> block of visible text for crawlers. */
function noscriptBlock(heading, items = []) {
  let html = `<noscript><div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:system-ui,sans-serif">`;
  html += `<h1>${esc(heading)}</h1>`;
  if (items.length) {
    html += '<ul>';
    for (const item of items) html += `<li>${esc(item)}</li>`;
    html += '</ul>';
  }
  html += '</div></noscript>';
  return html;
}

/** Wrap a JSON-LD object into a <script> tag. */
function jsonLd(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

/** Build common WebSite + Organization schema. */
function baseSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL || undefined,
      description: 'Free bilingual Bihar STET Paper II & BPSC TRE Computer Science preparation platform — chapter notes, quizzes, mock tests and progress tracking.',
      inLanguage: ['en', 'hi'],
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Bihar STET & BPSC CS',
      url: SITE_URL || undefined,
      description: 'Free preparation platform for Bihar STET & BPSC TRE Computer Science exams.',
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Route-specific SEO data                                           */
/* ------------------------------------------------------------------ */

/**
 * For a given request path, returns { title, description, jsonLdObjects, noscriptHtml, canonicalPath }.
 * Falls back to sane defaults if no specific route matches.
 */
async function getSeoData(pathname) {
  const result = {
    title: 'Bihar STET & BPSC TRE Computer Science — Free Notes, Quizzes & Mock Tests | बिहार STET व BPSC कंप्यूटर साइंस',
    description: 'Free bilingual (English/हिंदी) Bihar STET Paper II & BPSC TRE Computer Science preparation: 17 chapters of notes, 700+ practice questions, CBT mock tests and progress tracking. बिहार STET एवं BPSC TRE कंप्यूटर साइंस की पूरी तैयारी।',
    jsonLd: baseSchemas(),
    noscript: '',
    canonical: pathname,
    keywords: 'Bihar STET, BPSC TRE, BPSC Computer Science, BPSC TRE 3.0, BPSC TRE 4.0, STET Computer Science, Bihar STET syllabus, STET mock test, Bihar STET preparation, STET CS notes, बिहार STET, BPSC कंप्यूटर शिक्षक',
  };

  try {
    /* ---------- Home ---------- */
    if (pathname === '/') {
      const chapters = await Chapter.find({}, 'chapterNumber title_en title_hi').sort('order').lean();
      result.noscript = noscriptBlock(
        'Bihar STET & BPSC TRE Computer Science — Free Notes, Quizzes & Mock Tests',
        chapters.map((c) => `Chapter ${c.chapterNumber}: ${c.title_en} / ${c.title_hi}`),
      );
      result.jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Bihar STET & BPSC TRE Computer Science Complete Preparation',
        description: 'Comprehensive study material for Bihar STET Paper II & BPSC TRE Computer Science — 17 chapters, chapter-wise notes, practice quizzes, and CBT mock tests.',
        provider: { '@type': 'Organization', name: 'Bihar STET & BPSC CS' },
        inLanguage: ['en', 'hi'],
        isAccessibleForFree: true,
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'PT100H',
        },
      });
      // FAQ schema for common questions
      result.jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Bihar STET & BPSC TRE Computer Science exam?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bihar STET Paper II is the state-level teacher eligibility test conducted by BSEB, and BPSC TRE is the recruitment examination conducted by BPSC for appointing Computer Science teachers in Bihar higher secondary schools.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the syllabus for STET and BPSC TRE Computer Science?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The syllabus covers 17 chapters: Digital Logic, Computer Organization, Data Structures, Algorithms, Programming (C++/Python/Java), OS, DBMS, SQL, Computer Networks, Software Engineering, Web Technologies, TOC, IoT, AI, Pedagogy, and General Studies.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is B.Ed required for Computer Science in STET or BPSC TRE?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. B.Ed is NOT mandatory for Computer Science in either Bihar STET or BPSC TRE. Candidates with B.Tech (CS/IT), MCA, M.Sc (CS), or BCA + PG can apply without B.Ed.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is there negative marking in Bihar STET or BPSC TRE?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. There is NO negative marking in Bihar STET and BPSC TRE Computer Science exams.',
            },
          },
        ],
      });
      return result;
    }

    /* ---------- Exam Info (Pattern, Weightage, Notification) ---------- */
    if (pathname === '/exam-info') {
      const chapters = await Chapter.find({}, 'chapterNumber title_en title_hi weightage section').sort('order').lean();
      result.title = 'Bihar STET & BPSC TRE Computer Science — Exam Pattern, Eligibility, Syllabus & Roadmap';
      result.description = 'Comprehensive guide for Bihar STET Paper II & BPSC TRE (Class 11-12) Computer Science: exam patterns, eligibility criteria (B.Tech/MCA/BCA eligible, B.Ed exempted), qualifying marks, and official portals.';
      result.keywords = 'Bihar STET syllabus, BPSC TRE Computer Science, BPSC TRE 3.0 CS, BPSC TRE 4.0 CS syllabus, Bihar STET exam pattern, BPSC computer teacher exam pattern, Bihar STET eligibility, B.Tech in Bihar STET, बिहार STET सिलेबस';
      result.noscript = noscriptBlock(
        'Bihar STET & BPSC TRE Computer Science — Detailed Syllabus, Exam Pattern & Roadmap',
        [
          'Bihar STET Paper II: 150 MCQs (100 CS + 30 Art of Teaching + 20 GK), 150 Marks, 2.5 Hours, NO Negative Marking',
          'BPSC TRE (Class 11-12): 150 MCQs (Part I Language 30Q + Part II GS 40Q + Part III CS 80Q), Merit from 120 Marks',
          'Eligibility: B.E./B.Tech (CS/IT), MCA, M.Sc (CS), BCA + PG, or PGDCA + PG (Min 50% for Gen, 45% for reserved categories). Note: B.Ed is NOT mandatory for Computer Science.',
          ...chapters.map((c) => `Chapter ${c.chapterNumber}: ${c.title_en} (${c.title_hi}) — Weightage: ${c.weightage}%`),
        ],
      );
      result.jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Are B.Tech / B.E. students eligible for Bihar STET and BPSC TRE CS without B.Ed?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Candidates with B.E. or B.Tech in Computer Science / IT (with at least 50% marks) are fully eligible without B.Ed.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does STET connect to BPSC TRE Computer Science?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Qualifying Bihar STET Paper II CS is the mandatory eligibility step required to apply for BPSC TRE (Class 11-12) Computer Science teacher recruitment.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the BPSC TRE CS exam pattern?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BPSC TRE CS has 150 MCQs: Part I Language (30 marks, qualifying min 30%), Part II General Studies (40 marks), and Part III Computer Science (80 marks). Merit is calculated on 120 marks.',
            },
          },
        ],
      });
      return result;
    }

    /* ---------- Syllabus listing ---------- */
    if (pathname === '/syllabus') {
      const chapters = await Chapter.find({}, 'chapterNumber title_en title_hi weightage section').sort('order').lean();
      result.title = 'Bihar STET & BPSC TRE Computer Science Syllabus — All 17 Chapters | Complete Chapter List';
      result.description = `Complete Bihar STET Paper II & BPSC TRE Computer Science syllabus: ${chapters.length} chapters covering Digital Logic, Data Structures, OS, DBMS, Networks, Python, C++, Pedagogy and more — bilingual notes & quizzes for every chapter.`;
      result.keywords = 'Bihar STET syllabus, BPSC TRE Computer Science syllabus, BPSC TRE 3.0 CS syllabus, Bihar STET Paper 2 syllabus, STET CS chapters, बिहार STET सिलेबस';
      result.noscript = noscriptBlock(
        'Bihar STET & BPSC TRE Computer Science Syllabus — All Chapters',
        chapters.map((c) => `Ch ${c.chapterNumber}: ${c.title_en} (${c.title_hi}) — Weightage: ${c.weightage}%`),
      );
      result.jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Bihar STET & BPSC TRE Computer Science Syllabus',
        numberOfItems: chapters.length,
        itemListElement: chapters.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${c.title_en} / ${c.title_hi}`,
          url: `${SITE_URL}/syllabus/${c._id}`,
        })),
      });
      return result;
    }

    /* ---------- Chapter detail ---------- */
    const chapterMatch = pathname.match(/^\/syllabus\/([a-f0-9]{24})$/i);
    if (chapterMatch) {
      const chapter = await Chapter.findById(chapterMatch[1], 'chapterNumber title_en title_hi description_en description_hi').lean();
      if (chapter) {
        const topics = await Topic.find({ chapter: chapter._id }, 'name_en name_hi questionCount').sort('order').lean();
        const totalQ = topics.reduce((s, t) => s + (t.questionCount || 0), 0);
        result.title = `${chapter.title_en} — Bihar STET & BPSC CS Chapter ${chapter.chapterNumber} | ${chapter.title_hi}`;
        result.description = `${chapter.description_en || chapter.title_en} — ${topics.length} topics, ${totalQ} practice questions. Complete notes & quizzes for Bihar STET & BPSC TRE Computer Science Chapter ${chapter.chapterNumber}.`;
        result.keywords = `${chapter.title_en}, ${chapter.title_hi}, Bihar STET ${chapter.title_en}, BPSC TRE CS ${chapter.title_en}, STET CS Chapter ${chapter.chapterNumber}`;
        result.noscript = noscriptBlock(
          `Chapter ${chapter.chapterNumber}: ${chapter.title_en} / ${chapter.title_hi}`,
          topics.map((t) => `${t.name_en} / ${t.name_hi} (${t.questionCount} questions)`),
        );
        result.jsonLd.push({
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: `${chapter.title_en} — Bihar STET & BPSC CS`,
          description: chapter.description_en || `Study material for ${chapter.title_en}`,
          provider: { '@type': 'Organization', name: 'Bihar STET & BPSC CS' },
          inLanguage: ['en', 'hi'],
          isAccessibleForFree: true,
          hasPart: topics.map((t) => ({
            '@type': 'Course',
            name: t.name_en,
          })),
        });
      }
      return result;
    }

    /* ---------- Notes listing ---------- */
    if (pathname === '/notes') {
      result.title = 'Bihar STET & BPSC TRE Computer Science Notes — Free Chapter-wise Study Material in Hindi & English';
      result.description = 'Bilingual (English/हिंदी) chapter notes for all 17 Bihar STET & BPSC TRE Computer Science chapters — Digital Logic, Data Structures, OS, DBMS, Networks, Python, C++ to Pedagogy.';
      result.keywords = 'Bihar STET notes, BPSC TRE CS notes, BPSC Computer Science notes, STET CS study material, Bihar STET notes in Hindi, बिहार STET नोट्स';
      return result;
    }

    /* ---------- Notes detail ---------- */
    const notesMatch = pathname.match(/^\/notes\/(\d{1,2})$/);
    if (notesMatch) {
      const chapNum = parseInt(notesMatch[1], 10);
      const chapter = await Chapter.findOne({ chapterNumber: chapNum }, 'title_en title_hi chapterNumber description_en').lean();
      if (chapter) {
        result.title = `${chapter.title_en} Notes — Bihar STET & BPSC TRE CS Chapter ${chapter.chapterNumber} | ${chapter.title_hi} नोट्स`;
        result.description = `Complete ${chapter.title_en} notes in Hindi & English for Bihar STET & BPSC TRE Computer Science. Chapter ${chapter.chapterNumber} study material with explanations, tables and practice tips.`;
        result.keywords = `${chapter.title_en} notes, ${chapter.title_hi} नोट्स, Bihar STET Chapter ${chapter.chapterNumber} notes, BPSC TRE CS ${chapter.title_en}`;
      }
      return result;
    }

    /* ---------- Mock tests ---------- */
    if (pathname === '/mock-tests') {
      const tests = await MockTest.find({ isActive: true }, 'title_en type duration totalMarks').lean();
      result.title = 'Bihar STET & BPSC TRE Mock Tests — Free Online Practice Tests | Full-length & Chapter-wise';
      result.description = `${tests.length} free Bihar STET & BPSC TRE Computer Science mock tests — full-length, sectional and chapter-wise. Exam-style CBT interface with timer, OMR palette and instant results.`;
      result.keywords = 'Bihar STET mock test, BPSC TRE Computer Science mock test, BPSC TRE 3.0 mock test, STET online test, BPSC CS test series, बिहार STET मॉक टेस्ट';
      result.noscript = noscriptBlock(
        'Bihar STET & BPSC TRE Computer Science Mock Tests',
        tests.map((t) => `${t.title_en} (${t.type}, ${t.duration} min, ${t.totalMarks} marks)`),
      );
      result.jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Bihar STET & BPSC TRE Computer Science Mock Tests',
        numberOfItems: tests.length,
        itemListElement: tests.map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t.title_en,
        })),
      });
      return result;
    }

    /* ---------- Leaderboard ---------- */
    if (pathname === '/leaderboard') {
      result.title = 'Leaderboard — Bihar STET & BPSC CS Top Scorers';
      result.description = 'See the top performers on Bihar STET & BPSC TRE Computer Science practice quizzes and mock tests. Track your ranking and compare with other aspirants.';
      result.keywords = 'Bihar STET leaderboard, BPSC TRE CS leaderboard, STET CS rankings, STET mock test results';
      return result;
    }

    /* ---------- About ---------- */
    if (pathname === '/about') {
      result.title = 'About — Bihar STET & BPSC CS';
      result.description = 'Learn about Bihar STET & BPSC CS — a free bilingual preparation platform for Bihar STET Paper II & BPSC TRE Computer Science. Our mission is to make quality CS study material accessible to every aspirant.';
      result.keywords = 'about Bihar STET & BPSC CS, Bihar STET preparation platform, BPSC TRE CS study';
      return result;
    }

    /* ---------- Contact ---------- */
    if (pathname === '/contact') {
      result.title = 'Contact Us — Bihar STET & BPSC CS';
      result.description = 'Get in touch with Bihar STET & BPSC CS — ask a question, report an issue or share feedback. We typically reply within 24-48 hours.';
      result.keywords = 'contact Bihar STET, Bihar STET & BPSC CS support, feedback, report issue';
      return result;
    }

    /* ---------- Privacy policy ---------- */
    if (pathname === '/privacy') {
      result.title = 'Privacy Policy — Bihar STET & BPSC CS';
      result.description = 'How Bihar STET & BPSC CS collects, uses and protects your data — including Google sign-in, progress tracking and analytics.';
      return result;
    }

    /* ---------- Terms & conditions ---------- */
    if (pathname === '/terms') {
      result.title = 'Terms & Conditions — Bihar STET & BPSC CS';
      result.description = 'The terms that govern your use of Bihar STET & BPSC CS — accounts, content usage, no guarantee of exam prediction accuracy, and liability limits.';
      return result;
    }

    /* ---------- Forum ---------- */
    if (pathname === '/forum') {
      result.title = 'Discussion Forum — Bihar STET & BPSC CS';
      result.description = 'Ask questions, share doubts and help fellow aspirants on the Bihar STET & BPSC TRE Computer Science community forum.';
      result.keywords = 'Bihar STET forum, BPSC CS discussion, STET doubts, computer science questions';
      return result;
    }

    /* ---------- Login ---------- */
    if (pathname === '/login') {
      result.title = 'Sign In — Bihar STET & BPSC CS';
      result.description = 'Sign in with Google to track your Bihar STET & BPSC TRE preparation progress, save quiz scores, and appear on the leaderboard.';
      return result;
    }

  } catch (err) {
    console.error('[SEO middleware] Error building meta for', pathname, err.message);
  }

  return result;
}

/* ------------------------------------------------------------------ */
/*  Middleware factory                                                  */
/* ------------------------------------------------------------------ */

/**
 * Returns an Express middleware that intercepts SPA HTML responses and injects
 * SEO-critical metadata (title, description, OG tags, JSON-LD, noscript content).
 *
 * @param {string} htmlTemplate — the contents of the built index.html
 */
function createSeoMiddleware(htmlTemplate) {
  return async function seoMiddleware(req, res) {
    const seo = await getSeoData(req.path);
    const canonical = `${SITE_URL}${seo.canonical}`;
    const fullTitle = seo.title.includes(SITE_NAME) ? seo.title : `${seo.title} | ${SITE_NAME}`;

    let html = htmlTemplate;

    // Replace <title>
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(fullTitle)}</title>`);

    // Replace meta description
    html = html.replace(
      /<meta name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${esc(seo.description)}" />`,
    );

    // Inject additional meta tags, canonical, OG, and JSON-LD before </head>
    const headInject = [
      // Keywords
      `<meta name="keywords" content="${esc(seo.keywords || '')}" />`,
      // Canonical
      `<link rel="canonical" href="${esc(canonical)}" />`,
      // Open Graph
      `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:title" content="${esc(fullTitle)}" />`,
      `<meta property="og:description" content="${esc(seo.description)}" />`,
      `<meta property="og:url" content="${esc(canonical)}" />`,
      `<meta property="og:locale" content="en_IN" />`,
      `<meta property="og:locale:alternate" content="hi_IN" />`,
      // Twitter
      `<meta name="twitter:card" content="summary" />`,
      `<meta name="twitter:title" content="${esc(fullTitle)}" />`,
      `<meta name="twitter:description" content="${esc(seo.description)}" />`,
      // Hreflang (bilingual content)
      `<link rel="alternate" hreflang="en" href="${esc(canonical)}" />`,
      `<link rel="alternate" hreflang="hi" href="${esc(canonical)}" />`,
      `<link rel="alternate" hreflang="x-default" href="${esc(canonical)}" />`,
      // JSON-LD structured data
      ...seo.jsonLd.map((obj) => jsonLd(obj)),
    ].join('\n');

    html = html.replace('</head>', `${headInject}\n</head>`);

    // Inject noscript content after <div id="root"> for crawlers
    if (seo.noscript) {
      html = html.replace('<div id="root"></div>', `<div id="root">${seo.noscript}</div>`);
    }

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  };
}

module.exports = { createSeoMiddleware };
