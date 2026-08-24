import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../lib/api';

const LANGS = [
  { code: 'en', short: 'EN', full: 'English' },
  { code: 'hi', short: 'हिं', full: 'हिंदी' },
];

/**
 * Segmented language toggle with an animated sliding indicator.
 * - Updates i18next (UI strings) instantly
 * - Persists to localStorage + <html lang> via App-level effect
 * - Syncs `preferredLanguage` to the user's account when logged in
 */
export default function LanguageToggle({ size = 'md', showIcon = false, className }) {
  const { i18n } = useTranslation();
  const { user, updateUser } = useAuth();
  const active = i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const changeLang = async (code) => {
    if (code === active) return;
    await i18n.changeLanguage(code);
    // Fire-and-forget account sync; local state is already correct.
    if (user) {
      authApi.updateProfile({ preferredLanguage: code }).then((u) => updateUser(u)).catch(() => {});
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Language / भाषा"
      className={cn(
        'relative inline-flex items-center rounded-full bg-slate-200/70 p-1 dark:bg-zinc-800/80',
        className,
      )}
    >
      {showIcon && (
        <span className="pointer-events-none absolute left-2 text-slate-400 dark:text-zinc-500" aria-hidden="true">
          <Languages className={size === 'sm' ? 'size-3.5' : 'size-4'} />
        </span>
      )}
      {LANGS.map((lang) => {
        const isActive = active === lang.code;
        return (
          <button
            key={lang.code}
            role="radio"
            aria-checked={isActive}
            aria-label={lang.full}
            title={lang.full}
            onClick={() => changeLang(lang.code)}
            className={cn(
              'relative z-10 flex items-center justify-center rounded-full font-semibold transition-colors duration-200',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
              size === 'sm' && 'min-w-[2.25rem] px-2 py-1 text-xs',
              size === 'md' && 'min-w-[3rem] px-3 py-1.5 text-sm',
              showIcon && 'ml-5',
              isActive
                ? 'text-brand-700 dark:text-white'
                : 'text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200',
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`lang-pill${showIcon ? '-icon' : ''}`}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                className="absolute inset-0 -z-10 rounded-full bg-white shadow-md ring-1 ring-black/5 dark:bg-zinc-950 dark:ring-white/10"
              />
            )}
            <motion.span
              initial={false}
              animate={{ scale: isActive ? 1 : 0.92 }}
              transition={{ type: 'spring', stiffness: 600, damping: 30 }}
            >
              {lang.short}
            </motion.span>
          </button>
        );
      })}
    </div>
  );
}
