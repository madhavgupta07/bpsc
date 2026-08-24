import axios from 'axios';

/**
 * Session auth uses an httpOnly cookie set by the server on Google sign-in.
 * Same-origin requests carry it automatically; no token ever touches JS.
 */
const api = axios.create({
  baseURL: '/api',
  timeout: 20000,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';
    // Expired/invalid session — clear client state (except on auth endpoints).
    if (status === 401 && !url.includes('/auth/')) {
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
    return Promise.reject(
      new Error(error.response?.data?.message || error.message || 'Network error'),
    );
  },
);

export default api;
