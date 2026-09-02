const router = require('express').Router();
const passport = require('passport');
const { logout, getProfile, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

/* Google OAuth is the only sign-in method. */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/auth/callback?status=failed`,
    session: false,
  }),
  (req, res) => {
    // Token goes into an httpOnly cookie — never exposed to client JS or URLs.
    res.cookie('stet_token', req.user.generateToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      // 'lax' (default) = single-origin deploy.
      // Set COOKIE_SAMESITE=none when FE/BE are on different domains
      // (requires HTTPS + credentials:true on the client).
      sameSite: process.env.COOKIE_SAMESITE === 'none' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // matches JWT_EXPIRE
      path: '/',
    });
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?status=ok`);
  }
);

// Cookie attributes must match how it was set, or browsers ignore the
// clear (especially for secure/sameSite=none cookies).
const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.COOKIE_SAMESITE === 'none' ? 'none' : 'lax',
  path: '/',
};

router.post('/logout', (req, res) => {
  res.clearCookie('stet_token', COOKIE_OPTS);
  res.json({ message: 'Logged out' });
});

router.get('/me', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
