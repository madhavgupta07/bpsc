const nodemailer = require('nodemailer');

/**
 * Mailer with two transport backends.
 *
 * Primary (required for Render Free Tier): Brevo's transactional HTTP API.
 *   Env:
 *     BREVO_API_KEY  your Brevo API v3 key
 *     MAIL_FROM      sender, e.g. "Bihar STET CS <you@example.com>" (or plain email)
 *   Uses standard HTTPS (port 443) so it works even though Render's Free Tier
 *   hard-blocks outbound SMTP ports (25/465/587) — the cause of "Connection timeout".
 *
 * Fallback: classic SMTP via Nodemailer (e.g. for local dev / paid Render tiers).
 *   Env:
 *     SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM
 *
 * `configured` is true if EITHER backend has its env vars present, so the rest
 * of the app keeps working unchanged. Emails are always fire-and-forget and
 * never throw into request handlers or jobs.
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SMTP_OK = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
const configured = Boolean(BREVO_API_KEY || SMTP_OK);

const SIMPLE_FROM = process.env.MAIL_FROM || (process.env.SMTP_USER ? process.env.SMTP_USER : '');

// Parse "Name <email@x.com>" -> { name, email }; plain email -> { name:'', email }
function parseSender(raw) {
  const m = String(raw || '').match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  if (m) return { name: m[1].trim(), email: m[2].trim() };
  return { name: 'Bihar STET CS', email: raw.trim() };
}
const SENDER = parseSender(SIMPLE_FROM);

const transporter = SMTP_OK
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

if (!configured) {
  console.warn('[mailer] No email backend configured (set BREVO_API_KEY or SMTP_*) — emails will be skipped.');
} else if (BREVO_API_KEY) {
  console.log('[mailer] Using Brevo transactional HTTP API.');
} else {
  console.log('[mailer] Using SMTP transport.');
}

/** Send a single email via Brevo's HTTP API (https://api.brevo.com/v3/smtp/email). */
async function sendBrevo({ to, subject, html }) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: SENDER,
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Brevo API ${res.status}: ${body.slice(0, 300)}`);
  }
}

/** Send via SMTP (Nodemailer) fallback. */
async function sendSmtp({ to, subject, html }) {
  await transporter.sendMail({ from: SIMPLE_FROM, to, subject, html });
}

/** Fire-and-forget send. Never throws into request handlers or jobs. */
async function sendMail(mail) {
  const { to, subject, html } = mail;
  if (!to) return;
  if (!configured) {
    console.log(`[mailer:skip] to=${to} subject="${subject}"`);
    return;
  }
  try {
    if (BREVO_API_KEY) {
      await sendBrevo({ to, subject, html });
    } else {
      await sendSmtp({ to, subject, html });
    }
  } catch (err) {
    console.error(`[mailer:error] to=${to}: ${err.message}`);
  }
}

module.exports = { sendMail, configured };
