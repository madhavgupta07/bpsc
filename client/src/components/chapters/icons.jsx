import {
  Cpu, Server, Code2, Route, Monitor, Database, Globe, Cog, Boxes,
  Infinity as InfinityIcon, Wifi, Brain, ShoppingCart, Film, BookOpen,
  Lightbulb, FileQuestion,
} from 'lucide-react';

const ICON_MAP = {
  cpu: Cpu,
  server: Server,
  code: Code2,
  route: Route,
  monitor: Monitor,
  database: Database,
  globe: Globe,
  cog: Cog,
  boxes: Boxes,
  infinity: InfinityIcon,
  wifi: Wifi,
  brain: Brain,
  'shopping-cart': ShoppingCart,
  film: Film,
  'book-open': BookOpen,
  lightbulb: Lightbulb,
};

export function ChapterIcon({ name, className = 'size-5' }) {
  const Icon = ICON_MAP[name] || FileQuestion;
  return <Icon className={className} aria-hidden="true" />;
}

const GRADIENTS = [
  'bg-brand-500',
  'bg-sky-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-violet-500',
];

export function chapterGradient(chapterNumber = 0) {
  return GRADIENTS[chapterNumber % GRADIENTS.length];
}
