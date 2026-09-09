import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import LegalArticle from '../components/legal/LegalArticle';

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <LegalArticle
      ns="privacy"
      eyebrow="nav.support"
      seo={{
        description: 'How Bihar STET & BPSC CS collects, uses and protects your data — Google sign-in, progress tracking and analytics.',
        path: '/privacy',
      }}
    >
      <section className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7 dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <h2 className="text-base font-bold">{t('privacy.contactTitle')}</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">{t('privacy.contactDesc')}</p>
        </div>
        <a
          href="mailto:support@biharstetcs.com"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-700 ring-1 ring-brand-100 transition-colors hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-300 dark:ring-brand-500/20 dark:hover:bg-brand-500/20"
        >
          <Mail className="size-4" aria-hidden="true" /> support@biharstetcs.com
        </a>
      </section>
    </LegalArticle>
  );
}