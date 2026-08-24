import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/cn';

/**
 * CBT-style question palette (NTA/iON pattern).
 * status(i): 'answered' | 'marked' | 'answered-marked' | 'current' | 'unvisited'
 */
export default function QuestionPalette({
  count,
  currentIndex,
  answers,
  markedSet,
  visitedSet,
  onJump,
  className,
}) {
  const { t } = useTranslation();

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <nav aria-label={t('quiz.palette')} className="grid grid-cols-5 gap-1.5 sm:grid-cols-8 lg:grid-cols-5">
        {Array.from({ length: count }, (_, i) => {
          const answered = answers[i] != null;
          const marked = markedSet.has(i);
          const visited = visitedSet.has(i);
          const current = i === currentIndex;
          const label = String(i + 1).padStart(2, '0');
          return (
            <button
              key={i}
              onClick={() => onJump(i)}
              aria-label={`${t('quiz.question')} ${i + 1}${marked ? ` · ${t('quiz.legendMarked')}` : ''}`}
              aria-current={current ? 'true' : undefined}
              className={cn(
                'relative h-9 rounded-md text-xs font-bold tabular-nums transition-colors',
                answered
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : visited
                    ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-500/15 dark:text-rose-300'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-400',
                marked && 'ring-2 ring-violet-500 ring-offset-1 dark:ring-offset-zinc-900',
                current && 'outline outline-2 outline-offset-2 outline-slate-900 dark:outline-white',
              )}
            >
              {label}
              {marked && (
                <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-violet-500" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </nav>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] font-medium text-slate-500 dark:text-zinc-400">
        <Legend cls="bg-emerald-600" label={t('quiz.legendAnswered')} n={countIndices(count, (i) => answers[i] != null)} />
        <Legend cls="bg-rose-300 dark:bg-rose-500/40" label={t('quiz.legendNotAnswered')} n={countIndices(count, (i) => answers[i] == null && visitedSet.has(i))} />
        <Legend cls="bg-violet-500" label={t('quiz.legendMarked')} n={markedSet.size} dot />
        <Legend cls="bg-slate-200 dark:bg-zinc-800" label={t('quiz.legendNotVisited')} n={countIndices(count, (i) => !visitedSet.has(i))} />
      </dl>
    </div>
  );
}

function Legend({ cls, label, n, dot }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn('inline-block size-3 shrink-0 rounded-sm', cls)} aria-hidden="true">
        {dot && <span className="mx-auto mt-[3px] block size-1 rounded-full bg-white" />}
      </span>
      <dt className="truncate">{label}</dt>
      <dd className="ml-auto tabular-nums font-bold">{n}</dd>
    </div>
  );
}

function countIndices(count, pred) {
  let n = 0;
  for (let i = 0; i < count; i++) if (pred(i)) n++;
  return n;
}
