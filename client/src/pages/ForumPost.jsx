import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  ArrowLeft, CheckCircle2, Eye, Link2, Loader2,
  MessageSquare, ShieldCheck, ThumbsUp, Trash2,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Avatar from '../components/common/Avatar';
import Seo from '../components/seo/Seo';
import { forumApi } from '../lib/api';
import { useLocalized } from '../hooks/useLocalized';
import { useRelativeTime } from '../hooks/useRelativeTime';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/cn';

export default function ForumPost() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const pick = useLocalized();
  const ago = useRelativeTime();
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const lang = i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const [answer, setAnswer] = useState('');
  const [answerError, setAnswerError] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['forum', 'post', id],
    queryFn: () => forumApi.get(id),
    enabled: Boolean(id),
  });
  const post = data?.post;

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ['forum'] });

  const upvoteMutation = useMutation({
    mutationFn: () => forumApi.toggleUpvote(id),
    onSuccess: invalidate,
    onError: (e) => toast.error(e.message),
  });

  const answerMutation = useMutation({
    mutationFn: (body) => forumApi.addAnswer(id, body),
    onSuccess: () => {
      setAnswer('');
      setAnswerError('');
      invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const answerUpvoteMutation = useMutation({
    mutationFn: (answerId) => forumApi.toggleAnswerUpvote(id, answerId),
    onSuccess: invalidate,
    onError: (e) => toast.error(e.message),
  });

  const solveMutation = useMutation({
    mutationFn: () => forumApi.toggleSolved(id),
    onSuccess: invalidate,
    onError: (e) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: () => forumApi.remove(id),
    onSuccess: () => {
      toast.success('Post deleted');
      navigate('/forum');
    },
    onError: (e) => toast.error(e.message),
  });

  const handleAnswer = (e) => {
    e.preventDefault();
    if (answer.trim().length < 10) {
      setAnswerError(t('forum.answerShort'));
      return;
    }
    answerMutation.mutate({ body: answer.trim(), lang });
  };

  const handleShare = () => {
    navigator.clipboard
      ?.writeText(window.location.href)
      .then(() => toast.success('Link copied'))
      .catch(() => toast.error('Could not copy link'));
  };

  if (isLoading) {
    return (
      <div className="container-app max-w-3xl py-10">
        <Seo title={t('common.notFoundTitle')} path={`/forum/${id}`} noIndex />
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
          <div className="mt-3 h-5 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
          <div className="mt-4 h-3 w-full animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
          <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-zinc-800" />
          <div className="mt-6 h-9 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-zinc-800" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-app max-w-3xl py-10">
        <Seo title={t('common.notFoundTitle')} path={`/forum/${id}`} noIndex />
        <p className="text-center text-sm text-slate-500 dark:text-zinc-400">{t('forum.empty')}</p>
        <div className="mt-4 text-center">
          <Link to="/forum" className="text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400">
            {t('forum.backToForum')}
          </Link>
        </div>
      </div>
    );
  }

  const title = pick(post, 'title') || t('forum.anonymous');
  const body = pick(post, 'body') || '';
  const canModerate = user && (user._id === post.author?._id || user.role === 'admin');

  return (
    <div className="container-app max-w-3xl py-10">
      <Seo title={title} path={`/forum/${id}`} noIndex />

      <Link
        to="/forum"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700 dark:text-zinc-400 dark:hover:text-brand-300"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> {t('forum.backToForum')}
      </Link>

      <article className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-zinc-400">
          <span className="font-semibold text-slate-700 dark:text-zinc-300">
            {post.author?.name || t('forum.anonymous')}
          </span>
          {post.author?._id === user?._id && (
            <span className="rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-bold text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">
              {t('forum.op')}
            </span>
          )}
          <span aria-hidden="true">·</span>
          <span>{ago(post.createdAt)}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Eye className="size-3.5" aria-hidden="true" /> {post.views ?? 0}
          </span>
          {post.isResolved && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <CheckCircle2 className="size-3" aria-hidden="true" /> {t('forum.solved')}
            </span>
          )}
        </div>

        <h1 className="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">{title}</h1>

        {post.chapter && (
          <span className="mt-3 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-zinc-800 dark:text-zinc-400">
            {t('forum.postChapter')}: {String(post.chapter.chapterNumber).padStart(2, '0')}. {pick(post.chapter, 'title')}
          </span>
        )}

        <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
          {body}
        </div>

        {!!post.tags?.length && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium text-brand-600 dark:text-brand-400">#{tag}</span>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-zinc-800">
          <Button
            variant={post.upvotedByMe ? 'primary' : 'secondary'}
            size="sm"
            loading={upvoteMutation.isPending}
            onClick={() => (user ? upvoteMutation.mutate() : navigate('/login'))}
          >
            <ThumbsUp className="size-4" aria-hidden="true" /> {post.upvoteCount ?? 0}
          </Button>
          <Button variant="secondary" size="sm" onClick={handleShare}>
            <Link2 className="size-4" aria-hidden="true" /> {t('forum.share')}
          </Button>
          {canModerate && (
            <>
              <Button variant="secondary" size="sm" loading={solveMutation.isPending} onClick={() => solveMutation.mutate()}>
                {post.isResolved ? t('forum.solve') : t('forum.solved')}
              </Button>
              <Button
                variant="danger"
                size="sm"
                loading={deleteMutation.isPending}
                onClick={() => {
                  if (window.confirm(`${t('forum.deleteQuestion')} ${t('forum.deleteConfirm')}`)) deleteMutation.mutate();
                }}
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>
            </>
          )}
        </div>
      </article>

      {/* Answers */}
      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-base font-extrabold tracking-tight">
          <MessageSquare className="size-4 text-brand-600 dark:text-brand-400" aria-hidden="true" />
          {post.answerCount ?? 0} {t('forum.replies')}
        </h2>

        <div className="mt-4 space-y-4">
          {!post.answers?.length && (
            <p className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-zinc-700 dark:text-zinc-400">
              {t('forum.noAnswers')}
            </p>
          )}
          {post.answers.map((a) => {
            const abody = pick(a, 'body') || '';
            return (
              <div key={a._id} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center gap-2.5">
                  <Avatar name={a.author?.name} avatar={a.author?.avatar} size="h-8 w-8" textClass="text-xs" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-700 dark:text-zinc-300">
                      {a.author?.name || t('forum.anonymous')}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-zinc-500">{ago(a.createdAt)}</p>
                  </div>
                  <Button
                    variant={a.upvotedByMe ? 'primary' : 'secondary'}
                    size="sm"
                    loading={answerUpvoteMutation.isPending}
                    onClick={() => (user ? answerUpvoteMutation.mutate(a._id) : navigate('/login'))}
                    aria-label={t('forum.upvotes')}
                  >
                    <ThumbsUp className="size-3.5" aria-hidden="true" /> {a.upvoteCount ?? 0}
                  </Button>
                </div>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-zinc-300">{abody}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Answer form / login prompt */}
      <section className="mt-8">
        {user ? (
          <form onSubmit={handleAnswer} noValidate className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <label htmlFor="answer" className="text-sm font-medium text-slate-700 dark:text-zinc-300">
              {t('forum.writeAnswer')}
            </label>
            <textarea
              id="answer"
              rows={4}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (answerError) setAnswerError('');
              }}
              aria-invalid={Boolean(answerError)}
              className="mt-2 block w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm ring-1 ring-inset transition-shadow placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700"
            />
            {answerError && <p role="alert" className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">{answerError}</p>}
            <div className="mt-3 flex justify-end">
              <Button type="submit" loading={answerMutation.isPending}>
                {answerMutation.isPending ? t('forum.posting') : t('forum.postAnswer')}
              </Button>
            </div>
          </form>
        ) : (
          <div className="rounded-2xl border border-dashed border-brand-300 bg-brand-50/50 p-6 text-center dark:border-brand-500/30 dark:bg-brand-500/5">
            <ShieldCheck className="mx-auto size-6 text-brand-600 dark:text-brand-400" aria-hidden="true" />
            <h3 className="mt-2 text-sm font-bold">{t('forum.loginRequiredTitle')}</h3>
            <p className="mx-auto mt-1 max-w-sm text-xs text-slate-500 dark:text-zinc-400">{t('forum.loginRequiredDesc')}</p>
            <Button as={Link} to="/login" size="sm" className="mt-4">{t('forum.loginToPost')}</Button>
          </div>
        )}
      </section>
    </div>
  );
}