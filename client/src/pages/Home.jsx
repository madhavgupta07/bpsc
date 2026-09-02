import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
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
        title="Bihar STET Computer Science Preparation — Free Notes, Quizzes & Mock Tests"
        description="Free bilingual (English/हिंदी) Bihar STET Computer Science preparation: 17 chapters of notes, 700+ practice questions, full-length mock tests and progress tracking. बिहार STET कंप्यूटर साइंस की तैयारी।"
        path="/"
        keywords="Bihar STET, STET Computer Science, Bihar STET preparation, STET mock test, Bihar STET syllabus, STET CS notes, बिहार STET, कंप्यूटर साइंस, STET practice, BSEB STET 2025"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Bihar STET CS',
            url: window.location.origin,
            description: 'Free bilingual Bihar STET Computer Science preparation platform.',
            inLanguage: ['en', 'hi'],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: 'Bihar STET Computer Science Complete Preparation',
            description: 'Comprehensive free study material for Bihar STET Paper II Computer Science — 17 chapters, notes, quizzes, and mock tests.',
            provider: { '@type': 'Organization', name: 'Bihar STET CS' },
            inLanguage: ['en', 'hi'],
            isAccessibleForFree: true,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is Bihar STET Computer Science exam?',
                acceptedAnswer: { '@type': 'Answer', text: 'Bihar STET Paper II Computer Science is a state-level exam conducted by BSEB for recruiting computer science teachers in Bihar. It covers 17 chapters including Digital Logic, Data Structures, OS, DBMS, Networks and Pedagogy.' },
              },
              {
                '@type': 'Question',
                name: 'How many questions are in Bihar STET Paper 2?',
                acceptedAnswer: { '@type': 'Answer', text: 'Bihar STET Paper II has 150 MCQs: 100 from Computer Science (100 marks) and 50 from pedagogy/GK (50 marks). Duration: 2 hours 30 minutes.' },
              },
              {
                '@type': 'Question',
                name: 'Is there negative marking in Bihar STET?',
                acceptedAnswer: { '@type': 'Answer', text: 'No. There is NO negative marking in Bihar STET. Each correct answer carries 1 mark.' },
              },
            ],
          },
        ]}
      />
      {/* ---------- Hero ---------- */}
      <section className="border-b border-slate-200 dark:border-zinc-800">
        <div className="container-app py-14 sm:py-20">
          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
            Bihar STET · Paper II · Computer Science
          </motion.p>

          <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
            className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-zinc-50">
            {t('home.title1')}{' '}
            <span className="text-slate-400 dark:text-zinc-500">—</span>{' '}
            {t('home.title2')}
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
            className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-zinc-400">
            {t('home.subtitle')}
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
            className="mt-8 flex flex-wrap items-center gap-3">
            <Button as={Link} to="/quiz" size="lg">
              <PlayCircle className="size-4" aria-hidden="true" /> {t('home.startQuiz')}
            </Button>
            <Button as={Link} to="/notes" variant="outline" size="lg">
              {t('nav.notes')} <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </motion.div>

          {/* Inline stats */}
          <motion.dl variants={fadeUp} initial="hidden" animate="show" custom={4}
            className="mt-12 flex max-w-xl items-center gap-6 border-y border-slate-200 py-4 dark:border-zinc-800">
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
          </motion.dl>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className="container-app py-14 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-zinc-500">
            {t('home.featuresEyebrow')}
          </p>
          <h2 className="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">{t('home.featuresTitle')}</h2>
        </div>

        <div className="mt-9 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.t}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} custom={i % 3}
            >
              <span className="flex size-9 items-center justify-center rounded-md bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/20">
                <f.icon className="size-[18px]" aria-hidden="true" />
              </span>
              <h3 className="mt-3.5 text-sm font-bold">{f.t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- Workflow ---------- */}
      <section className="border-y border-slate-200 bg-white py-12 sm:py-14 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="container-app">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-zinc-500">
              {t('home.howEyebrow')}
            </p>
            <h2 className="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">{t('home.howTitle')}</h2>
          </div>

          <ol className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i}
                className="border-t-2 border-slate-900 pt-4 dark:border-white"
              >
                <span className="font-mono text-xs font-bold tabular-nums text-brand-600 dark:text-brand-400">{s.n}</span>
                <h3 className="mt-2 text-sm font-bold">
                  <Link to={s.to} className="hover:text-brand-700 hover:underline dark:hover:text-brand-400">{s.t}</Link>
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">{s.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Full syllabus index ---------- */}
      {chapters.length > 0 && (
        <section id="syllabus-index" className="container-app py-12 sm:py-16">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-zinc-500">
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
                  <span className="w-8 shrink-0 font-mono text-xs font-bold tabular-nums text-slate-300 dark:text-zinc-600">
                    {String(c.chapterNumber).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold group-hover:text-brand-700 group-hover:underline dark:group-hover:text-brand-400">
                    {pick(c, 'title')}
                  </span>
                  <span className="hidden shrink-0 text-xs tabular-nums text-slate-400 sm:block dark:text-zinc-500">
                    {t('syllabus.weightage', { count: c.weightage })}
                  </span>
                  <span className="hidden shrink-0 text-xs text-slate-400 md:block dark:text-zinc-500">
                    {t('syllabus.topicsCount', { count: c.topicCount ?? c.topics?.length ?? 0 })}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600 dark:text-zinc-600" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

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
