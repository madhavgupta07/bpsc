import { useEffect, useRef, useState } from 'react';
import { formatDuration } from '../../hooks/useLocalized';

/** Counts up from a persisted start epoch (tamper-resistant across reloads). */
export function CountUpTimer({ startEpoch, onTick }) {
  const [, force] = useState(0);
  const secondsRef = useRef(Math.floor((Date.now() - startEpoch) / 1000));
  useEffect(() => {
    const id = setInterval(() => {
      secondsRef.current = Math.floor((Date.now() - startEpoch) / 1000);
      onTick?.(secondsRef.current);
      force((n) => n + 1);
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startEpoch]);
  return <span className="tabular-nums">{formatDuration(secondsRef.current)}</span>;
}

/** Counts down to an absolute deadline epoch; fires onExpire exactly once. */
export function CountDownTimer({ deadline, onExpire }) {
  const [remaining, setRemaining] = useState(() => Math.max(0, deadline - Date.now()));
  const firedRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const left = Math.max(0, deadline - Date.now());
      setRemaining(left);
      if (left <= 0 && !firedRef.current) {
        firedRef.current = true;
        clearInterval(id);
        onExpire?.();
      }
    };
    const id = setInterval(tick, 500);
    tick();
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadline]);

  const danger = remaining <= 60_000;
  return (
    <span className={danger ? 'animate-pulse tabular-nums text-rose-600 dark:text-rose-400' : 'tabular-nums'}>
      {formatDuration(remaining / 1000)}
    </span>
  );
}
