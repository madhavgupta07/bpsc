const errorHandler = (err, req, res, _next) => {
  console.error(err.stack);

  const status = err.statusCode || 500;

  // Alert the owner via Telegram on real server errors (5xx) — dedupes bursts.
  if (status >= 500) {
    try {
      const { notifyWithBurst, esc } = require('../utils/telegram');
      const url = req.originalUrl || req.url || '';
      notifyWithBurst(
        `🔴 <b>Server error</b> ${status}\n<code>${esc(err.message || err)}</code>\n📍 ${esc(url)}\n👤 ${esc(req.user?.email || 'anonymous')}`
      );
    } catch {
      /* never let a Telegram failure break the error response */
    }
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Resource not found' });
  }
  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate field value' });
  }
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'Server Error',
  });
};

module.exports = errorHandler;
