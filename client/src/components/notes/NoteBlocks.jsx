import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Lightbulb, AlertTriangle, PenLine, CalendarDays, CheckCircle2 } from 'lucide-react';
import DIAGRAMS from './diagrams';
import { cn } from '../../lib/cn';

/**
 * Localized values in note data are tuples [english, hindi].
 * Returns a picker bound to the active language (0 = en, 1 = hi).
 * Also accepts legacy flat pairs: pick('english','hindi').
 */
export function useLangPicker() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('hi') ? 1 : 0;
  return useCallback((v, alt) => {
    if (Array.isArray(v)) return v[lang] || v[0];
    if (typeof alt === 'string') return lang === 1 && alt ? alt : v;
    return v;
  }, [lang]);
}

/**
 * Renders one note block.
 * Block kinds (tuple-tagged): p · h3 · ul · table · callout · diagram · code · pyq
 */
export default function NoteBlock({ block }) {
  const { t } = useTranslation();
  const L = useLangPicker();
  const [kind] = block;

  switch (kind) {
    case 'p':
      return <p className="text-[15px] leading-relaxed text-slate-700 dark:text-zinc-300">{L(block[1], block[2])}</p>;

    case 'h3':
      return (
        <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-zinc-100">
          {L(block[1], block[2])}
        </h4>
      );

    case 'ul':
      return (
        <ul className="space-y-1.5">
          {block[1].map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[14.5px] leading-relaxed text-slate-700 dark:text-zinc-300">
              <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
              <span>{L(item)}</span>
            </li>
          ))}
        </ul>
      );

    case 'table': {
      const [, head, rows] = block;
      return (
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-zinc-700">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-zinc-800">
                {head.map((h, i) => (
                  <th key={i} scope="col" className="border-b border-slate-200 px-3.5 py-2.5 text-left font-bold text-slate-800 dark:border-zinc-700 dark:text-zinc-100">
                    {L(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r} className={r % 2 ? 'bg-white dark:bg-zinc-900' : 'bg-slate-50/60 dark:bg-zinc-900/60'}>
                  {row.map((cell, c) => (
                    <td key={c} className={cn(
                      'border-b border-slate-100 px-3.5 py-2 align-top leading-relaxed text-slate-700 last:border-r-0 dark:border-zinc-800 dark:text-zinc-300',
                      c === 0 && 'font-semibold text-slate-900 dark:text-zinc-100',
                    )}>
                      {L(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    case 'callout': {
      const [, k, en, hi] = block;
      const styles = {
        def: ['bg-brand-50 ring-brand-200 text-brand-900', 'BookOpen', t('notes.defLabel')],
        tip: ['bg-emerald-50 ring-emerald-200 text-emerald-900', 'Lightbulb', t('notes.tipLabel')],
        exam: ['bg-violet-50 ring-violet-200 text-violet-900', 'PenLine', t('notes.examLabel')],
        warn: ['bg-amber-50 ring-amber-200 text-amber-900', 'AlertTriangle', t('notes.warnLabel')],
      };
      const [cls, Icon, label] = styles[k] || styles.tip;
      const icons = { BookOpen, Lightbulb, PenLine, AlertTriangle };
      const Ico = icons[Icon];
      return (
        <aside className={cn('flex gap-3 rounded-xl p-4 ring-1 dark:bg-opacity-10', cls)}>
          <Ico className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wide">{label}</p>
            <p className="mt-1 text-sm leading-relaxed">{L(en)}{hi && L(en) !== L(hi) && <> — <span className="opacity-90">{L(hi)}</span></>}</p>
          </div>
        </aside>
      );
    }

    case 'diagram': {
      const [, id, capEn, capHi] = block;
      const Diagram = DIAGRAMS[id];
      if (!Diagram) return null;
      return (
        <figure className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4 dark:border-zinc-700 dark:bg-zinc-900/60">
          <div className="text-slate-600 dark:text-zinc-300">
            <Diagram />
          </div>
          {(capEn || capHi) && (
            <figcaption className="mt-2 border-t border-slate-100 pt-2 text-center text-xs font-medium text-slate-500 dark:border-zinc-800 dark:text-zinc-400">
              {L([capEn, capHi])}
            </figcaption>
          )}
        </figure>
      );
    }

    case 'code': {
      const [, code, capEn, capHi] = block;
      return (
        <figure className="overflow-hidden rounded-xl border border-slate-800 bg-zinc-950 dark:border-zinc-700">
          {(capEn || capHi) && (
            <div className="border-b border-zinc-800 px-4 py-2 text-xs font-medium text-zinc-400">{L([capEn, capHi])}</div>
          )}
          <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-zinc-100"><code>{code}</code></pre>
        </figure>
      );
    }

    case 'pyq': {
      const [, q] = block;
      const letters = ['A', 'B', 'C', 'D'];
      return (
        <article className="rounded-xl border border-dashed border-brand-300 bg-gradient-to-br from-brand-50/80 to-violet-50/60 p-4 dark:border-brand-500/40 dark:from-brand-500/5 dark:to-violet-500/5">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-violet-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
              PYQ
            </span>
            {q.src && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-zinc-400">
                <CalendarDays className="size-3" aria-hidden="true" /> {q.src}
              </span>
            )}
          </div>
          <p className="text-sm font-semibold leading-relaxed text-slate-900 dark:text-zinc-100">{q.q}</p>
          <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
            {q.opts.map((opt, i) => {
              const correct = i === q.ans;
              return (
                <li key={i}
                  className={cn(
                    'flex items-start gap-2 rounded-lg px-2.5 py-1.5 text-[13px]',
                    correct
                      ? 'bg-emerald-100 font-bold text-emerald-800 ring-1 ring-emerald-400 dark:bg-emerald-500/15 dark:text-emerald-300'
                      : 'text-slate-600 dark:text-zinc-400',
                  )}>
                  <span className={cn('font-mono text-[11px] font-bold', correct ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-400')}>
                    ({letters[i]})
                  </span>
                  {opt}
                  {correct && <CheckCircle2 className="ml-auto size-4 shrink-0 text-emerald-600 dark:text-emerald-400" aria-label="correct answer" />}
                </li>
              );
            })}
          </ul>
          {q.ex && (
            <details className="group mt-3">
              <summary className="cursor-pointer list-none text-xs font-bold text-brand-700 hover:underline dark:text-brand-400">
                {t('notes.explanation')} ▾
              </summary>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600 dark:text-zinc-300">{L(q.ex)}</p>
            </details>
          )}
        </article>
      );
    }

    default:
      return null;
  }
}

export function Section({ section }) {
  const L = useLangPicker();
  return (
    <section id={`sec-${section.id}`} data-section={section.id} className="scroll-mt-24 space-y-3.5">
      <h3 className="flex items-baseline gap-2.5 text-lg font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
        <span className="size-2 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
        {L(section.title)}
      </h3>
      {section.blocks.map((b, i) => <NoteBlock key={i} block={b} />)}
    </section>
  );
}
