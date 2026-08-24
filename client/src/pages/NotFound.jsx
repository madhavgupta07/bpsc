import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Compass } from 'lucide-react';
import Button from '../components/ui/Button';
import { usePageTitle } from '../hooks/useDocumentLocale';

export default function NotFound() {
  const { t } = useTranslation();
  usePageTitle(t('common.notFoundTitle'));

  return (
    <div className="container-app flex min-h-[70vh] flex-col items-center justify-center gap-5 py-16 text-center">
      <span className="text-7xl font-extrabold tracking-tight text-brand-700 dark:text-brand-400">404</span>
      <h1 className="text-xl font-bold">{t('common.notFoundTitle')}</h1>
      <p className="max-w-sm text-sm text-slate-500 dark:text-zinc-400">{t('common.notFoundDesc')}</p>
      <Button as={Link} to="/" size="lg">
        <Compass className="size-5" aria-hidden="true" /> {t('common.goHome')}
      </Button>
    </div>
  );
}
