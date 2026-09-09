import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { ChevronDown, Clock3, Mail, MessageSquareText, Send, SendHorizonal } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Seo from '../components/seo/Seo';
import { contactApi } from '../lib/api';
import { cn } from '../lib/cn';

const FAQS = [
  { qKey: 'faq1q', aKey: 'faq1a' },
  { qKey: 'faq2q', aKey: 'faq2a' },
  { qKey: 'faq3q', aKey: 'faq3a' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [openFaq, setOpenFaq] = useState(-1);
  const [sending, setSending] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = t('contact.nameRequired');
    if (!EMAIL_RE.test(form.email.trim())) next.email = t('contact.invalidEmail');
    if (form.message.trim().length < 10) next.message = t('contact.messageRequired');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      await contactApi.send({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      toast.success(t('contact.success'));
      setForm({ name: '', email: '', message: '' });
      setErrors({});
    } catch (err) {
      toast.error(err.message || t('contact.error'));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container-app max-w-5xl py-10">
      <Seo
        title={t('contact.title')}
        description="Questions, feedback or a correction? Contact Bihar STET & BPSC CS — we usually reply within 24-48 hours."
        path="/contact"
      />

      <header className="max-w-3xl">
        <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/20">
          {t('nav.support')}
        </span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{t('contact.title')}</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">{t('contact.subtitle')}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500 dark:bg-zinc-800 dark:text-zinc-400">
          <Clock3 className="size-3.5 text-slate-400" aria-hidden="true" />
          {t('contact.replyTime')} · {t('contact.replyTimeDesc')}
        </span>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-5 lg:items-start">
        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-3 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/20">
              <MessageSquareText className="size-4.5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-base font-bold">{t('contact.formTitle')}</h2>
              <p className="text-xs text-slate-400 dark:text-zinc-500">{t('contact.formHint')}</p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <Input
              label={t('contact.name')}
              name="name"
              value={form.name}
              onChange={set('name')}
              error={errors.name}
              maxLength={80}
              placeholder="Your full name"
            />
            <Input
              label={t('contact.email')}
              name="email"
              type="email"
              value={form.email}
              onChange={set('email')}
              error={errors.email}
              maxLength={120}
              placeholder="you@example.com"
            />
            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                rows={6}
                value={form.message}
                onChange={set('message')}
                placeholder={t('contact.messagePlaceholder')}
                aria-invalid={Boolean(errors.message)}
                maxLength={2000}
                className="block w-full rounded-xl border-0 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm ring-1 ring-inset transition-shadow placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700 dark:placeholder:text-zinc-500"
              />
              {errors.message && (
                <p id="message-error" role="alert" className="text-xs font-medium text-rose-600 dark:text-rose-400">{errors.message}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="hidden text-xs text-slate-400 dark:text-zinc-500 sm:block">{t('contact.formNote')}</p>
            <Button type="submit" loading={sending} className="sm:ml-auto">
              {sending ? (
                t('contact.sending')
              ) : (
                <>
                  <Send className="size-4" aria-hidden="true" /> {t('contact.send')}
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Direct channels */}
        <div className="space-y-4 lg:col-span-2">
          <a
            href={`mailto:madhavgupta5555@gmail.com`}
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-500/50"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/20">
              <Mail className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-bold">{t('contact.emailTitle')}</span>
              <span className="block break-all text-xs text-slate-500 dark:text-zinc-400">{t('contact.emailDesc')}</span>
            </span>
          </a>
          <a
            href="https://t.me/bpscstetcs"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-brand-500/50"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/20">
              <SendHorizonal className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-bold">{t('contact.telegramTitle')}</span>
              <span className="block text-xs text-slate-500 dark:text-zinc-400">{t('contact.telegramDesc')}</span>
            </span>
          </a>
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20">
              <Clock3 className="size-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-bold">{t('contact.replyTime')}</span>
              <span className="block text-xs text-slate-500 dark:text-zinc-400">{t('contact.replyTimeDesc')}</span>
            </span>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-lg font-extrabold tracking-tight">{t('contact.faqTitle')}</h2>
        <div className="mt-4 space-y-3">
          {FAQS.map(({ qKey, aKey }, i) => {
            const open = openFaq === i;
            return (
              <div
                key={qKey}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              >
                <button
                  onClick={() => setOpenFaq((o) => (o === i ? -1 : i))}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold"
                >
                  {t(`contact.${qKey}`)}
                  <ChevronDown
                    className={cn('size-4 shrink-0 text-slate-400 transition-transform dark:text-zinc-500', open && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>
                {open && (
                  <p className="border-t border-slate-100 px-5 py-4 text-sm leading-relaxed text-slate-500 dark:border-zinc-800 dark:text-zinc-400">
                    {t(`contact.${aKey}`)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}