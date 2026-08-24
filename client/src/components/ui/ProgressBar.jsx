import { cn } from '../../lib/cn';

export default function ProgressBar({ value, max = 100, className, barClassName, label }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800', className)}
    >
      <div
        className={cn(
          'h-full rounded-full bg-brand-600 transition-[width] duration-500 ease-out',
          barClassName,
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
