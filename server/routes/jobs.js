const express = require('express');
const router = express.Router();
const { sendStreakReminders } = require('../jobs/streakReminder');
const { sendHourlyReport } = require('../jobs/hourlyReport');

// Middleware to verify secret token from Vercel Cron or external triggers
const verifyCronSecret = (req, res, next) => {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // If CRON_SECRET is not set, allow in development or log warning
    return next();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : req.query.secret;

  if (token !== secret) {
    return res.status(401).json({ message: 'Unauthorized cron request' });
  }

  next();
};

router.use(verifyCronSecret);

router.get('/streak-reminder', async (req, res, next) => {
  try {
    await sendStreakReminders();
    res.json({ status: 'ok', job: 'streak-reminder', timestamp: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
});

router.get('/hourly-report', async (req, res, next) => {
  try {
    await sendHourlyReport();
    res.json({ status: 'ok', job: 'hourly-report', timestamp: new Date().toISOString() });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
