const nodemailer = require('nodemailer');

/**
 * SMTP mailer. Entirely optional — if SMTP env vars are missing the helpers
 * become logged no-ops so the app runs fine without email configured.
 *
 * Env:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM
 */
const configured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

const transporter = configured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

if (!configured) {
  console.warn('[mailer] SMTP not configured — emails will be skipped (log-only).');
}

/** Fire-and-forget send. Never throws into request handlers or jobs. */
async function sendMail({ to, subject, html }) {
  if (!to) return;
  if (!transporter) {
    console.log(`[mailer:skip] to=${to} subject="${subject}"`);
    return;
  }
  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || `Bihar STET CS <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error(`[mailer:error] to=${to}: ${err.message}`);
  }
}

module.exports = { sendMail, configured };
