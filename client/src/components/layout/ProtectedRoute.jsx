import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LockKeyhole } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../ui/Spinner';

export default function ProtectedRoute() {
  const { isAuthenticated, initializing } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  if (initializing) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}

export function AuthGate({ children }) {
  const { isAuthenticated, initializing } = useAuth();
  if (initializing) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <div className="container-app flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
        <LockKeyhole className="size-10 text-brand-500" aria-hidden="true" />
        <h1 className="text-xl font-bold">{t('common.protectedTitle')}</h1>
        <p className="text-sm text-slate-500 dark:text-zinc-400">{t('common.protectedDesc')}</p>
      </div>
    );
  }
  return children;
}
