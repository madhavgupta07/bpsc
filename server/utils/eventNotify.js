const { notifyTelegram, notifyWithBurst, esc, configured } = require('./telegram');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');
const MockTest = require('../models/MockTest');

/**
 * Structured Telegram event notifications on top of the low-level notifier.
 *
 * Adds opt-out-able, per-event alerts:
 *   - every error response (4xx + 5xx), not only 500s
 *   - every quiz submission
 *   - every mock test submission
 *
 * Env toggles (all default ON):
 *   TELEGRAM_NOTIFY_ERRORS = all | 5xx | off   which error responses to report
 *   TELEGRAM_NOTIFY_QUIZ   = false             disable per-quiz-submission alerts
 *   TELEGRAM_NOTIFY_MOCK   = false             disable per-mock-test alerts
 *
 * Every notifier here is fire-and-forget: it never throws and never blocks
 * the request handler that triggered it.
 */

function isEnabled(name, defaultValue = true) {
  const v = process.env[name];
  if (v === undefined || v === null || v === '') return defaultValue;
  return !['false', 'off', '0', 'no'].includes(String(v).toLowerCase().trim());
}

function errorEnabled(status) {
  const mode = (process.env.TELEGRAM_NOTIFY_ERRORS || 'all').toLowerCase().trim();
  if (mode === 'off') return false;
  if (mode === '5xx') return status >= 500;
  return true;
}

/** Run a notifier without ever letting it reject into a caller's hot path. */
async function safeSend(fn) {
  try {
    await fn();
  } catch {
    /* notifications must never break the request path */
  }
}

function percentile(score, total) {
  if (!total) return null;
  return Math.round((score / total) * 100);
}

/**
 * Report any error response to Telegram. Spun from a res.json patch so it
 * also catches errors that controllers swallow with res.status().json().
 * Repeated identical errors collapse into one burst-counted message.
 */
/** Known bot User-Agent patterns. */
const BOT_UA_RE = /bot|crawl|spider|slurp|wget|curl|python|axios|node-fetch|headless|phantom|lighthouse|pagespeed|prerender/i;

function notifyError(err, req = {}) {
  const status = Number(err?.statusCode || err?.status || 500);
  if (!configured || !errorEnabled(status)) return;

  const url = req.originalUrl || req.url || '';
  const method = req.method || 'GET';
  const user = req.user?.email || req.user?.name || 'anonymous';
  const message = (err?.message || err?.stack || String(err)).slice(0, 300);

  const ua = (req.headers?.['user-agent'] || '').slice(0, 150);
  const ip = req.headers?.['x-forwarded-for']?.split(',')[0]?.trim()
    || req.socket?.remoteAddress || '';
  const isBot = BOT_UA_RE.test(ua);

  const icon = status >= 500 ? '🔴' : status === 401 || status === 403 ? '🔒' : '🟠';
  const label = status >= 500 ? 'ERROR' : status === 401 || status === 403 ? 'ACCESS' : 'CLIENT';

  // 4xx repeats are common (bots, bad requests) — allow a higher repeat count
  // before fully suppressing, and still collapse them inside the window.
  safeSend(() =>
    notifyWithBurst(
      `${icon} <b>${label} ${status}</b> — <code>${esc(method)} ${esc(url)}</code>\n` +
        `<i>${esc(message)}</i>\n` +
        `👤 ${esc(user)} · 🌐 <code>${esc(ip)}</code>\n` +
        `${isBot ? '🤖 BOT' : '🧑 Human'} · <code>${esc(ua || 'no UA')}</code>`,
      status >= 500 ? 5 : 15
    )
  );
}

/** Notify once per quiz submission, with chapter/topic context. */
async function notifyQuiz(user, entry = {}) {
  if (!configured || !isEnabled('TELEGRAM_NOTIFY_QUIZ')) return;
  const [chapter, topic] = await Promise.all([
    entry.chapter ? Chapter.findById(entry.chapter).select('chapterNumber title_en').lean() : null,
    entry.topic ? Topic.findById(entry.topic).select('name_en').lean() : null,
  ]);
  const label = topic?.name_en || (chapter ? `Ch ${chapter.chapterNumber}: ${chapter.title_en}` : 'Mixed');
  const p = percentile(entry.score, entry.total);
  const lines = [
    '🧠 <b>Quiz submitted</b>',
    `👤 ${esc(user?.name || '—')} · ${esc(user?.email || '—')}`,
    `📚 ${esc(label)}`,
    `🎯 <b>${entry.score}/${entry.total}</b>${p != null ? ` (${p}%)` : ''}`,
    entry.timeTaken ? `⏱ ${Math.round(entry.timeTaken / 1000)}s` : '',
  ].filter(Boolean);
  await notifyTelegram(lines.join('\n'));
}

/** Notify once per mock test submission. */
async function notifyMock(user, entry = {}) {
  if (!configured || !isEnabled('TELEGRAM_NOTIFY_MOCK')) return;
  const test = entry.test ? await MockTest.findById(entry.test).select('title_en type').lean() : null;
  const p = percentile(entry.score, entry.total);
  const lines = [
    '🧪 <b>Mock test submitted</b>',
    `👤 ${esc(user?.name || '—')} · ${esc(user?.email || '—')}`,
    `📝 ${esc(test?.title_en || 'Custom')}${test?.type ? ` (${test.type})` : ''}`,
    `🎯 <b>${entry.score}/${entry.total}</b>${p != null ? ` (${p}%)` : ''}`,
    entry.timeTaken ? `⏱ ${Math.round(entry.timeTaken / 1000)}s` : '',
  ].filter(Boolean);
  await notifyTelegram(lines.join('\n'));
}

module.exports = { notifyError, notifyQuiz, notifyMock, isEnabled, safeSend };