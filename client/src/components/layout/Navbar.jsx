import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GraduationCap, LogOut, Menu, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/cn';

const navLinkClass = ({ isActive }) =>
  cn(
    'border-b-2 px-0.5 py-4 text-sm transition-colors',
    isActive
      ? 'border-brand-600 font-semibold text-slate-900 dark:border-brand-400 dark:text-white'
      : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-zinc-100',
  );

export default function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <nav className="container-app flex h-14 items-center justify-between gap-3" aria-label="Main">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label={t('app.fullName')}>
          <span className="flex size-8 items-center justify-center rounded-md bg-slate-900 text-white dark:bg-white dark:text-zinc-900">
            <GraduationCap className="size-[18px]" aria-hidden="true" />
          </span>
          <span className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
            {t('app.name')}
          </span>
        </Link>

        <div className="hidden h-full items-center gap-6 md:flex">
          <NavLink to="/" end className={navLinkClass}>{t('nav.home')}</NavLink>
          <NavLink to="/syllabus" className={navLinkClass}>{t('nav.syllabus')}</NavLink>
          <NavLink to="/notes" className={navLinkClass}>{t('nav.notes')}</NavLink>
          <NavLink to="/mock-tests" className={navLinkClass}>{t('nav.mockTests')}</NavLink>
        </div>

        <div className="flex items-center gap-1.5">
          <LanguageToggle size="sm" />
          <ThemeToggle />

          {user ? (
            <div className="relative ml-1" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-label={t('nav.profile')}
                className="flex size-8 items-center justify-center rounded-md bg-slate-900 text-sm font-bold text-white dark:bg-white dark:text-zinc-900"
              >
                {user.name?.charAt(0).toUpperCase()}
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12 }}
                    className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
                  >
                    <div className="border-b border-slate-100 px-4 py-3 dark:border-zinc-800">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-zinc-100">{user.name}</p>
                      <p className="truncate text-xs text-slate-500 dark:text-zinc-400">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      role="menuitem"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      <User className="size-4" aria-hidden="true" /> {t('nav.profile')}
                    </Link>
                    <button
                      role="menuitem"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                    >
                      <LogOut className="size-4" aria-hidden="true" /> {t('nav.logout')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button as={Link} to="/login" size="sm">{t('nav.login')}</Button>
            </div>
          )}

          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={t('nav.menu')}
            className="flex size-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-200 bg-white md:hidden dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="container-app flex flex-col py-3">
              {[['/', 'nav.home'], ['/syllabus', 'nav.syllabus'], ['/notes', 'nav.notes'], ['/mock-tests', 'nav.mockTests']].map(([to, key]) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    cn('rounded-md px-3 py-2.5 text-sm font-medium',
                      isActive ? 'bg-slate-100 text-slate-900 dark:bg-zinc-800 dark:text-white' : 'text-slate-600 dark:text-zinc-400')
                  }
                >
                  {t(key)}
                </NavLink>
              ))}
              {!user && (
                <Button as={Link} to="/login" size="sm" className="mt-2">{t('nav.login')}</Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
