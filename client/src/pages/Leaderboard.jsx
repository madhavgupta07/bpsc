import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Crown, Flame, Medal, Trophy } from 'lucide-react';
import Seo from '../components/seo/Seo';
import { Skeleton } from '../components/ui/Spinner';
import { leaderboardApi } from '../lib/api';
import { asArray } from '../lib/apiClient';
import { cn } from '../lib/cn';

const PODIUM_STYLES = [
  'from-amber-400 to-yellow-500 text-amber-950', // 1st — gold
  'from-slate-300 to-slate-400 text-slate-900', // 2nd — silver
  'from-orange-300 to-amber-600 text-orange-950', // 3rd — bronze
];

function Avatar({ name, avatar, className }) {
  return avatar ? (
    <img src={avatar} alt="" referrerPolicy="no-referrer" className={cn('rounded-full object-cover', className)} />
  ) : (
    <span
      className={cn(
        'flex items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300',
        className,
      )}
    >
      {name?.charAt(0)?.toUpperCase() || '?'}
    </span>
  );
}

export default function Leaderboard() {
  const { t } = useTranslation();
  const [scope, setScope] = useState('overall');

  const { data, isLoading } = useQuery({
    queryKey: ['leaderboard', scope],
    queryFn: () => leaderboardApi.list(scope),
    select: (d) => asArray(d?.leaderboard),
  });

  const rows = data || [];
  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);

  return (
    <div className="container-app max-w-3xl py-10">
      <Seo
        title="Leaderboard"
        description="See the top scorers of Bihar STET Computer Science practice quizzes and mock tests. Compete, climb the ranks and keep your streak alive."
        path="/leaderboard"
      />

      {/* Header */}
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight">
          <Trophy className="size-7 text-amber-500" aria-hidden="true" /> {t('leaderboard.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400">{t('leaderboard.subtitle')}</p>
      </header>

      {/* Scope toggle */}
      <div className="mx-auto mt-6 flex w-fit rounded-xl border border-slate-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
        {['overall', 'weekly'].map((s) => (
          <button
            key={s}
            onClick={() => setScope(s)}
            aria-pressed={scope === s}
            className={cn(
              'rounded-lg px-5 py-1.5 text-sm font-semibold transition-colors',
              scope === s
                ? 'bg-brand-600 text-white'
                : 'text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100',
            )}
          >
            {t(`leaderboard.${s}`)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="mt-8 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-400 dark:border-zinc-700 dark:text-zinc-500">
          {t('leaderboard.empty')}
        </p>
      ) : (
        <>
          {/* Podium */}
          <div className="mt-8 grid grid-cols-3 items-end gap-3">
            {[top3[1], top3[0], top3[2]].map((row, pos) => {
              if (!row) return <div key={pos} />;
              const rank = row === top3[0] ? 0 : row === top3[1] ? 1 : 2;
              const heights = ['h-24', 'h-32', 'h-20'];
              return (
                <motion.div
                  key={row.userId}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: rank * 0.08 }}
                  className={cn('flex flex-col items-center gap-2', rank === 0 && 'order-first sm:order-none')}
                >
                  <div className="relative">
                    {rank === 0 && (
                      <Crown className="absolute -top-5 left-1/2 size-5 -translate-x-1/2 text-amber-500" aria-hidden="true" />
                    )}
                    <Avatar name={row.name} avatar={row.avatar} className={rank === 0 ? 'size-14' : 'size-11'} />
                  </div>
                  <p className="max-w-full truncate text-xs font-bold">{row.name}</p>
                  <div
                    className={cn(
                      'flex w-full flex-col items-center justify-start rounded-t-xl pt-2',
                      heights[[0, 1, 2].indexOf(rank)],
                      PODIUM_STYLES[rank],
                    )}
                  >
                    <Medal className="mb-1 size-4 opacity-70" aria-hidden="true" />
                    <span className="text-lg font-extrabold leading-none tabular-nums">#{rank + 1}</span>
                    <span className="mt-0.5 text-[11px] font-bold tabular-nums">{row.totalScore}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Table */}
          <ol className="mt-8 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
            {rest.map((row, i) => (
              <li key={row.userId} className="flex items-center gap-3 px-4 py-3">
                <span className="w-7 shrink-0 text-sm font-extrabold tabular-nums text-slate-400 dark:text-zinc-500">
                  {i + 4}
                </span>
                <Avatar name={row.name} avatar={row.avatar} className="size-8 shrink-0 text-sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{row.name}</p>
                  <p className="text-[11px] text-slate-400 dark:text-zinc-500">
                    {t('leaderboard.quizzes')}: {row.quizzesTaken} · {t('leaderboard.tests')}: {row.testsTaken}
                    {row.streakDays > 0 && (
                      <span className="ml-1 inline-flex items-center gap-0.5 font-semibold text-orange-500">
                        <Flame className="size-3" aria-hidden="true" />
                        {row.streakDays}
                      </span>
                    )}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-extrabold tabular-nums">{row.totalScore}</p>
                  <p className="text-[11px] tabular-nums text-slate-400 dark:text-zinc-500">{row.accuracy}%</p>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
