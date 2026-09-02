const crypto = require('crypto');
const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');
const { getProfile, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

/* Google OAuth is the only sign-in method. */

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// After a successful Google login the server hands the SPA a short-lived,
// single-use code (never the JWT itself). The SPA exchanges it for the session
// token via POST /exchange, so no token ever touches a URL or a cookie. This
// works for any FE/BE split, regardless of SameSite or third-party-cookie
// policies. Store is in-memory: codes live 60s and die after one use.
const oneTimeCodes = new Map(); // code -> { userId, exp }
const CODE_TTL_MS = 60 * 1000;

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/auth/callback?status=failed`,
    session: false,
  }),
  (req, res) => {
    const code = crypto.randomBytes(24).toString('hex');
    oneTimeCodes.set(code, { userId: req.user._id, exp: Date.now() + CODE_TTL_MS });
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?status=ok&code=${code}`);
  }
);

/* Exchange a one-time login code for the session JWT. */
router.post('/exchange', async (req, res) => {
  const { code } = req.body || {};
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ message: 'Code is required' });
  }
  const entry = oneTimeCodes.get(code);
  if (!entry || entry.exp < Date.now()) {
    oneTimeCodes.delete(code);
    return res.status(400).json({ message: 'Sign-in link expired or used. Please sign in again.' });
  }
  oneTimeCodes.delete(code); // single-use
  try {
    const user = await User.findById(entry.userId);
    if (!user) return res.status(401).json({ message: 'User not found' });
    return res.json({ token: user.generateToken(), user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/logout', (req, res) => {
  // Stateless JWT sessions — the client just drops its copy.
  res.json({ message: 'Logged out' });
});

router.get('/me', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
