import { cn } from '../../lib/cn';

export default function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-3.5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
          {Icon && <Icon className="size-5" aria-hidden="true" />}
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs font-medium text-slate-500 dark:text-zinc-400">{label}</p>
          <p className="text-xl font-extrabold tabular-nums tracking-tight text-slate-900 dark:text-zinc-100">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
