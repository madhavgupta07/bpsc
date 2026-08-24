import { useTranslation } from 'react-i18next';
import { GraduationCap, Heart } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-slate-200/70 py-8 dark:border-zinc-800/80">
      <div className="container-app flex flex-col items-center gap-2 text-center">
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
          <GraduationCap className="size-4 text-brand-600" aria-hidden="true" />
          {t('app.fullName')}
        </span>
        <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-500">
          {t('common.footerNote')}
          <Heart className="size-3 fill-rose-500 text-rose-500" aria-hidden="true" />
        </p>
      </div>
    </footer>
  );
}
