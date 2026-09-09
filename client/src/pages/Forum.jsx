import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle2, Eye, MessageSquare, MessageSquarePlus, Search, ThumbsUp } from 'lucide-react';
import Button from '../components/ui/Button';
import Avatar from '../components/common/Avatar';
import Seo from '../components/seo/Seo';
import { Skeleton } from '../components/ui/Spinner';
import { chaptersApi, forumApi } from '../lib/api';
import { asArray } from '../lib/apiClient';
import { useLocalized } from '../hooks/useLocalized';
import { useRelativeTime } from '../hooks/useRelativeTime';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/cn';

export default function Forum() {
  const { t } = useTranslation();
  const pick = useLocalized();
  const ago = useRelativeTime();
  const { user } = useAuth();

  const [chapter, setChapter] = useState('');
  const [sort, setSort] = useState('latest');
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query.trim()), 300);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [chapter, sort, debounced]);

  const { data: chapters = [] } = useQuery({
    queryKey: ['chapters'],
    queryFn: chaptersApi.list,
    select: asArray,
  });

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['forum', { chapter, sort, debounced, page }],
    queryFn: () =>
      forumApi.list({
        chapter: chapter || undefined,
        sort,
        q: debounced || undefined,
        page,
      }),
  });

  const posts = data?.posts ?? [];
  const pages = data?.pages ?? 1;

  return (
    <div className="container-app py-10">
      <Seo
        title={t('forum.title')}
        description="Ask questions, share doubts and help fellow aspirants on the Bihar STET & BPSC TRE Computer Science forum."
        path="/forum"
        noIndex
      />

      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
            {t('forum.emph')}
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight">{t('forum.title')}</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">{t('forum.subtitle')}</p>
        </div>
        <Button as={Link} to={user ? '/forum/new' : '/login'} size="md">
          <MessageSquarePlus className="size-4" aria-hidden="true" /> {t('forum.newPost')}
        </Button>
      </header>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('forum.searchPlaceholder')}
            aria-label={t('forum.search')}
            className="w-full rounded-xl border-0 bg-white py-2.5 pl-9 pr-3.5 text-sm shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 dark:bg-zinc-900 dark:ring-zinc-700"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            aria-label={t('forum.postChapter')}
            className="rounded-xl border-0 bg-white px-3 py-2.5 text-sm shadow-sm ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-brand-500 dark:bg-zinc-900 dark:ring-zinc-700"
          >
            <option value="">{t('forum.allChapters')}</option>
            {chapters.map((c) => (
              <option key={c._id} value={c._id}>
                {String(c.chapterNumber).padStart(2, '0')}. {pick(c, 'title')}
              </option>
            ))}
          </select>

          <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-zinc-800/80" role="tablist">
            {['latest', 'top'].map((s) => (
              <button
                key={s}
                role="tab"
                aria-selected={sort === s}
                onClick={() => setSort(s)}
                className={cn(
                  'rounded-lg px-4 py-1.5 text-sm font-semibold transition-all',
                  sort === s
                    ? 'bg-white text-brand-700 shadow-sm dark:bg-zinc-950 dark:text-brand-300'
                    : 'text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200',
                )}
              >
                {t(`forum.${s}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {isLoading && !posts.length
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center gap-3">
                  <span className="size-9 animate-pulse rounded-full bg-slate-200 dark:bg-zinc-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
                  </div>
                </div>
              </div>
            ))
          : posts.map((post) => {
              const title = pick(post, 'title') || t('forum.anonymous');
              return (
                <Link
                  key={post._id}
                  to={`/forum/${post._id}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-500/50"
                >
                  <div className="flex items-start gap-3">
                    <Avatar name={post.author?.name} avatar={post.author?.avatar} size="h-9 w-9" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-zinc-400">
                        <span className="font-semibold text-slate-700 dark:text-zinc-300">
                          {post.author?.name || t('forum.anonymous')}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{ago(post.createdAt)}</span>
                        {post.isResolved && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <CheckCircle2 className="size-3" aria-hidden="true" /> {t('forum.solved')}
                          </span>
                        )}
                      </div>
                      <h2 className="mt-1 line-clamp-2 text-sm font-bold text-slate-900 dark:text-zinc-100">{title}</h2>
                      {post.chapter && (
                        <span className="mt-1.5 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-zinc-800 dark:text-zinc-400">
                          {String(post.chapter.chapterNumber).padStart(2, '0')}. {pick(post.chapter, 'title')}
                        </span>
                      )}
                      {!!post.tags?.length && (
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="text-[11px] text-brand-600 dark:text-brand-400">#{tag}</span>
                          ))}
                        </div>
                      )}
                      <div className="mt-3 flex items-center gap-4 text-xs text-slate-500 dark:text-zinc-400">
                        <span className="inline-flex items-center gap-1">
                          <ThumbsUp className="size-3.5" aria-hidden="true" /> {post.upvoteCount ?? 0} {t('forum.upvotes')}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MessageSquare className="size-3.5" aria-hidden="true" /> {post.answerCount ?? 0} {t('forum.replies')}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Eye className="size-3.5" aria-hidden="true" /> {post.views ?? 0} {t('forum.views')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>

      {!isLoading && !posts.length && (
        <p className="mt-8 text-center text-sm text-slate-500 dark:text-zinc-400">{t('forum.noResults')}</p>
      )}

      {pages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pages }).slice(0, 10).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : undefined}
              className={cn(
                'flex size-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors',
                page === i + 1
                  ? 'bg-brand-600 text-white dark:bg-brand-500'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-700',
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">{isFetching ? 'Loading…' : ''}</p>
    </div>
  );
}