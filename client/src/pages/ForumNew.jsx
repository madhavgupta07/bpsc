import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ArrowLeft, Tag, MessagesSquare, Wrench } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Seo from '../components/seo/Seo';
import { chaptersApi, forumApi } from '../lib/api';
import { asArray } from '../lib/apiClient';
import { useLocalized } from '../hooks/useLocalized';
import { useAuth } from '../context/AuthContext';

export default function ForumNew() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const pick = useLocalized();
  const { user } = useAuth();
  const navigate = useNavigate();
  const lang = i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const [form, setForm] = useState({ title: '', body: '', chapter: '', tags: '' });
  const [errors, setErrors] = useState({});

  const { data: chapters = [], isLoading: chaptersLoading } = useQuery({
    queryKey: ['chapters'],
    queryFn: chaptersApi.list,
    select: asArray,
  });

  const mutate = useMutation({
    mutationFn: (body) => forumApi.create(body),
    onSuccess: (res) => {
      toast.success(t('forum.postPublished'));
      navigate(`/forum/${res.post._id}`);
    },
    onError: (e) => toast.error(e.message),
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.title.trim().length < 10) next.title = t('forum.titleRequired');
    if (form.body.trim().length < 30) next.body = t('forum.bodyRequired');
    if (!form.chapter) next.chapter = t('forum.chapterRequired');
    if (form.tags.trim() && !/^[\w#,\s-]{0,120}$/.test(form.tags.trim())) next.tags = t('forum.tagsTooMany');

    setErrors(next);
    if (Object.keys(next).length) return;

    mutate.mutate({
      title: form.title.trim(),
      body: form.body.trim(),
      chapter: form.chapter,
      tags: form.tags
        .split(',')
        .map((s) => s.trim().replace(/^#/, '').toLowerCase())
        .filter(Boolean)
        .slice(0, 8),
      lang,
    });
  };

  return (
    <div className="container-app max-w-3xl py-10">
      <Seo title={t('forum.newPost')} path="/forum/new" noIndex />

      <Link
        to="/forum"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-700 dark:text-zinc-400 dark:hover:text-brand-300"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> {t('forum.backToForum')}
      </Link>

      <header className="mt-5">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/20">
            <MessagesSquare className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">{t('forum.newPost')}</h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              {user?.name} · {t('forum.newPostSubtitle')}
            </p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} noValidate className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="space-y-5">
          <Input
            label={t('forum.postTitle')}
            value={form.title}
            onChange={set('title')}
            error={errors.title}
            placeholder="e.g. OSI model doubt — is presentation layer really in exam?"
            maxLength={120}
          />

          <div className="space-y-1.5">
            <label htmlFor="chapter" className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
              {t('forum.postChapter')}
            </label>
            <select
              id="chapter"
              value={form.chapter}
              onChange={set('chapter')}
              aria-invalid={Boolean(errors.chapter)}
              className="block w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm ring-1 ring-inset transition-shadow focus:ring-2 focus:ring-inset focus:ring-brand-500 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700"
            >
              <option value="">{chaptersLoading ? t('forum.loadingChapters') : t('forum.selectChapter')}</option>
              {chapters.map((c) => (
                <option key={c._id} value={c._id}>
                  {String(c.chapterNumber).padStart(2, '0')}. {pick(c, 'title')}
                </option>
              ))}
            </select>
            {errors.chapter && <p className="text-xs font-medium text-rose-600 dark:text-rose-400">{errors.chapter}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="body" className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
              {t('forum.postBody')}
            </label>
            <textarea
              id="body"
              rows={8}
              value={form.body}
              onChange={set('body')}
              aria-invalid={Boolean(errors.body)}
              placeholder={t('forum.bodyPlaceholder')}
              className="block w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm ring-1 ring-inset transition-shadow placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700"
            />
            {errors.body && <p className="text-xs font-medium text-rose-600 dark:text-rose-400">{errors.body}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="tags" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-zinc-300">
              <Tag className="size-3.5" aria-hidden="true" /> {t('forum.tags')}
            </label>
            <input
              id="tags"
              value={form.tags}
              onChange={set('tags')}
              placeholder="os, networks, mcq — comma separated (optional)"
              maxLength={120}
              className="block w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm ring-1 ring-inset transition-shadow placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700"
            />
            {errors.tags && <p className="text-xs font-medium text-rose-600 dark:text-rose-400">{errors.tags}</p>}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-zinc-500">
            <Wrench className="size-3.5" aria-hidden="true" /> {t('forum.beKind')}
          </p>
          <Button type="submit" loading={mutate.isPending}>
            {mutate.isPending ? t('forum.posting') : t('forum.publish')}
          </Button>
        </div>
      </form>
    </div>
  );
}