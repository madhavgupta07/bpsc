import { cn } from '../../lib/cn';

export default function Badge({ className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset',
        'bg-slate-100 text-slate-600 ring-slate-500/10',
        'dark:bg-zinc-800/60 dark:text-zinc-300 dark:ring-zinc-500/20',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
