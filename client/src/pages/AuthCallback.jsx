import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../components/ui/Spinner';
import { useAuth } from '../context/AuthContext';
import { usePageTitle } from '../hooks/useDocumentLocale';

/**
 * Google OAuth landing. The server sets the session as an httpOnly cookie and
 * redirects here with ?status=ok|failed — no token ever touches the URL.
 */
export default function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { completeGoogleSignIn } = useAuth();
  const handledRef = useRef(false);
  usePageTitle('Signing in…');

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    if (params.get('status') === 'failed') {
      toast.error('Google sign-in failed');
      navigate('/login', { replace: true });
      return;
    }
    completeGoogleSignIn()
      .then(() => navigate('/', { replace: true }))
      .catch(() => {
        toast.error('Google sign-in failed');
        navigate('/login', { replace: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Spinner className="size-10" />
      <p className="text-sm text-slate-500 dark:text-zinc-400">Signing you in… / साइन इन हो रहा है…</p>
    </div>
  );
}
