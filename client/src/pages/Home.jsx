import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { lazy, Suspense } from 'react';
import {
  ArrowRight, BookOpenText, History, Languages, LineChart, PlayCircle,
  ShieldCheck, Target,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Button from '../components/ui/Button';
import Seo from '../components/seo/Seo';
import { useAuth } from '../context/AuthContext';
import { useLocalized } from '../hooks/useLocalized';
import { chaptersApi } from '../lib/api';
import { asArray } from '../lib/apiClient';

// Lazy-load framer-motion so it's not in the critical path for hero paint.
const LazyMotionDiv = lazy(() =>
  import('framer-motion').then((m) => ({ default: m.motion.div }))
);
const LazyMotionLi = lazy(() =>
  import('framer-motion').then((m) => ({ default: m.motion.li }))
);

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Home() {
  const { t } = useTranslation();
  const pick = useLocalized();
  const { user } = useAuth();

  const { data: chapters = [] } = useQuery({ queryKey: ['chapters'], queryFn: chaptersApi.list, select: asArray });
  const totalTopics = chapters.reduce((sum, c) => sum + (c.topicCount ?? c.topics?.length ?? 0), 0);

  const features = [
    { icon: Languages, t: t('home.f1t'), d: t('home.f1d') },
    { icon: BookOpenText, t: t('home.f2t'), d: t('home.f2d') },
    { icon: History, t: t('home.f3t'), d: t('home.f3d') },
    { icon: Target, t: t('home.f4t'), d: t('home.f4d') },
    { icon: ShieldCheck, t: t('home.f5t'), d: t('home.f5d') },
    { icon: LineChart, t: t('home.f6t'), d: t('home.f6d') },
  ];

  const steps = [
    { n: '01', t: t('home.s1t'), d: t('home.s1d'), to: '/notes' },
    { n: '02', t: t('home.s2t'), d: t('home.s2d'), to: '/quiz' },
    { n: '03', t: t('home.s3t'), d: t('home.s3d'), to: '/mock-tests' },
    { n: '04', t: t('home.s4t'), d: t('home.s4d'), to: user ? '/profile' : '/login' },
  ];

  return (
    <div>
      <Seo
        title="Bihar STET & BPSC TRE CS Prep | Free Notes & Mocks"
        description="Free bilingual Bihar STET Paper II & BPSC TRE Computer Science prep: 17 chapters of notes, 700+ MCQs & CBT mock tests in English and Hindi."
        path="/"
        keywords="Bihar STET, BPSC TRE, BPSC Computer Science, BPSC TRE 3.0, BPSC TRE 4.0, STET Computer Science, Bihar STET preparation, STET mock test, Bihar STET syllabus, STET CS notes, बिहार STET, BPSC कंप्यूटर शिक्षक"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Bihar STET & BPSC CS',
            url: window.location.origin,
            description: 'Free bilingual Bihar STET & BPSC TRE Computer Science preparation platform.',
            inLanguage: ['en', 'hi'],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Bihar STET & BPSC TRE Computer Science Complete Preparation',
            description: 'Comprehensive free study material for Bihar STET Paper II & BPSC TRE (Class 11-12) Computer Science — 17 chapters, notes, quizzes, and mock tests.',
            provider: { '@type': 'Organization', name: 'Bihar STET & BPSC CS' },
            inLanguage: ['en', 'hi'],
            isAccessibleForFree: true,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is Bihar STET & BPSC TRE Computer Science exam?',
                acceptedAnswer: { '@type': 'Answer', text: 'Bihar STET Paper II Computer Science is the state-level eligibility exam conducted by BSEB, and BPSC TRE is the recruitment exam conducted by BPSC for appointing Higher Secondary (Class 11-12) Computer Science teachers in Bihar schools.' },
              },
              {
                '@type': 'Question',
                name: 'Is B.Ed compulsory for Computer Science in STET or BPSC TRE?',
                acceptedAnswer: { '@type': 'Answer', text: 'No. B.Ed is NOT mandatory for Computer Science in Bihar STET or BPSC TRE. Candidates with B.Tech (CS/IT), MCA, M.Sc (CS), or BCA + PG are directly eligible.' },
              },
              {
                '@type': 'Question',
                name: 'How many questions are in BPSC TRE Computer Science?',
                acceptedAnswer: { '@type': 'Answer', text: 'BPSC TRE Computer Science has 150 MCQs (150 marks, 2.5 hours): Part I Language (30 marks qualifying), Part II General Studies (40 marks), and Part III Computer Science (80 marks).' },
              },
            ],
          },
        ]}
      />
      {/* ---------- Hero (CSS-animated — no framer-motion reflow) ---------- */}
      <section className="border-b border-slate-200 dark:border-zinc-800">
        <div className="container-app py-14 sm:py-20">
          <p style={{ animationDelay: '0ms' }}
            className="animate-fade-up text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
            Bihar STET · BPSC TRE · Computer Science (Class 11-12)
          </p>

          <h1 style={{ animationDelay: '60ms' }}
            className="animate-fade-up mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-zinc-50">
            {t('home.title1')}{' '}
            <span className="text-slate-500 dark:text-zinc-400">—</span>{' '}
            {t('home.title2')}
          </h1>

          <p style={{ animationDelay: '120ms' }}
            className="animate-fade-up mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-zinc-400">
            {t('home.subtitle')}
          </p>

          <div style={{ animationDelay: '180ms' }}
            className="animate-fade-up mt-8 flex flex-wrap items-center gap-3">
            <Button as={Link} to="/quiz" size="lg">
              <PlayCircle className="size-4" aria-hidden="true" /> {t('home.startQuiz')}
            </Button>
            <Button as={Link} to="/notes" variant="outline" size="lg">
              {t('nav.notes')} <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>

          {/* Inline stats */}
          <dl style={{ animationDelay: '240ms' }}
            className="animate-fade-up mt-12 flex max-w-xl items-center gap-6 border-y border-slate-200 py-4 dark:border-zinc-800">
            {[
              [String(chapters.length).padStart(2, '0'), t('home.statsChapters')],
              [totalTopics ? String(totalTopics) : '—', t('home.statsTopics')],
              ['700+', t('home.statsQuestions')],
            ].map(([value, label], i) => (
              <div key={label} className={i > 0 ? 'border-l border-slate-200 pl-6 dark:border-zinc-800' : ''}>
                <dd className="text-2xl font-extrabold tabular-nums tracking-tight text-slate-900 dark:text-zinc-100">{value}</dd>
                <dt className="mt-0.5 text-xs font-medium text-slate-500 dark:text-zinc-400">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className="container-app py-14 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-zinc-400">
            {t('home.featuresEyebrow')}
          </p>
          <h2 className="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">{t('home.featuresTitle')}</h2>
        </div>

        <Suspense fallback={null}>
          <div className="mt-9 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <LazyMotionDiv
                key={f.t}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} custom={i % 3}
              >
                <span className="flex size-9 items-center justify-center rounded-md bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/20">
                  <f.icon className="size-[18px]" aria-hidden="true" />
                </span>
                <h3 className="mt-3.5 text-sm font-bold">{f.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">{f.d}</p>
              </LazyMotionDiv>
            ))}
          </div>
        </Suspense>
      </section>

      {/* ---------- Workflow ---------- */}
      <section className="border-y border-slate-200 bg-white py-12 sm:py-14 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="container-app">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-zinc-400">
              {t('home.howEyebrow')}
            </p>
            <h2 className="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">{t('home.howTitle')}</h2>
          </div>

          <Suspense fallback={null}>
            <ol className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {steps.map((s, i) => (
                <LazyMotionLi
                  key={s.n}
                  variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                  className="border-t-2 border-slate-900 pt-4 dark:border-white"
                >
                  <span className="font-mono text-xs font-bold tabular-nums text-brand-600 dark:text-brand-400">{s.n}</span>
                  <h3 className="mt-2 text-sm font-bold">
                    <Link to={s.to} className="hover:text-brand-700 hover:underline dark:hover:text-brand-400">{s.t}</Link>
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">{s.d}</p>
                </LazyMotionLi>
              ))}
            </ol>
          </Suspense>
        </div>
      </section>

      {/* ---------- Full syllabus index ---------- */}
      {chapters.length > 0 && (
        <section id="syllabus-index" className="container-app py-12 sm:py-16">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-zinc-400">
                {t('home.syllabusEyebrow')}
              </p>
              <h2 className="mt-2 text-lg font-extrabold tracking-tight">{t('nav.syllabus')}</h2>
            </div>
            <Link to="/syllabus" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline dark:text-brand-400">
              {t('home.exploreSyllabus')} <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-6 grid gap-x-12 border-y border-slate-100 sm:grid-cols-2 dark:border-zinc-800">
            {chapters.map((c) => (
              <li key={c._id} className="border-b border-slate-100 dark:border-zinc-800">
                <Link to={`/syllabus/${c._id}`} className="group flex items-center gap-4 py-3">
                  <span className="w-8 shrink-0 font-mono text-xs font-bold tabular-nums text-slate-400 dark:text-zinc-500">
                    {String(c.chapterNumber).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold group-hover:text-brand-700 group-hover:underline dark:group-hover:text-brand-400">
                    {pick(c, 'title')}
                  </span>
                  <span className="hidden shrink-0 text-xs tabular-nums text-slate-500 sm:block dark:text-zinc-400">
                    {t('syllabus.weightage', { count: c.weightage })}
                  </span>
                  <span className="hidden shrink-0 text-xs text-slate-500 md:block dark:text-zinc-400">
                    {t('syllabus.topicsCount', { count: c.topicCount ?? c.topics?.length ?? 0 })}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600 dark:text-zinc-500" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- SEO Guide & Exam Overview Section ---------- */}
      <section className="border-t border-slate-200 bg-slate-50/50 py-12 sm:py-16 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="container-app max-w-4xl">
          <header className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
              Exam Guide & Study Resources
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Bihar STET & BPSC TRE Computer Science Preparation
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              Comprehensive study material, chapter notes, and computer-based mock tests tailored specifically for candidates appearing in BSEB Bihar STET Paper II (Code 226) and BPSC TRE Higher Secondary Teacher Recruitment.
            </p>
          </header>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <article className="rounded-xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                Bihar STET Paper II Exam Pattern (Code 226)
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                The Bihar Secondary Teachers Eligibility Test (STET) Paper II for Higher Secondary (Class 11-12) Computer Science consists of 150 Multiple Choice Questions carrying 150 marks for a duration of 2.5 hours (150 minutes).
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand-600"></span>
                  <strong>Specified Subject (CS):</strong> 100 Marks (100 MCQs)
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand-600"></span>
                  <strong>Art of Teaching:</strong> 30 Marks (30 MCQs)
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand-600"></span>
                  <strong>General Knowledge & Reasoning:</strong> 20 Marks (20 MCQs)
                </li>
                <li className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span className="size-1.5 rounded-full bg-emerald-600"></span>
                  No Negative Marking (0 mark penalty)
                </li>
              </ul>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                BPSC TRE Computer Science (Class 11-12)
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                The Bihar Public Service Commission (BPSC TRE 3.0 / 4.0) conducts recruitment exams for Computer Science Teachers. The paper has 150 MCQs divided into 3 parts:
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-zinc-400">
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand-600"></span>
                  <strong>Part I Language (English/Hindi):</strong> 30 Marks (Qualifying)
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand-600"></span>
                  <strong>Part II General Studies:</strong> 40 Marks
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand-600"></span>
                  <strong>Part III Computer Science Domain:</strong> 80 Marks
                </li>
                <li className="flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold">
                  <span className="size-1.5 rounded-full bg-brand-600"></span>
                  Eligibility: B.Tech (CS/IT), MCA, M.Sc CS (B.Ed NOT required)
                </li>
              </ul>
            </article>
          </div>

          {/* Visible FAQ Section */}
          <div className="mt-12">
            <h3 className="text-center text-xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
              Frequently Asked Questions (FAQ)
            </h3>
            <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200 dark:divide-zinc-800 dark:border-zinc-800">
              <details className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-sm text-slate-900 dark:text-zinc-100">
                  <span>Is B.Ed compulsory for Computer Science in Bihar STET or BPSC TRE?</span>
                  <span className="ml-2 text-slate-400 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                  No, B.Ed is <strong>NOT mandatory</strong> for Computer Science candidates in Bihar STET Paper II or BPSC TRE teacher recruitment. Candidates holding a B.Tech (CS/IT), MCA, M.Sc (Computer Science), or BCA + Post Graduate Degree are directly eligible to apply.
                </p>
              </details>

              <details className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-sm text-slate-900 dark:text-zinc-100">
                  <span>What are the qualifying marks for Bihar STET Computer Science?</span>
                  <summary className="sr-only">Qualifying marks detail</summary>
                  <span className="ml-2 text-slate-400 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                  The minimum qualifying percentage for STET Paper II is: General (UR) - 50% (75 marks out of 150), BC - 45.5% (68.25 marks), EBC - 42.5% (63.75 marks), and SC / ST / PwD / Women - 40% (60 marks out of 150).
                </p>
              </details>

              <details className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-sm text-slate-900 dark:text-zinc-100">
                  <span>Which subjects are covered in the Bihar STET CS syllabus?</span>
                  <span className="ml-2 text-slate-400 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                  The syllabus covers 17 key topics including Object-Oriented Programming (C++ & Java), Data Structures & Algorithms, Database Management Systems (DBMS & SQL), Computer Networks, Operating Systems, Web Technologies (HTML/CSS/JS), Digital Logic & Boolean Algebra, Software Engineering, Data Communications, and Computer Architecture.
                </p>
              </details>

              <details className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-sm text-slate-900 dark:text-zinc-100">
                  <span>Are the mock tests and notes available in Hindi and English?</span>
                  <span className="ml-2 text-slate-400 transition-transform group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                  Yes! All notes, chapter quizzes, and full-length CBT mock tests on this platform are 100% free and fully bilingual (English and Hindi), allowing candidates to switch languages smoothly mid-quiz.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      {!user && (
        <section className="container-app pb-16 sm:pb-20">
          <div className="flex flex-col items-start justify-between gap-5 rounded-lg bg-slate-900 px-6 py-8 sm:flex-row sm:items-center sm:px-10 dark:bg-zinc-900">
            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">{t('home.ctaTitle')}</h2>
              <p className="mt-1 max-w-md text-sm text-slate-300">{t('home.ctaSubtitle')}</p>
            </div>
            <Button as={Link} to="/login" variant="secondary" size="lg"
              className="!bg-white !text-slate-900 hover:!bg-slate-200 dark:!bg-white dark:!text-slate-900 shrink-0">
              {t('home.ctaButton')} <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
