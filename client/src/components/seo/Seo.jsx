import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Bihar STET CS';
const DEFAULT_TITLE = 'Bihar STET Computer Science — Notes, Quizzes & Mock Tests';
const DEFAULT_DESCRIPTION =
  'Free bilingual (English/हिंदी) preparation platform for Bihar STET Computer Science: chapter notes, practice quizzes, full-length mock tests, and progress tracking.';

/**
 * Per-page meta tags for SEO + social sharing (Open Graph / Twitter).
 * Renders nothing to the DOM — only drives <head>.
 *
 * @param {string}  title       Page title (site name is appended automatically)
 * @param {string}  description Meta description; falls back to the site default
 * @param {string}  path        Route path used for the canonical URL
 * @param {string}  image       Absolute or root-relative OG image URL (optional)
 * @param {boolean} noIndex     Hide this page from search engines (quizzes etc.)
 */
export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  image = '',
  noIndex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const canonical = `${window.location.origin}${path}`;
  const ogImage = image || `${window.location.origin}/icons/icon.svg`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph (Facebook / WhatsApp / LinkedIn) */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter/X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
