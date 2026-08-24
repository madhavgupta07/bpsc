import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { ChevronLeft, ChevronRight, Clock3, Flag, LayoutGrid, X } from 'lucide-react';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Modal from '../components/ui/Modal';
import LanguageToggle from '../components/layout/LanguageToggle';
import QuestionPalette from '../components/quiz/QuestionPalette';
import { CountUpTimer } from '../components/quiz/Timers';
import useExamSecurity from '../hooks/useExamSecurity';
import { quizApi, progressApi } from '../lib/api';
import { usePageTitle } from '../hooks/useDocumentLocale';
import { difficultyKey, useDifficultyStyles, useLocalized } from '../hooks/useLocalized';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/cn';

const LETTERS = ['A', 'B', 'C', 'D'];

/** Strict single-question-at-a-time quiz player following the CBT pattern. */
export default function Quiz() {
  const { mode, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const pick = useLocalized();
  const diffStyles = useDifficultyStyles();
  const { user } = useAuth();
  const count = Number(location.state?.count) || 10;
  const storeKey = `stet.quiz.start.${mode}.${id ?? 'random'}`;
  usePageTitle(t('quiz.title'));

  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({});            // questionId -> option index
  const [markedSet, setMarkedSet] = useState(() => new Set());   // indices
  const [visitedSet, setVisitedSet] = useState(() => new Set([0]));
  const [index, setIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const elapsedRef = useRef(0);
  const submittedRef = useRef(false);

  // Persist attempt start so an accidental reload resumes the same clock.
  const startEpoch = useMemo(() => {
    try {
      const existing = sessionStorage.getItem(storeKey);
      if (existing) return Number(existing);
    } catch { /* noop */ }
    const epoch = Date.now();
    try { sessionStorage.setItem(storeKey, String(epoch)); } catch { /* noop */ }
    return epoch;
  }, [storeKey]);

  /* Fetch questions once. */
  useEffect(() => {
    let cancelled = false;
    const fetcher =
      mode === 'chapter' ? quizApi.byChapter(id, count)
      : mode === 'topic' ? quizApi.byTopic(id, count)
      : quizApi.random(count);
    fetcher
      .then((data) => !cancelled && setQuestions(data.questions))
      .catch((err) => {
        if (cancelled) return;
        if (err.status === 401) {
          toast.error(t('common.protectedTitle'));
          navigate('/login', { state: { from: `/quiz/${mode}/${id ?? ''}` }, replace: true });
        } else {
          toast.error(t('common.error'));
          navigate('/quiz');
        }
      });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, id]);

  const activeAttempt = Boolean(questions?.length) && !submitting;

  const submit = useCallback(async (auto = false) => {
    if (submittedRef.current || !questions) return;
    submittedRef.current = true;
    setSubmitting(true);
    try {
      const payload = questions.map((q) => ({ questionId: q._id, selected: answers[q._id] ?? null }));
      const result = await quizApi.submit(payload);
      // Server returns only ids + grading — re-attach full local questions.
      const byId = Object.fromEntries(questions.map((q) => [q._id, q]));
      const enriched = {
        ...result,
        results: result.results.map((r, i) => ({
          ...r,
          selected: payload[i].selected,
          question: byId[payload[i].questionId] ?? r.question,
        })),
      };

      if (user) {
        progressApi.update({
          chapterId: current?.chapter || undefined,
          attempted: result.total,
          correct: result.score,
          quizEntry: {
            topic: mode === 'topic' ? id : null,
            chapter: current?.chapter ?? null,
            score: result.score,
            total: result.total,
            timeTaken: elapsedRef.current,
            answers: payload.map((a, i) => ({
              question: a.questionId, selected: a.selected, correct: enriched.results[i]?.correct ?? false,
            })),
          },
        }).catch(() => {});
      }

      try { sessionStorage.removeItem(storeKey); } catch { /* noop */ }
      navigate('/results', {
        state: {
          ...enriched,
          timeTaken: elapsedRef.current,
          context: 'quiz',
          chapterId: current?.chapter,
          autoSubmitted: auto,
        },
        replace: true,
      });
    } catch {
      submittedRef.current = false;
      setSubmitting(false);
      toast.error(t('common.error'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, questions, user, mode, id]);

  /* Proctoring: fullscreen, tab-switch, back-nav guards. */
  const security = useExamSecurity({
    active: activeAttempt,
    maxViolations: 3,
    onAutoSubmit: () => { toast(t('quiz.autoSubmittedViolations'), { icon: '⚠️' }); submit(true); },
  });

  const current = questions?.[index];
  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v != null).length,
    [answers],
  );
  const indexAnswers = useMemo(
    () => (questions ? questions.map((q) => answers[q._id]) : []),
    [questions, answers],
  );

  const onSelect = useCallback(
    (optIndex) => current && setAnswers((prev) => ({ ...prev, [current._id]: optIndex })),
    [current],
  );
  const goTo = useCallback((i) => {
    setIndex(i);
    setVisitedSet((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
  }, []);
  const saveAndNext = useCallback(() => questions && index < questions.length - 1 && goTo(index + 1), [index, questions, goTo]);
  const markAndNext = useCallback(() => {
    setMarkedSet((prev) => new Set(prev).add(index));
    saveAndNext();
  }, [index, saveAndNext]);
  const clearResponse = useCallback(() => {
    current && setAnswers((prev) => { const n = { ...prev }; delete n[current._id]; return n; });
  }, [current]);

  /* Keyboard shortcuts */
  useEffect(() => {
    const onKey = (e) => {
      if (!activeAttempt || !current || security.warning || security.exitConfirm) return;
      if (['1', '2', '3', '4'].includes(e.key)) onSelect(Number(e.key) - 1);
      else if (e.key.toLowerCase() === 'm') markAndNext();
      else if (e.key === 'Enter') saveAndNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeAttempt, current, onSelect, markAndNext, saveAndNext, security.warning, security.exitConfirm]);

  /* ---------------- render states ---------------- */
  if (!questions) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <Spinner className="size-10" />
        <p className="text-sm text-slate-500 dark:text-zinc-400">{t('quiz.loadingQuestions')}</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container-app flex min-h-screen flex-col items-center justify-center gap-5 text-center">
        <Flag className="size-10 text-slate-300" aria-hidden="true" />
        <p className="text-sm text-slate-500 dark:text-zinc-400">{t('quiz.notEnoughQuestions')}</p>
        <Button as={Link} to="/quiz" variant="secondary">{t('quiz.newQuiz')}</Button>
      </div>
    );
  }

  const isLast = index === questions.length - 1;
  const selected = answers[current._id];
  const paletteProps = { count: questions.length, currentIndex: index, answers: indexAnswers, markedSet, visitedSet, onJump: goTo };

  return (
    <div className="flex min-h-screen select-none flex-col bg-slate-100 dark:bg-zinc-950">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Bihar STET · {t('quiz.title')}
            </p>
            <h1 className="truncate text-sm font-bold">{user?.name ?? 'Candidate'}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle size="sm" />
            <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-50 px-2.5 py-1.5 text-sm font-bold tabular-nums ring-1 ring-slate-200 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700">
              <Clock3 className="size-4 text-brand-600 dark:text-brand-400" aria-hidden="true" />
              <CountUpTimer startEpoch={startEpoch} onTick={(s) => (elapsedRef.current = s)} />
            </span>
            <button
              onClick={() => security.setExitConfirm(true)}
              aria-label={t('common.close')}
              className="flex size-8 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-zinc-800"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-4 py-5">
        {/* Palette — desktop sidebar */}
        <aside className="hidden w-52 shrink-0 lg:block">
          <div className="sticky top-[72px] rounded-lg border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">{t('quiz.palette')}</p>
            <QuestionPalette {...paletteProps} />
          </div>
        </aside>

        {/* Question paper */}
        <main className="mx-auto w-full max-w-2xl">
          <div key={current._id} className="animate-fade-up rounded-lg border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 dark:border-zinc-800">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-zinc-400">
                {t('quiz.questionOf', { current: index + 1, total: questions.length })}
              </p>
              <span className={cn('rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide', diffStyles[difficultyKey(current.difficulty)])}>
                {t(`chapter.difficulty.${difficultyKey(current.difficulty)}`)}
              </span>
            </div>

            <div className="px-5 py-5">
              <p className="text-base font-semibold leading-relaxed sm:text-lg">{pick(current, 'question')}</p>
              <div role="radiogroup" aria-label={t('quiz.question')} className="mt-5 grid gap-2">
                {(current.options_en ?? []).map((opt, i) => {
                  const isSel = selected === i;
                  return (
                    <button
                      key={i}
                      role="radio"
                      aria-checked={isSel}
                      onClick={() => onSelect(i)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left text-sm transition-colors',
                        isSel
                          ? 'border-brand-600 bg-brand-50 text-brand-900 dark:border-brand-500 dark:bg-brand-500/10 dark:text-brand-100'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-zinc-700 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/60',
                      )}
                    >
                      <span className={cn(
                        'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold',
                        isSel ? 'border-brand-600 bg-brand-600 text-white dark:border-brand-500' : 'border-slate-300 text-slate-500 dark:border-zinc-600 dark:text-zinc-400',
                      )}>{LETTERS[i]}</span>
                      <span className="leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-100 px-5 py-2.5 dark:border-zinc-800">
              <ProgressBar value={answeredCount} max={questions.length} className="h-1" label={t('quiz.palette')} />
            </div>
          </div>

          <button onClick={() => setPaletteOpen(true)} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-600 lg:hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <LayoutGrid className="size-3.5" aria-hidden="true" /> {t('quiz.palette')}
          </button>

          <p className="mt-3 hidden text-center text-[11px] text-slate-400 sm:block dark:text-zinc-600">
            {t('quiz.keyboardHint')}
          </p>
        </main>
      </div>

      {/* Action bar */}
      <footer className="sticky bottom-0 z-20 border-t border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3">
          <Button variant="outline" size="sm" onClick={markAndNext} className="!border-amber-300 !text-amber-700 hover:!bg-amber-50 dark:!border-amber-500/40 dark:!text-amber-400">
            <Flag className="size-3.5" aria-hidden="true" /> <span className="hidden sm:inline">{t('quiz.markNext')}</span><span className="sm:hidden">M</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={clearResponse}>{t('quiz.clearResponse')}</Button>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="secondary" size="sm" disabled={index === 0} onClick={() => goTo(index - 1)}>
              <ChevronLeft className="size-4" aria-hidden="true" /> {t('quiz.previous')}
            </Button>
            {isLast ? (
              <Button size="sm" disabled={answeredCount === 0} loading={submitting} onClick={() => setConfirmOpen(true)}>
                <Flag className="size-3.5" aria-hidden="true" /> {t('quiz.submit')}
              </Button>
            ) : (
              <Button size="sm" onClick={saveAndNext}>
                {t('quiz.saveNext')} <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
      </footer>

      {/* Mobile palette drawer */}
      {paletteOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label={t('quiz.palette')}>
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setPaletteOpen(false)} />
          <div className="absolute inset-x-4 top-16 rounded-lg border border-slate-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
            <QuestionPalette {...paletteProps} onJump={(i) => { goTo(i); setPaletteOpen(false); }} />
          </div>
        </div>
      )}

      {/* Submit confirmation */}
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title={t('quiz.confirmSubmit')}
        body={t('quiz.confirmSubmitBody', { answered: answeredCount, total: questions.length })}
        confirmLabel={t('quiz.submitAnyway')}
        cancelLabel={t('quiz.cancel')}
        onConfirm={() => { security.markLeaving(); submit(); }}
        loading={submitting}
      />

      {/* Back-navigation guard */}
      <Modal
        open={security.exitConfirm}
        onClose={() => security.setExitConfirm(false)}
        title={t('quiz.backWarningTitle')}
        body={t('quiz.backWarningBody')}
        confirmLabel={t('quiz.submitExit')}
        cancelLabel={t('quiz.stay')}
        onConfirm={() => { security.setExitConfirm(false); security.markLeaving(); submit(); }}
        loading={submitting}
      />

      {/* Proctoring violation warning */}
      <Modal
        open={Boolean(security.warning)}
        onClose={security.dismissWarning}
        title={security.warning === 'fullscreen' ? t('quiz.exitFullscreenTitle') : t('quiz.tabWarningTitle')}
        body={
          security.warning === 'fullscreen'
            ? t('quiz.fullscreenWarningBody', { left: Math.max(1, 3 - security.violations) })
            : t('quiz.tabWarningBody', { left: Math.max(1, 3 - security.violations) })
        }
        confirmLabel={security.warning === 'fullscreen' ? t('quiz.returnFullscreen') : t('quiz.acknowledge')}
        cancelLabel={t('common.close')}
        onConfirm={() => {
          if (security.warning === 'fullscreen') security.enterFullscreen();
          security.dismissWarning();
        }}
      />
    </div>
  );
}
