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
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // matches JWT_EXPIRE
      path: '/',
    });
    res.redirect(`${process.env.CLIENT_URL}/auth/callback?status=ok`);
  }
);

router.post('/logout', (req, res) => {
  res.clearCookie('stet_token', { path: '/' });
  res.json({ message: 'Logged out' });
});

router.get('/me', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
