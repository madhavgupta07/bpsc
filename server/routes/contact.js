const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { sendMail } = require('../config/mailer');
const { notifyTelegram, esc } = require('../utils/telegram');

const router = express.Router();

/** Destination inbox for contact form submissions. */
function contactEmail() {
  const raw = process.env.CONTACT_EMAIL || process.env.MAIL_FROM || process.env.SMTP_USER || '';
  const m = String(raw).match(/<([^>]+)>/);
  return m ? m[1].trim() : raw.trim();
}

// Tight limiter — contact forms are a classic spam/email-bomb vector.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many messages from this address. Please try again later.' },
});

router.post(
  '/',
  contactLimiter,
  body('name').trim().isLength({ min: 2, max: 80 }).withMessage('Name must be 2-80 characters'),
  body('email').trim().isEmail().withMessage('Enter a valid email address'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be 10-2000 characters'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array()[0].msg });
    }

    const { name, email, message } = req.body;
    const to = contactEmail();
    const telegramEnabled = require('../utils/telegram').configured;

    if (!to && !telegramEnabled) {
      return res.status(503).json({ message: 'Contact form is not configured yet.' });
    }

    // Notify myself via Telegram (fire-and-forget).
    notifyTelegram(
      `✉️ <b>New contact message</b>\n👤 ${esc(name)} · <code>${esc(email)}</code>\n\n“${esc(message)}”`,
    );

    // Email copy to the configured inbox.
    if (to) {
      sendMail({
        to,
        subject: `[Website] Contact from ${name}`,
        html: `<p><strong>Name:</strong> ${esc(name)}</p>
               <p><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
               <p><strong>Message:</strong></p>
               <p>${esc(message).replace(/\n/g, '<br>')}</p>`,
      });
    }

    res.json({ ok: true });
  },
);

module.exports = router;