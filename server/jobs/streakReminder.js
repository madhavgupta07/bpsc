const cron = require('node-cron');
const User = require('../models/User');
const { sendMail, configured } = require('../config/mailer');
const { streakReminderEmail } = require('../utils/emailTemplates');

/**
 * Daily streak-reminder job.
 *
 * Runs every day at 18:00 IST (12:30 UTC). Targets users who:
 *  - have a streak worth saving (streakDays >= 1)
 *  - were active yesterday-ish but NOT today (lastActive 20–48h ago)
 *  - haven't already been reminded in the last 20 hours
 *
 * Env:
 *   STREAK_CRON   cron expression override (default '30 12 * * *')
 *   ENABLE_EMAIL_CRON=false to disable
 */
const HOUR = 60 * 60 * 1000;

async function sendStreakReminders() {
  if (!configured) return;
  const now = Date.now();
  const users = await User.find({
    email: { $exists: true, $ne: '' },
    'stats.streakDays': { $gte: 1 },
    // Active in the last 48h but not within the last 20h → at risk today.
    'stats.lastActive': { $lt: new Date(now - 20 * HOUR), $gt: new Date(now - 48 * HOUR) },
    $or: [
      { 'stats.lastReminderSent': null },
      { 'stats.lastReminderSent': { $lt: new Date(now - 20 * HOUR) } },
    ],
  })
    .select('name email stats')
    .limit(500);

  let sent = 0;
  for (const user of users) {
    await sendMail(streakReminderEmail(user));
    user.stats.lastReminderSent = new Date();
    await user.save();
    sent++;
  }
  console.log(`[streak-job] Sent ${sent} reminder(s)`);
}

function startStreakJob() {
  if (process.env.ENABLE_EMAIL_CRON === 'false') return;
  const pattern = process.env.STREAK_CRON || '30 12 * * *';
  if (!cron.validate(pattern)) {
    console.warn(`[streak-job] Invalid cron pattern "${pattern}" — job disabled`);
    return;
  }
  cron.schedule(pattern, () => {
    sendStreakReminders().catch((err) => console.error('[streak-job]', err.message));
  });
  console.log(`[streak-job] Scheduled with cron "${pattern}"`);
}

module.exports = { startStreakJob, sendStreakReminders };
