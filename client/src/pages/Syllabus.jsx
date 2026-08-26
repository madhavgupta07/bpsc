import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import ChapterCard from '../components/chapters/ChapterCard';
import { Skeleton } from '../components/ui/Spinner';
import { chaptersApi } from '../lib/api';
import { asArray } from '../lib/apiClient';
import Seo from '../components/seo/Seo';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/cn';

const FILTERS = ['all', 'subject', 'pedagogy'];

export default function Syllabus() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const { user } = useAuth();

  const { data: chapters = [], isLoading } = useQuery({
    queryKey: ['chapters'],
    queryFn: chaptersApi.list,
    select: asArray,
  });

  const filtered = filter === 'all' ? chapters : chapters.filter((c) => c.section === filter);

  return (
    <div className="container-app py-10">
      <Seo
        title="Syllabus — All 17 Chapters"
        description="Complete Bihar STET Computer Science syllabus: Digital Logic, Computer Organization, Data Structures, Algorithms, OS, DBMS, Networks, Pedagogy and more — bilingual notes and quizzes for every chapter."
        path="/syllabus"
      />
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight">{t('syllabus.title')}</h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          {t('syllabus.subtitle', { count: chapters.length })}
        </p>
      </header>

      {/* Section filter */}
      <div className="mt-6 inline-flex rounded-xl bg-slate-100 p-1 dark:bg-zinc-800/80" role="tablist" aria-label={t('nav.syllabus')}>
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-lg px-4 py-1.5 text-sm font-semibold transition-all',
              filter === f
                ? 'bg-white text-brand-700 shadow-sm dark:bg-zinc-950 dark:text-brand-300'
                : 'text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200',
            )}
          >
            {t(`syllabus.${f}`)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-56" />
          ))}
        </div>
      ) : (
        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((chapter) => {
            // Progress is keyed by chapter ObjectId in the populated progress doc.
            const progress = user?.progress?.chapterProgress?.find(
              (cp) => cp.chapter === chapter._id || cp.chapter?._id === chapter._id,
            );
            return <ChapterCard key={chapter._id} chapter={chapter} progress={progress} />;
          })}
        </motion.div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className="mt-16 flex flex-col items-center gap-3 text-center text-slate-400">
          <BookOpen className="size-10" aria-hidden="true" />
          <p className="text-sm">{t('common.loading')}</p>
        </div>
      )}
    </div>
  );
}
