import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useDocumentLocale } from './hooks/useDocumentLocale';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Eager: landing page (always needed on first paint).
import Home from './pages/Home';

// Lazy-loaded pages — each becomes its own chunk, fetched on demand.
const ExamInfo = lazy(() => import('./pages/ExamInfo'));
const Syllabus = lazy(() => import('./pages/Syllabus'));
const ChapterDetail = lazy(() => import('./pages/ChapterDetail'));
const Notes = lazy(() => import('./pages/Notes'));
const NoteDetail = lazy(() => import('./pages/NoteDetail'));
const QuizSetup = lazy(() => import('./pages/QuizSetup'));
const Quiz = lazy(() => import('./pages/Quiz'));
const MockTests = lazy(() => import('./pages/MockTests'));
const MockTestPlay = lazy(() => import('./pages/MockTestPlay'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Results = lazy(() => import('./pages/Results'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const Admin = lazy(() => import('./pages/admin/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Forum = lazy(() => import('./pages/Forum'));
const ForumNew = lazy(() => import('./pages/ForumNew'));
const ForumPost = lazy(() => import('./pages/ForumPost'));

/** Minimal full-page loading indicator for lazy-loaded routes. */
function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="size-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
    </div>
  );
}

/** Scrolls to top on navigation — standard SPA UX practice. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useDocumentLocale();
  const location = useLocation();

  // Full-screen quiz/test modes hide the site chrome for focus.
  const isImmersive = ['/quiz/', '/test/'].some((p) => location.pathname.startsWith(p));

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      {!isImmersive && <Navbar />}
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exam-info" element={<ExamInfo />} />
            <Route path="/syllabus" element={<Syllabus />} />
            <Route path="/syllabus/:id" element={<ChapterDetail />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:num" element={<NoteDetail />} />
            <Route path="/quiz" element={<QuizSetup />} />
            <Route path="/quiz/:mode/:id?" element={<Quiz />} />
            <Route path="/mock-tests" element={<MockTests />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/:id" element={<ForumPost />} />

            {/* Authenticated routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/test/:id" element={<MockTestPlay />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/forum/new" element={<ForumNew />} />
            </Route>

            <Route path="/results" element={<Results />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Navigate to="/login" replace />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isImmersive && <Footer />}
    </div>
  );
}
