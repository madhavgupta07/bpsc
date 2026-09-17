const app = require('../server/app');

module.exports = (req, res) => {
  // If Vercel rewrite alters req.url to /api/index.js, restore original requested URL
  if (req.headers['x-matched-path']) {
    req.url = req.headers['x-matched-path'];
  }
  return app(req, res);
};
