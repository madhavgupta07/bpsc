import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, BookOpenText, ChevronRight, PlayCircle } from 'lucide-react';import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Skeleton } from '../components/ui/Spinner';
import ProgressBar from '../components/ui/ProgressBar';
import { ChapterIcon, chapterGradient } from '../components/chapters/icons';
import { chaptersApi } from '../lib/api';
import Seo from '../components/seo/Seo';
import { difficultyKey, useDifficultyStyles, useLocalized, useLocaleNumber } from '../hooks/useLocalized';
import { cn } from '../lib/cn';

export default function ChapterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const pick = useLocalized();
  const fmt = useLocaleNumber();
  const diffStyles = useDifficultyStyles();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['chapters', id],
    queryFn: () => chaptersApi.get(id),
  });

  if (isLoading) {
    return (
      <div className="container-app space-y-4 py-10">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-32" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    );
  }

  if (isError || !data?.chapter) {
    return (
      <div className="container-app py-16 text-center">
        <p className="text-sm text-slate-500">{t('common.error')}</p>
      </div>
    );
  }

  const { chapter, topics } = data;
  const totalQuestions = topics.reduce((s, tp) => s + (tp.questionCount ?? 0), 0);

  return (
    <div className="container-app max-w-4xl py-10">
      <Seo
        title={`${pick(chapter, 'title')} — Bihar STET CS Chapter ${chapter.chapterNumber}`}
        description={`${pick(chapter, 'description') || pick(chapter, 'title')} — ${topics.length} topics, ${totalQuestions} practice questions. Complete notes & quizzes for Bihar STET Computer Science.`}
        path={`/syllabus/${id}`}
        keywords={`${chapter.title_en}, ${chapter.title_hi}, Bihar STET ${chapter.title_en}, STET CS Chapter ${chapter.chapterNumber}, ${chapter.title_en} notes`}
        jsonLd={[{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: `${chapter.title_en} — Bihar STET CS`,
          description: chapter.description_en || `Study material for ${chapter.title_en}`,
          provider: { '@type': 'Organization', name: 'Bihar STET CS' },
          inLanguage: ['en', 'hi'],
          isAccessibleForFree: true,
        }]}
      />
      <button
        onClick={() => navigate('/syllabus')}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> {t('chapter.backToSyllabus')}
      </button>

      {/* Chapter hero */}
      <header className="mt-5 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-start dark:border-zinc-800 dark:bg-zinc-900">
        <span
          className={cn(
            'flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg',
            chapterGradient(chapter.chapterNumber),
          )}
        >
          <ChapterIcon name={chapter.icon} className="size-7" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-500">
            CH {String(chapter.chapterNumber).padStart(2, '0')}
            <Badge>{t(`syllabus.${chapter.section}`)}</Badge>
          </div>
          <h1 className="mt-1.5 text-2xl font-extrabold tracking-tight">{pick(chapter, 'title')}</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
            {pick(chapter, 'description')}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-slate-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <BookOpenText className="size-4 text-brand-500" aria-hidden="true" />
              {t('syllabus.topicsCount', { count: topics.length })} ·{' '}
              {t('syllabus.questionsCount', { count: totalQuestions })}
            </span>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button as={Link} to={`/quiz/chapter/${chapter._id}`} size="md">
              <PlayCircle className="size-4" aria-hidden="true" /> {t('chapter.chapterQuiz')}
            </Button>
            <Button as={Link} to={`/notes/${chapter.chapterNumber}`} variant="outline" size="md">
              <BookOpenText className="size-4" aria-hidden="true" /> {t('notes.readChapter')}
            </Button>
          </div>
        </div>
      </header>

      {/* Topics */}
      <h2 className="mt-10 text-lg font-extrabold tracking-tight">{t('chapter.topics')}</h2>
      <ul className="mt-4 space-y-3">
        {topics.map((topic, i) => (
          <li
            key={topic._id}
            className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-brand-200 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-500/30"
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold tabular-nums text-slate-300 dark:text-zinc-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-sm font-bold">{pick(topic, 'name')}</h3>
                <Badge className={diffStyles[difficultyKey(topic.difficulty)]}>
                  {t(`chapter.difficulty.${difficultyKey(topic.difficulty)}`)}
                </Badge>
              </div>
              <p className="mt-1 line-clamp-1 pl-7 text-xs text-slate-500 dark:text-zinc-400">
                {pick(topic, 'description')}
              </p>
              <div className="mt-2 pl-7 sm:max-w-xs">
                <ProgressBar value={Math.min(100, (topic.questionCount / 30) * 100)} className="h-1" />
                <span className="mt-1 block text-[11px] font-medium text-slate-400 dark:text-zinc-500">
                  {t('syllabus.questionsCount', { count: topic.questionCount })}
                </span>
              </div>
            </div>
            <Link
              to={`/quiz/topic/${topic._id}`}
              className="inline-flex shrink-0 items-center justify-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold text-brand-600 ring-1 ring-inset ring-brand-200 transition-all hover:bg-brand-50 active:scale-[0.98] sm:mr-1 dark:text-brand-400 dark:ring-brand-500/30 dark:hover:bg-brand-500/10"
            >
              {t('chapter.practiceTopic')} <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>

      {topics.length === 0 && (
        <p className="mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-400 dark:border-zinc-700 dark:text-zinc-500">
          {t('chapter.noTopics')}
        </p>
      )}
    </div>
  );
}
