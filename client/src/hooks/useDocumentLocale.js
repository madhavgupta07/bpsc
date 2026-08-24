import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const BASE_TITLE = 'Bihar STET CS — Learning Platform';

/**
 * Keeps <html lang>, <title> and localStorage in sync with the active i18next
 * language. Call once at the app root; also returns changeLang for toggles.
 */
export function useDocumentLocale() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language?.startsWith('hi') ? 'hi' : 'en';
    try {
      localStorage.setItem('stet.lang', i18n.language?.startsWith('hi') ? 'hi' : 'en');
    } catch {
      /* noop */
    }
  }, [i18n.language]);

  const changeLang = (lng) => i18n.changeLanguage(lng);
  return { changeLang };
}

/** Sets the browser tab title per page. */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE_TITLE}` : BASE_TITLE;
    return () => {
      document.title = BASE_TITLE;
    };
  }, [title]);
}
