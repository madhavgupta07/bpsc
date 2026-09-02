const TelegramBot = require('node-telegram-bot-api');

/**
 * Minimal Telegram notifier.
 *
 * Uses node-telegram-bot-api purely for its sendMessage HTTP method — we do NOT
 * start polling/webhook, so this works fine on long-running Render services and
 * only needs outbound HTTPS (port 443) to api.telegram.org.
 *
 * Env:
 *   TELEGRAM_BOT_TOKEN   token from @BotFather
 *   TELEGRAM_CHAT_ID     your personal chat id (from @userinfobot)
 *
 * If either is missing this module silently no-ops (logs a skip) so the app
 * keeps running without Telegram configured.
 *
 * IMPORTANT: the bot is created LAZILY (on first send) rather than at require
 * time, so that merely requiring this module can never throw into a caller's
 * critical path (e.g. the Google OAuth handler). notifyTelegram always swallows
 * its own errors and never rejects into unrelated request handlers.
 */
const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID && process.env.TELEGRAM_CHAT_ID.trim();
const configured = Boolean(token && chatId);

let bot = null;
function getBot() {
  if (!bot) bot = new TelegramBot(token, { polling: false });
  return bot;
}

if (!configured) {
  console.warn('[telegram] Not configured (set TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID) — notifications off.');
} else {
  console.log('[telegram] Notifications enabled.');
}

// Anti-storm: group repeated identical notifications (e.g. same recurring error)
// into a single message showing the burst count, so a tight loop doesn't flood chat.
const burst = new Map(); // key -> { lastText, count, firstTs }
const BURST_WINDOW = 10 * 60 * 1000;

function burstKey(text) {
  // Normalize by first ~160 chars + stack line (if present) to group similar errors.
  return text.replace(/\d{4}-\d{2}-\d{2}[T ].*/g, '').slice(0, 160);
}

/**
 * Send a plain-text message to the configured chat. Fire-and-forget.
 * NEVER throws — failures are logged only, so this is safe in any hot path.
 * @param {string} text
 * @param {object} [opts]  { burstLimit: max identical repeats per window (default 5) }
 */
async function notifyTelegram(text) {
  if (!configured || !text) return;
  try {
    await getBot().sendMessage(chatId, text, { parse_mode: 'HTML', disable_web_page_preview: true });
  } catch (err) {
    // Telegram failures must never take down the server or mask the original error.
    console.error(`[telegram:error] ${err.message}`);
  }
}

async function notifyWithBurst(text, burstLimit = 5) {
  if (!configured) return;
  const key = burstKey(text);
  const now = Date.now();
  const rec = burst.get(key);

  if (rec && now - rec.firstTs < BURST_WINDOW) {
    rec.count += 1;
    if (rec.count <= burstLimit) {
      // Suppress identical repeats after the first, but reopen after the window.
      await notifyTelegram(`${text}\n\n<i>(Repeated ×${rec.count})</i>`);
    }
    return;
  }
  burst.set(key, { count: 1, firstTs: now });
  await notifyTelegram(text);
}

/** Escape text so it renders literally inside an HTML parse_mode message. */
function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

module.exports = { notifyTelegram, notifyWithBurst, esc, configured };
