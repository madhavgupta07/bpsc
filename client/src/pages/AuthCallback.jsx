import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../components/ui/Spinner';
import { useAuth } from '../context/AuthContext';
import Seo from '../components/seo/Seo';

/**
 * Google OAuth landing. The server sets the session as an httpOnly cookie and
 * redirects here with ?status=ok|failed — no token ever touches the URL.
 */
export default function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { completeGoogleSignIn } = useAuth();
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    if (params.get('status') === 'failed') {
      toast.error('Google sign-in failed');
      navigate('/login', { replace: true });
      return;
    }
    // The auth cookie arrives on the OAuth callback redirect. Browsers can
    // commit it a tick later than this page mounts, so the first /me probe
    // occasionally 401s with "Not authorized, no token". Retry briefly.
    const maxAttempts = 3;
    const attempt = (i = 0) =>
      completeGoogleSignIn()
        .then(() => navigate('/', { replace: true }))
        .catch((err) => {
          const status = err && err.status;
          if (status === 401 && i < maxAttempts - 1) {
            setTimeout(() => attempt(i + 1), 400);
            return;
          }
          toast.error('Google sign-in failed');
          navigate('/login', { replace: true });
        });
    attempt();
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
