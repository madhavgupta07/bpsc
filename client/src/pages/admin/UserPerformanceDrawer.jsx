import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Activity,
  BookOpenCheck,
  FileText,
  Flame,
  Target,
  TrendingUp,
  X,
} from 'lucide-react';
import { Skeleton } from '../../components/ui/Spinner';
import ProgressRing from '../../components/ui/ProgressRing';
import { adminApi } from '../../lib/api';
import { useLocaleDate } from '../../hooks/useLocalized';

/* ------------------------------------------------------------------ */
/*  User Performance Drawer                                            */
/*  Admins click a user (leaderboard / users list / overview) to open  */
/*  their full performance.                                            */
/* ------------------------------------------------------------------ */

export default function UserPerformanceDrawer({ userId, name, onClose }) {
  const fmtDate = useLocaleDate();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'user-performance', userId],
    queryFn: () => adminApi.userPerformance(userId),
    enabled: !!userId,
  });

  const stats = data?.stats;
  const user = data?.user;
  const chapterBreakdown = data?.chapterBreakdown ?? [];
  const recentQuizzes = data?.recentQuizzes ?? [];
  const recentMockTests = data?.recentMockTests ?? [];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col overflow-y-auto border-l border-slate-200/60 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-zinc-700/60 dark:bg-zinc-900/95"
        aria-modal="true"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
          <h2 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
            User Performance
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 p-5">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-20" />
              <Skeleton className="h-32" />
              <Skeleton className="h-40" />
            </div>
          ) : (
            <>
              {/* User card */}
              <div className="flex items-center gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xl font-extrabold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                  {user?.name?.charAt(0)?.toUpperCase() || '?'}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
                    {user?.name || name}
                  </h3>
                  <p className="truncate text-sm text-slate-500 dark:text-zinc-400">{user?.email}</p>
                  <p className="mt-0.5 text-xs text-slate-400 dark:text-zinc-500">
                    {user?.role} · joined {user ? fmtDate(user.createdAt) : ''}
                  </p>
                </div>
              </div>

              {/* Accuracy ring + Score */}
              <div className="flex items-center justify-around rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 dark:border-zinc-800 dark:from-zinc-800/60 dark:to-zinc-900">
                <ProgressRing value={stats?.accuracy ?? 0} size={104} stroke={8}>
                  <span className="text-lg font-extrabold tabular-nums text-slate-900 dark:text-zinc-100">
                    {stats?.accuracy ?? 0}%
                  </span>
                  <span className="text-[10px] font-medium text-slate-500 dark:text-zinc-400">
                    Accuracy
                  </span>
                </ProgressRing>
                <div className="text-center">
                  <p className="text-3xl font-extrabold tabular-nums text-brand-600 dark:text-brand-400">
                    {stats?.totalScore ?? 0}
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-zinc-400">Total score</p>
                  <p className="text-xs tabular-nums text-slate-400 dark:text-zinc-500">
                    / {stats?.totalQuestions ?? 0} questions
                  </p>
                </div>
              </div>

              {/* Stat chips */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <Stat icon={BookOpenCheck} label="Quizzes" value={stats?.quizzesTaken ?? 0} color="brand" />
                <Stat icon={FileText} label="Mock tests" value={stats?.testsTaken ?? 0} color="emerald" />
                <Stat icon={TrendingUp} label="Accuracy" value={`${stats?.accuracy ?? 0}%`} color="violet" />
                <Stat icon={Flame} label="Streak" value={`${stats?.streakDays ?? 0} d`} color="orange" />
                <Stat icon={Activity} label="Active" value={user?.stats?.lastActive ? fmtDate(user.stats.lastActive) : '—'} color="sky" />
              </div>

              {/* Chapter breakdown */}
              <section>
                <h4 className="mb-2.5 flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-zinc-100">
                  <Target className="size-4 text-brand-600" aria-hidden="true" /> Chapter breakdown
                </h4>
                {chapterBreakdown.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400 dark:border-zinc-700 dark:text-zinc-500">
                    No chapter activity yet.
                  </p>
                ) : (
                  <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/80">
                    {chapterBreakdown.slice(0, 8).map((c) => (
                      <li key={c.chapterId} className="flex items-center justify-between gap-3 px-4 py-2.5">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-slate-700 dark:text-zinc-200">
                            CH {String(c.chapterNumber).padStart(2, '0')} · {c.title_en}
                          </p>
                          <p className="text-[10px] text-slate-400 dark:text-zinc-500">
                            {c.attempts} quiz(zes)
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <span className={cnAcc(c.accuracy)}>{c.accuracy}%</span>
                          <p className="text-[10px] tabular-nums text-slate-400">
                            {c.score}/{c.total} marks
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              {/* Recent quizzes */}
              <HistorySection
                title="Recent quizzes"
                empty="No quiz attempts."
                items={recentQuizzes.map((q) => ({
                  name: q.chapterTitle_en,
                  sub: q.topicName_en,
                  score: q.score,
                  total: q.total,
                  date: q.date,
                }))}
                fmtDate={fmtDate}
              />

              {/* Recent mock tests */}
              <HistorySection
                title="Recent mock tests"
                empty="No mock test attempts."
                items={recentMockTests.map((m) => ({
                  name: m.testTitle_en,
                  score: m.score,
                  total: m.total,
                  date: m.date,
                }))}
                fmtDate={fmtDate}
              />
            </>
          )}
        </div>
      </motion.aside>
    </>
  );
}

const STAT_COLORS = {
  brand:
    'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300',
  emerald:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
  violet:
    'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300',
  orange:
    'bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300',
  sky: 'bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300',
};

function Stat({ icon: Icon, label, value, color }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-xl p-3 ${STAT_COLORS[color]}`}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/60 dark:bg-black/20">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[10px] font-medium opacity-75">{label}</p>
        <p className="truncate text-sm font-extrabold tabular-nums">{value}</p>
      </div>
    </div>
  );
}

function HistorySection({ title, items, empty, fmtDate }) {
  if (!items || items.length === 0) {
    return (
      <section>
        <h4 className="mb-2 flex text-sm font-bold text-slate-900 dark:text-zinc-100">{title}</h4>
        <p className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400 dark:border-zinc-700 dark:text-zinc-500">
          {empty}
        </p>
      </section>
    );
  }
  return (
    <section>
      <h4 className="mb-2 flex text-sm font-bold text-slate-900 dark:text-zinc-100">{title}</h4>
      <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/80">
        {items.map((entry, i) => {
          const pct = entry.total > 0 ? (entry.score / entry.total) * 100 : 0;
          const isGood = pct >= 70;
          return (
            <li key={i} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-slate-700 dark:text-zinc-200">
                  {entry.name || '—'}
                </p>
                {entry.sub && <p className="truncate text-[10px] text-slate-400">{entry.sub}</p>}
                <p className="text-[10px] text-slate-400 dark:text-zinc-500">{fmtDate(entry.date)}</p>
              </div>
              <span
                className={
                  'shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold tabular-nums ' +
                  (isGood
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400')
                }
              >
                {entry.score}/{entry.total}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function cnAcc(pct) {
  const base = 'shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums ';
  if (pct >= 70) return base + 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400';
  if (pct >= 40) return base + 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400';
  return base + 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400';
}