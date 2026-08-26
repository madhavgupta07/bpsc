import api, { API_BASE } from './apiClient';

/* ---------- Auth (Google-only, httpOnly cookie session) ---------- */
export const authApi = {
  // Absolute so the OAuth start link reaches the backend even on a split deploy.
  googleUrl: `${API_BASE}/api/auth/google`,
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

/* ---------- Leaderboard (public) ---------- */
export const leaderboardApi = {
  list: (scope = 'overall', limit = 50) =>
    api.get('/leaderboard', { params: { scope, limit } }).then((r) => r.data),
  byMockTest: (testId, limit = 50) =>
    api.get(`/leaderboard/mock/${testId}`, { params: { limit } }).then((r) => r.data),
};

/* ---------- Admin (admin-only) ---------- */
export const adminApi = {
  stats: () => api.get('/admin/stats').then((r) => r.data),
  users: (params) => api.get('/admin/users', { params }).then((r) => r.data),
  setUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }).then((r) => r.data),
  // Chapters
  createChapter: (body) => api.post('/admin/chapters', body).then((r) => r.data),
  updateChapter: (id, body) => api.put(`/admin/chapters/${id}`, body).then((r) => r.data),
  deleteChapter: (id) => api.delete(`/admin/chapters/${id}`).then((r) => r.data),
  // Questions
  questions: (params) => api.get('/admin/questions', { params }).then((r) => r.data),
  createQuestion: (body) => api.post('/admin/questions', body).then((r) => r.data),
  updateQuestion: (id, body) => api.put(`/admin/questions/${id}`, body).then((r) => r.data),
  deleteQuestion: (id) => api.delete(`/admin/questions/${id}`).then((r) => r.data),
  // Mock tests
  mockTests: () => api.get('/admin/mock-tests').then((r) => r.data),
  createMockTest: (body) => api.post('/admin/mock-tests', body).then((r) => r.data),
  deleteMockTest: (id) => api.delete(`/admin/mock-tests/${id}`).then((r) => r.data),
};
