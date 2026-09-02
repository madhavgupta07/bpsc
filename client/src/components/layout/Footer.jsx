import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Heart } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-slate-200/70 bg-white py-10 dark:border-zinc-800/80 dark:bg-zinc-950">
      <div className="container-app flex flex-col items-center gap-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-600 dark:text-zinc-400">
          <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400">{t('nav.home')}</Link>
          <Link to="/exam-info" className="hover:text-brand-600 dark:hover:text-brand-400">{t('nav.examInfo')}</Link>
          <Link to="/syllabus" className="hover:text-brand-600 dark:hover:text-brand-400">{t('nav.syllabus')}</Link>
          <Link to="/notes" className="hover:text-brand-600 dark:hover:text-brand-400">{t('nav.notes')}</Link>
          <Link to="/mock-tests" className="hover:text-brand-600 dark:hover:text-brand-400">{t('nav.mockTests')}</Link>
          <Link to="/leaderboard" className="hover:text-brand-600 dark:hover:text-brand-400">{t('nav.leaderboard')}</Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-300">
            <GraduationCap className="size-4 text-brand-600" aria-hidden="true" />
            {t('app.fullName')}
          </span>
          <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-500">
            {t('common.footerNote')}
            <Heart className="size-3 fill-rose-500 text-rose-500" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
}

