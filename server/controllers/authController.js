const User = require('../models/User');
const UserProgress = require('../models/UserProgress');

/* Manual email/password auth removed — Google OAuth is the only sign-in method. */

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, preferredLanguage } = req.body;
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (preferredLanguage) user.preferredLanguage = preferredLanguage;
    await user.save();
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Ensures a progress doc exists for freshly created Google users.
exports.ensureProgressDoc = async (userId) => {
  try {
    await UserProgress.create({ user: userId });
  } catch {
    /* duplicate key = doc already exists */
  }
};
