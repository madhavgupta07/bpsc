import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

const Input = forwardRef(function Input({ label, error, id, className, ...props }, ref) {
  const inputId = id || props.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn(
          'block w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm ring-1 ring-inset transition-shadow',
          'placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-500',
          'dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:placeholder:text-zinc-500',
          error ? 'ring-rose-400 focus:ring-rose-500' : 'ring-slate-200 dark:ring-zinc-700',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} role="alert" className="text-xs font-medium text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
