/**
 * Server-side SEO middleware — injects per-route meta tags, JSON-LD structured
 * data, and pre-rendered content hints into the SPA shell HTML so that
 * search-engine crawlers (Googlebot, Bingbot, etc.) see rich, indexable content
 * instead of a blank <div id="root"></div>.
 *
 * This replaces the placeholders in the built index.html at request time.
 * Only active in production mode (when serving the SPA from /client/dist).
 */

const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const MockTest = require('../models/MockTest');

const SITE_NAME = 'Bihar STET CS';
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
      description: 'Free bilingual Bihar STET Computer Science preparation platform — chapter notes, quizzes, mock tests and progress tracking.',
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
      name: 'Bihar STET CS',
      url: SITE_URL || undefined,
      description: 'Free preparation platform for Bihar STET Computer Science exam.',
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
    title: 'Bihar STET Computer Science — Free Notes, Quizzes & Mock Tests | बिहार STET कंप्यूटर साइंस',
    description: 'Free bilingual (English/हिंदी) Bihar STET Computer Science preparation: 17 chapters of notes, 700+ practice questions, full-length mock tests and progress tracking. बिहार STET कंप्यूटर साइंस की पूरी तैयारी।',
    jsonLd: baseSchemas(),
    noscript: '',
    canonical: pathname,
    keywords: 'Bihar STET, STET Computer Science, Bihar STET syllabus, STET mock test, Bihar STET preparation, STET CS notes, बिहार STET, कंप्यूटर साइंस, STET practice quiz',
  };

  try {
    /* ---------- Home ---------- */
    if (pathname === '/') {
      const chapters = await Chapter.find({}, 'chapterNumber title_en title_hi').sort('order').lean();
      result.noscript = noscriptBlock(
        'Bihar STET Computer Science — Free Notes, Quizzes & Mock Tests',
        chapters.map((c) => `Chapter ${c.chapterNumber}: ${c.title_en} / ${c.title_hi}`),
      );
      result.jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Bihar STET Computer Science Complete Preparation',
        description: 'Comprehensive study material for Bihar STET Paper II Computer Science — 17 chapters, chapter-wise notes, practice quizzes, and full-length mock tests.',
        provider: { '@type': 'Organization', name: 'Bihar STET CS' },
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
            name: 'What is Bihar STET Computer Science exam?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bihar STET (State Teacher Eligibility Test) Paper II Computer Science is a state-level exam conducted by BSEB for recruiting computer science teachers in Bihar. It covers 17 chapters including Digital Logic, Computer Organization, Data Structures, OS, DBMS, Networks and Pedagogy.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bihar STET Computer Science syllabus kya hai?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bihar STET CS syllabus mein 17 chapters hain: Digital Logic, Computer Organization, Data Structures, Algorithms, Programming (C/Java), OS, DBMS, Computer Networks, Software Engineering, Web Technologies, Computer Graphics, AI/ML, Cyber Security, ICT in Education, Teaching Methods aur GK.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many questions are in Bihar STET Paper 2?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bihar STET Paper II has 150 multiple-choice questions: 100 from the subject (Computer Science) worth 100 marks and 50 from pedagogy/GK sections worth 50 marks. Total duration is 2 hours 30 minutes.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is there negative marking in Bihar STET?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Bihar STET has negative marking. For each wrong answer, 0.25 marks are deducted. Unanswered questions carry no penalty.',
            },
          },
        ],
      });
      return result;
    }

    /* ---------- Exam Info (Pattern, Weightage, Notification) ---------- */
    if (pathname === '/exam-info') {
      const chapters = await Chapter.find({}, 'chapterNumber title_en title_hi weightage section').sort('order').lean();
      result.title = 'Bihar STET Computer Science Syllabus 2025 — Detailed Chapter-wise Syllabus, Exam Pattern & Notification';
      result.description = 'Complete Bihar STET Paper II Computer Science (Code 226) syllabus 2025 with chapter-wise weightage, exam pattern, eligibility criteria, and official notification links. बिहार STET कंप्यूटर साइंस सिलेबस 2025 — पूरा विवरण।';
      result.keywords = 'Bihar STET syllabus 2025, STET Computer Science syllabus, Bihar STET exam pattern, Bihar STET notification, Bihar STET eligibility, STET Paper 2 syllabus, बिहार STET सिलेबस, STET ka syllabus, Bihar STET computer teacher syllabus, STET syllabus pdf in hindi, Bihar STET weightage';
      result.noscript = noscriptBlock(
        'Bihar STET Computer Science — Detailed Syllabus, Exam Pattern & Official Notification',
        [
          'Exam: Bihar STET Paper II Computer Science (Code 226) — 150 MCQs, 150 Marks, 2.5 Hours, Negative marking -0.25',
          'Exam Pattern: Subject Content (100 Qs / 100 Marks), Art of Teaching (30 Qs / 30 Marks), General Knowledge & Reasoning (20 Qs / 20 Marks)',
          'Eligibility: Post Graduation (M.Sc/MCA/M.Tech) in CS with B.Ed (50% for Gen, 45% for SC/ST)',
          ...chapters.map((c) => `Chapter ${c.chapterNumber}: ${c.title_en} (${c.title_hi}) — Weightage: ${c.weightage}%`),
        ],
      );
      result.jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Bihar STET Computer Science ka syllabus kya hai?',
            acceptedAnswer: { '@type': 'Answer', text: 'Bihar STET Paper II Computer Science (Code 226) mein 17 chapters hain — Digital Logic, Computer Organization, Data Structures, Algorithms, OS, DBMS, Computer Networks, Software Engineering, OOP, Web Technologies, Theory of Computation, IoT, AI, E-Commerce, Multimedia, Pedagogy aur GK. Total 150 questions, 150 marks, 2.5 hours.' },
          },
          {
            '@type': 'Question',
            name: 'What is the exam pattern for Bihar STET Paper 2?',
            acceptedAnswer: { '@type': 'Answer', text: 'Bihar STET Paper II has 150 MCQs: 100 from Computer Science (100 marks), 30 from Pedagogy (30 marks), and 20 from GK/Environment/Reasoning (20 marks). Duration: 2 hours 30 minutes. Negative marking: -0.25 per wrong answer.' },
          },
          {
            '@type': 'Question',
            name: 'Bihar STET ke liye eligibility kya hai?',
            acceptedAnswer: { '@type': 'Answer', text: 'Post-Graduation (M.Sc/MCA/M.Tech) in Computer Science with B.Ed. General: 50% marks, SC/ST/PwD: 45%. Age: 21-40 years.' },
          },
        ],
      });
      return result;
    }

    /* ---------- Syllabus listing ---------- */
    if (pathname === '/syllabus') {
      const chapters = await Chapter.find({}, 'chapterNumber title_en title_hi weightage section').sort('order').lean();
      result.title = 'Bihar STET Computer Science Syllabus — All 17 Chapters | Complete Chapter List';
      result.description = `Complete Bihar STET Computer Science (Paper II) syllabus: ${chapters.length} chapters covering Digital Logic, Data Structures, OS, DBMS, Networks, Pedagogy and more — bilingual notes & quizzes for every chapter.`;
      result.keywords = 'Bihar STET syllabus, STET Computer Science syllabus, Bihar STET Paper 2 syllabus, STET CS chapters, बिहार STET सिलेबस';
      result.noscript = noscriptBlock(
        'Bihar STET Computer Science Syllabus — All Chapters',
        chapters.map((c) => `Ch ${c.chapterNumber}: ${c.title_en} (${c.title_hi}) — Weightage: ${c.weightage}%`),
      );
      result.jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Bihar STET Computer Science Syllabus',
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
        result.title = `${chapter.title_en} — Bihar STET CS Chapter ${chapter.chapterNumber} | ${chapter.title_hi}`;
        result.description = `${chapter.description_en || chapter.title_en} — ${topics.length} topics, ${totalQ} practice questions. Complete notes & quizzes for Bihar STET Computer Science Chapter ${chapter.chapterNumber}.`;
        result.keywords = `${chapter.title_en}, ${chapter.title_hi}, Bihar STET ${chapter.title_en}, STET CS Chapter ${chapter.chapterNumber}`;
        result.noscript = noscriptBlock(
          `Chapter ${chapter.chapterNumber}: ${chapter.title_en} / ${chapter.title_hi}`,
          topics.map((t) => `${t.name_en} / ${t.name_hi} (${t.questionCount} questions)`),
        );
        result.jsonLd.push({
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: `${chapter.title_en} — Bihar STET CS`,
          description: chapter.description_en || `Study material for ${chapter.title_en}`,
          provider: { '@type': 'Organization', name: 'Bihar STET CS' },
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
      result.title = 'Bihar STET Computer Science Notes — Free Chapter-wise Study Material in Hindi & English';
      result.description = 'Bilingual (English/हिंदी) chapter notes for all 17 Bihar STET Computer Science chapters — from Digital Logic to Pedagogy. Free study material for STET Paper II preparation.';
      result.keywords = 'Bihar STET notes, STET Computer Science notes, STET CS study material, Bihar STET notes in Hindi, बिहार STET नोट्स';
      return result;
    }

    /* ---------- Notes detail ---------- */
    const notesMatch = pathname.match(/^\/notes\/(\d{1,2})$/);
    if (notesMatch) {
      const chapNum = parseInt(notesMatch[1], 10);
      const chapter = await Chapter.findOne({ chapterNumber: chapNum }, 'title_en title_hi chapterNumber description_en').lean();
      if (chapter) {
        result.title = `${chapter.title_en} Notes — Bihar STET CS Chapter ${chapter.chapterNumber} | ${chapter.title_hi} नोट्स`;
        result.description = `Complete ${chapter.title_en} notes in Hindi & English for Bihar STET Computer Science. Chapter ${chapter.chapterNumber} study material with explanations, tables and practice tips.`;
        result.keywords = `${chapter.title_en} notes, ${chapter.title_hi} नोट्स, Bihar STET Chapter ${chapter.chapterNumber} notes`;
      }
      return result;
    }

    /* ---------- Mock tests ---------- */
    if (pathname === '/mock-tests') {
      const tests = await MockTest.find({ isActive: true }, 'title_en type duration totalMarks').lean();
      result.title = 'Bihar STET Mock Tests — Free Online Practice Tests | Full-length & Chapter-wise';
      result.description = `${tests.length} free Bihar STET Computer Science mock tests — full-length (150Q), sectional and chapter-wise. Exam-style interface with timer, OMR palette and instant results.`;
      result.keywords = 'Bihar STET mock test, STET online test, Bihar STET practice test, STET CS mock test, बिहार STET मॉक टेस्ट';
      result.noscript = noscriptBlock(
        'Bihar STET Computer Science Mock Tests',
        tests.map((t) => `${t.title_en} (${t.type}, ${t.duration} min, ${t.totalMarks} marks)`),
      );
      result.jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Bihar STET Computer Science Mock Tests',
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
      result.title = 'Leaderboard — Bihar STET CS Top Scorers';
      result.description = 'See the top performers on Bihar STET Computer Science mock tests. Track your ranking and compare with other aspirants.';
      result.keywords = 'Bihar STET leaderboard, STET CS rankings, STET mock test results';
      return result;
    }

    /* ---------- Login ---------- */
    if (pathname === '/login') {
      result.title = 'Sign In — Bihar STET CS';
      result.description = 'Sign in with Google to track your Bihar STET preparation progress, save quiz scores, and appear on the leaderboard.';
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
