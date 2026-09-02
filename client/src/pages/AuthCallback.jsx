import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../components/ui/Spinner';
import { useAuth } from '../context/AuthContext';
import Seo from '../components/seo/Seo';

/**
 * Google OAuth landing. The server gives this page a short-lived one-time
 * `code` in the URL; we exchange it for the session JWT, which is stored in
 * localStorage and sent as an Authorization header. No token or cookie ever
 * travels between origins.
 */
export default function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { completeGoogleSignIn } = useAuth();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    if (params.get('status') === 'failed' || !params.get('code')) {
      toast.error('Google sign-in failed');
      navigate('/login', { replace: true });
      return;
    }

    completeGoogleSignIn(params.get('code'))
      .then(() => navigate('/', { replace: true }))
      .catch((err) => {
        toast.error(err?.message || 'Google sign-in failed');
        navigate('/login', { replace: true });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Seo title="Signing in" noIndex />
      <Spinner className="size-10" />
      <p className="text-sm text-slate-500 dark:text-zinc-400">Signing you in… / साइन इन हो रहा है…</p>
    </div>
  );
}
