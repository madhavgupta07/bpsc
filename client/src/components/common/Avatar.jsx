import { cn } from '../../lib/cn';

/**
 * User avatar: Google photo when available, otherwise an initial chip.
 * `size` accepts any Tailwind size (default h-9 w-9).
 */
export default function Avatar({ name, avatar, size = 'h-9 w-9', textClass = 'text-sm', className }) {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt=""
        referrerPolicy="no-referrer"
        loading="lazy"
        className={cn('rounded-full object-cover', size, className)}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300',
        size,
        textClass,
        className,
      )}
    >
      {name?.charAt(0)?.toUpperCase() || '?'}
    </span>
  );
}