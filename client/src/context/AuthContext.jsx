import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // The session lives in an httpOnly cookie — probe it once on mount.
  useEffect(() => {
    let cancelled = false;
    authApi
      .me()
      .then((u) => !cancelled && setUser(u))
      .catch(() => {})
      .finally(() => !cancelled && setInitializing(false));
    return () => {
      cancelled = true;
    };
  }, []);

  // React to global 401 events from the axios interceptor.
  useEffect(() => {
    const onForcedLogout = () => setUser(null);
    window.addEventListener('auth:logout', onForcedLogout);
    return () => window.removeEventListener('auth:logout', onForcedLogout);
  }, []);

  /** Called by the OAuth callback page once the cookie is set. */
  const completeGoogleSignIn = useCallback(async () => {
    const u = await authApi.me();
    setUser(u);
    return u;
  }, []);

  /** Clears the server cookie and local state. */
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      /* cookie may already be gone */
    }
    setUser(null);
  }, []);

  const updateUser = useCallback((patch) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      initializing,
      completeGoogleSignIn,
      logout,
      updateUser,
    }),
    [user, initializing, completeGoogleSignIn, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
