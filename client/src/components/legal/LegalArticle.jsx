import { useTranslation } from 'react-i18next';
import { Clock3 } from 'lucide-react';
import Seo from '../seo/Seo';

const SECTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

/**
 * Shared layout for legal pages (Privacy / Terms).
 * Hero + "on this page" table of contents (sticky on desktop) + numbered section cards.
 */
export default function LegalArticle({ ns, eyebrow, seo, children }) {
  const { t } = useTranslation();
  const nsT = (key) => t(`${ns}.${key}`);

  return (
    <div className="container-app max-w-5xl py-10">
      <Seo title={nsT('title')} description={seo?.description} path={seo?.path} />

      <header className="max-w-3xl">
        <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/20">
          {t(eyebrow)}
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{nsT('title')}</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">{nsT('intro')}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500 dark:bg-zinc-800 dark:text-zinc-400">
          <Clock3 className="size-3.5 text-slate-400" aria-hidden="true" />
          {nsT('updated')}
        </span>
      </header>

      <div className="mt-10 gap-10 lg:grid lg:grid-cols-[260px_minmax(0,1fr)]">
        <nav aria-label={t('common.tocLabel')} className="hidden lg:block">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 lg:sticky lg:top-20">
            <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              {t('common.tocLabel')}
            </p>
            <ol className="space-y-0.5">
              {SECTIONS.map((n) => (
                <li key={n}>
                  <a
                    href={`#${ns}-sec-${n}`}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand-700 dark:text-zinc-300 dark:hover:bg-brand-500/10 dark:hover:text-brand-300"
                  >
                    <span className="font-semibold text-brand-600/70 dark:text-brand-400/70">{String(n).padStart(2, '0')}</span>
                    <span className="truncate">{nsT(`s${n}t`)}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="space-y-6">
          {SECTIONS.map((n) => (
            <section
              key={n}
              id={`${ns}-sec-${n}`}
              className="scroll-mt-20 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-sm font-bold text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/20"
                >
                  {String(n).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-base font-bold">{nsT(`s${n}t`)}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">{nsT(`s${n}b`)}</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {children}
    </div>
  );
}