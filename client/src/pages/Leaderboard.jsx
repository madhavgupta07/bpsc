import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookOpenCheck,
  Crown,
  FileText,
  Flame,
  Medal,
  Target,
  TrendingUp,
  Trophy,
  X,
} from 'lucide-react';
import Seo from '../components/seo/Seo';
import ProgressRing from '../components/ui/ProgressRing';
import { Skeleton } from '../components/ui/Spinner';
import { leaderboardApi } from '../lib/api';
import { asArray } from '../lib/apiClient';
import { cn } from '../lib/cn';
import { useAuth } from '../context/AuthContext';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const TOP_N = 10;

const PODIUM_STYLES = [
  'from-amber-400 to-yellow-500', // 1st — gold
  'from-slate-300 to-slate-400',  // 2nd — silver
  'from-orange-300 to-amber-600', // 3rd — bronze
];

const PODIUM_TEXT = [
  'text-amber-950 dark:text-amber-100',
  'text-slate-900 dark:text-slate-100',
  'text-orange-950 dark:text-orange-100',
];

const RANK_BADGES = [
  'bg-gradient-to-br from-amber-400 to-yellow-500 text-amber-950',
  'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-900',
  'bg-gradient-to-br from-orange-300 to-amber-600 text-orange-950',
];

/* ------------------------------------------------------------------ */
/*  Avatar                                                            */
/* ------------------------------------------------------------------ */

function Avatar({ name, avatar, className }) {
  return avatar ? (
    <img
      src={avatar}
      alt=""
      referrerPolicy="no-referrer"
      className={cn('rounded-full object-cover', className)}
    />
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

/* ------------------------------------------------------------------ */
/*  Highlighted "You" row (reused for both in-list & bottom strip)    */
/* ------------------------------------------------------------------ */

const YOU_ROW_BASE =
  'relative flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer';
const YOU_HIGHLIGHT =
  'bg-brand-50 ring-2 ring-inset ring-brand-500/30 dark:bg-brand-500/10 dark:ring-brand-400/25';

/* ------------------------------------------------------------------ */
/*  User Profile Drawer                                               */
/* ------------------------------------------------------------------ */

function ProfileDrawer({ userId, rank, onClose }) {
  const { t, i18n } = useTranslation();
  const isHi = i18n.language === 'hi';

  const { data, isLoading } = useQuery({
    queryKey: ['leaderboard-user', userId],
    queryFn: () => leaderboardApi.userProfile(userId),
    enabled: !!userId,
  });

  const stats = data?.stats;
  const user = data?.user;
  const recentQuizzes = data?.recentQuizzes ?? [];
  const recentMockTests = data?.recentMockTests ?? [];

  const fmtDate = (d) => {
    try {
      return new Date(d).toLocaleDateString(isHi ? 'hi-IN' : 'en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return '—';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col overflow-y-auto border-l border-slate-200/60 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-zinc-700/60 dark:bg-zinc-900/95"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/90">
          <h2 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
            {t('leaderboard.profileTitle')}
          </h2>
          <button
            onClick={onClose}
            aria-label={t('leaderboard.close')}
            className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 p-5">
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="size-16 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
          ) : (
            <>
              {/* User card */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar name={user?.name} avatar={user?.avatar} className="size-16" />
                  {rank <= 3 && (
                    <span
                      className={cn(
                        'absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full text-xs font-extrabold shadow-md',
                        RANK_BADGES[rank - 1],
                      )}
                    >
                      #{rank}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
                    {user?.name}
                  </h3>
                  {rank > 3 && (
                    <p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">
                      {t('leaderboard.rank')} #{rank}
                    </p>
                  )}
                </div>
              </div>

              {/* Accuracy ring + Score */}
              <div className="flex items-center justify-around rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 dark:border-zinc-800 dark:from-zinc-800/60 dark:to-zinc-900">
                <ProgressRing value={stats?.accuracy ?? 0} size={100} stroke={8}>
                  <span className="text-lg font-extrabold tabular-nums text-slate-900 dark:text-zinc-100">
                    {stats?.accuracy ?? 0}%
                  </span>
                  <span className="text-[10px] font-medium text-slate-500 dark:text-zinc-400">
                    {t('leaderboard.accuracy')}
                  </span>
                </ProgressRing>
                <div className="space-y-1 text-center">
                  <p className="text-3xl font-extrabold tabular-nums text-brand-600 dark:text-brand-400">
                    {stats?.totalScore ?? 0}
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-zinc-400">
                    {t('leaderboard.totalScore')}
                  </p>
                  <p className="text-xs tabular-nums text-slate-400 dark:text-zinc-500">
                    / {stats?.totalQuestions ?? 0} {t('leaderboard.totalQuestions').toLowerCase()}
                  </p>
                </div>
              </div>

              {/* Stat chips */}
              <div className="grid grid-cols-2 gap-3">
                <StatChip
                  icon={BookOpenCheck}
                  label={t('leaderboard.quizzes')}
                  value={stats?.quizzesTaken ?? 0}
                  color="brand"
                />
                <StatChip
                  icon={FileText}
                  label={t('leaderboard.tests')}
                  value={stats?.testsTaken ?? 0}
                  color="emerald"
                />
                <StatChip
                  icon={TrendingUp}
                  label={t('leaderboard.avgQuizScore')}
                  value={`${stats?.avgQuizScore ?? 0}%`}
                  color="violet"
                />
                <StatChip
                  icon={Flame}
                  label={t('leaderboard.streak')}
                  value={`${stats?.streakDays ?? 0} ${t('leaderboard.days')}`}
                  color="orange"
                />
              </div>

              {/* Recent Quizzes */}
              <HistoryList
                title={t('leaderboard.recentQuizzes')}
                items={recentQuizzes}
                emptyText={t('leaderboard.noQuizzes')}
                nameKey={isHi ? 'chapterTitle_hi' : 'chapterTitle_en'}
                subKey={isHi ? 'topicName_hi' : 'topicName_en'}
                fmtDate={fmtDate}
                t={t}
              />

              {/* Recent Mock Tests */}
              <HistoryList
                title={t('leaderboard.recentMockTests')}
                items={recentMockTests}
                emptyText={t('leaderboard.noMockTests')}
                nameKey={isHi ? 'testTitle_hi' : 'testTitle_en'}
                fmtDate={fmtDate}
                t={t}
              />
            </>
          )}
        </div>
      </motion.aside>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat Chip (inside drawer)                                         */
/* ------------------------------------------------------------------ */

const CHIP_COLORS = {
  brand:
    'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300 [&_.chip-icon]:bg-brand-100 [&_.chip-icon]:text-brand-600 dark:[&_.chip-icon]:bg-brand-500/20 dark:[&_.chip-icon]:text-brand-400',
  emerald:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 [&_.chip-icon]:bg-emerald-100 [&_.chip-icon]:text-emerald-600 dark:[&_.chip-icon]:bg-emerald-500/20 dark:[&_.chip-icon]:text-emerald-400',
  violet:
    'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300 [&_.chip-icon]:bg-violet-100 [&_.chip-icon]:text-violet-600 dark:[&_.chip-icon]:bg-violet-500/20 dark:[&_.chip-icon]:text-violet-400',
  orange:
    'bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300 [&_.chip-icon]:bg-orange-100 [&_.chip-icon]:text-orange-600 dark:[&_.chip-icon]:bg-orange-500/20 dark:[&_.chip-icon]:text-orange-400',
};

function StatChip({ icon: Icon, label, value, color }) {
  return (
    <div className={cn('flex items-center gap-3 rounded-xl p-3.5', CHIP_COLORS[color])}>
      <span className="chip-icon flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-4.5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-medium opacity-75">{label}</p>
        <p className="text-base font-extrabold tabular-nums">{value}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  History List (inside drawer)                                      */
/* ------------------------------------------------------------------ */

function HistoryList({ title, items, emptyText, nameKey, subKey, fmtDate, t }) {
  if (!items || items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400 dark:border-zinc-700 dark:text-zinc-500">
        {emptyText}
      </div>
    );
  }

  return (
    <section>
      <h4 className="mb-2.5 text-sm font-bold text-slate-900 dark:text-zinc-100">{title}</h4>
      <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/80">
        {items.map((entry, i) => {
          const pct = entry.total > 0 ? (entry.score / entry.total) * 100 : 0;
          const isGood = pct >= 70;
          return (
            <li key={i} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-slate-700 dark:text-zinc-200">
                  {entry[nameKey] || '—'}
                </p>
                {subKey && entry[subKey] && (
                  <p className="truncate text-[10px] text-slate-400 dark:text-zinc-500">
                    {entry[subKey]}
                  </p>
                )}
                <p className="text-[10px] text-slate-400 dark:text-zinc-500">{fmtDate(entry.date)}</p>
              </div>
              <span
                className={cn(
                  'shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold tabular-nums',
                  isGood
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
                )}
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

/* ------------------------------------------------------------------ */
/*  Leaderboard Row (shared between table rows & "your rank" strip)   */
/* ------------------------------------------------------------------ */

function LeaderboardRow({ row, rank, isYou, onClick, t }) {
  return (
    <li
      className={cn(
        YOU_ROW_BASE,
        isYou ? YOU_HIGHLIGHT : 'hover:bg-slate-50 dark:hover:bg-zinc-800/60',
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      title={t('leaderboard.viewProfile')}
    >
      <span className="w-7 shrink-0 text-sm font-extrabold tabular-nums text-slate-400 dark:text-zinc-500">
        {rank}
      </span>
      <Avatar name={row.name} avatar={row.avatar} className="size-8 shrink-0 text-sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900 dark:text-zinc-100">
          {row.name}
          {isYou && (
            <span className="ml-1.5 inline-block rounded-md bg-brand-600 px-1.5 py-0.5 text-[10px] font-bold text-white dark:bg-brand-500">
              {t('leaderboard.you')}
            </span>
          )}
        </p>
        <p className="text-[11px] text-slate-500 dark:text-zinc-400">
          {t('leaderboard.quizzes')}: {row.quizzesTaken} · {t('leaderboard.tests')}: {row.testsTaken}
          {row.streakDays > 0 && (
            <span className="ml-1 inline-flex items-center gap-0.5 font-semibold text-orange-500 dark:text-orange-400">
              <Flame className="size-3" aria-hidden="true" />
              {row.streakDays}
            </span>
          )}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-sm font-extrabold tabular-nums text-slate-900 dark:text-zinc-100">{row.totalScore}</p>
        <p className="text-[11px] tabular-nums text-slate-500 dark:text-zinc-400">{row.accuracy}%</p>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Leaderboard Page                                             */
/* ------------------------------------------------------------------ */

export default function Leaderboard() {
  const { t } = useTranslation();
  const { user: authUser } = useAuth();
  const [scope, setScope] = useState('overall');
  const [selectedUser, setSelectedUser] = useState(null); // { userId, rank }

  const { data, isLoading } = useQuery({
    queryKey: ['leaderboard', scope],
    queryFn: () => leaderboardApi.list(scope, TOP_N),
    select: (d) => ({
      rows: asArray(d?.leaderboard),
      currentUser: d?.currentUser ?? null,
    }),
  });

  const rows = data?.rows || [];
  const currentUser = data?.currentUser ?? null;
  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3); // ranks 4–10

  // Is the authenticated user inside the visible top N?
  const myId = authUser?._id;
  const isMyIdInTop = myId && rows.some((r) => r.userId === myId);

  // Should we show the "your rank" strip at the bottom?
  // Only when: user is authenticated, has a rank, and that rank is outside top N.
  const showYourRank = currentUser && currentUser.rank > TOP_N && !isMyIdInTop;

  const openProfile = (userId, rank) => setSelectedUser({ userId, rank });

  return (
    <div className="container-app max-w-3xl py-10">
      <Seo
        title="Leaderboard — Bihar STET & BPSC CS Top Scorers"
        description="See the top scorers of Bihar STET & BPSC TRE Computer Science practice quizzes and mock tests. Compete, climb the ranks and keep your streak alive."
        path="/leaderboard"
        keywords="Bihar STET leaderboard, BPSC TRE CS rankings, STET CS leaderboard, mock test results, Bihar STET top scorers"
      />

      {/* Header */}
      <header className="flex flex-col items-center gap-2 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-1 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/20"
        >
          <Trophy className="size-7 text-amber-950" aria-hidden="true" />
        </motion.div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          {t('leaderboard.title')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400">{t('leaderboard.subtitle')}</p>
      </header>

      {/* Scope toggle */}
      <div className="mx-auto mt-6 flex w-fit rounded-xl border border-slate-200 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900">
        {['overall', 'weekly'].map((s) => (
          <button
            key={s}
            onClick={() => setScope(s)}
            aria-pressed={scope === s}
            className={cn(
              'rounded-lg px-5 py-1.5 text-sm font-semibold transition-all',
              scope === s
                ? 'bg-brand-600 text-white shadow-sm'
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
          {/* ───── Podium (top 3) ───── */}
          <div className="mt-8 grid grid-cols-3 items-end gap-3">
            {[top3[1], top3[0], top3[2]].map((row, pos) => {
              if (!row) return <div key={pos} />;
              const rank = row === top3[0] ? 0 : row === top3[1] ? 1 : 2;
              const heights = ['h-24', 'h-32', 'h-20'];
              const isYou = myId && row.userId === myId;
              return (
                <motion.div
                  key={row.userId}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: rank * 0.08 }}
                  className={cn(
                    'group flex cursor-pointer flex-col items-center gap-2',
                    rank === 0 && 'order-first sm:order-none',
                  )}
                  onClick={() => openProfile(row.userId, rank + 1)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openProfile(row.userId, rank + 1)}
                  title={t('leaderboard.viewProfile')}
                >
                  <div className="relative transition-transform duration-200 group-hover:scale-110">
                    {rank === 0 && (
                      <Crown className="absolute -top-5 left-1/2 size-5 -translate-x-1/2 text-amber-500" aria-hidden="true" />
                    )}
                    <Avatar
                      name={row.name}
                      avatar={row.avatar}
                      className={cn(
                        'ring-2 ring-offset-2 ring-offset-slate-50 dark:ring-offset-zinc-950',
                        rank === 0
                          ? 'size-14 ring-amber-400'
                          : rank === 1
                            ? 'size-11 ring-slate-300'
                            : 'size-11 ring-orange-400',
                        isYou && 'ring-brand-500 dark:ring-brand-400',
                      )}
                    />
                  </div>
                  <p className="max-w-full truncate text-xs font-bold text-slate-900 dark:text-zinc-100">
                    {row.name}
                    {isYou && (
                      <span className="ml-1 inline-block rounded bg-brand-600 px-1 py-px text-[9px] font-bold text-white dark:bg-brand-500">
                        {t('leaderboard.you')}
                      </span>
                    )}
                  </p>
                  <div
                    className={cn(
                      'flex w-full flex-col items-center justify-start rounded-t-xl bg-gradient-to-b pt-2 transition-shadow duration-200 group-hover:shadow-lg',
                      heights[[0, 1, 2].indexOf(rank)],
                      PODIUM_STYLES[rank],
                      PODIUM_TEXT[rank],
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

          {/* ───── Table (ranks 4-10) ───── */}
          {rest.length > 0 && (
            <ol className="mt-8 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
              {rest.map((row, i) => {
                const rank = i + 4;
                const isYou = myId && row.userId === myId;
                return (
                  <LeaderboardRow
                    key={row.userId}
                    row={row}
                    rank={rank}
                    isYou={isYou}
                    onClick={() => openProfile(row.userId, rank)}
                    t={t}
                  />
                );
              })}
            </ol>
          )}

          {/* ───── "Your Rank" strip (outside top N) ───── */}
          {showYourRank && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="mt-4"
            >
              {/* Separator dots */}
              <div className="flex items-center justify-center gap-1 py-2">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1.5 rounded-full bg-slate-300 dark:bg-zinc-600"
                  />
                ))}
              </div>

              {/* Your rank card */}
              <ol className="divide-y divide-slate-100 overflow-hidden rounded-2xl border-2 border-brand-500/40 bg-white shadow-lg shadow-brand-500/10 dark:divide-zinc-800 dark:border-brand-400/30 dark:bg-zinc-900 dark:shadow-brand-400/5">
                {/* Label */}
                <li className="flex items-center gap-2 bg-brand-50 px-4 py-2 dark:bg-brand-500/10">
                  <Trophy className="size-4 text-brand-600 dark:text-brand-400" />
                  <span className="text-xs font-bold text-brand-700 dark:text-brand-300">
                    {t('leaderboard.yourRank')}
                  </span>
                </li>
                <LeaderboardRow
                  row={currentUser}
                  rank={currentUser.rank}
                  isYou
                  onClick={() => openProfile(currentUser.userId, currentUser.rank)}
                  t={t}
                />
              </ol>
            </motion.div>
          )}
        </>
      )}

      {/* ───── Profile Drawer ───── */}
      <AnimatePresence>
        {selectedUser && (
          <ProfileDrawer
            key={selectedUser.userId}
            userId={selectedUser.userId}
            rank={selectedUser.rank}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
