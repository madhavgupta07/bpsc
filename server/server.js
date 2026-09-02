require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const passport = require('./config/passport');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const isProd = process.env.NODE_ENV === 'production';

const app = express();

// Behind a reverse proxy (nginx/PaaS) so req.ip is the real client IP for rate limiting.
app.set('trust proxy', 1);

connectDB();

app.use(helmet());
app.use(compression());
if (!isProd) app.use(morgan('dev'));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

/* ---------- Rate limiting ---------- */
// Global ceiling per IP — generous enough for normal app usage.
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests from this address. Please try again later.' },
}));

// Strict limiter for auth endpoints (brute-force / OAuth abuse).
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many sign-in attempts. Please try again in a few minutes.' },
});

app.use('/api/auth', authLimiter, require('./routes/auth'));
app.use('/api/chapters', require('./routes/chapters'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/mock-tests', require('./routes/mockTests'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/admin', require('./routes/admin'));

/* ---------- SEO endpoints (root-level for crawlers) ---------- */
app.use('/', require('./routes/sitemap'));

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

/* ---------- Production: serve built SPA + API fallback ---------- */
if (isProd) {
  const dist = path.resolve(__dirname, '../client/dist');
  app.use(express.static(dist, {
    index: false,
    // Skip robots.txt from static — let the dynamic route handle it.
    setHeaders(res, filePath) {
      // Vite emits content-hashed asset names → cache hard; HTML must revalidate.
      if (!filePath.endsWith('.html')) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    },
  }));
  app.get('*', (req, res, next) => {
    // Let API and SEO routes pass through — don't serve index.html for them.
    if (req.path.startsWith('/api') || req.path === '/sitemap.xml' || req.path === '/robots.txt') return next();
    res.setHeader('Cache-Control', 'no-cache');
    res.sendFile(path.join(dist, 'index.html'));
  });
}

app.use(errorHandler);

/* ---------- Background jobs (email reminders) ---------- */
require('./jobs/streakReminder').startStreakJob();
require('./jobs/hourlyReport').startTelegramJob();

// Surface unexpected crashes to Telegram, but keep the process alive so a
// single uncaught error cannot take the whole server down on Render.
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  if (process.env.NODE_ENV === 'production') {
    try {
      const { notifyTelegram, esc } = require('./utils/telegram');
      notifyTelegram(`💥 <b>Uncaught exception</b>\n<code>${esc(err.message || err)}</code>`);
    } catch {}
  }
});
process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} (${isProd ? 'production' : 'development'})`));
