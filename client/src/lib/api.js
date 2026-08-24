import api from './apiClient';

/* ---------- Auth (Google-only, httpOnly cookie session) ---------- */
export const authApi = {
  googleUrl: '/api/auth/google',
  logout: () => api.post('/auth/logout').then((r) => r.data),
  me: () => api.get('/auth/me').then((r) => r.data.user),
  updateProfile: (body) => api.put('/auth/profile', body).then((r) => r.data.user),
};

/* ---------- Chapters & Topics (public, bilingual content) ---------- */
export const chaptersApi = {
  list: () => api.get('/chapters').then((r) => r.data),
  get: (id) => api.get(`/chapters/${id}`).then((r) => r.data), // { chapter, topics }
};

/* ---------- Quiz (protected) ---------- */
export const quizApi = {
  byChapter: (id, count = 10) =>
    api.get(`/quiz/chapter/${id}`, { params: { count } }).then((r) => r.data),
  byTopic: (id, count = 10) =>
    api.get(`/quiz/topic/${id}`, { params: { count } }).then((r) => r.data),
  random: (count = 10) => api.get('/quiz/random', { params: { count } }).then((r) => r.data),
  submit: (answers) => api.post('/quiz/submit', { answers }).then((r) => r.data),
};

/* ---------- Mock tests (protected) ---------- */
export const mockTestsApi = {
  list: () => api.get('/mock-tests').then((r) => r.data),
  get: (id) => api.get(`/mock-tests/${id}`).then((r) => r.data),
  submit: (id, answers) => api.post(`/mock-tests/${id}/submit`, { answers }).then((r) => r.data),
};

/* ---------- Progress (protected) ---------- */
export const progressApi = {
  get: () => api.get('/progress').then((r) => r.data),
  stats: () => api.get('/progress/stats').then((r) => r.data),
  update: (body) => api.post('/progress', body).then((r) => r.data),
};
