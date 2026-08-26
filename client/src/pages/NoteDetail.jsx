import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft, ArrowRight, BookOpenText, ChevronRight, ListTree,
  PenLine, X,
} from 'lucide-react';
import { getNote, NOTES } from '../data/notes';
import { Section, useLangPicker } from '../components/notes/NoteBlocks';
import Button from '../components/ui/Button';
import NotFound from './NotFound';
import Seo from '../components/seo/Seo';
import { chaptersApi } from '../lib/api';
import { asArray } from '../lib/apiClient';
import { cn } from '../lib/cn';

export default function NoteDetail() {
  const { num } = useParams();
  const note = getNote(num);
  const { t } = useTranslation();
  const L = useLangPicker();
  const [tocOpen, setTocOpen] = useState(false);

  // DB chapter id for the "practice this chapter" CTA.
  const { data: chapters } = useQuery({ queryKey: ['chapters'], queryFn: chaptersApi.list, select: asArray });
  const dbChapter = chapters?.find((c) => c.chapterNumber === note?.num);

  useEffect(() => {
    setTocOpen(false);
    window.scrollTo(0, 0);
  }, [num]);

  if (!note) return <NotFound />;

  const prev = NOTES.find((c) => c.num === note.num - 1) || null;
  const next = NOTES.find((c) => c.num === note.num + 1) || null;

  return (
    <div className="container-app py-8">
      <Seo
        title={`Notes · ${L(note.title)}`}
        description={L(note.intro)}
        path={`/notes/${num}`}
      />
      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <button
          onClick={() => window.history.back()}
          className="mt-1 inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> {t('common.back')}
        </button>
        {/* Mobile TOC trigger */}
        <Button variant="secondary" size="sm" onClick={() => setTocOpen(true)} className="lg:hidden">
          <ListTree className="size-4" aria-hidden="true" /> {t('notes.toc')}
        </Button>
      </header>

      <div className="mt-5 flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-slate-900 text-white dark:bg-white dark:text-zinc-900">
          <BookOpenText className="size-6" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-brand-500">
            CH {String(note.num).padStart(2, '0')}
          </p>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{L(note.title)}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-zinc-400">{L(note.intro)}</p>
        </div>
      </div>

      {/* Practice CTA */}
      {dbChapter && (
        <div className="mt-5">
          <Button as={Link} to={`/quiz/chapter/${dbChapter._id}`} variant="outline" size="sm">
            <PenLine className="size-4" aria-hidden="true" /> {t('notes.practiceChapter')}
          </Button>
        </div>
      )}

      <div className="mt-8 flex gap-10">
        {/* Desktop TOC */}
        <aside className="sticky top-24 hidden h-fit w-56 shrink-0 lg:block" aria-label={t('notes.toc')}>
          <p className="mb-3 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
            <ListTree className="size-3.5" aria-hidden="true" /> {t('notes.toc')}
          </p>
          <nav className="space-y-0.5 border-l border-slate-200 dark:border-zinc-800">
            {note.sections.map((s, i) => (
              <a
                key={s.id}
                href={`#sec-${s.id}`}
                className="-ml-px block truncate border-l-2 border-transparent py-1.5 pl-3.5 text-[13px] font-medium text-slate-500 transition-colors hover:border-brand-500 hover:text-brand-700 dark:text-zinc-400 dark:hover:text-brand-300"
              >
                <span className="mr-1.5 tabular-nums text-slate-400 dark:text-zinc-600">{i + 1}.</span>
                {L(s.title)}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <article className="min-w-0 max-w-2xl flex-1 space-y-10 pb-16">
          {note.sections.map((section) => (
            <Section key={section.id} section={section} />
          ))}

          {/* Prev / Next */}
          <footer className="flex items-stretch justify-between gap-3 border-t border-slate-200 pt-6 dark:border-zinc-800">
            {prev ? (
              <Link
                to={`/notes/${prev.num}`}
                className="group flex min-w-0 flex-1 flex-col rounded-xl p-3 ring-1 ring-slate-200 transition-all hover:ring-brand-300 dark:ring-zinc-800 dark:hover:ring-brand-500/40"
              >
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                  {t('notes.prev')}
                </span>
                <span className="mt-1 truncate text-sm font-bold">{L(prev.title)}</span>
              </Link>
            ) : <span className="flex-1" />}
            {next ? (
              <Link
                to={`/notes/${next.num}`}
                className="group flex min-w-0 flex-1 flex-col rounded-xl p-3 text-right ring-1 ring-slate-200 transition-all hover:ring-brand-300 dark:ring-zinc-800 dark:hover:ring-brand-500/40"
              >
                <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  {t('notes.next')}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <span className="mt-1 truncate text-sm font-bold">{L(next.title)}</span>
              </Link>
            ) : <span className="flex-1" />}
          </footer>
        </article>
      </div>

      {/* Mobile TOC drawer */}
      {tocOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t('notes.toc')}>
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setTocOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-72 overflow-y-auto border-l border-slate-200 bg-white p-5 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-extrabold uppercase tracking-widest text-slate-400">{t('notes.toc')}</p>
              <button onClick={() => setTocOpen(false)} aria-label={t('common.close')}
                className="flex size-8 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800">
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <nav className="space-y-1">
              {note.sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#sec-${s.id}`}
                  onClick={() => setTocOpen(false)}
                  className={cn(
                    'block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-700',
                    'dark:text-zinc-400 dark:hover:bg-brand-500/10 dark:hover:text-brand-300',
                  )}
                >
                  <ChevronRight className="mr-1 inline size-3.5" aria-hidden="true" />
                  {i + 1}. {L(s.title)}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
