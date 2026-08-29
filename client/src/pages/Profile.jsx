import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { BookOpenCheck, FileText, Flame, Target, TrendingUp } from 'lucide-react';
import StatCard from '../components/common/StatCard';
import LanguageToggle from '../components/layout/LanguageToggle';
import ProgressRing from '../components/ui/ProgressRing';
import { Skeleton } from '../components/ui/Spinner';
import { progressApi } from '../lib/api';
import Seo from '../components/seo/Seo';
import { useAuth } from '../context/AuthContext';
import { useLocaleDate } from '../hooks/useLocalized';

export default function Profile() {
  const { t } = useTranslation();
  const fmtDate = useLocaleDate();
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['progress', 'stats'],
    queryFn: progressApi.stats,
  });

  const accuracy =
    stats?.totalAttempted > 0 ? Math.round((stats.totalCorrect / stats.totalAttempted) * 100) : 0;

  return (
    <div className="container-app max-w-4xl py-10">
      <Seo title="My Profile" noIndex path="/profile" />
      {/* Header card */}
      <header className="flex flex-col items-center gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:text-left dark:border-zinc-800 dark:bg-zinc-900">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-slate-900 text-2xl font-extrabold text-white dark:bg-white dark:text-zinc-900">
          {user?.name?.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h1 className="truncate text-2xl font-extrabold tracking-tight">{user?.name}</h1>
          <p className="mt-0.5 truncate text-sm text-slate-500 dark:text-zinc-400">{user?.email}</p>
          <p className="mt-1 text-xs text-slate-400 dark:text-zinc-500">
            {t('profile.memberSince', { date: fmtDate(user?.createdAt ?? Date.now()) })}
          </p>
        </div>
        <ProgressRing value={accuracy} size={92} stroke={8}>
          <span className="text-base font-extrabold tabular-nums">{accuracy}%</span>
        </ProgressRing>
      </header>

      {/* Stats */}
      <section aria-label={t('profile.title')} className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-[76px]" />)
        ) : (
          <>
            <StatCard icon={BookOpenCheck} label={t('profile.statsTotalAttempted')} value={stats?.totalAttempted ?? 0} index={0} />
            <StatCard icon={Target} label={t('profile.statsAccuracy')} value={`${accuracy}%`} index={1} />
            <StatCard icon={TrendingUp} label={t('profile.statsAvgScore')} value={`${stats?.avgScore ?? 0}%`} index={2} />
            <StatCard icon={FileText} label={t('profile.statsQuizzesTaken')} value={stats?.quizzesTaken ?? 0} index={3} />
            <StatCard
              icon={Flame}
              label={t('profile.statsStreak')}
              value={
                user?.stats?.streakDays > 0
                  ? user.stats.streakDays === 1
                    ? t('profile.streakUnit', { days: 1 })
                    : t('profile.streakUnitPlural', { days: user.stats.streakDays })
                  : '0'
              }
              index={4}
            />
            <StatCard
              icon={Flame}
              label={t('profile.statsLongestStreak')}
              value={user?.stats?.longestStreak ?? 0}
              index={5}
            />
          </>
        )}
      </section>

      {/* Language preference */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-bold">{t('profile.languagePreference')}</h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-zinc-400">
              {t('profile.languagePreferenceDesc')}
            </p>
          </div>
          <LanguageToggle showIcon />
        </div>
      </section>

      {/* History */}
      <HistorySection />
    </div>
  );
}

function HistorySection() {
  const { t } = useTranslation();
  const fmtDate = useLocaleDate();
  const { data: progress } = useQuery({ queryKey: ['progress'], queryFn: progressApi.get });

  const quizzes = [...(progress?.quizHistory ?? [])].reverse().slice(0, 8);
  const mocks = [...(progress?.mockTestHistory ?? [])].reverse().slice(0, 8);
  const empty = quizzes.length === 0 && mocks.length === 0;

  if (empty) {
    return (
      <p className="mt-6 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-400 dark:border-zinc-700 dark:text-zinc-500">
        {t('profile.noHistory')}
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mt-6 grid gap-6 lg:grid-cols-2"
    >
      {[['profile.recentQuizzes', quizzes], ['profile.recentMockTests', mocks]].map(([key, items]) =>
        items.length > 0 ? (
          <section key={key} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-sm font-bold">{t(key)}</h2>
            <ul className="mt-3 divide-y divide-slate-100 dark:divide-zinc-800">
              {items.map((entry, i) => (
                <li key={i} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold">
                      {entry.test ? entry.test?.title_en : entry.chapter?.title_en || '—'}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-zinc-500">{fmtDate(entry.date)}</p>
                  </div>
                  <span
                    className={
                      'shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold tabular-nums ' +
                      (entry.total > 0 && entry.score / entry.total >= 0.7
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400')
                    }
                  >
                    {t('profile.scoreOf', { score: entry.score, total: entry.total })}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null,
      )}
    </motion.div>
  );
}
