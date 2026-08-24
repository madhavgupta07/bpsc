import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Exam proctoring hook — models a strict CBT environment.
 *
 * While `active` it enforces:
 *  - fullscreen (exiting counts as a violation)
 *  - tab/window switching (visibilitychange + blur)
 *  - browser back navigation (intercepted with a confirm dialog)
 *  - accidental refresh/close (beforeunload)
 *  - clipboard & context-menu lockdown
 *
 * After `maxViolations` it calls `onAutoSubmit('security', violations)` once.
 */
export default function useExamSecurity({ active, maxViolations = 3, onAutoSubmit }) {
  const [violations, setViolations] = useState(0);
  const [warning, setWarning] = useState(null); // 'tab' | 'blur' | 'fullscreen'
  const [exitConfirm, setExitConfirm] = useState(false);

  const violationsRef = useRef(0);
  const lastViolationAt = useRef(0);
  const leavingRef = useRef(false); // we initiated exit ourselves
  const autoRef = useRef(onAutoSubmit);
  autoRef.current = onAutoSubmit;

  const enterFullscreen = useCallback(() => {
    document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);
  const exitFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  }, []);

  const registerViolation = useCallback(
    (kind) => {
      if (!active) return;
      const now = Date.now();
      if (now - lastViolationAt.current < 800) return; // debounce double-fires
      lastViolationAt.current = now;
      violationsRef.current += 1;
      setViolations(violationsRef.current);
      if (violationsRef.current >= maxViolations) {
        leavingRef.current = true;
        setWarning(null);
        exitFullscreen();
        autoRef.current?.('security', violationsRef.current);
      } else {
        setWarning(kind);
      }
    },
    [active, maxViolations, exitFullscreen],
  );

  /* Tab switch + window blur */
  useEffect(() => {
    if (!active) return;
    const onVisibility = () => {
      if (document.hidden) registerViolation('tab');
    };
    let blurTimer;
    const onBlur = () => {
      clearTimeout(blurTimer);
      blurTimer = setTimeout(() => {
        if (!document.hidden && !document.hasFocus()) registerViolation('blur');
      }, 250);
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', onBlur);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      clearTimeout(blurTimer);
      window.removeEventListener('blur', onBlur);
    };
  }, [active, registerViolation]);

  /* Fullscreen enforcement */
  useEffect(() => {
    if (!active) return;
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) registerViolation('fullscreen');
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, [active, registerViolation]);

  /* Back-navigation interception */
  useEffect(() => {
    if (!active) return;
    window.history.pushState({ examGuard: true }, '', window.location.href);
    const onPopState = () => {
      if (leavingRef.current) return;
      // Stay on the question paper, but demand confirmation.
      window.history.pushState({ examGuard: true }, '', window.location.href);
      setExitConfirm(true);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [active]);

  /* Refresh / close guard */
  useEffect(() => {
    if (!active) return;
    const onBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [active]);

  /* Clipboard & context menu lockdown */
  useEffect(() => {
    if (!active) return;
    const prevent = (e) => e.preventDefault();
    document.addEventListener('contextmenu', prevent);
    document.addEventListener('copy', prevent);
    document.addEventListener('cut', prevent);
    document.addEventListener('paste', prevent);
    return () => {
      document.removeEventListener('contextmenu', prevent);
      document.removeEventListener('copy', prevent);
      document.removeEventListener('cut', prevent);
      document.removeEventListener('paste', prevent);
    };
  }, [active]);

  /** Call inside the submit flow so our own navigation doesn't re-trigger guards. */
  const markLeaving = useCallback(() => {
    leavingRef.current = true;
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  }, []);

  return {
    violations,
    warning,
    dismissWarning: () => setWarning(null),
    exitConfirm,
    setExitConfirm,
    enterFullscreen,
    exitFullscreen,
    markLeaving,
  };
}
