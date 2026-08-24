import axios from 'axios';

/**
 * Session auth uses an httpOnly cookie set by the server on Google sign-in.
 * Requests carry it automatically.
 *
 * Base URL resolution:
 *  - Default: same-origin '/api'  → single-service deploy (Express serves dist)
 *  - Set VITE_API_BASE at BUILD time (e.g. https://stet-api.onrender.com)
 *    when frontend and backend are separate services.
 */
const base = import.meta.env.VITE_API_BASE ?? '';

/** Absolute root of the backend — used by non-axios flows (OAuth start link). */
export const API_BASE = base;

const api = axios.create({
  baseURL: `${base}/api`,
  timeout: 20000,
  withCredentials: true,
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
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
    return Promise.reject(wrapped);
  },
);

/** Guards list endpoints: never let an HTML error page become "data". */
export const asArray = (data) => (Array.isArray(data) ? data : []);

export default api;
