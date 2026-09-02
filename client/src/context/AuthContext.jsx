import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../lib/api';
import { getSessionToken, setSessionToken, clearSessionToken } from '../lib/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Session JWT lives in localStorage — probe identity once on mount.
  useEffect(() => {
    let cancelled = false;
    if (!getSessionToken()) {
      setInitializing(false);
      return undefined;
    }
    authApi
      .me()
      .then((u) => !cancelled && setUser(u))
      .catch(() => clearSessionToken())
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

  /** Called by the OAuth callback page with the one-time login code. */
  const completeGoogleSignIn = useCallback(async (code) => {
    const { token, user: signedInUser } = await authApi.exchange(code);
    setSessionToken(token);
    setUser(signedInUser);
    return signedInUser;
  }, []);

  /** Drops the stored JWT and local state. */
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      /* server session is stateless — nothing to clear */
    }
    clearSessionToken();
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
