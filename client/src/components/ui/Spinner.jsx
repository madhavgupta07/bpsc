import { cn } from '../../lib/cn';

export function Spinner({ className }) {
  return (
    <div
      role="status"
      aria-label="loading"
      className={cn(
        'size-8 animate-spin rounded-full border-[3px] border-brand-200 border-t-brand-600 dark:border-zinc-700 dark:border-t-brand-400',
        className,
      )}
    />
  );
}

export default Spinner;

export function Skeleton({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-xl bg-slate-200/80 dark:bg-zinc-800/80', className)}
    />
  );
}
