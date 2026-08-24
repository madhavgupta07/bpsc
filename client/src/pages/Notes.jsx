import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { NOTES } from '../data/notes';
import { usePageTitle } from '../hooks/useDocumentLocale';
import { useLangPicker } from '../components/notes/NoteBlocks';
import { chapterGradient } from '../components/chapters/icons';
import { cn } from '../lib/cn';

export default function Notes() {
  const { t } = useTranslation();
  const L = useLangPicker();
  usePageTitle(t('nav.notes'));

  return (
    <div className="container-app py-10">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">{t('nav.notes')}</h1>
          <p className="mt-2 max-w-xl text-sm text-slate-500 dark:text-zinc-400">{t('notes.subtitle')}</p>
        </div>
        <span className="hidden rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-700 sm:block dark:bg-brand-500/10 dark:text-brand-300">
          {NOTES.length} CH
        </span>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {NOTES.map((note, i) => (
          <motion.div
            key={note.num}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
          >
            <Link
              to={`/notes/${note.num}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors hover:border-brand-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-500/40"
            >
              <span className={cn('absolute inset-y-0 left-0 w-1', chapterGradient(note.num))} aria-hidden="true" />

              <div className="flex items-start justify-between pb-3 pl-5 pr-5 pt-4">
                <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-bold tabular-nums text-slate-500 dark:bg-zinc-800 dark:text-zinc-400">
                  CH {String(note.num).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500">
                  {t('notes.sectionsCount', { count: note.sections.length })}
                </span>
              </div>
              <h2 className="pl-5 pr-5 text-sm font-bold leading-snug text-slate-900 dark:text-zinc-100">{L(note.title)}</h2>
              <p className="mt-1.5 flex-1 pl-5 pr-5 text-[13px] leading-relaxed text-slate-500 line-clamp-2 dark:text-zinc-400">
                {L(note.intro)}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 border-t border-slate-100 py-2.5 pl-5 pr-5 text-xs font-semibold text-brand-700 group-hover:underline dark:border-zinc-800 dark:text-brand-400">
                {t('notes.readChapter')} <ChevronRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
