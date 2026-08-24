import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { BookMarked, Clock3, FileText, Layers3 } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Skeleton } from '../components/ui/Spinner';
import { mockTestsApi } from '../lib/api';
import { asArray } from '../lib/apiClient';
import { usePageTitle } from '../hooks/useDocumentLocale';
import { useLocalized, useLocaleNumber } from '../hooks/useLocalized';

const TYPE_STYLES = {
  full: 'bg-brand-100 text-brand-700 ring-brand-600/20 dark:bg-brand-500/10 dark:text-brand-300 dark:ring-brand-500/30',
  section: 'bg-violet-100 text-violet-700 ring-violet-600/20 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/30',
  chapter: 'bg-sky-100 text-sky-700 ring-sky-600/20 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30',
};

export default function MockTests() {
  const { t } = useTranslation();
  const pick = useLocalized();
  const fmt = useLocaleNumber();
  usePageTitle(t('mockTests.title'));

  const { data: tests = [], isLoading } = useQuery({
    queryKey: ['mock-tests'],
    queryFn: mockTestsApi.list,
    retry: false,
    select: asArray,
  });

  const typeLabel = { full: 'fullLength', section: 'sectional', chapter: 'chapterwise' };

  return (
    <div className="container-app py-10">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">{t('mockTests.title')}</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">{t('mockTests.subtitle')}</p>
      </header>

      {isLoading ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-44" />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {tests.map((test, i) => (
            <motion.article
              key={test._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-500/30"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-11 items-center justify-center rounded-md bg-slate-900 text-white dark:bg-white dark:text-zinc-900">
                  {test.type === 'chapter' ? (
                    <BookMarked className="size-5" aria-hidden="true" />
                  ) : test.type === 'section' ? (
                    <Layers3 className="size-5" aria-hidden="true" />
                  ) : (
                    <FileText className="size-5" aria-hidden="true" />
                  )}
                </span>
                <Badge className={TYPE_STYLES[test.type]}>{t(`mockTests.${typeLabel[test.type]}`)}</Badge>
              </div>

              <h2 className="mt-4 text-base font-bold leading-snug">{pick(test, 'title')}</h2>
              <p className="mt-1 line-clamp-2 flex-1 text-[13px] text-slate-500 dark:text-zinc-400">
                {pick(test, 'description')}
              </p>

              <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-slate-500 dark:text-zinc-400">
                <div className="inline-flex items-center gap-1.5">
                  <Clock3 className="size-3.5 text-brand-500" aria-hidden="true" />
                  <dt className="sr-only">Duration</dt>
                  <dd>{t('mockTests.duration', { count: test.duration })}</dd>
                </div>
                <div>
                  <dt className="sr-only">Questions</dt>
                  <dd>{t('mockTests.questionsCount', { count: test.totalMarks })}</dd>
                </div>
              </dl>

              <Button as={Link} to={`/test/${test._id}`} className="mt-5 w-full">
                {t('mockTests.startTest')}
              </Button>
            </motion.article>
          ))}
        </div>
      )}

      {!isLoading && tests.length === 0 && (
        <p className="mt-12 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-400 dark:border-zinc-700 dark:text-zinc-500">
          {t('common.loading')}
        </p>
      )}
    </div>
  );
}
