import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  BookOpen, FileText, HelpCircle, ListChecks, Plus, Search,
  ShieldCheck, Trash2, Users,
} from 'lucide-react';
import Seo from '../../components/seo/Seo';
import Button from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Spinner';
import { adminApi, chaptersApi } from '../../lib/api';
import { asArray } from '../../lib/apiClient';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/cn';

const TABS = [
  ['overview', 'Overview', ListChecks],
  ['chapters', 'Chapters', BookOpen],
  ['questions', 'Questions', HelpCircle],
  ['tests', 'Mock Tests', FileText],
  ['users', 'Users', Users],
];

const inputCls =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-400 dark:border-zinc-700 dark:bg-zinc-900';

export default function Admin() {
  const { user, initializing } = useAuth();
  const [tab, setTab] = useState('overview');

  if (!initializing && user?.role !== 'admin') {
    return (
      <div className="container-app py-20 text-center">
        <Seo title="Admin" noIndex />
        <ShieldCheck className="mx-auto size-10 text-slate-300" aria-hidden="true" />
        <h1 className="mt-4 text-lg font-bold">Admin access required</h1>
        <p className="mt-1 text-sm text-slate-500">Your account doesn't have permission to view this page.</p>
        <Button as={Link} to="/" variant="secondary" size="sm" className="mt-5">Go home</Button>
      </div>
    );
  }

  return (
    <div className="container-app max-w-6xl py-10">
      <Seo title="Admin Dashboard" noIndex />
      <header className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-zinc-900">
          <ShieldCheck className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Admin Dashboard</h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Manage chapters, questions, mock tests and users
          </p>
        </div>
      </header>

      {/* Tabs */}
      <nav className="mt-6 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
        {TABS.map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            aria-current={tab === key}
            className={cn(
              'flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
              tab === key
                ? 'bg-brand-600 text-white'
                : 'text-slate-500 hover:bg-slate-50 dark:text-zinc-400 dark:hover:bg-zinc-800',
            )}
          >
            <Icon className="size-4" aria-hidden="true" /> {label}
          </button>
        ))}
      </nav>

      <div className="mt-6">
        {tab === 'overview' && <Overview />}
        {tab === 'chapters' && <Chapters />}
        {tab === 'questions' && <Questions />}
        {tab === 'tests' && <MockTestsPanel />}
        {tab === 'users' && <UsersPanel />}
      </div>
    </div>
  );
}

/* ================= Overview ================= */

function StatCardBox({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <Icon className="size-5 text-brand-600 dark:text-brand-400" aria-hidden="true" />
      <p className="mt-2 text-2xl font-extrabold tabular-nums">{value ?? '—'}</p>
      <p className="text-xs font-medium text-slate-500 dark:text-zinc-400">{label}</p>
    </div>
  );
}

function Overview() {
  const { data, isLoading } = useQuery({ queryKey: ['admin', 'stats'], queryFn: adminApi.stats });
  if (isLoading) return <Skeleton className="h-48" />;

  const c = data?.counts || {};
  const a = data?.attempts || {};
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">Content</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <StatCardBox icon={Users} label="Users" value={c.users} />
          <StatCardBox icon={BookOpen} label="Chapters" value={c.chapters} />
          <StatCardBox icon={ListChecks} label="Topics" value={c.topics} />
          <StatCardBox icon={HelpCircle} label="Questions" value={c.questions} />
          <StatCardBox icon={FileText} label="Mock tests" value={c.mockTests} />
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">Activity</h2>
        <div className="grid grid-cols-2 gap-3 sm:max-w-md">
          <StatCardBox icon={HelpCircle} label="Quiz attempts" value={a.quizAttempts} />
          <StatCardBox icon={FileText} label="Mock attempts" value={a.mockAttempts} />
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">Newest users</h2>
        <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
          {(data?.recentUsers || []).map((u) => (
            <li key={u._id} className="flex items-center justify-between px-4 py-2.5 text-sm">
              <span className="font-semibold">{u.name}</span>
              <span className="truncate pl-4 text-xs text-slate-400">{u.email}</span>
              <span className="ml-3 shrink-0 text-[11px] tabular-nums text-slate-400">
                {new Date(u.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* ================= Chapters ================= */

function Chapters() {
  const qc = useQueryClient();
  const { data: chapters, isLoading } = useQuery({
    queryKey: ['admin', 'chapters'],
    queryFn: () => chaptersApi.list.then(asArray),
  });
  const [form, setForm] = useState({ chapterNumber: '', title_en: '', title_hi: '', section: 'subject' });

  const invalidate = () => qc.invalidateQueries({ queryKey: ['admin'] });
  const remove = useMutation({
    mutationFn: adminApi.deleteChapter,
    onSuccess: () => { toast.success('Chapter deleted'); invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await adminApi.createChapter({
        ...form,
        chapterNumber: Number(form.chapterNumber),
        order: Number(form.chapterNumber) || undefined,
      });
      toast.success('Chapter created');
      setForm({ chapterNumber: '', title_en: '', title_hi: '', section: 'subject' });
      invalidate();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <form onSubmit={submit} className="space-y-3 self-start rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="flex items-center gap-1.5 text-sm font-bold"><Plus className="size-4" /> New chapter</h3>
        <input required type="number" min="1" placeholder="Chapter number" className={inputCls}
          value={form.chapterNumber} onChange={(e) => setForm({ ...form, chapterNumber: e.target.value })} />
        <input required placeholder="Title (English)" className={inputCls}
          value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} />
        <input required placeholder="Title (Hindi)" className={inputCls}
          value={form.title_hi} onChange={(e) => setForm({ ...form, title_hi: e.target.value })} />
        <select className={inputCls} value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })}>
          <option value="subject">Subject</option>
          <option value="pedagogy">Pedagogy</option>
        </select>
        <Button type="submit" size="sm" className="w-full justify-center">Create</Button>
      </form>

      {isLoading ? <Skeleton className="h-64" /> : (
        <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
          {(chapters || []).map((c) => (
            <li key={c._id} className="flex items-center gap-3 px-4 py-3">
              <span className="shrink-0 rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-bold dark:bg-zinc-800">
                CH {String(c.chapterNumber).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{c.title_en}</p>
                <p className="truncate text-xs text-slate-400">{c.title_hi} · {c.section}</p>
              </div>
              <span className="shrink-0 text-xs tabular-nums text-slate-400">{c.questionCount} Qs</span>
              <button
                onClick={() => window.confirm(`Delete "${c.title_en}"? This also removes its topics, questions and mini-tests.`) && remove.mutate(c._id)}
                className="rounded-md p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                aria-label={`Delete ${c.title_en}`}
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ================= Questions ================= */

function Questions() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [chapterFilter, setChapterFilter] = useState('');
  const { data: chapters } = useQuery({ queryKey: ['chapters'], queryFn: chaptersApi.list, select: asArray });

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'questions', page, chapterFilter],
    queryFn: () => adminApi.questions({ page, limit: 20, chapter: chapterFilter || undefined }),
  });

  const remove = useMutation({
    mutationFn: adminApi.deleteQuestion,
    onSuccess: () => { toast.success('Question deleted'); qc.invalidateQueries({ queryKey: ['admin', 'questions'] }); },
    onError: (e) => toast.error(e.message),
  });

  const pages = data?.pages || 1;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <select
          className={cn(inputCls, 'max-w-60')}
          value={chapterFilter}
          onChange={(e) => { setChapterFilter(e.target.value); setPage(1); }}
        >
          <option value="">All chapters</option>
          {(chapters || []).map((c) => (
            <option key={c._id} value={c._id}>{c.chapterNumber}. {c.title_en}</option>
          ))}
        </select>
        <span className="text-xs text-slate-400">{data?.total ?? '—'} questions</span>
      </div>

      {isLoading ? <Skeleton className="h-64" /> : (
        <>
          <ol className="space-y-2">
            {(data?.questions || []).map((q) => (
              <li key={q._id} className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{q.question_en}</p>
                    <p className="mt-0.5 truncate text-xs text-slate-400">{q.question_hi}</p>
                    <p className="mt-1.5 text-[11px] text-slate-400">
                      CH {q.chapter?.chapterNumber} · {q.topic?.name_en} · {q.difficulty}
                      {q.year ? ` · ${q.year}` : ''} · correct: ({q.correctAnswer + 1}) {q.options_en[q.correctAnswer]}
                    </p>
                  </div>
                  <button
                    onClick={() => window.confirm('Delete this question?') && remove.mutate(q._id)}
                    className="shrink-0 rounded-md p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                    aria-label="Delete question"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ol>
          <div className="flex items-center justify-center gap-3">
            <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</Button>
            <span className="text-xs tabular-nums text-slate-400">{page} / {pages}</span>
            <Button variant="secondary" size="sm" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </>
      )}
    </div>
  );
}

/* ================= Mock tests ================= */

function MockTestsPanel() {
  const qc = useQueryClient();
  const { data: tests, isLoading } = useQuery({
    queryKey: ['admin', 'mock-tests'],
    queryFn: adminApi.mockTests,
  });
  const { data: chapters } = useQuery({ queryKey: ['chapters'], queryFn: chaptersApi.list, select: asArray });
  const [form, setForm] = useState({ title_en: '', title_hi: '', type: 'full', sampleCount: 50, duration: 50, chapterId: '' });

  const remove = useMutation({
    mutationFn: adminApi.deleteMockTest,
    onSuccess: () => { toast.success('Test deleted'); qc.invalidateQueries({ queryKey: ['admin', 'mock-tests'] }); },
    onError: (e) => toast.error(e.message),
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await adminApi.createMockTest({
        title_en: form.title_en,
        title_hi: form.title_hi || form.title_en,
        type: form.type,
        sampleCount: Number(form.sampleCount),
        duration: Number(form.duration),
        totalMarks: Number(form.sampleCount),
        ...(form.chapterId ? { chapterRef: form.chapterId } : {}),
      });
      toast.success('Mock test created');
      setForm({ title_en: '', title_hi: '', type: 'full', sampleCount: 50, duration: 50, chapterId: '' });
      qc.invalidateQueries({ queryKey: ['admin', 'mock-tests'] });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <form onSubmit={submit} className="space-y-3 self-start rounded-2xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="flex items-center gap-1.5 text-sm font-bold"><Plus className="size-4" /> New mock test</h3>
        <p className="-mt-1 text-[11px] leading-relaxed text-slate-400">
          Questions are sampled randomly{form.chapterId ? ' from the chosen chapter' : ' across all chapters'}.
        </p>
        <input required placeholder="Title (English)" className={inputCls}
          value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} />
        <input placeholder="Title (Hindi)" className={inputCls}
          value={form.title_hi} onChange={(e) => setForm({ ...form, title_hi: e.target.value })} />
        <select className={inputCls} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="full">Full length</option>
          <option value="section">Sectional</option>
          <option value="chapter">Chapter-wise</option>
        </select>
        <select className={inputCls} value={form.chapterId} onChange={(e) => setForm({ ...form, chapterId: e.target.value })}>
          <option value="">All chapters</option>
          {(chapters || []).map((c) => (
            <option key={c._id} value={c._id}>{c.chapterNumber}. {c.title_en}</option>
          ))}
        </select>
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-xs font-medium text-slate-500">
            Questions
            <input required type="number" min="1" max="200" className={cn(inputCls, 'mt-1')}
              value={form.sampleCount} onChange={(e) => setForm({ ...form, sampleCount: e.target.value })} />
          </label>
          <label className="block text-xs font-medium text-slate-500">
            Duration (min)
            <input required type="number" min="1" className={cn(inputCls, 'mt-1')}
              value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
          </label>
        </div>
        <Button type="submit" size="sm" className="w-full justify-center">Create test</Button>
      </form>

      {isLoading ? <Skeleton className="h-64" /> : (
        <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
          {(asArray(tests)).map((t) => (
            <li key={t._id} className="flex items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{t.title_en}</p>
                <p className="truncate text-xs text-slate-400">
                  {t.type} · {t.questionCount} Qs · {t.duration} min ·{' '}
                  {t.chapterRef?.title_en || 'all chapters'} · {t.isActive ? 'active' : 'hidden'}
                </p>
              </div>
              <button
                onClick={() => window.confirm(`Delete "${t.title_en}"?`) && remove.mutate(t._id)}
                className="shrink-0 rounded-md p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                aria-label={`Delete ${t.title_en}`}
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ================= Users ================= */

function UsersPanel() {
  const qc = useQueryClient();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { user: me } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'users', search, page],
    queryFn: () => adminApi.users({ search: search || undefined, page, limit: 20 }),
  });

  const setRole = useMutation({
    mutationFn: ({ id, role }) => adminApi.setUserRole(id, role),
    onSuccess: () => { toast.success('Role updated'); qc.invalidateQueries({ queryKey: ['admin', 'users'] }); },
    onError: (e) => toast.error(e.message),
  });

  const pages = data?.pages || 1;
  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          placeholder="Search name or email…"
          className={cn(inputCls, 'pl-9')}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      {isLoading ? <Skeleton className="h-64" /> : (
        <>
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
            {(data?.users || []).map((u) => (
              <li key={u._id} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {u.name}
                    {u._id === me?._id && <span className="ml-2 text-[11px] font-bold text-brand-600">(you)</span>}
                  </p>
                  <p className="truncate text-xs text-slate-400">{u.email} · joined {new Date(u.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="shrink-0 text-xs tabular-nums text-orange-500">🔥 {u.stats?.streakDays || 0}</span>
                <select
                  className="shrink-0 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold dark:border-zinc-700 dark:bg-zinc-900"
                  value={u.role}
                  disabled={u._id === me?._id || setRole.isPending}
                  onChange={(e) => setRole.mutate({ id: u._id, role: e.target.value })}
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center gap-3">
            <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</Button>
            <span className="text-xs tabular-nums text-slate-400">{page} / {pages}</span>
            <Button variant="secondary" size="sm" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </>
      )}
    </div>
  );
}
