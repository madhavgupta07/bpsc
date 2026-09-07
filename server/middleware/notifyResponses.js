const { notifyError } = require('../utils/eventNotify');

/**
 * Alerts Telegram for EVERY 4xx/5xx JSON response.
 *
 * Controllers in this codebase swallow errors and respond directly with
 * res.status(...).json(...) instead of calling next(err), so the classic
 * error-handler middleware never sees most failures. Patching res.json here
 * is the single choke point that catches all of them — including 4xx client
 * errors, not just 500s.
 */
module.exports = function notifyErrorResponses(req, res, next) {
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    try {
      if (res.statusCode >= 400 && body !== undefined) {
        const message = typeof body === 'string' ? body : body?.message || '';
        // Fire-and-forget; never blocks or alters the response.
        notifyError({ statusCode: res.statusCode, message }, req);
      }
    } catch {
      /* alerting must never break a response */
    }
    return originalJson(body);
  };
  next();
};