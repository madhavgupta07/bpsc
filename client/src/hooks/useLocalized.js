import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Bilingual DB-content picker.
 * The API returns parallel fields (`title_en` / `title_hi`, etc.).
 * `pick(chapter, 'title')` resolves the correct language with graceful
 * fallback to the other language when a translation is missing.
 */
export function useLocalized() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('hi') ? 'hi' : 'en';

  return useCallback(
    (obj, field) => {
      if (obj == null) return '';
      const primary = obj[`${field}_${lang}`];
      const fallback = obj[`${field}_en`];
      return primary || fallback || '';
    },
    [lang],
  );
}

/** Locale-aware number formatting (e.g. Devanagari digits in Hindi). */
export function useLocaleNumber() {
  const { i18n } = useTranslation();
  const locale = i18n.language?.startsWith('hi') ? 'hi-IN' : 'en-IN';
  return useCallback((value) => new Intl.NumberFormat(locale).format(value ?? 0), [locale]);
}

/** Locale-aware relative time for history dates. */
export function useLocaleDate() {
  const { i18n } = useTranslation();
  const locale = i18n.language?.startsWith('hi') ? 'hi-IN' : 'en-IN';
  return useCallback(
    (date, opts) =>
      new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        ...opts,
      }).format(new Date(date)),
    [locale],
  );
}

/** Formats seconds as m:ss / hh:mm:ss. */
export function formatDuration(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(sec).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
}

/** Maps API difficulty enums to i18n keys. */
export function difficultyKey(difficulty) {
  return ['easy', 'medium', 'hard'].includes(difficulty) ? difficulty : 'medium';
}

export function useDifficultyStyles() {
  return useMemo(
    () => ({
      easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 ring-emerald-600/20 dark:ring-emerald-500/20',
      medium:
        'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 ring-amber-600/20 dark:ring-amber-500/20',
      hard: 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 ring-rose-600/20 dark:ring-rose-500/20',
    }),
    [],
  );
}
