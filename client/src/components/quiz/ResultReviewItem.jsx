import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/cn';
import { useLocalized } from '../../hooks/useLocalized';

const OPTION_KEYS = ['A', 'B', 'C', 'D'];

export default function ResultReviewItem({ index, result }) {
  const { t } = useTranslation();
  const pick = useLocalized();
  // Defensive: server grading returns only ids — full question is attached
  // client-side; guard every field so a malformed entry can never crash.
  const { correct, correctAnswer, explanation_en, explanation_hi } = result ?? {};
  const question = result?.question ?? {};
  const options = Array.isArray(question.options_en) && question.options_en.length
    ? question.options_en
    : Array.isArray(question.options_hi)
      ? question.options_hi
      : [];
  const chosen = result?.selected;
  const hasOptions = options.length > 0 && Number.isInteger(correctAnswer);

  return (
    <li
      className={cn(
        'rounded-2xl border p-4 sm:p-5',
        correct
          ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-500/20 dark:bg-emerald-500/5'
          : 'border-rose-200 bg-rose-50/50 dark:border-rose-500/20 dark:bg-rose-500/5',
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0">
          {correct ? (
            <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          ) : (
            <XCircle className="size-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          )}
        </span>
        <div className="min-w-0 flex-1 space-y-2.5">
          <p className="text-sm font-semibold leading-relaxed text-slate-900 dark:text-zinc-100">
            <span className="mr-1.5 text-slate-400 dark:text-zinc-500">{index + 1}.</span>
            {pick(question, 'question')}
          </p>

          {!correct && chosen != null && options[chosen] != null && (
            <p className="text-xs text-rose-600 dark:text-rose-400">
              <span className="font-semibold">{t('results.yourAnswer')}:</span>{' '}
              {OPTION_KEYS[chosen]}) {options[chosen]}
            </p>
          )}
          {!correct && chosen == null && (
            <p className="text-xs italic text-rose-600 dark:text-rose-400">{t('results.yourAnswer')}: —</p>
          )}

          {hasOptions && (
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              <span className="font-semibold">{t('results.correctAnswer')}:</span>{' '}
              {OPTION_KEYS[correctAnswer]}) {options[correctAnswer]}
            </p>
          )}

          {(explanation_en || explanation_hi) && (
            <div className="flex items-start gap-2 rounded-xl bg-white/70 p-3 text-xs leading-relaxed text-slate-600 ring-1 ring-slate-200/60 dark:bg-zinc-900/60 dark:text-zinc-300 dark:ring-zinc-700/60">
              <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-amber-500" aria-hidden="true" />
              <span>
                <span className="font-semibold text-slate-800 dark:text-zinc-200">{t('results.explanation')}: </span>
                {pick({ explanation_en, explanation_hi }, 'explanation')}
              </span>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
