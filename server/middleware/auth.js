const jwt = require('jsonwebtoken');
const User = require('../models/User');

const COOKIE_NAME = 'stet_token';

/**
 * Accepts the session JWT from either the httpOnly cookie (primary,
 * production flow) or an Authorization: Bearer header (backward compatible).
 */
exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.[COOKIE_NAME]) {
    token = req.cookies[COOKIE_NAME];
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    if (req.user.isDeleted) {
      return res
        .status(401)
        .json({ message: 'Your account has been deactivated. Contact the administrator.' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

/** Role gate — must run after `protect`. */
exports.adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

/**
 * Best-effort auth — attaches `req.user` if a valid JWT is present,
 * but never rejects. Used for public endpoints that optionally
 * personalise the response (e.g. leaderboard "your rank").
 */
exports.optionalAuth = async (req, _res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.[COOKIE_NAME]) {
    token = req.cookies[COOKIE_NAME];
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user && !user.isDeleted) req.user = user;
    } catch {
      /* invalid / expired — proceed anonymously */
    }
  }
  next();
};
