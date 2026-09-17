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
const notifyErrorResponses = require('./middleware/notifyResponses');

const isProd = process.env.NODE_ENV === 'production';
const isVercel = Boolean(process.env.VERCEL);

const app = express();

// Trust reverse proxies (Vercel/Nginx) for real client IP rate limiting.
app.set('trust proxy', 1);

// Middleware to ensure DB is connected before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection middleware error:', err);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

app.use(helmet({
  contentSecurityPolicy: false, // Allow inline scripts/styles if needed in client SPA
}));
app.use(compression());
if (!isProd) app.use(morgan('dev'));

// CORS: Allow CLIENT_URL if defined, otherwise allow same-origin / all in production
const corsOrigin = process.env.CLIENT_URL || true;
app.use(cors({ origin: corsOrigin, credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Telegram alerts for error responses
app.use(notifyErrorResponses);

/* ---------- Rate limiting ---------- */
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests from this address. Please try again later.' },
}));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many sign-in attempts. Please try again in a few minutes.' },
});

/* ---------- API Routes ---------- */
app.use('/api/auth', authLimiter, require('./routes/auth'));
app.use('/api/chapters', require('./routes/chapters'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/mock-tests', require('./routes/mockTests'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/forum', require('./routes/forum'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/jobs', require('./routes/jobs'));

/* ---------- SEO endpoints ---------- */
app.use('/', require('./routes/sitemap'));

app.get('/api/health', (_, res) => res.json({ status: 'ok', serverless: isVercel }));

/* ---------- Serve static SPA when running as standalone Node server ---------- */
if (isProd && !isVercel) {
  const fs = require('fs');
  const dist = path.resolve(__dirname, '../client/dist');
  const indexPath = path.join(dist, 'index.html');
  const { createSeoMiddleware } = require('./middleware/seoPrerender');

  if (fs.existsSync(indexPath)) {
    const htmlTemplate = fs.readFileSync(indexPath, 'utf-8');
    const seoMiddleware = createSeoMiddleware(htmlTemplate);

    app.use(express.static(dist, {
      index: false,
      setHeaders(res, filePath) {
        if (!filePath.endsWith('.html')) res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      },
    }));

    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api') || req.path === '/sitemap.xml' || req.path === '/robots.txt') return next();
      seoMiddleware(req, res).catch(next);
    });
  }
}

app.use(errorHandler);

/* ---------- Node-cron background jobs (only for standalone server) ---------- */
if (!isVercel) {
  try {
    require('./jobs/streakReminder').startStreakJob();
    require('./jobs/hourlyReport').startTelegramJob();
  } catch (err) {
    console.error('Failed to start background jobs:', err.message);
  }
}

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

module.exports = app;
