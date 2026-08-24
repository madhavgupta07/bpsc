import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import { ChapterIcon, chapterGradient } from './icons';
import { cn } from '../../lib/cn';

export default function ChapterCard({ chapter, progress }) {
  const { t } = useTranslation();
  const lang = document.documentElement.lang === 'hi' ? 'hi' : 'en';
  const title = chapter[`title_${lang}`] || chapter.title_en;
  const description = chapter[`description_${lang}`] || chapter.description_en;
  const topicCount = chapter.topicCount ?? chapter.topics?.length ?? 0;
  const completed = progress?.completed;
  const accuracy =
    progress?.attempted > 0 ? Math.round((progress.correct / progress.attempted) * 100) : null;

  return (
    <Link
      to={`/syllabus/${chapter._id}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-colors hover:border-brand-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-500/40"
    >
      <span className={cn('absolute inset-y-0 left-0 w-1', chapterGradient(chapter.chapterNumber))} aria-hidden="true" />

      <div className="flex items-start justify-between pb-3 pl-5 pr-5 pt-4">
        <span className="flex size-9 items-center justify-center rounded-md bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
          <ChapterIcon name={chapter.icon} className="size-[18px]" />
        </span>
        <div className="flex flex-col items-end gap-1.5">
          {completed && (
            <Badge className="bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400">
              <CheckCircle2 className="size-3" aria-hidden="true" /> {t('syllabus.completed')}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex-1 pl-5 pr-5">
        <h3 className="text-sm font-bold leading-snug text-slate-900 dark:text-zinc-100">
          <span className="mr-1.5 font-mono text-xs font-bold text-brand-600 dark:text-brand-400">
            {String(chapter.chapterNumber).padStart(2, '0')}
          </span>
          {title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-slate-500 dark:text-zinc-400">
          {description}
        </p>

        {progress?.attempted > 0 && !completed && (
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-[11px] font-medium text-slate-400 dark:text-zinc-500">
              <span>{t('syllabus.inProgress')}</span>
              {accuracy !== null && <span>{t('syllabus.accuracy', { value: accuracy })}</span>}
            </div>
            <ProgressBar value={Math.min(100, accuracy ?? 0)} className="h-1" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 px-5 py-2.5 text-xs font-medium dark:border-zinc-800">
        <span className="text-slate-500 dark:text-zinc-400">
          {t('syllabus.weightage', { count: chapter.weightage })} · {t('syllabus.topicsCount', { count: topicCount })}
        </span>
        <span className="inline-flex items-center gap-1 text-brand-700 group-hover:underline dark:text-brand-400">
          {t('syllabus.viewChapter')} <ArrowRight className="size-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
