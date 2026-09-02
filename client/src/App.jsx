import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDocumentLocale } from './hooks/useDocumentLocale';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Home from './pages/Home';
import ExamInfo from './pages/ExamInfo';
import Syllabus from './pages/Syllabus';
import ChapterDetail from './pages/ChapterDetail';
import Notes from './pages/Notes';
import NoteDetail from './pages/NoteDetail';
import QuizSetup from './pages/QuizSetup';
import Quiz from './pages/Quiz';
import MockTests from './pages/MockTests';
import MockTestPlay from './pages/MockTestPlay';
import Leaderboard from './pages/Leaderboard';
import Results from './pages/Results';
import Profile from './pages/Profile';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import Admin from './pages/admin/Admin';
import NotFound from './pages/NotFound';

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

          {/* Authenticated routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/test/:id" element={<MockTestPlay />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/results" element={<Results />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Navigate to="/login" replace />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isImmersive && <Footer />}
    </div>
  );
}
