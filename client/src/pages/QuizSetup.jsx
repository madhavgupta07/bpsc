import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Dices, ListChecks } from 'lucide-react';
import Button from '../components/ui/Button';
import { Skeleton } from '../components/ui/Spinner';
import { chaptersApi } from '../lib/api';
import { usePageTitle } from '../hooks/useDocumentLocale';
import { useLocalized, useLocaleNumber } from '../hooks/useLocalized';
import { cn } from '../lib/cn';

const COUNTS = [10, 20, 30];
const MODES = { random: 'random', chapter: 'chapter', topic: 'topic' };

export default function QuizSetup() {
  const { t } = useTranslation();
  const pick = useLocalized();
  const fmt = useLocaleNumber();
  const navigate = useNavigate();
  usePageTitle(t('quiz.setupTitle'));

  const [source, setSource] = useState('random');
  const [chapterId, setChapterId] = useState('');
  const [topicId, setTopicId] = useState('');
  const [count, setCount] = useState(10);

  const { data: chapters = [], isLoading } = useQuery({
    queryKey: ['chapters'],
    queryFn: chaptersApi.list,
  });

  const selectedChapter = useMemo(
    () => chapters.find((c) => c._id === chapterId),
    [chapters, chapterId],
  );
  const selectedTopic = selectedChapter?.topics?.find((tp) => tp._id === topicId);

  const canStart =
    (source === 'random') || (source === 'chapter' && chapterId) || (source === 'topic' && topicId);

  const start = () => {
    if (!canStart) return;
    // Fullscreen must be requested inside this user gesture.
    document.documentElement.requestFullscreen?.().catch(() => {});
    if (source === MODES.random) return navigate(`/quiz/random`);
    if (source === MODES.chapter)
      return navigate(`/quiz/chapter/${chapterId}`, { state: { count } });
    return navigate(`/quiz/topic/${topicId}`, { state: { count } });
  };

  const sourceOptions = [
    {
      key: 'random',
      icon: Dices,
      title: t('quiz.randomMix'),
      desc: t('quiz.randomMixDesc'),
    },
    {
      key: 'chapter',
      icon: ListChecks,
      title: t('nav.syllabus'),
      desc: t('quiz.selectChapter'),
    },
  ];

  return (
    <div className="container-app max-w-xl py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">{t('quiz.setupTitle')}</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">{t('quiz.chooseSource')}</p>

      {/* Source selector */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        {sourceOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => {
              setSource(opt.key);
              setTopicId('');
            }}
            aria-pressed={source === opt.key}
            className={cn(
              'flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all active:scale-[0.98]',
              source === opt.key
                ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500 dark:bg-brand-500/10'
                : 'border-slate-200 bg-white hover:border-brand-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-500/40',
            )}
          >
            <span
              className={cn(
                'flex size-9 items-center justify-center rounded-xl',
                source === opt.key
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-400 dark:bg-zinc-800 dark:text-zinc-500',
              )}
            >
              <opt.icon className="size-4" aria-hidden="true" />
            </span>
            <span className="text-sm font-bold">{opt.title}</span>
            <span className="text-xs leading-snug text-slate-500 dark:text-zinc-400">{opt.desc}</span>
          </button>
        ))}
      </div>

      {/* Chapter select */}
      {source === 'chapter' && (
        <div className="mt-5 space-y-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div>
            <label htmlFor="chapter" className="mb-1.5 block text-sm font-semibold">
              {t('quiz.selectChapter')}
            </label>
            <select
              id="chapter"
              value={chapterId}
              onChange={(e) => {
                setChapterId(e.target.value);
                setTopicId('');
              }}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-brand-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
            >
              <option value="">—</option>
              {(isLoading ? [] : chapters).map((c) => (
                <option key={c._id} value={c._id}>
                  {c.chapterNumber}. {pick(c, 'title')}
                </option>
              ))}
            </select>
          </div>

          {selectedChapter?.topics?.length > 0 && (
            <>
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-slate-200 dark:bg-zinc-700" />
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  {t('quiz.selectTopic')}
                </span>
                <span className="h-px flex-1 bg-slate-200 dark:bg-zinc-700" />
              </div>
              <select
                id="topic"
                value={topicId}
                onChange={(e) => setTopicId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm focus:border-brand-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
              >
                <option value="">{t('quiz.allTopics')}</option>
                {selectedChapter.topics.map((tp) => (
                  <option key={tp._id} value={tp._id}>
                    {pick(tp, 'name')} ({fmt(tp.questionCount)} )
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      )}

      {/* Count selector */}
      <fieldset className="mt-5">
        <legend className="mb-2 block text-sm font-semibold">{t('quiz.questionCount')}</legend>
        <div className="grid grid-cols-3 gap-3" role="radiogroup">
          {COUNTS.map((n) => (
            <button
              key={n}
              role="radio"
              aria-checked={count === n}
              onClick={() => setCount(n)}
              className={cn(
                'rounded-xl border py-2.5 text-center font-bold tabular-nums transition-all active:scale-[0.97]',
                count === n
                  ? 'border-brand-500 bg-brand-600 text-white shadow-md shadow-brand-600/25'
                  : 'border-slate-200 bg-white hover:border-brand-300 dark:border-zinc-800 dark:bg-zinc-900',
              )}
            >
              {fmt(n)}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Exam rules */}
      <aside className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/5">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-800 dark:text-amber-400">
          {t('quiz.rulesTitle')}
        </p>
        <ul className="mt-1.5 list-inside list-disc space-y-0.5 text-xs leading-relaxed text-amber-800/90 dark:text-amber-300/90">
          <li>{t('quiz.ruleFullscreen')}</li>
          <li>{t('quiz.ruleTabs')}</li>
          <li>{t('quiz.ruleBack')}</li>
        </ul>
      </aside>

      <Button size="lg" disabled={!canStart} onClick={start} className="mt-7 w-full">
        {t('quiz.start')}
      </Button>

      {!canStart && source !== 'random' && (
        <p className="mt-3 text-center text-xs text-slate-400">{t('quiz.selectChapter')}</p>
      )}
    </div>
  );
}
