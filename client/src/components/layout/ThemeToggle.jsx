import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={t('nav.theme')}
      title={t('nav.theme')}
      className="relative flex size-9 items-center justify-center overflow-hidden rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
    >
      <Sun
        className={`absolute size-[18px] transition-all duration-300 ${
          isDark ? 'translate-y-8 rotate-90 opacity-0' : 'translate-y-0 rotate-0 opacity-100'
        }`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute size-[18px] transition-all duration-300 ${
          isDark ? 'translate-y-0 rotate-0 opacity-100' : '-translate-y-8 -rotate-90 opacity-0'
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
