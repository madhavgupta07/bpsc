const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const adminEmails = (process.env.ADMIN_EMAILS || '')
            .split(',')
            .map((e) => e.trim().toLowerCase())
            .filter(Boolean);
          const email = profile.emails[0].value;
          user = await User.create({
            name: profile.displayName,
            email,
            googleId: profile.id,
            avatar: profile.photos[0]?.value || '',
            role: adminEmails.includes(email.toLowerCase()) ? 'admin' : 'user',
          });
          // First sign-in = account created; give it a progress doc.
          const { ensureProgressDoc } = require('../controllers/authController');
          ensureProgressDoc(user._id);
          // Welcome email — fire-and-forget, never blocks sign-in.
          const { sendMail, configured } = require('./mailer');
          if (configured) {
            sendMail(require('../utils/emailTemplates').welcomeEmail(user));
          }
        } else {
          // Treat sign-in as activity too — refreshes lastActive, keeps streak.
          const { trackActivity } = require('../utils/streak');
          trackActivity(user.stats, new Date());
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
