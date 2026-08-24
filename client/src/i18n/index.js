import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hi from './locales/hi.json';

export const LANG_KEY = 'stet.lang';
export const SUPPORTED_LANGS = ['en', 'hi'];

const getInitialLang = () => {
  try {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  } catch {
    /* storage unavailable */
  }
  return navigator.language?.toLowerCase().startsWith('hi') ? 'hi' : 'en';
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: getInitialLang(),
  fallbackLng: 'en',
  supportedLngs: SUPPORTED_LANGS,
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
