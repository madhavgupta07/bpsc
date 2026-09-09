import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Locale-aware relative timestamps ("5m ago" / "2 दिन पहले").
 * Uses Intl.RelativeTimeFormat so no i18n dictionary keys are needed.
 */
export function useRelativeTime() {
  const { i18n } = useTranslation();
  return useCallback(
    (iso) => {
      if (!iso) return '';
      const locale = i18n.language?.startsWith('hi') ? 'hi' : 'en';
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
      const then = new Date(iso).getTime();
      if (Number.isNaN(then)) return '';
      const secs = Math.round((then - Date.now()) / 1000);
      const abs = Math.abs(secs);
      const units = [
        ['year', 31536000],
        ['month', 2592000],
        ['week', 604800],
        ['day', 86400],
        ['hour', 3600],
        ['minute', 60],
      ];
      for (const [unit, seconds] of units) {
        if (abs >= seconds) return rtf.format(Math.round(secs / seconds), unit);
      }
      return rtf.format(secs, 'second');
    },
    [i18n.language],
  );
}