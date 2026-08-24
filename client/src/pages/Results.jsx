import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Home, RotateCcw, Timer, XCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import ProgressRing from '../components/ui/ProgressRing';
import ResultReviewItem from '../components/quiz/ResultReviewItem';
import { usePageTitle } from '../hooks/useDocumentLocale';
import { formatDuration } from '../hooks/useLocalized';

export default function Results() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  usePageTitle(t('results.score'));

  const state = location.state;

  // Results are passed via router state; deep-link/refresh redirects home.
  useEffect(() => {
    if (!state?.results) navigate('/', { replace: true });
  }, [state, navigate]);

  if (!state?.results) return null;

  const { score, total, results, timeTaken = 0, context } = state;
  const pct = total ? Math.round((score / total) * 100) : 0;  const message =
    pct >= 85 ? t('results.excellent')
    : pct >= 70 ? t('results.good')
    : pct >= 40 ? t('results.average')
    : t('results.poor');

  const retakeTo =
    context === 'mock'
      ? `/test/${state.testId}`
      : '/quiz';

  return (
    <div className="container-app max-w-3xl py-10">
      {/* Score hero */}
      {state.autoSubmitted && (
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm font-medium text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
          <AlertTriangle className="size-5 shrink-0" aria-hidden="true" />
          <p>{t('results.autoBanner')}</p>
        </div>
      )}
      <motion.section
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <ProgressRing value={pct} size={150} stroke={12}>
          <span className="text-4xl font-extrabold tabular-nums tracking-tight text-brand-700 dark:text-brand-400">{pct}%</span>
          <span className="mt-1 text-xs font-semibold text-slate-400 dark:text-zinc-500">
            {t('profile.scoreOf', { score, total })}
          </span>
        </ProgressRing>

        <p className="mt-5 text-lg font-bold">{message}</p>

        <div className="mt-6 grid w-full max-w-md grid-cols-3 gap-3">
          <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-500/10">
            <CheckCircle2 className="mx-auto size-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <p className="mt-1.5 text-lg font-extrabold tabular-nums">{score}</p>
            <p className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">{t('results.correct')}</p>
          </div>
          <div className="rounded-xl bg-rose-50 p-3 dark:bg-rose-500/10">
            <XCircle className="mx-auto size-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
            <p className="mt-1.5 text-lg font-extrabold tabular-nums">{total - score}</p>
            <p className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">{t('results.incorrect')}</p>
          </div>
          <div className="rounded-xl bg-sky-50 p-3 dark:bg-sky-500/10">
            <Timer className="mx-auto size-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            <p className="mt-1.5 text-lg font-extrabold tabular-nums">{formatDuration(timeTaken)}</p>
            <p className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">{t('results.timeTaken')}</p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button as={Link} to={retakeTo} variant="secondary">
            <RotateCcw className="size-4" aria-hidden="true" /> {t('results.retake')}
          </Button>
          <Button as={Link} to="/">
            <Home className="size-4" aria-hidden="true" /> {t('results.backHome')}
          </Button>
        </div>
      </motion.section>

      {/* Answer review */}
      <h2 className="mt-10 text-lg font-extrabold tracking-tight">{t('results.reviewAnswers')}</h2>
      <ul className="mt-4 space-y-3">
        {results.map((r, i) => (
          <ResultReviewItem key={r.question?._id ?? i} index={i} result={{ ...r, selected: r.selected }} />
        ))}
      </ul>
    </div>
  );
}
