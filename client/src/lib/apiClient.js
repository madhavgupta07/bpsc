import axios from 'axios';

/**
 * Session auth uses a JWT held in localStorage and sent as an
 * Authorization: Bearer header. No cookies, no SameSite/first-party-policy
 * issues — works on any FE/BE split.
 *
 * Base URL resolution:
 *  - Default: same-origin '/api'  → single-service deploy (Express serves dist)
 *  - Set VITE_API_BASE at BUILD time (e.g. https://stet-api.onrender.com)
 *    when frontend and backend are separate services.
 */
const base = import.meta.env.VITE_API_BASE ?? '';

/** Absolute root of the backend — used by non-axios flows (OAuth start link). */
export const API_BASE = base;

const TOKEN_KEY = 'stet_token';

export function getSessionToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setSessionToken(token) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch { /* storage unavailable — session just won't persist */ }
}

export function clearSessionToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

const api = axios.create({
  baseURL: `${base}/api`,
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const token = getSessionToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';
    const wrapped = new Error(error.response?.data?.message || error.message || 'Network error');
    wrapped.status = status; // callers can react to 401 etc.
    // Expired/invalid session — clear client state (except on auth endpoints).
    if (status === 401 && !url.includes('/auth/')) {
      clearSessionToken();
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
    return Promise.reject(wrapped);
  },
);

/** Guards list endpoints: never let an HTML error page become "data". */
export const asArray = (data) => (Array.isArray(data) ? data : []);

export default api;
