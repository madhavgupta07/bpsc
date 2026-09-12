import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Bihar STET & BPSC CS';
const DEFAULT_TITLE = 'Bihar STET & BPSC TRE CS Prep | Free Notes & Mocks';
const DEFAULT_DESCRIPTION =
  'Free bilingual Bihar STET Paper II & BPSC TRE Computer Science prep: 17 chapters of notes, 700+ MCQs & CBT mock tests in English and Hindi.';
const DEFAULT_KEYWORDS =
  'Bihar STET, BPSC TRE, BPSC Computer Science, BPSC TRE 3.0, BPSC TRE 4.0, STET Computer Science, Bihar STET syllabus, STET mock test, Bihar STET preparation, STET CS notes, बिहार STET, BPSC कंप्यूटर शिक्षक';

/**
 * Per-page meta tags for SEO + social sharing (Open Graph / Twitter).
 * Renders nothing to the DOM — only drives <head>.
 *
 * @param {string}  title       Page title (site name is appended automatically)
 * @param {string}  description Meta description; falls back to the site default
 * @param {string}  path        Route path used for the canonical URL
 * @param {string}  image       Absolute or root-relative OG image URL (optional)
 * @param {string}  keywords    Comma-separated keywords for the page
 * @param {boolean} noIndex     Hide this page from search engines (quizzes etc.)
 * @param {Array}   jsonLd      Array of JSON-LD objects to inject as structured data
 */
export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = '',
  keywords = DEFAULT_KEYWORDS,
  noIndex = false,
  jsonLd = [],
}) {
  const fullTitle = title
    ? (title.includes(SITE_NAME) || title.includes('|') ? title : `${title} | ${SITE_NAME}`)
    : DEFAULT_TITLE;
  const canonical = `${window.location.origin}${path}`;
  const ogImage = image || `${window.location.origin}/icons/icon.svg`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Language alternates */}
      <link rel="alternate" hreflang="en" href={canonical} />
      <link rel="alternate" hreflang="hi" href={canonical} />
      <link rel="alternate" hreflang="x-default" href={canonical} />

      {/* Open Graph (Facebook / WhatsApp / LinkedIn) */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="hi_IN" />

      {/* Twitter/X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}
