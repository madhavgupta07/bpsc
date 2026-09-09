import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BookOpen, GraduationCap, Languages, Target, TrendingUp } from 'lucide-react';
import Button from '../components/ui/Button';
import Seo from '../components/seo/Seo';

const FEATURES = [
  { icon: Languages, titleKey: 'f1t', descKey: 'f1d' },
  { icon: Target, titleKey: 'f2t', descKey: 'f2d' },
  { icon: TrendingUp, titleKey: 'f3t', descKey: 'f3d' },
  { icon: GraduationCap, titleKey: 'f4t', descKey: 'f4d' },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="container-app py-10">
      <Seo
        title={t('about.title')}
        description="Free bilingual (English/हिंदी) preparation platform for Bihar STET Paper II & BPSC TRE Computer Science — notes, quizzes and mock tests for every aspirant."
        path="/about"
      />

      {/* Hero */}
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
          {t('app.name')}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{t('about.title')}</h1>
        <p className="mt-3 text-base text-slate-500 dark:text-zinc-400">{t('about.subtitle')}</p>
      </header>

      {/* Mission */}
      <section className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/20">
            <Target className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-bold">{t('about.missionTitle')}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">{t('about.missionText')}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/20">
            <BookOpen className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-bold">{t('about.storyTitle')}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">{t('about.storyText')}</p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto mt-14 max-w-4xl">
        <h2 className="text-center text-xl font-extrabold tracking-tight">{t('about.featuresTitle')}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, titleKey, descKey }) => (
            <div
              key={titleKey}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="mx-auto flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/20">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-sm font-bold">{t(`about.${titleKey}`)}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-zinc-400">{t(`about.${descKey}`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-14 max-w-3xl rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 p-8 text-center text-white dark:from-brand-500 dark:to-brand-600">
        <h2 className="text-xl font-extrabold tracking-tight">{t('about.ctaTitle')}</h2>
        <p className="mt-2 text-sm text-brand-50/90">{t('about.ctaText')}</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Button as={Link} to="/quiz" variant="secondary" size="md">{t('about.ctaButton')}</Button>
          <Button as={Link} to="/syllabus" variant="ghost" size="md" className="text-white hover:bg-brand-600/50 hover:text-white dark:text-white">
            {t('nav.syllabus')}
          </Button>
        </div>
      </section>
    </div>
  );
}