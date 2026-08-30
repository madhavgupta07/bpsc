const cron = require('node-cron');
const User = require('../models/User');
const UserProgress = require('../models/UserProgress');
const { notifyTelegram, configured, esc } = require('../utils/telegram');

/**
 * Hourly activity report posted to Telegram.
 *
 * Every hour it summarizes the last 60 minutes:
 *  - new users created
 *  - distinct users who attempted quiz questions (quizHistory this hour)
 *  - distinct users who attempted a mock test (mockTestHistory this hour)
 *  - distinct users with any activity logged this hour (stats.lastActive)
 *
 * Env:
 *   TELEGRAM_CRON        cron override (default '0 * * * *' = top of every hour)
 *   ENABLE_TELEGRAM_CRON =false to disable
 */
const HOUR = 60 * 60 * 1000;

async function sendHourlyReport() {
  if (!configured) return;
  const since = new Date(Date.now() - HOUR);
  const now = new Date();

  const [newUsers, quizUsers, mockUsers, activeUsers] = await Promise.all([
    User.countDocuments({ createdAt: { $gte: since } }),
    distinctUsersByField('quizHistory', since),
    distinctUsersByField('mockTestHistory', since),
    User.countDocuments({ 'stats.lastActive': { $gte: since } }),
  ]);

  const lines = [
    '📊 <b>Hourly Activity Report</b>',
    `🕐 ${now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
    '',
    `🆕 New users: <b>${newUsers}</b>`,
    `📝 Quiz attempts: <b>${quizUsers}</b> user(s)`,
    `🧪 Mock tests: <b>${mockUsers}</b> user(s)`,
    `⚡ Active users: <b>${activeUsers}</b>`,
  ];

  await notifyTelegram(lines.join('\n'));
}

async function distinctUsersByField(field, since) {
  const docs = await UserProgress.find({
    [field]: { $elemMatch: { date: { $gte: since } } },
  }).select('user');
  return docs.length;
}

function startTelegramJob() {
  if (process.env.ENABLE_TELEGRAM_CRON === 'false') return;
  const pattern = process.env.TELEGRAM_CRON || '0 * * * *';
  if (!cron.validate(pattern)) {
    console.warn(`[telegram-job] Invalid cron "${pattern}" — hourly report disabled`);
    return;
  }
  cron.schedule(pattern, () => {
    sendHourlyReport().catch((err) => {
      console.error('[telegram-job]', err.message);
      const { notifyTelegram } = require('../utils/telegram');
      notifyTelegram(`⚠️ <b>Hourly report failed</b>\n${esc(err.message)}`);
    });
  });
  console.log(`[telegram-job] Hourly report scheduled with cron "${pattern}"`);
}

module.exports = { startTelegramJob, sendHourlyReport };
